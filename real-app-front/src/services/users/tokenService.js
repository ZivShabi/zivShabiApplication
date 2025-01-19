const TOKEN_KEY = 'token'

export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token)
    } else {
        localStorage.removeItem(TOKEN_KEY)
    }
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}
