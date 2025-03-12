const mongoose = require("mongoose");
const MessageService = require('../services/messageService')
const Message = require('../models/message')
const { uploadFile } = require('../middlewares/fileUploadMulter')
const User = require('../models/user')

async function sendMessage(req, res) {
    const { id: receiverId } = req.params
    const { message } = req.body

    if (!message) {
        return res.status(400).json({ message: 'Message content is required' })
    }


    try {
        const senderId = req.user._id;
        const result = await MessageService.sendMessageToUser(receiverId, senderId, message)
        res.status(201).json({
            message: 'Message sent successfully',
            data: result,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function getMessages(req, res) {
    try {
        const userId = req.user._id
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }],
        }).populate('sender recipient', 'name email')
        res.status(200).json({ messages })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function markMessageAsRead(req, res) {
    try {
        const { id } = req.params
        const message = await Message.findById(id)

        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }

        message.read = true
        await message.save()

        res.status(200).json({ message: 'Message marked as read' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function deleteMessage(req, res) {
    try {
        const { id } = req.params
        const message = await Message.findByIdAndDelete(id)

        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }

        res.status(200).json({ message: 'Message deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateMessageCount(req, res) {
    const { id } = req.params
    try {
        const updatedCount = await MessageService.updateMessageCount(id, req.user._id)
        res.status(200).json({ message: 'Message count updated', count: updatedCount })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function getMessageById(req, res) {
    const { id, messageId } = req.params
    try {
        const message = await MessageService.getMessageById(id, messageId, req.user._id)
        res.status(200).json({
            message: {
                id: message._id,
                sender: {
                    id: message.sender._id,
                    name: message.sender.name,
                    email: message.sender.email,
                },
                recipient: message.recipient,
                content: message.content,
                date: message.date,
                read: message.read,
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function addAudioToMessage(req, res) {
    const { id } = req.params
    const userId = req.user.id
    const file = req.file

    if (!file) {
        return res.status(400).json({ message: 'Audio file is required' })
    }
    const audioUrl = uploadFile(file, 'audio')
    try {
        const updatedPost = await MessageService.addAudioToMessage(id, userId, audioUrl)
        res.status(200).json({ message: 'Audio added successfully', message: updatedPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function updateAudioStatus(req, res) {
    const userId = req.user.id
    const messageId = req.params.id

    if (!userId || !messageId) {
        return res.status(400).json({ message: 'User ID and Post ID are required' })
    }
    try {
        const message = await Message.findById(messageId)
        if (!message) {
            return res.status(404).json({ message: 'message not found' })
        }
        if (message.sender.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized to access this message' })
        }

        if (!message.audioUrls || message.audioUrls.length === 0) {
            return res.status(404).json({ message: 'No audio messages found for this message' })
        }
        if (message.audioUrls.length === 1) {
            return res.status(200).json({
                message: 'Playing single audio message',
                audioUrl: post.audioUrls[0]
            })
        }
        return res.status(200).json({
            message: message.audioUrls?.length ? 'Audio messages found' : 'No audio messages found',
            audioUrls: message.audioUrls || []
        })
    } catch (error) {
        console.error('Error during updateAudioStatus', error)
        res.status(500).json({ message: error.message })
    }
}

async function addFileToMessage(req, res) {
    try {
        const { id } = req.params;
        const file = req.file;
        const updatedMessage = await MessageService.fileToMessage(id, file);
        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getUserContacts(req, res) {
    try {
        const userId = req.user.id;
        const contacts = await MessageService.userContacts(userId);
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching user contacts:", error);
        res.status(500).json({ error: error.message });
    }
}

async function getChatSummary(req, res) {
    try {
        const { receiverId, senderId } = req.params;
        if (!mongoose.isValidObjectId(senderId) || !mongoose.isValidObjectId(receiverId)) {
            return res.status(400).json({ message: "Invalid sender or receiver ID" });
        }
        const summary = await MessageService.chatSummary(senderId, receiverId);
        if (!summary) {
            return res.status(404).json({ message: "No messages found between these users" });
        }
        res.json(summary);
    } catch (error) {
        console.error("❌ Error fetching chat summary:", error);
        res.status(500).json({ error: error.message });
    }
}

// async function getOpenChat(req, res) {
//     try {
//         console.log('🔵 Received URL:', req.originalUrl);
//         console.log('🟢 Received Query:', req.query);
//         console.log('🟡 Request Headers:', req.headers);
//         if (!req.user || !req.user._id) {
//             return res.status(401).json({ message: 'Match failed, no access' });
//         }
//         const userId = req.user._id;
//         const userName = req.user.name?.first || '';
//         const name = req.query.name?.trim();
//         const email = req.query.email?.trim();
//         if (!userName) {
//             return res.status(400).json({ message: 'Missing username' });
//         }
//         if (!name && !email) {
//             return res.status(400).json({ message: 'Name or email must be provided' });
//         }
//         const otherUser = await User.findOne({
//             $or: [
//                 { email },
//                 { 'name.first': name },
//                 { 'name.last': name },
//                 { 'name.middle': name }
//             ]
//         });
//         if (!otherUser) {
//             return res.status(404).json({ message: 'המשתמש לא נמצא' });
//         }
//         // חיפוש כל ההודעות בין המשתמשים (ולא רק אחת)
//         const messages = await Message.find({
//             $or: [
//                 { sender: userId, recipient: otherUser._id },
//                 { sender: otherUser._id, recipient: userId }
//             ]
//         }).sort({ createdAt: 1 }); // מיון מהודעה ישנה לחדשה

//         res.status(200).json({
//             userId: otherUser._id,
//             userName: otherUser.name,
//             messages,
//             message: messages.length > 0 ? 'נמצאו הודעות קיימות' : 'אין הודעות קודמות, ניתן להתחיל צ׳אט חדש'
//         });

//     } catch (error) {
//         console.error('🔴 Error:', error);
//         res.status(500).json({ message: 'שגיאת שרת', error: error.message });
//     }
// }

async function getOpenChat(req, res) {
    try {
        console.log('🔵 Received URL:', req.originalUrl);
        console.log('🟢 Received Query:', req.query);
        console.log('🟡 Request Headers:', req.headers);
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Match failed, no access' })
        }
        const userId = req.user._id
        const { name, email } = req.query
        if (!name?.trim() && !email?.trim()) {
            return res.status(400).json({ message: 'Name or email must be provided' });
        }

        const otherUser = await MessageService.findUserByNameOrEmail(name, email)
        if (!otherUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        const messages = await MessageService.getMessagesBetweenUsers(userId, otherUser._id)
        res.status(200).json({
            userId: otherUser._id,
            userName: otherUser.name,
            messages,
            message: messages.length > 0 ?
                'Found existing messages' : 'No previous messages, you can start a new chat'
        })
    } catch (error) {
        console.error('🔴 Error', error)
        return res.status(500).json({ message: 'server error', error: error.message })
    }
}

async function deleteMessageForSender(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await MessageService.messageForSender(id, userId);
        res.json({ message: 'Message deleted for sender' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteAllMessagesForUser(req, res) {
    try {
        const { userId } = req.params;
        await MessageService.allMessagesForUser(userId);
        res.json({ message: 'All messages deleted for user' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function searchMessages(req, res) {
    try {
        const { query } = req.query;
        const messages = await MessageService.searchMessages(query, req.user.id);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUnreadMessagesCount(req, res) {
    try {
        const count = await MessageService.unreadMessagesCount(req.user.id);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function setTypingStatus(req, res) {
    try {
        const { senderId } = req.params;
        const { isTyping } = req.body;
        await MessageService.setTypingStatus(senderId, isTyping);
        res.json({ message: 'Typing status updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getTypingStatus(req, res) {
    try {
        const { receiverId } = req.params;
        const typingStatus = await MessageService.typingStatus(receiverId);
        res.json({ typingStatus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function markMessageAsDelivered(req, res) {
    try {
        const { id } = req.params;
        await MessageService.markMessageAsDelivered(id);
        res.json({ message: 'Message marked as delivered' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getLastSeen(req, res) {
    try {
        const { userId } = req.params;
        const lastSeen = await MessageService.lastSeen(userId);
        res.json({ lastSeen });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function updateLastSeen(req, res) {
    try {
        await MessageService.updateLastSeen(req.user.id);
        res.json({ message: 'Last seen updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getOnlineStatus(req, res) {
    try {
        const { userId } = req.params;
        const onlineStatus = await MessageService.onlineStatus(userId);
        res.json({ onlineStatus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function updateOnlineStatus(req, res) {
    try {
        await MessageService.updateOnlineStatus(req.user.id);
        res.json({ message: 'Online status updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { sendMessage, getMessages, markMessageAsRead, deleteMessage, updateMessageCount, getMessageById, updateAudioStatus, addAudioToMessage, addFileToMessage, getUserContacts, getChatSummary, deleteMessageForSender, deleteAllMessagesForUser, searchMessages, getUnreadMessagesCount, setTypingStatus, getTypingStatus, markMessageAsDelivered, getLastSeen, updateLastSeen, getOnlineStatus, updateOnlineStatus, getOpenChat }

