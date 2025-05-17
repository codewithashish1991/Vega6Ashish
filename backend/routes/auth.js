const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const userController = require('../controllers/user_controller');

router.post('/login', userController.login);
router.post('/register', userController.registerUser);
router.get('/logout', userController.logout);


module.exports = router;