

const PostResponseService = require('../services/postResponseService')

async function createPostResponse(req, res) {
    const { content } = req.body

    if (!content) {
        return res.status(400).json({ message: 'Content is required' })
    }

    try {
        const postResponse = await PostResponseService.createPostResponse(
            content, req.params.postId, req.user._id)
        res.status(201).json({ message: 'Post response created successfully', postResponse })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deletePostResponse(req, res) {
    try {
        await PostResponseService.deletePostResponse(req.params.id, req.user._id)
        res.status(200).json({ message: 'Post response deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getPostResponses(req, res) {
    try {
        const postResponses = await PostResponseService.getPostResponses(req.params.postId)
        res.status(200).json(postResponses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function likePostResponse(req, res) {
    try {
        const postResponseId = req.params.id;
        const userId = req.user._id;
        if (!postResponseId || !userId) {
            return res.status(400).json({ message: 'Invalid request: missing response ID or user ID' });
        }
        await PostResponseService.likePostResponse(postResponseId, userId);
        res.status(200).json({ message: 'Post response liked' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function unlikePostResponse(req, res) {
    try {
        const postResponseId = req.params.id;
        const userId = req.user._id;

        if (!postResponseId || !userId) {
            return res.status(400).json({ message: 'Invalid request: missing response ID or user ID' });
        }


        await PostResponseService.unlikePostResponse(postResponseId, userId);
        res.status(200).json({ message: 'Post response unliked' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function updatePostResponse(req, res) {
    const { content } = req.body

    if (!content) {
        return res.status(400).json({ message: 'Content is required' })
    }
    try {
        const updatedPostResponse = await PostResponseService.updatePostResponse(
            req.params.id, content, req.user._id
        )
        res.status(200).json({ message: 'Post response updated successfully', updatedPostResponse })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = { createPostResponse, deletePostResponse, getPostResponses, unlikePostResponse, likePostResponse, updatePostResponse }
