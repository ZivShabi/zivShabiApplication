//real-app-back/conttrollers/postconttroller.js

const saveAudioToStorage = require('../uploads/voicemailUploads')
const saveVideoToStorage = require('../uploads/videoToStorage')
const PostService = require('../services/postService')
const Post = require('../models/post')
const saveImageToStorage = require('../uploads/saveImageToStorage')

async function createPost(req, res) {
    const { content } = req.body
    if (!content || typeof content !== 'string') {
        return res.status(400).json({ message: 'Content must be a valid string' })
    }

    const file = req.file

    try {
        let imageUrl = null;
        if (file) {
            imageUrl = await saveImageToStorage(file); // פונקציה לשמירת התמונה בסטורג'
        }

        const post = await PostService.createPost(content, req.user._id, imageUrl)
        res.status(201).json({ message: 'Post created successfully', post })
    } catch (error) {
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
    const file = req.file;
    const userId = req.user._id;

    if (!file) {
        return res.status(400).json({ message: 'Image file is required' });
    }


    try {
        const imageUrl = await saveImageToStorage(file);
        const updatedPost = await PostService.addImageToPost(id, userId, imageUrl)
        res.status(200).json({ message: 'Image added successfully', post: updatedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addAudioToPost(req, res) {
    const { id } = req.params;
    const file = req.file;
    const userId = req.user.id;

    if (!id || !file) {
        return res.status(400).json({ message: 'Missing postId or file' });
    }
    try {
        const audioUrl = await saveAudioToStorage(file, id)
        const updatedPost = await PostService.addAudioToPost(id, userId, audioUrl)
        res.status(200).json({ message: 'Audio added successfully', post: updatedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateAudioStatus(req, res) {
    const userId = req.user.id;
    const postId = req.params.id;

    if (!userId || !postId) {
        return res.status(400).json({ message: 'User ID and Post ID are required' });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized to access this post' });
        }
        if (!post.audioUrls || post.audioUrls.length === 0) {
            return res.status(404).json({ message: 'No audio messages found for this post' });
        }
        if (post.audioUrls.length === 1) {
            return res.status(200).json({
                message: 'Playing single audio message',
                audioUrl: post.audioUrls[0]
            });
        }
        return res.status(200).json({
            message: 'Multiple audio messages found',
            audioUrls: post.audioUrls
        });
    } catch (error) {
        console.error('Error during updateAudioStatus:', error);
        res.status(500).json({ message: error.message });
    }
}





async function addVideoToPost(req, res) {
    const { id: postId } = req.params;
    const userId = req.user.id;
    if (!req.file) {
        return res.status(400).json({ message: 'Video file is required' });
    }
    try {
        const videoUrl = await saveVideoToStorage(req.file);
        console.log(videoUrl)
        const updatedPost = await PostService.addVideoToPost(postId, userId, videoUrl);
        console.log(updatedPost)
        res.status(200).json({ message: 'Video added successfully', post: updatedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createPost, getAllPosts, likePost, deletePost, addImageToPost, addAudioToPost, addVideoToPost, updateAudioStatus }

