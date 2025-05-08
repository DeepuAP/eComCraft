import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'Bearer CKCZanrr9h6oUbmsi1DII2juOaIjnmIBwBwkIeXC'; // <-- Replace with your real Cohere API key

app.post('/chatbot', async (req, res) => {
  try {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: req.body.message,
        model: 'command-r',
        chat_history: [],
        connectors: []
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('[Proxy error]', err);
    res.status(500).json({ error: 'Proxy server error' });
  }
});

app.listen(3000, () => console.log('✅ Proxy running on http://localhost:3000'));
