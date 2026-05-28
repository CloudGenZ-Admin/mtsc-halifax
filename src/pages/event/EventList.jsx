import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import { FiCalendar, FiStar, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { FaTicketAlt } from 'react-icons/fa';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Reveal from '../../components/common/Reveal';

// Import the background image
import eventsBg from '../../assets/Events.jpeg';

const EventList = () => {
  const { allEvents, featuredEvents, loading: eventsLoading } = useEvents();
  const [currentSlide, setCurrentSlide] = useState(0);

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 1. FILTER FOR TOP 3 LATEST FEATURED EVENTS (Ongoing & Upcoming)
  const sliderEvents = useMemo(() => {
    // We prioritize "featuredEvents", but fallback to "allEvents" if empty
    const sourceEvents = (featuredEvents && featuredEvents.length > 0) ? featuredEvents : allEvents;
    
    if (!sourceEvents || sourceEvents.length === 0) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter for ongoing and upcoming events
    const upcoming = sourceEvents
      .filter((event) => event.eventDate && new Date(event.eventDate) >= today)
      .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

    // If we have upcoming events, take the top 3
    if (upcoming.length > 0) {
      return upcoming.slice(0, 3);
    }

    // Fallback: If no future events exist, just grab the 3 latest featured events 
    return [...sourceEvents]
      .sort((a, b) => new Date(b.eventDate || 0) - new Date(a.eventDate || 0))
      .slice(0, 3);
  }, [allEvents, featuredEvents]);

  // 2. AUTO-PLAY EFFECT
  useEffect(() => {
    if (sliderEvents.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderEvents.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(timer);
  }, [sliderEvents.length]);

  // 3. MANUAL NAVIGATION
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderEvents.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderEvents.length - 1 : prev - 1));
  };

  // Extract first image from the rich text content
  const getFirstImage = (content) => {
    if (!content) return null;
    let searchContent = content;
    
    const htmlBlockMatch = content.match(/data-html-content="([^"]+)"/);
    if (htmlBlockMatch) {
      searchContent = htmlBlockMatch[1]
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&');
    }
    
    const match = searchContent.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (match) return match[1];
    
    try {
      const parsed = JSON.parse(searchContent);
      if (parsed.content && Array.isArray(parsed.content)) {
        for (const node of parsed.content) {
          if (node.type === 'image' && node.attrs?.src) return node.attrs.src;
          if (node.content && Array.isArray(node.content)) {
            for (const child of node.content) {
              if (child.type === 'image' && child.attrs?.src) return child.attrs.src;
            }
          }
        }
      }
    } catch (e) {}
    return null;
  };

  if (eventsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-warm-gray flex items-center justify-center min-h-[60vh]">
          <div className="text-navy text-xl font-bold animate-pulse">Loading events...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-warm-gray">
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={eventsBg} 
              alt="Events" 
              className="w-full h-full object-cover" 
              style={{ objectPosition: '50% 25%' }} 
            />
            <div className="absolute inset-0 bg-navy/40"></div>
          </div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/80 backdrop-blur-sm text-white text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-white/20">
              <FiCalendar /> Community Events
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto drop-shadow-lg">
              Our <span className="text-coral">Events</span>
            </h1>
            <p className="text-white text-[20px] font-medium max-w-2xl mx-auto mb-8 drop-shadow-md">
              Join us in celebrating and supporting seafarers through our community events, fundraisers, and special occasions throughout the year.
            </p>
            
            <Link
              to="/WaysToGive#tickets"
              className="inline-flex items-center gap-2 bg-coral text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-opacity-95 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <FaTicketAlt className="text-lg" />
              Purchase Event Tickets
            </Link>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* =========================================
              EVENTS ANNOUNCEMENT SLIDER
              ========================================= */}
          <section className="mb-16">
            <Reveal>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-navy flex items-center gap-3">
                  <span className="w-2 h-8 bg-coral rounded-full"></span>
                  Events Announcement
                </h2>
                <p className="text-text-mid mt-2 ml-5">Our top ongoing and upcoming events</p>
              </div>
              
              <div className="relative w-full h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-card">
                
                {sliderEvents.length > 0 ? (
                  <div className="relative w-full h-full">
                    {/* SLIDING TRACK */}
                    <div 
                      className="absolute top-0 left-0 h-full flex transition-transform duration-700 ease-in-out"
                      style={{ 
                        width: `${sliderEvents.length * 100}%`,
                        transform: `translateX(-${(currentSlide * 100) / sliderEvents.length}%)` 
                      }}
                    >
                      {sliderEvents.map((event) => {
                        const imageUrl = getFirstImage(event.content);
                        const isUpcoming = new Date(event.eventDate) >= new Date(new Date().setHours(0,0,0,0));
                        
                        return (
                          <div 
                            key={event.id} 
                            className="relative h-full overflow-hidden"
                            style={{ width: `${100 / sliderEvents.length}%` }}
                          >
                            {/* LAYER 0: Background Image */}
                            {imageUrl ? (
                              <img 
                                src={imageUrl} 
                                alt={event.title} 
                                className="absolute inset-0 w-full h-full object-cover z-0"
                              />
                            ) : (
                              // Slider Fallback Image
                              <img 
                                src={eventsBg} 
                                alt={event.title} 
                                className="absolute inset-0 w-full h-full object-cover z-0"
                                style={{ objectPosition: '50% 25%' }}
                              />
                            )}
                            
                            {/* LAYER 1: Dark Overlay so text is readable */}
                            <div className="absolute inset-0 bg-black/60 z-10"></div>
                            
                            {/* LAYER 2: Text Content & Button */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 md:p-12">
                              
                              <span className="inline-block bg-coral/90 text-white text-xs md:text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-md border border-coral-light/50">
                                {isUpcoming ? "Upcoming Event" : "Recent Event"}
                              </span>
                              
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg max-w-4xl leading-tight">
                                {event.title}
                              </h3>
                              
                              {event.eventDate && (
                                <p className="text-white/90 text-lg md:text-xl font-medium mb-8 flex items-center justify-center gap-2 drop-shadow-md">
                                  <FiCalendar className="text-coral" /> {formatDate(event.eventDate)}
                                </p>
                              )}
                              
                              {/* --- LINK BUTTON TO SPECIFIC EVENT --- */}
                              <Link
                                to={`/events/${event.url}`}
                                className="inline-flex items-center gap-2 bg-coral text-white px-8 md:px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(255,107,107,0.4)] hover:shadow-[0_0_30px_rgba(255,107,107,0.6)] hover:-translate-y-1 hover:bg-white hover:text-coral border-2 border-coral z-30"
                              >
                                View Event Details <FiArrowRight className="text-xl" />
                              </Link>
                              
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Navigation Arrows */}
                    {sliderEvents.length > 1 && (
                      <>
                        <button 
                          onClick={prevSlide}
                          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-coral text-white p-4 rounded-full backdrop-blur-md transition-colors shadow-lg border border-white/20"
                          aria-label="Previous"
                        >
                          <FiChevronLeft className="text-3xl" />
                        </button>
                        <button 
                          onClick={nextSlide}
                          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-coral text-white p-4 rounded-full backdrop-blur-md transition-colors shadow-lg border border-white/20"
                          aria-label="Next"
                        >
                          <FiChevronRight className="text-3xl" />
                        </button>

                        {/* Navigation Dots */}
                        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
                          {sliderEvents.map((_, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setCurrentSlide(idx)}
                              className={`h-3 rounded-full transition-all duration-300 shadow-md ${
                                idx === currentSlide ? 'bg-coral w-12' : 'bg-white/60 w-4 hover:bg-white'
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full z-20 relative p-8 text-center bg-navy-dark">
                    <img 
                      src={eventsBg} 
                      alt="Events coming soon" 
                      className="absolute inset-0 w-full h-full object-cover z-0" 
                      style={{ objectPosition: '50% 25%' }}
                    />
                    <div className="absolute inset-0 bg-navy/50 z-10"></div>
                    <div className="relative z-20 flex flex-col items-center">
                      <FiCalendar className="text-coral text-6xl mb-4" />
                      <h3 className="text-3xl font-bold text-white mb-2">More Events Coming Soon</h3>
                      <p className="text-white/80 text-lg">Check out our featured events below.</p>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </section>

          {/* =========================================
              FEATURED EVENTS SECTION
              ========================================= */}
          {featuredEvents && featuredEvents.length > 0 && (
            <section className="mb-16">
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <FiStar className="text-coral text-3xl fill-coral" />
                  <h2 className="text-3xl font-bold text-navy">Featured Events</h2>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map((event) => (
                  <Reveal key={event.id}>
                    <EventCard event={event} getFirstImage={getFirstImage} formatDate={formatDate} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

// Reusable Event Card
const EventCard = ({ event, getFirstImage, formatDate }) => {
  const imageUrl = getFirstImage(event.content);

  return (
    <Link
      to={`/events/${event.url}`}
      className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden group flex flex-col h-full border border-gray-100"
    >
      {imageUrl ? (
        <div className="h-56 overflow-hidden relative">
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors"></div>
        </div>
      ) : (
        <div className="h-56 bg-navy/5 flex items-center justify-center relative overflow-hidden">
          <img 
            src={eventsBg} 
            alt="Event placeholder" 
            className="absolute inset-0 w-full h-full object-cover opacity-20" 
            style={{ objectPosition: '50% 25%' }}
          />
          <FiCalendar className="text-4xl text-navy/40 relative z-10" />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-coral transition-colors line-clamp-2">
          {event.title}
        </h3>
        <div className="mt-auto">
          {event.eventDate && (
            <p className="text-text-mid font-medium text-sm flex items-center gap-2">
              <FiCalendar className="text-coral" /> {formatDate(event.eventDate)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventList;