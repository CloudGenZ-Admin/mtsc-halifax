import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaHandshake, FaStar, FaBuilding, FaEnvelopeOpenText, FaGlobeAmericas, FaHeart 
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              <FaHandshake /> Community & Corporate Partners
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
              Our <span className="text-coral">Sponsors</span> & Partners
            </h1>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* PART 1: GENERAL SPONSORS */}
        {/* ------------------------------------------- */}
        <section id="our-sponsors" className="py-24 bg-warm-gray scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="text-center mb-14">
              <FaHeart className="text-coral text-4xl mx-auto mb-4" />
              <h2 className="text-[34px] md:text-[40px] font-black text-navy mb-4 leading-tight">
                The Mission to Seafarers Halifax is <br className="hidden md:block"/> grateful to our Sponsors!
              </h2>
              <p className="text-text-mid max-w-2xl mx-auto text-[17px]">
                Your generous support ensures we can continue to provide a "home away from home" for seafarers visiting our port.
              </p>
            </Reveal>

            {/* General Sponsors Grid */}
            <Reveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {generalSponsors.map((sponsor, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-navy/5 rounded-xl px-4 py-3 flex items-center justify-center text-center shadow-sm hover:shadow-card hover:border-coral/30 hover:-translate-y-1 transition-all group h-full min-h-[70px]"
                >
                  <span className="font-bold text-[12.5px] text-navy group-hover:text-coral transition-colors leading-snug">
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
        <section id="corporate-sponsorship" className="py-24 bg-white border-t-4 border-coral scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-7">
            
            {/* Split Sponsorship Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <Reveal>
                <h2 className="text-[36px] font-black text-navy leading-tight mb-6">
                  Corporate Sponsorship Opportunities
                </h2>
                <p className="text-text-mid text-[16px] leading-relaxed mb-6">
                  Partnering with the Mission will provide your organization with extraordinary and rewarding relationship opportunities on both a local and global stage.
                </p>
                <p className="text-text-mid text-[16px] leading-relaxed mb-8">
                  Our team is happy to work with you to find a fit that realizes your philanthropic corporate social responsibility goal. Please check out how to become a community sponsor through our <strong>STAR PROGRAM</strong> and/or <strong>CORPORATE SPONSORSHIP PACKAGE</strong>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-coral-pale px-5 py-3 rounded-xl border border-coral/20">
                    <FaGlobeAmericas className="text-coral text-xl" />
                    <span className="font-bold text-[14px] text-navy">Global Reach</span>
                  </div>
                  <div className="flex items-center gap-3 bg-coral-pale px-5 py-3 rounded-xl border border-coral/20">
                    <FaBuilding className="text-coral text-xl" />
                    <span className="font-bold text-[14px] text-navy">Local Impact</span>
                  </div>
                </div>
              </Reveal>

              {/* Program Cards */}
              <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-coral border-2 border-coral rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-warm group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <FaStar className="text-3xl text-coral" />
                  </div>
                  <h3 className="text-[18px] font-black text-white mb-3 leading-tight">STAR<br/>Program</h3>
                  <p className="text-[13px] text-white/90 mb-6 leading-relaxed">
                    Join an elite group of recurring sponsors dedicated to seafarer welfare.
                  </p>
                  {/* <a href="#contact" className="text-navy-dark font-extrabold text-[13px] hover:text-white transition-colors underline underline-offset-4">Join the Club</a> */}
                </div>

                <div className="bg-navy border-2 border-navy rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-card group">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <FaHandshake className="text-3xl text-white" />
                  </div>
                  <h3 className="text-[18px] font-black text-white mb-3 leading-tight">Corporate<br/>Package</h3>
                  <p className="text-[13px] text-white/70 mb-6 leading-relaxed">
                    Customized sponsorship packages designed for maximum CSR impact.
                  </p>
                  {/* <a href="#contact" className="text-coral-light font-extrabold text-[13px] hover:text-white transition-colors underline underline-offset-4">Request Info</a> */}
                </div>
              </Reveal>
            </div>

            {/* Star Club Members Section */}
            <div className="bg-warm-gray rounded-[32px] p-8 md:p-14 border border-navy/5 shadow-sm">
              <Reveal className="text-center mb-12">
                <div className="inline-flex items-center justify-center gap-2 text-coral mb-4">
                  <FaStar /><FaStar className="text-2xl" /><FaStar />
                </div>
                <h3 className="text-[32px] font-black text-navy mb-4">Star Club Members</h3>
                <p className="text-text-mid max-w-2xl mx-auto text-[16px] font-medium">
                  THANK YOU to our sponsors without whom we could not offer our service.
                </p>
              </Reveal>

              <Reveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {starSponsors.map((sponsor, index) => (
                  <div 
                    key={index} 
                    className="bg-white border-2 border-transparent rounded-xl px-4 py-3 flex items-center justify-center text-center shadow-sm hover:shadow-card hover:border-coral/20 hover:-translate-y-1 transition-all group"
                  >
                    <span className="font-extrabold text-[13px] text-navy group-hover:text-coral transition-colors leading-tight">
                      {sponsor}
                    </span>
                  </div>
                ))}
              </Reveal>
            </div>
            
          </div>
        </section>

        {/* Call to Action */}
        {/* <section id="contact" className="py-20 bg-coral">
          <div className="max-w-[800px] mx-auto px-7 text-center">
            <Reveal>
              <FaEnvelopeOpenText className="text-5xl text-white/50 mx-auto mb-6" />
              <h2 className="text-[32px] md:text-[40px] font-black text-white mb-6 leading-tight">
                Ready to make a difference?
              </h2>
              <p className="text-white/90 text-[17px] mb-10 max-w-2xl mx-auto">
                We would be pleased to set up a meeting time to address your queries and explore how your organization can partner with us.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-navy-dark text-white px-8 py-4 rounded-full font-extrabold text-[14px] tracking-wide hover:bg-[#0f1c4a] hover:-translate-y-1 shadow-lg transition-all"
              >
                SET UP A MEETING
              </a>
            </Reveal>
          </div>
        </section> */}

      </main>
      <Footer />
    </div>
  );
}