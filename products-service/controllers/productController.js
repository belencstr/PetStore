const Product = require('../models/productModel');
const axios = require('axios');

// Controlador para obtener un producto y sus reseñas
const getProductWithReviews = async (req, res) => {
    const productId = req.params.id;

    try {
        // Buscar el producto en la base de datos
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Llamar al servicio de reviews para obtener las reseñas del producto
        const reviewsResponse = await axios.get(`http://reviews:3004/api/reviews/${productId}`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        const reviews = reviewsResponse.data;

        // Llamar al servicio de reviews para obtener el resumen de reseñas del producto
        const reviewSummaryResponse = await axios.get(`http://reviews:3004/api/reviews/summary/${productId}`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });
        const reviewSummary = reviewSummaryResponse.data;

        // Responder con el producto, sus reseñas y el resumen de reseñas
        res.json({ product, reviews, reviewSummary });
    } catch (error) {
        console.error('Error al obtener el producto con reseñas:', error.message);
        res.status(500).json({ message: 'Error al obtener el producto y sus reseñas' });
    }
};

async function getCategoryById(categoryId, token) {
    try {
        const response = await axios.get(`http://categories:3005/api/categories/${categoryId}`, {
            headers: {
                Authorization: token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener la categoría: ' + error.message);
    }
}
module.exports = { getProductWithReviews, getCategoryById };
// Asegúrate de que getProductWithReviews esté correctamente exportado
module.exports = {
    getProductWithReviews,
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().populate('category');  // Hacemos populate para obtener la categoría completa
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error });
        }
    },
    getProductsByCategory: async (req, res) => {
        try {
            const category = await Category.findOne({ name: req.params.categoryName });
            if (!category) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }
            const products = await Product.find({ category: category._id });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos por categoría', error });
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, description, price, category, stock } = req.body;
            const token = req.headers.authorization;

            // Verificar si la categoría existe llamando al servicio de categorías
            const categoryResponse = await getCategoryById(category, token);
            if (!categoryResponse) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            // Crear un nuevo producto
            const newProduct = new Product({
                name,
                description,
                price,
                category,
                stock
            });

            if (!name || !description || !price || !category || !stock) {
                return res.status(400).json({ message: 'Faltan datos requeridos' });
            }

            // Guardar el producto
            await newProduct.save();
            res.status(201).json({ message: 'Producto creado con éxito', product: newProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error });
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name, description } = req.body;

            // Comprobar si la categoría ya existe
            const categoryExists = await Category.findOne({ name });
            if (categoryExists) {
                return res.status(400).json({ message: 'La categoría ya existe' });
            }

            // Crear una nueva categoría
            const newCategory = new Category({
                name,
                description
            });

            // Guardar la categoría
            await newCategory.save();
            res.status(201).json({ message: 'Categoría creada con éxito', category: newCategory });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la categoría', error });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;

        try {
            // Verificar si el producto existe
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            // Verificar si la categoría existe llamando al servicio de categorías
            const categoryResponse = await axios.get(`http://categories:3005/api/categories/${category}`);
            const categoryExists = categoryResponse.data;

            if (!categoryExists) {
                return res.status(404).json({ message: 'Categoría no encontrada' });
            }

            // Actualizar el producto
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            await product.save();
            res.status(200).json({ message: 'Producto actualizado', product });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto', error });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;

        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json({ message: 'Producto eliminado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto', error });
        }
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, categoryId } = req.body;

        // Verificar si la categoría existe llamando al servicio de categorías
        const category = await getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        const product = new Product({
            name,
            price,
            category: categoryId,
        });

        await product.save();
        res.status(201).json({ message: 'Producto creado con éxito', product });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};





