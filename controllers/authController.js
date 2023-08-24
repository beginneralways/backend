const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

// Controller for user signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role, address } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      address,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error signing up.', error });
  }
};

// Controller for user login

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ token });
    });
  })(req, res, next);
};
