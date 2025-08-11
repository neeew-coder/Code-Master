const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS setup — must come before helmet
const allowedOrigins = [
  "http://localhost:3000",
  "https://neeew-coder.github.io"
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
///////////////

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
