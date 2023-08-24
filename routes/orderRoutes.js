const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Middleware to check if user is authenticated
router.use(authMiddleware.isAuthenticated);

// Route for creating a new order
router.post('/', orderController.createOrder);

// Route for fetching all orders (admin only)
router.get('/', authMiddleware.checkAdmin, orderController.getAllOrders);

// Route for fetching orders by user ID
router.get('/user/:userId', orderController.getOrdersByUser);

module.exports = router;
