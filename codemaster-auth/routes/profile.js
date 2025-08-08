const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');

// Get profile
router.get('/', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update profile
router.put('/', verifyToken, async (req, res) => {
  const { tagline, progress, badges } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.tagline = tagline || user.tagline;
  user.progress = { ...user.progress, ...progress };
  if (Array.isArray(badges)) {
    const unique = new Set([...user.badges, ...badges]);
    user.badges = Array.from(unique);
  }

  await user.save();
  res.json({ message: 'Profile updated', user });
});

// Future: Get minimal profile info
router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('username tagline progress badges');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
