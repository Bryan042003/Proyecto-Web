const express = require('express');
const reviewController = require('../controllers/ReviewController');
const router = express.Router();

//Endpoints
router.get('/', reviewController.getReviews);
router.get('/id/:id', reviewController.getReviewById);
router.get('/product/:id', reviewController.getReviewsByProduct);
router.post('/create', reviewController.validateReview,reviewController.createReview);
router.put('/update/:id', reviewController.validateReview, reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);

module.exports = router;
