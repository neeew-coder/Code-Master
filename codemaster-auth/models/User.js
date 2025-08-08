const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tagline: { type: String, default: '' },
  progress: {
    javascript: { type: Number, default: 0 },
    csharp: { type: Number, default: 0 },
    python: { type: Number, default: 0 }
  },
  badges: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);