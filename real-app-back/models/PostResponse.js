

const mongoose = require('mongoose')

const postResponseSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // הוספת שדה לייקים

})

const PostResponse = mongoose.model('PostResponse', postResponseSchema)
module.exports = PostResponse
