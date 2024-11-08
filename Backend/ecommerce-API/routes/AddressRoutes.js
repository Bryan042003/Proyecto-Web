const express = require('express');
const addressController = require('../controllers/AddressController');
const router = express.Router();

//Endpoints
router.post('/create', addressController.validateAddress,addressController.createAddress);
router.get('/', addressController.getAddresses);
router.get('/:id', addressController.getAddressById);
router.delete('/delete/:id',addressController.deleteAddress);
router.put('/update/:id', addressController.validateAddress, addressController.updateAddress);

module.exports = router;
