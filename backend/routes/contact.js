import express from 'express';
import { body } from 'express-validator';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// Submit contact form with reCAPTCHA verification
router.post('/submit', [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').notEmpty().withMessage('Message is required').trim(),
  body('recaptchaToken').notEmpty().withMessage('reCAPTCHA token is required')
], submitContactForm);

export default router;
