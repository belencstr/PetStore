require('dotenv').config(); // Cargar las variables de entorno
const fs = require('fs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DB_URI; // Conexión a MongoDB
const dbName = process.env.DB_NAME; // Nombre de la base de datos

async function insertUsers() {
    const client = new MongoClient(uri);

    try {
        // Leemos los datos de los usuarios desde el archivo JSON
        const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

        await client.connect();
        console.log("Conectado a MongoDB");

        const db = client.db(dbName);
        const usersCollection = db.collection('users'); // Accedemos a la colección de usuarios

        // Insertamos los datos
        const result = await usersCollection.insertMany(usersData);
        console.log(`${result.insertedCount} usuarios fueron insertados correctamente.`);
    } catch (error) {
        console.error("Error al insertar usuarios:", error);
    } finally {
        await client.close();
    }
}

insertUsers();
