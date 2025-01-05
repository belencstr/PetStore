const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'cliente' // Puede ser 'cliente' u otro rol según tu aplicación
    }
}, {
    timestamps: true // Esto añade campos de fecha de creación y actualización automáticamente
});

module.exports = mongoose.model('User', userSchema);
