import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Reveal from '../components/common/Reveal';

// Import local images for the "Join Our Community" section
import findPortImg from '../assets/img/footer-find-port_1.png';
import prayerWallImg from '../assets/img/footer-prayer-wall.png';
import happySeaImg from '../assets/img/footer-happy-sea.png';
import newsletterImg from '../assets/img/footer-newsletter.png';
import eventCalendarImg from '../assets/img/footer-event-calendar.png';
import volunteerImg from '../assets/Volunteer.jpeg';
// Import local SVGs for "How We Support the World's Seafarers in Canada" section
import practicalSupportIcon from '../assets/img/Seafarers/practical-support_1.svg';
import mentalEmotionalIcon from '../assets/img/Seafarers/mental-emotional-help.svg';
import spiritualCareIcon from '../assets/img/Seafarers/spiritual-care.svg';
import advocacyRightsIcon from '../assets/img/Seafarers/advocacy-rights.svg';
import communityConnectionIcon from '../assets/img/Seafarers/community-connection.svg';

// Import local SVGs for "Ways to Get Involved" section
// import iconGiveNow from '../assets/img/Donate/icon-give-now.svg'; // Commented out since Give Now is removed
import iconApplyVolunteer from '../assets/img/Donate/icon-apply-volunteer.svg';
import iconSubscribeNews from '../assets/img/Donate/icon-subscribe-news.svg';
import findPortBgIcon from '../assets/img/Donate/find-port-bg.svg';

// Import local image for "Find a Station" section
import operatingShipsImg from '../assets/img/Seafarers/infgrph-operating-ships.png';

// --- NEW PARTNER PORT LOGOS FOR CAROUSEL ---
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

export default function Home() {
  // Array of imported port logos for the carousel
  const partnerLogos = [
    portSydney, portGCT, portHopa, portHelm, portOntario,
    portPrinceRupert, portRobertAllan, portTK, portNamma,
    portToronto, portDpWorld
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />



        {/* Split CTA Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[460px]">
          <Reveal className="relative overflow-hidden flex group cursor-pointer">
            <img src="https://www.missiontoseafarers.org/wp-content/uploads/2020-03-24-14.56.59-1-2400x1800.jpg" alt="Seafarer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="relative z-10 p-12 md:p-14 flex flex-col justify-end w-full bg-gradient-to-t from-white/95 via-white/80 to-transparent">
              <p className="text-[15px] font-semibold text-text-mid mb-1">I am a</p>
              <h2 className="text-[40px] font-black text-coral mb-3 leading-none">Seafarer,</h2>
              <p className="text-[17px] font-semibold text-navy max-w-[280px] mb-6 leading-tight">how do I find a port.. or just a helping hand?</p>
              <a href="/contact" className="bg-coral text-white self-start px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-coral-light shadow-warm transition-all">FIND RESOURCES</a>
            </div>
          </Reveal>
          <Reveal className="relative overflow-hidden flex group cursor-pointer">
            <img
              src={volunteerImg}
              alt="Volunteer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="relative z-10 p-12 md:p-14 flex flex-col justify-end items-end text-right w-full bg-gradient-to-t from-navy-dark/40 via-navy-dark/40 to-transparent">
              <p className="text-[15px] font-semibold text-white/70 mb-1">I am a</p>
              <h2 className="text-[40px] font-black text-white mb-3 leading-none">Volunteer,</h2>
              <p className="text-[17px] font-semibold text-white/90 max-w-[280px] mb-6 leading-tight">how do I donate, volunteer, or get involved?</p>
              <a href="/volunteer" className="bg-white text-navy self-end px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-warm-gray transition-colors">GET INVOLVED</a>
            </div>
          </Reveal>
        </section>

        {/* Mission Tagline */}
        <div className="bg-white py-10 border-b border-[#E05A2B]/10">
          <div className="max-w-[1200px] mx-auto px-7 text-center">
            <h2 className="text-[clamp(28px,4vw,44px)] font-black text-[#112A46] mb-3.5 leading-tight">
              How We Support the World's Seafarers in Canada
            </h2>
            <p className="text-[#5A6C7D] text-base max-w-[560px] mx-auto leading-relaxed">
              Ships arrive into Halifax daily carrying crews who may spend months at sea before briefly stepping into the city. As part of a 160+ year legacy,
              we offer them practical, emotional, and spiritual support, ensuring no seafarer is alone.
            </p>
          </div>
        </div>

        {/* Homepage Service Highlights */}
        <section className="bg-[#FDF0EC] py-16">
          <div className="max-w-[1200px] mx-auto px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* 1. At the Station – Community Connection */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#E05A2B]/20">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-extrabold text-[#112A46] mb-2">
                      At the Station – Community Connection
                    </h3>
                  </div>
                </div>
                <p className="text-[15px] text-[#5A6C7D] leading-relaxed mb-6">
                  Refreshments and a comfortable place to sit, pause, and reconnect with loved ones in a welcoming station space.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#E05A2B] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#c94d23] transition-all shadow-md hover:shadow-lg"
                >
                  Come Visit Us at the Station
                </a>
              </div>

              {/* 2. Logistics – Seafarers Parcel Pickup Service */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#E05A2B]/20">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-extrabold text-[#112A46] mb-2">
                      Logistics – Seafarers Parcel Pickup Service
                    </h3>
                  </div>
                </div>
                <p className="text-[15px] text-[#5A6C7D] leading-relaxed mb-6">
                  Order essentials online and have them delivered securely to our station for pickup when you dock.
                </p>
                <a
                  href="https://parcelservice.mtsc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#112A46] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#0d1f35] transition-all shadow-md hover:shadow-lg"
                >
                  Send Your Parcel
                </a>
              </div>

            </div>
          </div>
        </section>

        <Stats />

        {/* How We Care for Seafarers */}
        <section className="relative py-20 bg-gradient-to-b from-white to-[#FDF0EC]">
          <div className="max-w-[1200px] mx-auto px-7">
            <div className="text-center mb-14">
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4 leading-tight">
                How We Care for Seafarers
              </h2>
              <p className="text-[#5A6C7D] text-base max-w-[600px] mx-auto leading-relaxed">
                For many seafarers arriving in Halifax, a ride into the city, access to Wi-Fi, or a call home becomes part of a very short window ashore.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {/* Practical Support */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Practical Support</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Essential services and assistance for daily needs</p>
              </div>

              {/* Mental & Emotional Health */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Mental & Emotional Health</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Professional care and crisis support</p>
              </div>

              {/* Spiritual Care */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Spiritual Care</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Open to all faiths and beliefs</p>
              </div>

              {/* Advocacy & Rights */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Advocacy & Rights</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Protecting seafarer rights and welfare</p>
              </div>

              {/* Community Connection */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Community Connection</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Building belonging at ports</p>
              </div>

              {/* Clothing Support */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Clothing Support</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Essential clothing and supplies</p>
              </div>

              {/* Ship Visits */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Ship Visits</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Personal visits and onboard support</p>
              </div>

              {/* Seafarers Parcel Pickup Service */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Parcel Pickup Service</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Secure delivery and pickup</p>
              </div>

              {/* Transportation & Local Guidance */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Transportation & Guidance</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Local transport and navigation help</p>
              </div>

              {/* Wi-Fi & Communication Tools */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Wi-Fi & Communication</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Stay connected with loved ones</p>
              </div>

              {/* Refreshments & Hospitality */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-[#E05A2B]/10">
                <div className="w-12 h-12 bg-[#E05A2B]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#E05A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-[17px] font-extrabold text-[#112A46] mb-2">Refreshments & Hospitality</h3>
                <p className="text-[13px] text-[#5A6C7D] leading-relaxed">Warm meals and welcoming space</p>
              </div>

            </div>
          </div>
        </section>

        {/* Sponsor Logos Floating Banner */}
        <section className="bg-white py-12 border-b border-navy/10 overflow-hidden relative">
          <div className="max-w-[1200px] mx-auto px-7 mb-8">
            <h3 className="text-center text-[13px] font-extrabold text-text-mid tracking-[0.15em] uppercase">
              Our Proud Sponsors & Partners
            </h3>
          </div>

          <div className="w-full relative">
            <style>
              {`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                  display: flex;
                  width: fit-content;
                  animation: scroll 35s linear infinite;
                }
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            <div className="animate-scroll items-center gap-16 md:gap-24 px-8">
              {/* Duplicated array to create a seamless infinite loop */}
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Sponsor Logo ${index}`}
                  className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              ))}
            </div>
            {/* White gradient fades on left and right for seamless entrance/exit */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </section>

        {/* Ways to Get Involved */}
        <section className="bg-[#E05A2B] py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <div className="text-center mb-12">
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-white leading-none mb-4">Ways to Get Involved</h2>
              <p className="text-white/90 text-base max-w-[600px] mx-auto">Join us in supporting seafarers arriving in Halifax</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Join Our Events */}
              <a href="/events" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Join Our Events</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Attend community gatherings and fundraisers</p>
              </a>

              {/* Volunteer With Us */}
              <a href="/contact" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Volunteer With Us</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Make a difference in seafarers' lives</p>
              </a>

              {/* Support Our Mission */}
              <a href="/donate" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Support Our Mission</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Donate to help seafarers in need</p>
              </a>

              {/* Subscribe to Newsletter */}
              <a href="/publication" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Subscribe to Newsletter</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Stay updated with our latest news</p>
              </a>

              {/* Write a Prayer */}
              <a href="/prayer" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Write a Prayer</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Share your prayers on our wall</p>
              </a>

              {/* Join an Event */}
              <a href="/events" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Join an Event</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Participate in our activities</p>
              </a>

              {/* Host a Fundraiser */}
              <a href="https://www.missiontoseafarers.org/get-involved/fundraise" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Host a Fundraiser</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Create your own fundraising page</p>
              </a>

              {/* Connect With Us */}
              <a href="/contact" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-2 border-2 border-white/20 hover:border-white group">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-extrabold text-white mb-2">Connect With Us</h3>
                <p className="text-[13px] text-white/80 leading-relaxed">Get in touch with our team</p>
              </a>

            </div>
          </div>
        </section>

        {/* Community */}
        <section className="bg-warm-gray py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
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
                    title: 'Join or Host an Event for Us', // <--- Changed this title here
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
    </div>
  );
}