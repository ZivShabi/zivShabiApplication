

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

    if (!postResponse) {
        console.error(`Post response with ID ${postResponseId} not found`);
        throw new Error('Post response not found')
    }

    // אם המשתמש כבר נתן לייק, לא נוסיף אותו שוב
    if (postResponse.likes.includes(userId)) {
        console.log(`User ${userId} already liked this response.`);
        throw new Error('User already liked this response')
    }

    // הוספת הלייק
    postResponse.likes.push(userId)
    await postResponse.save()
    console.log(`User ${userId} liked response ${postResponseId}`);

}


async function unlikePostResponse(postResponseId, userId) {
    const postResponse = await PostResponse.findById(postResponseId)

    if (!postResponse) {
        throw new Error('Post response not found')
    }

    // אם המשתמש לא נתן לייק, נשלול לייק
    if (!postResponse.likes.includes(userId)) {
        throw new Error('User has not liked this response')
    }

    // הסרת הלייק
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
