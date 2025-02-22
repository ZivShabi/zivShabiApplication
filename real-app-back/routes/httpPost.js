
const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const postController = require('../controllers/postController')
const {
    uploadImage,
    uploadAudio,
    uploadVideo,
    uploadVoiceMessage
} = require('../middlewares/fileUploadMulter')

router.post('/', authMiddleware, uploadImage, postController.createPost,)
router.get('/', authMiddleware, postController.getAllPosts)
router.patch('/:id/like', authMiddleware, postController.likePost)
router.delete('/:id', authMiddleware, postController.deletePost)
router.patch('/:id/addImage', authMiddleware, uploadImage, postController.addImageToPost)
router.post('/upload-voice', authMiddleware, uploadVoiceMessage, postController.handleVoiceMessageUpload)
router.patch('/:id/addAudio', authMiddleware, uploadAudio, postController.addAudioToPost)
router.get('/:id/audioStatus', authMiddleware, postController.updateAudioStatus)
router.patch('/:id/addVideo', authMiddleware, uploadVideo, postController.addVideoToPost)

module.exports = router
