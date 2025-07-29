const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // ✅ FIXED fetch for CommonJS

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = "461d5a8e0c5a6d8a871647efb4751f9";
const CLIENT_SECRET = "e0d02f45ddc5d2ae6be7d66c87331cbf154d5fe90daea1571f05cebef5962984";

app.post("/run-java", async (req, res) => {
  const { script } = req.body;

  try {
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        script,
        language: "java",
        versionIndex: "4"
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("JDoodle API error:", err);
    res.status(500).json({
      error: "JDoodle API failed",
      details: err.message
    });
  }
});

app.listen(3000, () => console.log("✅ JDoodle proxy running on http://127.0.0.1:3000"));