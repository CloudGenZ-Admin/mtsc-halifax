import api from '../utils/api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },

  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      return null;
    }
  }
};
