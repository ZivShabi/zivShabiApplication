import httpService from "../httpService"
import API_ROUTES from "../apiRoutes"


export async function getAllPosts() {
    return await httpService.get(API_ROUTES.POSTS.GET_ALL)
}

export async function likePosts(postId) {
    return await httpService.patch(API_ROUTES.POSTS.Like(postId))
}


// export async function createPosts(postData) {
//     return await httpService.post(API_ROUTES.POSTS.CREATE, postData)
// }
export async function createPosts(content, imageFile) {
    const formData = new FormData();
    formData.append('content', content);
    if (imageFile) {
        formData.append('image', imageFile);
    }
    return await httpService.post(API_ROUTES.POSTS.CREATE, formData);
}



export async function deletePosts(id) {
    const res = await httpService.delete(API_ROUTES.POSTS.DELETE(id))
    return res.data
}

export async function addImageToPost(postId, imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    return await httpService.patch(API_ROUTES.POSTS.ADD_IMAGE(postId), formData);
}



export async function addAudioToPost(postId, formData) {
    try {
        const res = await httpService.patch(API_ROUTES.POSTS.ADD_AUDIO(postId), formData);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error('Error adding Audio ', error.response?.data || error.message);
        throw error;
    }
}


export async function updateAudioStatus(postId, userId) {
    try {
        const res = await httpService.get(API_ROUTES.POSTS.UPDATE_AUDIO_STATUS(postId), {
            userId: userId
        });
        return res.data;
    } catch (error) {
        console.error('Error updating audio status:', error.response?.data || error.message);
        throw error;
    }
}


export async function addVideoToPost(postId, videoFile) {
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
        const res = await httpService.patch(API_ROUTES.POSTS.ADD_VIDEO(postId), formData);
        return res.data;
    } catch (error) {
        console.error('Error adding video to post:', error.response?.data || error.message);
        throw error;
    }
};


