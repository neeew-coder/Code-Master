const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const auth = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  const token = req.cookies?.token;

  if (!token) {
    console.warn("🔒 No token found in cookies");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(`🔓 Authenticated user: ${decoded.id}`);
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
