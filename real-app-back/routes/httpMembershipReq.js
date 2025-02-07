const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const MembershipReqController = require('../controllers/MembershipReqController');

// קבלת כל המשתמשים חוץ מהמשתמש הנוכחי
router.get('/getUsers/:userId', authMiddleware, MembershipReqController.getUsers);

// שליחת בקשת חברות
router.post('/:id/friend-request', authMiddleware, MembershipReqController.sendFriendRequest);

// קבלת בקשות חברות שהתקבלו
router.get('/:id/sent-friend-requests', authMiddleware, MembershipReqController.getReceivedFriendRequests);

// קבלת חברים של משתמש
router.get('/:id/friends', authMiddleware, MembershipReqController.getFriendsLists);

// קבלת בקשת חברות והסכמה לה
router.patch('/:id/accept-friend-request', authMiddleware, MembershipReqController.acceptFriendRequest);

// ביטול בקשת חברות
router.delete('/:id/cancel-friend-request', authMiddleware, MembershipReqController.cancelFriendRequest);

module.exports = router;
