const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Relacionamos con el modelo de usuario
        required: true,
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',  // Relacionamos con el modelo de producto
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,  // Al menos un producto
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    total: {
        type: Number,
        required: true,
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
