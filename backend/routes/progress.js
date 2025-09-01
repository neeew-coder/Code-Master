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
    console.error("❌ Progress fetch error:", err.message);
    res.status(500).json({ success: false, error: "Progress fetch failed" });
  }
});

// POST /api/progress/update
router.post("/update", auth, async (req, res) => {
  const { subject, lesson } = req.body;
  const userId = req.user._id;

  if (!subject || !lesson) {
    return res.status(400).json({ success: false, error: "Missing subject or lesson" });
  }

  try {
    // Ensure progress document exists
    let progress = await Progress.findOne({ userId });
    if (!progress) {
      progress = new Progress({
        userId,
        completed: new Map([[subject, [lesson]]])
      });
    } else {
      const current = progress.completed.get(subject) || [];
      if (!current.includes(lesson)) {
        current.push(lesson);
        progress.completed.set(subject, current);
      }
    }

    await progress.save();

    const completedLessons = progress.completed.get(subject) || [];

    res.json({
      success: true,
      progress: {
        userId,
        completed: { [subject]: completedLessons },
        totalModules: getTotalModulesFor(subject)
      }
    });
  } catch (err) {
    console.error("❌ Progress update error:", err.message);
    res.status(500).json({ success: false, error: "Progress update failed" });
  }
});

module.exports = router;
