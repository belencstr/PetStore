const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para productos
router.get('/products', productController.getAllProducts);  // Obtener todos los productos
router.get('/products/category/:categoryName', productController.getProductsByCategory);  // Obtener productos por categoría

module.exports = router;
