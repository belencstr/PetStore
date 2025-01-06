const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// Obtener todos los productos con su categoría
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');  // Hacemos populate para obtener la categoría completa
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

// Buscar productos por categoría
exports.getProductsByCategory = async (req, res) => {
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
};

// Añadir un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Comprobar si la categoría existe
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
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
};

// Añadir una nueva categoría
exports.createCategory = async (req, res) => {
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
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    try {
        // Verificar si el producto existe
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si la categoría existe
        const categoryExists = await Category.findById(category);
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
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
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
};



