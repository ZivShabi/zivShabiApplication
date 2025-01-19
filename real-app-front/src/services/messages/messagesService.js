import httpService from "../httpService"
import API_ROUTES from "../apiRoutes"


export async function getAllMessages() {
    return await httpService.get(API_ROUTES.MESSAGES.GET_ALL)

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
        console.error(err);
    }
}

