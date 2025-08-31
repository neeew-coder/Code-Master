const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const auth = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  const token = req.cookies?.token;
  if (!token) {
    console.warn("🔒 No token found in cookies");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id); // ✅ fixed key
    if (!user) {
      console.warn("🚫 User not found");
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    console.log(`🔓 Authenticated user: ${user.username}`);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.warn("⏰ Token expired");
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }

    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
