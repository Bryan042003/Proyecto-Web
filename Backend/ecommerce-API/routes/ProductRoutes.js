const express = require('express');
const productController = require('../controllers/ProductController');
const router = express.Router();

//Endpoints

router.post('/create', productController.validateProduct,productController.createProduct);
router.get('/', productController.getProducts);
router.get('/id/:id', productController.getProductById);
router.put('/update/:id', productController.validateProduct,productController.updateProduct);
router.patch('/reduce-stock/:id', productController.validateStock,productController.reduceStock);
router.delete('/delete/:id', productController.deleteProduct);

router.get('/by-category/:id_category', productController.getProductsByCategory);

module.exports = router;