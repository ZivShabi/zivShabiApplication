const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const MembershipReqController = require('../controllers/membershipReqController');

router.get('/getUsers/:id', authMiddleware, MembershipReqController.getUsers);
router.post('/:id/friend-request', authMiddleware, MembershipReqController.sendFriendRequest);
router.get('/:id/sent-friend-requests', authMiddleware, MembershipReqController.getReceivedFriendRequests);
router.get('/:id/friends', authMiddleware, MembershipReqController.getFriendsLists);
router.patch('/:id/accept-friend-request', authMiddleware, MembershipReqController.acceptFriendRequest);
router.delete('/:id/cancel-friend-request', authMiddleware, MembershipReqController.cancelFriendRequest);

module.exports = router;
