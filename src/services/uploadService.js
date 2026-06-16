import api from '../utils/api';

export const uploadService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    // Do NOT set Content-Type manually - axios sets it with the correct boundary
    const response = await api.post('/upload', formData);

    return response.data;
  },

  deleteFile: async (filename) => {
    await api.delete(`/upload/${filename}`);
  },
};
