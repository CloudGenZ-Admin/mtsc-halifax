import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Reveal from '../components/common/Reveal';

// Import local images for the "Join Our Community" section
import findPortImg from '../assets/img/footer-find-port_1.png';
import prayerWallImg from '../assets/img/footer-prayer-wall.png';
import happySeaImg from '../assets/img/footer-happy-sea.png';
import newsletterImg from '../assets/img/footer-newsletter.png';
import eventCalendarImg from '../assets/img/footer-event-calendar.png';

// Import local SVGs for "How We Support the World's Seafarers in Canada" section
import practicalSupportIcon from '../assets/img/Seafarers/practical-support_1.svg';
import mentalEmotionalIcon from '../assets/img/Seafarers/mental-emotional-help.svg';
import spiritualCareIcon from '../assets/img/Seafarers/spiritual-care.svg';
import advocacyRightsIcon from '../assets/img/Seafarers/advocacy-rights.svg';
import communityConnectionIcon from '../assets/img/Seafarers/community-connection.svg';

// Import local SVGs for "Ways to Get Involved" section
// import iconGiveNow from '../assets/img/Donate/icon-give-now.svg'; // Commented out since Give Now is removed
import iconApplyVolunteer from '../assets/img/Donate/icon-apply-volunteer.svg';
import iconSubscribeNews from '../assets/img/Donate/icon-subscribe-news.svg';
import findPortBgIcon from '../assets/img/Donate/find-port-bg.svg';

// Import local image for "Find a Station" section
import operatingShipsImg from '../assets/img/Seafarers/infgrph-operating-ships.png';

// --- NEW PARTNER PORT LOGOS FOR CAROUSEL ---
import portSydney from '../assets/Corpo/ports/Port-of-Sydney-Canada--768x388.png.webp';
import portGCT from '../assets/Corpo/ports/Global-Container-Terminals-.png.webp';
import portHopa from '../assets/Corpo/ports/hopa-ports-logo-768x388.png';
import portHelm from '../assets/Corpo/ports/logo-helm-768x388.webp';
import portOntario from '../assets/Corpo/ports/logo-ontario-shipyards.webp';
import portPrinceRupert from '../assets/Corpo/ports/logo-prince-rupert.webp';
import portRobertAllan from '../assets/Corpo/ports/logo-robert-allan.png.webp';
import portTK from '../assets/Corpo/ports/logo-tk.webp';
import portNamma from '../assets/Corpo/ports/nammalogo-1024x269.jpg.webp';
import portToronto from '../assets/Corpo/ports/Toronto-Ports-logo-768x305.png';
import portDpWorld from '../assets/Corpo/ports/dpworld-logo.png.webp';

export default function Home() {
  // Array of imported port logos for the carousel
  const partnerLogos = [
    portSydney, portGCT, portHopa, portHelm, portOntario, 
    portPrinceRupert, portRobertAllan, portTK, portNamma, 
    portToronto, portDpWorld
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Mission Tagline */}
        <div className="bg-white py-10 border-b border-coral/10">
          <div className="max-w-[1200px] mx-auto px-7 text-center">
            <p className="text-[clamp(20px,3vw,30px)] font-extrabold text-navy">
              Caring for seafarers,<em className="text-coral not-italic">the unsung heroes of global trade</em>
            </p>
          </div>
        </div>

        {/* Split CTA Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[460px]">
          <Reveal className="relative overflow-hidden flex group cursor-pointer">
            <img src="https://www.missiontoseafarers.org/wp-content/uploads/2020-03-24-14.56.59-1-2400x1800.jpg" alt="Seafarer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="relative z-10 p-12 md:p-14 flex flex-col justify-end w-full bg-gradient-to-t from-white/95 via-white/80 to-transparent">
              <p className="text-[15px] font-semibold text-text-mid mb-1">I am a</p>
              <h2 className="text-[40px] font-black text-coral mb-3 leading-none">Seafarer,</h2>
              <p className="text-[17px] font-semibold text-navy max-w-[280px] mb-6 leading-tight">how do I find a port.. or just a helping hand?</p>
              <a href="/contact" className="bg-coral text-white self-start px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-coral-light shadow-warm transition-all">FIND RESOURCES</a>
            </div>
          </Reveal>
          <Reveal className="relative overflow-hidden flex group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=80" alt="Volunteer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="relative z-10 p-12 md:p-14 flex flex-col justify-end items-end text-right w-full bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-transparent">
              <p className="text-[15px] font-semibold text-white/70 mb-1">I am a</p>
              <h2 className="text-[40px] font-black text-white mb-3 leading-none">Volunteer,</h2>
              <p className="text-[17px] font-semibold text-white/90 max-w-[280px] mb-6 leading-tight">how do I donate, volunteer, or get involved?</p>
              <a href="/volunteer" className="bg-white text-navy self-end px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-warm-gray transition-colors">GET INVOLVED</a>
            </div>
          </Reveal>
        </section>

        {/* Services Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-[url('https://maritimemag.com/wp-content/uploads/2025/05/HalifaxONE-Stork-Aerial-scaled.jpg')] bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-navy-dark/85 z-10"></div>
          <div className="max-w-[1200px] mx-auto px-7 relative z-20">
            <Reveal className="text-center mb-14">
              <h2 className="text-[clamp(28px,4vw,44px)] font-black text-white mb-3.5 leading-tight">How We Support the World's<br/>Seafarers in Canada</h2>
              <p className="text-white/80 text-base max-w-[560px] mx-auto leading-relaxed">As part of a 160+ year legacy, we offer practical, emotional, and spiritual support at Canadian ports, ensuring no seafarer is alone.</p>
            </Reveal>
            
            <Reveal className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-coral border border-coral rounded-2xl p-7 text-center hover:-translate-y-1.5 transition-transform shadow-lg">
                <img src={practicalSupportIcon} alt="Practical Support" className="w-10 h-10 object-contain mx-auto mb-3.5" />
                <h3 className="text-sm font-extrabold text-white mb-2.5">Practical Support</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-4">SIM cards, Wi-Fi, transportation, healthcare and legal assistance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-7 text-center hover:bg-white/20 hover:-translate-y-1.5 transition-all">
                <img src={mentalEmotionalIcon} alt="Mental & Emotional Health" className="w-9 h-9 object-contain mx-auto mb-3" />
                <h3 className="text-sm font-extrabold text-white mb-2.5">Mental & Emotional Health</h3>
                <p className="text-xs text-white/80 leading-relaxed">Crisis support and professional care</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-7 text-center hover:bg-white/20 hover:-translate-y-1.5 transition-all">
                <img src={spiritualCareIcon} alt="Spiritual Care" className="w-9 h-9 object-contain mx-auto mb-3" />
                <h3 className="text-sm font-extrabold text-white mb-2.5">Spiritual Care</h3>
                <p className="text-xs text-white/80 leading-relaxed">Open to all faiths and beliefs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-7 text-center hover:bg-white/20 hover:-translate-y-1.5 transition-all">
                <img src={advocacyRightsIcon} alt="Advocacy & Rights" className="w-9 h-9 object-contain mx-auto mb-3" />
                <h3 className="text-sm font-extrabold text-white mb-2.5">Advocacy & Rights</h3>
                <p className="text-xs text-white/80 leading-relaxed">Protecting seafarer rights</p>
              </div>
              <div className="bg-navy-dark/60 border border-white/20 rounded-2xl p-7 text-center hover:-translate-y-1.5 transition-transform">
                <img src={communityConnectionIcon} alt="Community Connection" className="w-10 h-10 object-contain mx-auto mb-3.5" />
                <h3 className="text-sm font-extrabold text-white mb-2.5">Community Connection</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-4">Centres, shared meals, and local partners creating belonging at ports.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <Stats />

        {/* Sponsor Logos Floating Banner (UPDATED CAROUSEL) */}
        <section className="bg-white py-12 border-b border-navy/10 overflow-hidden relative">
          <div className="max-w-[1200px] mx-auto px-7 mb-8">
            <h3 className="text-center text-[13px] font-extrabold text-text-mid tracking-[0.15em] uppercase">
              Our Proud Sponsors & Partners
            </h3>
          </div>

          <div className="w-full relative">
            <style>
              {`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                  display: flex;
                  width: fit-content;
                  animation: scroll 35s linear infinite;
                }
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
              `}
            </style>
            <div className="animate-scroll items-center gap-16 md:gap-24 px-8">
              {/* Duplicated array to create a seamless infinite loop */}
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
                  alt={`Sponsor Logo ${index}`} 
                  className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer" 
                />
              ))}
            </div>
            {/* White gradient fades on left and right for seamless entrance/exit */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="bg-coral py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <h2 className="text-[38px] font-black text-white leading-none">Ways to Get Involved</h2>
            </Reveal>
            <Reveal className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { img: findPortBgIcon, text: 'View Events', link: '/events' },
                { img: iconApplyVolunteer, text: 'Apply to Volunteer', link: '/contact' },
                { img: iconSubscribeNews, text: 'Subscribe to Newsletter', link: '/publication' },
              ].map((item, i) => (
                <Link key={i} to={item.link} className="flex flex-col items-center gap-3.5 group hover:-translate-y-2 transition-transform">
                  <div className="w-32 h-32 border-2 border-white/50 rounded-full flex items-center justify-center
                   group-hover:bg-white/15 group-hover:border-white transition-all px-4">
                    <img src={item.img} alt={item.text} className="w-10 h-10 object-contain brightness-0 invert" />
                  </div>
                  <span className="text-white font-bold text-[13px] text-center max-w-[120px]">{item.text}</span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Community */}
        <section className="bg-warm-gray py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <h2 className="text-[34px] font-black text-navy text-center mb-10">Join or Host an Event for Us</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { 
                    image: prayerWallImg, 
                    title: 'Prayer Wall', 
                    desc: "Share a prayer, read messages, and find strength and connection.",
                    link: '/prayer'
                  },
                  { 
                    image: happySeaImg, 
                    brand: 'Happy@Sea', 
                    title: 'Get 24/7 Help', 
                    desc: "Chat 24/7, book rides, get essentials, explore well-being resources.", 
                    accent: true,
                    link: '/contact'
                  },
                  { 
                    image: newsletterImg, 
                    title: 'Newsletter', 
                    desc: "Get local port news, seafarer support, and more.",
                    link: '/publication'
                  },
                  { 
                    image: eventCalendarImg, 
                    title: 'Join or Host an Event for Us', // <--- Changed this title here
                    desc: "Honour a loved one by creating a fundraising page.",
                    link: '/events'
                  }
                ].map((card, i) => (
                  <a 
                    key={i} 
                    href={card.link}
                    className={`block cursor-pointer no-underline rounded-[18px] p-7 text-center transition-all hover:-translate-y-1.5 border-2 flex flex-col items-center justify-start ${card.accent ? 'bg-navy border-navy shadow-lg' : 'bg-white border-transparent shadow-card hover:shadow-card-hover hover:border-coral/20'}`}
                  >
                    {card.brand ? (
                      <div className="text-[13px] font-extrabold text-teal mb-3 flex flex-col items-center justify-center gap-1.5 w-full">
                        <img src={card.image} alt={card.brand} className="h-10 w-auto object-contain" />
                        <span>{card.brand}</span>
                      </div>
                    ) : (
                      <img src={card.image} alt={card.title} className="h-10 w-auto object-contain mx-auto mb-3" />
                    )}
                    <h3 className={`text-[15px] font-extrabold mb-2 ${card.accent ? 'text-white' : 'text-navy'}`}>{card.title}</h3>
                    <p className={`text-[12.5px] leading-relaxed ${card.accent ? 'text-white/80' : 'text-text-mid'}`}>{card.desc}</p>
                  </a>
                ))}
              </div>

            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}