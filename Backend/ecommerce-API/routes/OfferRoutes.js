const express = require('express');
const offerController = require('../controllers/OfferController');
const router = express.Router();

//Endpoints
router.get('/', offerController.getOffers);
router.get('/id/:id', offerController.getOfferById);
router.post('/create', offerController.validateOffer, offerController.createOffer);
router.put('/update/:id', offerController.validateOffer, offerController.updateOffer);
router.delete('/delete/:id', offerController.deleteOffer);

module.exports = router;