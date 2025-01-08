const express = require('express');
const router = express.Router();
const {getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas para categorías
router.get('/', protect, getAllCategories); 

router.get('/:id', protect, getCategoryById);  

router.post('/', protect, createCategory);  

router.put('/:id', protect, updateCategory);  

router.delete('/:id', protect, deleteCategory); 

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
