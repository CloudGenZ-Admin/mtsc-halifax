import express from 'express';
import { body } from 'express-validator';
import {
  getPublicEvents,
  getFeaturedEvents,
  getEventsByDate,
  getEventByUrl,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/public', getPublicEvents);
router.get('/public/featured', getFeaturedEvents);
router.get('/public/by-date', getEventsByDate);
router.get('/public/:url', getEventByUrl);

// Admin routes (protected)
router.get('/', authenticateToken, getAllEvents);
router.get('/:id', authenticateToken, getEventById);

router.post('/', authenticateToken, [
  body('title').notEmpty().trim().escape(),
  body('url').optional().trim(),
  body('content').optional(),
  body('eventDate').optional({ nullable: true }).isISO8601().toDate(),
  body('isFeatured').optional().isBoolean()
], createEvent);

router.put('/:id', authenticateToken, [
  body('title').notEmpty().trim().escape(),
  body('url').optional().trim(),
  body('content').optional(),
  body('eventDate').optional({ nullable: true }).isISO8601().toDate(),
  body('isFeatured').optional().isBoolean()
], updateEvent);

router.delete('/:id', authenticateToken, deleteEvent);

export default router;
