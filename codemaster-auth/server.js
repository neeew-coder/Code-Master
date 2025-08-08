const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const corsOptions = require("../backend/config/corsOptions");
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

// Health check
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Port
const PORT = process.env.PORT || 3000;

// MongoDB + Server
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
