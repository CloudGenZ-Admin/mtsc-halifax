import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Ship, MapPin, Home as HomeIcon, Wifi, Users, HeartHandshake, LifeBuoy, Package, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Reveal from '../components/common/Reveal';
import { useMtscHomePageLive } from '../hooks/usePayloadLive';
import { getMediaUrl } from '../services/payloadApi';

// Import Events API Context
import { useEvents } from '../context/EventsContext';
import { parseEventDate } from '../utils/dateUtils';

// GALLERY IMAGES FOR MOMENTS SLIDER
import moment1a from '../assets/Moments from Halifax/1. Moments.jpg';
import moment2a from '../assets/Moments from Halifax/2a. Moments.jpg';
import moment2b from '../assets/Moments from Halifax/2b. Moments.jpg';
import moment2c from '../assets/Moments from Halifax/2c. Moments.jpg';
import moment2d from '../assets/Moments from Halifax/2d. Moments.jpg';
import moment2e from '../assets/Moments from Halifax/2e. Moments.jpg';
import moment2f from '../assets/Moments from Halifax/2f. Moments.jpg';
import moment2g from '../assets/Moments from Halifax/2g. Moments.jpg';
import moment2h from '../assets/Moments from Halifax/2h. Moments.jpg';
import moment2i from '../assets/Moments from Halifax/2i. Moments.jpg';
import moment2j from '../assets/Moments from Halifax/2j. Moments.jpg';
import moment2k from '../assets/Moments from Halifax/2k. Moments.jpg';
import moment2l from '../assets/Moments from Halifax/2l. Moments.jpg';
import moment2m from '../assets/Moments from Halifax/2m. Moments.jpg';
import moment2n from '../assets/Moments from Halifax/2n. Moments.jpg';
import moment2o from '../assets/Moments from Halifax/2o. Moments.jpg';
import moment2p from '../assets/Moments from Halifax/2p. Moments.jpg';
import moment2q from '../assets/Moments from Halifax/2q. Moments.jpg';
import moment2r from '../assets/Moments from Halifax/2r. Moments.jpg';
import moment2s from '../assets/Moments from Halifax/2s. Moments.jpg';
import moment2t from '../assets/Moments from Halifax/2t. Moments.jpg';
import moment2u from '../assets/Moments from Halifax/2u. Moments.jpg';
import moment2v from '../assets/Moments from Halifax/2v. Moments.jpg';
import moment2w from '../assets/Moments from Halifax/2w. Moments.jpg';
import moment2x from '../assets/Moments from Halifax/2x. Moments.jpg';
import moment2y from '../assets/Moments from Halifax/2y. Moments.jpg';
import moment2z from '../assets/Moments from Halifax/2z. Moments.jpg';

const defaultMomentsImages = [
  moment1a, moment2a, moment2b, moment2c, moment2d,
  moment2e, moment2f, moment2g, moment2h, moment2i, 
  moment2j, moment2k, moment2l, moment2m, moment2n, 
  moment2o, moment2p, moment2q, moment2r, moment2s, 
  moment2t, moment2u, moment2v, moment2w, moment2x,
  moment2y, moment2z
];

// Helper component to safely render CMS text without any fallback overrides
const RenderCmsContent = ({ content }) => {
  if (content !== undefined && content !== null) {
    if (typeof content === 'string') {
      return content ? <p className="whitespace-pre-line">{content}</p> : null;
    }
    if (Array.isArray(content)) {
      return (
        <>
          {content.map((item, idx) => {
            const val = typeof item === 'string' ? item : (item?.text || '');
            return val ? <p key={idx}>{val}</p> : null;
          })}
        </>
      );
    }
  }
  return null;
};

// Helper function to extract plain text from events
const extractText = (content, overview) => {
  let text = overview || '';

  if (!text && content) {
    try {
      const htmlMatch = content.match(/data-html-content="([^"]+)"/);
      if (htmlMatch) {
        text = htmlMatch[1];
      } else {
        text = content;
      }
      text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      text = text.replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, '');
      text = text.replace(/<[^>]+>/g, '');
    } catch (e) {
      text = '';
    }
  }

  if (!text) return 'Click to view event details...';

  text = text.replace(/\/\*[\s\S]*?\*\//g, '');
  text = text.replace(/[.#a-zA-Z0-9\-_:\s]+{[^}]*}/g, '');
  
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&quot;/g, '"')
             .replace(/&amp;/g, '&')
             .replace(/&#[0-9]+;/g, '')
             .replace(/\s+/g, ' ')
             .trim();

  if (text.includes('max-width:') || text.includes('margin:') || text.includes('padding:') || text.includes('font-family:')) {
    return 'Click to view event details...';
  }

  if (!text) return 'Click to view event details...';

  return text.substring(0, 120) + (text.length > 120 ? '...' : '');
};

import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Home() {
  const { data, isLoading } = useMtscHomePageLive();
  const sliderRef = useRef(null);

  // Use featuredEvents from local Events API Context
  const { featuredEvents, loading } = useEvents();

  // State to control showing all events in the news section
  const [showAllEvents, setShowAllEvents] = useState(false);

  // State to control the donation modal
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isDonateModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDonateModalOpen]);

  // Process API Events (Sort by Newest)
  const sortedEvents = useMemo(() => {
    if (!featuredEvents || featuredEvents.length === 0) return [];
    
    return [...featuredEvents].sort((a, b) => {
      const dateA = parseEventDate(a.eventDate) || new Date(a.createdAt || 0);
      const dateB = parseEventDate(b.eventDate) || new Date(b.createdAt || 0);
      return dateB - dateA;
    });
  }, [featuredEvents]);

  const displayedUpdates = showAllEvents ? sortedEvents : sortedEvents.slice(0, 3);

  // Slider scroll function
  const scrollGallery = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Gallery Images for Moments Slider (CMS + Fallback)
  const galleryImages = useMemo(() => {
    if (Array.isArray(data?.moments_slider) && data.moments_slider.length > 0) {
      return data.moments_slider.map(item => getMediaUrl(item?.image || item, null)).filter(Boolean);
    }
    return defaultMomentsImages;
  }, [data?.moments_slider]);

  // Network Image from CMS
  const networkImageUrl = getMediaUrl(data?.network_image, null);

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero data={data} />

        {/* ----------------- INTRO SECTION ----------------- */}
        <section className="bg-white py-20 md:py-24 border-b border-[#e05a2b]/10">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="text-center max-w-[800px] mx-auto">

                {data?.intro_eyebrow && (
                  <div className="flex justify-center mb-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      {data.intro_eyebrow}
                    </span>
                  </div>
                )}

                {data?.intro_title && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2d3580] leading-tight">
                    {data.intro_title}
                  </h2>
                )}

                {data?.intro_subtitle && (
                  <div className="mt-5 text-base md:text-lg text-[#666666] [&>p]:m-0">
                    <RenderCmsContent content={data.intro_subtitle} />
                  </div>
                )}

                {data?.intro_paragraphs && (
                  <div className="mt-8 text-base md:text-lg text-[#666666] leading-relaxed space-y-5">
                    <RenderCmsContent content={data.intro_paragraphs} />
                  </div>
                )}

              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- SERVICE HIGHLIGHTS ----------------- */}
        <section className="bg-white pb-20 md:pb-28 pt-10">
          <div className="max-w-[1600px] mx-auto px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

              {/* 1. At the Station */}
              {(data?.service_1_title || data?.service_1_description) && (
                <div className="group rounded-[28px] p-8 md:p-10 lg:p-12 transition-all hover:-translate-y-1.5 flex flex-col items-start bg-[#f7f4f1] hover:shadow-[0_12px_32px_rgba(224,90,43,0.12)]">
                  <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-[#fdf0eb]">
                    <svg className="h-8 w-8 md:h-10 md:w-10 text-[#e05a2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  {data?.service_1_eyebrow && (
                    <p className="mt-8 text-[12px] md:text-[14px] font-extrabold uppercase tracking-[0.2em] text-[#e05a2b]">
                      {data.service_1_eyebrow}
                    </p>
                  )}
                  {data?.service_1_title && (
                    <h3 className="mt-3 text-2xl md:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#2d3580]">
                      {data.service_1_title}
                    </h3>
                  )}
                  <div className="mt-5 text-base md:text-lg lg:text-[19px] leading-relaxed flex-1 text-[#666666] [&>p]:m-0">
                    <RenderCmsContent content={data?.service_1_description} />
                  </div>
                  {data?.service_1_link_text && (
                    <a href={data?.service_1_link_url || "/contact"} className="mt-10 inline-flex items-center gap-2 text-base md:text-lg font-extrabold text-[#e05a2b] hover:gap-3 transition-all">
                      {data.service_1_link_text}
                      <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              {/* 2. Logistics */}
              {(data?.service_2_title || data?.service_2_description) && (
                <div className="group rounded-[28px] p-8 md:p-10 lg:p-12 transition-all hover:-translate-y-1.5 flex flex-col items-start bg-[#f7f4f1] hover:shadow-[0_12px_32px_rgba(224,90,43,0.12)]">
                  <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-[#fdf0eb]">
                    <svg className="h-8 w-8 md:h-10 md:w-10 text-[#e05a2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </span>
                  {data?.service_2_eyebrow && (
                    <p className="mt-8 text-[12px] md:text-[14px] font-extrabold uppercase tracking-[0.2em] text-[#e05a2b]">
                      {data.service_2_eyebrow}
                    </p>
                  )}
                  {data?.service_2_title && (
                    <h3 className="mt-3 text-2xl md:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#2d3580]">
                      {data.service_2_title}
                    </h3>
                  )}
                  <div className="mt-5 text-base md:text-lg lg:text-[19px] leading-relaxed flex-1 text-[#666666] [&>p]:m-0">
                    <RenderCmsContent content={data?.service_2_description} />
                  </div>
                  {data?.service_2_link_text && (
                    <a href={data?.service_2_link_url || "https://parcelservice.mtsc.ca/"} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 text-base md:text-lg font-extrabold text-[#e05a2b] hover:gap-3 transition-all">
                      {data.service_2_link_text}
                      <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

            </div>
          </div>
        </section>

        <Stats data={data} />

        {/* ----------------- MOMENTS FROM HALIFAX (IMAGE SLIDER) ----------------- */}
        <section className="pb-20 md:pb-28 pt-10 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <div className="flex mb-4">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      {data?.moments_eyebrow || "Station Life"}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d3580] leading-tight">
                    {data?.moments_title || "Moments from Halifax"}
                  </h2>
                  {data?.moments_subtitle && (
                    <p className="mt-2 text-gray-600 font-medium">{data.moments_subtitle}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollGallery('left')}
                    className="h-12 w-12 rounded-full border-2 border-[#2d3580]/10 cursor-pointer flex items-center justify-center text-[#2d3580] hover:bg-[#2d3580] hover:text-white transition-all shadow-sm focus:outline-none"
                    aria-label="Scroll left"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollGallery('right')}
                    className="h-12 w-12 rounded-full border-2 border-[#2d3580]/10 cursor-pointer flex items-center justify-center text-[#2d3580] hover:bg-[#2d3580] hover:text-white transition-all shadow-sm focus:outline-none"
                    aria-label="Scroll right"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar { 
          display: none; 
        }
        .hide-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}} />

              <div
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 hide-scrollbar cursor-grab active:cursor-grabbing"
              >
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative shrink-0 w-[85vw] sm:w-[45vw] lg:w-[30vw] xl:w-[22vw] aspect-square md:aspect-[4/3] overflow-hidden rounded-[24px] shadow-md group snap-center bg-[#f7f4f1]"
                  >
                    <div className="absolute inset-0 bg-[#2d3580]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                    <img
                      src={img}
                      alt={`Halifax Mission Glimpse ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- LOCAL IN PRESENCE (OUR NETWORK) ----------------- */}
        <section className="bg-[#FDF0EC] py-20 md:py-28 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal className="order-2 md:order-1">

              {data?.network_eyebrow && (
                <div className="flex mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                    <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                    {data.network_eyebrow}
                  </span>
                </div>
              )}

              {data?.network_title && (
                <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-5 leading-tight whitespace-pre-line">
                  {data.network_title}
                </h2>
              )}
              
              {data?.network_subtitle && (
                <p className="text-[18px] font-bold text-[#E05A2B] mb-6">
                  {data.network_subtitle}
                </p>
              )}

              <div className="text-[#5A6C7D] text-[16px] leading-relaxed space-y-5 [&>p]:m-0 [&>p+p]:mt-5">
                <RenderCmsContent content={data?.network_paragraphs} />
              </div>
            </Reveal>

            {networkImageUrl && (
              <Reveal className="order-1 md:order-2">
                <div className="rounded-[24px] overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-[#112A46]/10 z-10"></div>
                  <img
                    src={networkImageUrl}
                    alt={data?.network_image?.alt || "Volunteer and Seafarer Support"}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* ----------------- SUPPORTING SEAFARERS IN HALIFAX (STATION SERVICES) ----------------- */}
        <section className="bg-white py-20 md:py-28 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-7">
            <Reveal>
              <div className="text-center mb-12">
                {data?.station_eyebrow && (
                  <div className="flex justify-center mb-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      {data.station_eyebrow}
                    </span>
                  </div>
                )}

                {data?.station_title && (
                  <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#2d3580] mb-5 leading-tight">
                    {data.station_title}
                  </h2>
                )}

                {data?.station_subtitle && (
                  <p className="text-[18px] font-bold text-[#e05a2b] max-w-[800px] mx-auto mb-4">
                    {data.station_subtitle}
                  </p>
                )}
              </div>

              {Array.isArray(data?.station_services_list) && data.station_services_list.length > 0 && (
                <div className="rounded-[24px] border border-[#e2e8f0] bg-[#f7f4f1] p-8 md:p-12 lg:p-16 text-center shadow-sm mb-12">
                  {data?.station_box_title && (
                    <p className="text-[16px] md:text-[18px] font-bold uppercase tracking-widest text-[#2d3580] mb-12">
                      {data.station_box_title}
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-[1200px] mx-auto">
                    {data.station_services_list.map((item, idx) => {
                      const itemText = item.service_name || item;
                      const defaultIcons = [Ship, MapPin, HomeIcon, Wifi, Users, HeartHandshake, LifeBuoy, Package, ShieldCheck];
                      const IconComp = defaultIcons[idx % defaultIcons.length];
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-white shadow-xl transition-transform hover:-translate-y-1.5 p-4 sm:p-6 md:p-8"
                        >
                          <IconComp className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-[#2d3580] mb-3 sm:mb-4" strokeWidth={1.5} />
                          <span className="text-[13px] sm:text-[15px] md:text-[17px] font-extrabold text-[#e05a2b] leading-snug px-2 max-w-[90%] text-center">
                            {itemText}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {data?.station_footer_text && (
                <div className="text-center text-[#666666] text-[16px] leading-relaxed max-w-[800px] mx-auto mb-10 [&>p]:m-0">
                  <RenderCmsContent content={data.station_footer_text} />
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-4">
                {data?.station_button_1_text && (
                  <a href={data?.station_button_1_url || "/whoweare"} className="inline-flex items-center gap-2 bg-[#e05a2b] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#c94d23] shadow-lg transition-all">
                    {data.station_button_1_text}
                  </a>
                )}
                {data?.station_button_2_text && (
                  <a href={data?.station_button_2_url || "https://parcelservice.mtsc.ca/"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#2d3580] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#1c2e6b] shadow-lg transition-all">
                    {data.station_button_2_text}
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- CLOTHING BANK FOR SEAFARERS ----------------- */}
        <section className="py-20 bg-[#fdf0eb]/50 border-y border-gray-200">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">

                <div className="flex-1">
                  {data?.clothing_eyebrow && (
                    <div className="flex mb-5">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                        <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                        {data.clothing_eyebrow}
                      </span>
                    </div>
                  )}

                  {data?.clothing_title && (
                    <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-[#2d3580] leading-tight">
                      {data.clothing_title}
                    </h2>
                  )}

                  <div className="mt-5 text-base md:text-lg text-[#666666] leading-relaxed space-y-5 [&>p]:m-0 [&>p+p]:mt-5">
                    <RenderCmsContent content={data?.clothing_paragraphs} />
                    
                    {data?.clothing_disclaimer && (
                      <div className="italic text-sm text-[#666666] mt-5 [&>p]:m-0">
                        <RenderCmsContent content={data.clothing_disclaimer} />
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    {data?.clothing_button_1_text && (
                      <a href={data?.clothing_button_1_url || "/contact"} className="inline-flex items-center justify-center bg-[#e05a2b] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#c94d23] shadow-lg transition-all">
                        {data.clothing_button_1_text}
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                    {data?.clothing_button_2_text && (
                      <a href={data?.clothing_button_2_url || "/contact"} className="inline-flex items-center justify-center bg-transparent border-2 border-[#2d3580] text-[#2d3580] px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#2d3580] hover:text-white shadow-lg transition-all">
                        {data.clothing_button_2_text}
                      </a>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex w-full md:w-4/12 justify-center">
                  <div className="grid h-48 w-48 place-items-center rounded-full bg-white shadow-[0_4px_24px_rgba(45,53,128,0.08)] border-4 border-[#e05a2b]/10">
                    <svg className="h-20 w-20 text-[#e05a2b]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                    </svg>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- WHY HALIFAX MATTERS (IMPACT) ----------------- */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[900px] mx-auto px-7 text-center">
            <Reveal>
              {data?.impact_eyebrow && (
                <div className="flex justify-center mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                    <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                    {data.impact_eyebrow}
                  </span>
                </div>
              )}

              {data?.impact_title && (
                <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-5 leading-tight">
                  {data.impact_title}
                </h2>
              )}

              {data?.impact_subtitle && (
                <p className="text-[18px] md:text-[20px] font-bold text-[#E05A2B] mb-8">
                  {data.impact_subtitle}
                </p>
              )}

              <div className="text-[#5A6C7D] text-[17px] leading-relaxed space-y-5 [&>p]:m-0 [&>p+p]:mt-5">
                <RenderCmsContent content={data?.impact_paragraphs} />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- GET INVOLVED ----------------- */}
        <section className="bg-[#FDF0EC] py-20 md:py-28 border-t border-[#E05A2B]/10">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="text-center mb-12">
                {data?.involved_eyebrow && (
                  <div className="flex justify-center mb-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      {data.involved_eyebrow}
                    </span>
                  </div>
                )}

                {data?.involved_title && (
                  <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-5 leading-tight">
                    {data.involved_title}
                  </h2>
                )}

                {data?.involved_subtitle && (
                  <p className="text-[18px] md:text-[20px] font-bold text-[#E05A2B] mb-4">
                    {data.involved_subtitle}
                  </p>
                )}

                {data?.involved_description && (
                  <div className="text-[#5A6C7D] text-[17px] max-w-[800px] mx-auto [&>p]:m-0">
                    <RenderCmsContent content={data.involved_description} />
                  </div>
                )}
              </div>

              <div className="bg-white p-8 md:p-14 rounded-[32px] shadow-xl max-w-[900px] mx-auto mb-10 border-t-[6px] border-[#E05A2B]">
                {Array.isArray(data?.involvement_list) && data.involvement_list.length > 0 && (
                  <>
                    <h3 className="text-[22px] font-black text-[#112A46] mb-6">You can:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                      {data.involvement_list.map((item, index) => {
                        const itemText = item.list_item_text || item;
                        return (
                          <li key={index} className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-[#E05A2B] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            <span className="text-[#5A6C7D] font-medium leading-snug">{itemText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {data?.involved_footer_text && (
                  <div className="bg-[#FDF0EC]/80 p-6 rounded-2xl border border-[#E05A2B]/20 mb-10">
                    <div className="text-[#112A46] font-semibold text-[15px] italic text-center [&>p]:m-0">
                      <RenderCmsContent content={data.involved_footer_text} />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-4">
                  <a href={data?.involved_button_1_url || "/contact"} className="inline-flex cursor-pointer justify-center bg-[#E05A2B] text-white px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#c94d23] shadow-md transition-all">
                    {data?.involved_button_1_text || "Volunteer Locally"}
                  </a>

                  <button
                    onClick={() => setIsDonateModalOpen(true)}
                    className="inline-flex justify-center cursor-pointer bg-[#112A46] text-white px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#0d1f35] shadow-md transition-all"
                  >
                    {data?.involved_button_2_text || "Support the Halifax Mission"}
                  </button>

                  <a
                    href={data?.involved_button_3_url || "https://mtsc.ca/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer justify-center bg-transparent border-2 border-[#112A46] text-[#112A46] px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#112A46] hover:text-white shadow-md transition-all"
                  >
                    {data?.involved_button_3_text || "Explore National Partnerships"}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- DONATE ----------------- */}
        <section className="bg-white py-20 md:py-28 border-b border-[#e05a2b]/10">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>

              <div className="text-center max-w-[800px] mx-auto mb-14">
                {data?.donate_eyebrow && (
                  <div className="flex justify-center mb-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      {data.donate_eyebrow}
                    </span>
                  </div>
                )}
                {data?.donate_title && (
                  <h2 className="text-[clamp(36px,5vw,56px)] font-black text-[#2d3580] mb-6 leading-tight">
                    {data.donate_title}
                  </h2>
                )}
                {data?.donate_subtitle && (
                  <div className="text-[#666666] text-[18px] md:text-[20px] leading-relaxed mb-6 [&>p]:m-0">
                    <RenderCmsContent content={data.donate_subtitle} />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">

                {/* Card 1: Monthly */}
                {(data?.donate_card_1_title || data?.donate_card_1_description) && (
                  <div className="rounded-[32px] bg-gradient-to-br from-[#e05a2b] to-[#c94d23] text-white p-8 md:p-10 lg:p-12 shadow-[0_12px_32px_rgba(224,90,43,0.25)] flex flex-col">
                    <svg className="h-10 w-10 text-white mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {data?.donate_card_1_eyebrow && (
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-white/85 mb-2">
                        {data.donate_card_1_eyebrow}
                      </p>
                    )}
                    {data?.donate_card_1_title && (
                      <h3 className="text-3xl cursor-pointer md:text-4xl font-black text-white leading-tight mb-4">
                        {data.donate_card_1_title}
                      </h3>
                    )}
                    <div className="text-white/90 text-[16px] md:text-[18px] leading-relaxed mb-8 flex-1">
                      <RenderCmsContent content={data?.donate_card_1_description} />
                    </div>
                    <button
                      onClick={() => setIsDonateModalOpen(true)}
                      className="w-full bg-white cursor-pointer text-[#e05a2b] hover:bg-white/90 font-bold h-14 rounded-xl flex items-center justify-center transition-colors text-[16px]"
                    >
                      {data?.donate_card_1_button || "Become a Monthly Donor"}
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}

                {/* Card 2: One-Time */}
                {(data?.donate_card_2_title || data?.donate_card_2_description) && (
                  <div className="rounded-[32px] bg-[#f7f4f1] border-2 border-[#2d3580]/10 p-8 md:p-10 lg:p-12 flex flex-col">
                    <svg className="h-10 w-10 text-[#e05a2b] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {data?.donate_card_2_eyebrow && (
                      <p className="text-[12px] font-extrabold uppercase tracking-widest text-[#e05a2b] mb-2">
                        {data.donate_card_2_eyebrow}
                      </p>
                    )}
                    {data?.donate_card_2_title && (
                      <h3 className="text-3xl md:text-4xl font-black text-[#2d3580] leading-tight mb-4">
                        {data.donate_card_2_title}
                      </h3>
                    )}
                    <div className="text-[#666666] text-[16px] md:text-[18px] leading-relaxed mb-8 flex-1">
                      <RenderCmsContent content={data?.donate_card_2_description} />
                    </div>
                    <button
                      onClick={() => setIsDonateModalOpen(true)}
                      className="w-full bg-[#2d3580] cursor-pointer hover:bg-[#1c2e6b] text-white font-bold h-14 rounded-xl flex items-center justify-center transition-colors text-[16px] mb-6"
                    >
                      {data?.donate_card_2_button || "Make a One-Time Gift"}
                      <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    {data?.donate_disclaimer && (
                      <div className="text-sm text-[#666666] cursor-pointer italic text-center [&>p]:m-0">
                        <RenderCmsContent content={data.donate_disclaimer} />
                      </div>
                    )}
                  </div>
                )}

              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- LATEST FROM HALIFAX (Events List) ----------------- */}
        <section className="bg-[#FDF0EC] py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <div>
                  <div className="flex mb-4">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      Featured Events
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d3580] leading-tight">
                    Latest from Halifax
                  </h2>
                </div>

                {sortedEvents.length > 3 && (
                  <button
                    onClick={() => setShowAllEvents(!showAllEvents)}
                    className="border-2 border-[#2d3580] cursor-pointer text-[#2d3580] hover:bg-[#2d3580] hover:text-white font-bold px-6 py-2.5 rounded-lg transition-colors flex items-center"
                  >
                    {showAllEvents ? "Show Less Updates" : "View Updates"}
                    <svg className={`ml-2 h-4 w-4 transition-transform ${showAllEvents ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                   <p className="text-lg text-[#2d3580] font-bold animate-pulse">Loading featured events...</p>
                </div>
              ) : displayedUpdates.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedUpdates.map((n, idx) => (
                    <Link 
                      to={`/events/${n.url}`} 
                      key={n.id || idx} 
                      className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-[0_12px_32px_rgba(224,90,43,0.12)] hover:-translate-y-1 transition-all flex flex-col block no-underline"
                    >
                      <div className="aspect-[36/9] relative overflow-hidden shrink-0 flex items-end p-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2d3580]/80 via-[#1c2e6b] to-[#112A46] z-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#112A46]/95 via-[#112A46]/40 to-transparent z-0" />

                        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#e05a2b] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 shadow-sm">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {n.tags && n.tags.length > 0 ? n.tags[0] : "Event"}
                        </div>
                        <div className="relative z-10 text-white/95 text-xs font-bold uppercase tracking-wider drop-shadow-md">
                          Halifax
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-extrabold text-[#2d3580] group-hover:text-[#e05a2b] transition-colors leading-snug mb-3">
                          {n.title}
                        </h3>
                        <p className="text-sm text-[#666666] leading-relaxed line-clamp-3 mb-4 flex-1">
                          {extractText(n.content, n.overview)}
                        </p>
                        <div className="inline-flex items-center text-sm font-extrabold text-[#e05a2b] group-hover:gap-2 transition-all mt-auto">
                          Read More
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                  <p className="text-gray-500 font-medium">No events found at this time.</p>
                </div>
              )}
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />

      {/* --- DONATION MODAL POPUP --- */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#112A46]/80 backdrop-blur-sm transition-opacity">
          
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl relative max-h-[95vh] flex flex-col overflow-hidden animate-fade-in-up">
            
            <div className="flex items-center justify-between p-6 md:px-8 border-b border-gray-100 bg-white z-10">
              <h3 className="text-2xl font-black text-[#112A46] flex items-center gap-3">
                <svg className="w-6 h-6 text-[#E05A2B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Secure Donation
              </h3>
              <button
                onClick={() => setIsDonateModalOpen(false)}
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-500 hover:text-gray-800 p-3 rounded-full transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto w-full bg-gray-50 p-4 md:p-8 flex justify-center">
              <iframe 
                src="https://www.canadahelps.org/en/dn/146457" 
                title="CanadaHelps Secure Donation Form"
                className="w-full max-w-[800px] h-[75vh] md:h-[800px] lg:h-[950px] border-none block bg-transparent rounded-xl"
                scrolling="auto"
                allow="payment"
              ></iframe>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}