import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react"; 
import { Link } from "react-router-dom";
import { getMediaUrl } from "../../services/payloadApi";

import seaBg from '../../assets/sea1.jpg'; 

export default function Hero({ data }) {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

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

  const skylineUrl = getMediaUrl(data?.skyline_image, null);
  const heroImageUrl = getMediaUrl(data?.hero_image, null);

  const eyebrowBadge = data?.eyebrow_badge;
  const titleLine1 = data?.title_line_1;
  const titleLine2 = data?.title_line_2;
  const heroStrongText = data?.hero_strong_text;
  const heroParagraph = data?.hero_paragraph;
  const badgeNumber = data?.hero_badge_number;
  const badgeText1 = data?.hero_badge_text_1;
  const badgeText2 = data?.hero_badge_text_2;
  const contactBtnText = data?.hero_contact_button_text;
  const contactBtnUrl = data?.hero_contact_button_url || "/contact";
  const donateBtnText = data?.hero_donate_button_text;

  return (
    <>
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `}</style>

      <section 
        className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat bg-white"
        style={{ backgroundImage: `url("${seaBg}")` }}
      >
        <div className="absolute inset-0 w-full h-full bg-white/70 backdrop-blur-[2px] z-0" />

        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-coral/10 blur-3xl z-0" />
        <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-navy/10 blur-3xl z-0" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT COLUMN: Text Content */}
            <div className="flex flex-col items-start w-full order-1">
              
              {/* Skyline & Eyebrow Badge */}
              <div className="mb-6 flex flex-col items-start">
                {skylineUrl && (
                  <img
                    src={skylineUrl}
                    alt="Halifax Skyline"
                    aria-hidden="true"
                    className="w-32 md:w-40 mb-2 opacity-80 animate-float-fast object-contain"
                    loading="lazy"
                  />
                )}
                {eyebrowBadge && (
                  <span className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur px-3 py-1.5 rounded-md font-bold text-sm text-coral border border-white/50 shadow-sm">
                    {eyebrowBadge}
                  </span>
                )}
              </div>

              {/* Main Headline */}
              {(titleLine1 || titleLine2) && (
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-navy leading-[1.1] mb-6">
                  {titleLine1} {titleLine1 && titleLine2 && <br className="hidden sm:block" />}
                  {titleLine2 && (
                    <span className="relative inline-block text-coral mt-2 sm:mt-0 whitespace-nowrap">
                      {titleLine2}
                      <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                        <path d="M2 7 Q50 1, 100 5 T198 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                      </svg>
                    </span>
                  )}
                </h1>
              )}
              
              {/* Paragraphs */}
              <div className="text-lg md:text-xl text-navy/90 leading-relaxed max-w-xl font-medium space-y-4">
                {heroStrongText && (
                  <div className="text-navy font-bold text-xl md:text-2xl block mb-6">
                    {heroStrongText}
                  </div>
                )}
                {heroParagraph && (
                  <div className="[&>p]:mb-4">
                    <p className="whitespace-pre-line">{heroParagraph}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
                {contactBtnText && (
                  <Link 
                    to={contactBtnUrl} 
                    className="inline-flex justify-center items-center px-8 py-3.5 bg-coral text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-coral-light hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
                  >
                    {contactBtnText} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
                
                {donateBtnText && (
                  <button 
                    onClick={() => setIsDonateModalOpen(true)}
                    className="inline-flex justify-center items-center px-8 py-3.5 bg-white/50 backdrop-blur border-2 border-navy text-navy font-bold rounded-lg hover:bg-navy hover:text-white hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center cursor-pointer"
                  >
                    {donateBtnText}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Image */}
            {heroImageUrl && (
              <div className="relative w-full max-w-md mx-auto lg:max-w-none order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[4/5] border-4 border-white/40 animate-float-slow">
                  <img
                    src={heroImageUrl}
                    alt="Mission to Seafarers Halifax Mission and Staff"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 to-transparent" />
                </div>

                {/* Floating Legacy Badge */}
                {(badgeNumber || badgeText1 || badgeText2) && (
                  <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:top-8 lg:-right-8 bg-coral text-white rounded-full h-24 w-24 sm:h-28 sm:w-28 flex flex-col items-center justify-center shadow-xl rotate-[12deg] border-4 border-white z-20 animate-float-fast">
                    {badgeText1 && (
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-90">
                        {badgeText1}
                      </span>
                    )}
                    {badgeNumber && (
                      <span className="text-2xl sm:text-3xl font-black leading-none my-0.5">
                        {badgeNumber}
                      </span>
                    )}
                    {badgeText2 && (
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-90">
                        {badgeText2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>

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
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 p-3 rounded-full transition-colors focus:outline-none cursor-pointer"
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
    </>
  );
}