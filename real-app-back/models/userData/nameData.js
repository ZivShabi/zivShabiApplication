const mongoose = require('mongoose')
const nameData = new mongoose.Schema({
    first: {
        type: String,
        default: 'ziv',
        required: true,
        minlength: [3],
        trim: true
    },
    middle: {
        type: String,
        default: '',
        minlength: [3],
        trim: true
    },
    last: {
        type: String,
        default: '',
        required: true,
        minlength: [3],
        trim: true
    }
},
    { _id: false })

module.exports = nameData
