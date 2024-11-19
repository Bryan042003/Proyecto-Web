const express = require('express');
const addressController = require('../controllers/AddressController');
const router = express.Router();

//Endpoints
router.post('/create', addressController.validateAddress,addressController.createAddress);
router.get('/', addressController.getAddresses);
router.get('/id/:id', addressController.getAddressById);
router.delete('/delete/:id',addressController.deleteAddress);
router.put('/update/:id', addressController.validateAddress, addressController.updateAddress);

router.get('/districts', addressController.getDistricts);
router.get('/cantons', addressController.getCantons);
router.get('/provinces', addressController.getProvinces);
router.get('/cantons-by-province/:id_province', addressController.getCantonsByProvince);
router.get('/districts-by-canton/:id_canton', addressController.getDistrictsByCanton);



module.exports = router;
