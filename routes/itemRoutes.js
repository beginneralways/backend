const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController');

const router = express.Router();

// Middleware to check if user is authenticated and an admin
router.use(authMiddleware.checkAdmin);

// Route for creating a new item (admin only)
router.post('/', itemController.createItem);

// Route for fetching all items
router.get('/', itemController.getAllItems);

// Route for fetching a single item by ID
router.get('/:itemId', itemController.getItemById);

// Route for updating an item by ID (admin only)
router.put('/:itemId', itemController.updateItem);

// Route for deleting an item by ID (admin only)
router.delete('/:itemId', itemController.deleteItem);

module.exports = router;
