const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, loginUser } = require('../controllers/usersController');
const { protect } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/', protect, getAllUsers);
router.get('/:id', getUserById);

// Ruta para iniciar sesión
router.post('/login', loginUser);

module.exports = router;
