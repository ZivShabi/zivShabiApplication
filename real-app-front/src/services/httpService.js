
import axios from "axios"
import config from "../config.json"
import { getToken } from "./users/tokenService"

axios.defaults.baseURL = config.URI

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