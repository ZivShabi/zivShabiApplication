const mongoose = require('mongoose')

const imageData = require('../cardData/imageData')
const addressData = require('../cardData/addressData')

const cardData = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    title: {
        type: String,
        required: [true, 'required'],
        trim: true
    },
    subtitle: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'required'],
        match: [/^\+?[0-9\s\-()]{7,15}$/]
    },
    email: {
        type: String,
        required: [true, 'required'],
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    web: {
        type: String,
        default: '',
        trim: true
    },
    image: imageData,
    address: addressData
}, {
    timestamps: true,
    versionKey: false
})

module.exports = cardData
