import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaCalendarAlt, FaCamera, FaQuoteLeft, FaArrowLeft, FaArrowRight, FaShip, FaGlobeAmericas
} from 'react-icons/fa';

export default function DayOfTheSeafarer() {
  const location = useLocation();

  // Smooth scrolling for page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Reusable Gallery Component to keep the code clean!
  const EventGallery = ({ images }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {images.map((img, i) => (
        <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy border-2 border-white shadow-card">
          <img 
            src={img.src} 
            alt={img.caption || "Event Photo"} 
            className="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" 
          />
          {img.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-transparent p-4 pt-12">
              <FaCamera className="text-coral-light mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[14px]" />
              <span className="font-bold text-white text-[13px] leading-tight block">{img.caption}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white">
        
        {/* Inner Page Hero */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              <FaCalendarAlt /> Annual Event
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
              Day of the <span className="text-coral">Seafarer</span>
            </h1>
            <p className="text-white/80 text-[17px] font-medium max-w-2xl mx-auto">
              Recognizing the invaluable contribution seafarers make to international trade and the world economy, often at great personal cost to themselves and their families.
            </p>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* INTRO & IMO SECTION */}
        {/* ------------------------------------------- */}
        <section className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="bg-warm-gray rounded-[32px] p-8 md:p-12 shadow-sm border border-navy/5 relative overflow-hidden">
              <FaGlobeAmericas className="absolute -bottom-10 -right-10 text-[180px] text-navy/5" />
              <div className="relative z-10">
                <h2 className="text-[28px] font-black text-navy mb-5 flex items-center gap-3">
                  <FaShip className="text-coral" /> The International Maritime Organization (IMO)
                </h2>
                <p className="text-text-mid text-[16px] leading-relaxed mb-6">
                  25 June of each year is the “Day of the Seafarer”. The Mission to Seafarers Halifax joins the International Maritime Organization (IMO) in the yearly observance. This international campaign pays tribute to over 1.5 million seafarers worldwide for their unique and all-too-often overlooked contribution to the well-being of people and economies participating and benefitting from international trade.
                </p>
                <p className="text-text-mid text-[16px] leading-relaxed">
                  For several years, we are joined in our celebration by the Filipino-Canadian friends of the Mission who prepared Filipino food treats. During the Covid-19 pandemic, Tim Horton’s donuts were delivered to ships or given to seafarers who come to the Mission on shore leave.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* 2025 SECTION */}
        {/* ------------------------------------------- */}
        <section id="2025" className="py-20 bg-coral-pale border-t-2 border-coral/20">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-coral text-white font-extrabold text-sm px-4 py-1.5 rounded-full shadow-sm">2025</span>
                <h3 className="text-[32px] font-black text-navy leading-tight">‘My Harassment-Free Ship’</h3>
              </div>
              <p className="text-navy text-[16px] leading-relaxed mb-4 font-medium">
                This year’s campaign is a bold initiative to promote a culture of respect and zero tolerance for bullying and harassment (IMO).
              </p>
              <p className="text-text-mid text-[16px] leading-relaxed mb-8">
                The annual luncheon on Seafarers’ Day includes dine-in meals for visiting seafarers and take-out lunches for regular patrons. The Filipino-Canadian Friends of the Mission prepares Filipino home-cooked food.
              </p>
              
              <EventGallery images={[
                { src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&q=80", caption: "2025 Luncheon Preparations" },
                { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80", caption: "Filipino Home-Cooked Food" },
                { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", caption: "Seafarers enjoying the feast" }
              ]} />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* 2024 SECTION */}
        {/* ------------------------------------------- */}
        <section id="2024" className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-navy text-white font-extrabold text-sm px-4 py-1.5 rounded-full shadow-sm">2024</span>
                <h3 className="text-[32px] font-black text-navy leading-tight">Safety Tips at Sea</h3>
              </div>
              <p className="text-text-mid text-[16px] leading-relaxed mb-4">
                The 2024 campaign centred around safety tips at sea. It is important that those who work out at sea also understand the importance of their contribution to making the maritime sector a safer workplace.
              </p>
              <p className="text-text-mid text-[16px] leading-relaxed mb-8">
                This year, the Mission to Seafarers Halifax along with our Filipino-Canadian friends, community partners, and volunteers celebrated the Day of the Seafarers with a hearty luncheon of Filipino dishes and sweets. Member of Parliament Andy Fillmore graced the celebration with his presence and delivered 2,000 Canada pins, which are given for free to seafarers as souvenirs.
              </p>

              <EventGallery images={[
                { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80", caption: "Community Partners & Volunteers" },
                { src: "https://images.unsplash.com/photo-1505682850503-4581d6438dc2?w=600&q=80", caption: "Filipino Sweets & Dishes" },
                { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80", caption: "MP Andy Fillmore delivering Canada pins" }
              ]} />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* 2023 SECTION */}
        {/* ------------------------------------------- */}
        <section id="2023" className="py-20 bg-warm-gray">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-coral text-white font-extrabold text-sm px-4 py-1.5 rounded-full shadow-sm">2023</span>
                <h3 className="text-[32px] font-black text-navy leading-tight">MARPOL at 50 – Our commitment goes on</h3>
              </div>
              <p className="text-text-mid text-[16px] leading-relaxed mb-10">
                Per IMO, the 2023 campaign looks at seafarers’ contribution to protecting the marine environment in line with the World Maritime theme.
              </p>

              {/* Quotes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-8 rounded-2xl shadow-card relative border-t-4 border-navy">
                  <FaQuoteLeft className="absolute top-6 right-6 text-3xl text-navy/5" />
                  <h4 className="font-black text-navy text-[18px] mb-4">Protecting the Marine Environment</h4>
                  <p className="text-text-mid text-[14.5px] italic leading-relaxed mb-4 relative z-10">
                    “As a seafarer I not only think – I also act. I protect the ocean. I am sure the first thing every seafarer has is love of the ocean... Garbage recycling and eco speed are priorities. Every trip I love implementing values to my crew about environmental protection.”
                  </p>
                  <p className="font-bold text-[13px] text-coral">— Captain Meir Dizraeli, ZIM SHEKOU</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-card relative border-t-4 border-coral">
                  <FaQuoteLeft className="absolute top-6 right-6 text-3xl text-coral/10" />
                  <h4 className="font-black text-navy text-[18px] mb-4">A View from the Sea</h4>
                  <p className="text-text-mid text-[14.5px] italic leading-relaxed mb-4 relative z-10">
                    “One of the best thing I experienced working at sea was seeing its beauty in all parts of the world. It is my privilege to share this existence. We are all connected to sea and we are not the only one who benefit from it so we must preserve and protect it for future generations.”
                  </p>
                  <p className="font-bold text-[13px] text-coral">— Capt. Leo-mar T. Reginaldo, M.V. NYK METEOR</p>
                </div>
              </div>

              {/* Specific 2023 Images */}
              <EventGallery images={[
                { src: "https://images.unsplash.com/photo-1494459940152-1e911caa8ea5?w=600&q=80", caption: "Halifax in the Atlantic" },
                { src: "https://images.unsplash.com/photo-1544333323-b1d683dae91c?w=600&q=80", caption: "In the Mediterranean" },
                { src: "https://images.unsplash.com/photo-1588665722485-d688031d2222?w=600&q=80", caption: "X-press Irazu" }
              ]} />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* 2022 SECTION */}
        {/* ------------------------------------------- */}
        <section id="2022" className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-navy-dark text-white font-extrabold text-sm px-4 py-1.5 rounded-full shadow-sm">2022</span>
                <h3 className="text-[32px] font-black text-navy leading-tight">A Return to Gathering</h3>
              </div>
              <p className="text-text-mid text-[16px] leading-relaxed mb-8">
                Together with our Filipino-Canadian friends, a luncheon was hosted on 25 June 2022 at the Mission centre. With mostly Filipino dishes prepared by our Fil-Can friends, packed lunches were sold to patrons and guests and funds raised were donated to the Mission. Seafarers who visited the Mission were treated to free lunch.
              </p>

              <EventGallery images={[
                { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80", caption: "Mission Centre Luncheon" },
                { src: "https://images.unsplash.com/photo-1601625463688-646df7a0ecbb?w=600&q=80", caption: "Packed Lunches Sold" },
                { src: "https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=600&q=80", caption: "Seafarers enjoying free lunch" }
              ]} />
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* PAGINATION / NEXT EVENT NAVIGATION */}
        {/* ------------------------------------------- */}
        <section className="bg-navy-dark border-t border-white/10 py-8">
          <div className="max-w-[1000px] mx-auto px-7 flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link 
              to="/events" 
              className="group flex items-center gap-3 text-white/70 hover:text-coral-light font-bold text-[14px] transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-coral-light transition-colors">
                <FaArrowLeft />
              </div>
              All Events
            </Link>
            
            <Link 
              to="/events#sea-sunday" 
              className="group flex items-center gap-3 text-white hover:text-coral-light font-bold text-[14px] transition-colors text-right"
            >
              Next Event: Sea Sunday
              <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center group-hover:bg-coral-light transition-colors">
                <FaArrowRight className="text-white" />
              </div>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}