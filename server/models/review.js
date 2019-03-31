const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
    text: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
})

var Review = mongoose.model('review', reviewSchema);
module.exports = Review;