const Order = require('../models/orderModel');
const axios = require('axios');

// Obtener todos los pedidos del usuario
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
};

// Obtener un pedido por ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el pedido', error });
    }
};

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
    try {
        // Obtener el carrito del usuario
        const cartResponse = await axios.get(`http://cart:3005/api/cart`, {
            headers: { Authorization: req.headers.authorization }
        });
        const cart = cartResponse.data;

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        // Verificar la dirección del usuario
        const userResponse = await axios.get(`http://users:3001/api/users/profile`, {
            headers: { Authorization: req.headers.authorization }
        });
        const user = userResponse.data;

        if (!user.address) {
            return res.status(400).json({ message: 'La dirección del usuario no está disponible' });
        }

        // Crear el pedido
        const order = new Order({
            user: req.user.id,
            items: cart.items,
            total: cart.total,
            shippingAddress: user.address
        });

        await order.save();

        // Actualizar el inventario de productos
        for (const item of cart.items) {
            await axios.put(`http://products:3002/api/products/${item.product}/stock`, {
                quantity: -item.quantity
            });
        }

        // Limpiar el carrito después de crear el pedido
        await axios.delete(`http://cart:3005/api/cart`, {
            headers: { Authorization: req.headers.authorization }
        });

        res.status(201).json({ message: 'Pedido realizado con éxito', order });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pedido', error });
    }
};

// Actualizar un pedido
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        order.status = req.body.status || order.status;
        await order.save();
        res.status(200).json({ message: 'Pedido actualizado', order });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pedido', error });
    }
};

// Eliminar un pedido
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json({ message: 'Pedido eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pedido', error });
    }
};
