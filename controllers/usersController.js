const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Obtiene todos los usuarios de la base de datos
        res.status(200).json(users);  // Responde con la lista de usuarios
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Login de usuario
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email en la base de datos
        const usuario = await User.findOne({ email });
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
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Busca el usuario por ID
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user); // Responde con los datos del usuario
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};
