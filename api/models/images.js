const mongoose = require('mongoose');

const imagesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image: {type: String},
});





module.exports = mongoose.model('images', imagesSchema);