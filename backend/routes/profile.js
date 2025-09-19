const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // ✅ For password hashing

// 🔄 Handle CORS preflight for /me
router.options("/me", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(204);
});

// 🧠 Get current user profile (private)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      username: user.username,
      bio: user.bio,
      progress: Object.fromEntries(user.progress || []),
      badges: user.badges || [],
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

// 🛠️ Update profile info (partial updates allowed)
router.put("/me", auth, async (req, res) => {
  try {
    const { username, bio, progress, badges, password } = req.body;
    const updates = {};

    // ✅ Check for duplicate username
    if (username !== undefined) {
      const existing = await User.findOne({ username });
      if (existing && existing._id.toString() !== req.user._id.toString()) {
        return res.status(409).json({ error: "Username already taken" });
      }
      updates.username = username;
    }

    if (bio !== undefined) updates.bio = bio;

    // 🔄 Modular progress update
    if (progress !== undefined && typeof progress === "object") {
      const validProgress = Object.entries(progress).filter(([key, val]) =>
        typeof key === "string" && typeof val === "number"
      );
      updates.progress = new Map(validProgress);
    }

    if (Array.isArray(badges)) {
      updates.badges = badges;
    }

    // 🔐 Password update logic
    if (password !== undefined) {
      if (typeof password !== "string" || password.length < 5) {
        return res.status(400).json({ error: "Password must be at least 5 characters." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
      console.log(`🔐 Password updated for user ${req.user._id}`);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated",
      user: {
        username: updatedUser.username,
        bio: updatedUser.bio,
        progress: Object.fromEntries(updatedUser.progress || []),
        badges: updatedUser.badges || [],
        createdAt: updatedUser.createdAt
      }
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// 🌐 Optional: Public profile view by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("username bio badges");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");

    res.json({
      username: user.username,
      bio: user.bio,
      badges: user.badges || []
    });
  } catch (err) {
    console.error("Public profile fetch error:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

module.exports = router;
