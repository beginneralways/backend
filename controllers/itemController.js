const Item = require('../models/Item');

// Controller for creating a new item (admin only)
exports.createItem = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can create items.' });
    }

    const newItem = new Item({
      name: req.body.name,
      category: req.body.category,
      subItems: req.body.subItems,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item.', error });
  }
};

// Controller for fetching all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items.', error });
  }
};

// Controller for fetching a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item.', error });
  }
};

// Controller for updating an item by ID (admin only)
exports.updateItem = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can update items.' });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemId,
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          subItems: req.body.subItems,
        },
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item.', error });
  }
};

// Controller for deleting an item by ID (admin only)
exports.deleteItem = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete items.' });
    }

    const deletedItem = await Item.findByIdAndDelete(req.params.itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item.', error });
  }
};
