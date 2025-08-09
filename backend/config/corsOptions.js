const allowedOrigins = [
  "https://neeew-coder.github.io", // ✅ Your frontend
  "http://localhost:3000",         // Optional for local dev
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

module.exports = corsOptions;
