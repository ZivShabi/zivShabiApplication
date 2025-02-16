const nameData = require('../userData/nameData')
const addressSchema = require('../userData/addressData')
const imageSchema = require('../userData/imageData')
const mongoose = require('mongoose')
const userData = new mongoose.Schema({

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
    profileImage: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = userData
