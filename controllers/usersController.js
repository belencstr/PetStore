const mongoose = require('mongoose'); // Importar mongoose
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

// Función para iniciar sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Inicio de sesión solicitado:', { email, password });

        // Buscar al usuario por el email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        console.log('Usuario encontrado:', user);

        // Verificar la contraseña con bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Contraseña ingresada:', password);
        console.log('Contraseña almacenada:', user.password);
        console.log('Resultado de comparación:', isMatch);
        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        console.log('Contraseña correcta');

        // Crear un token JWT
        const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Devolver el token al usuario
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        // Validar si el ID es un formato válido de MongoDB
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: 'ID de usuario no válido' });
        }

        // Buscar el usuario por ID
        const user = await User.findById(req.params.id);

        // Si el usuario no existe, devolver un error 404
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, devolver los datos del usuario
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};


// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const { name, email, password, rol } = req.body;

    try {
        console.log('Registro de usuario solicitado:', { name, email, password, rol });

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const user = new User({
            name,
            email,
            password,
            rol
        });

        // Guardar el usuario en la base de datos
        await user.save();

        console.log('Usuario registrado:', user);

        // Crear token JWT
        const token = jwt.sign(
            { id: user._id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ message: 'Usuario registrado con éxito', token });
    } catch (error) {
        console.error('Error al registrar el usuario:', error); // Agregar log de error
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
};

// Actualizar perfil del usuario
exports.updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({ message: 'Perfil actualizado con éxito', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil', error });
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};
