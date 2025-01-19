const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, default: null },
    audioUrl: { type: String, default: null },
    audioUrls: [{ type: String }],
    audioListeners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    audioStatus: { type: String, enum: ['not_listened', 'listened'], default: 'not_listened' },
    videoUrl: { type: String, default: null }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
