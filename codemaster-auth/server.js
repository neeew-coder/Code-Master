const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const corsOptions = require('./config/corsOptions'); // in server.js


const app = express();

// ✅ Security headers
app.use(helmet());

// ✅ Dynamic CORS configuration

const allowedOrigins = [
  'https://neeew-coder.github.io',
  'http://localhost:5500' // for local dev
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight


app.use(express.json());

// ✅ Health check route
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// ✅ Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// ✅ Dynamic port for Railway
const PORT = process.env.PORT || 3000;

// ✅ MongoDB + Server startup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
