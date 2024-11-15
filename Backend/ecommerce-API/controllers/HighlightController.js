const Highlight = require('../models/Highlight');
const { body, validationResult } = require('express-validator');
const sequelize = require('../config/database');
const Product = require('../models/Product');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

//Middlewares to validate highlight data

const validateHighlight = [
    body('expired_date')
        .isISO8601().withMessage('Expired date must be a date in YYYY-MM-DD format')
        .custom((value) => {
            const currentDate = moment().tz('America/Costa_Rica').format('YYYY-MM-DD HH:mm:ss');
            if (moment(value).isBefore(currentDate)) {
                throw new Error('Expired date must be after current date');
            }
            return true;
        }
        )
        ,
    body('id_product')
        .isInt().withMessage('Product id must be a number')
        .custom(async (value) => {
            const product = await Product.findByPk(value);
            if (!product) {
                throw new Error('Product not found');
            }
            const highlight = await Highlight.findOne({ where: { id_product: value } });
            if (highlight) {
                throw new Error('Product is already highlighted');
            }
            return true;
        }
        ),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

//Create a highlight
const createHighLight = async (req, res) => {
    const { id_product, expired_date } = req.body;
    try {
        const newHighlight = await Highlight.create({
            id_product,
            expired_date
        });
        return res.status(201).json({
            message: 'Highlight created successfully',
            newHighlight
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Get all highlights
const getHighlights = async (req, res) => {
    try {
        const highlights = await Highlight.findAll();
        return res.status(200).json(highlights);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}




module.exports = {
    getHighlights,
    createHighLight,
    validateHighlight
}