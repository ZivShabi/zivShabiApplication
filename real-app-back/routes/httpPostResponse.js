

const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const postResponseController = require('../controllers/postResponseController')

router.post('/:postId', authMiddleware, postResponseController.createPostResponse)
router.delete('/:id', authMiddleware, postResponseController.deletePostResponse)
router.get('/:postId', authMiddleware, postResponseController.getPostResponses)
router.post('/:id/like', authMiddleware, postResponseController.likePostResponse)
router.delete('/:id/unlike', authMiddleware, postResponseController.unlikePostResponse)
router.put('/:id', authMiddleware, postResponseController.updatePostResponse)



module.exports = router
