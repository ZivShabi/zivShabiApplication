
import config from "../config.json"
import axios from "axios"
import { getToken } from "./users/tokenService"
const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? config.URI
    : 'https://zivshabiapplicationbackend.onrender.com'

// const API_BASE_URL = process.env.REACT_APP_ENVIRONMENT === 'development'
//     ? process.env.REACT_APP_API_LOCAL_URL
//     : process.env.REACT_APP_API_BACK_URL;

axios.defaults.baseURL = API_BASE_URL

axios.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
}

export default httpService