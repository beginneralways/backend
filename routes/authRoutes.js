const express = require('express');
const passport = require('passport');  // Import passport before using it
const authController = require('../controllers/authController');

const router = express.Router();

// Route for user signup
router.post('/signup', authController.signup);

// Route for user login
router.post('/login', passport.authenticate('local', { session: false }), authController.login);

module.exports = router;
