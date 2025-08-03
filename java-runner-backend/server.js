const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JDoodleConfig = {
  clientId: '461d5a8e0c5a6d8a871647efb4751f9',
  clientSecret: 'e0d02f45ddc5d2ae6be7d66c87331cbf154d5fe90daea1571f05cebef5962984',
  endpoint: 'https://api.jdoodle.com/v1/execute'
};

// 🧠 Unified route for multiple languages
app.post('/run', async (req, res) => {
  const { code, language } = req.body;

  // Map language to JDoodle versionIndex
  const languageConfig = {
    java: '4',
    csharp: '4'
  };

  if (!languageConfig[language]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  try {
    const response = await axios.post(JDoodleConfig.endpoint, {
      script: code,
      language: language,
      versionIndex: languageConfig[language],
      clientId: JDoodleConfig.clientId,
      clientSecret: JDoodleConfig.clientSecret
    });

    res.json({ output: response.data.output });
  } catch (error) {
    console.error('JDoodle error:', error.message);
    res.status(500).json({ error: 'Execution failed.' });
  }
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Multi-language Runner Backend is live.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));