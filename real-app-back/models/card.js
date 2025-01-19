
const mongoose = require('mongoose')
const cardData = require('./cardData/mainData')
const Card = mongoose.model('Card', cardData)
module.exports = Card


