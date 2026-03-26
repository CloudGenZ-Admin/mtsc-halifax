import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaTrophy, FaMedal, FaAward, FaCamera, FaQuoteLeft 
} from 'react-icons/fa';

export default function Awards() {
  const location = useLocation();

  // This hook ensures that when you click a dropdown link, the page scrolls smoothly to the correct section!
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Inner Page Hero */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531686264889-56fdcabd163f?w=1200&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              <FaTrophy /> Recognition & Excellence
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
              Celebrating Our <span className="text-coral">Outstanding Team</span>
            </h1>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* VOLUNTEER AWARDS SECTION */}
        {/* ------------------------------------------- */}
        <section id="volunteer-awards" className="py-24 bg-white scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="text-center mb-16">
              <h2 className="text-[36px] font-black text-navy mb-4">Volunteer Awards</h2>
              <p className="text-text-mid max-w-2xl mx-auto text-[17px]">
                Recognizing the selfless individuals who generously contribute their time to support the welfare of seafarers arriving in Halifax.
              </p>
            </Reveal>

            <div className="space-y-12">
              
              {/* 2024 & 2023 Awards (Grid Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 2024 */}
                <Reveal className="bg-warm-gray rounded-[24px] p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all border-t-4 border-coral relative">
                  <FaMedal className="absolute top-6 right-6 text-4xl text-coral/20" />
                  <span className="inline-block bg-white text-coral font-extrabold text-xs px-3 py-1 rounded-md shadow-sm mb-4">2024</span>
                  <h3 className="text-[20px] font-black text-navy mb-4 leading-tight">ISSC Peter G. Bernard, Q. C. Volunteer Award</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed">
                    For two years in a row, another volunteer of MtS Halifax is this year’s recipient of the prestigious Peter G. Bernard Award. <strong>John Attersley</strong>, a Marine Engineer, received his award from MtS Regional Director Reverend Judith Altree during the 2024 Christmas Luncheon on 11 December 2024.
                  </p>
                </Reveal>

                {/* 2023 */}
                <Reveal className="bg-warm-gray rounded-[24px] p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all border-t-4 border-navy relative">
                  <FaMedal className="absolute top-6 right-6 text-4xl text-navy/10" />
                  <span className="inline-block bg-white text-navy font-extrabold text-xs px-3 py-1 rounded-md shadow-sm mb-4">2023</span>
                  <h3 className="text-[20px] font-black text-navy mb-4 leading-tight">ISSC Peter G. Bernard, Q. C. Volunteer Award</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed mb-4">
                    MtS Halifax Volunteer <strong>Deacon Art Mitchell</strong> received the ISSC 2023 Peter G. Bernard, Q. C. Volunteer Award during the MtS Christmas Luncheon on 06 December 2023.
                  </p>
                  <div className="bg-white p-4 rounded-xl border border-navy/10">
                    <p className="text-[13px] text-text-mid italic leading-relaxed">
                      “The International Sailors’ Society Canada’s Board of Directors established the “Peter G. Bernard Volunteer Recognition Award” in 2015 to recognize Peter’s contribution to the Society... This annual award seeks to recognize others that generously contribute their time to support the welfare of seafarers.”
                    </p>
                  </div>
                  <p className="text-xs text-text-mid mt-4">
                    Volunteers who have shown an exemplary commitment to improving the welfare of seafarers in a Canadian port are eligible for nomination to this Award.
                  </p>
                </Reveal>
              </div>

              {/* 2022 - Queen's Platinum Jubilee Award (WITH NEW RESPONSIVE GALLERY) */}
              <Reveal className="bg-coral-pale border-2 border-coral/20 rounded-[32px] overflow-hidden shadow-warm">
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h3 className="text-[26px] font-black text-navy leading-tight">Queen Elizabeth II Platinum Award</h3>
                    <span className="bg-coral text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-sm">2022</span>
                  </div>
                  <p className="text-navy text-[16px] leading-relaxed mb-4 font-medium">
                    Five Mission to Seafarers Halifax Volunteers received the Queen’s Platinum Jubilee Award for their significant contribution to Canada, Nova Scotia, and their community. Their selfless dedication and exceptional qualities demonstrated their outstanding service.
                  </p>
                  <p className="text-text-mid text-[15px] leading-relaxed mb-10">
                    In an investiture hosted by the Mission at its Centre on December 19, 2022, The Chair of the Board Alastair Gray and the Mission Manager Helen Glenn presented the Awardees with the Medal. The ceremony is witnessed by the families and friends of the Awardees.
                  </p>

                  {/* --- RESPONSIVE IMAGE GALLERY STARTS HERE --- */}
                  <div>
                    {/* Top Row: 5 Individual Portraits */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-3 md:mb-4">
                      {['Sandra Attersley', 'Norman Picton', 'Susan Picton', 'Colm Stockdale', 'Aurora Ulloa-Parsons'].map((name, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-navy-dark border-[3px] border-white shadow-card">
                          {/* Replace this src with actual portraits later */}
                          <img src="https://images.unsplash.com/photo-1511632765486-a01c80cb8f11?w=400&q=80" alt={name} className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-transparent p-3 md:p-4 pt-12">
                            <FaCamera className="text-coral-light mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[14px]" />
                            <span className="font-bold text-white text-[12px] md:text-[13px] leading-tight block">{name}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row: 1 Large Group Photo */}
                    <div className="group relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/7] bg-navy-dark border-[3px] border-white shadow-card">
                      {/* Replace this src with the actual group photo later */}
                      <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80" alt="Group Photo" className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 bg-gradient-to-t from-navy-dark/95 via-navy-dark/30 to-transparent">
                        <span className="font-black text-white text-[15px] md:text-[19px] mb-1.5 drop-shadow-md">
                          The Awardees with Alastair Gray, Helen Glenn, and Bud Streeter
                        </span>
                        <span className="text-coral-light text-[12px] md:text-[13px] font-extrabold tracking-wider flex items-center gap-1.5">
                          <FaCamera /> @RILEYSMITHPHOTO
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* --- RESPONSIVE IMAGE GALLERY ENDS HERE --- */}

                </div>
              </Reveal>

              {/* 2021 Award */}
              <Reveal className="bg-white border-2 border-warm-gray rounded-[32px] overflow-hidden shadow-card flex flex-col md:flex-row items-stretch">
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                  <span className="inline-block w-fit bg-warm-gray text-navy font-extrabold text-xs px-3 py-1 rounded-md shadow-sm mb-4">2021</span>
                  <h3 className="text-[22px] font-black text-navy mb-4 leading-tight">ISSC Peter G. Bernard, Q. C. Volunteer Award</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed mb-4">
                    MtS Halifax Board Chair <strong>Sandra Attersley</strong> received the ISSC 2021 Peter G. Bernard, Q. C. Volunteer Award.
                  </p>
                  <p className="text-text-mid text-[14px] leading-relaxed italic border-l-4 border-coral pl-4 mb-4 bg-coral-pale/30 p-3 rounded-r-lg">
                    “The International Sailors’ Society Canada’s Board of Directors established the “Peter G. Bernard Volunteer Recognition Award” in 2015... This annual award seeks to recognize others that generously contribute their time to support the welfare of seafarers.”
                  </p>
                  <p className="text-[13px] text-text-mid">
                    Volunteers who have shown an exemplary commitment to improving the welfare of seafarers in a Canadian port are eligible for nomination to this Award.
                  </p>
                </div>
                
                <div className="w-full md:w-[40%] bg-navy-dark relative min-h-[250px]">
                   <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80" alt="Placeholder" className="w-full h-full object-cover opacity-50 mix-blend-overlay absolute inset-0" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                      <FaCamera className="text-3xl mb-3 text-coral-light" />
                      <span className="font-bold text-[13px] bg-navy-dark/90 px-4 py-2 rounded-xl backdrop-blur-sm">
                        Insert Image:<br/>Captain Anthony McGuinness presenting to Sandra Attersley
                      </span>
                   </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* STAFF AWARDS SECTION */}
        {/* ------------------------------------------- */}
        <section id="staff-awards" className="py-24 bg-navy-dark border-t-4 border-coral scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="text-center mb-16">
              <h2 className="text-[36px] font-black text-white mb-4">Staff Awards</h2>
              <p className="text-white/70 max-w-2xl mx-auto text-[17px]">
                Honouring the extraordinary dedication and leadership of our Mission staff.
              </p>
            </Reveal>

            <Reveal className="bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row-reverse items-stretch border-b-8 border-coral">
              
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <FaAward className="text-coral text-3xl" />
                  <span className="bg-coral-pale text-coral font-extrabold text-xs px-3 py-1 rounded-md">2022</span>
                </div>
                <h3 className="text-[26px] font-black text-navy mb-4 leading-tight">Helen Glenn Awarded Queen’s Platinum Jubilee Award</h3>
                <p className="text-text-mid text-[16px] leading-relaxed mb-6">
                  Lieutenant Governor of Nova Scotia Arthur J. LeBlanc, ONS, QC, presents Helen Glenn, Mission Manager, with the Queen’s Platinum Jubilee Medal.
                </p>
                <div className="bg-warm-gray p-6 rounded-2xl border border-navy/10 relative">
                  <FaQuoteLeft className="absolute top-6 left-6 text-coral/20 text-3xl" />
                  <p className="text-navy font-bold italic text-[15px] leading-relaxed relative z-10 pl-8">
                    In his Honour’s letter to Helen, he pointed out “… you have demonstrated exceptional qualities and outstanding service to our Province…”
                  </p>
                  <a href="#" className="inline-block mt-3 pl-8 text-[13px] font-extrabold text-coral hover:text-coral-light transition-colors underline underline-offset-4">
                    Read here the full text of the letter
                  </a>
                </div>
              </div>

              <div className="w-full md:w-[45%] bg-navy relative min-h-[300px]">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" alt="Placeholder" className="w-full h-full object-cover opacity-60 mix-blend-overlay absolute inset-0" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <FaCamera className="text-4xl mb-3 text-coral" />
                    <span className="font-bold text-[14px] bg-navy-dark/90 px-5 py-3 rounded-xl backdrop-blur-sm shadow-xl">
                      Insert Image:<br/>Helen Glenn receiving Medal from Lieutenant Governor
                    </span>
                 </div>
              </div>

            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}