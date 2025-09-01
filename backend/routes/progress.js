const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Progress = require("../models/progress");

// ✅ Utility: total modules per subject
const totalModulesMap = {
  html: 42,
  css: 6,
  js: 8,
  java: 7,
  csharp: 4
};

const getTotalModulesFor = (subject) => totalModulesMap[subject] || 1;

// ✅ Preflight CORS for /update and /:subject
router.options("/update", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(204);
});

router.options("/:subject", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(204);
});

// ✅ GET /api/progress/:subject
router.get("/:subject", auth, async (req, res) => {
  const { subject } = req.params;
  const userId = req.user._id;

  try {
    const progress = await Progress.findOne({ userId });

    const completedLessons =
      progress?.completed?.[subject] && typeof progress.completed[subject] === "object"
        ? progress.completed[subject]
        : {};

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

// ✅ POST /api/progress/update
router.post("/update", auth, async (req, res) => {
  const { subject, lesson } = req.body;
  const userId = req.user._id;

  console.log("📘 Updating progress for:", { userId, subject, lesson });

  if (!subject || !lesson) {
    return res.status(400).json({ success: false, error: "Missing subject or lesson" });
  }

  try {
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      // First-time progress creation
      progress = new Progress({
        userId,
        completed: { [subject]: { [lesson]: true } }
      });
    } else {
      // Ensure structure exists
      if (!progress.completed || typeof progress.completed !== "object") {
        progress.completed = {};
      }

      if (!progress.completed[subject] || typeof progress.completed[subject] !== "object") {
        progress.completed[subject] = {};
      }

      // ✅ Mark lesson as completed
      progress.completed[subject][lesson] = true;

      // ✅ Ensure Mongoose tracks nested changes
      progress.markModified("completed");
    }

    await progress.save();

    console.log("✅ Final saved progress:", JSON.stringify(progress.completed, null, 2));

    const completedLessons = progress.completed[subject] || {};

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
