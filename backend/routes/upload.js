import express from 'express';
import { upload } from '../middleware/upload.js';
import { uploadFile, deleteFile } from '../controllers/uploadController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/upload — admin only
router.post('/', authenticateToken, upload.single('file'), uploadFile);

// DELETE /api/upload/:filename — admin only
router.delete('/:filename', authenticateToken, deleteFile);

export default router;
