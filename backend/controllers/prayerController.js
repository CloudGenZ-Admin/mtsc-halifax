import Prayer from '../models/Prayer.js';
import { validationResult } from 'express-validator';

// Public - Get all prayers
export const getPublicPrayers = async (req, res, next) => {
  try {
    const prayers = await Prayer.findAll({
      where: { isApproved: true },
      order: [['createdAt', 'DESC']],
    });
    res.json(prayers);
  } catch (error) {
    next(error);
  }
};

// Public - Submit a prayer
export const createPrayer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName,  prayerRequest } = req.body;

    const prayer = await Prayer.create({
      firstName,
      lastName,
      prayerRequest,
      isApproved: true // Auto-approved for immediate display
    });
    
    res.status(201).json(prayer);
  } catch (error) {
    next(error);
  }
};