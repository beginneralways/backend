const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subItems: [
    {
      name: String,
      price: Number,
    },
  ],
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
