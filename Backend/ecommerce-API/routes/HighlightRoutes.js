const express = require('express');
const highlightController = require('../controllers/HighlightController');
const router = express.Router();

//Endpoints

router.post('/create', highlightController.validateHighlight,highlightController.createHighLight);
router.get('/', highlightController.getHighlights);

module.exports = router;