import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import ReactDatePicker from 'react-datepicker';
import { FiCalendar, FiStar } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Handle ESM/CommonJS interop
const DatePicker = ReactDatePicker.default || ReactDatePicker;

const EventList = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchEventsByDate(selectedDate);
    } else {
      setFilteredEvents(allEvents);
    }
  }, [selectedDate, allEvents]);

  const fetchEvents = async () => {
    try {
      const [featured, all] = await Promise.all([
        eventService.getFeaturedEvents(),
        eventService.getPublicEvents()
      ]);
      setFeaturedEvents(featured);

      // Filter only events that have a date for the date section
      const eventsWithDate = all.filter(event => event.eventDate);
      setAllEvents(eventsWithDate);
      setFilteredEvents(eventsWithDate);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsByDate = async (date) => {
    try {
      const events = await eventService.getEventsByDate(date.toISOString());
      // Exclude featured-only events (no date) from calendar results
      setFilteredEvents(events.filter(event => event.eventDate));
    } catch (error) {
      console.error('Error fetching events by date:', error);
    }
  };

  const getFirstImage = (content) => {
    try {
      const parsed = JSON.parse(content);
      const blocks = Array.isArray(parsed) ? parsed : parsed.blocks || [];
      for (const block of blocks) {
        if (block.type === 'image' && block.data?.file?.url) {
          return block.data.file.url;
        }
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center">
        <div className="text-navy text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-navy mb-12 text-center">Events</h1>

          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <FiStar className="text-coral text-2xl fill-coral" />
                <h2 className="text-3xl font-bold text-navy">Featured Events</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} event={event} getFirstImage={getFirstImage} formatDate={formatDate} />
                ))}
              </div>
            </section>
          )}

          {/* Date Filter */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-4 flex-wrap">
                <FiCalendar className="text-coral text-2xl" />
                <label className="text-lg font-semibold text-navy">Filter by Date:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  dateFormat="MMMM d, yyyy"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  placeholderText="Select a date"
                  isClearable
                />
              </div>
            </div>
          </section>

          {/* All Events */}
          <section>
            <h2 className="text-3xl font-bold text-navy mb-6">
              {selectedDate ? `Events for ${formatDate(selectedDate)}` : 'All Events'}
            </h2>
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                <p className="text-text-mid text-lg">
                  {selectedDate ? 'No events found for this date' : 'No events available'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} getFirstImage={getFirstImage} formatDate={formatDate} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const EventCard = ({ event, getFirstImage, formatDate }) => {
  const imageUrl = getFirstImage(event.content);

  return (
    <Link
      to={`/events/${event.url}`}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden group"
    >
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-coral transition-colors">
          {event.title}
        </h3>
        {event.eventDate && (
          <p className="text-text-mid text-sm flex items-center gap-2">
            <FiCalendar /> {formatDate(event.eventDate)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default EventList;
