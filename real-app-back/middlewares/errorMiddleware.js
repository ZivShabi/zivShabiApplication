
const { logErrorToFile } = require('../utils/logger');

const ERROR_MESSAGES = {
    ACCOUNT_BLOCKED: 'Account is blocked',
    MISSING_PASSWORD: 'Password is required',
    EMAIL_IN_USE: 'Email is already in use',
    INVALID_CREDENTIALS: 'Invalid email or password',
    ENCRYPTION_FAILED: 'Failed to encrypt password',
    USER: 'User not found',
    US_BIZ_EXISTS: 'Business number already exists',
    SERVER_ERR: 'Internal server error',
    SENDER_OR_RECIVER: 'sender or receiver not found'
}
const STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}
function stringErrSenderOrReceiver() {
    throw createError(ERROR_MESSAGES.SENDER_OR_RECIVER)
}
function StringErrBusiness() {
    throw createError(ERROR_MESSAGES.US_BIZ_EXISTS, STATUS_CODES.BAD_REQUEST)
}
function StringErrPassword() {
    return createError(ERROR_MESSAGES.ENCRYPTION_FAILED, STATUS_CODES.BAD_REQUEST)
}
function StringErrBlocked() {
    return createError(ERROR_MESSAGES.ACCOUNT_BLOCKED, STATUS_CODES.FORBIDDEN)
}

function StringErrEmail() {
    createError(ERROR_MESSAGES.EMAIL_IN_USE, STATUS_CODES.BAD_REQUEST)
}
function StringErrEmailOrPassword() {
    return createError(ERROR_MESSAGES.INVALID_CREDENTIALS, STATUS_CODES.BAD_REQUEST)
}
function StringErrUser() {
    throw createError(ERROR_MESSAGES.USER, STATUS_CODES.NOT_FOUND)
}

function errorHandler(err, req, res, next) {
    const statusCode = err.status || STATUS_CODES.SERVER_ERROR
    const message = err.message || ERROR_MESSAGES.SERVER_ERR
    logErrorToFile(statusCode, message)

    console.error(`[ERROR] ${message}`)
    res.status(statusCode).json({ message })
}


function createError(message, statusCode) {
    const error = new Error(message)
    error.status = statusCode
    return error
}

module.exports = { errorHandler, createError, StringErrEmail, StringErrEmailOrPassword, StringErrUser, StringErrBlocked, StringErrPassword, StringErrBusiness, stringErrSenderOrReceiver }
