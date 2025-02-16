//../controllers/membershipReqController.js
const MembershipReqService = require('../services/membershipReqService')
const MembershipReq = require('../models/membershipReq');
const User = require('../models/user')
async function getUsers(req, res) {
    try {
        const { id } = req.params
        if (!id) { return res.status(400).json({ message: "User ID is required" }) }
        const currentUserFromUsers = await User.findById(id)
        const currentUserFromMembership = await MembershipReq.findById(id)

        if (!currentUserFromUsers && !currentUserFromMembership) {
            return res.status(404).json({ message: "User not found in both collections" })
        }
        const excludedUserIds = currentUserFromMembership ? [
            id,
            ...currentUserFromMembership.friends.map(friend => friend._id.toString()),
            ...currentUserFromMembership.sentFriendRequests.map(request => request._id.toString()),
            ...currentUserFromMembership.friendRequests.map(request => request._id.toString())
        ] : [id];

        const usersFromMembership = await MembershipReq.find({ _id: { $nin: excludedUserIds } })
            .populate('friends sentFriendRequests friendRequests', 'address name role image')
            .select('address name role image')

        const usersFromUsers = await User.find({ _id: { $nin: excludedUserIds } })
        const combinedUsers = [...usersFromMembership, ...usersFromUsers]
        res.status(200).json(combinedUsers)
    } catch (error) {
        console.error("Error fetching users:", error)
        res.status(500).json({ message: "Internal Server Error" })
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
        if (!receiverId || !senderId) {
            throw new Error('Invalid user IDs');
        }
        const result = await MembershipReqService.acceptFriendRequest(senderId, receiverId);
        res.status(200).json({ message: 'Friend request accepted successfully', result });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(error.status || 500).json({ message: error.message });
    }
}

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