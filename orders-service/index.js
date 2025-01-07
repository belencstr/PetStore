require('dotenv').config(); // Para usar las variables de entorno
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes'); // Rutas del servicio de pedidos

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); // Salir si no se conecta
  }
};

// Usar las rutas del servicio de pedidos
app.use('/api/orders', orderRoutes);

// Configurar el puerto
const PORT = process.env.PORT || 3003;

// Iniciar el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor de pedidos corriendo en http://localhost:${PORT}`);
  });
});
