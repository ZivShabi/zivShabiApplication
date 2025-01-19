

import httpService from "../httpService"
import API_ROUTES from "../apiRoutes"

export async function fetchResponses(postId) {
    const { data } = await httpService.get(
        `${API_ROUTES.POSTS_RESPONSE.GET_ALL}/${postId}`
    )
    return data
}

export async function createResponse(postId, newContent) {
    const { data } = await httpService.post(
        API_ROUTES.POSTS_RESPONSE.CREATE(postId),
        { content: newContent }
    )
    return data
}

export async function deleteResponse(postId) {
    const { data } = await httpService.delete(
        API_ROUTES.POSTS_RESPONSE.DELETE(postId)
    )
    return data
}

export async function updateResponse(postId, updatedContent) {
    const { data } = await httpService.put(
        API_ROUTES.POSTS_RESPONSE.EDIT(postId),
        { content: updatedContent }
    )
    return data
}

export async function likeResponse(responseId) {
    try {
        const res = await httpService.post(API_ROUTES.POSTS_RESPONSE.LIKE(responseId), {});
        return res.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error liking response:", errorMessage);
        throw error;
    }
}

export async function unlikeResponse(responseId) {
    try {
        const { data } = await httpService.delete(API_ROUTES.POSTS_RESPONSE.UNLIKE(responseId));
        return data;
    } catch (error) {
        console.error("Error unliking response", error.response?.data || error.message);
        throw error;
    }
}
