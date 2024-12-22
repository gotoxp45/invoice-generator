const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      username,
      password: hashedPassword,
      role: 'admin' // Default role
    });

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Store token in the user document
    user.token = token;

    // Save the user
    await user.save();

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ _id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Update the user's token in the database
      user.token = token;
      await user.save();
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };