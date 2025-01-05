// config/db.js
const { MongoClient } = require('mongodb');

const uri = process.env.DB_URI; // Usa la variable de entorno
const dbName = process.env.DB_NAME; // Nombre de la base de datos

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log(`Conectado a la base de datos: ${dbName}`);
        return client.db(dbName);
    } catch (error) {
        console.error("Error de conexión:", error);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
}

module.exports = connectDB;
