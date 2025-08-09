const allowedOrigins = [
  "https://neeew-coder.github.io", // ✅ GitHub Pages
  "http://localhost:5500"          // ✅ Local dev
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("✅ CORS allowed for:", origin || "no origin");
      callback(null, true);
    } else {
      console.warn("❌ CORS blocked for:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

module.exports = corsOptions;
