import pool from '../config/db.js';

export async function createAccount(userId) {
  const result = await pool.query(
    'INSERT INTO accounts (user_id) VALUES ($1) RETURNING id, balance, created_at',
    [userId]
  );
  return result.rows[0];
}

export async function getAccountsByUser(userId) {
  const result = await pool.query(
    'SELECT id, balance, created_at FROM accounts WHERE user_id = $1 ORDER BY id',
    [userId]
  );
  return result.rows;
}

export async function getAccountById(accountId, userId) {
  const result = await pool.query(
    'SELECT id, balance, created_at FROM accounts WHERE id = $1 AND user_id = $2',
    [accountId, userId]
  );
  return result.rows[0];
}