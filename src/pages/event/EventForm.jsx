import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { authService } from '../../services/authService';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BlockNoteEditor from '../../components/event/EditorJSComponent';
import ImageGallery from '../../components/event/ImageGallery';
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
    isFeatured: false,
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

  const renderContent = (content) => {
    try {
      const parsed = JSON.parse(content);
      const blocks = Array.isArray(parsed) ? parsed : parsed.blocks || [];
      const elements = [];
      let imageBuffer = [];

      const flushImageBuffer = () => {
        if (imageBuffer.length > 0) {
          if (imageBuffer.length === 1) {
            elements.push(
              <div key={`img-${elements.length}`} className="my-6">
                <img
                  src={imageBuffer[0].url}
                  alt={imageBuffer[0].caption || 'Event'}
                  className="w-full rounded-lg shadow-lg"
                />
                {imageBuffer[0].caption && (
                  <p className="text-center text-sm text-text-mid mt-2">{imageBuffer[0].caption}</p>
                )}
              </div>
            );
          } else {
            elements.push(
              <ImageGallery key={`gallery-${elements.length}`} images={imageBuffer.map(img => img.url)} />
            );
          }
          imageBuffer = [];
        }
      };

      blocks.forEach((block, index) => {
        // Collect consecutive images
        if (block.type === 'image' && block.data?.file?.url) {
          imageBuffer.push({
            url: block.data.file.url,
            caption: block.data.caption
          });
          return;
        }

        flushImageBuffer();

        // Handle alert/callout blocks (blue background)
        if (block.type === 'alert' || block.type === 'callout') {
          elements.push(
            <blockquote key={index} className="border-l-4 border-coral bg-coral-pale p-6 my-6 rounded-r-lg">
              <div className="text-navy font-semibold text-lg" dangerouslySetInnerHTML={{ __html: block.data.message || block.data.text }} />
            </blockquote>
          );
          return;
        }

        // Handle headings
        if (block.type === 'header') {
          const level = block.data?.level || 2;
          const HeadingTag = `h${level}`;
          const classes = level === 1
            ? 'text-4xl font-bold text-navy mt-8 mb-4'
            : level === 2
              ? 'text-3xl font-bold text-navy mt-8 mb-4 border-b-2 border-coral pb-2'
              : 'text-2xl font-bold text-navy mt-6 mb-3';

          elements.push(
            <HeadingTag key={index} className={classes} dangerouslySetInnerHTML={{ __html: block.data.text }} />
          );
          return;
        }

        // Handle paragraphs
        if (block.type === 'paragraph') {
          elements.push(
            <p key={index} className="text-text-mid leading-relaxed mb-4 text-lg" dangerouslySetInnerHTML={{ __html: block.data.text }} />
          );
          return;
        }

        // Handle lists
        if (block.type === 'list') {
          const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
          elements.push(
            <ListTag key={index} className="ml-6 mb-4">
              {block.data.items.map((item, idx) => {
                const text = typeof item === 'string' ? item : (item?.content || '');
                return <li key={idx} className="text-text-mid leading-relaxed mb-2 text-lg" dangerouslySetInnerHTML={{ __html: text }} />;
              })}
            </ListTag>
          );
          return;
        }

        // Handle quotes
        if (block.type === 'quote') {
          elements.push(
            <blockquote key={index} className="border-l-4 border-periwinkle bg-gray-50 p-6 my-6 rounded-r-lg">
              <p className="text-navy text-lg italic" dangerouslySetInnerHTML={{ __html: block.data.text }} />
              {block.data.caption && (
                <cite className="text-text-mid text-sm mt-2 block">— {block.data.caption}</cite>
              )}
            </blockquote>
          );
          return;
        }
      });

      flushImageBuffer();
      return elements;
    } catch (error) {
      console.error('Error rendering content:', error);
      return <div className="text-text-mid">{content}</div>;
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
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="bg-periwinkle hover:bg-navy text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-colors text-sm shrink-0"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </button>
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

            <div className="prose prose-lg max-w-none event-content">
              {formData.content ? renderContent(formData.content) : (
                <p className="text-text-mid italic">No content yet</p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                      onChange={(date) => setFormData({ ...formData, eventDate: date })}
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
                    <label className="flex items-center gap-3 bg-coral-pale px-4 py-3 rounded-xl cursor-pointer hover:bg-coral hover:text-white transition-all w-full">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="w-5 h-5 text-coral focus:ring-coral border-gray-300 rounded"
                      />
                      <span className="font-bold">
                        Mark as Featured
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="text-xl font-bold text-navy mb-4">Event Content</h3>
              {(!isEdit || contentLoaded) && (
                <BlockNoteEditor
                  key={isEdit ? `edit-${id}-${contentLoaded}` : 'new'}
                  initialContent={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-coral hover:bg-coral-light text-white font-bold py-4 rounded-xl transition-all shadow-warm hover:shadow-warm-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
              </button>
              <Link
                to="/admin/events"
                className="px-8 py-4 border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold rounded-xl transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventForm;
