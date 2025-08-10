const express = require("express");
const axios = require("axios");
const router = express.Router();

const JDoodleEndpoint = "https://api.jdoodle.com/v1/execute";
const clientId = process.env.JDoodle_ClientID;
const clientSecret = process.env.JDoodle_ClientSecret;

const languageConfig = {
  java: "4",    // JDoodle Java version index
  csharp: "3"   // JDoodle C# version index
};

router.post("/run", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Missing code or language" });
  }

  if (!languageConfig[language]) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  try {
    const response = await axios.post(JDoodleEndpoint, {
      script: code,
      language,
      versionIndex: languageConfig[language],
      clientId,
      clientSecret
    });

    res.json({ output: response.data.output });
  } catch (error) {
    console.error("JDoodle error:", error.message);
    res.status(500).json({ error: "Execution failed" });
  }
});

module.exports = router;
