const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Route for user signup
router.post('/signup', authController.signup);

// Route for user login
router.post('/login', authController.login);

module.exports = router;
