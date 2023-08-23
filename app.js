const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Routes
// app.use('/api/items', itemRoutes);
// app.use('/api/auth', authRoutes);

// Start the server
const PORT = config.PORT||5999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
