//Jdoodle

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Set this in Render env vars
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("CodeMaster backend is live on Render.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
