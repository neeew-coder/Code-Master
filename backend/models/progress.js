const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  completed: {
    type: Map,
    of: [String],
    default: () => new Map()
  }
});

module.exports = mongoose.model("Progress", progressSchema);
