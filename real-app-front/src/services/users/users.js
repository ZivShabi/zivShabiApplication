import httpService from "../httpService"
import { setToken, getToken } from "./tokenService"
import API_ROUTES from "../apiRoutes"
import { jwtDecode } from "jwt-decode"

export async function registerUser(user) {
    const res = await httpService.post(API_ROUTES.USERS.REGISTER, user)
    setToken(res.data.token)
    return res.data
}

export async function login(credentials) {
    const res = await httpService.post(API_ROUTES.USERS.LOGIN, credentials)
    setToken(res.data.token)
    return res.data
}

export async function changePassword(data) {
    const res = await httpService.patch(API_ROUTES.USERS.CHANGE_PASSWORD, data)
    return res.data
}

export function getUser() {
    const token = getToken()
    return token ? jwtDecode(token) : null
}

export function userslogout() {
    setToken(null)
}

export async function getMe(data) {
    try {
        const res = await httpService.get(API_ROUTES.USERS.ME, data)
        return res.data
    } catch (err) {
        console.error(err);
    }
}
// הפונקציה לשליחת בקשה לחבר
export async function friendRequest(id) {
    try {
        const cleanedId = id.trim();
        const res = await httpService.post(API_ROUTES.USERS.FRIEND_REQUEST(cleanedId), {})
        return res.data;
    } catch (error) {
        console.error("Error sending friend request: ", error.message);
        throw error;
    }
}


// הפונקציה להחזרת בקשות החברות
export const getFriendRequests = async (id) => {
    try {
        const res = await httpService.get(API_ROUTES.USERS.SENT_FRIEND_REQUESTS(id));
        return res.data;
    } catch (error) {
        console.error("Error fetching friend requests:", error.message);
        toast.error("Failed to fetch friend requests.");
        return [];
    }
};
export async function acceptfriendRequest(id) {
    try {
        const res = await httpService.patch(API_ROUTES.USERS.ACCEPT_REG_FRIEND(id));
        return res.data; // חזרת התשובה
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error accepting friend request');
    }
}


export async function deletefriendRequest(id) {
    const res = await httpService.delete(API_ROUTES.USERS.CANCEL_REG_FRIEND(id))
    return res.data
}

export async function getfriends(id) {
    const res = await httpService.get(API_ROUTES.USERS.GET_FRIEND(id))
    return res.data
}



export async function updateUserImage(id, file) {
    const formData = new FormData();
    formData.append("image", file); // "image" זה השם שהשרת מצפה לו

    return await httpService.patch(API_ROUTES.USERS.UPDATE_IMAGE(id), formData,
        { headers: { "Content-Type": "multipart/form-data" } })

}

export async function getUserById(id) {
    const res = await httpService.get(API_ROUTES.USERS.UPDATE(id))
    return res.data;
}

export async function updateUser(id, userData) {
    try {
        const res = await httpService.put(API_ROUTES.USERS.UPDATE(id), userData);
        return res.data;
    } catch (err) {
        console.error('Error updating user:', err.response?.data || err.message);
        throw new Error('Failed to update user');
    }
}


export async function deleteUserAccount(id) {
    const res = await httpService.delete(`${API_ROUTES.USERS.DELETE_ACCOUNT.replace(":id", id)}`)
    return res.data
}

export async function changeBizNumber(id, newBizNumber) {
    const res = await httpService.patch(`${API_ROUTES.USERS.ME(id)}/biz-number`,
        { bizNumber: newBizNumber })
    return res.data
}



