import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { authService } from '../../services/authService';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-navy">Delete this event?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingToast = toast.loading('Deleting...');
              try {
                await eventService.deleteEvent(id);
                setEvents(prev => prev.filter(e => e.id !== id));
                toast.success('Event deleted', { id: loadingToast });
              } catch {
                toast.error('Failed to delete event', { id: loadingToast });
              }
            }}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-100 text-navy px-4 py-1.5 rounded-lg text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const formatDate = (date) => {
    if (!date) return 'No date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => {
    const query = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.url.toLowerCase().includes(query) ||
      formatDate(event.eventDate).toLowerCase().includes(query)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center">
        <div className="text-navy text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gray">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-navy mb-1">Event Management</h1>
              <p className="text-text-mid text-sm">Manage your events, create new ones, and track performance</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                to="/admin/events/new"
                className="bg-coral hover:bg-coral-light text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-warm hover:shadow-warm-hover text-sm"
              >
                Add Event
              </Link>
              <button
                onClick={handleLogout}
                className="bg-navy hover:bg-navy-dark text-white px-4 py-2.5 rounded-xl font-semibold transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-mid text-sm font-semibold mb-1">Total Events</p>
                <p className="text-3xl font-bold text-navy">{events.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-mid text-sm font-semibold mb-1">Featured</p>
                <p className="text-3xl font-bold text-navy">{events.filter(e => e.isFeatured).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-mid text-sm font-semibold mb-1">With Dates</p>
                <p className="text-3xl font-bold text-navy">{events.filter(e => e.eventDate).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card p-16 text-center">
            <h3 className="text-2xl font-bold text-navy mb-3">No events yet</h3>
            <p className="text-text-mid mb-6 max-w-md mx-auto">
              Get started by creating your first event. Share updates, announcements, and stories with your community.
            </p>
            <Link
              to="/admin/events/new"
              className="inline-block bg-coral hover:bg-coral-light text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-warm hover:shadow-warm-hover"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-navy">All Events ({filteredEvents.length})</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                {filteredEvents.length > 10 && (
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                )}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-80 px-4 py-2.5 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                <p className="text-text-mid text-lg">No events found matching "{searchQuery}"</p>
              </div>
            ) : (
              <>
                {paginatedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all p-4 sm:p-6 border-l-4 border-transparent hover:border-coral"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-3">
                      <h2 className="text-xl font-bold text-navy flex-1">{event.title}</h2>
                      {event.isFeatured && (
                        <span className="bg-coral-pale text-coral px-3 py-1 rounded-lg text-xs font-bold shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-text-mid flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-navy text-sm">URL:</span>
                        <code className="bg-warm-gray px-2 py-0.5 rounded text-xs break-all">/{event.url}</code>
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-text-mid">
                        <p><span className="font-semibold">Event:</span> {formatDate(event.eventDate)}</p>
                        <p><span className="font-semibold">Created:</span> {formatDate(event.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      to={`/admin/events/edit/${event.id}`}
                      className="bg-periwinkle hover:bg-navy text-white px-4 py-2 rounded-xl font-semibold transition-colors text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl font-semibold transition-all border border-red-200 hover:border-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-coral text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
