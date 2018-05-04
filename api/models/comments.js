const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postId: {type: mongoose.Schema.Types.ObjectId},
    time: { type: Date, default: Date.now },
    userId: {type: mongoose.Schema.Types.ObjectId},
    postAuthor: {type: String},
    comment:{type: String},
    commentAuthor:{type: String, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);