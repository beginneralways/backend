const Order = require('../models/Order');
const Item = require('../models/Item');

// Controller for creating a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Calculate total price based on selected items
    const selectedItems = await Item.find({ _id: { $in: items.map(item => item.item) } });
    const totalPrice = selectedItems.reduce((total, item) => {
      const selectedItem = items.find(selectedItem => selectedItem.item.toString() === item._id.toString());
      return total + (selectedItem.quantity * item.price);
    }, 0);

    const newOrder = new Order({
      user: userId,
      items,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order.', error });
  }
};

// Controller for fetching all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders.', error });
  }
};

// Controller for fetching orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate('user', 'username');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders.', error });
  }
};
