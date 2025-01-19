
const USER_CONSTANTS = { MAX_LOGIN_ATTEMPTS: 100, BLOCK_DURATION_MS: 24 * 60 * 60 * 1000 }

async function handleFailedLogin(user) {
    user.loginAttempts += 1
    if (user.loginAttempts >= USER_CONSTANTS.MAX_LOGIN_ATTEMPTS) {
        user.isBlocked = true
        user.blockUntil = new Date(Date.now() + USER_CONSTANTS.BLOCK_DURATION_MS)
    } await user.save()
}

function isUserBlocked(user) {
    return user.isBlocked && new Date() < user.blockUntil
}

async function resetLoginAttempts(user) {
    user.loginAttempts = 0
    user.isBlocked = false
    user.blockUntil = null
    await user.save()
}

module.exports = { handleFailedLogin, isUserBlocked, resetLoginAttempts }