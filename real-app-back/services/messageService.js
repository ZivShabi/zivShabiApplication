
const User = require('../models/user')
const Message = require('../models/message')
err = require('../middlewares/errorMiddleware')

async function getUserById(id) {
    const user = await User.findById(id)
    if (!user) {
        err.StringErrUser()
    }
    return user
}

async function updateDataUser(id, updateFields) {
    return await User.updateData(id, updateFields)
}

async function deleteUserID(id) {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        err.StringErrUser()
    }
}

async function sendMessageToUser(receiverId, senderId, content) {
    const message = new Message({
        sender: senderId,
        recipient: receiverId,
        content,
    })
    return await message.save()
}

async function updateMessageCount(userId, requesterId) {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error('User not found')
    }

    const unreadCount = await Message.countDocuments({ recipient: userId, read: false })
    user.unreadMessageCount = unreadCount
    await user.save()

    return unreadCount
}


async function getMessageById(userId, messageId) {
    const message = await Message.findOne({
        _id: messageId,
        $or: [{ sender: userId }, { recipient: userId }],
    })

        .populate('sender', 'name email')  // מבצע populate על השולח
        .populate('recipient', 'name email');

    if (!message) {
        throw new Error('Message not found or unauthorized')
    }

    return message
}


async function addAudioToMessage(messageId, userId, audioUrl) {
    const message = await Message.findById(messageId)
    if (!message) {
        throw new Error('Message not found')
    }
    if (!userId) {
        throw new Error('User ID is undefined')
    }
    if (!audioUrl) {
        throw new Error('Audio URL is undefined')
    }
    if (message.sender.toString() !== userId.toString()) {
        throw new Error('Post not found or unauthorized')
    }
    if (!message.audioUrls) {
        message.audioUrls = []
    }
    message.audioUrls.push(audioUrl)
    const savedMessage = await message.save()
    console.log('Saved message:', savedMessage)
    return savedMessage
}


module.exports = { getUserById, updateDataUser, deleteUserID, sendMessageToUser, updateMessageCount, getMessageById, addAudioToMessage }