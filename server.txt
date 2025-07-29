// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = "461d5a8e0c5a6d8a871647efb4751f9";
const CLIENT_SECRET = "c45771cf2db4ed3c9de3e43fa20794a3ae86d5db178f68dc7e89b3ede644d06e";

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
    res.status(500).json({ error: "JDoodle API failed", details: err.message });
  }
});

app.listen(3000, () => console.log("JDoodle proxy running on http://localhost:3000"));
