const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

// Obtener reseñas de un producto
exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
};

// Crear una nueva reseña
exports.createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const review = new Review({
            user: req.user.id,
            product: productId,
            rating,
            comment
        });

        await review.save();
        res.status(201).json({ message: 'Reseña creada con éxito', review });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reseña', error });
    }
};

// Actualizar una reseña
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }

        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;

        await review.save();
        res.status(200).json({ message: 'Reseña actualizada', review });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reseña', error });
    }
};

// Eliminar una reseña
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.status(200).json({ message: 'Reseña eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reseña', error });
    }
};
