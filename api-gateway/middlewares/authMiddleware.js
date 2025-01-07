const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token;

    // Verificar si el token está en los encabezados
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token
            token = req.headers.authorization.split(' ')[1];

            // Verificar y decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Agregar el id del usuario al request para que esté disponible en las rutas
            req.user = decoded;
            next(); // Continuar con la ejecución de la ruta
        } catch (error) {
            res.status(401).json({ message: 'No autorizado, token inválido' });
        }
    }

    // Si no se envió el token
    if (!token) {
        res.status(401).json({ message: 'No autorizado, falta el token' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No autorizado para acceder a este recurso' });
        }
        next();
    };
};
