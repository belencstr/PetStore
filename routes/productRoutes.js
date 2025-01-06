const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas para productos
router.get('/', productController.getAllProducts);  // Obtener todos los productos
router.get('/category/:categoryName', productController.getProductsByCategory);  // Obtener productos por categoría

router.post('/', protect, productController.createProduct); // Crear producto solo si está autenticado
router.put('/:id', protect, productController.updateProduct); // Actualizar producto solo si está autenticado
router.delete('/:id', protect, productController.deleteProduct); // Eliminar producto solo si está autenticado

module.exports = router;

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos con sus categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                   stock:
 *                     type: number
 */

/**
 * @swagger
 * /api/products/category/{categoryName}:
 *   get:
 *     summary: Obtener productos por categoría
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         description: Nombre de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos en una categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                   stock:
 *                     type: number
 *       404:
 *         description: Categoría no encontrada
 */
