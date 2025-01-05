const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  // Relacionamos con el modelo de categorías
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
