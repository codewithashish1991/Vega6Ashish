const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const blogController = require('../controllers/blog_controller');

router.get('/list', blogController.index);
router.post('/create', blogController.create);
router.post('/update/:id', blogController.update);
router.get('/delete/:id', blogController.delete);
router.get('/get/:id', blogController.get);

module.exports = router;