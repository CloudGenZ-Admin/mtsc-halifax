import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return res.json({
        token,
        message: 'Login successful',
        user: { email, role: 'admin' }
      });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (req, res) => {
  res.json({ valid: true, user: req.user });
};
