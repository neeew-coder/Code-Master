const mongoose = require("mongoose");

const ModuleProgressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  mastery: { type: Number, default: 0 } // 0–100%
});

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  percent: {
    type: Number,
    default: 0
  },
  mastered: {
    type: Number,
    default: 0
  },
  modules: [ModuleProgressSchema]
}, { timestamps: true });

module.exports = mongoose.model("Progress", ProgressSchema);
