const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    fileUrls: [{ type: String }],  // חדש - תמיכה בשליחת קבצים
    audioUrls: [{ type: String }],
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false },  // חדש - האם ההודעה נמסרה
    deletedForSender: { type: Boolean, default: false }, // חדש - מחיקה חד-צדדית
})

module.exports = mongoose.model('Message', messageSchema)
