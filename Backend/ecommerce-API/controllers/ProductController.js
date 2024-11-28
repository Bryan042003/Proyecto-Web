const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const sequelize = require('../config/database');
const Highlight = require('../models/Highlight');
const Product_Category = require('../models/Product_Category');
const Category = require('../models/Category');
const Offer = require('../models/Offer');
const moment = require('moment');
const { Op } = require('sequelize');


//Middlewares to validate product data
const validateProduct = [
    body('name')
        .isLength({ min: 2 }).withMessage('Name must have at least 2 characters')
        .isString().withMessage('Name must be a string'),
    body('description')
        .isLength({ min: 2 }).withMessage('Description must have at least 2 characters')
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
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

const validateStock = [
    body('quantity')
        .isInt().withMessage('Quantity must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

const validateProductId =[
    body('id_product')
    .isInt().withMessage('Id product must be an integer')
    .custom(async (value) => {
        const product = await Product.findByPk(value);
        if (!product) {
            throw new Error('Product not found');
        }
        return true;
    })
]

const validateCategoryId =[
    body('id_category')
    .isInt().withMessage('Id category must be an integer')
    .custom(async (value) => {
        const category = await Category.findByPk(value);
        if (!category) {
            throw new Error('Category not found');
        }
        return true;
    }),
]


const validateProductCategory = [
    ...validateProductId
    ,...validateCategoryId,
    body()
        .custom(async (value, { req }) => {
            const { id_product, id_category } = req.body;
            const productCategory = await Product_Category.findOne({
                where: {
                    id_product: id_product,
                    id_category: id_category
                }
            });
            if (productCategory) {
                throw new Error('This product is already associated with this category');
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

const ValidateUpdateProductCategory = [
    ...validateProductId,
    ...validateCategoryId,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


//Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Get product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const searchProductByName = async (req, res) => {
    const  {name} = req.query;
    if(!name){
        return res.status(400).json({error: 'Name is required'});
    }
    try{
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            limit: 10

        })
        return res.status(200).json(products);
    }catch(error){
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}

//Create a product
const createProduct = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const newProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            photo: req.body.photo,
            technical_stuff: req.body.technical_stuff,
            stock: req.body.stock
        }, { transaction });

        const expiredDate = moment().add(1, 'weeks').toDate();

        const newHighlight = await Highlight.create({
            id_product: newProduct.id,
            expired_date: expiredDate
        }, { transaction });

        await transaction.commit();
        return res.status(201).json({newProduct, newHighlight});

    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = req.body.price;
            product.brand = req.body.brand;
            product.photo = req.body.photo;
            product.technical_stuff = req.body.technical_stuff;
            product.id_offer= req.body.id_offer;
            product.stock = req.body.stock;

            await product.save({ transaction });
            await transaction.commit();
            return res.status(200).json({
                message: 'Product updated successfully',
                product
            });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}

//Patch
const reduceStock = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            product.stock = product.stock - req.body.quantity;

            if (product.stock < 0) {
                return res.status(400).json({ error: 'Not enough stock' });
            }

            await product.save({ transaction });
            await transaction.commit();
            return res.status(200).json({
                message: 'Stock reduced successfully',
                product
            });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}

//Delete
const deleteProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy({ transaction });
            await transaction.commit();
            return res.status(204).json({
                message: 'Product removed successfully'
            });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}



async function getProductsByCategory(req, res) {
    const id_category = req.params.id_category;
    try {
        const products = await sequelize.query('CALL GetProductsByCategory(:id_category)', {
            replacements: { id_category: id_category }
        });
        console.log(products);
        return res.status(200).json(products);
    } catch (error) {

        return res.status(500).json({ message: "Error to get products by parent category" });
    }
}

const getProductsByBrandAndCategory = async (req, res) => {
    const { brand, id_category } = req.query;
    try {
        const products = await sequelize.query('CALL GetProductsByCategoryAndBrand(:id_category, :brand)', {
            replacements: { brand: brand, id_category: id_category }
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error to get products by brand and category" });
    }
}

const getProductsByPricesAndCategory = async (req, res) => {
    const { min_price, max_price, id_category } = req.query;
    try {
        const products = await sequelize.query('CALL GetProductsByCategoryAndPrice(:id_category,:min_price, :max_price)', {
            replacements: { min_price: min_price, max_price: max_price, id_category: id_category }
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error to get products by prices and category" });
    }
}

const getTopProductsbySalesAndCategory = async (req, res) => {
    const { id_category, limit } = req.query;
    try {
        const products = await sequelize.query('CALL GetTopSellingProductsByCategory(:id_category, :limit)', {
            replacements: { id_category: id_category, limit: limit }
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error to get top products by sales" });
    }
}

const GetActiveHighlightedProducts = async (req, res) => {
    try {
        const products = await sequelize.query('CALL GetActiveHighlightedProducts');
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error to get highlighted products" });
    }
}

const AssignProductToCategory = async (req, res) => {
    const { id_product, id_category } = req.body;
    console.log(id_product, id_category);
    try {
        const product_category = await Product_Category.create({
            id_product: id_product,
            id_category: id_category
        });
        return res.status(201).json({
            message: 'Product assigned to category successfully',
            product_category
        });
    } catch (error) {
        return res.status(500).json({ message: "Error to assign product to category" });
    }
}

const UpdateProductCategory = async (req, res) => {

    const {id_product, id_category} = req.body;
    const transaction = await sequelize.transaction();

    try{
        const product_category = await Product_Category.findByPk(req.params.id);
        if(product_category){
            product_category.id_product = id_product;
            product_category.id_category = id_category;
            await product_category.save({transaction});
            await transaction.commit();
            return res.status(200).json({
                message: 'Product category updated successfully',
                product_category
            });
        }
        else{
            return res.status(404).json({error: 'Product not found'});
        }
    }
    catch(error){
        await transaction.rollback();
        return res.status(500).json({error: error.message});
    }
}

const deleteProductCategory = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const product_category = await Product_Category.findByPk(req.params.id);
        if (product_category) {
            await product_category.destroy({ transaction });
            await transaction.commit();
            return res.status(204).json({
                message: 'Product category removed successfully'
            });
        } else {
            return res.status(404).json({ error: 'Product category not found' });
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}

//Patch
const AssignProductToOffer = async (req, res) => {
    const { id_product, id_offer } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const product = await Product.findByPk(id_product);
        if (product) {
            product.id_offer = id_offer? id_offer : null;
            await product.save({ transaction });
            await transaction.commit();
            return res.status(200).json({
                message: 'Product assigned to offer successfully',
                product
            });
        }
        else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
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
        deleteProduct,
        getProductsByCategory,
        getProductsByBrandAndCategory,
        getProductsByPricesAndCategory,
        getTopProductsbySalesAndCategory,
        GetActiveHighlightedProducts,
        AssignProductToCategory,
        validateProductCategory,
        AssignProductToOffer,
        UpdateProductCategory,
        ValidateUpdateProductCategory,
        deleteProductCategory,
        searchProductByName
    }

