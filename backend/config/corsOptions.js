const allowedOrigins = [
  "https://neeew-coder.github.io", // ✅ GitHub Pages
  "http://localhost:5500"          // ✅ Local dev
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

module.exports = corsOptions;
