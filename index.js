require('dotenv').config();

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // Importar rutas de reseñas
const categoryRoutes = require('./routes/categoryRoutes'); // Importar rutas de categorías
const cartRoutes = require('./routes/cartRoutes'); // Importar rutas de carrito

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger Definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
      title: 'Tienda de Mascotas API',
      version: '1.0.0',
      description: 'API para la tienda de mascotas',
  },
  servers: [
      {
          url: 'http://localhost:3000',
      },
  ],
};

// Opciones de Swagger
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './controllers/*.js'],
};

// Generar documentación Swagger
const swaggerSpec = swaggerJSDoc(options);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la tienda de mascotas!');
});

// Usar las rutas de usuarios, productos, pedidos, reseñas, categorías y carrito
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes); // Usar rutas de reseñas
app.use('/api/categories', categoryRoutes); // Usar rutas de categorías
app.use('/api/cart', cartRoutes); // Usar rutas de carrito

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
