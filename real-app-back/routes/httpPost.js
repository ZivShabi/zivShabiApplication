//real-app-back/routes/httpPost.js


const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer');
const postController = require('../controllers/postController')


const storage = multer.memoryStorage();
const upload = multer({ storage });




router.post('/', authMiddleware, upload.single('image'), postController.createPost)
router.get('/', authMiddleware, postController.getAllPosts)
router.patch('/:id/like', authMiddleware, postController.likePost)
router.delete('/:id', authMiddleware, postController.deletePost)
router.patch('/:id/addImage', authMiddleware, upload.single('image'), postController.addImageToPost)
router.patch('/:id/addAudio', authMiddleware, upload.single('audio'), postController.addAudioToPost)
router.get('/:id/audioStatus', authMiddleware, postController.updateAudioStatus)
router.patch('/:id/addVideo', authMiddleware, upload.single('video'), postController.addVideoToPost)


module.exports = router
