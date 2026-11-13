import 'dotenv/config';
import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/auth.js';
import accountRoutes from './routes/accounts.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);

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