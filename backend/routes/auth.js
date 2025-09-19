const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

// 📝 Register
router.post("/register", async (req, res) => {
  try {
    const { username, password, bio } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "Username already taken" });
    }

    const newUser = new User({ username, password, bio });
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

    // ✅ Select password explicitly
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // ✅ Use schema method to compare
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
