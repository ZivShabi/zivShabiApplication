// ../models/membershipReq.js
const mongoose = require('mongoose');

const membershipReqSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('membershipReq', membershipReqSchema);
