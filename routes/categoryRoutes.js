const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas para categorías
router.get('/categories', categoryController.getAllCategories);  // Obtener todas las categorías
router.get('/categories/:id', categoryController.getCategoryById);  // Obtener una categoría por ID

//router.post('/categories', protect, categoryController.createCategory);  // Crear categoría solo si está autenticado
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', protect, categoryController.updateCategory);  // Actualizar categoría solo si está autenticado
router.delete('/categories/:id', protect, categoryController.deleteCategory);  // Eliminar categoría solo si está autenticado

module.exports = router;

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *       400:
 *         description: Datos inválidos
 */
