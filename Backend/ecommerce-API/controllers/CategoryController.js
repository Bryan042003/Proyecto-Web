const sequelize = require('../config/database');
const Category = require('../models/Category');
const Product_Category = require('../models/Product_Category');
const Product = require('../models/Product');

//Get all categories with their subcategories (hierarchical)
const getALLCategoriesWithSubcategories = async (req,res) => {
    try{
        const categories = await Category.findAll({
            where: {
                parent_id: null
            },
            include:{
                model: Category,
                as: 'subcategories',
                required: false,
                include:{
                    model: Category,
                    as: 'subcategories',
                    required: false
                }
            }
        });
        res.status(200).json(categories);

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'There was an error trying to get the categories'});
    }
}

//Get a category with its subcategories
const getCategoryWithSubcategories = async (req,res) => {
    const {category_id} = req.params;

    try{
        const category = await Category.findByPk(category_id,{
            include:{
                model: Category,
                as: 'subcategories',
                required: false
            }
        });

        res.status(200).json(category);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'There was an error trying to get the category'});
    }
}


//Get subcategories of a category
const getSubcategories = async (req,res) => {
    const {category_id} = req.params;

    try{
        const subcategories = await Category.findAll({
            where: {
                parent_id: category_id
            }
        });

        res.status(200).json(subcategories);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'There was an error trying to get the subcategories'});
    }
}

const getParentCategory = async (req,res) => {
    const {category_id} = req.params;

    try{
        const category = await Category.findByPk(category_id,{
            include:{
                model: Category,
                as: 'parent',
                required: false
            }
        });

        res.status(200).json(category);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'There was an error trying to get the category'});
    }
}

//To do: Assing a product to a category


module.exports = {
    getALLCategoriesWithSubcategories,
    getCategoryWithSubcategories,
    getSubcategories,
    getParentCategory
}