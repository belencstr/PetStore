const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Relacionamos con el modelo de usuario
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Relacionamos con el modelo de producto
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,  // Rango de estrellas (1 a 5)
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
