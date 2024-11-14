const Review = require('../models/Review');
const { body, validationResult } = require('express-validator');
const sequelize = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');


//Middlewares to validate review data
const validateReview = [
    body('score')
        .isInt({ min: 1, max: 5 }).withMessage('Score must be a number between 1 and 5'),
    body('description')
        .optional()
        .isLength({ min: 1, max: 255 }).withMessage('Description must be between 1 and 255 characters')
        .isString().withMessage('Description must be a string'),
    body('id_user')
        .isInt().withMessage('User id must be a number')
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) {
                throw new Error('User not found');
            }
            return true;
        }),
    body('id_product')
        .isInt().withMessage('Product id must be a number')
        .custom(async (value) => {
            const product = await Product.findByPk(value);
            if (!product) {
                throw new Error('Product not found');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

//Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Get review by id
const getReviewById = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await Review.findByPk(id);
        if (review) {
            return res.status(200).json(review);
        }
        return res.status(404).json({ error: 'Review not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Get reviews by product
const getReviewsByProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const reviews = await Review.findAll({
            where: {
                id_product: id
            }
        });
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Create review
const createReview = async (req, res) => {
    const { score, description, id_user, id_product } = req.body;
    try {
        const review = await Review.create({
            score,
            description,
            id_user,
            id_product
        });
        return res.status(201).json({
            message: 'Review created successfully',
            review
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Update review
const updateReview = async (req, res) => {
    const id = req.params.id;
    const { score, description, id_user, id_product } = req.body;
    try {
        const review = await Review.findByPk(id);
        if (review) {
            review.score = score;
            review.description = description;
            review.id_user = id_user;
            review.id_product = id_product;
            await review.save();
            return res.status(200).json({
                message: 'Review updated successfully',
                review
            });
        }
        return res.status(404).json({ error: 'Review not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Delete review
const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await Review.findByPk(id);
        if (review) {
            await review.destroy();
            return res.status(200).json({
                message: 'Review deleted successfully'
            });
        }
        return res.status(404).json({ error: 'Review not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    validateReview,
    getReviews,
    getReviewById,
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview
}