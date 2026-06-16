import api from '../utils/api';

export const eventService = {
  // Public APIs
  getPublicEvents: async () => {
    const response = await api.get('/events/public');
    return response.data;
  },

  getFeaturedEvents: async () => {
    const response = await api.get('/events/public/featured');
    return response.data;
  },

  getEventsByDate: async (date) => {
    const response = await api.get(`/events/public/by-date?date=${date}`);
    return response.data;
  },

  getEventByUrl: async (url) => {
    const response = await api.get(`/events/public/${url}`);
    return response.data;
  },

  // Admin APIs
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};
