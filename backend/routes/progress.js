const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Progress = require("../models/progress");

// Utility: total modules per subject
const totalModulesMap = {
  html: 5,
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
    let progress = await Progress.findOne({ userId, lesson: subject });

    // Return default if none found
    if (!progress) {
      progress = {
        userId,
        lesson: subject,
        completed: [],
        totalModules: getTotalModulesFor(subject)
      };
    } else {
      // Inject totalModules if missing
      progress = {
        ...progress.toObject(),
        totalModules: getTotalModulesFor(subject)
      };
    }

    res.json({ success: true, progress });
  } catch (err) {
    console.error("❌ Progress fetch error:", err);
    res.status(500).json({ success: false, error: "Progress fetch failed" });
  }
});

// POST /api/progress/update
router.post("/update", auth, async (req, res) => {
  const { lesson, completed } = req.body;
  const userId = req.user._id;

  try {
    const updated = await Progress.findOneAndUpdate(
      { userId, lesson },
      { $set: { completed } },
      { upsert: true, new: true }
    );

    const progressWithMeta = {
      ...updated.toObject(),
      totalModules: getTotalModulesFor(lesson)
    };

    res.json({ success: true, progress: progressWithMeta });
  } catch (err) {
    console.error("❌ Progress update error:", err);
    res.status(500).json({ success: false, error: "Progress update failed" });
  }
});

module.exports = router;
