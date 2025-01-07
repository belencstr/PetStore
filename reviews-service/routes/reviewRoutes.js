const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas para reseñas
router.get('/:productId', reviewController.getReviewsByProduct);  // Obtener reseñas de un producto
router.get('/summary/:productId', reviewController.getReviewSummaryByProduct);  // Obtener resumen de reseñas de un producto
router.post('/', protect, reviewController.createReview);  // Crear una reseña
router.put('/:id', protect, reviewController.updateReview);  // Actualizar reseña
router.delete('/:id', protect, reviewController.deleteReview);  // Eliminar reseña

module.exports = router;


/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Obtener todas las reseñas
 *     responses:
 *       200:
 *         description: Lista de reseñas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Crear una nueva reseña
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
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reseña creada con éxito
 *       400:
 *         description: Datos inválidos
 *      404:
 *        description: Producto no encontrado
 *     500:
 *      description: Error al crear la reseña
 */
