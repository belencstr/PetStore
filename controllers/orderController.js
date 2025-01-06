const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

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
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        const order = new Order({
            user: req.user.id,
            items: cart.items,
            total: cart.total,
            shippingAddress: req.body.shippingAddress
        });

        await order.save();
        await Cart.findOneAndDelete({ user: req.user.id }); // Limpiar el carrito después de crear el pedido

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
