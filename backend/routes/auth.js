import express from 'express';
import { body } from 'express-validator';
import { login, verifyToken } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().trim()
], login);

router.get('/verify', authenticateToken, verifyToken);

export default router;
