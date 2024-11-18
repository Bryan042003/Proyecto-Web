const express = require('express');
const categoryController = require('../controllers/CategoryController');
const router = express.Router();

//Endpoints
router.get('/', categoryController.getALLCategoriesWithSubcategories);
router.get('/id/:category_id', categoryController.getCategoryWithSubcategories);
router.get('/subcategories/:category_id', categoryController.getSubcategories);
router.get('/parentCategory/:category_id', categoryController.getParentCategory);
router.get('/id_product/:id_product', categoryController.getCategoryByProduct);

module.exports = router;