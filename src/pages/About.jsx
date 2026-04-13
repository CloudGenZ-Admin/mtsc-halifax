import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaAnchor, FaHeart, FaHandsHelping, FaUsers, 
  FaCheckCircle, FaPrayingHands, FaShip, FaUserTie,
  FaChevronLeft, FaChevronRight, FaUserShield
} from 'react-icons/fa';

// Import existing images
import unseenWorkforceImg from '../assets/Awards/life-sea-chaplain-messages.webp';
import volunteersImg from '../assets/Awards/seafarers-ondeck-working-min.webp';

// ==========================================
// IMPORT GALLERY IMAGES (AMENITIES)
// ==========================================
import bicyclesImg from '../assets/Amenities - Bicycles for Loan.jpg';
import canteenImg from '../assets/Amenities - Canteen-Souvenir Shop.jpg';
import chapelImg from '../assets/Amenities - Chapel-Prayer Room.jpg';
import transportImg from '../assets/Amenities - Complimentary Transport Service.jpg';
import conferenceImg from '../assets/Amenities - Conference Space.jpg';
import freeRoomImg from '../assets/Amenities - Free Room.jpg';
import basketballImg from '../assets/Amenities - Half Court Basketball 2.jpg';
import loungeImg from '../assets/Amenities - Lounge.jpg';
import sunDeckImg from '../assets/Amenities - Sun Deck.jpg';

export default function About() {

  // Gallery Data Array
  const amenitiesGallery = [
    { id: 1, img: loungeImg, title: 'Comfortable Lounge' },
    { id: 2, img: canteenImg, title: 'Canteen & Souvenir Shop' },
    { id: 3, img: freeRoomImg, title: 'Free Wi-Fi & Computers Room' },
    { id: 4, img: chapelImg, title: 'Chapel & Prayer Room' },
    { id: 5, img: transportImg, title: 'Complimentary Transport' },
    { id: 6, img: bicyclesImg, title: 'Bicycles for Loan' },
    { id: 7, img: basketballImg, title: 'Half Court Basketball' },
    { id: 8, img: sunDeckImg, title: 'Outdoor Sun Deck' },
    { id: 9, img: conferenceImg, title: 'Conference Space' },
  ];

  // Carousel Scroll Reference & Functions
  const carouselRef = useRef(null);

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      
      <main className="flex-grow">
        {/* Inner Page Hero */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=85')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
            <span className="inline-block bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              ✦ MTSC Halifax 
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto">
              A Welcoming Harbour for <span className="text-coral">Seafarers in Halifax</span>
            </h1>
          </div>
        </section>

        {/* 1. About the Station */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl font-black text-navy mb-6">About the Station</h2>
                <div className="space-y-5 text-text-mid text-[16px] leading-relaxed">
                  <p>
                    The Mission to Seafarers Halifax exists to support the men and women who arrive in the Port of Halifax after long journeys across the world’s oceans.
                  </p>
                  <p>
                    More than <strong>90% of the world’s goods are transported by sea</strong>, carried by nearly two million seafarers who spend months away from home to keep supply chains moving.
                  </p>
                  <p>
                    When ships arrive in Halifax, crews often have little time ashore and limited opportunities to connect with the outside world. The Mission to Seafarers Halifax provides a place where seafarers can step away from the demands of ship life, reconnect with family, and receive practical and pastoral support.
                  </p>
                  <p>
                    Rooted in Halifax’s maritime community, our centre serves seafarers of all nationalities, cultures, and faiths. While our work is local, we are proud to be part of Mission to Seafarers Canada and the global Mission to Seafarers network, which supports seafarers in ports around the world.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-[24px] overflow-hidden aspect-square md:aspect-[4/5] shadow-warm">
                  <img src={volunteersImg} alt="MTSC Halifax Station Team" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-coral text-white rounded-2xl p-6 shadow-card min-w-[200px]">
                  <FaAnchor className="text-3xl mb-2" />
                  <strong className="block text-lg font-black">A Global Network</strong>
                  <span className="text-sm font-medium opacity-90">Local support, global reach</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2 & 3. Mission & Vision */}
        <section className="py-12 bg-warm-gray">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-navy rounded-3xl p-10 md:p-14 shadow-card hover:-translate-y-1 transition-transform">
                <h3 className="text-coral text-sm font-extrabold tracking-widest uppercase mb-3">Our Mission</h3>
                <p className="text-white/90 text-[17px] leading-relaxed mb-6">
                  To care for and support seafarers visiting the Port of Halifax by offering a welcoming environment where they can rest, communicate with loved ones, and access practical assistance and pastoral care during their time in port.
                </p>
                <p className="text-white/70 text-[15px] leading-relaxed">
                  Through our station ship visits, and outreach services, we strive to ensure that every seafarer who arrives in Halifax feels supported and valued.
                </p>
              </div>
              
              <div className="bg-coral rounded-3xl p-10 md:p-14 shadow-warm hover:-translate-y-1 transition-transform">
                <h3 className="text-navy-dark text-sm font-extrabold tracking-widest uppercase mb-3">Our Vision</h3>
                <p className="text-white text-[22px] font-bold leading-snug">
                  To be a trusted place of welcome and care for seafarers visiting Halifax, where every crew member arriving in port can find support, connection, and a sense of belonging.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Support Section (Replaced Core Values) */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="text-center mb-16">
              <h2 className="text-[36px] font-black text-navy mb-4">We Support the World’s Seafarers Docking in Halifax</h2>
              <p className="text-text-mid max-w-2xl mx-auto text-[17px]">
                With practical, emotional, and spiritual support at Canadian ports, ensuring no seafarer is alone.
              </p>
            </Reveal>

            <Reveal className="flex flex-wrap justify-center gap-6">
              {[
                { icon: FaHandsHelping, text: 'Mission to Seafarers provides practical support' },
                { icon: FaHeart, text: 'Mission to Seafarers helps with mental and emotional health' },
                { icon: FaPrayingHands, text: 'Mission to Seafarers provides spiritual care' },
                { icon: FaUserShield, text: 'Mission to Seafarers provides advocacy and rights support' },
                { icon: FaUsers, text: 'Mission to Seafarers provides community connection' }
              ].map((value, idx) => (
                <div key={idx} className="bg-warm-gray w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] border-2 border-transparent hover:border-coral/20 rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-coral text-2xl mb-5 shadow-sm">
                    <value.icon />
                  </div>
                  <p className="text-[16px] font-bold text-navy leading-relaxed">{value.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* 4. Meet the Team */}
        <section className="py-20 bg-warm-gray">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="text-center mb-14">
              <h2 className="text-[36px] font-black text-navy mb-4">Meet the Team</h2>
              <p className="text-text-mid max-w-2xl mx-auto">
                The dedicated staff ensuring a warm and hospitable welcome for every seafarer visiting Halifax.
              </p>
            </Reveal>

            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-10 text-center shadow-card hover:-translate-y-1 transition-transform border border-navy/5">
                <div className="w-24 h-24 bg-coral-pale text-coral rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  <FaUserTie />
                </div>
                <h3 className="text-2xl font-black text-navy mb-2">Helen</h3>
                <p className="text-coral font-bold uppercase tracking-widest text-sm">Station Manager</p>
              </div>

              <div className="bg-white rounded-3xl p-10 text-center shadow-card hover:-translate-y-1 transition-transform border border-navy/5">
                <div className="w-24 h-24 bg-coral-pale text-coral rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  <FaUserTie />
                </div>
                <h3 className="text-2xl font-black text-navy mb-2">Joseph</h3>
                <p className="text-coral font-bold uppercase tracking-widest text-sm">Assistant Manager</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. Board Members */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 relative">
                <div className="rounded-3xl overflow-hidden shadow-card aspect-square">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Board Meeting" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-6 -right-6 bg-navy text-white p-5 rounded-2xl shadow-xl">
                  <FaUserTie className="text-3xl text-coral mb-2" />
                  <span className="font-bold">Strategic Leadership</span>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-10">
                <h2 className="text-[32px] font-black text-navy mb-6">Board of Directors</h2>
                <div className="space-y-4 text-text-mid text-[15.5px] leading-relaxed">
                  <p>
                    The Mission to Seafarers Halifax is guided by a dedicated Board of Directors made up of leaders from the maritime industry and the Halifax community. Their experience, leadership, and commitment help ensure that the station continues to serve seafarers visiting the Port of Halifax with care, integrity, and accountability.
                  </p>
                  <p>
                    Working closely with the Station Manager, the Board provides strategic direction, governance, and oversight, while also helping strengthen relationships with local maritime partners, port authorities, and community supporters.
                  </p>
                  <p>
                    Through their guidance and advocacy, the Board plays an important role in advancing the Mission’s work and ensuring that seafarers arriving in Halifax find a place of welcome and support during their time in port.
                  </p>
                  <p className="font-bold text-coral pt-2">
                    We are grateful for their leadership and continued commitment to the welfare of seafarers.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* CAROUSEL SECTION (AMENITIES)                */}
        {/* ------------------------------------------- */}
        <section className="py-24 text-navy-dark bg-warm-gray border-y border-white/10 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-7">
            
            {/* Header */}
            <Reveal className="mb-12 text-center md:text-left">
              <div className="max-w-2xl mx-auto md:mx-0">
                <span className="inline-block bg-white/10 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                  OUR FACILITIES
                </span>
                <h2 className="text-[36px] font-black mb-4 leading-tight">Comfort & Care for Seafarers</h2>
                <p className="text-text-mid  text-[16px] leading-relaxed">
                  We offer a variety of amenities designed to provide a relaxing and welcoming environment for seafarers arriving in the Port of Halifax.
                </p>
              </div>
            </Reveal>

            {/* Carousel Container */}
            <Reveal delay={100}>
              <div className="relative group">
                
                {/* Left Arrow Button */}
                <button 
                  onClick={scrollPrev}
                  className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-coral text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-navy transition-all hover:scale-110 active:scale-95"
                  aria-label="Previous Facility"
                >
                  <FaChevronLeft className="text-lg pr-1" />
                </button>

                {/* Right Arrow Button */}
                <button 
                  onClick={scrollNext}
                  className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-coral text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-navy transition-all hover:scale-110 active:scale-95"
                  aria-label="Next Facility"
                >
                  <FaChevronRight className="text-lg pl-1" />
                </button>

                {/* Carousel Track */}
                <div 
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-4 px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
                >
                  <style dangerouslySetInnerHTML={{__html: `
                    div::-webkit-scrollbar { display: none; }
                  `}} />

                  {amenitiesGallery.map((item) => (
                    <div 
                      key={item.id} 
                      className="relative flex flex-col overflow-hidden rounded-2xl bg-navy border border-white/10 shadow-lg shrink-0 snap-center sm:snap-start
                                 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                      {/* The Image (No dark filter) */}
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          draggable="false" 
                        />
                      </div>
                      
                      {/* Card Content (Title placed below the image) */}
                      <div className="p-5 text-center flex-grow flex items-center justify-center">
                        <h3 className="text-white font-bold text-[18px] leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
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