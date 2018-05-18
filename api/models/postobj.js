const mongoose = require('mongoose');

const createPostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post: { type: String, required: true, index: true},
    posResponses: {type: Number, default: 0},
    negResponses: {type: Number, default: 0},
    allResponses: {type: Number, default:0},
    votedBy: { type: Array },
    votedYes:{ type: Array },
    votedNo:{ type: Array },
    time: { type: Date, default: Date.now },
    author: {type: String},
    authorusername: {type: String},
    imagePath:{type: String},
    imageId: {type: String}
});





module.exports = mongoose.model('PostObj', createPostSchema);