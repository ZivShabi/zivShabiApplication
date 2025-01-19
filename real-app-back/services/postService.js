

const Post = require('../models/post')

async function createPost(content, userId, imageUrl = null) {
    const post = new Post({ content, createdBy: userId, imageUrl })
    return await post.save()
}

async function getAllPosts() {
    return await Post.find().populate('createdBy', 'name email',).sort({ createdAt: -1 })
}

async function toggleLike(postId, userId) {
    const post = await Post.findById(postId)
    if (!post) {
        throw new Error('Post not found')
    }
    const isLiked = post.likes.includes(userId)
    if (isLiked) {
        post.likes.pull(userId)
    } else {
        post.likes.push(userId)
    }
    return await post.save()
}

async function deletePost(postId, userId) {
    const post = await Post.findById(postId)
    if (!post) {
        throw new Error('Post not found')
    }
    if (post.createdBy.toString() !== userId.toString()) {
        throw new Error('Unauthorized to delete this post')
    }
    await Post.deleteOne({ _id: postId })
}

async function addImageToPost(postId, userId, imageUrl) {
    const post = await Post.findById(postId)

    if (!post || post.createdBy.toString() !== userId.toString()) {
        throw new Error('Post not found or unauthorized')
    }

    post.imageUrl = imageUrl
    return await post.save()
}


async function addAudioToPost(postId, userId, audioUrl) {
    const post = await Post.findById(postId)
    if (!post || post.createdBy.toString() !== userId.toString()) {
        throw new Error('Post not found or unauthorized')
    }
    if (!post.audioUrls) {
        post.audioUrls = []
    }
    post.audioUrls.push(audioUrl);
    // post.audioUrl = audioUrl
    return await post.save()
}

// async function AudioStatus(postId, userId) {

// }



// async function saveVideoToStorage(file) {
//     // לוגיקה לשמירת וידאו בסטורג' (למשל AWS S3 או שירות אחר)
//     const videoUrl = `https://storage.example.com/${file.originalname}`;
//     return videoUrl;
// };

async function addVideoToPost(postId, userId, videoUrl) {
    const post = await Post.findById(postId)

    if (!post || post.createdBy.toString() !== userId.toString()) {
        throw new Error('Post not found or unauthorized')
    }

    post.videoUrl = videoUrl
    return await post.save()
}


module.exports = { createPost, getAllPosts, toggleLike, deletePost, createPost, addImageToPost, addAudioToPost, addVideoToPost }

