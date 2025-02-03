

const PostResponse = require('../models/PostResponse')

async function createPostResponse(content, postId, userId) {
    const postResponse = new PostResponse({ content, post: postId, createdBy: userId })
    return await postResponse.save()
}

async function deletePostResponse(postResponseId, userId) {
    const postResponse = await PostResponse.findById(postResponseId)
    if (!postResponse) {
        throw new Error('Post response not found')
    }
    if (postResponse.createdBy.toString() !== userId.toString()) {
        throw new Error('Unauthorized to delete this post response')
    }
    await PostResponse.deleteOne({ _id: postResponseId })
}

async function getPostResponses(postId) {
    return await PostResponse.find({ post: postId })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
}

async function likePostResponse(postResponseId, userId) {
    const postResponse = await PostResponse.findById(postResponseId)
    if (!postResponseId) {
        throw new Error('Post response not found')
    }
    if (postResponse.likes.includes(userId)) {
        throw new Error('User already liked this response')
    }
    postResponse.likes.push(userId)
    await postResponse.save()
}


async function unlikePostResponse(postResponseId, userId) {
    const postResponse = await PostResponse.findById(postResponseId)
    if (!postResponse) {
        throw new Error('Post response not found')
    }
    if (!postResponse.likes.includes(userId)) {
        throw new Error('User has not liked this response')
    }
    postResponse.likes.pull(userId)
    await postResponse.save()
}


async function updatePostResponse(postResponseId, content, userId) {
    const postResponse = await PostResponse.findById(postResponseId)

    if (!postResponse) {
        throw new Error('Post response not found')
    }

    if (postResponse.createdBy.toString() !== userId.toString()) {
        throw new Error('Unauthorized to update this post response')
    }

    postResponse.content = content
    return await postResponse.save()
}


module.exports = { createPostResponse, deletePostResponse, getPostResponses, likePostResponse, unlikePostResponse, updatePostResponse }
