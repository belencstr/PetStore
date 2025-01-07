const Category = require('../models/categoryModel');

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
    try {
        console.log('Obteniendo todas las categorías');
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
    try {
        console.log(`Obteniendo categoría con ID: ${req.params.id}`);
        const category = await Category.findById(req.params.id);
        if (!category) {
            console.log('Categoría no encontrada');
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ message: 'Error al obtener la categoría', error });
    }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        console.log('Datos recibidos para crear categoría:', { name, description });

        // Validación de campos
        if (!name || !description) {
            console.log('Faltan datos requeridos');
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Comprobar si la categoría ya existe
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            console.log('La categoría ya existe');
            return res.status(400).json({ message: 'La categoría ya existe' });
        }

        // Crear una nueva categoría
        const newCategory = new Category({
            name,
            description
        });

        // Guardar la categoría
        await newCategory.save();
        console.log('Categoría creada con éxito:', newCategory);
        res.status(201).json({ message: 'Categoría creada con éxito', category: newCategory });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ message: 'Error al crear la categoría', error });
    }
};

// Actualizar una categoría
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        console.log(`Actualizando categoría con ID: ${id}`, { name, description });

        // Verificar si la categoría existe
        const category = await Category.findById(id);
        if (!category) {
            console.log('Categoría no encontrada');
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // Actualizar la categoría
        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();
        console.log('Categoría actualizada:', category);
        res.status(200).json({ message: 'Categoría actualizada', category });
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Eliminando categoría con ID: ${id}`);
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            console.log('Categoría no encontrada');
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        console.log('Categoría eliminada con éxito');
        res.status(200).json({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
};
