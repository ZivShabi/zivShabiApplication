//../services/membershipReqService.js
const MembershipReq = require('../models/membershipReq')
const User = require('../models/user')

async function sendFriendRequest(senderId, receiverId) {
    const sender = await getOrCreateMembershipReq(senderId)
    const receiver = await getOrCreateMembershipReq(receiverId)
    if (receiver.friendRequests.includes(senderId)) {
        throw new Error('Friend request already sent')
    }
    receiver.friendRequests.push(senderId)
    sender.sentFriendRequests.push(receiverId)
    await Promise.all([sender.save(), receiver.save()])
    return { senderId, receiverId }
}

async function acceptFriendRequest(senderId, receiverId) {
    const receiver = await getMembershipReq(receiverId)
    const sender = await getMembershipReq(senderId)
    if (!receiver.friendRequests.includes(senderId)) {
        throw new Error('Friend request not found')
    }
    receiver.friendRequests.pull(senderId)
    sender.sentFriendRequests.pull(receiverId)
    receiver.friends.push(senderId)
    sender.friends.push(receiverId)
    await Promise.all([receiver.save(), sender.save()])
    return { senderId, receiverId }
}

async function cancelFriendRequest(senderId, receiverId) {
    const sender = await getMembershipReq(senderId)
    const receiver = await getMembershipReq(receiverId)
    sender.sentFriendRequests.pull(receiverId)
    receiver.friendRequests.pull(senderId)
    await Promise.all([sender.save(), receiver.save()])
}

async function getReceivedFriendRequests(userId) {
    const user = await getMembershipReq(userId)
    return user.friendRequests
}

async function getOrCreateMembershipReq(userId) {
    let user = await MembershipReq.findById(userId)
    if (!user) {
        user = new MembershipReq({
            _id: userId,
            friends: [],
            sentFriendRequests: [],
            friendRequests: []
        })
        await user.save()
    }
    return user
}

async function getMembershipReq(userId) {
    const user = await MembershipReq.findById(userId)
        .populate({
            path: 'friends',
            // select: 'name email profileImage role isBusiness'
        })
    if (!user) throw new Error('User not found')
    return user
}

async function getFriendsList(userId) {
    const user = await getMembershipReq(userId)
    return user.friends
}

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
    getReceivedFriendRequests,
    getFriendsList
}
