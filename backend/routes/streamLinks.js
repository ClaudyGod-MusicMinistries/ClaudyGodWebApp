// routes/streamLinks.js
const express = require('express');
const router = express.Router();

// Database of secure streaming links
const streamLinks = {
  primary: "https://secured-domain.com/stream/claudyGod",
  // Add other links as needed
};

router.get('/primary-stream', (req, res) => {
  try {
    // Add security checks here (e.g., verify referrer)
    res.json({ url: streamLinks.primary });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve stream link" });
  }
});

module.exports = router;