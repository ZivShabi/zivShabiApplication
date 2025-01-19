const mongoose = require('mongoose')

const imageData = new mongoose.Schema({
    url: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        trim: true
    },
    alt: {
        type: String,
        default: 'Profile Image',
        trim: true
    }
},
    { _id: false })

module.exports = imageData
