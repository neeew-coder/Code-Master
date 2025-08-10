const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(helmet());

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

// ✅ Handle preflight requests manually (optional but helpful)
app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api", require("./routes/api")); // JDoodle route

app.get("/", (req, res) => {
  res.send("CodeMaster backend is running.");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
