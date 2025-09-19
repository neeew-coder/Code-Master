const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const auth = require("../middleware/auth");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// 🔐 Utility: Create JWT
const createToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, bio: user.bio || "" },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// 📝 Register with email
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "Username or email already taken" });
    }

    const newUser = new User({ username, email, password, bio });
    await newUser.save();

    const token = createToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ success: true, message: "User registered", username: newUser.username });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

// 🔐 Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username and password are required" });
    }

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true, message: "Login successful", username: user.username });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

// 🔓 Forgot Password via email
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutes
    await user.save();

    // TODO: Send token via email
    console.log(`🔐 Reset token for ${email}: ${token}`);

    res.json({ message: "Reset token generated. Check your email.", token });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ error: "Failed to generate reset token" });
  }
});

// 🔐 Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: "Token and new password required" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

// 🚪 Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None"
  });
  res.json({ success: true, message: "Logged out" });
});

// 🙋‍♂️ Me (Session Check)
router.get("/me", auth, (req, res) => {
  const user = { ...req.user.toObject() };
  delete user.password;
  res.json({ success: true, user });
});

module.exports = router;
