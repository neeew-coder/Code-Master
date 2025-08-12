const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// 🧠 Get current user profile (private)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

// 🛠️ Update profile info (partial updates allowed)
router.put('/me', auth, async (req, res) => {
  try {
    const { username, bio, progress, badges } = req.body;

    // ✅ Only update fields that are provided
    const updates = {};
    if (username !== undefined) updates.username = username;
    if (bio !== undefined) updates.bio = bio;
    if (progress !== undefined) updates.progress = progress;
    if (badges !== undefined) updates.badges = badges;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated",
      user: updatedUser.toObject({ versionKey: false })
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// 🌐 Optional: Public profile view by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username bio badges');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Public profile fetch error:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

module.exports = router;
