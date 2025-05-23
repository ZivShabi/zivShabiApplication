
const API_ROUTES = {
    USERS: {
        REGISTER: "/users/register",
        LOGIN: "/users/login",
        CHANGE_PASSWORD: '/users/changePassword',
        ME: "/users",
        UPDATE_IMAGE: (id) => `/users/updateImage/${id}`,
        UPDATE: (id) => `/users/${id}`,
        GOOGLE_AUTH: "/users/auth/google",
        DELETE_ACCOUNT: (id) => `/users/${id}`,
        GET_FRIEND: (id) => `/users/${id}/friends`,
    },

    MEMBERSHIP_REQ: {
        ME_USERS: (id) => `/membershipReq/getUsers/${id}`,
        FRIEND_REQUEST: (id) => `/membershipReq/${id}/friend-request`,
        SENT_FRIEND_REQUESTS: (id) => `/membershipReq/${id}/sent-friend-requests`,
        CANCEL_REG_FRIEND: (id) => `/membershipReq/${id}/cancel-friend-request`,
        ACCEPT_REG_FRIEND: (id) => `/membershipReq/${id}/accept-friend-request`,
        GET_FRIEND: (id) => `/membershipReq/${id}/friends`,
    },


    MESSAGES: {
        GET_ALL: "/messages",
        GET_ALL_USERS: "/messages/contacts",
        GET_OPEN_CHAT_USERS: (name) => `/messages/open-chat?name=${encodeURIComponent(name)}`,
        GET_SUMMARY_USERS: (receiverId, senderId) => `/messages/${receiverId}/summary/${senderId}`,
        SEND: (recipientId) => `/messages/${recipientId}`,
        MARK_AS_READ: (messageId) => `/messages/${messageId}/read`,
        DELETE: (messageId) => `/messages/${messageId}`,
        UPDATE_MESSAGE_COUNT: (userId) => `/messages/${userId}/messageCount`,
        GET_BY_ID: (id, messageId) => `/messages/${id}/message/${messageId}`,
        ADD_AUDIO: (messageId) => `/messages/${messageId}/addAudio`,
        UPDATE_AUDIO_STATUS: (messageId) => `/messages/${messageId}/audioStatus`,
    },

    POSTS: {
        GET_ALL: '/posts',
        LIKE: (postId) => `/posts/${postId}/like`,
        CREATE: '/posts',
        DELETE: (postId) => `/posts/${postId}`,
        ADD_IMAGE: (postId) => `/posts/${postId}/addImage`,
        ADD_AUDIO: (postId) => `/posts/${postId}/addAudio`,
        UPDATE_AUDIO_STATUS: (postId) => `/posts/${postId}/audioStatus`,
        ADD_VIDEO: (postId) => `/posts/${postId}/addVideo`,
    },

    POSTS_RESPONSE: {
        GET_ALL: `/PostResponseRoutes`,
        CREATE: (responseId) => `/PostResponseRoutes/${responseId}`,
        DELETE: (responseId) => `/PostResponseRoutes/${responseId}`,
        EDIT: (responseId) => `/PostResponseRoutes/${responseId}`,
        LIKE: (responseId) => `/PostResponseRoutes/${responseId}/like`,
        UNLIKE: (responseId) => `/PostResponseRoutes/${responseId}/unlike`,
    },

    CARDS: {
        GET_ALL: "/cards",
        CREATE: "/cards",
        USER_Id: "/cards/mycards",
        LIKE: (id) => `/cards/${id}/like`,
        UN_LIKE: (id) => `/cards/${id}/unlike`,
        DELETE: (id) => `/cards/${id}`,
        CARD_ID: (id) => ` / cards / ${id}`,
    },

    RATINGS: {
        ADD_RATING: "/ratings",
        AVERAGE_RATING: "/ratings",
    }

}
export default API_ROUTES
