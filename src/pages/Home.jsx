import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Ship, MapPin, Home as HomeIcon, Wifi, Users, HeartHandshake, LifeBuoy, Package, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Reveal from '../components/common/Reveal';

// Import Events API Context
import { useEvents } from '../context/EventsContext';

// Import local images for the "Join Our Community" section
import findPortImg from '../assets/img/footer-find-port_1.png';
import prayerWallImg from '../assets/img/footer-prayer-wall.png';
import happySeaImg from '../assets/img/footer-happy-sea.png';
import newsletterImg from '../assets/img/footer-newsletter.png';
import eventCalendarImg from '../assets/img/footer-event-calendar.png';
import volunteerImg from '../assets/Volunteer.jpg';

// Import local SVGs for "How We Support the World's Seafarers in Canada" section
import practicalSupportIcon from '../assets/img/Seafarers/practical-support_1.svg';
import mentalEmotionalIcon from '../assets/img/Seafarers/mental-emotional-help.svg';
import spiritualCareIcon from '../assets/img/Seafarers/spiritual-care.svg';
import advocacyRightsIcon from '../assets/img/Seafarers/advocacy-rights.svg';
import communityConnectionIcon from '../assets/img/Seafarers/community-connection.svg';

// Import local SVGs for "Ways to Get Involved" section
import iconApplyVolunteer from '../assets/img/Donate/icon-apply-volunteer.svg';
import iconSubscribeNews from '../assets/img/Donate/icon-subscribe-news.svg';
import findPortBgIcon from '../assets/img/Donate/find-port-bg.svg';

// Import local image for "Find a Station" section
import operatingShipsImg from '../assets/img/Seafarers/infgrph-operating-ships.png';

// --- PARTNER PORT LOGOS FOR CAROUSEL ---
import portSydney from '../assets/Corpo/ports/Port-of-Sydney-Canada--768x388.png.webp';
import portGCT from '../assets/Corpo/ports/Global-Container-Terminals-.png.webp';
import portHopa from '../assets/Corpo/ports/hopa-ports-logo-768x388.png';
import portHelm from '../assets/Corpo/ports/logo-helm-768x388.webp';
import portOntario from '../assets/Corpo/ports/logo-ontario-shipyards.webp';
import portPrinceRupert from '../assets/Corpo/ports/logo-prince-rupert.webp';
import portRobertAllan from '../assets/Corpo/ports/logo-robert-allan.png.webp';
import portTK from '../assets/Corpo/ports/logo-tk.webp';
import portNamma from '../assets/Corpo/ports/nammalogo-1024x269.jpg.webp';
import portToronto from '../assets/Corpo/ports/Toronto-Ports-logo-768x305.png';
import portDpWorld from '../assets/Corpo/ports/dpworld-logo.png.webp';

// --- GALLERY IMAGES ---
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

// Helper function to extract plain text and robustly strip out any leaked CSS from the CMS
const extractText = (content, overview) => {
  let text = overview || '';

  if (!text && content) {
    try {
      // Unpack data-html-content if present
      const htmlMatch = content.match(/data-html-content="([^"]+)"/);
      if (htmlMatch) {
        text = htmlMatch[1];
      } else {
        text = content;
      }
      
      // Unescape basic HTML so tags can be recognized
      text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      // Completely remove <style> and <script> blocks before stripping tags
      text = text.replace(/<(style|script)[^>]*>[\s\S]*?<\/\1>/gi, '');
      
      // Strip all remaining HTML tags
      text = text.replace(/<[^>]+>/g, '');
    } catch (e) {
      text = '';
    }
  }

  if (!text) return 'Click to view event details...';

  // Aggressive cleanup for leaked CSS strings (whether originating from overview or content fields)
  text = text.replace(/\/\*[\s\S]*?\*\//g, ''); // Removes CSS comments like /* Scoped CSS ... */
  text = text.replace(/[.#a-zA-Z0-9\-_:\s]+{[^}]*}/g, ''); // Removes CSS blocks like .className { ... } or :root { ... }
  
  // Clean up common HTML entities and excessive whitespace
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&quot;/g, '"')
             .replace(/&amp;/g, '&')
             .replace(/&#[0-9]+;/g, '')
             .replace(/\s+/g, ' ')
             .trim();

  // Final safety net: If raw CSS properties are still detected, hide the garbage text
  if (text.includes('max-width:') || text.includes('margin:') || text.includes('padding:') || text.includes('font-family:')) {
    return 'Click to view event details...';
  }

  if (!text) return 'Click to view event details...';

  // Truncate cleanly
  return text.substring(0, 120) + (text.length > 120 ? '...' : '');
};

export default function Home() {
  // Use featuredEvents instead of allEvents
  const { featuredEvents, loading } = useEvents();

  // State to control showing all events in the news section
  const [showAllEvents, setShowAllEvents] = useState(false);

  // State to control the donation modal
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  // Ref for the image gallery slider
  const sliderRef = useRef(null);

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

  // Gallery images array
  const galleryImages = [
    moment1a, moment2a, moment2b, moment2c, moment2d,
    moment2e, moment2f, moment2g, moment2h, moment2i, 
    moment2j, moment2k, moment2l, moment2m, moment2n, 
    moment2o, moment2p, moment2q, moment2r, moment2s, 
    moment2t, moment2u, moment2v, moment2w, moment2x,
    moment2y, moment2z
  ];

  // Process API Events (Sort by Newest, fallback to createdAt if eventDate is null)
  const sortedEvents = useMemo(() => {
    if (!featuredEvents || featuredEvents.length === 0) return [];
    
    return [...featuredEvents].sort((a, b) => {
      const dateA = new Date(a.eventDate || a.createdAt || 0);
      const dateB = new Date(b.eventDate || b.createdAt || 0);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* ----------------- INTRO SECTION ----------------- */}
        <section className="bg-white py-20 md:py-24 border-b border-[#e05a2b]/10">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="text-center max-w-[800px] mx-auto">

                <div className="flex justify-center mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                    <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                    How We Help
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2d3580] leading-tight">
                  How We Support the World’s Seafarers in Canada
                </h2>

                <p className="mt-5 text-base md:text-lg text-[#666666]">
                  As part of a 160+ year legacy, we provide practical, emotional, and community-based support for seafarers while they are in port ensuring no one feels alone.
                </p>

                <div className="mt-8 text-base md:text-lg text-[#666666] leading-relaxed space-y-5">
                  <p>Mission to Seafarers Canada provides the national leadership, fund development, partnerships, and support that strengthen stations across the country.</p>
                  <p>At the Port of Halifax, that work becomes direct.</p>
                  <p>Here, we offer seafarers a welcoming place where they can rest, connect with loved ones, access practical help, receive a haircut, and know that they are not alone.</p>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- SERVICE HIGHLIGHTS ----------------- */}
        <section className="bg-white pb-20 md:pb-28 pt-10">
          <div className="max-w-[1600px] mx-auto px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

              {/* 1. At the Station */}
              <div className="group rounded-[28px] p-8 md:p-10 lg:p-12 transition-all hover:-translate-y-1.5 flex flex-col items-start bg-[#f7f4f1] hover:shadow-[0_12px_32px_rgba(224,90,43,0.12)]">
                <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-[#fdf0eb]">
                  <svg className="h-8 w-8 md:h-10 md:w-10 text-[#e05a2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                <p className="mt-8 text-[12px] md:text-[14px] font-extrabold uppercase tracking-[0.2em] text-[#e05a2b]">
                  At the Station
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#2d3580]">
                  Community Connection
                </h3>
                <p className="mt-5 text-base md:text-lg lg:text-[19px] leading-relaxed flex-1 text-[#666666]">
                  Refreshments and a comfortable place to sit, pause, and reconnect with loved ones in a welcoming station space.
                </p>
                <a href="/contact" className="mt-10 inline-flex items-center gap-2 text-base md:text-lg font-extrabold text-[#e05a2b] hover:gap-3 transition-all">
                  Come Visit Us at the Station
                  <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* 2. Logistics */}
              <div className="group rounded-[28px] p-8 md:p-10 lg:p-12 transition-all hover:-translate-y-1.5 flex flex-col items-start bg-[#f7f4f1] hover:shadow-[0_12px_32px_rgba(224,90,43,0.12)]">
                <span className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-2xl bg-[#fdf0eb]">
                  <svg className="h-8 w-8 md:h-10 md:w-10 text-[#e05a2b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </span>
                <p className="mt-8 text-[12px] md:text-[14px] font-extrabold uppercase tracking-[0.2em] text-[#e05a2b]">
                  Logistics
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl lg:text-[34px] font-extrabold leading-tight text-[#2d3580]">
                  Seafarers Parcel Pickup Service
                </h3>
                <p className="mt-5 text-base md:text-lg lg:text-[19px] leading-relaxed flex-1 text-[#666666]">
                  Order essentials online and have them delivered securely to our station for pickup when you dock.
                </p>
                <a href="https://parcelservice.mtsc.ca/" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 text-base md:text-lg font-extrabold text-[#e05a2b] hover:gap-3 transition-all">
                  Send Your Parcel
                  <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </section>

        <Stats />

        {/* ----------------- LOCAL IN PRESENCE ----------------- */}
        <section className="bg-[#FDF0EC] py-20 md:py-28 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal className="order-2 md:order-1">

              <div className="flex mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                  <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                  Our Network
                </span>
              </div>

              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-5 leading-tight">
                Local In Presence.<br />Connected In Purpose.
              </h2>
              <p className="text-[18px] font-bold text-[#E05A2B] mb-6">
                Practical support for those in port and a community effort that ensures no seafarer is alone.
              </p>
              <div className="text-[#5A6C7D] text-[16px] leading-relaxed space-y-5">
                <p>Mission to Seafarers Canada provides national leadership, partnerships, fundraising support, and shared resources that help strengthen stations across the country. In Halifax, Mission to Seafarers Halifax serves as a welcoming place of care and connection for seafarers arriving at one of Canada’s busiest ports.</p>
                <p>At the Port of Halifax, that mission becomes personal.</p>
                <p>Here, seafarers can find a warm and welcoming space to rest, connect with loved ones, access practical support, receive transportation assistance, enjoy refreshments, participate in community activities, and know they are not alone while far from home.</p>
              </div>
            </Reveal>
            <Reveal className="order-1 md:order-2">
              <div className="rounded-[24px] overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-[#112A46]/10 z-10"></div>
                <img
                  src={volunteerImg}
                  alt="Volunteer and Seafarer Support"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- SUPPORTING SEAFARERS IN HALIFAX ----------------- */}
        <section className="bg-white py-20 md:py-28 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-7">
            <Reveal>
              <div className="text-center mb-12">
                <div className="flex justify-center mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                    <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                    Station Services
                  </span>
                </div>

                <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#2d3580] mb-5 leading-tight">
                  Supporting Seafarers in Halifax
                </h2>
                <p className="text-[18px] font-bold text-[#e05a2b] max-w-[800px] mx-auto mb-4">
                  As part of a 160+ year legacy, Seafarers visiting the Port of Halifax can access
                </p>
              </div>

              <div className="rounded-[24px] border border-[#e2e8f0] bg-[#f7f4f1] p-8 md:p-12 lg:p-16 text-center shadow-sm mb-12">
                <p className="text-[16px] md:text-[18px] font-bold uppercase tracking-widest text-[#2d3580] mb-12">
                  How We Care for Seafarers
                </p>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-[1200px] mx-auto">
                  {[
                    { i: Ship, t: "Friendly ship visits and hospitality" },
                    { i: MapPin, t: "Transportation and local guidance" },
                    { i: HomeIcon, t: "Access to a welcoming station space" },
                    { i: Wifi, t: "Wi-Fi & Communication Tools" },
                    { i: Users, t: "Refreshments and a comfortable place to sit, pause, and reconnect with loved ones" },
                    { i: HeartHandshake, t: "Emotional and spiritual support, if requested" },
                    { i: LifeBuoy, t: "Help during times of stress, isolation, or uncertainty" },
                    { i: Package, t: "Access to local services" },
                    { i: ShieldCheck, t: "Clothing bank" },
                  ].map(({ i: Icon, t }) => (
                    <div
                      key={t}
                      className="flex flex-col items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-white shadow-xl transition-transform hover:-translate-y-1.5 p-4 sm:p-6 md:p-8"
                    >
                      <Icon className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-[#2d3580] mb-3 sm:mb-4" strokeWidth={1.5} />
                      <span className="text-[13px] sm:text-[15px] md:text-[17px] font-extrabold text-[#e05a2b] leading-snug px-2 max-w-[90%] text-center">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center text-[#666666] text-[16px] leading-relaxed max-w-[800px] mx-auto mb-10">
                <p>As the Halifax Mission develops, it continues to take shape around what seafarers need during their time ashore. As the Halifax Mission grows, we are creating a space</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a href="/whoweare" className="inline-flex items-center gap-2 bg-[#e05a2b] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#c94d23] shadow-lg transition-all">
                  Learn More About Seafarer Support
                </a>
                <a href="https://parcelservice.mtsc.ca/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#2d3580] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#1c2e6b] shadow-lg transition-all">
                  Seafarers send a parcel to our address for pickup
                </a>
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
                  <div className="flex mb-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      A Small Service That Makes a Big Difference
                    </span>
                  </div>

                  <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-[#2d3580] leading-tight">
                    Clothing Bank
                  </h2>

                  <div className="mt-5 text-base md:text-lg text-[#666666] leading-relaxed space-y-5">
                    <p>After extended periods at sea, small things can feel significant.</p>
                    <p>At Mission to Seafarers Halifax, we maintain a small clothing bank where seafarers can access warm clothing and essential items, including jackets, gloves, hats, and other seasonal necessities while visiting the Port of Halifax.</p>
                    <p className="italic text-sm text-[#666666]">
                      Clothing support can be arranged in advance by seafarers, ship agents, or crew representatives. Availability is based on current inventory, volunteer capacity, and ship schedules.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href="/contact" className="inline-flex items-center justify-center bg-[#e05a2b] text-white px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#c94d23] shadow-lg transition-all">
                      Access Our Clothing Bank
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <a href="/contact" className="inline-flex items-center justify-center bg-transparent border-2 border-[#2d3580] text-[#2d3580] px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#2d3580] hover:text-white shadow-lg transition-all">
                      Contact the Halifax Mission
                    </a>
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

        {/* ----------------- WHY HALIFAX MATTERS ----------------- */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[900px] mx-auto px-7 text-center">
            <Reveal>
              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                  <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                  Our Impact
                </span>
              </div>

              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-5 leading-tight">
                Why Halifax Matters
              </h2>
              <p className="text-[18px] md:text-[20px] font-bold text-[#E05A2B] mb-8">
                Welcoming Seafarers at the Port of Halifax
              </p>
              <div className="text-[#5A6C7D] text-[17px] leading-relaxed space-y-5">
                <p>Halifax is one of Canada’s most important and historic ports, welcoming seafarers from around the world who help keep global trade and our communities moving every day. Many arrive with limited time ashore and few opportunities to rest, reconnect, or access support while in port.</p>
                <p>Mission to Seafarers Halifax ensures that, when they arrive here, they are met with dignity, compassion, and a welcoming place of care and connection.</p>
                <p>Mission to Seafarers Halifax operates locally, supported nationally, and connected globally through a network serving seafarers in more than 200 ports worldwide.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- GET INVOLVED ----------------- */}
        <section className="bg-[#FDF0EC] py-20 md:py-28 border-t border-[#E05A2B]/10">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="text-center mb-12">
                <div className="flex justify-center mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                    <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                    Support Us
                  </span>
                </div>

                <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-5 leading-tight">
                  Get Involved
                </h2>
                <p className="text-[18px] md:text-[20px] font-bold text-[#E05A2B] mb-4">
                  Help Us Welcome Seafarers to Halifax
                </p>
                <p className="text-[#5A6C7D] text-[17px] max-w-[800px] mx-auto">
                  There are many ways to support the Halifax Mission and the seafarers we serve.
                </p>
              </div>

              <div className="bg-white p-8 md:p-14 rounded-[32px] shadow-xl max-w-[900px] mx-auto mb-10 border-t-[6px] border-[#E05A2B]">
                <h3 className="text-[22px] font-black text-[#112A46] mb-6">You can:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  {[
                    "Volunteer at the station or during local events",
                    "Donate snacks, refreshments, gift cards, or supplies",
                    "Support haircut and wellness services for seafarers",
                    "Help furnish and create a welcoming station space",
                    "Support a local project or event",
                    "Become a community or business partner"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#E05A2B] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-[#5A6C7D] font-medium leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#FDF0EC]/80 p-6 rounded-2xl border border-[#E05A2B]/20 mb-10">
                  <p className="text-[#112A46] font-semibold text-[15px] italic text-center">
                    For major donations, national sponsorships, monthly giving, and larger corporate partnerships, please connect with Mission to Seafarers Canada.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/contact" className="inline-flex cursor-pointer justify-center bg-[#E05A2B] text-white px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#c94d23] shadow-md transition-all">
                    Volunteer Locally
                  </a>
                  <button
                    onClick={() => setIsDonateModalOpen(true)}
                    className="inline-flex justify-center cursor-pointer bg-[#112A46] text-white px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#0d1f35] shadow-md transition-all"
                  >
                    Support the Halifax Mission
                  </button>
                  <a
                    href="https://mtsc.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer justify-center bg-transparent border-2 border-[#112A46] text-[#112A46] px-7 py-3 rounded-full font-bold text-[14px] hover:bg-[#112A46] hover:text-white shadow-md transition-all"
                  >
                    Explore National Partnerships
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

              {/* Header Area */}
              <div className="text-center max-w-[800px] mx-auto mb-14">
                <div className="flex justify-center mb-5">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                    <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                    Help Care for Seafarers
                  </span>
                </div>
                <h2 className="text-[clamp(36px,5vw,56px)] font-black text-[#2d3580] mb-6 leading-tight">
                  Donate
                </h2>
                <p className="text-[#666666] text-[18px] md:text-[20px] leading-relaxed mb-6">
                  Every gift helps us provide hospitality, transportation, Wi-Fi, refreshments, haircuts, and a welcoming place for seafarers visiting Halifax.
                </p>
                <p className="text-[#2d3580] font-extrabold text-[18px] md:text-[20px]">
                  You can choose to:
                </p>
              </div>

              {/* Two-Card Grid */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">

                {/* Card 1: Monthly (Toronto Style: bg-gradient-coral text-white) */}
                <div className="rounded-[32px] bg-gradient-to-br from-[#e05a2b] to-[#c94d23] text-white p-8 md:p-10 lg:p-12 shadow-[0_12px_32px_rgba(224,90,43,0.25)] flex flex-col">
                  <svg className="h-10 w-10 text-white mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-[12px] font-extrabold uppercase tracking-widest text-white/85 mb-2">Recurring Giving</p>
                  <h3 className="text-3xl cursor-pointer md:text-4xl font-black text-white leading-tight mb-4">
                    Become a monthly donor
                  </h3>
                  <p className="text-white/90 text-[16px] md:text-[18px] leading-relaxed mb-8 flex-1">
                    Support Mission to Seafarers Halifax  through Mission to Seafarers Canada
                  </p>
                  <button
                    onClick={() => setIsDonateModalOpen(true)}
                    className="w-full bg-white cursor-pointer text-[#e05a2b] hover:bg-white/90 font-bold h-14 rounded-xl flex items-center justify-center transition-colors text-[16px]"
                  >
                    Become a Monthly Donor
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>

                {/* Card 2: One-Time (Toronto Style: bg-warm-gray border-navy) */}
                <div className="rounded-[32px] bg-[#f7f4f1] border-2 border-[#2d3580]/10 p-8 md:p-10 lg:p-12 flex flex-col">
                  <svg className="h-10 w-10 text-[#e05a2b] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-[12px] font-extrabold uppercase tracking-widest text-[#e05a2b] mb-2">One-Time Gift</p>
                  <h3 className="text-3xl md:text-4xl font-black text-[#2d3580] leading-tight mb-4">
                    Make a one-time gift
                  </h3>
                  <p className="text-[#666666] text-[16px] md:text-[18px] leading-relaxed mb-8 flex-1">
                    Support Mission to Seafarers Halifax  through Mission to Seafarers Canada
                  </p>
                  <button
                    onClick={() => setIsDonateModalOpen(true)}
                    className="w-full bg-[#2d3580] cursor-pointer hover:bg-[#1c2e6b] text-white font-bold h-14 rounded-xl flex items-center justify-center transition-colors text-[16px] mb-6"
                  >
                    Make a One-Time Gift
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <p className="text-sm text-[#666666] cursor-pointer italic text-center">
                    Every donation made through this page directly supports Mission to Seafarers Halifax, helping us provide care, practical assistance, and a welcoming community for seafarers visiting the Port of Halifax.
                  </p>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- LATEST FROM HALIFAX (Now Uses featuredEvents) ----------------- */}
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
                        <h3 className="text-lg font-extrabold text-[#2d3580] leading-snug group-hover:text-[#e05a2b] transition-colors">
                          {n.title}
                        </h3>
                        <p className="mt-3 text-sm text-[#666666] leading-relaxed line-clamp-3">
                          {extractText(n.content, n.overview)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-[#666666] font-medium">More events and updates coming soon. Please check back later!</p>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28 pt-10 bg-white relative">
          <div className="max-w-[1400px] mx-auto px-7">
            <Reveal>
              {/* Header and Controls */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <div className="flex mb-4">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                      <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                      Station Life
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d3580] leading-tight">
                    Moments from Halifax
                  </h2>
                </div>

                {/* Slider Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scrollGallery('left')}
                    className="h-12 w-12 rounded-full border-2 cursor-pointer border-[#2d3580]/10 cursor-pointer flex items-center justify-center text-[#2d3580] hover:bg-[#2d3580] hover:text-white transition-all shadow-sm focus:outline-none"
                    aria-label="Scroll left"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollGallery('right')}
                    className="h-12 w-12 rounded-full border-2 cursor-pointer border-[#2d3580]/10 cursor-pointer flex items-center justify-center text-[#2d3580] hover:bg-[#2d3580] hover:text-white transition-all shadow-sm focus:outline-none"
                    aria-label="Scroll right"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollbar hide fix */}
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

              {/* Slider Container */}
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

        {/* ----------------- COMPREHENSIVE SUPPORT DETAILS ----------------- */}
        <section className="bg-white py-20 md:py-28 border-y border-gray-100">
          <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Column 1 */}
            <Reveal>
              <div className="flex mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                  <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                  Our Services
                </span>
              </div>

              <h2 className="text-[clamp(26px,3vw,34px)] font-black text-[#112A46] mb-6 leading-tight">
                How We Support Seafarers in Halifax
              </h2>
              <p className="text-[#5A6C7D] text-[16px] mb-8 font-medium">
                Mission to Seafarers Halifax offers practical, emotional, and spiritual support to seafarers visiting the Port of Halifax, including:
              </p>
              <ul className="space-y-5">
                {[
                  "Friendly ship visits across Halifax Harbour",
                  "Transportation and local guidance while in port",
                  "Wi-Fi and communication support to reconnect with loved ones",
                  "Refreshments and a welcoming place to rest between voyages",
                  "Emotional and spiritual support, when requested",
                  "Support during times of stress, isolation, or uncertainty",
                  "Access to local services, seasonal clothing, and community resources",
                  "Seafarers Parcel Pickup Service",
                  "Hospitality and care through volunteers and local partnerships",
                  "Recreational amenities including bikes, billiards, darts, and basketball"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#112A46] font-semibold text-[15px]">
                    <svg className="w-6 h-6 text-[#E05A2B] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Column 2 */}
            <Reveal delay={100}>
              <div className="flex mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                  <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                  The Station Space
                </span>
              </div>

              <h2 className="text-[clamp(26px,3vw,34px)] font-black text-[#112A46] mb-6 leading-tight">
                A Place to Rest Along the Atlantic Gateway
              </h2>
              <p className="text-[#5A6C7D] text-[16px] mb-8 font-medium">
                The Halifax Mission continues to grow as a welcoming and peaceful place where seafarers can:
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  "Sit and rest while ashore",
                  "Access communication tools and internet",
                  "Spend time away from the vessel",
                  "Connect with volunteers and local community members",
                  "Experience hospitality rooted in Halifax’s maritime tradition",
                  "Find a moment of calm along one of Canada’s busiest Atlantic gateways"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#112A46] font-semibold text-[15px]">
                    <svg className="w-6 h-6 text-[#E05A2B] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[#FDF0EC] p-6 rounded-2xl border-l-[6px] border-[#E05A2B]">
                <p className="text-[#112A46] font-bold text-[15px] italic leading-relaxed">
                  As the station continues to grow, services and programming will expand to better support the needs of seafarers visiting Halifax from around the world.
                </p>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ----------------- A HARBOUR OF WELCOME ----------------- */}
        <section className="py-20 md:py-32 bg-[#fdf0eb]/50 border-y border-gray-200">
          <div className="max-w-[1000px] mx-auto px-7 text-center">
            <Reveal>
              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                  <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                  Our Mission
                </span>
              </div>

              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#2d3580] mb-5 leading-tight">
                A Harbour of Welcome on Canada’s East Coast
              </h2>
              <p className="text-[18px] md:text-[22px] font-bold text-[#e05a2b] mb-10">
                Support Halifax. Strengthen Canada’s Seafarer Network. Care Across the World.
              </p>

              <div className="text-[#666666] text-[17px] leading-relaxed space-y-6 mb-12 max-w-[850px] mx-auto">
                <p>Rooted in one of Canada’s most historic and active ports, Mission to Seafarers Halifax serves as a place of care, connection, and hospitality for seafarers arriving on the Atlantic coast.</p>
                <p>Local volunteers, churches, maritime partners, and community supporters help sustain the work happening here in Halifax, while national partnerships and donations strengthen Mission to Seafarers Canada’s growing network across the country.</p>
                <p>Whether you volunteer, donate, provide services, or partner with us, you are helping create a welcoming harbour for seafarers far from home and supporting a mission connected to ports around the world.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-5">
                <a href="/contact" className="inline-flex justify-center items-center bg-transparent border-2 border-[#2d3580] text-[#2d3580] px-9 py-4 rounded-full font-bold text-[14px] hover:bg-[#2d3580] hover:text-white shadow-sm transition-all">
                  Contact the Halifax Mission
                </a>
                <button
                  onClick={() => setIsDonateModalOpen(true)}
                  className="inline-flex justify-center cursor-pointer items-center bg-[#e05a2b] text-white px-9 py-4 rounded-full font-bold text-[14px] hover:bg-[#c94d23] shadow-lg transition-all"
                >
                  Donate Through Mission to Seafarers Canada
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------- COMMUNITY (Grey Cards Block) ----------------- */}
        <section className="bg-warm-gray py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e05a2b]">
                  <span className="block h-[1px] w-8 bg-[#e05a2b]"></span>
                  Community
                </span>
              </div>

              <h2 className="text-[34px] font-black text-navy text-center mb-10">Join or Host an Event for Us</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    image: prayerWallImg,
                    title: 'Prayer Wall',
                    desc: "Share a prayer, read messages, and find strength and connection.",
                    link: '/prayer'
                  },
                  {
                    image: happySeaImg,
                    brand: 'Happy@Sea',
                    title: 'Get 24/7 Help',
                    desc: "Chat 24/7, book rides, get essentials, explore well-being resources.",
                    accent: true,
                    link: '/contact'
                  },
                  {
                    image: newsletterImg,
                    title: 'Newsletter',
                    desc: "Get local port news, seafarer support, and more.",
                    link: '/publication'
                  },
                  {
                    image: eventCalendarImg,
                    title: 'Join or Host an Event for Us',
                    desc: "Honour a loved one by creating a fundraising page.",
                    link: '/events'
                  }
                ].map((card, i) => (
                  <a
                    key={i}
                    href={card.link}
                    className={`block cursor-pointer no-underline rounded-[18px] p-7 text-center transition-all hover:-translate-y-1.5 border-2 flex flex-col items-center justify-start ${card.accent ? 'bg-navy border-navy shadow-lg' : 'bg-white border-transparent shadow-card hover:shadow-card-hover hover:border-coral/20'}`}
                  >
                    {card.brand ? (
                      <div className="text-[13px] font-extrabold text-teal mb-3 flex flex-col items-center justify-center gap-1.5 w-full">
                        <img src={card.image} alt={card.brand} className="h-10 w-auto object-contain" />
                        <span>{card.brand}</span>
                      </div>
                    ) : (
                      <img src={card.image} alt={card.title} className="h-10 w-auto object-contain mx-auto mb-3" />
                    )}
                    <h3 className={`text-[15px] font-extrabold mb-2 ${card.accent ? 'text-white' : 'text-navy'}`}>{card.title}</h3>
                    <p className={`text-[12.5px] leading-relaxed ${card.accent ? 'text-white/80' : 'text-text-mid'}`}>{card.desc}</p>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />

      {/* --- DONATION MODAL POPUP --- */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#112A46]/80 backdrop-blur-sm transition-opacity">

          {/* Modal Container */}
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl relative max-h-[95vh] flex flex-col overflow-hidden animate-fade-in-up">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 md:px-8 border-b border-gray-100 bg-white z-10">
              <h3 className="text-2xl font-black text-[#112A46] flex items-center gap-3">
                <svg className="w-6 h-6 text-[#E05A2B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Secure Donation
              </h3>
              <button
                onClick={() => setIsDonateModalOpen(false)}
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-500 hover:text-gray-800 p-3 rounded-full transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Iframe Content */}
            <div className="flex-grow overflow-y-auto w-full bg-gray-50 p-4 md:p-8 flex justify-center">
              <iframe
                src="https://www.canadahelps.org/en/dn/42880"
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