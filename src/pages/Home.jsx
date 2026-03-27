import React from 'react';
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
import iconGiveNow from '../assets/img/Donate/icon-give-now.svg';
import iconApplyVolunteer from '../assets/img/Donate/icon-apply-volunteer.svg';
import iconSubscribeNews from '../assets/img/Donate/icon-subscribe-news.svg';
import findPortBgIcon from '../assets/img/Donate/find-port-bg.svg';

// Import local image for "Find a Station" section
import operatingShipsImg from '../assets/img/Seafarers/infgrph-operating-ships.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* Mission Tagline */}
        <div className="bg-white py-10 border-b border-coral/10">
          <div className="max-w-[1200px] mx-auto px-7 text-center">
            <p className="text-[clamp(20px,3vw,30px)] font-extrabold text-navy">
              Caring for seafarers — <em className="text-coral not-italic">the unsung heroes of global trade</em>
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
              <a href="#" className="bg-coral text-white self-start px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-coral-light shadow-warm transition-all">FIND RESOURCES</a>
            </div>
          </Reveal>
          <Reveal className="relative overflow-hidden flex group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=80" alt="Volunteer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="relative z-10 p-12 md:p-14 flex flex-col justify-end items-end text-right w-full bg-gradient-to-t from-navy-dark/95 via-navy-dark/70 to-transparent">
              <p className="text-[15px] font-semibold text-white/70 mb-1">I am a</p>
              <h2 className="text-[40px] font-black text-white mb-3 leading-none">Volunteer,</h2>
              <p className="text-[17px] font-semibold text-white/90 max-w-[280px] mb-6 leading-tight">how do I donate, volunteer, or get involved?</p>
              <a href="#" className="bg-white text-navy self-end px-6 py-2.5 rounded-full font-bold text-[13px] hover:bg-warm-gray transition-colors">GET INVOLVED</a>
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

        {/* Supporters */}
        <section className="bg-white py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <h2 className="text-[34px] font-black text-navy text-center mb-9">Our Supporters</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {['NAMMA', 'Prince Rupert Port Authority', 'Helm', 'Ontario Shipyards', 'TK', 'Ports Toronto'].map(sup => (
                  <div key={sup} className="bg-coral-pale border-2 border-coral/15 rounded-xl px-7 py-3.5 font-extrabold text-[13.5px] text-navy text-center hover:border-coral hover:bg-white transition-all cursor-pointer">
                    {sup}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Get Involved */}
        <section className="bg-coral py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <h2 className="text-[38px] font-black text-white leading-none">Ways to Get Involved</h2>
              <a href="/donate" className="bg-navy-dark text-white px-7 py-3 rounded-full font-extrabold text-[13px] hover:bg-[#0f1c4a] transition-colors">DONATE</a>
            </Reveal>
            <Reveal className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { img: iconGiveNow, text: 'Give Now' },
                { img: findPortBgIcon, text: 'View Events' },
                { img: iconApplyVolunteer, text: 'Apply to Volunteer' },
                { img: iconSubscribeNews, text: 'Subscribe to Newsletter' },
                { img: findPortBgIcon, text: 'Explore Campaigns' },
              ].map((item, i) => (
                <a key={i} href="#" className="flex flex-col items-center gap-3.5 group hover:-translate-y-2 transition-transform">
                  <div className="w-24 h-24 border-2 border-white/50 rounded-full flex items-center justify-center group-hover:bg-white/15 group-hover:border-white transition-all">
                    <img src={item.img} alt={item.text} className="w-10 h-10 object-contain brightness-0 invert" />
                  </div>
                  <span className="text-white font-bold text-[13px] text-center max-w-[90px]">{item.text}</span>
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Find Station */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block bg-coral-pale text-coral text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-4">✦ Locations</span>
                <h2 className="text-4xl font-black text-navy mb-4 leading-tight">Find a Mission to Seafarers<br/>Station in Canada</h2>
                <p className="text-base text-text-mid leading-relaxed mb-7 max-w-lg">Find a seafarer's centre in Canada. Grab a cup of coffee, connect to Wi-Fi, arrange a lift to town, get the practical and emotional support you need.</p>
                <a href="#" className="inline-flex items-center gap-2 bg-coral text-white px-8 py-3.5 rounded-full font-extrabold text-sm hover:bg-coral-light hover:-translate-y-0.5 shadow-warm hover:shadow-warm-hover transition-all">
                  FIND A STATION
                </a>
              </div>
              <div className="bg-gradient-to-br from-coral-pale to-coral/5 border-2 border-coral/20 rounded-[20px] aspect-[4/3] flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-shadow">
                <img src={operatingShipsImg} alt="Find Stations Across Canada Infographic" className="w-full h-full object-contain" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Community */}
        <section className="bg-warm-gray py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <h2 className="text-[34px] font-black text-navy text-center mb-10">Join Our Community</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { image: findPortImg, title: 'Find a Station', desc: "Rest, recharge, connect with loved ones, and explore while you're ashore." },
                  { image: prayerWallImg, title: 'Prayer Wall', desc: "Share a prayer, read messages, and find strength and connection." },
                  { image: happySeaImg, brand: 'Happy@Sea', title: 'Get 24/7 Help', desc: "Chat 24/7, book rides, get essentials, explore well-being resources.", accent: true },
                  { image: newsletterImg, title: 'Newsletter', desc: "Get local port news, seafarer support, and more." },
                  { image: eventCalendarImg, title: 'Host an Event', desc: "Honour a loved one by creating a fundraising page." }
                ].map((card, i) => (
                  <div key={i} className={`rounded-[18px] p-7 text-center transition-all hover:-translate-y-1.5 border-2 flex flex-col items-center justify-start ${card.accent ? 'bg-navy border-navy shadow-lg' : 'bg-white border-transparent shadow-card hover:shadow-card-hover hover:border-coral/20'}`}>
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
                  </div>
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