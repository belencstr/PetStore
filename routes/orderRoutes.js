const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas para pedidos
router.get('/', protect, orderController.getAllOrders);  // Obtener todos los pedidos del usuario
router.get('/:id', protect, orderController.getOrderById);  // Obtener un pedido por ID
router.post('/', protect, orderController.createOrder);  // Crear un nuevo pedido
router.put('/:id', protect, orderController.updateOrder);  // Actualizar un pedido
router.delete('/:id', protect, orderController.deleteOrder);  // Eliminar un pedido

module.exports = router;


/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                   total:
 *                     type: number
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Orden creada con éxito
 *       400:
 *         description: Datos inválidos
 */
