require('dotenv').config();
const express = require('express');
const pool = require('./config/db');

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'database down' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});