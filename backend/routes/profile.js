const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// 🧠 Get current user profile
router.get('/me', auth, (req, res) => {
  res.json(req.user);
});

// 🛠️ Update profile info
router.put('/me', auth, async (req, res) => {
  try {
    const { username, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, bio },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
