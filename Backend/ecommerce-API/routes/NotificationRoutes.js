const express = require('express');
const notificationController = require('../controllers/NotificationController');
const router = express.Router();

//Endpoints

//GET
router.get('/', notificationController.getNotifications);
router.get('/id/:id', notificationController.getNotification);
router.delete('/delete/:id', notificationController.deleteNotification);

module.exports = router;