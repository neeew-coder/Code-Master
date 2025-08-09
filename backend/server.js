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

// Security headers
app.use(helmet());

// CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight

// JSON parsing
app.use(express.json());

// ✅ Health check
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// 🧠 JDoodle Runner Route
const JDoodleConfig = {
  clientId: process.env.JDOODLE_CLIENT_ID || "461d5a8e0c5a6d8a871647efb4751f9",
  clientSecret: process.env.JDOODLE_CLIENT_SECRET || "e0d02f45ddc5d2ae6be7d66c87331cbf154d5fe90daea1571f05cebef5962984",
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
