const dotenv = require("dotenv");
dotenv.config();

const defaultOrigins = [
  "https://neeew-coder.github.io",
  "http://localhost:5500"
];

// 🌍 Load from environment or fallback to defaults
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : defaultOrigins;

// 🧠 Optional: Match subdomains like *.neeew-coder.github.io
const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Allow non-browser requests
  return allowedOrigins.some(allowed => {
    return origin === allowed || origin.endsWith("." + allowed.replace(/^https?:\/\//, ""));
  });
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"], // Optional: allow frontend to read auth headers
  credentials: true
};

module.exports = corsOptions;
