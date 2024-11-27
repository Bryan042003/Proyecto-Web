const express = require('express');
const orderController = require('../controllers/OrderController');
const router = express.Router();

//Endpoints

router.post('/create', orderController.validateOrder, orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/id/:id', orderController.getOrderById);
router.get('/user/:id_user', orderController.getOrdersByUser);
router.get('/products/:id_order', orderController.getProductsByOrder);
router.post('/add-product', orderController.validateOrderProduct,orderController.addProductToOrder);
router.patch('/update-status', orderController.validateOrderStatus,orderController.updateOrderStatus);

module.exports = router;