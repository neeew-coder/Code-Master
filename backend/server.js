const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // ✅ Added for cookie-based auth

// ✅ Route imports
const apiRoutes = require("./routes/api");       // JDoodle
const authRoutes = require("./routes/auth");     // Login/logout
const profileRoutes = require("./routes/profile");
const progressRoutes = require("./routes/progress");


app.use("/api/progress", progressRoutes);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/codemaster", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://neeew-coder.github.io",
  "https://codemaster-client.onrender.com"
];

// ✅ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// ✅ Middleware
app.use(cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(cookieParser()); // ✅ Enables reading cookies from requests

// ✅ Log requests and preflight
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    console.log("🔄 Preflight request received:", req.url);
  }
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// ✅ Mount routes
app.use("/api", apiRoutes);         // JDoodle
app.use("/api/auth", authRoutes);   // Login/logout
app.use("/api/profile", profileRoutes); // Profile sync

// ✅ Health check
app.get("/", (req, res) => {
  res.send("CodeMaster backend is running.");
});

// ✅ Catch-all route with CORS headers
app.all("/*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // ✅ This line is essential

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // ✅ Preflight success
  }

  res.status(404).json({ error: "Route not found." });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
