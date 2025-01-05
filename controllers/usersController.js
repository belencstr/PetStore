const users = require('../models/users.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    res.json({
        message: 'Usuarios obtenidos exitosamente',
        usuarioAutenticado: req.user, // Información del usuario extraída del token
        users,
    });
};


// Login de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const usuario = users.find((u) => u.email === email); // Cambié `usuarios` a `users`
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Inicio de sesión exitoso', token });
};

// Obtener un usuario por ID
const getUserById = (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
};

module.exports = { getAllUsers, loginUser, getUserById };
