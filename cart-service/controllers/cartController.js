const Cart = require('../models/cartModel');
const axios = require('axios');

// Obtener el carrito del usuario
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Verificar disponibilidad del producto con el servicio de Productos
        const productResponse = await axios.get(`http://products:3002/api/products/${productId}`);
        const product = productResponse.data;

        if (!product || product.stock < quantity) {
            return res.status(404).json({ message: 'Producto no disponible' });
        }

        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [], total: 0 });
        }

        // Verificar si el producto ya está en el carrito
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity, price: product.price });
        }

        // Calcular el total
        cart.total = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto al carrito', error });
    }
};

// Actualizar el carrito
exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        cart.items[itemIndex].quantity = quantity;
        cart.total = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

        await cart.save();
        res.status(200).json({ message: 'Carrito actualizado', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el carrito', error });
    }
};

// Vaciar el carrito
exports.clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user.id });
        res.status(200).json({ message: 'Carrito vacío' });
    } catch (error) {
        res.status(500).json({ message: 'Error al vaciar el carrito', error });
    }
};
