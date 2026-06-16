import Event from '../models/Event.js';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';

// Public Controllers
export const getPublicEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      order: [['createdAt', 'DESC'], ['createdAt', 'DESC']],
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: { isFeatured: true },
      order: [['createdAt', 'DESC']],
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventsByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    const events = await Event.findAll({
      where: {
        eventDate: {
          [Op.gte]: startDate,
          [Op.lt]: endDate,
        },
      },
      order: [['eventDate', 'ASC']],
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventByUrl = async (req, res, next) => {
  try {
    const { url } = req.params;
    const event = await Event.findOne({ where: { url } });
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// Admin Controllers
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, url, content, eventDate, isFeatured } = req.body;
    
    // Generate URL from title if not provided
    const eventUrl = url || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if URL already exists
    const existingEvent = await Event.findOne({ where: { url: eventUrl } });
    if (existingEvent) {
      return res.status(400).json({ message: 'Event URL already exists' });
    }

    const event = await Event.create({
      title,
      url: eventUrl,
      content,
      eventDate: eventDate || null,
      isFeatured: isFeatured || false,
    });
    
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, url, content, eventDate, isFeatured } = req.body;
    
    // Generate URL from title if not provided
    const eventUrl = url || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if URL already exists (excluding current event)
    const existingEvent = await Event.findOne({
      where: {
        url: eventUrl,
        id: { [Op.ne]: id }
      }
    });
    
    if (existingEvent) {
      return res.status(400).json({ message: 'Event URL already exists' });
    }

    await event.update({
      title,
      url: eventUrl,
      content,
      eventDate: eventDate || null,
      isFeatured,
    });
    
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};
