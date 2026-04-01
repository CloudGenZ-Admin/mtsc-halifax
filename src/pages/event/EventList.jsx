import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import ReactDatePicker from 'react-datepicker';
import { FiCalendar, FiStar, FiSearch } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Reveal from '../../components/common/Reveal';

const DatePicker = ReactDatePicker.default || ReactDatePicker;

const EventList = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const [featured, all] = await Promise.all([
        eventService.getFeaturedEvents(),
        eventService.getPublicEvents()
      ]);
      setFeaturedEvents(featured);
      const eventsWithDate = all.filter(event => event.eventDate);
      setAllEvents(eventsWithDate);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter(event => {
        const eventDateStr = new Date(event.eventDate).toISOString().split('T')[0];
        return eventDateStr === selectedDateStr;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => {
        const title = event.title?.toLowerCase() || '';
        const url = event.url?.toLowerCase() || '';
        const eventDate = event.eventDate ? formatDate(event.eventDate).toLowerCase() : '';
        return title.includes(query) || url.includes(query) || eventDate.includes(query);
      });
    }

    return filtered;
  }, [allEvents, selectedDate, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDate]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getFirstImage = (content) => {
    if (!content) return null;
    const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-warm-gray flex items-center justify-center min-h-[60vh]">
          <div className="text-navy text-xl">Loading events...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              <FiCalendar /> Upcoming & Past Events
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
              Our <span className="text-coral">Events</span>
            </h1>
            <p className="text-white/80 text-[17px] font-medium max-w-2xl mx-auto">
              Join us in celebrating and supporting seafarers through our community events, fundraisers, and special occasions throughout the year.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 bg-warm-gray">
          {featuredEvents.length > 0 && (
            <section className="mb-16">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <FiStar className="text-coral text-2xl fill-coral" />
                  <h2 className="text-3xl font-bold text-navy">Featured Events</h2>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                  <Reveal key={event.id}>
                    <EventCard event={event} getFirstImage={getFirstImage} formatDate={formatDate} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <section className="mb-8">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4 flex-wrap relative z-20">
                    <FiCalendar className="text-coral text-2xl" />
                    <label className="text-lg font-semibold text-navy">Filter by Date:</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={setSelectedDate}
                      dateFormat="MMMM d, yyyy"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                      placeholderText="Select a date"
                      isClearable
                      portalId="root"
                    />
                  </div>

                  <div className="flex items-center gap-2 flex-1 md:max-w-md">
                    <div className="relative flex-1">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                      <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section>
            <Reveal>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-navy">
                  {selectedDate ? `Events for ${formatDate(selectedDate)}` : 'All Events'}
                </h2>
                {filteredEvents.length > 10 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-mid">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent text-sm"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                )}
              </div>
            </Reveal>

            {filteredEvents.length === 0 ? (
              <Reveal>
                <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                  <p className="text-text-mid text-lg">
                    {searchQuery ? 'No events found matching your search' : selectedDate ? 'No events found for this date' : 'No events available'}
                  </p>
                </div>
              </Reveal>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedEvents.map((event) => (
                    <Reveal key={event.id}>
                      <EventCard event={event} getFirstImage={getFirstImage} formatDate={formatDate} />
                    </Reveal>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Reveal>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-coral hover:text-white hover:border-coral disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-inherit transition-colors"
                      >
                        Previous
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                currentPage === page
                                  ? 'bg-coral text-white'
                                  : 'bg-white border border-gray-300 hover:bg-coral hover:text-white hover:border-coral'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="px-2">...</span>;
                        }
                        return null;
                      })}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-coral hover:text-white hover:border-coral disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-inherit transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </Reveal>
                )}
              </>
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
