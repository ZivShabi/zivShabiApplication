const mongoose = require("mongoose");

const User = require('../models/user')
const Message = require('../models/message')
err = require('../middlewares/errorMiddleware')

async function getUserById(id) {
    try {
        const user = await User.findById(id)
        if (!user) {
            err.StringErrUser()
        }
        return user
    } catch (error) {
        throw new Error(error.message);
    }
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
    return savedMessage
}
async function fileToMessage(messageId, fileUrl) {
    return await Message.findByIdAndUpdate(messageId, { $push: { files: fileUrl } }, { new: true });
}


async function userContacts(userId) {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId); // המרת userId ל-ObjectId
        console.log("Converted userId:", userObjectId);
        return await Message.aggregate([
            { $match: { $or: [{ sender: userObjectId }, { receiver: userObjectId }] } },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userObjectId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" }, // פריסה של נתוני המשתמשים
            {
                $project: {
                    _id: "$user._id",
                    name: "$user.name",
                    email: "$user.email",
                    profilePicture: "$user.profilePicture"
                }
            }
        ])
    }
    catch (error) {
        console.error("Error in userContacts:", error);
        throw new Error(error.message);
    }
}

async function chatSummary(senderId, receiverId) {
    const messages = await Message.findOne({
        $or: [
            { sender: senderId, recipient: receiverId, deletedForSender: false },
            { sender: receiverId, recipient: senderId, deletedForSender: false }
        ]
    }).sort({ date: -1 });
    return messages
}

// async function findUserByNameOrEmail(name, email) {
//     return await User.findOne({
//         $or: [
//             { email },
//             { 'name.first': name },
//             { 'name.last': name },
//             { 'name.middle': name }
//         ]
//     }).lean();
// }


async function findUserByNameOrEmail(name, email) {
    // ניקוי תווים נסתרים ורווחים
    const cleanedName = name.trim().normalize("NFKC").replace(/\s+/g, " ");

    console.log("🔍 Searching for:", cleanedName); // בדיקה לראות מה קורה לשם

    // חיפוש במסד הנתונים
    const user = await User.findOne({
        $or: [
            { email: new RegExp(`^${email}$`, "i") },
            { "name.first": new RegExp(`^${cleanedName}$`, "i") },
            { "name.last": new RegExp(`^${cleanedName}$`, "i") },
            { "name.middle": new RegExp(`^${cleanedName}$`, "i") }
        ]
    }).lean();

    if (!user) {
        console.log("❌ User not found! Checking all users in DB...");
        const allUsers = await User.find({}, { name: 1, email: 1 });
        console.log("📜 All users in DB:", allUsers);
    } else {
        console.log("✅ Found User:", user);
    }

    return user;
}


async function getMessagesBetweenUsers(userId, otherUserId) {
    return await Message.find({
        $or: [
            { sender: userId, recipient: otherUserId },
            { sender: otherUserId, recipient: userId }
        ]
    })
        .sort({ createdAt: 1 })
        .lean();
}


async function messageForSender(messageId, userId) {
    return await Message.findOneAndUpdate({ _id: messageId, sender: userId }, { deletedBySender: true });
}

async function allMessagesForUser(userId) {
    return await Message.deleteMany({ $or: [{ sender: userId }, { receiver: userId }] });
}

async function searchMessages(userId, query) {
    return await Message.find({
        $or: [{ sender: userId }, { receiver: userId }],
        content: { $regex: query, $options: 'i' }
    });
}

async function unreadMessagesCount(userId) {
    return await Message.countDocuments({ receiver: userId, read: false });
}

async function setTypingStatus(senderId, receiverId, isTyping) {
    return await User.findByIdAndUpdate(senderId, { typingTo: isTyping ? receiverId : null });
}

async function typingStatus(receiverId) {
    return await User.findOne({ _id: receiverId }, 'typingTo');
}

async function markMessageAsDelivered(messageId) {
    return await Message.findByIdAndUpdate(messageId, { delivered: true }, { new: true });
}

async function lastSeen(userId) {
    return await User.findById(userId, 'lastSeen');
}

async function updateLastSeen(userId) {
    return await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
}

async function onlineStatus(userId) {
    return await User.findById(userId, 'online');
}

async function updateOnlineStatus(userId, isOnline) {
    return await User.findByIdAndUpdate(userId, { online: isOnline });
}


module.exports = {
    getUserById, updateDataUser, deleteUserID, sendMessageToUser, updateMessageCount, getMessageById, addAudioToMessage, fileToMessage, userContacts, chatSummary, messageForSender, allMessagesForUser, searchMessages, unreadMessagesCount, setTypingStatus, typingStatus, markMessageAsDelivered, lastSeen, updateLastSeen, onlineStatus, updateOnlineStatus, findUserByNameOrEmail,
    getMessagesBetweenUsers
}