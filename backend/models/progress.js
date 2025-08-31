const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lesson: { type: String, required: true },
  completed: { type: Number, default: 0 }
});

module.exports = mongoose.model("Progress", progressSchema);
