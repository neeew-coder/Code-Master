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

// 🌐 CORS configuration
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight support

// 🧾 JSON parsing
app.use(express.json());

// 🧪 Optional: Request logging for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ✅ Health check route
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// 🧠 JDoodle Runner Route
const JDoodleConfig = {
  clientId: "461d5a8e0c5a6d8a871647efb4751f9",
  clientSecret: "e0d02f45ddc5d2ae6be7d66c87331cbf154d5fe90daea1571f05cebef5962984",
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
