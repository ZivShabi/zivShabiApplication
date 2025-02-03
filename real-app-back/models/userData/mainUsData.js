const nameData = require('../userData/nameData')
const addressSchema = require('../userData/addressData')
const imageSchema = require('../userData/imageData')
const mongoose = require('mongoose')
const userData = new mongoose.Schema({

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    name: nameData,
    email: {
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/],
        index: true
    },
    password: {
        type: String,
        default: '',
        required: true,
        minlength: [10],
        select: false
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    blockUntil: {
        type: Date,
        default: null
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    address: addressSchema,
    image: imageSchema,
    profileImage: { type: String }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = userData
