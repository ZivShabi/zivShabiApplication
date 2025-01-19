const mongoose = require('mongoose')

const addressData = new mongoose.Schema({
    state: {
        type: String,
        default: '',
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
        default: '',
        trim: true
    },
    houseNumber: {
        type: Number,
        default: 0
    },
    zip: {
        type: String,
        default: '',
        trim: true
    }
},
    { _id: false })

module.exports = addressData
