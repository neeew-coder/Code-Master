const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");
require("dotenv").config();

const corsOptions = require("./config/corsOptions");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

const app = express();

// 🛡️ Security headers
app.use(helmet());

// 🌍 CORS config
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handle preflight requests

// 🧾 JSON parsing
app.use(express.json());

// 🧪 Request logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} from ${req.headers.origin || "unknown origin"}`);
  next();
});

// 🌐 Root route for browser access
app.get("/", (req, res) => {
  res.send("Welcome to CodeMaster API. Use /api/ping to check health.");
});

app.get("/docs", (req, res) => {
  res.json({
    endpoints: {
      "/api/ping": "Health check",
      "/api/runner/run": "Run code using JDoodle",
      "/api/auth": "Authentication routes",
      "/api/profile": "User profile routes"
    },
    note: "Use POST for /api/runner/run with { code, language }"
  });
});

// ✅ Health check
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// 🧪 CORS test route (optional)
app.get("/api/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// 🧠 JDoodle Runner
const JDoodleConfig = {
  clientId: process.env.JDOODLE_CLIENT_ID || process.env.JDoodle_ClientID,
  clientSecret: process.env.JDOODLE_CLIENT_SECRET || process.env.JDoodle_ClientSecret,
  endpoint: "https://api.jdoodle.com/v1/execute"
};

const languageConfig = {
  java: "4",
  csharp: "4"
};

app.post("/api/runner/run", async (req, res) => {
  const { code, language } = req.body;

  if (!languageConfig[language]) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  try {
    const response = await axios.post(JDoodleConfig.endpoint, {
      script: code,
      language,
      versionIndex: languageConfig[language],
      clientId: JDoodleConfig.clientId,
      clientSecret: JDoodleConfig.clientSecret
    });

    res.json({ output: response.data.output });
  } catch (error) {
    console.error("JDoodle error:", error.message);
    res.status(500).json({ error: "Execution failed." });
  }
});

// 🔐 Auth & Profile Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// ❗ Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// 🌐 MongoDB + Server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
