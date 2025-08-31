const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completed: {
    type: Map,
    of: [String], // Tracks completed lessons per subject
    default: {}
  }
});

module.exports = mongoose.model("Progress", progressSchema);
