import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../../context/EventsContext';
import TiptapRender from '../../components/event/TiptapRender';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const EventDetail = () => {
  const { url } = useParams();
  const { fetchSingleEvent } = useEvents();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [url]);

  const fetchEvent = async () => {
    try {
      
      const data = await fetchSingleEvent(url);
      setEvent(data);
    } catch (error) {
      setError('Event not found');
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
                // EditorJS v2 stores items as objects { content, items }, v1 as plain strings
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-warm-gray flex items-center justify-center min-h-[60vh]">
          <div className="text-navy text-xl">Loading event...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-warm-gray flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-navy mb-4">Event Not Found</h1>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-coral hover:text-coral-light transition-colors"
            >
              <FiArrowLeft /> Back to Events
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-navy hover:text-coral transition-colors mb-8 font-semibold"
          >
            <FiArrowLeft /> Back to Events
          </Link>

          <article className="bg-white rounded-2xl shadow-card p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              {event.title}
            </h1>

            {event.eventDate && (
              <div className="flex items-center gap-2 text-text-mid mb-8 text-lg">
                <FiCalendar className="text-coral" />
                <time>{formatDate(event.eventDate)}</time>
              </div>
            )}

            {/* Content */}
            <TiptapRender content={event.content} />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
