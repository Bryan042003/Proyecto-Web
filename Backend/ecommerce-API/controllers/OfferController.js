const Offer = require('../models/Offer');
const { body, validationResult } = require('express-validator');
const sequelize = require('../config/database');
const { Op } = require('sequelize');
const moment = require('moment-timezone');


//Middlewares to validate offer data
const validateOffer = [
    body('discount')
        .isFloat({ min: 0, max: 1 }).withMessage('Discount must be a number between 0 and 1'),
    body('start_date')
        .isISO8601().withMessage('Start date must be a date'),
    body('end_date')
        .optional()
        .isISO8601().withMessage('End date must be a date'),
    body('start_date').custom((value, { req }) => {
        if (value > req.body.end_date) {
            throw new Error('Start date must be before end date');
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
]

//Get all offers
const getOffers = async (req, res) => {
    try {
        const currentDate = moment().tz('America/Costa_Rica').format('YYYY-MM-DD HH:mm:ss');
        console.log(currentDate);
        const offers = await Offer.findAll({
            where: {
                end_date: {
                    [Op.or]: {
                        [Op.gte]: currentDate,
                        [Op.is]: null
                    }
                }
            }
        });

        return res.status(200).json(offers);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Get offer by id
const getOfferById = async (req, res) => {
    const id = req.params.id;
    try {
        const offer = await Offer.findByPk(id);
        if (offer) {
            return res.status(200).json(offer);
        }
        return res.status(404).json({ error: 'Offer not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createOffer = async (req, res) => {
    let { discount, start_date, end_date } = req.body;
    
    start_date = moment(start_date).tz('America/Costa_Rica').format('YYYY-MM-DD HH:mm:ss');
    end_date = end_date ? moment(end_date).tz('America/Costa_Rica').format('YYYY-MM-DD HH:mm:ss') : null;
    console.log("Start: "+start_date);
    try {
        const offer = await Offer.create({ discount, start_date, end_date });
        return res.status(201).json({
            message: 'Offer created successfully',
            offer
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateOffer = async (req, res) => {
    const id = req.params.id;
    let { discount, start_date, end_date } = req.body;


    try {
        const offer = await Offer.findByPk(id);
        if (offer) {
            offer.discount = discount;
            offer.start_date = start_date;
            offer.end_date = end_date;
            await offer.save();
            return res.status(200).json({
                message: 'Offer updated successfully',
                offer
            });
        }
        return res.status(404).json({ error: 'Offer not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const deleteOffer = async (req, res) => {
    const id = req.params.id;
    try {
        const offer = await Offer.findByPk(id);
        if (offer) {
            await offer.destroy();
            return res.status(200).json({ message: 'Offer deleted successfully' });
        }
        return res.status(404).json({ error: 'Offer not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    validateOffer,
    getOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer
}