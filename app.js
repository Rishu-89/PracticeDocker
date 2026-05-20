const express = require('express');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  try {
    await db.connect();
    res.send('hello world running at 3000');
  } catch (err) {
    res.status(500).send('db connection failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
