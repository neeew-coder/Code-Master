const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

exports.register = async (req, res) => {
  console.log('📥 POST /register hit');
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token, username: user.username });
  } catch (err) {
    console.error('❌ Error in register:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  console.log('📥 POST /login hit');
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const user = await User.findOne({ username });
    const valid = user && await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username: user.username });
  } catch (err) {
    console.error('❌ Error in login:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
