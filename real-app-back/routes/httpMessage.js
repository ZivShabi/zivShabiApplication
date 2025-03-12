

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
router.get('/contacts', authMiddleware, MessageController.getUserContacts);
router.get('/:receiverId/summary/:senderId', authMiddleware, MessageController.getChatSummary)
router.get('/open-chat/', authMiddleware, MessageController.getOpenChat)

// //  תמיכה בשליחת קבצים (תמונות, מסמכים וכו')
// router.patch('/:id/addFile', authMiddleware, uploadFile, MessageController.addFileToMessage)
// // מחיקת הודעה עבור השולח בלבד
// router.delete('/:id/sender', authMiddleware, MessageController.deleteMessageForSender)
// //  מחיקת כל ההודעות של משתמש
// router.delete('/user/:userId', authMiddleware, MessageController.deleteAllMessagesForUser)
// //  חיפוש בהודעות
// router.get('/search', authMiddleware, MessageController.searchMessages)
// // קבלת מספר הודעות שלא נקראו
// router.get('/unread/count', authMiddleware, MessageController.getUnreadMessagesCount)
// // 
// router.post('/:senderId/typing', authMiddleware, MessageController.setTypingStatus)
// router.get('/typing/:receiverId', authMiddleware, MessageController.getTypingStatus)

// router.patch('/:id/delivered', authMiddleware, MessageController.markMessageAsDelivered)
// // מתי נראה לאחרונה המשתמש
// router.get('/last-seen/:userId', authMiddleware, MessageController.getLastSeen)
// router.patch('/last-seen', authMiddleware, MessageController.updateLastSeen)
// // סטטוס אם המשתמש מחובר 
// router.get('/online/:userId', authMiddleware, MessageController.getOnlineStatus)
// router.patch('/online', authMiddleware, MessageController.updateOnlineStatus)

module.exports = router

