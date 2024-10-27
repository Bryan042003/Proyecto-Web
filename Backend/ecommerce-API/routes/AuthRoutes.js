const express = require('express');
const authController = require('../controllers/AuthController');
const router = express.Router();

//Endpoints

router.post('/login', authController.validateLogin, authController.login);

module.exports = router;