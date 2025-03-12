import httpService from "../httpService"
import API_ROUTES from "../apiRoutes"


export function getAllMessages() {
    return httpService.get(API_ROUTES.MESSAGES.GET_ALL)

}

export async function sendMessage(recipientId, message) {
    return await httpService.post(API_ROUTES.MESSAGES.SEND(recipientId),
        { message })

}
export async function markMessageAsRead(messageId) {
    const res = await httpService.patch(API_ROUTES.MESSAGES.MARK_AS_READ(messageId))
    return res.data

}

export async function deleteMessage(messageId) {
    return await httpService.delete(API_ROUTES.MESSAGES.DELETE(messageId))

}

export async function updateMessageCount(userId) {
    const res = await httpService.patch(API_ROUTES.MESSAGES.UPDATE_MESSAGE_COUNT(userId))
    return res.data
}

export async function getMessageById(id, messageId) {
    try {
        const res = await httpService.get(API_ROUTES.MESSAGES.GET_BY_ID(id, messageId));
        return res.data.message;
    } catch (err) {
        console.error('Error fetching message:', err);
        throw err;
    }
}


export async function addAudioToMessage(messageId, formData) {
    try {
        const res = await httpService.patch(API_ROUTES.MESSAGES.ADD_AUDIO(messageId), formData)
        return res.data
    } catch (error) {
        console.error('Error adding Audio ', error.response?.data || error.message)
        throw error
    }
}

export async function updateAudioStatus(messageId, userId) {
    try {
        const res = await httpService.get(API_ROUTES.MESSAGES.UPDATE_AUDIO_STATUS(messageId), {
            params: { userId }
        })
        return res.data
    } catch (error) {
        console.error('Error updating audio status', error.response?.data || error.message)
        throw error
    }
}

export async function getAllMessagesUsers() {
    try {
        const res = await httpService.get(API_ROUTES.MESSAGES.GET_ALL_USERS);
        return res.data;
    } catch (error) {
        console.error('Error fetching contacts:', error.response?.data || error.message);
        return []; // מניעת קריסה
    }
}



export async function getSummaryMessagesUsers(receiverId, senderId) {
    try {
        const res = await httpService.get(API_ROUTES.MESSAGES.GET_SUMMARY_USERS(receiverId, senderId));
        return res.data;
    } catch (error) {
        console.error('Error fetching contacts:', error.response?.data || error.message);
        return []
    }
}

export async function openChatMessagesUsers(name) {
    try {
        const res = await httpService.get(API_ROUTES.MESSAGES.GET_OPEN_CHAT_USERS(name))
        return res.data;
    } catch (error) {
        console.error('❌ Error fetching chat:', error.response?.data || error.message);
        return []
    }
}


