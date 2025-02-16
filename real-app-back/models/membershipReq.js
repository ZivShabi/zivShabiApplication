// ../models/membershipReq.js
const mongoose = require('mongoose');

const membershipReqSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sentFriendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('membershipReq', membershipReqSchema);
