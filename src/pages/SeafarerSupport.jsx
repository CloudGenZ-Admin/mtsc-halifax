import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaWhatsapp, FaShip, FaBoxOpen, FaUserTie, FaHandsHelping, 
  FaTshirt, FaBus, FaCheckCircle, FaMapMarkerAlt, FaClock, 
  FaPhoneAlt, FaEnvelope, FaGlobe, FaAnchor
} from 'react-icons/fa';

// Import images
import portHalifaxImg from '../assets/port_halifax.jpg';
import volunteersImg from '../assets/MtS Halifax Center.jpg';
import helenImg from '../assets/HelenCircle.jpg';
import josephImg from '../assets/Josefloot.jpg';

// Simple Reusable Modal for Request Forms with Loading State
const SupportModal = ({ isOpen, onClose, title, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay for realistic UX
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(); // Call parent function
    }, 1200);
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ship Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50" placeholder="e.g., MV Atlantic" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contact Method (WhatsApp Number or Email)</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50" placeholder="+1 234 567 8900" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">How can we help?</label>
            <textarea required rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B] bg-gray-50 resize-none" placeholder="Short message..."></textarea>
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

export default function SeafarerSupport() {
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
    document.getElementById('support-dashboard').scrollIntoView({ behavior: 'smooth' });
  };

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
        
        {/* ================= HERO SECTION (Updated to match About Page) ================= */}
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-16 min-h-[40vh] flex flex-col justify-center overflow-hidden ">
          <div className="absolute inset-0 z-0">
            <img src={portHalifaxImg} alt="Halifax Harbour" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#112A46]/45 from-[#2D5A7B]/45 via-[#2D5A7B]/55"></div>
          </div>

          <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-2 cursor-default">
                <FaAnchor className="text-[#FFD700]" /> For Visiting Crews
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto">
                Support While You’re in <br className="hidden md:block"/> Halifax Harbour
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium max-w-3xl mx-auto mb-10">
                Wherever you are from, you are welcome here. Mission to Seafarers Halifax is here to support you with practical help, connection, hospitality, and care while your ship is visiting the Port of Halifax.
              </p>

              {/* Action Buttons with cursor-pointer */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                <button onClick={() => setActiveModal('shipVisit')} className="w-full sm:w-auto px-8 py-4 bg-[#E05A2B] hover:bg-[#c94d23] text-white font-extrabold rounded-xl shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
                  Request a Ship Visit
                </button>
                <button onClick={scrollToDashboard} className="w-full sm:w-auto px-8 py-4 bg-white text-[#112A46] hover:bg-gray-100 font-extrabold rounded-xl shadow-lg transition-transform hover:-translate-y-1 cursor-pointer">
                  Explore Services
                </button>
                <a href="https://wa.me/+19029893388" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1ebd57] text-white font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 cursor-pointer">
                  <FaWhatsapp className="text-xl" /> Message on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= 6 CARDS DASHBOARD ================= */}
        <section id="support-dashboard" className="py-20 bg-[#F8FBFD] scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#112A46]">How Can We Help You Today?</h2>
              <p className="text-gray-600 mt-4 text-lg">Select a service below to request assistance quickly.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <Reveal>
                <div onClick={() => setActiveModal('shipVisit')} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E05A2B]/30 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#FDF0EC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaShip className="text-3xl text-[#E05A2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#112A46] mb-3">Request a Ship Visit</h3>
                  <p className="text-gray-600 font-medium mb-6 flex-grow">Our volunteers and chaplaincy team can visit your ship while you are in port.</p>
                  <div className="text-[#E05A2B] font-bold text-sm inline-flex items-center gap-2">Fill Request Form →</div>
                </div>
              </Reveal>

              {/* Card 2 - Direct link to parcel service */}
              <Reveal delay={100}>
                <a href="https://parcelservice.mtsc.ca/login" target="_blank" rel="noopener noreferrer" className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E05A2B]/30 transition-all cursor-pointer group h-full flex flex-col block">
                  <div className="w-16 h-16 bg-[#FDF0EC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaBoxOpen className="text-3xl text-[#E05A2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#112A46] mb-3">Send or Receive Parcel</h3>
                  <p className="text-gray-600 font-medium mb-6 flex-grow">Order personal items online and have them delivered safely to our Halifax station for pickup.
                       Please ensure that all courier and parcel deliveries to the Mission are scheduled within official office hours.
                  </p>
                  <div className="text-[#E05A2B] font-bold text-sm inline-flex items-center gap-2">Parcel Info & Request →</div>
                </a>
              </Reveal>

              {/* Card 3 (WhatsApp Direct) */}
              <Reveal delay={200}>
                <a href="https://wa.me/19029893388" target="_blank" rel="noreferrer" className="bg-[#112A46] rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group h-full flex flex-col block">
                  <div className="w-16 h-16 bg-[#25D366]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaUserTie className="text-3xl text-[#25D366]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Message the Chaplain</h3>
                  <p className="text-white/70 font-medium mb-6 flex-grow">Need someone to talk to? We are here to listen and support you confidentially.</p>
                  <div className="text-[#25D366] font-bold text-sm inline-flex items-center gap-2"><FaWhatsapp className="text-lg"/> WhatsApp Us Now</div>
                </a>
              </Reveal>

              {/* Card 4 */}
              <Reveal>
                <div onClick={() => setActiveModal('support')} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E05A2B]/30 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#FDF0EC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaHandsHelping className="text-3xl text-[#E05A2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#112A46] mb-3">Request Support</h3>
                  <p className="text-gray-600 font-medium mb-6 flex-grow">We can assist with practical, emotional, transportation, or local support needs while your vessel is visiting the Port of Halifax.</p>
                  <div className="text-[#E05A2B] font-bold text-sm inline-flex items-center gap-2">General Support Form →</div>
                </div>
              </Reveal>

              {/* Card 5 */}
              <Reveal delay={100}>
                <div onClick={() => setActiveModal('clothing')} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E05A2B]/30 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#FDF0EC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaTshirt className="text-3xl text-[#E05A2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#112A46] mb-3">Clothing & Essentials</h3>
                  <p className="text-gray-600 font-medium mb-6 flex-grow">Access seasonal clothing, gloves, jackets, hygiene items, and practical essentials during your time in port.</p>
                  <div className="text-[#E05A2B] font-bold text-sm inline-flex items-center gap-2">Request Assistance →</div>
                </div>
              </Reveal>

              {/* Card 6 */}
              <Reveal delay={200}>
                <div onClick={() => setActiveModal('transport')} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E05A2B]/30 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#FDF0EC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FaBus className="text-3xl text-[#E05A2B]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#112A46] mb-3">Transport & Guidance</h3>
                  <p className="text-gray-600 font-medium mb-6 flex-grow">Need help getting around Halifax or finding local services? Our team may be able to assist.</p>
                  <div className="text-[#E05A2B] font-bold text-sm inline-flex items-center gap-2">Transportation Request →</div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ================= REASSURANCE SECTION ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                  <img src={volunteersImg} alt="Welcome Seafarers" className="w-full h-full object-cover aspect-square md:aspect-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112A46]/80 to-transparent flex items-end p-8">
                    <h3 className="text-3xl font-extrabold text-white">You Are Not Alone.</h3>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm mb-2 block">Our Commitment</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#112A46] leading-tight mb-6">
                  Every day, seafarers from around the world arrive in Halifax.
                </h2>
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
                  Every day, seafarers from around the world arrive in Halifax after long journeys at sea. Whether you are here for a few hours or several days, our team is here to welcome and support you.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Friendly conversation & hospitality",
                    "Free Wi-Fi & communication support",
                    "Transportation assistance",
                    "Emotional & spiritual care",
                    "Practical support while in port",
                    "Access to local resources"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#F8FBFD] p-4 rounded-xl border border-gray-100 cursor-default">
                      <FaCheckCircle className="text-[#E05A2B] text-lg mt-0.5 shrink-0" />
                      <span className="text-gray-700 font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS (3 STEPS) ================= */}
        <section className="py-24 bg-[#112A46] text-white cursor-default">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-16">Getting Support is Simple</h2>
            </Reveal>
            
            <div className="grid md:grid-cols-3 gap-12 relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-10 left-20 right-20 h-1 bg-white/10 z-0"></div>
              
              {[
                { step: "1", title: "Choose", desc: "Select the service or support you need from our dashboard above." },
                { step: "2", title: "Request", desc: "Fill out a short request form or message our team." },
                { step: "3", title: "Connect", desc: "Our volunteers or station team will contact you shortly." }
              ].map((s, idx) => (
                <Reveal delay={idx * 100} key={idx} className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-[#E05A2B] rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-xl border-4 border-[#112A46]">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-white/70 font-medium">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MEET YOUR TEAM & LANGUAGE ================= */}
        <section className="py-20 bg-white border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#112A46] mb-4 cursor-default">A Friendly Face While Far From Home</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium cursor-default">
                Our volunteers, chaplaincy team, and station staff are here to welcome you, listen, and support you during your time in Halifax.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {/* Helen */}
              <Reveal delay={100}>
                <div className="flex items-center gap-6 bg-[#F8FBFD] p-6 rounded-3xl border border-gray-100 cursor-default">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
                    <img src={helenImg} alt="Helen Glenn" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#112A46]">Helen Glenn</h3>
                    <p className="text-[#E05A2B] font-bold text-sm uppercase mb-2">Station Manager</p>
                    <div className="flex gap-3">
                      <a href="https://wa.me/19024561658" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaWhatsapp /></a>
                      <a href="mailto:hglenn@missiontoseafarershalifax.ca" className="w-10 h-10 rounded-full bg-[#112A46] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaEnvelope /></a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Joseph */}
              <Reveal delay={200}>
                <div className="flex items-center gap-6 bg-[#F8FBFD] p-6 rounded-3xl border border-gray-100 cursor-default">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md bg-[#EAE6DF] flex items-center justify-center">
                    <img src={josephImg} alt="Joseph Loot" className="w-full h-full object-contain scale-[1.2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#112A46]">Joseph Loot</h3>
                    <p className="text-[#E05A2B] font-bold text-sm uppercase mb-2">Assistant Manager</p>
                    <div className="flex gap-3">
                      <a href="https://wa.me/19029893388" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaWhatsapp /></a>
                      <a href="mailto:jloot@missiontoseafarershalifax.ca" className="w-10 h-10 rounded-full bg-[#112A46] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"><FaEnvelope /></a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Language Box */}
            <Reveal>
              <div className="bg-[#E05A2B]/10 border border-[#E05A2B]/20 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left cursor-default">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <FaGlobe className="text-[#E05A2B] text-3xl" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#112A46] mb-2">We Welcome Seafarers from Around the World</h3>
                  <p className="text-gray-700 font-medium">Mission to Seafarers Halifax supports seafarers of all nationalities, cultures, and faiths. If English is not your first language, we will do our best to support you and help you feel comfortable during your visit.</p>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ================= EMERGENCY & LOCATION ================= */}
        <section className="py-16 bg-[#E05A2B] cursor-default">
          <div className="max-w-[800px] mx-auto px-6 text-center text-white">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Need Urgent Assistance?</h2>
              <p className="text-white/90 text-lg mb-8 font-medium">Contact us directly by phone or WhatsApp for immediate support.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+19024227790" className="bg-white text-[#E05A2B] px-8 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <FaPhoneAlt /> Call Station
                </a>
                <a href="https://wa.me/19024561658" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:bg-[#1ebd57] transition-colors cursor-pointer">
                  <FaWhatsapp className="text-2xl" /> WhatsApp Team
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20 bg-[#F8FBFD] cursor-default">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              <Reveal>
                <h2 className="text-3xl font-extrabold text-[#112A46] mb-8">Visit the Halifax Station</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <FaMapMarkerAlt className="text-[#E05A2B] text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#112A46] text-lg mb-1">Civic Address</h4>
                      <p className="text-gray-600 font-medium">844 Marginal Road, Halifax, Nova Scotia<br/>Situated across from Pier 24 in the Halifax Seaport area.</p>
                      <h4 className="font-bold text-[#112A46] text-lg mt-4 mb-1">Mailing Address</h4>
                      <p className="text-gray-600 font-medium">P.O. Box 27114, Halifax, NS B3H 4M8</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <FaClock className="text-[#E05A2B] text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#112A46] text-lg mb-1">General Station Hours</h4>
                      <p className="text-gray-600 font-medium"><strong className="text-[#112A46]">Mon - Sat:</strong> 10:00 AM – 4:00 PM</p>
                      <p className="text-gray-600 font-medium"><strong className="text-[#112A46]">Sunday:</strong> Generally Closed</p>
                      <div className="mt-4 bg-[#112A46]/5 p-4 rounded-xl border border-[#112A46]/10">
                        <p className="text-sm text-[#112A46] font-semibold italic">Note: Ship visits and seafarer support may still occur outside regular station hours depending on vessel schedules.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white cursor-pointer">
                  <iframe 
                    title="Mission to Seafarers Halifax Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.2629471138245!2d-63.56839968446387!3d44.63248697909985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a2233f28325db%3A0xc3c5dd3b603eb61!2s844%20Marginal%20Rd%2C%20Halifax%2C%20NS%20B3H%204M8!5e0!3m2!1sen!2sca!4v1615560123456!5m2!1sen!2sca" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy">
                  </iframe>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}