import express from 'express';
import authenticate from '../middleware/auth.js';
import { createAccount, getAccountsByUser, getAccountById } from '../models/account.js';

const router = express.Router();

router.use(authenticate);

router.post('/', async (req, res) => {
  try {
    const account = await createAccount(req.userId);
    res.status(201).json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/', async (req, res) => {
  try {
    const accounts = await getAccountsByUser(req.userId);
    res.json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const accountId = Number(req.params.id);
    if (!Number.isInteger(accountId)) {
      return res.status(400).json({ error: 'Invalid account id' });
    }

    const account = await getAccountById(accountId, req.userId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;