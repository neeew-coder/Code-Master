const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  javascript: { type: Number, default: 0, min: 0, max: 100 },
  csharp: { type: Number, default: 0, min: 0, max: 100 },
  python: { type: Number, default: 0, min: 0, max: 100 }
}, { _id: false });

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
    default: "",
    trim: true
  },

  progress: {
    type: progressSchema,
    default: () => ({})
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

// Virtuals
userSchema.virtual("badgeCount").get(function () {
  return this.badges.length;
});

userSchema.virtual("totalProgress").get(function () {
  const { javascript = 0, csharp = 0, python = 0 } = this.progress || {};
  return Math.round((javascript + csharp + python) / 3);
});

module.exports = mongoose.model("User", userSchema);
