import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { authService } from '../../services/authService';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TiptapEditor from '../../components/event/TiptapEditor';
import TiptapRender from '../../components/event/TiptapRender';
import toast, { Toaster } from 'react-hot-toast';

// Handle ESM/CommonJS interop
const DatePicker = ReactDatePicker.default || ReactDatePicker;

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    content: '',
    eventDate: null,
    isFeatured: true, // default true since no date on new event
  });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    if (isEdit) {
      fetchEvent();
    }
  }, [id, navigate]);

  const fetchEvent = async () => {
    const loadingToast = toast.loading('Loading event...');
    try {
      const data = await eventService.getEventById(id);
      setFormData({
        title: data.title,
        url: data.url,
        content: data.content || '',
        eventDate: data.eventDate ? new Date(data.eventDate) : null,
        isFeatured: data.isFeatured,
      });
      setContentLoaded(true);
      toast.success('Event loaded', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to load event', { id: loadingToast });
      navigate('/admin/events');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading(isEdit ? 'Updating event...' : 'Creating event...');
    try {
      const eventData = {
        ...formData,
        eventDate: formData.eventDate ? formData.eventDate.toISOString() : null,
      };

      if (isEdit) {
        await eventService.updateEvent(id, eventData);
        toast.success('Event updated successfully', { id: loadingToast });
      } else {
        await eventService.createEvent(eventData);
        toast.success('Event created successfully', { id: loadingToast });
      }

      navigate('/admin/events');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save event', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-card p-4 sm:p-6 mb-6">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/admin/events"
                className="text-navy hover:text-coral transition-colors font-semibold shrink-0 text-sm sm:text-base"
              >
                ← Back
              </Link>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-3xl font-bold text-navy truncate">
                  {isEdit ? 'Edit Event' : 'Create New Event'}
                </h1>
                <p className="text-text-mid text-xs sm:text-sm mt-0.5 hidden sm:block">
                  {isEdit ? 'Update event details and content' : 'Fill in the details to create a new event'}
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="bg-periwinkle hover:bg-navy text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <button
                type="submit"
                form="event-form"
                disabled={loading}
                className="bg-coral hover:bg-coral-light text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all shadow-warm hover:shadow-warm-hover disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>

        {showPreview ? (
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              {formData.title || 'Untitled Event'}
            </h1>

            {formData.eventDate && (
              <div className="text-text-mid mb-8 text-lg">
                <time>
                  {new Date(formData.eventDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            )}

            <TiptapRender content={formData.content} />
          </div>
        ) : (
          <form id="event-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="text-xl font-bold text-navy mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">
                    Event Title <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">
                    Event URL
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="Leave empty to auto-generate from title"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-text-mid mt-2 bg-warm-gray px-3 py-2 rounded-lg">
                    Preview: <code className="font-semibold text-navy">/{formData.url || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</code>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">
                      Event Date
                    </label>
                    <DatePicker
                      selected={formData.eventDate}
                      onChange={(date) => setFormData({ ...formData, eventDate: date, isFeatured: !date ? true : formData.isFeatured })}
                      dateFormat="MMMM d, yyyy"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-all"
                      placeholderText="Select event date"
                      isClearable
                      minDate={new Date()}
                      popperPlacement="bottom-start"
                      popperProps={{ strategy: 'fixed' }}
                      portalId="root"
                    />
                  </div>

                  <div className="flex items-end">
                    <label className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${!formData.eventDate ? 'bg-coral text-white cursor-not-allowed' : 'bg-coral-pale cursor-pointer hover:bg-coral hover:text-white transition-all'}`}>
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        disabled={!formData.eventDate}
                        className="w-5 h-5 text-coral focus:ring-coral border-gray-300 rounded"
                      />
                      <span className="font-bold">
                        {!formData.eventDate ? 'Mark as Featured (no date set)' : 'Mark as Featured'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="text-xl font-bold text-navy mb-4">Event Content</h3>
              <TiptapEditor
                key={isEdit ? `edit-${id}` : 'new'}
                initialContent={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventForm;
