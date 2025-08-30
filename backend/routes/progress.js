const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

const totalModules = {
  html: 10,
  css: 8,
  js: 12
};

// Save progress
router.post("/", auth, async (req, res) => {
  const { subject, lessonId } = req.body;
  const user = req.user;

  if (!subject || !lessonId) {
    return res.status(400).json({ error: "Missing subject or lessonId" });
  }

  try {
    const currentProgress = user.progress.get(subject) || [];

    if (!currentProgress.includes(lessonId)) {
      currentProgress.push(lessonId);
      user.progress.set(subject, currentProgress);
      await user.save();
    }

    res.json({
      completedModules: currentProgress,
      totalModules: totalModules[subject] || 10
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// Get progress
router.get("/:subject", auth, async (req, res) => {
  const subject = req.params.subject;
  const user = req.user;

  try {
    const completedModules = user.progress.get(subject) || [];
    res.json({
      completedModules,
      totalModules: totalModules[subject] || 10
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

module.exports = router;
