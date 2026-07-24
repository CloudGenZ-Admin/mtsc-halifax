import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { eventService } from '../services/eventService';
import { formatDate } from '../utils/dateUtils';

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [allEvents, setAllEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all events and featured events once when app loads
  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        const [featured, all] = await Promise.all([
          eventService.getFeaturedEvents(),
          eventService.getPublicEvents()
        ]);
        
        // Add formatted date to all events (only include events with eventDate)
        const eventsWithDate = all
          .filter(event => event.eventDate)
          .map(event => ({
            ...event,
            formattedDate: formatDate(event.eventDate)
          }));
        
        setFeaturedEvents(featured);
        setAllEvents(eventsWithDate);
        setError(null);
      } catch (err) {
        console.error('Failed to load events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadEvents();
  }, []);

  // Get event by ID (from already-loaded list)
  const getEventById = useCallback((id) => {
    return allEvents.find(event => event.id.toString() === id.toString());
  }, [allEvents]);

  // Get event by URL slug (from already-loaded list)
  const getEventByUrl = useCallback((url) => {
    return allEvents.find(event => event.url === url);
  }, [allEvents]);

  // Smart fetch: returns cached event if available, 
  // otherwise fetches from API (handles direct URL access)
  const fetchSingleEvent = useCallback(async (url) => {
    // First check if we already have it in the loaded events
    const existing = allEvents.find(event => event.url === url);
    if (existing) return existing;
    
    // Always fetch individually if not found in cache
    try {
      const event = await eventService.getEventByUrl(url);
      if (event) {
        // Add formatted date
        const eventWithDate = {
          ...event,
          formattedDate: formatDate(event.eventDate)
        };
        
        // Add to our local list so future lookups are instant
        setAllEvents(prev => {
          const alreadyExists = prev.some(e => e.id === event.id);
          return alreadyExists ? prev : [...prev, eventWithDate];
        });
        
        return eventWithDate;
      }
      return null;
    } catch (err) {
      console.error(`Failed to fetch event ${url}:`, err);
      return null;
    }
  }, [allEvents]);

  const value = {
    allEvents,
    featuredEvents,
    loading,
    error,
    getEventById,
    getEventByUrl,
    fetchSingleEvent
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within EventsProvider');
  }
  return context;
}