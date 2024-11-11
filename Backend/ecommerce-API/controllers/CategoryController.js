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



//Get all products from a category
const getProductsByCategory = async (req,res)=>{
    const {category_id} = req.params;

    try{
        const categoryHierarchy = await Category.findAll({
            where: {
                id: category_id
            },
            include:{
                model: Category,
                as: 'subcategories',
                required: false,
                include:{
                    model: Category,
                    as: 'subcategories',
                    required: false,
                    atributtes: ['id']
                }
            }
        });

        //Get all the categories ids
        const categoriesIds = categoryHierarchy.map(category => category.id);

        //Get all the products from the categories

        const products = await Product_Category.findAll({
            where: {
                id_category: categoriesIds
            },
            include:{
                model: Product,
                as: 'product'
            }
        });

        res.status(200).json(products);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'There was an error trying to get the category'});
    }
}

//To do: Assing a product to a category


module.exports = {
    getCategories,
    getProductsByCategory,
    getCategoryWithSubcategories
}