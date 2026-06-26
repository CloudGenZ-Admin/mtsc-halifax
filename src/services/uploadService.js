import api from '../utils/api';

// Backend base URL (without /api) — used to resolve relative upload paths
// Change this when the backend domain changes
const BACKEND_URL = 'https://mediumpurple-giraffe-353804.hostingersite.com';

/**
 * Resolves a relative upload path (e.g. /uploads/file.webp) to an absolute URL.
 * If the path is already absolute (starts with http), it's returned as-is.
 */
export const resolveUploadUrl = (path) => {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BACKEND_URL}${path}`;
};

/**
 * Prepares HTML content from the DB for the Tiptap editor by converting relative /uploads/ paths to absolute URLs.
 * This prevents images from appearing broken while the admin is editing.
 */
export const prepareContentForEditor = (htmlContent) => {
  if (!htmlContent) return htmlContent;
  // Match normal quotes and HTML-escaped quotes to ensure we catch all image URLs
  return htmlContent.replace(/src=(["']|&quot;)\/?(uploads\/[^"'&]+)\1/g, `src=$1${BACKEND_URL}/$2$1`);
};

/**
 * Prepares HTML content from the editor for the DB by stripping the backend URL, leaving only relative paths.
 * This ensures the DB stays decoupled from the domain.
 */
export const prepareContentForSave = (htmlContent) => {
  if (!htmlContent) return htmlContent;
  
  // Escape BACKEND_URL for use in RegExp
  const safeBackendUrl = BACKEND_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Replace the specific BACKEND_URL prefix with just the relative path
  return htmlContent.replace(new RegExp(`src=(["']|&quot;)${safeBackendUrl}/?(uploads/[^"'&]+)\\1`, 'g'), 'src=$1/$2$1');
};

export const uploadService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    // Do NOT set Content-Type manually - axios sets it with the correct boundary
    const response = await api.post('/upload', formData);

    // Resolve the relative path to an absolute URL for immediate use
    return {
      ...response.data,
      url: resolveUploadUrl(response.data.url),
    };
  },

  deleteFile: async (filename) => {
    await api.delete(`/upload/${filename}`);
  },
};
