const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  completed: {
    type: Object,
    default: () => ({})
  }
});

module.exports = mongoose.model("Progress", progressSchema);
