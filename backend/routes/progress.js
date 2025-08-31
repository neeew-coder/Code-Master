const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Progress = require("../models/progress");

// GET /api/progress/html
router.get("/html", auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user._id, lesson: "html" });
    res.json({ success: true, progress });
  } catch (err) {
    console.error("❌ Progress fetch error:", err);
    res.status(500).json({ success: false, error: "Progress fetch failed" });
  }
});

// POST /api/progress/update
router.post("/update", auth, async (req, res) => {
  try {
    const { lesson, completed } = req.body;
    const updated = await Progress.findOneAndUpdate(
      { userId: req.user._id, lesson },
      { $set: { completed } },
      { upsert: true, new: true }
    );
    res.json({ success: true, progress: updated });
  } catch (err) {
    console.error("❌ Progress update error:", err);
    res.status(500).json({ success: false, error: "Progress update failed" });
  }
});

module.exports = router;
