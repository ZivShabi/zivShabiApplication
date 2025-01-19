// const { string } = require('joi')
const mongoose = require('mongoose')
const addressData = new mongoose.Schema({
    state: {
        type: String,
        default: 'TLV',
        trim: true
    },
    country: {
        type: String,
        default: 'Israel',
        trim: true
    },
    city: {
        type: String,
        default: '',
        trim: true
    },
    street: {
        type: String,
        default: '456',
        trim: true
    },
    houseNumber: {
        type: Number,
        default: 0
    }
},
    { _id: false })

module.exports = addressData
