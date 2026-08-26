import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaWhatsapp, FaShip, FaBoxOpen, FaUserTie, FaHandsHelping, 
  FaTshirt, FaBus, FaCheckCircle, FaMapMarkerAlt, FaClock, 
  FaPhoneAlt, FaEnvelope, FaGlobe, FaAnchor
} from 'react-icons/fa';

import { useMtscSeafarerSupportLive } from '../hooks/usePayloadLive';
import { getMediaUrl } from '../services/payloadApi';

const SupportModal = ({ isOpen, onClose, title, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  if (!isOpen) return null;

  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfMbXAK0YerhuvvLkkn3oeAxI-VsltG2jw-zeNTW3fyr9QwWg/formResponse";

  const handleIframeLoad = () => {
    if (isSubmitting) {
      setIsSubmitting(false);
      if (formRef.current) formRef.current.reset(); // Clear the form fields
      onSubmit(); // Triggers the success toast
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#112A46]/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-[#E05A2B] text-3xl font-light transition-colors cursor-pointer"
        >
          ×
        </button>
        <h3 className="text-2xl font-extrabold text-[#112A46] mb-6 pr-8">{title}</h3>
        
        <iframe
          name="hidden_iframe_modal"
          id="hidden_iframe_modal"
          style={{ display: 'none' }}
          onLoad={handleIframeLoad}
        ></iframe>

        <form 
          ref={formRef}
          action={GOOGLE_FORM_URL}
          method="POST"
          target="hidden_iframe_modal"
          onSubmit={() => setIsSubmitting(true)} 
          className="space-y-4"
        >
          
          {/* HIDDEN INPUT FOR TITLE/REQUEST TYPE */}
          <input type="hidden" name="entry.632021124" value={title} />

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input required type="text" name="entry.571671666" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ship Name</label>
            <input required type="text" name="entry.1510172243" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50" placeholder="e.g., MV Atlantic" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contact Method (WhatsApp Number or Email)</label>
            <input required type="text" name="entry.122220513" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50" placeholder="+1 234 567 8900" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">How can we help?</label>
            <textarea required rows="3" name="entry.922287811" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50 resize-none" placeholder="Short message..."></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full text-white font-bold py-4 rounded-xl shadow-md mt-4 transition-colors cursor-pointer ${isSubmitting ? 'bg-gray-400' : 'bg-[#E05A2B] hover:bg-[#c94d23]'}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">
            Our team will contact you as soon as possible.
          </p>
        </form>
      </div>
    </div>
  );
};

import LoadingSpinner from '../components/common/LoadingSpinner';

export default function SeafarerSupport() {
  const { data, isLoading } = useMtscSeafarerSupportLive();
  const [activeModal, setActiveModal] = useState(null); 
  const [toastMessage, setToastMessage] = useState(null); // Toast state

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = () => {
    setActiveModal(null); // Close the modal
    // Show toast message
    setToastMessage("Thank You! Your request has been successfully sent. We will be in touch with you shortly.");
    
    // Auto hide toast after 5 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const scrollToDashboard = () => {
    const el = document.getElementById('support-dashboard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Resolved Media URLs (Strict CMS only, no hardcoded image fallbacks)
  const heroImageUrl = getMediaUrl(data?.hero_image, null);
  const reassuranceImageUrl = getMediaUrl(data?.reassurance_image, null);
  const leader1ImageUrl = getMediaUrl(data?.leader_1_image, null);
  const leader2ImageUrl = getMediaUrl(data?.leader_2_image, null);

  // Default icons for 6 service dashboard cards
  const serviceIcons = [FaShip, FaBoxOpen, FaUserTie, FaHandsHelping, FaTshirt, FaBus];

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FBFD] relative">
      <Navbar />

      {/* Modern Toast Popup Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-white border-l-4 border-[#25D366] shadow-2xl rounded-xl p-5 max-w-sm flex items-start gap-4 transition-all duration-500 transform translate-y-0 opacity-100">
          <FaCheckCircle className="text-[#25D366] text-2xl shrink-0 mt-0.5" />
          <div className="flex-grow">
            <h4 className="text-[#112A46] font-extrabold text-sm mb-1">Success</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)} 
            className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* Dynamic Modals */}
      <SupportModal isOpen={activeModal === 'shipVisit'} onClose={() => setActiveModal(null)} title="Request a Ship Visit" onSubmit={handleFormSubmit} />
      <SupportModal isOpen={activeModal === 'support'} onClose={() => setActiveModal(null)} title="Request General Support" onSubmit={handleFormSubmit} />
      <SupportModal isOpen={activeModal === 'clothing'} onClose={() => setActiveModal(null)} title="Request Clothing & Essentials" onSubmit={handleFormSubmit} />
      <SupportModal isOpen={activeModal === 'transport'} onClose={() => setActiveModal(null)} title="Transportation Request" onSubmit={handleFormSubmit} />

      <main className="flex-grow">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-16 min-h-[40vh] flex flex-col justify-center overflow-hidden">
          {heroImageUrl && (
            <div className="absolute inset-0 z-0">
              <img src={heroImageUrl} alt={data?.hero_title || "Halifax Harbour"} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#112A46]/45 from-[#2D5A7B]/45 via-[#2D5A7B]/55"></div>
            </div>
          )}

          <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 text-center">
            <Reveal>
              {data?.hero_badge && (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-2 cursor-default">
                  <FaAnchor className="text-[#FFD700]" /> {data.hero_badge}
                </div>
              )}
              {data?.hero_title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto">
                  {data.hero_title}
                </h1>
              )}
              {data?.hero_subtitle && (
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium max-w-3xl mx-auto mb-10">
                  {data.hero_subtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                {data?.btn_ship_visit_text && (
                  <button onClick={() => setActiveModal('shipVisit')} className="w-full sm:w-auto px-8 py-4 bg-[#E05A2B] hover:bg-[#c94d23] text-white font-extrabold rounded-xl shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
                    {data.btn_ship_visit_text}
                  </button>
                )}
                {data?.btn_services_text && (
                  <button onClick={scrollToDashboard} className="w-full sm:w-auto px-8 py-4 bg-white text-[#112A46] hover:bg-gray-100 font-extrabold rounded-xl shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
                    {data.btn_services_text}
                  </button>
                )}
                {data?.btn_whatsapp_text && (
                  <a href={data?.btn_whatsapp_link || "#"} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1ebd57] text-white font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 cursor-pointer">
                    <FaWhatsapp className="text-xl" /> {data.btn_whatsapp_text}
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= 6 CARDS DASHBOARD ================= */}
        {(data?.services_title || (Array.isArray(data?.support_services) && data.support_services.length > 0)) && (
          <section id="support-dashboard" className="py-20 bg-[#F8FBFD] scroll-mt-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <Reveal className="text-center mb-16">
                {data?.services_title && <h2 className="text-3xl md:text-4xl font-extrabold text-[#112A46]">{data.services_title}</h2>}
                {data?.services_subtitle && <p className="text-gray-600 mt-4 text-lg">{data.services_subtitle}</p>}
              </Reveal>

              {Array.isArray(data?.support_services) && data.support_services.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.support_services.map((service, index) => {
                    const IconComponent = serviceIcons[index % serviceIcons.length] || FaHandsHelping;
                    
                    // Card 1 (Parcel): external link
                    if (index === 1 && service.button_link) {
                      return (
                        <Reveal key={index} delay={index * 100}>
                          <a href={service.button_link} target="_blank" rel="noopener noreferrer" className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E05A2B]/30 transition-all cursor-pointer group h-full flex flex-col block">
                            <div className="w-16 h-16 bg-[#FDF0EC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                              <IconComponent className="text-3xl text-[#E05A2B]" />
                            </div>
                            {service.title && <h3 className="text-xl font-bold text-[#112A46] mb-3">{service.title}</h3>}
                            {service.description && <p className="text-gray-600 font-medium mb-6 flex-grow">{service.description}</p>}
                            {service.button_text && <div className="text-[#E05A2B] font-bold text-sm inline-flex items-center gap-2">{service.button_text}</div>}
                          </a>
                        </Reveal>
                      );
                    }

                    // Card 2 (Message Chaplain): WhatsApp link
                    if (index === 2) {
                      return (
                        <Reveal key={index} delay={index * 100}>
                          <a href={service.button_link || "#"} target="_blank" rel="noreferrer" className="bg-[#112A46] rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group h-full flex flex-col block">
                            <div className="w-16 h-16 bg-[#25D366]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                              <IconComponent className="text-3xl text-[#25D366]" />
                            </div>
                            {service.title && <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>}
                            {service.description && <p className="text-white/70 font-medium mb-6 flex-grow">{service.description}</p>}
                            {service.button_text && (
                              <div className="text-[#25D366] font-bold text-sm inline-flex items-center gap-2">
                                <FaWhatsapp className="text-lg"/> {service.button_text}
                              </div>
                            )}
                          </a>
                        </Reveal>
                      );
                    }

                    // Modal cards (0: shipVisit, 3: support, 4: clothing, 5: transport)
                    const modalType = index === 0 ? 'shipVisit' : index === 3 ? 'support' : index === 4 ? 'clothing' : 'transport';

                    return (
                      <Reveal key={index} delay={index * 100}>
                        <div onClick={() => setActiveModal(modalType)} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E05A2B]/30 transition-all cursor-pointer group h-full flex flex-col">
                          <div className="w-16 h-16 bg-[#FDF0EC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <IconComponent className="text-3xl text-[#E05A2B]" />
                          </div>
                          {service.title && <h3 className="text-xl font-bold text-[#112A46] mb-3">{service.title}</h3>}
                          {service.description && <p className="text-gray-600 font-medium mb-6 flex-grow">{service.description}</p>}
                          {service.button_text && <div className="text-[#E05A2B] font-bold text-sm inline-flex items-center gap-2">{service.button_text}</div>}
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= REASSURANCE SECTION ================= */}
        {(data?.commitment_title || data?.commitment_description || reassuranceImageUrl || (Array.isArray(data?.commitment_checklist) && data.commitment_checklist.length > 0)) && (
          <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {reassuranceImageUrl && (
                  <Reveal>
                    <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                      <img src={reassuranceImageUrl} alt={data?.reassurance_overlay_title || "Welcome Seafarers"} className="w-full h-full object-cover aspect-square md:aspect-auto" />
                      {data?.reassurance_overlay_title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#112A46]/80 to-transparent flex items-end p-8">
                          <h3 className="text-3xl font-extrabold text-white">{data.reassurance_overlay_title}</h3>
                        </div>
                      )}
                    </div>
                  </Reveal>
                )}

                <Reveal delay={100}>
                  {data?.commitment_eyebrow && <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm mb-2 block">{data.commitment_eyebrow}</span>}
                  {data?.commitment_title && (
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#112A46] leading-tight mb-6">
                      {data.commitment_title}
                    </h2>
                  )}
                  {data?.commitment_description && (
                    <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                      {data.commitment_description}
                    </p>
                  )}
                  {Array.isArray(data?.commitment_checklist) && data.commitment_checklist.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {data.commitment_checklist.map((itemObj, idx) => {
                        const itemText = itemObj.item_text || itemObj;
                        return (
                          <div key={idx} className="flex items-start gap-3 bg-[#F8FBFD] p-4 rounded-xl border border-gray-100 cursor-default">
                            <FaCheckCircle className="text-[#E05A2B] text-lg mt-0.5 shrink-0" />
                            <span className="text-gray-700 font-bold text-sm">{itemText}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* ================= HOW IT WORKS ================= */}
        {(data?.how_it_works_title || (Array.isArray(data?.how_it_works_steps) && data.how_it_works_steps.length > 0)) && (
          <section className="py-24 bg-[#112A46] text-white cursor-default">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
              {data?.how_it_works_title && (
                <Reveal>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-16">{data.how_it_works_title}</h2>
                </Reveal>
              )}
              
              {Array.isArray(data?.how_it_works_steps) && data.how_it_works_steps.length > 0 && (
                <div className="grid md:grid-cols-3 gap-12 relative max-w-4xl mx-auto">
                  <div className="hidden md:block absolute top-10 left-20 right-20 h-1 bg-white/10 z-0"></div>
                  
                  {data.how_it_works_steps.map((s, idx) => (
                    <Reveal delay={idx * 100} key={idx} className="relative z-10 flex flex-col items-center">
                      {s.step_number && (
                        <div className="w-20 h-20 bg-[#E05A2B] rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-xl border-4 border-[#112A46]">
                          {s.step_number}
                        </div>
                      )}
                      {s.step_title && <h3 className="text-xl font-bold mb-3">{s.step_title}</h3>}
                      {s.step_desc && <p className="text-white/70 font-medium">{s.step_desc}</p>}
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= MEET YOUR TEAM ================= */}
        {(data?.team_title || data?.leader_1_name || data?.leader_2_name || data?.welcoming_box_title) && (
          <section className="py-20 bg-white border-b border-gray-100">
            <div className="max-w-[1200px] mx-auto px-6">
              {(data?.team_title || data?.team_subtitle) && (
                <Reveal className="text-center mb-16">
                  {data?.team_title && <h2 className="text-3xl md:text-4xl font-extrabold text-[#112A46] mb-4 cursor-default">{data.team_title}</h2>}
                  {data?.team_subtitle && (
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium cursor-default">
                      {data.team_subtitle}
                    </p>
                  )}
                </Reveal>
              )}

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                {(data?.leader_1_name || data?.leader_1_role || leader1ImageUrl) && (
                  <Reveal delay={100}>
                    <div className="flex items-center gap-6 bg-[#F8FBFD] p-6 rounded-3xl border border-gray-100 cursor-default">
                      {leader1ImageUrl && (
                        <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
                          <img src={leader1ImageUrl} alt={data?.leader_1_name || "Helen Glenn"} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div>
                        {data?.leader_1_name && <h3 className="text-xl font-extrabold text-[#112A46]">{data.leader_1_name}</h3>}
                        {data?.leader_1_role && <p className="text-[#E05A2B] font-bold text-sm uppercase mb-2">{data.leader_1_role}</p>}
                        <div className="flex gap-3">
                          {data?.leader_1_whatsapp && <a href={data.leader_1_whatsapp} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaWhatsapp /></a>}
                          {data?.leader_1_email && <a href={data.leader_1_email} className="w-10 h-10 rounded-full bg-[#112A46] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaEnvelope /></a>}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}

                {(data?.leader_2_name || data?.leader_2_role || leader2ImageUrl) && (
                  <Reveal delay={200}>
                    <div className="flex items-center gap-6 bg-[#F8FBFD] p-6 rounded-3xl border border-gray-100 cursor-default">
                      {leader2ImageUrl && (
                        <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md bg-[#EAE6DF] flex items-center justify-center">
                          <img src={leader2ImageUrl} alt={data?.leader_2_name || "Joseph Loot"} className="w-full h-full object-contain scale-[1.2]" />
                        </div>
                      )}
                      <div>
                        {data?.leader_2_name && <h3 className="text-xl font-extrabold text-[#112A46]">{data.leader_2_name}</h3>}
                        {data?.leader_2_role && <p className="text-[#E05A2B] font-bold text-sm uppercase mb-2">{data.leader_2_role}</p>}
                        <div className="flex gap-3">
                          {data?.leader_2_whatsapp && <a href={data.leader_2_whatsapp} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaWhatsapp /></a>}
                          {data?.leader_2_email && <a href={data.leader_2_email} className="w-10 h-10 rounded-full bg-[#112A46] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaEnvelope /></a>}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>

              {(data?.welcoming_box_title || data?.welcoming_box_text) && (
                <Reveal>
                  <div className="bg-[#E05A2B]/10 border border-[#E05A2B]/20 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left cursor-default">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <FaGlobe className="text-[#E05A2B] text-3xl" />
                    </div>
                    <div>
                      {data?.welcoming_box_title && <h3 className="text-xl font-extrabold text-[#112A46] mb-2">{data.welcoming_box_title}</h3>}
                      {data?.welcoming_box_text && <p className="text-gray-700 font-medium">{data.welcoming_box_text}</p>}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* ================= EMERGENCY & LOCATION ================= */}
        {(data?.urgent_title || data?.urgent_subtitle) && (
          <section className="py-16 bg-[#E05A2B] cursor-default">
            <div className="max-w-[800px] mx-auto px-6 text-center text-white">
              <Reveal>
                {data?.urgent_title && <h2 className="text-3xl md:text-4xl font-black mb-4">{data.urgent_title}</h2>}
                {data?.urgent_subtitle && <p className="text-white/90 text-lg mb-8 font-medium">{data.urgent_subtitle}</p>}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {data?.btn_call_text && (
                    <a href={data?.btn_call_link || "#"} className="bg-white text-[#E05A2B] px-8 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <FaPhoneAlt /> {data.btn_call_text}
                    </a>
                  )}
                  {data?.btn_urgent_whatsapp_text && (
                    <a href={data?.btn_urgent_whatsapp_link || "#"} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-[#1ebd57] transition-colors cursor-pointer">
                      <FaWhatsapp className="text-2xl" /> {data.btn_urgent_whatsapp_text}
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {(data?.visit_section_title || data?.civic_address_text || data?.map_embed_url) && (
          <section className="py-20 bg-[#F8FBFD] cursor-default">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                <Reveal>
                  {data?.visit_section_title && <h2 className="text-3xl font-extrabold text-[#112A46] mb-8">{data.visit_section_title}</h2>}
                  
                  <div className="space-y-8">
                    {(data?.civic_address_text || data?.mailing_address_text) && (
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                          <FaMapMarkerAlt className="text-[#E05A2B] text-xl" />
                        </div>
                        <div>
                          {data?.civic_address_title && <h4 className="font-bold text-[#112A46] text-lg mb-1">{data.civic_address_title}</h4>}
                          {data?.civic_address_text && <p className="text-gray-600 font-medium whitespace-pre-line">{data.civic_address_text}</p>}
                          {data?.mailing_address_title && <h4 className="font-bold text-[#112A46] text-lg mt-4 mb-1">{data.mailing_address_title}</h4>}
                          {data?.mailing_address_text && <p className="text-gray-600 font-medium">{data.mailing_address_text}</p>}
                        </div>
                      </div>
                    )}

                    {(data?.mon_sat_hours || data?.sunday_hours || data?.hours_note) && (
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                          <FaClock className="text-[#E05A2B] text-xl" />
                        </div>
                        <div>
                          {data?.hours_title && <h4 className="font-bold text-[#112A46] text-lg mb-1">{data.hours_title}</h4>}
                          {data?.mon_sat_hours && <p className="text-gray-600 font-medium">{data.mon_sat_hours}</p>}
                          {data?.sunday_hours && <p className="text-gray-600 font-medium">{data.sunday_hours}</p>}
                          {data?.hours_note && (
                            <div className="mt-4 bg-[#112A46]/5 p-4 rounded-xl border border-[#112A46]/10">
                              <p className="text-sm text-[#112A46] font-semibold italic">{data.hours_note}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>

                {data?.map_embed_url && (
                  <Reveal delay={100}>
                    <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white cursor-pointer">
                      <iframe 
                        title="Mission to Seafarers Halifax Map"
                        src={data.map_embed_url} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy">
                      </iframe>
                    </div>
                  </Reveal>
                )}

              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}