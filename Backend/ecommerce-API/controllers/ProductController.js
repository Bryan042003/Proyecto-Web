const Product = require('../models/Product');
const {body, validationResult} = require('express-validator');
const sequelize = require('../config/database');


//Middlewares to validate product data
const validateProduct = [
    body('name')
    .isLength({min: 2}).withMessage('Name must have at least 2 characters')
    .isString().withMessage('Name must be a string'),
    body('description')
    .isLength({min: 2}).withMessage('Description must have at least 2 characters')
    .isString().withMessage('Description must be a string'),
    body('price')
    .isFloat().withMessage('Price must be a number'),
    body('brand')
    .isString().withMessage('Brand must be a string'),
    body('photo')
    .isString().withMessage('Photo must be a string'),
    body('technical_stuff')
    .isString().withMessage('Technical stuff must be a string'),
    body('stock')
    .isInt().withMessage('Stock must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

const validateStock = [
    body('quantity')
    .isInt().withMessage('Quantity must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

//Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//Get product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(product){
            return res.status(200).json(product);
        }else{
            return res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

//Create a product
const createProduct = async (req,res) => {
    const transaction = await sequelize.transaction();

    try{
        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            photo: req.body.photo,
            technical_stuff: req.body.technical_stuff,
            stock: req.body.stock
        },{transaction});
       
        await transaction.commit();
        return res.status(201).json(newProduct);

    }catch(error){
        await transaction.rollback();
        return res.status(500).json({error: error.message});
    }
}

const updateProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await Product.findByPk(req.params.id);
        if(product){
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = req.body.price;
            product.brand = req.body.brand;
            product.photo = req.body.photo;
            product.technical_stuff = req.body.technical_stuff;
            product.stock = req.body.stock;

            await product.save({transaction});
            await transaction.commit();
            return res.status(200).json({
                message: 'Product updated successfully',
                product
            });
        }else{
            return res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({error: error.message});
    }
}

//Patch
const reduceStock = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await Product.findByPk(req.params.id);
        if(product){
            product.stock = product.stock - req.body.quantity;

            if(product.stock < 0){
                return res.status(400).json({error: 'Not enough stock'});
            }

            await product.save({transaction});
            await transaction.commit();
            return res.status(200).json({
                message: 'Stock reduced successfully',
                product
            });
        }else{
            return res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({error: error.message});
    }
} 

//Delete
const deleteProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await Product.findByPk(req.params.id);
        if(product){
            await product.destroy({transaction});
            await transaction.commit();
            return res.status(204).json({
                message: 'Product removed successfully'
            });
        }else{
            return res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({error: error.message});
    }
}


module.exports = {
    validateProduct,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    reduceStock,
    validateStock,
    deleteProduct
}

