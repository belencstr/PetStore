const jwt = require('jsonwebtoken');

// Middleware para proteger rutas
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado, no se encontró el token' });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.user = decoded; // Agregar datos del usuario al request
        next(); // Continuar al controlador
    } catch (err) {
        return res.status(401).json({ error: 'No autorizado, token inválido' });
    }
};

module.exports = { protect };
