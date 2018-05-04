const mongoose = require('mongoose');

const newUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true},
    password: {type: String, required: true},
    createdPosts: {type: Array},
    votedPosts: {type: Array},
    
});

module.exports = mongoose.model('User', newUserSchema);