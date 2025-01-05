require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/usersRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la tienda de mascotas!');
});

// Usar las rutas de usuarios
app.use('/api/users', userRoutes);

// Conectar a la base de datos y luego iniciar el servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1); // Salir si no se pudo conectar
  });

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const db = await connectDB(); // Conectamos a la base de datos
    const usersCollection = db.collection('users'); // Accedemos a la colección de usuarios
    const users = await usersCollection.find().toArray(); // Obtenemos todos los usuarios
    res.json(users); // Respondemos con los usuarios
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
});
