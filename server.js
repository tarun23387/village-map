// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Proxy fetch error:", err.message);
    res.status(500).send("Failed to fetch URL");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
