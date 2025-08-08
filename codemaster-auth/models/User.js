const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  tagline: {
    type: String,
    default: '',
    trim: true
  },

  progress: {
    javascript: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    csharp: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    python: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },

  badges: [
    {
      type: String,
      trim: true
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Optional: Virtuals for dashboard logic
userSchema.virtual('badgeCount').get(function () {
  return this.badges.length;
});

userSchema.virtual('totalProgress').get(function () {
  const { javascript, csharp, python } = this.progress;
  return Math.round((javascript + csharp + python) / 3);
});

module.exports = mongoose.model('User', userSchema);
