
const MessageService = require('../services/messageService')
const Message = require('../models/message')
const { uploadFile } = require('../middlewares/fileUploadMulter')

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

module.exports = { sendMessage, getMessages, markMessageAsRead, deleteMessage, updateMessageCount, getMessageById, updateAudioStatus, addAudioToMessage }

