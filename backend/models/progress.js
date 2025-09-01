// models/progress.js

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User"
  },
  completed: {
    type: Object,
    default: () => ({})
    // Structure: { math: ["lesson1", "lesson2"], science: ["lesson3"] }
  },
  badges: {
    type: Object,
    default: () => ({})
    // Structure: { math: ["starter", "mastery"], science: ["explorer"] }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

progressSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model("Progress", progressSchema);
