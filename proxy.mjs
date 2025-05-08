const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors()); // <== THIS FIXES CORS
app.use(express.json());

const COHERE_API_KEY = `Bearer ${process.env.COHERE_API_KEY}`;

app.post('/chatbot', async (req, res) => {
  try {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': COHERE_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: req.body.message,
        model: "command-r",
        chat_history: [],
        connectors: []
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));
