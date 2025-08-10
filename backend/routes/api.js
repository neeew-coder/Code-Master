const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Log incoming origin (for debugging)
app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  next();
});

// ✅ CORS setup — simplified for production
const corsOptions = {
  origin: "https://neeew-coder.github.io", // ✅ Explicitly allow frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handle preflight requests

// ✅ Helmet after CORS — allow cross-origin resources
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api", require("./routes/api")); // JDoodle route

// ✅ Root route
app.get("/", (req, res) => {
  res.send("CodeMaster backend is running.");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
