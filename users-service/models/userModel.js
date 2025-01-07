const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'cliente'],
        default: 'cliente'
    }
});

// Encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Contraseña encriptada en pre-save:', this.password);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;