const express = require('express');
const orderController = require('../controllers/OrderController');
const router = express.Router();

//Endpoints

router.post('/create', orderController.validateOrder, orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/id/:id', orderController.getOrderById);
router.post('/add-product', orderController.validateOrderProduct,orderController.addProductToOrder);

module.exports = router;