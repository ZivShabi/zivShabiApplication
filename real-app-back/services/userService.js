

//../services/userService.js
const jwt = require("jsonwebtoken")
const config = require("config")
const User = require('../models/user')
err = require('../middlewares/errorMiddleware')
UserServiceUtils = require('../services/userServiceUtils')

async function registerNewUser(data) {
    const { name, email, password, isBusiness, address, image } = data
    console.log(address, image)
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
        return err.StringErrEmail()
    }
    const hashedPassword = await User.hashPassword(password)
    if (!hashedPassword) {
        err.stringErrPassword()
    }
    const user = new User({
        image,
        address,
        name,
        email,
        password: hashedPassword,
        isBusiness
    })
    return await user.saveUser()
}

async function validateUser(email, password) {
    const user = await User.findEmailPassword(email)
    if (!user) {
        err.StringErrEmailOrPassword()
    }
    const isPasswordValid = await User.comparePassword(user, password)
    if (!isPasswordValid) {
        await UserServiceUtils.handleFailedLogin(user)
        err.StringErrEmailOrPassword()
    }
    if (UserServiceUtils.isUserBlocked(user)) {
        err.StringErrBlocked()
    }
    await UserServiceUtils.resetLoginAttempts(user)
    return user
}

function generateAuthToken(user) {
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        isBusiness: user.isBusiness,
        role: user.role,
        image: user.image,
        address: user.address,

        iat: Date.now()
    }, config.get("jwtKey"), { expiresIn: '1h' })
    return token
}


async function getUserById(id) {
    const user = await User.findById(id)
    if (!user) {
        err.StringErrUser()
    }
    return user
}

async function updateDataUser(id, updateFields) {
    return await User.updateData(id, updateFields)
}

async function deleteUserID(id) {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
        err.StringErrUser()
    }
}

async function updatePassword(userId, oldPassword, newPassword) {
    try {
        return await User.changePassword(userId, oldPassword, newPassword)
    } catch (error) {
        throw new Error(error.message)
    }
}



async function updateImage(id, imageUrl) {
    const user = await User.findById(id)
    if (!user) {
        StringErrUser()
    }
    user.profileImage = imageUrl
    return await user.save()
}


module.exports = { generateAuthToken, registerNewUser, validateUser, updatePassword, updateImage, getUserById, deleteUserID, updateDataUser }


