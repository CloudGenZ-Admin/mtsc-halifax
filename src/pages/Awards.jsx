import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaTrophy, FaMedal, FaAward, FaCamera, FaQuoteLeft 
} from 'react-icons/fa';

// --- IMPORTING LOCAL IMAGES ---
import award9Edited from '../assets/Awards/9-edited.jpg';
// NEW: Import for 2023 Award
import award2023Img from '../assets/Awards/53408308979_2d37844ec8_o-1024x683.jpg';

// Jubilee & 2021 Images
import auroraImg from '../assets/Awards/Aurora-Ulloa-Parsons--1024x607.jpg';
import colmImg from '../assets/Awards/Helen-and-Colm-1024x768.jpg';
import normanImg from '../assets/Awards/Helen-and-Norman-998x1024.jpg';
import susanImg from '../assets/Awards/Susan-receiving-award-1024x566.jpg';
import sandraImg from '../assets/Awards/Sandra-receiving-award.jpg';
import groupImg from '../assets/Awards/recipients-of-the-Queen-Elizabeth-lls-Platinum-Jubilee-Medal-with-Helen-Alastair-and-Bud-1024x576.jpg';
import captainTonySandraImg from '../assets/Awards/Captain-Tony-and-Sandra-with-medal-scaled.jpg';

// --- IMPORTING PDF ---
import lgLetterPdf from '../assets/pdf/LG-letter-Helen-Glenn.pdf';

export default function Awards() {
  const location = useLocation();

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

  // Data array for the 2022 Platinum Jubilee gallery
  const platinumAwardees = [
    { name: 'Sandra Attersley', src: sandraImg },
    { name: 'Norman Picton', src: normanImg },
    { name: 'Susan Picton', src: susanImg },
    { name: 'Colm Stockdale', src: colmImg },
    { name: 'Aurora Ulloa-Parsons', src: auroraImg }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Inner Page Hero */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-black">
         
          <div className="absolute inset-0 bg-navy-dark z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531686264889-56fdcabd163f?w=1200&q=80')] bg-cover bg-center z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-20 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              <FaTrophy /> Recognition & Excellence
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto drop-shadow-lg">
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
                <Reveal className="bg-warm-gray rounded-[24px] p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all border-t-4 border-coral relative flex flex-col">
                  <FaMedal className="absolute top-6 right-6 text-4xl text-white drop-shadow-md z-10" />
                  <img src={award9Edited} alt="ISSC Award 2024" className="w-full h-56 object-cover object-center rounded-xl mb-6 shadow-sm border-2 border-white" />
                  <span className="inline-block w-fit bg-white text-coral font-extrabold text-xs px-3 py-1 rounded-md shadow-sm mb-4">2024</span>
                  <h3 className="text-[20px] font-black text-navy mb-4 leading-tight">ISSC Peter G. Bernard, Q. C. Volunteer Award</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed">
                    For two years in a row, another volunteer of MtS Halifax is this year’s recipient of the prestigious Peter G. Bernard Award. <strong>John Attersley</strong>, a Marine Engineer, received his award from MtS Regional Director Reverend Judith Altree during the 2024 Christmas Luncheon on 11 December 2024.
                  </p>
                </Reveal>

                {/* 2023 - UPDATED IMAGE */}
                <Reveal className="bg-warm-gray rounded-[24px] p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all border-t-4 border-navy relative flex flex-col">
                  <FaMedal className="absolute top-6 right-6 text-4xl text-white drop-shadow-md z-10" />
                  <img src={award2023Img} alt="ISSC Award 2023" className="w-full h-56 object-cover object-center rounded-xl mb-6 shadow-sm border-2 border-white" />
                  <span className="inline-block w-fit bg-white text-navy font-extrabold text-xs px-3 py-1 rounded-md shadow-sm mb-4">2023</span>
                  <h3 className="text-[20px] font-black text-navy mb-4 leading-tight">ISSC Peter G. Bernard, Q. C. Volunteer Award</h3>
                  <p className="text-text-mid text-[15px] leading-relaxed mb-4">
                    MtS Halifax Volunteer <strong>Deacon Art Mitchell</strong> received the ISSC 2023 Peter G. Bernard, Q. C. Volunteer Award during the MtS Christmas Luncheon on 06 December 2023.
                  </p>
                  <div className="bg-white p-4 rounded-xl border border-navy/10 mt-auto">
                    <p className="text-[13px] text-text-mid italic leading-relaxed">
                      “The International Sailors’ Society Canada’s Board of Directors established the “Peter G. Bernard Volunteer Recognition Award” in 2015 to recognize Peter’s contribution to the Society... This annual award seeks to recognize others that generously contribute their time to support the welfare of seafarers.”
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* 2022 - Queen's Platinum Jubilee Award */}
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

                  {/* --- RESPONSIVE IMAGE GALLERY --- */}
                  <div>
                    {/* Top Row: 5 Individual Portraits */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-3 md:mb-4">
                      {platinumAwardees.map((awardee, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-black border-[3px] border-white shadow-card">
                          <img 
                            src={awardee.src} 
                            alt={awardee.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          {/* Neutral black gradient (no blue) to make white text readable */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 md:p-4 pt-12">
                            <FaCamera className="text-coral-light mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[14px]" />
                            <span className="font-bold text-white text-[12px] md:text-[13px] leading-tight block">{awardee.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row: 1 Large Group Photo */}
                    <div className="group relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/7] bg-black border-[3px] border-white shadow-card">
                      <img 
                        src={groupImg} 
                        alt="Group Photo of Platinum Jubilee Awardees" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top" 
                      />
                      {/* Neutral black gradient (no blue) */}
                      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <span className="font-black text-white text-[15px] md:text-[19px] mb-1.5 drop-shadow-md">
                          The Awardees with Alastair Gray, Helen Glenn, and Bud Streeter
                        </span>
                        <span className="text-coral-light text-[12px] md:text-[13px] font-extrabold tracking-wider flex items-center gap-1.5">
                          <FaCamera /> @RILEYSMITHPHOTO
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>

              {/* 2021 Award */}
              <Reveal className="bg-white border-2 border-warm-gray rounded-[32px] overflow-hidden shadow-card flex flex-col md:flex-row items-stretch">
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center order-2 md:order-1">
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
                
                {/* 2021 Image */}
                <div className="w-full md:w-[45%] relative min-h-[280px] md:min-h-full order-1 md:order-2 overflow-hidden bg-black">
                   <img 
                     src={captainTonySandraImg} 
                     alt="Captain Anthony McGuinness presenting to Sandra Attersley" 
                     className="w-full h-full object-cover absolute inset-0 object-center" 
                   />
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
                  {/* UPDATED LINK */}
                  <a 
                    href={lgLetterPdf} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-3 pl-8 text-[13px] font-extrabold text-coral hover:text-coral-light transition-colors underline underline-offset-4"
                  >
                    Read here the full text of the letter
                  </a>
                </div>
              </div>

              {/* Removed blue filters from placeholder as well */}
              <div className="w-full md:w-[45%] relative min-h-[300px] bg-black">
                 <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" alt="Placeholder for Helen Staff Award" className="w-full h-full object-cover absolute inset-0" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-black/40">
                    <FaCamera className="text-4xl mb-3 text-coral" />
                    <span className="font-bold text-[14px] bg-black/70 px-5 py-3 rounded-xl backdrop-blur-sm shadow-xl">
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