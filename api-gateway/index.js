require('dotenv').config();
const express = require('express');
const request = require('request');
const { protect, authorize } = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

// Middleware de autenticación
app.use('/api', protect);

app.use('/api/users', (req, res) => {
  req.pipe(request(`http://users:3000${req.originalUrl}`)).pipe(res);
});

app.use('/api/products', (req, res) => {
  req.pipe(request(`http://products:3000${req.originalUrl}`)).pipe(res);
});

app.use('/api/orders', (req, res) => {
  req.pipe(request(`http://orders:3000${req.originalUrl}`)).pipe(res);
});

app.use('/api/cart', (req, res) => {
  req.pipe(request(`http://cart:3000${req.originalUrl}`)).pipe(res);
});

app.use('/api/categories', (req, res) => {
  req.pipe(request(`http://categories:3000${req.originalUrl}`)).pipe(res);
});

app.use('/api/reviews', (req, res) => {
  req.pipe(request(`http://reviews:3000${req.originalUrl}`)).pipe(res);
});

app.listen(3000, () => console.log('API Gateway corriendo en el puerto 3000'));
