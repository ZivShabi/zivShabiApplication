//../controllers/membershipReqController.js
const MembershipReqService = require('../services/membershipReqService')
const MembershipReq = require('../models/membershipReq');

async function getUsers(req, res) {
    try {
        const { id } = req.params;
        console.log("Received request for userId:", id);

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }


        // בדיקה אם המשתמש קיים
        const currentUser = await MembershipReq.findById(id)
            .populate('friends sentFriendRequests friendRequests', 'firstName lastName role ');

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Current user found:", currentUser);

        // רשימת מזהים של משתמשים שיש להחריג מהתוצאה
        const excludedUserIds = [
            id,
            ...currentUser.friends.map(friend => friend._id.toString()),
            ...currentUser.sentFriendRequests.map(request => request._id.toString()),
            ...currentUser.friendRequests.map(request => request._id.toString())
        ];

        // חיפוש כל המשתמשים פרט לאלו שיש להחריג
        const users = await MembershipReq.find({ _id: { $nin: excludedUserIds } })
            .select('firstName lastName role');
        console.log("Users found:", users);

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function sendFriendRequest(req, res) {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        const result = await MembershipReqService.sendFriendRequest(senderId, receiverId);
        res.status(200).json({ message: 'Friend request sent successfully', result });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message });
    }
}


async function acceptFriendRequest(req, res) {
    try {
        const receiverId = req.user._id;
        const senderId = req.params.id;

        const result = await MembershipReqService.acceptFriendRequest(senderId, receiverId);
        res.status(200).json({ message: 'Friend request accepted successfully', result });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(error.status || 500).json({ message: error.message });
    }
}

// ביטול בקשת חברות שנשלחה
async function cancelFriendRequest(req, res) {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        const result = await MembershipReqService.cancelFriendRequest(senderId, receiverId);
        res.status(200).json({ message: 'Friend request canceled successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// פונקציה להחזרת בקשות החברות שהמשתמש קיבל
async function getReceivedFriendRequests(req, res) {
    try {
        const userId = req.user._id;
        const friendRequests = await MembershipReqService.getReceivedFriendRequests(userId);
        res.status(200).json(friendRequests);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
}


async function getFriendsLists(req, res) {
    try {
        const userId = req.user._id;
        const friends = await MembershipReqService.getFriendsList(userId);
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getUsers,
    sendFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
    getReceivedFriendRequests,
    getFriendsLists
}