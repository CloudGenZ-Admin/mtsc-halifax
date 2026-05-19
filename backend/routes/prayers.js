import express from 'express';
import { body } from 'express-validator';
import { getPublicPrayers, createPrayer } from '../controllers/prayerController.js';

const router = express.Router();

// Get public prayers
router.get('/public', getPublicPrayers);

// Submit new prayer
router.post('/', [
  body('firstName').notEmpty().trim().escape(),
  body('lastName').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('prayerRequest').notEmpty().trim().escape()
], createPrayer);

export default router;