const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const User = require("../models/User");

// ✅ Get full profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update profile
router.put("/", verifyToken, async (req, res) => {
  const { tagline, progress, badges } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (tagline) user.tagline = tagline;
    if (progress) user.progress = { ...user.progress, ...progress };
    if (Array.isArray(badges)) {
      const unique = new Set([...user.badges, ...badges]);
      user.badges = Array.from(unique);
    }

    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("❌ Error updating profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Lightweight profile fetch
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username tagline progress badges");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching /me:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
