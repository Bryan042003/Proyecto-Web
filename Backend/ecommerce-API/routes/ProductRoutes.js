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
router.get('/by-brand-and-category', productController.getProductsByBrandAndCategory);
router.get('/by-prices-and-category', productController.getProductsByPricesAndCategory);
router.get('/top-sales-and-category', productController.getTopProductsbySalesAndCategory);
router.get('/highlighted', productController.GetActiveHighlightedProducts);

router.post('/assign-category', productController.validateProductCategory, productController.AssignProductToCategory);
router.put('/update-category/:id', productController.ValidateUpdateProductCategory, productController.UpdateProductCategory);
router.delete('/delete-category/:id', productController.deleteProductCategory);

router.patch('/assign-offer', productController.AssignProductToOffer);

router.get('/search', productController.searchProductByName);



module.exports = router;