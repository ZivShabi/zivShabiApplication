

//models/user.js
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userData = require('./userData/mainUsData')
const userSchema = new mongoose.Schema(userData)

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}
userSchema.methods.saveUser = async function () {
    return await this.save()
}
userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email })
}

userSchema.statics.findEmailPassword = async function (email) {
    return await User.findOne({ email }).select('+password')
}

userSchema.statics.comparePassword = async function (user, password) {
    if (!user || !user.password || !password) {
        throw new Error('Invalid user or password')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Passwords do not match')
    }
    return isMatch
}
userSchema.statics.changePassword = async function (id, oldPassword, newPassword) {
    const user = await this.findById(id).select('+password')
    if (!user) {
        throw new Error('User not found')
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
        throw new Error('Old password is incorrect')
    }
    const hashedPassword = await this.hashPassword(newPassword)
    user.password = hashedPassword
    await user.save()
    return { message: 'Password updated successfully' }
}


userSchema.statics.updateData = async function (id, { name, email, password, isBusiness }) {
    const user = await this.findById(id)
    if (!user) throw new Error('User not found')
    if (password) user.password = await this.hashPassword(password)
    user.name = name || user.name
    user.email = email || user.email
    user.isBusiness = isBusiness ?? user.isBusiness
    return await user.save()
}

userSchema.statics.updateBizNumber = async function (id, bizNumber) {
    const existingBiz = await this.findOne({ bizNumber })
    if (existingBiz) {
        throw new Error('Business number already exists')
    }
    const user = await this.findByIdAndUpdate(id, { bizNumber }, { new: true })
    if (!user) throw new Error('User not found')
    return user
}


userSchema.statics.getAllUsers = async function () {
    return await this.find()
}


const User = mongoose.model('User', userSchema)
module.exports = User
