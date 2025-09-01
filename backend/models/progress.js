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
    // Structure: { html: { "intro": true, "elements": true }, css: { ... } }
  },
  badges: {
    type: Object,
    default: () => ({})
    // Structure: { html: ["starter", "mastery"], css: ["explorer"] }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// ✅ Ensure lastUpdated stays fresh on every save
progressSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model("Progress", progressSchema);
