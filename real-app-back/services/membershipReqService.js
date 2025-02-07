//../services/membershipReqService.js
const MembershipReq = require('../models/membershipReq');


async function sendFriendRequest(senderId, receiverId) {
    const sender = await MembershipReq.findById(senderId);
    const receiver = await MembershipReq.findById(receiverId);

    if (!sender || !receiver) throw new Error('Sender or Receiver not found');
    if (receiver.friendRequests.includes(senderId)) throw new Error('Friend request already sent');
    if (receiver.friends.includes(senderId)) throw new Error('You are already friends');

    receiver.friendRequests.push(senderId);
    sender.sentFriendRequests.push(receiverId);

    await receiver.save();
    await sender.save();

    return { senderId, receiverId };
}

async function acceptFriendRequest(senderId, receiverId) {
    const user = await MembershipReq.findById(receiverId);
    const friend = await MembershipReq.findById(senderId);

    if (!user || !friend) throw new Error('User or friend not found');
    if (!user.friendRequests.includes(senderId)) throw new Error('Friend request not found');

    user.friends.push(senderId);
    friend.friends.push(receiverId);

    user.friendRequests.pull(senderId);
    friend.sentFriendRequests.pull(receiverId);

    await user.save();
    await friend.save();

    return { friend, user };
}


async function cancelFriendRequest(senderId, receiverId) {
    const sender = await MembershipReq.findById(senderId);
    const receiver = await MembershipReq.findById(receiverId);

    if (!sender || !receiver) throw new Error('Sender or Receiver not found');
    if (!sender.sentFriendRequests.includes(receiverId)) throw new Error('No sent friend request found');

    sender.sentFriendRequests.pull(receiverId);
    receiver.friendRequests.pull(senderId);

    await sender.save();
    await receiver.save();
}

async function getReceivedFriendRequests(userId) {
    const user = await MembershipReq.findById(userId).populate('friendRequests', 'firstName lastName role city');
    if (!user) throw new Error('User not found');
    return user.friendRequests;
}

async function getFriendsList(userId) {
    const user = await MembershipReq.findById(userId).populate('friends', 'firstName lastName role city');
    if (!user) throw new Error('User not found');
    return user.friends;
}

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
    getReceivedFriendRequests,
    getFriendsList
};
