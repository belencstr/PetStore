const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas para carrito
router.get('/', protect, cartController.getCart);  // Obtener el carrito del usuario
router.post('/', protect, cartController.addToCart);  // Agregar un producto al carrito
router.put('/', protect, cartController.updateCart);  // Actualizar carrito
router.delete('/', protect, cartController.clearCart);  // Vaciar carrito

module.exports = router;


/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtener el carrito de compras
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                       quantity:
 *                         type: number
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Agregar producto al carrito
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto agregado al carrito con éxito
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Eliminar producto del carrito
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito con éxito
 *       404:
 *         description: Producto no encontrado en el carrito
 */
