import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaHandshake, FaStar, FaBuilding, FaGlobeAmericas, FaHeart, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

export default function Sponsors() {
  const location = useLocation();

  // Smooth scrolling for dropdown anchor links
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

  const generalSponsors = [
    "100 Bluenosers Who Care", "AON", "Associated Cargo Specialists", "Atlantic Towing Ltd", 
    "Atship Services Ltd.", "Atlantic Container Line", "Atlantic Pilotage Authority", 
    "Blue Water Agencies Ltd.", "CN", "CERES", "Canadian Institute of Marine Engineering", 
    "Canadian Steamship Lines", "Colley Motorships Ltd.", "Diocese Synod of NS and PEI", 
    "Edmonds Landscape & Construction Services Ltd", "F.K. Warren Ltd.", "Flying Angel Fund", 
    "Freight Checkers Union 1342", "Halifax Marriot Habourside Hotel", "Halifax Pilots", 
    "Halifax Port Authority", "Horizon Maritime Services", "ILA 269 Halifax Long Shoreman’s Association", 
    "Inchcape Shipping Services", "International Sailor’s Society Canada", "ITF Seafarer’s Trust", 
    "Logistec Stevedoring", "Maritime World Logistics", "Mark & Dr. Joanne MacDonald", 
    "Metcalf & Company", "Mothers Union of NS and PEI", "MV Asterix", "NAMMA", "NICOM IT", 
    "Open Church/Reachout Society for Humanitarian Aid", "Partner International Inc.", 
    "P & H Milling Group", "PRAXES Medical Group", "PSA HALIFAX", "Protos Shipping Ltd.", 
    "Quay Marine Associates", "RCR", "Secunda", "Stewart Mckelvey", "The Company of Master Mariners", 
    "The Shipping Federation of Canada", "TK Foundation", "UNIFOR Marine Workers Union", 
    "Vanco Farms", "Wallenius Willhelmsen Logistics", "ZIM Integrated Shipping Services Ltd."
  ];

  const starSponsors = [
    "Atlantic Towing Ltd", "Atship Services Ltd", "Atlantic Container Line", 
    "Atlantic Pilotage Authority", "Blue Water Agencies Ltd.", "Canadian Institute of Marine Engineering", 
    "Canadian Steamship Lines", "Colley Motorships Ltd", "CN", "Diocese Synod of NS & PE", 
    "Edmonds Landscape & Construction Services Ltd.", "F.K.Warren Ltd", "The Halifax Pilots", 
    "Halifax Port Authority", "Hapag Lloyd (Canada) Ltd.", "Holland America Line", "LeeWay Marine", 
    "Logistec Stevedoring", "Metcalf & Company", "International Sailors’ Society Canada", 
    "Northrop Grumman", "Partner International Inc.", "P & H Milling Group", "Protos Shipping Ltd.", 
    "Spectacle Group", "Svitzer Canada Ltd.", "Wallenius Willhelmsen Logistics", 
    "ZIM Integrated Shipping Services Ltd."
  ];

  // Carousel Refs and Functions
  const starCarouselRef = useRef(null);

  const scrollStarPrev = () => {
    if (starCarouselRef.current) {
      starCarouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollStarNext = () => {
    if (starCarouselRef.current) {
      starCarouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a1a2c] z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#112A46] via-transparent to-transparent z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-[#E05A2B]/20 text-[#f48c6f] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-[#E05A2B]/30">
              <FaHandshake /> Community & Corporate Partners
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
              Our <span className="text-[#E05A2B]">Sponsors</span> & Partners
            </h1>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* PART 1: GENERAL SPONSORS */}
        {/* ------------------------------------------- */}
        <section id="our-sponsors" className="py-24 bg-[#F8FBFD] scroll-mt-20 border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="text-center mb-14">
              <FaHeart className="text-[#E05A2B] text-4xl mx-auto mb-4" />
              <h2 className="text-[34px] md:text-[40px] font-black text-[#112A46] mb-4 leading-tight">
                The Mission to Seafarers Halifax is <br className="hidden md:block"/> grateful to our Sponsors!
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-[17px] font-medium">
                Your generous support ensures we can continue to provide a "home away from home" for seafarers visiting our port.
              </p>
            </Reveal>

            {/* General Sponsors Grid */}
            <Reveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {generalSponsors.map((sponsor, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-[#112A46]/5 rounded-xl px-4 py-3 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group h-full min-h-[70px]"
                >
                  <span className="font-bold text-[12.5px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-snug">
                    {sponsor}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* PART 2: CORPORATE SPONSORSHIP & STAR CLUB */}
        {/* ------------------------------------------- */}
        <section id="corporate-sponsorship" className="py-24 bg-white border-t-4 border-[#E05A2B] scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-7">
            
            {/* Split Sponsorship Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <Reveal>
                <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm mb-4 block">Get Involved</span>
                <h2 className="text-[36px] font-black text-[#112A46] leading-tight mb-6">
                  Corporate Sponsorship Opportunities
                </h2>
                <p className="text-gray-600 text-[16px] leading-relaxed mb-6 font-medium">
                  Partnering with the Mission will provide your organization with extraordinary and rewarding relationship opportunities on both a local and global stage.
                </p>
                <p className="text-gray-600 text-[16px] leading-relaxed mb-8 font-medium">
                  Our team is happy to work with you to find a fit that realizes your philanthropic corporate social responsibility goal. Please check out how to become a community sponsor through our <strong className="text-[#112A46]">STAR PROGRAM</strong> and/or <strong className="text-[#112A46]">CORPORATE SPONSORSHIP PACKAGE</strong>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-[#FDF0EC] px-5 py-3 rounded-xl border border-[#E05A2B]/20">
                    <FaGlobeAmericas className="text-[#E05A2B] text-xl" />
                    <span className="font-bold text-[14px] text-[#112A46]">Global Reach</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#FDF0EC] px-5 py-3 rounded-xl border border-[#E05A2B]/20">
                    <FaBuilding className="text-[#E05A2B] text-xl" />
                    <span className="font-bold text-[14px] text-[#112A46]">Local Impact</span>
                  </div>
                </div>
              </Reveal>

              {/* Program Cards */}
              <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#E05A2B] border-2 border-[#E05A2B] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <FaStar className="text-3xl text-[#E05A2B]" />
                  </div>
                  <h3 className="text-[18px] font-black text-white mb-3 leading-tight">STAR<br/>Program</h3>
                  <p className="text-[13px] text-white/90 mb-6 leading-relaxed font-medium">
                    Join an elite group of recurring sponsors dedicated to seafarer welfare.
                  </p>
                </div>

                <div className="bg-[#112A46] border-2 border-[#112A46] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <FaHandshake className="text-3xl text-white" />
                  </div>
                  <h3 className="text-[18px] font-black text-white mb-3 leading-tight">Corporate<br/>Package</h3>
                  <p className="text-[13px] text-white/70 mb-6 leading-relaxed font-medium">
                    Customized sponsorship packages designed for maximum CSR impact.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* SCROLLABLE HORIZONTAL CAROUSEL FOR STAR CLUB MEMBERS */}
            <div className="bg-[#F8FBFD] rounded-[32px] py-12 md:py-16 px-6 md:px-14 border border-[#112A46]/5 shadow-sm relative">
              <Reveal className="text-center mb-10">
                <div className="inline-flex items-center justify-center gap-2 text-[#E05A2B] mb-4">
                  <FaStar /><FaStar className="text-2xl" /><FaStar />
                </div>
                <h3 className="text-[32px] font-black text-[#112A46] mb-4">Star Club Members</h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-[16px] font-medium">
                  THANK YOU to our sponsors without whom we could not offer our service.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="relative group">
                  
                  {/* Left Arrow */}
                  <button
                    onClick={scrollStarPrev}
                    className="absolute -left-3 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-lg flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                    aria-label="Previous Sponsor"
                  >
                    <FaChevronLeft className="pr-1" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={scrollStarNext}
                    className="absolute -right-3 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-lg flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                    aria-label="Next Sponsor"
                  >
                    <FaChevronRight className="pl-1" />
                  </button>

                  {/* Scrollable Container */}
                  <div
                    ref={starCarouselRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {/* Hide Scrollbar for Webkit */}
                    <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />
                    
                    {starSponsors.map((sponsor, index) => (
                      <div 
                        key={index} 
                        className="shrink-0 snap-center sm:snap-start w-[240px] md:w-[280px] bg-white border border-gray-100 rounded-2xl px-6 py-8 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group min-h-[120px]"
                      >
                        <span className="font-extrabold text-[15px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-tight">
                          {sponsor}
                        </span>
                      </div>
                    ))}
                  </div>
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