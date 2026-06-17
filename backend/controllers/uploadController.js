import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const isImage = IMAGE_MIMES.includes(req.file.mimetype);
    let finalFilename = req.file.filename;

    // Optimize images with sharp (convert to webp for production)
    if (isImage && req.file.mimetype !== 'image/gif' && req.file.mimetype !== 'image/svg+xml') {
      const inputPath  = req.file.path;
      finalFilename    = req.file.filename.replace(/\.[^.]+$/, '.webp');
      const outputPath = path.join(path.dirname(inputPath), finalFilename);

      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true }) // cap at 1920px wide
        .webp({ quality: 82 })
        .toFile(outputPath);

      // Remove original after conversion
      fs.unlinkSync(inputPath);
    }

    const url = `/uploads/${finalFilename}`;

    res.json({
      success: true,
      url,
      filename: finalFilename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    // Clean up file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const deleteFile = async (req, res, next) => {
  try {
    const { filename } = req.params;

    // Prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ message: 'Invalid filename' });
    }

    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'File deleted' });
  } catch (error) {
    next(error);
  }
};
