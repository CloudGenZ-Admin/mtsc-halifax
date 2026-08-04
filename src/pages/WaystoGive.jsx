import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaHeart, FaBuilding, FaBullhorn, FaHandshake, FaAnchor, FaShip, FaStar, FaGift, FaUsers, FaDollarSign
} from 'react-icons/fa';

import { useMtscWaysToGiveLive } from '../hooks/usePayloadLive';
import { getMediaUrl } from '../services/payloadApi';

// Import newly created forms
import {
  Modal,
  PartnershipForm,
  VolunteerForm,
  WorkplaceForm
} from '../components/forms/WaysToGiveForms';

// CanadaHelps Embedded Widget Component
const CanadaHelpsWidget = ({ pageId, formType }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.id = 'ch_cdn_embed';
      script.type = 'text/javascript';
      script.src = 'https://www.canadahelps.org/secure/js/cdf_embed.2.js';
      script.charset = 'utf-8';
      script.setAttribute('data-language', 'en');
      script.setAttribute('data-page-id', pageId);
      script.setAttribute('data-root-url', 'https://www.canadahelps.org');
      script.setAttribute('data-formtype', formType);
      script.setAttribute('data-cfasync', 'false');

      containerRef.current.appendChild(script);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [pageId, formType]);

  return <div ref={containerRef} className="w-full min-h-[600px]"></div>;
};

import LoadingSpinner from '../components/common/LoadingSpinner';

export default function WaystoGive() {
  const { data, isLoading } = useMtscWaysToGiveLive();
  const [activeForm, setActiveForm] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedEventUrl, setSelectedEventUrl] = useState('');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const donationSectionRef = useRef(null);

  // Dynamic Media URLs from CMS (Zero hardcoded image fallbacks)
  const heroBgImageUrl = getMediaUrl(data?.hero_bg_image, null);
  const ctaBgImageUrl = getMediaUrl(data?.cta_bg_image, null);

  // Resolved Events List from CMS (Zero hardcoded text arrays)
  const activeEvents = (Array.isArray(data?.events_list) && data.events_list.length > 0)
    ? data.events_list.map(e => ({ name: e.event_name || "", url: e.event_url || "" }))
    : [];

  useEffect(() => {
    if (activeEvents.length > 0 && !selectedEventUrl) {
      setSelectedEventUrl(activeEvents[0].url);
    }
  }, [activeEvents, selectedEventUrl]);

  const handleScrollToDonate = () => {
    setActiveForm(null);
    donationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your form has been successfully submitted.");
    setActiveModal(null);
  };

  // Resolved Partner Logos Array from CMS
  const activeLogos = (Array.isArray(data?.partner_logos) && data.partner_logos.length > 0)
    ? data.partner_logos.map(l => getMediaUrl(l?.logo || l, null)).filter(Boolean)
    : [];

  const halfIdx = Math.ceil(activeLogos.length / 2);
  const generalLogos = activeLogos.slice(0, halfIdx);
  const starLogos = activeLogos.slice(halfIdx);

  // Resolved Star Club Member Names Array from CMS
  const activeStarNames = (Array.isArray(data?.star_club_members) && data.star_club_members.length > 0)
    ? data.star_club_members.map(m => m.member_name || m).filter(Boolean)
    : [];

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* --- INJECT ALL ANIMATION STYLES --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        /* New Icon Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(224, 90, 43, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(224, 90, 43, 0); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.2); }
          30% { transform: scale(1); }
          45% { transform: scale(1.2); }
          60% { transform: scale(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }

        .animate-marquee { animation: marquee 150s linear infinite; width: max-content; }
        .animate-marquee-reverse { animation: marquee-reverse 120s linear infinite; width: max-content; }
        .animate-marquee:hover, .animate-marquee-reverse:hover { animation-play-state: paused; }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float 4s ease-in-out 2s infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s infinite; }
        .animate-heartbeat { animation: heartbeat 2.5s infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-sway { animation: sway 3.5s ease-in-out infinite; }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- MODALS --- */}
      <Modal
        isOpen={activeModal === 'sponsorship'}
        onClose={() => setActiveModal(null)}
        title="Partner Through Sponsorship"
      >
        <CanadaHelpsWidget pageId="146457" formType="0" />
      </Modal>

      <Modal
        isOpen={activeModal === 'workplace'}
        onClose={() => setActiveModal(null)}
        title="Workplace Engagement"
      >
        <WorkplaceForm onSubmit={handleFormSubmit} />
      </Modal>

      <Modal
        isOpen={activeModal === 'volunteer'}
        onClose={() => setActiveModal(null)}
        title="Volunteer & Advocacy"
      >
        <VolunteerForm onSubmit={handleFormSubmit} />
      </Modal>

      <Modal
        isOpen={activeModal === 'partnership'}
        onClose={() => setActiveModal(null)}
        title="Partnership Inquiry"
      >
        <PartnershipForm onSubmit={handleFormSubmit} />
      </Modal>

      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title="Purchase Event Tickets"
      >
        <div className="w-full h-[500px] overflow-hidden rounded-xl">
          <iframe
            src={selectedEventUrl}
            title="Event Tickets"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </Modal>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-[#112A46]">
          {heroBgImageUrl && (
            <div className="absolute inset-0 z-0">
              <img
                src={heroBgImageUrl}
                alt="Port of Halifax"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A7B]/45 via-[#2D5A7B]/55"></div>
            </div>
          )}

          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
            {data?.hero_eyebrow && (
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-white/30">
                {data.hero_eyebrow}
              </span>
            )}
            {data?.hero_title && (
              <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-lg">
                {data.hero_title_coral ? (
                  <>{data.hero_title} <span className="text-coral">{data.hero_title_coral}</span></>
                ) : data.hero_title}
              </h1>
            )}
            {data?.hero_subtitle && (
              <p className="text-white/90 text-[18px] max-w-3xl mx-auto leading-relaxed">
                {data.hero_subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Donation Section */}
        <section ref={donationSectionRef} className="py-24 bg-white scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-7">

            {(data?.donate_title || data?.donate_subtitle) && (
              <Reveal className="text-center mb-16">
                {data?.donate_eyebrow && (
                  <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                    <FaDollarSign className="inline mr-1" /> {data.donate_eyebrow}
                  </span>
                )}
                {data?.donate_title && (
                  <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">
                    {data.donate_title}
                  </h2>
                )}
                {data?.donate_subtitle && (
                  <p className="text-[#5A6C7D] text-[17px] max-w-2xl mx-auto leading-relaxed">
                    {data.donate_subtitle}
                  </p>
                )}
              </Reveal>
            )}

            {!activeForm ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full mx-auto">
                
                {/* Monthly Giving Box */}
                {(data?.monthly_title || data?.monthly_desc) && (
                  <Reveal>
                    <div className="bg-white rounded-3xl shadow-xl border border-[#112A46]/5 hover:shadow-2xl transition-all h-full flex flex-col overflow-hidden group">
                      <div className="h-44 w-full bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] flex items-center justify-center shrink-0 border-b border-[#112A46]/5 relative overflow-hidden">
                        <FaHeart className="absolute -left-4 -bottom-4 text-[120px] text-[#E05A2B]/5" />
                        <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center animate-heartbeat">
                          <FaHeart className="text-[#E05A2B] text-4xl" />
                        </div>
                      </div>

                      <div className="p-8 md:p-10 flex flex-col flex-grow">
                        {data?.monthly_title && <h3 className="text-[24px] font-black text-[#112A46] mb-4 text-center">{data.monthly_title}</h3>}
                        {data?.monthly_desc && <p className="text-[#5A6C7D] text-[15px] leading-relaxed mb-6 text-center">{data.monthly_desc}</p>}

                        <div className="space-y-3 mb-8 flex-grow">
                          {data?.monthly_tier_1 && (
                            <div className="flex items-start gap-3 bg-[#F8FBFD] rounded-xl p-4 border border-[#112A46]/5">
                              <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[#E05A2B] text-xs font-black">$15</span>
                              </div>
                              <span className="text-[#112A46] text-[13px] font-medium">{data.monthly_tier_1}</span>
                            </div>
                          )}
                          {data?.monthly_tier_2 && (
                            <div className="flex items-start gap-3 bg-[#F8FBFD] rounded-xl p-4 border border-[#112A46]/5">
                              <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[#E05A2B] text-xs font-black">$25</span>
                              </div>
                              <span className="text-[#112A46] text-[13px] font-medium">{data.monthly_tier_2}</span>
                            </div>
                          )}
                          {data?.monthly_tier_3 && (
                            <div className="flex items-start gap-3 bg-[#F8FBFD] rounded-xl p-4 border border-[#112A46]/5">
                              <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[#E05A2B] text-xs font-black">$50</span>
                              </div>
                              <span className="text-[#112A46] text-[13px] font-medium">{data.monthly_tier_3}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => setActiveForm('monthly')}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#112A46] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#1a3a5f] transition-all shadow-lg hover:shadow-xl w-full"
                        >
                          {data?.monthly_btn_text || "Become a Monthly Donor"}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* One-Time Gift Box */}
                {(data?.onetime_title || data?.onetime_desc) && (
                  <Reveal delay={100}>
                    <div className="bg-white rounded-3xl shadow-xl border border-[#E05A2B]/10 hover:shadow-2xl transition-all h-full flex flex-col overflow-hidden group">
                      <div className="h-44 w-full bg-gradient-to-br from-[#FDF0EC] to-[#FCE8E2] flex items-center justify-center shrink-0 border-b border-[#E05A2B]/10 relative overflow-hidden">
                        <FaGift className="absolute -right-4 -bottom-4 text-[120px] text-[#E05A2B]/5" />
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse-glow">
                          <FaGift className="text-[#E05A2B] text-4xl" />
                        </div>
                      </div>

                      <div className="p-8 md:p-10 flex flex-col flex-grow">
                        {data?.onetime_title && <h3 className="text-[24px] font-black text-[#112A46] mb-4 text-center">{data.onetime_title}</h3>}
                        {data?.onetime_desc && <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-8 flex-grow text-center">{data.onetime_desc}</p>}

                        <button
                          onClick={() => setActiveForm('onetime')}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl w-full mt-auto"
                        >
                          {data?.onetime_btn_text || "Make a One-Time Gift"}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Events & Tickets Box */}
                {(data?.events_title || activeEvents.length > 0) && (
                  <Reveal delay={200}>
                    <div id="tickets" className="bg-white rounded-3xl shadow-xl border border-[#112A46]/5 hover:shadow-2xl transition-all h-full flex flex-col overflow-hidden scroll-mt-32 group">
                      <div className="h-44 w-full bg-gradient-to-br from-[#EBF4F9] to-[#D5E6F0] flex items-center justify-center shrink-0 border-b border-[#112A46]/5 relative overflow-hidden">
                        <FaStar className="absolute -left-4 -top-4 text-[120px] text-[#112A46]/5" />
                        <div className="w-24 h-24 bg-[#112A46] rounded-full shadow-lg flex items-center justify-center animate-float">
                          <FaStar className="text-[#FFD700] text-4xl animate-spin-slow" />
                        </div>
                      </div>

                      <div className="p-8 md:p-10 flex flex-col flex-grow">
                        {data?.events_title && <h3 className="text-[24px] font-black text-[#112A46] mb-4 text-center">{data.events_title}</h3>}
                        {data?.events_desc && <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6 flex-grow text-center">{data.events_desc}</p>}

                        {activeEvents.length > 0 && (
                          <div className="mb-6">
                            <label className="block text-[#112A46] font-bold text-[14px] mb-2">Select Event:</label>
                            <select
                              value={selectedEventUrl}
                              onChange={(e) => setSelectedEventUrl(e.target.value)}
                              className="w-full bg-[#F8FBFD] border border-[#112A46]/20 rounded-xl px-4 py-3 text-[#112A46] font-medium focus:outline-none focus:border-[#E05A2B]"
                            >
                              {activeEvents.map((event, idx) => (
                                <option key={idx} value={event.url}>{event.name}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        <button
                          onClick={() => setIsEventModalOpen(true)}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl w-full"
                        >
                          {data?.events_btn_text || "Get Tickets"}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

              </div>
            ) : (
              <Reveal className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-[#112A46]/10">
                <button
                  onClick={() => setActiveForm(null)}
                  className="mb-8 flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[15px] hover:text-[#c94d23] hover:-translate-x-1 transition-all"
                >
                  ← Back to Donation Options
                </button>

                {activeForm === 'monthly' ? (
                  <CanadaHelpsWidget key="form-monthly" pageId="146457" formType="0" />
                ) : (
                  <CanadaHelpsWidget key="form-onetime" pageId="146457" formType="0" />
                )}
              </Reveal>
            )}

            {data?.donate_footer_text && (
              <Reveal delay={200}>
                <p className="text-center text-[#5A6C7D] text-[13px] mt-10 max-w-2xl mx-auto bg-[#F8FBFD] p-4 rounded-xl border border-[#112A46]/5 shadow-sm">
                  {data.donate_footer_text}
                </p>
              </Reveal>
            )}

          </div>
        </section>

        {/* Choose How You Would Like to Support */}
        {(data?.help_title || data?.sponsorship_title || data?.workplace_title) && (
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFD] via-[#EBF4F9] to-[#E0EEF7]"></div>
              <svg className="absolute bottom-0 left-0 w-full h-64 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#112A46" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
              </svg>
            </div>

            <div className="max-w-[1200px] mx-auto px-7 relative z-10">

              <Reveal className="text-center mb-16">
                {data?.help_eyebrow && (
                  <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                    {data.help_eyebrow}
                  </span>
                )}
                {data?.help_title && (
                  <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">
                    {data.help_title}
                  </h2>
                )}
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card 1: Sponsorship */}
                {data?.sponsorship_title && (
                  <Reveal>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full flex flex-col overflow-hidden group">
                      <div className="h-32 w-full bg-[#F8FBFD] group-hover:bg-[#E05A2B]/5 transition-colors flex items-center justify-center shrink-0 border-b border-[#112A46]/5">
                        <FaHandshake className="text-[#E05A2B] text-5xl animate-float group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-[20px] font-black text-[#112A46] mb-3">{data.sponsorship_title}</h3>
                        {Array.isArray(data?.sponsorship_items) && data.sponsorship_items.length > 0 && (
                          <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
                            {data.sponsorship_items.map((item, idx) => (
                              <li key={idx}>• {item.item_text || item}</li>
                            ))}
                          </ul>
                        )}
                        <button
                          onClick={() => setActiveModal('sponsorship')}
                          className="mt-auto inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors w-fit"
                        >
                          {data?.sponsorship_btn_text || "Sponsor Now →"}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Card 2: Workplace */}
                {data?.workplace_title && (
                  <Reveal delay={100}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full flex flex-col overflow-hidden group">
                      <div className="h-32 w-full bg-[#F8FBFD] group-hover:bg-[#E05A2B]/5 transition-colors flex items-center justify-center shrink-0 border-b border-[#112A46]/5">
                        <FaBuilding className="text-[#E05A2B] text-5xl animate-sway group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-[20px] font-black text-[#112A46] mb-3">{data.workplace_title}</h3>
                        {data?.workplace_desc && <p className="text-[#5A6C7D] text-[14px] mb-4">{data.workplace_desc}</p>}
                        {Array.isArray(data?.workplace_items) && data.workplace_items.length > 0 && (
                          <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
                            {data.workplace_items.map((item, idx) => (
                              <li key={idx}>
                                • {item.item_url ? (
                                    <a href={item.item_url} target="_blank" rel="noopener noreferrer" className="text-[#E05A2B] hover:underline">
                                      {item.item_text || item}
                                    </a>
                                  ) : (item.item_text || item)}
                              </li>
                            ))}
                          </ul>
                        )}
                        <button
                          onClick={() => setActiveModal('workplace')}
                          className="mt-auto inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors w-fit"
                        >
                          {data?.workplace_btn_text || "Get Your Team Involved →"}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Card 3: Awareness */}
                {data?.awareness_title && (
                  <Reveal delay={200}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full flex flex-col overflow-hidden group">
                      <div className="h-32 w-full bg-[#F8FBFD] group-hover:bg-[#E05A2B]/5 transition-colors flex items-center justify-center shrink-0 border-b border-[#112A46]/5">
                        <FaBullhorn className="text-[#E05A2B] text-5xl animate-pulse-glow rounded-full group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-[20px] font-black text-[#112A46] mb-3">{data.awareness_title}</h3>
                        {data?.awareness_desc && <p className="text-[#5A6C7D] text-[14px] mb-4">{data.awareness_desc}</p>}
                        {Array.isArray(data?.awareness_items) && data.awareness_items.length > 0 && (
                          <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
                            {data.awareness_items.map((item, idx) => (
                              <li key={idx}>• {item.item_text || item}</li>
                            ))}
                          </ul>
                        )}
                        {data?.awareness_btn_link && (
                          <a
                            href={data.awareness_btn_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors w-fit"
                          >
                            {data?.awareness_btn_text || "Start Fundraising →"}
                          </a>
                        )}
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Card 4: Volunteer */}
                {data?.volunteer_title && (
                  <Reveal>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full flex flex-col overflow-hidden group">
                      <div className="h-32 w-full bg-[#F8FBFD] group-hover:bg-[#E05A2B]/5 transition-colors flex items-center justify-center shrink-0 border-b border-[#112A46]/5">
                        <FaUsers className="text-[#E05A2B] text-5xl animate-float-delayed group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-[20px] font-black text-[#112A46] mb-3">{data.volunteer_title}</h3>
                        {data?.volunteer_desc && <p className="text-[#5A6C7D] text-[13px] mb-3">{data.volunteer_desc}</p>}
                        {Array.isArray(data?.volunteer_items) && data.volunteer_items.length > 0 && (
                          <ul className="space-y-1 mb-5 text-[#5A6C7D] text-[13px]">
                            {data.volunteer_items.map((item, idx) => (
                              <li key={idx}>• {item.item_text || item}</li>
                            ))}
                          </ul>
                        )}
                        <button
                          onClick={() => setActiveModal('volunteer')}
                          className="mt-auto inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors w-fit"
                        >
                          {data?.volunteer_btn_text || "Become a Volunteer →"}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Card 5: Customized Partnerships */}
                {data?.partnership_title && (
                  <Reveal delay={100}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full flex flex-col overflow-hidden group">
                      <div className="h-32 w-full bg-[#F8FBFD] group-hover:bg-[#E05A2B]/5 transition-colors flex items-center justify-center shrink-0 border-b border-[#112A46]/5">
                        <FaAnchor className="text-[#E05A2B] text-5xl animate-sway group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-[20px] font-black text-[#112A46] mb-3">{data.partnership_title}</h3>
                        {data?.partnership_desc && <p className="text-[#5A6C7D] text-[14px] mb-6">{data.partnership_desc}</p>}
                        <button
                          onClick={() => setActiveModal('partnership')}
                          className="mt-auto inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors w-fit"
                        >
                          {data?.partnership_btn_text || "Contact Us →"}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Card 6: In-Kind Gifts */}
                {data?.inkind_title && (
                  <Reveal delay={200}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full flex flex-col overflow-hidden group">
                      <div className="h-32 w-full bg-[#F8FBFD] group-hover:bg-[#E05A2B]/5 transition-colors flex items-center justify-center shrink-0 border-b border-[#112A46]/5">
                        <FaGift className="text-[#E05A2B] text-5xl animate-float group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-[20px] font-black text-[#112A46] mb-3">{data.inkind_title}</h3>
                        {data?.inkind_desc && <p className="text-[#5A6C7D] text-[13px] mb-3">{data.inkind_desc}</p>}
                        {Array.isArray(data?.inkind_items) && data.inkind_items.length > 0 && (
                          <ul className="space-y-1 mb-5 text-[#5A6C7D] text-[13px]">
                            {data.inkind_items.map((item, idx) => (
                              <li key={idx}>• {item.item_text || item}</li>
                            ))}
                          </ul>
                        )}
                        <div className="flex flex-col items-start gap-3 mt-auto">
                          {data?.inkind_wishlist_link && (
                            <a
                              href={data.inkind_wishlist_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
                            >
                              {data?.inkind_wishlist_text || "View Amazon Wishlist →"}
                            </a>
                          )}
                          <Link
                            to="/contact"
                            className="inline-flex items-center cursor-pointer gap-2 text-[#112A46] font-bold text-[14px] hover:text-[#E05A2B] transition-colors"
                          >
                            {data?.inkind_contact_text || "Contact About In-Kind →"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}

              </div>
            </div>
          </section>
        )}

        {/* Corporate & Maritime Partners (Logo Marquee) */}
        {(data?.partners_title || activeLogos.length > 0) && (
          <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-7 mb-14">
              <Reveal className="text-center">
                {data?.partners_title && (
                  <h2 className="text-[34px] md:text-[40px] font-black text-[#112A46] mb-4 leading-tight">
                    {data.partners_title}
                  </h2>
                )}
                {data?.partners_subtitle && (
                  <p className="text-[#5A6C7D] max-w-2xl mx-auto text-[17px]">
                    {data.partners_subtitle}
                  </p>
                )}
              </Reveal>
            </div>

            {activeLogos.length > 0 && (
              <div className="w-full relative flex flex-col gap-6">
                {/* First Row of Images */}
                {generalLogos.length > 0 && (
                  <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]">
                    <div className="flex gap-6 items-center">
                      {generalLogos.map((logo, index) => (
                        <div
                          key={`img-gen1-${index}`}
                          className="shrink-0 w-[240px] h-[140px] bg-white border border-[#112A46]/5 rounded-xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                        >
                          <img
                            src={logo}
                            alt="Partner Logo"
                            className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-6 items-center" aria-hidden="true">
                      {generalLogos.map((logo, index) => (
                        <div
                          key={`img-gen2-${index}`}
                          className="shrink-0 w-[240px] h-[140px] bg-white border border-[#112A46]/5 rounded-xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                        >
                          <img
                            src={logo}
                            alt="Partner Logo"
                            className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Second Row of Images */}
                {starLogos.length > 0 && (
                  <div className="flex w-max gap-6 animate-marquee-reverse hover:[animation-play-state:paused] mt-4">
                    <div className="flex gap-6 items-center">
                      {starLogos.map((logo, index) => (
                        <div
                          key={`img-star1-${index}`}
                          className="shrink-0 w-[240px] h-[140px] bg-white border border-[#112A46]/5 rounded-xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                        >
                          <img
                            src={logo}
                            alt="Partner Logo"
                            className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-6 items-center" aria-hidden="true">
                      {starLogos.map((logo, index) => (
                        <div
                          key={`img-star2-${index}`}
                          className="shrink-0 w-[240px] h-[140px] bg-white border border-[#112A46]/5 rounded-xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                        >
                          <img
                            src={logo}
                            alt="Partner Logo"
                            className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Corporate Sponsorship / Community Partners Info */}
        {(data?.community_title || data?.star_card_title || data?.corp_card_title) && (
          <section className="pt-24 pb-12 bg-white border-t-4 border-[#E05A2B]">
            <div className="max-w-[1200px] mx-auto px-7">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <Reveal>
                  {data?.community_title && (
                    <h2 className="text-[36px] font-black text-[#112A46] leading-tight mb-6">
                      {data.community_title}
                    </h2>
                  )}

                  {/* Animated Icon Composition */}
                  <div className="w-full h-[240px] rounded-[32px] bg-gradient-to-br from-[#112A46] to-[#2D5A7B] flex items-center justify-center mb-8 shadow-xl relative overflow-hidden">
                    <FaAnchor className="absolute text-white/5 text-[200px] -right-10 -bottom-10 animate-spin-slow" />
                    <div className="relative z-10 flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '0s' }}>
                        <FaBuilding className="text-white text-2xl" />
                      </div>
                      <div className="w-24 h-24 bg-[#E05A2B] rounded-full flex items-center justify-center shadow-lg animate-pulse-glow z-10">
                        <FaHandshake className="text-white text-4xl" />
                      </div>
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center animate-float-delayed" style={{ animationDelay: '1.5s' }}>
                        <FaShip className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>

                  {data?.community_desc_1 && (
                    <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-4">
                      {data.community_desc_1}
                    </p>
                  )}
                  {data?.community_desc_2 && (
                    <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6">
                      {data.community_desc_2}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button
                      onClick={() => setActiveModal('partnership')}
                      className="inline-flex items-center justify-center cursor-pointer gap-2 bg-[#E05A2B] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#c94d23] transition-all shadow-md"
                    >
                      <FaBuilding />
                      {data?.btn_partner_text || "Partner with Halifax Mission"}
                    </button>
                    {data?.btn_national_link && (
                      <a
                        href={data.btn_national_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center cursor-pointer gap-2 bg-[#112A46] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#1a3a5f] transition-all shadow-md"
                      >
                        <FaShip />
                        {data?.btn_national_text || "National Partnerships"}
                      </a>
                    )}
                  </div>
                </Reveal>

                <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data?.star_card_title && (
                    <div className="bg-[#E05A2B] border-2 border-[#E05A2B] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                        <FaHandshake className="text-3xl text-[#E05A2B]" />
                      </div>
                      <h3 className="text-[18px] font-black text-white mb-3 leading-tight whitespace-pre-line">{data.star_card_title}</h3>
                      {data?.star_card_desc && (
                        <p className="text-[13px] text-white/90 mb-6 leading-relaxed">
                          {data.star_card_desc}
                        </p>
                      )}
                    </div>
                  )}

                  {data?.corp_card_title && (
                    <div className="bg-[#112A46] border-2 border-[#112A46] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                        <FaBuilding className="text-3xl text-white" />
                      </div>
                      <h3 className="text-[18px] font-black text-white mb-3 leading-tight whitespace-pre-line">{data.corp_card_title}</h3>
                      {data?.corp_card_desc && (
                        <p className="text-[13px] text-white/70 mb-6 leading-relaxed">
                          {data.corp_card_desc}
                        </p>
                      )}
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* STAR CLUB MEMBERS (TEXT MARQUEE) SECTION */}
        {(data?.star_club_title || activeStarNames.length > 0) && (
          <section className="pb-24 pt-12 bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-7">
              <div className="bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] rounded-[32px] py-12 border border-[#112A46]/5 shadow-sm relative overflow-hidden">

                <Reveal className="text-center px-6 mb-10">
                  <div className="inline-flex items-center justify-center gap-2 text-[#E05A2B] mb-4">
                    <FaStar className="animate-spin-slow" /><FaStar className="text-2xl animate-spin-slow" style={{ animationDirection: 'reverse' }} /><FaStar className="animate-spin-slow" />
                  </div>
                  {data?.star_club_title && <h3 className="text-[32px] font-black text-[#112A46] mb-4">{data.star_club_title}</h3>}
                  {data?.star_club_subtitle && (
                    <p className="text-[#5A6C7D] max-w-2xl mx-auto text-[16px] font-medium">
                      {data.star_club_subtitle}
                    </p>
                  )}
                </Reveal>

                {activeStarNames.length > 0 && (
                  <div className="w-full relative">
                    <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
                      <div className="flex gap-4 pr-4 pl-4 items-center">
                        {activeStarNames.map((sponsorName, index) => (
                          <div
                            key={`txt-star1-${index}`}
                            className="shrink-0 bg-white border border-[#E05A2B]/10 rounded-full px-8 py-4 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/40 hover:-translate-y-1 transition-all group"
                          >
                            <span className="text-[15px] font-bold text-[#112A46] whitespace-nowrap flex items-center gap-2">
                              <FaStar className="text-[#E05A2B]" />
                              {sponsorName}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-4 pr-4 items-center" aria-hidden="true">
                        {activeStarNames.map((sponsorName, index) => (
                          <div
                            key={`txt-star2-${index}`}
                            className="shrink-0 bg-white border border-[#E05A2B]/10 rounded-full px-8 py-4 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/40 hover:-translate-y-1 transition-all group"
                          >
                            <span className="text-[15px] font-bold text-[#112A46] whitespace-nowrap flex items-center gap-2">
                              <FaStar className="text-[#E05A2B]" />
                              {sponsorName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              <Reveal className="text-center mt-12">
                <button
                  onClick={() => setActiveModal('partnership')}
                  className="inline-flex items-center gap-2 bg-[#E05A2B] cursor-pointer text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl"
                >
                  <FaHandshake />
                  {data?.btn_sponsor_now_text || "Become a Sponsor"}
                </button>
              </Reveal>

            </div>
          </section>
        )}

        {/* Final Call to Action */}
        {(data?.cta_title || data?.cta_desc) && (
          <section className="relative py-24 overflow-hidden bg-[#E05A2B]">
            {ctaBgImageUrl && (
              <div className="absolute inset-0 z-0">
                <img
                  src={ctaBgImageUrl}
                  alt="MTSC Halifax"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#E05A2B]/90"></div>
              </div>
            )}

            <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
              <Reveal>
                <FaHeart className="text-white text-5xl mx-auto mb-6 opacity-90 animate-heartbeat" />
                {data?.cta_title && (
                  <h2 className="text-[clamp(32px,4vw,48px)] font-black text-white mb-6 leading-tight">
                    {data.cta_title}
                  </h2>
                )}
                {data?.cta_desc && (
                  <p className="text-white/90 text-[18px] max-w-3xl mx-auto leading-relaxed mb-10">
                    {data.cta_desc}
                  </p>
                )}

                <div className="flex flex-wrap justify-center gap-4">
                  {data?.btn_donate_text && (
                    <button
                      onClick={handleScrollToDonate}
                      className="inline-flex items-center gap-2 cursor-pointer bg-white text-[#E05A2B] px-6 py-4 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                    >
                      <FaDollarSign />
                      {data.btn_donate_text}
                    </button>
                  )}
                  {data?.btn_volunteer_text && (
                    <button
                      onClick={() => setActiveModal('volunteer')}
                      className="inline-flex items-center gap-2 cursor-pointer bg-white text-[#E05A2B] px-6 py-4 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                    >
                      <FaUsers />
                      {data.btn_volunteer_text}
                    </button>
                  )}
                  {data?.btn_contact_text && (
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 cursor-pointer bg-transparent border-2 border-white text-white px-6 py-4 rounded-full font-bold text-[14px] hover:bg-white hover:text-[#E05A2B] transition-all"
                    >
                      {data.btn_contact_text}
                    </Link>
                  )}
                  {data?.btn_wishlist_text && (
                    <a
                      href={data?.btn_wishlist_link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-4 rounded-full font-bold text-[14px] hover:bg-white hover:text-[#E05A2B] transition-all"
                    >
                      <FaGift />
                      {data.btn_wishlist_text}
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}