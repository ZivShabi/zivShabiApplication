

const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
MessageController = require('../controllers/messageController')
const { uploadAudio } = require('../middlewares/fileUploadMulter')


router.post('/:id', authMiddleware, MessageController.sendMessage)
router.get('/', authMiddleware, MessageController.getMessages)
router.patch('/:id/read', authMiddleware, MessageController.markMessageAsRead)
router.delete('/:id', authMiddleware, MessageController.deleteMessage)
router.patch('/:id/messageCount', authMiddleware, MessageController.updateMessageCount)
router.get('/:id/message/:messageId', authMiddleware, MessageController.getMessageById)

router.patch('/:id/addAudio', authMiddleware, uploadAudio, MessageController.addAudioToMessage)
router.get('/:id/audioStatus', authMiddleware, MessageController.updateAudioStatus)
module.exports = router
