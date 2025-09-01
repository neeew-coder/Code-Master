const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Progress = require("../models/progress");

// Utility: total modules per subject
const totalModulesMap = {
  html: 42,
  css: 6,
  js: 8,
  java: 7,
  csharp: 4
};

const getTotalModulesFor = (subject) => totalModulesMap[subject] || 1;

// GET /api/progress/:subject
router.get("/:subject", auth, async (req, res) => {
  const { subject } = req.params;
  const userId = req.user._id;

  try {
    const progress = await Progress.findOne({ userId });

    const completedLessons = progress?.completed?.get(subject) || [];

    res.json({
      success: true,
      progress: {
        userId,
        completed: { [subject]: completedLessons },
        totalModules: getTotalModulesFor(subject)
      }
    });
  } catch (err) {
    console.error("❌ Progress fetch error:", err);
    res.status(500).json({ success: false, error: "Progress fetch failed" });
  }
});

// POST /api/progress/update
router.post("/update", auth, async (req, res) => {
  const { subject, lesson } = req.body;
  const userId = req.user._id;

  try {
    // Push lesson into completed[subject] array using dynamic key
    await Progress.updateOne(
      { userId },
      { $addToSet: { [`completed.${subject}`]: lesson } },
      { upsert: true }
    );

    // Fetch updated progress
    const updated = await Progress.findOne({ userId });
    const completedLessons = updated?.completed?.get(subject) || [];

    res.json({
      success: true,
      progress: {
        userId,
        completed: { [subject]: completedLessons },
        totalModules: getTotalModulesFor(subject)
      }
    });
  } catch (err) {
    console.error("❌ Progress update error:", err);
    res.status(500).json({ success: false, error: "Progress update failed" });
  }
});

module.exports = router;
