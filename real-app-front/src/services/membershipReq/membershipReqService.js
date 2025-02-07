import httpService from "../httpService"
import API_ROUTES from "../apiRoutes"


export async function getMeuUsers(userId) {
    try {

        const res = await httpService.get(API_ROUTES.MEMBERSHIP_REQ.ME_USERS(userId));
        return res.data;
    } catch (err) {
        console.error("Error fetching users:", err);
        throw err;
    }
}

// הפונקציה לשליחת בקשה לחבר
export async function friendRequest(id) {
    try {
        const res = await httpService.post(API_ROUTES.MEMBERSHIP_REQ.FRIEND_REQUEST(id), {});
        return res.data;
    } catch (error) {
        console.error("Error sending friend request: ", error.message);
        throw error;
    }
}



// הפונקציה להחזרת בקשות החברות
export async function getFriendRequests(id) {
    if (!id) {
        console.error("User ID is missing");
        return [];
    }
    try {
        const res = await httpService.get(API_ROUTES.MEMBERSHIP_REQ.SENT_FRIEND_REQUESTS(id));
        return res.data;
    } catch (error) {
        console.error("Error fetching friend requests:", error.message);
        return [];
    }
}


export async function acceptFriendRequest(id) {
    try {
        const res = await httpService.patch(API_ROUTES.MEMBERSHIP_REQ.ACCEPT_REG_FRIEND(id));
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error accepting friend request");
    }
}

export async function deleteFriendRequest(id) {
    try {
        const res = await httpService.delete(API_ROUTES.MEMBERSHIP_REQ.CANCEL_REG_FRIEND(id));
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error deleting friend request");
    }
}

export async function getFriends(id) {
    try {
        const res = await httpService.get(API_ROUTES.MEMBERSHIP_REQ.GET_FRIEND(id));
        return res.data;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
}
