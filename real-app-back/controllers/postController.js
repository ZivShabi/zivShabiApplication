
const PostService = require('../services/postService')
const Post = require('../models/post')
const { uploadFile } = require('../middlewares/fileUploadMulter');
async function createPost(req, res) {
    const { content } = req.body
    const file = req.file
    console.log("Content:", content);
    // console.log("File:", file);

    if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: true, message: 'Content must be a valid string' })
    }
    // if (!file) {
    //     return res.status(400).json({ error: true, message: 'File is required' });
    // }

    try {
        const imageUrl = file ? uploadFile(file, 'image') : null
        const post = await PostService.createPost(content, req.user._id, imageUrl)
        console.log(imageUrl);  // בדוק אם מתקבל URL לתמונה

        res.status(201).json({ message: 'Post created successfully', post })
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: error.message })
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await PostService.getAllPosts()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function likePost(req, res) {
    try {
        const post = await PostService.toggleLike(req.params.id, req.user._id)
        res.status(200).json({ message: 'Post updated successfully', post })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deletePost(req, res) {
    try {
        await PostService.deletePost(req.params.id, req.user._id)
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addImageToPost(req, res) {
    const { id } = req.params
    const userId = req.user._id
    const file = req.file

    if (!file) {
        return res.status(400).json({ message: 'Image file is required' })
    }
    try {
        const imageUrl = uploadFile(file, 'image')
        const updatedPost = await PostService.addImageToPost(id, userId, imageUrl)
        res.status(200).json({ message: 'Image added successfully', post: updatedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addAudioToPost(req, res) {
    const { id } = req.params
    const userId = req.user.id
    const file = req.file

    if (!file) {
        return res.status(400).json({ message: 'Audio file is required' })
    }
    const audioUrl = uploadFile(file, 'audio')
    try {
        const updatedPost = await PostService.addAudioToPost(id, userId, audioUrl)
        res.status(200).json({ message: 'Audio added successfully', post: updatedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateAudioStatus(req, res) {
    const userId = req.user.id
    const postId = req.params.id

    if (!userId || !postId) {
        return res.status(400).json({ message: 'User ID and Post ID are required' })
    }
    try {
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        if (post.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized to access this post' })
        }
        if (!post.audioUrls || post.audioUrls.length === 0) {
            return res.status(404).json({ message: 'No audio messages found for this post' })
        }
        if (post.audioUrls.length === 1) {
            return res.status(200).json({
                message: 'Playing single audio message',
                audioUrl: post.audioUrls[0]
            })
        }
        return res.status(200).json({
            message: post.audioUrls?.length ? 'Audio messages found' : 'No audio messages found',
            audioUrls: post.audioUrls || []
        })
    } catch (error) {
        console.error('Error during updateAudioStatus', error)
        res.status(500).json({ message: error.message })
    }
}

async function handleVoiceMessageUpload(req, res) {
    const file = req.file
    try {
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded!' })
        }
        const filePath = uploadFile(file, 'voiceMessage')
        res.status(200).json({
            message: 'Voice message uploaded successfully!',
            filePath
        })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' })
    }
}

async function addVideoToPost(req, res) {
    const { id: postId } = req.params
    const userId = req.user.id
    const file = req.file
    if (!file) {
        return res.status(400).json({ message: 'Video file is required' })
    }
    try {
        const videoUrl = uploadFile(file, 'videos')
        const updatedPost = await PostService.addVideoToPost(postId, userId, videoUrl)
        res.status(200).json({ message: 'Video added successfully', post: updatedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createPost, getAllPosts, likePost, deletePost, addImageToPost, addAudioToPost, addVideoToPost, updateAudioStatus, handleVoiceMessageUpload }

