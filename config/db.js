// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            dbName: process.env.DB_NAME
        });
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar con Mongo: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
