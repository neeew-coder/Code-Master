const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/middleware/auth");
const Progress = require("../models/progress");

// ✅ GET /api/progress/fetch
router.get("/fetch", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.findOne({ user: userId });

    if (!progress) {
      return res.status(200).json({ percent: 0, mastered: 0 });
    }

    res.status(200).json({
      percent: progress.percent || 0,
      mastered: progress.mastered || 0
    });
  } catch (err) {
    console.error("Progress fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST /api/progress/update
router.post("/update", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { percent, mastered } = req.body;

    const updated = await Progress.findOneAndUpdate(
      { user: userId },
      { percent, mastered },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Progress updated",
      progress: {
        percent: updated.percent,
        mastered: updated.mastered
      }
    });
  } catch (err) {
    console.error("Progress update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
