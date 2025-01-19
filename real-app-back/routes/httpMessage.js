

const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
MessageController = require('../controllers/messageController')



router.post('/:id', authMiddleware, MessageController.sendMessage)
router.get('/', authMiddleware, MessageController.getMessages)
router.patch('/:id/read', authMiddleware, MessageController.markMessageAsRead)
router.delete('/:id', authMiddleware, MessageController.deleteMessage)
router.patch('/:id/messageCount', authMiddleware, MessageController.updateMessageCount)
router.get('/:id/message/:messageId', authMiddleware, MessageController.getMessageById)


module.exports = router
