const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

const apiRoutes = require("./routes/api");       // JDoodle
const authRoutes = require("./routes/auth");     // Login/logout
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://neeew-coder.github.io",
  "https://codemaster-client.onrender.com"
];

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

app.use(cors(corsOptions)); // ✅ Handles preflight internally

// ✅ Helmet after CORS
app.use(helmet({ crossOriginResourcePolicy: false }));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Mount routes
app.use("/api", apiRoutes);         // JDoodle
app.use("/api/auth", authRoutes);   // Login/logout
app.use("/api/profile", profileRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("CodeMaster backend is running.");
});

// ✅ Catch-all route
app.all("/*", (req, res) => {
  res.status(404).send("Route not found.");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
