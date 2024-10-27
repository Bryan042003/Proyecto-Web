const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

//Endpoints
router.post('/create', userController.validateUser,userController.createUser);
router.get('/', userController.getUsers);
router.get('/email/:email', userController.getUserByEmail);
router.get('/id/:id', userController.getUserById);
router.put('/update/:id', userController.validateUpdateUser,userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;