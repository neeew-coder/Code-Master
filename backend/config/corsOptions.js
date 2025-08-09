const allowedOrigins = [
  "https://neeew-coder.github.io",
  "http://localhost:5500"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      console.warn("⚠️ No origin provided — allowing request (likely server-side or mobile)");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

module.exports = corsOptions;
