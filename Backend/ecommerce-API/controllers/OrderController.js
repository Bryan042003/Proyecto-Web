const Order = require('../models/Order');
const Product = require('../models/Product');
const Order_Products = require('../models/Order_Products');
const { body, validationResult } = require('express-validator');
const sequelize = require('../config/database');
const User = require('../models/User');
const moment = require('moment');
const op = sequelize.Op;

//Middlewares to validate order data

const validateUser = [
    body('id_user')
        .isInt().withMessage('The user id must be an integer')
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) {
                throw new Error('User not found');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateOrder = [
    ...validateUser,
    body('total_price')
        .isNumeric().withMessage('The total price must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]

const validateOrderProduct = [
    body('id_order')
        .isInt().withMessage('The order id must be an integer')
        .custom(async (value) => {
            const order = await Order.findByPk(value);
            if (!order) {
                throw new Error('Order not found');
            }
            return true;
        }),
    body('id_product')
        .isInt().withMessage('The product id must be an integer')
        .custom(async (value) => {
            const product = await Product.findByPk(value);
            if (!product) {
                throw new Error('Product not found');
            }
            return true;
        }),
    body('quantity')
        .isInt().withMessage('The quantity must be an integer')
        .isInt({ min: 1 }).withMessage('The quantity must be greater than 0')
        .custom(async (value, { req }) => {
            const product = await Product.findByPk(req.body.id_product);
            if (product.stock < value) {
                throw new Error('Not enough stock');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]

const validateOrderStatus = [
    body('id_order')
        .isInt().withMessage('The order id must be an integer')
        .custom(async (value) => {
            const order = await Order.findByPk(value);
            if (!order) {
                throw new Error('Order not found');
            }
            return true;
        }),
    body('status')
        .isIn(['pending', 'in_process', 'sent', 'delivered']).withMessage('The status must be pending, in_process, sent or delivered'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]


//Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Get order by id
const getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            return res.status(200).json(order);
        }
        return res.status(404).json({ message: 'Order not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Create an order
const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();
    const { id_user, total_price } = req.body;
    const date = moment().tz('America/Costa_Rica').format('YYYY-MM-DD HH:mm:ss');
    try {

        const order = await Order.create({
            id_user: id_user,
            status: 'pending',
            total_price: total_price,
            date: date
        }, { transaction });

        await transaction.commit();

        return res.status(201).json({
            message: 'Order created successfully',
            order
        });


    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: 'Something went wrong',
            error
        });

    }

}

const addProductToOrder = async (req, res) => {
    const transaction = await sequelize.transaction();
    const { id_order, id_product, quantity } = req.body;
    try {

        const order_product = await Order_Products.create({
            id_order: id_order,
            id_product: id_product,
            quantity: quantity
        }, { transaction });

        const product = await Product.findByPk(id_product);
        product.stock -= quantity;


        await transaction.commit();

        return res.status(201).json({
            message: 'Product added to order successfully',
            order_product
        });

    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
}

const updateOrderStatus = async (req, res) => {
    const transaction = await sequelize.transaction();
    const { id_order, status } = req.body;
    try {
        const order = await Order.findByPk(id_order);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save({ transaction });

        await transaction.commit();

        return res.status(200).json({
            message: 'Order updated successfully',
            order
        });

    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: 'Something went wrong',
            error
        });
    }
}




module.exports = {
    createOrder,
    validateOrder,
    getOrders,
    getOrderById,
    addProductToOrder,
    validateOrderProduct,
    updateOrderStatus,
    validateOrderStatus
}