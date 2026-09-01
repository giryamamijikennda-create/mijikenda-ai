import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 10000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY is not set. Add it to Render Environment Variables.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// In the current GitHub repo, index.html and style.css are at the repository root.
app.use(express.static(__dirname));

const instructions = `
Wewe ni Mijikenda AI, msaidizi wa akili wa kisasa.
- Jibu kwa Kiswahili ikiwa mtumiaji anauliza kwa Kiswahili; tumia English ikiwa anauliza kwa English.
- Kuwa mwenye heshima, wazi, na mwenye msaada.
- Usibuni ukweli. Ikiwa huna uhakika, sema hivyo.
- Heshimu utamaduni wa Mijikenda na epuka dhana potofu.
- Kwa mada nyeti au za kitaalamu, toa tahadhari inayofaa.
`;

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    app: 'Mijikenda AI',
    model: process.env.OPENAI_MODEL || 'gpt-5.6-luna'
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, previousResponseId } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      instructions,
      input: message.trim(),
      ...(previousResponseId
        ? { previous_response_id: previousResponseId }
        : {})
    });

    res.json({
      id: response.id,
      text: response.output_text || 'Samahani, sijapata jibu la maandishi.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Mijikenda AI imepata hitilafu. Angalia Render logs na OpenAI API configuration.'
    });
  }
});

// Serve the root website.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Mijikenda AI running on port ${port}`);
});
