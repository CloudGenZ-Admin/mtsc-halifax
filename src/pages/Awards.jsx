import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaTrophy, FaMedal, FaAward, FaCamera, FaQuoteLeft, 
  FaChevronRight, FaHandHoldingHeart, FaShip, FaRegBuilding, 
  FaUsers, FaHeart, FaHandsHelping, FaFileContract
} from 'react-icons/fa';

// --- IMPORTING LOCAL IMAGES ---
import award9Edited from '../assets/Awards/9-edited.jpg';
import award2023Img from '../assets/Awards/53408308979_2d37844ec8_o-1024x683.jpg';

// Jubilee & 2021 Images
import auroraImg from '../assets/Awards/Aurora-Ulloa-Parsons--1024x607.jpg';
import colmImg from '../assets/Awards/Helen-and-Colm-1024x768.jpg';
import normanImg from '../assets/Awards/Helen-and-Norman-998x1024.jpg';
import susanImg from '../assets/Awards/Susan-receiving-award-1024x566.jpg';
import sandraImg from '../assets/Awards/Sandra-receiving-award.jpg';
import groupImg from '../assets/Awards/recipients-of-the-Queen-Elizabeth-lls-Platinum-Jubilee-Medal-with-Helen-Alastair-and-Bud-1024x576.jpg';
import captainTonySandraImg from '../assets/Awards/Captain-Tony-and-Sandra-with-medal-scaled.jpg';

// --- NEW CORPORATE IMAGES ---
import corpoHero from '../assets/Corpo/Corpo/corpo1.webp';
import iconPromote from '../assets/Corpo/Corpo/iconPromote Through Purpose.svg';
import imgConnect from '../assets/Corpo/Corpo/imageConnect and Collaborate.webp';
import imgPartnerGiving from '../assets/Corpo/Corpo/imagePartnerThroughGiving.webp';
import imgPromote from '../assets/Corpo/Corpo/imagePromote Through Purpose.webp';
import imgVolunteer from '../assets/Corpo/Corpo/imagesVolunteer and Advocate.webp';
import imgEngage from '../assets/Corpo/Corpo/imgEngage Your Workplace.webp';
import logoConnect from '../assets/Corpo/Corpo/logoConnectandCollaborate.svg';
import logoEngage from '../assets/Corpo/Corpo/logoEngage Your Workplace.svg';
import logoPartner from '../assets/Corpo/Corpo/logoPartnerThroughGiving.svg';
import logoVolunteer from '../assets/Corpo/Corpo/logoVolunteer and Advocate.svg';

// --- NEW PARTNER PORT LOGOS ---
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

// --- NEW LEGACY IMAGES ---
import legacySeafarersWelcomed from '../assets/Corpo/legacyinfgrphic-seafarers-welcomed.png';
import legacyBird from '../assets/Corpo/bird-right_1-1Learn how you can leave a life-saving legacy gift..png';
import legacyShipToShore from '../assets/Corpo/lagacyinfgrphic-ship-to-shore-1.png';
import legacyStations from '../assets/Corpo/lagacyinfgrphic-stations-1.png';
import legacyShipVisits from '../assets/Corpo/legacyinfgrphic-2900-shipvisits_1.png';

// --- IMPORTING PDF ---
import lgLetterPdf from '../assets/pdf/LG-letter-Helen-Glenn.pdf';

export default function AwardsAndGiving() {
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

  // Data array for Corporate Options
  const corporateOptions = [
    {
      title: "Partner Through Giving",
      desc: "Support seafarers through meaningful corporate contributions.",
      list: ["Fund a project", "Sponsor a program", "Sponsor an event", "Make regular donations", "Social responsibility grants", "Corporate foundations"],
      icon: logoPartner,
      img: imgPartnerGiving
    },
    {
      title: "Engage Your Workplace",
      desc: "Empower your team to make a difference together.",
      list: ["Workplace or payroll giving", "Employer matching gifts", "Volunteer grants", "Union or association partnerships"],
      icon: logoEngage,
      img: imgEngage
    },
    {
      title: "Promote Through Purpose",
      desc: "Align your brand with a mission that supports seafarers.",
      list: ["Cause-marketing campaigns", "Run an event on our behalf", "Support stations with goods in kind"],
      icon: iconPromote,
      img: imgPromote
    },
    {
      title: "Volunteer and Advocate",
      desc: "Inspire others by giving your time or voice.",
      list: ["Become a volunteer or mission speaker", "Run awareness or fundraising activities", "Share your expertise with our network", "Connect us to your network"],
      icon: logoVolunteer,
      img: imgVolunteer
    },
    {
      title: "Connect and Collaborate",
      desc: "Build lasting impact through partnerships and networks.",
      list: ["Introduce us to your network", "Explore customized partnership opportunities across Halifax’s port"],
      icon: logoConnect,
      img: imgConnect
    }
  ];

  // Array of imported port logos for the carousel
  const partnerLogos = [
    portSydney, portGCT, portHopa, portHelm, portOntario, 
    portPrinceRupert, portRobertAllan, portTK, portNamma, 
    portToronto, portDpWorld
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* ========================================= */}
        {/* EXISTING AWARDS SECTION (UNTOUCHED)       */}
        {/* ========================================= */}
        
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

        {/* Volunteer Awards Section */}
        <section id="volunteer-awards" className="py-24 bg-white scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="text-center mb-16">
              <h2 className="text-[36px] font-black text-navy mb-4">Volunteer Awards</h2>
              <p className="text-text-mid max-w-2xl mx-auto text-[17px]">
                Recognizing the selfless individuals who generously contribute their time to support the welfare of seafarers arriving in Halifax.
              </p>
            </Reveal>

            <div className="space-y-12">
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

                {/* 2023 */}
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

                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-3 md:mb-4">
                      {platinumAwardees.map((awardee, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-black border-[3px] border-white shadow-card">
                          <img 
                            src={awardee.src} 
                            alt={awardee.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 md:p-4 pt-12">
                            <FaCamera className="text-coral-light mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[14px]" />
                            <span className="font-bold text-white text-[12px] md:text-[13px] leading-tight block">{awardee.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="group relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/7] bg-black border-[3px] border-white shadow-card">
                      <img 
                        src={groupImg} 
                        alt="Group Photo of Platinum Jubilee Awardees" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top" 
                      />
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

        {/* Staff Awards Section */}
        <section id="staff-awards" className="py-24 bg-[#fbf8f5] scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="text-center mb-16">
              <h2 className="text-[36px] font-black text-[#2D3580] mb-4">Staff Awards</h2>
              <p className="text-[#2D3580] max-w-2xl mx-auto text-[17px]">
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


        {/* ========================================= */}
        {/* UPDATED GIVING OPTIONS SECTIONS BELOW     */}
        {/* ========================================= */}
        
        {/* Divider */}
        <div className="w-full h-4 bg-gradient-to-r from-navy via-coral to-navy"></div>

        {/* --- 1. EVENTS CTA --- */}
        <section className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-7 text-center">
            <Reveal>
              <h2 className="text-[36px] font-black text-navy mb-6">Join Us at Our Events</h2>
              <p className="text-text-mid max-w-2xl mx-auto text-[17px] mb-8">
                Attend our community gatherings, fundraisers, and special ceremonies. Your presence and participation help us raise vital funds and awareness for seafarers visiting Halifax.
              </p>
              <Link to="/events" className="inline-flex items-center gap-2 bg-coral hover:bg-coral-light text-white font-bold py-3 px-8 rounded-full transition-colors text-[15px]">
                View Upcoming Events <FaChevronRight className="text-sm" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* --- 2. CORPORATE PARTNER SECTION --- */}
        <section id="corporate-partner" className="bg-[#F8F9FA] pb-24">
          {/* Corporate Hero Banner */}
          <div className="relative py-32 bg-navy overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              // style={{ backgroundImage: `url(${corpoHero})` }}
            ></div>
            <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">Corporate Partnership Makes an Impact</h2>
            </div>
          </div>

          <div className="max-w-[1200px] mx-auto px-7 pt-20">
            {/* Intro Content */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <Reveal>
                <h3 className="text-3xl md:text-4xl font-black text-navy mb-6 leading-tight">Support Halifax’s Lifeline at Sea</h3>
                <p className="text-text-mid mb-8 text-[16px] leading-relaxed">
                  As a corporate partner, your organization can help provide essential services and compassionate care to the seafarers who arrive at the Port of Halifax and who call Canada home.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <a href="https://mtsc.ca/ways-to-give-seafarers/corporate-supporter/" target="_blank" rel="noopener noreferrer" className="bg-navy hover:bg-navy-light text-white font-bold py-3 px-8 rounded-full transition-colors text-[15px] shadow-md">
                    WORKPLACE GIVING
                  </a>
                  <Link to="/contact" className="bg-coral hover:bg-coral-light text-white font-bold py-3 px-8 rounded-full transition-colors text-[15px] shadow-md">
                    PARTNER WITH US
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Our Partners / Star Club */}
            <Reveal className="text-center mb-24 bg-white p-10 md:p-14 rounded-[32px] shadow-sm border border-navy/5 overflow-hidden">
              <h3 className="text-3xl font-black text-navy mb-12">Our Partners & Supporters</h3>
              
              {/* --- INFINITE CAROUSEL --- */}
              <div className="w-full relative mb-16">
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
                      alt={`Partner Logo ${index}`} 
                      className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
                    />
                  ))}
                </div>
                {/* White gradient fades on left and right for seamless entrance/exit */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
              </div>

              {/* <h3 className="text-3xl font-black text-coral mb-12">Star Club Members</h3> */}
              {/* <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
                <FaHandHoldingHeart className="text-6xl text-coral" />
                <FaHeart className="text-6xl text-coral" />
                <FaHandsHelping className="text-6xl text-coral" />
                <div className="text-lg font-bold text-coral border-2 border-dashed border-coral/40 px-6 py-3 rounded-xl bg-coral/5">Star Club Logos Here</div>
              </div> */}
            </Reveal>

            {/* Support Halifax's Economy Banner */}
            <div className="relative py-24 mb-24 bg-black rounded-[32px] overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=1600&q=80')] bg-cover bg-center opacity-40"></div>
              <div className="max-w-[800px] mx-auto px-7 relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Support Halifax’s Economy</h3>
                <p className="text-white/90 text-[16px] mb-8 leading-relaxed">
                  Seafarers form the invisible workforce behind the goods, resources, and trade that sustain our communities. Becoming a corporate sponsor with The Mission to Seafarers Halifax is an investment in our local and national economic strength.
                </p>
                <Link to="/contact" className="inline-block border-2 border-white hover:bg-white hover:text-navy text-white font-bold py-3 px-8 rounded-full transition-colors">
                  LEARN ABOUT OUR IMPACT
                </Link>
              </div>
            </div>

            {/* Grid Rows for Corporate Involvement */}
            <div className="max-w-[1000px] mx-auto px-7 space-y-24">
              {corporateOptions.map((opt, index) => (
                <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                  <Reveal className="flex-1 w-full">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white flex items-center justify-center p-2">
                      <img src={opt.img} alt={opt.title} className="w-full h-full object-cover rounded-2xl" />
                    </div>
                  </Reveal>
                  <Reveal className="flex-1">
                    <div className={`flex flex-col ${index % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                      <img src={opt.icon} alt={`${opt.title} icon`} className="w-20 h-20 mb-6 drop-shadow-sm" />
                      <h4 className="text-3xl font-black text-navy mb-4">{opt.title}</h4>
                      <p className="text-text-mid mb-6 text-[17px] font-medium">{opt.desc}</p>
                      <ul className="space-y-3">
                        {opt.list.map((item, i) => (
                          <li key={i} className={`flex items-center gap-3 text-navy font-medium ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <span className="text-coral text-lg shrink-0">➤</span> 
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 3. LEGACY GIVING SECTION --- */}
        <section id="legacy-giving" className="bg-white pb-24">
          <div className="relative py-32 bg-navy overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516934522880-e71168f18206?w=1600&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-md">Your Legacy Can Change Lives</h2>
            </div>
          </div>

          <div className="max-w-[1000px] mx-auto px-7 pt-24 text-center">
            <Reveal>
              <h3 className="text-3xl md:text-4xl font-black text-navy mb-6">A Gift That Lives On</h3>
              <p className="text-text-mid text-[17px] mb-6 max-w-3xl mx-auto leading-relaxed">
                Legacy gifts are vital to The Mission to Seafarers, and to seafarers that we support both now and in the future. Remembering the Mission in your Will allows us to continue to serve seafarers after you are gone.
              </p>
              <p className="text-text-mid text-[17px] mb-16 max-w-3xl mx-auto leading-relaxed">
                Mission to Seafarers Halifax is part of a global ministry dedicated to caring for the world’s seafarers, men and women who work tirelessly at sea to keep global trade moving.
              </p>
              
              <h4 className="text-3xl font-black text-coral mb-16">Why Support the Mission with a Legacy Gift</h4>
              
              {/* Infographics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                {[
                  { img: legacyShipVisits, num: "2,900+", desc: "ship visits across Canadian ports" },
                  { img: legacySeafarersWelcomed, num: "11,500+", desc: "seafarers welcomed at ports" },
                  { img: legacyShipToShore, num: "8,000+", desc: "ship to shore rides provided to ports" },
                  { img: legacyStations, num: "10", desc: "stations (ports) providing support" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <div className="w-24 h-24 mb-6 transition-transform duration-300 group-hover:-translate-y-2">
                      <img src={stat.img} alt={stat.desc} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-3xl font-black text-navy mb-3">{stat.num}</span>
                    <span className="text-text-mid font-medium text-[14px] leading-tight max-w-[180px]">{stat.desc}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Giving Options Split */}
            <div className="flex flex-col md:flex-row items-center gap-12 text-left bg-warm-gray p-8 md:p-14 rounded-[32px] mb-20 shadow-sm border border-navy/5 relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] opacity-5">
                <FaFileContract className="text-[300px] text-navy" />
              </div>
              <div className="flex-1 relative z-10 w-full">
                <h4 className="text-3xl font-black text-navy mb-8">Giving Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    "DAFs (Donor-Advised Funds)",
                    "Securities (Stocks, Bonds, Mutual funds)",
                    "Planned/Legacy Gifts",
                    "Bequests (Will Gifts)",
                    "RRSP/RRIF/TFSA Beneficiary Designations",
                    "Life insurance (New or Assigned Policies)",
                    "Real estate / Residual Interest / CRTs",
                    "Endowment Gifts, Capital/Naming",
                    "Gifts In-Kind from Individuals"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-coral text-lg mt-0.5">➤</span> 
                      <span className="text-navy font-medium text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="inline-block bg-coral hover:bg-coral-light text-white font-bold py-4 px-10 rounded-full transition-colors shadow-md">
                  GET IN TOUCH
                </Link>
              </div>
              <div className="flex-1 relative z-10 flex flex-col items-center justify-center">
                <img src={legacyBird} alt="Learn how you can leave a life-saving legacy gift" className="w-full max-w-[300px] drop-shadow-xl hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Legal Address */}
            <Reveal className="max-w-2xl mx-auto border-t-2 border-dashed border-gray-300 pt-16">
              <div className="bg-[#f8f9fa] p-10 rounded-[32px] text-center shadow-card border border-gray-100">
                <FaFileContract className="text-5xl text-coral mx-auto mb-6" />
                <h4 className="text-3xl font-black text-navy mb-6">Legal Address</h4>
                <p className="text-text-mid mb-8 text-[16px] leading-relaxed">
                  It’s important to correctly identify us by our legal name and address in your Will. <br/>Our legal name and address is:
                </p>
                <div className="inline-block text-left bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
                  <p className="font-black text-navy text-xl mb-3 border-b border-gray-100 pb-3">The Mission to Seafarers Halifax</p>
                  <p className="text-text-mid text-[16px] leading-loose">
                    P.O. Box 27114<br/>
                    Halifax, Nova Scotia, Canada<br/>
                    B3H 4M8
                  </p>
                  {/* <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-navy text-[15px] font-bold">
                      Registered charity : <span className="text-coral">734345689RR0001</span>
                    </p>
                  </div> */}
                </div>
                <p className="text-text-mid mt-10 text-[16px]">
                  If you would like to speak to someone about leaving a gift in your Will, please <Link to="/contact" className="text-coral hover:text-coral-light underline font-bold underline-offset-4 transition-colors">contact us</Link>.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- 4. HOST A FUNDRAISER & DONATE SECTION --- */}
        <section className="py-24 bg-navy text-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-coral rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-20"></div>

          <div className="max-w-[1200px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            
            {/* Donate Card */}
            <Reveal className="bg-white/10 p-10 md:p-14 rounded-[32px] border border-white/20 backdrop-blur-md text-center flex flex-col justify-between hover:bg-white/15 transition-colors">
              <div>
                <FaHeart className="text-6xl text-coral mx-auto mb-8 drop-shadow-md" />
                <h3 className="text-3xl md:text-4xl font-black mb-6">Make a Donation</h3>
                <p className="text-white/90 leading-relaxed text-[16px] md:text-[17px] mb-10">
                  Thank you for Giving to Mission to Seafarers Halifax. Your gift will help provide vital care, comfort, and connection to the men and women who spend months away from home. Your online donation is simple, secure, and goes directly to programs that make a real difference in the lives of seafarers.
                </p>
              </div>
              <Link to="/donate" className="bg-coral hover:bg-coral-light text-white font-bold py-4 px-10 rounded-full transition-all text-lg inline-block w-fit mx-auto shadow-lg hover:-translate-y-1">
                DONATE NOW
              </Link>
            </Reveal>

            {/* Host a Fundraiser Card */}
            <Reveal className="bg-gradient-to-br from-coral to-coral-light p-10 md:p-14 rounded-[32px] shadow-xl text-center flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <FaUsers className="text-9xl text-white" />
              </div>
              <div className="relative z-10">
                <FaHandsHelping className="text-6xl text-white mx-auto mb-8 drop-shadow-md" />
                <h3 className="text-3xl md:text-4xl font-black mb-6">Host a Fundraiser</h3>
                <p className="text-white/95 leading-relaxed text-[16px] md:text-[17px] mb-10">
                  Empower your community to give back. Whether it's a bake sale, a charity run, or an online campaign, hosting a fundraiser is an incredible way to raise awareness and critical funds for seafarers arriving in our port.
                </p>
              </div>
              <a 
                href="https://fundraising.mtsc.ca/?_gl=1*1mkepix*_ga*MTQ1MDA1MDIuMTc3NDgyNTg5MA..*_ga_PRGHG34XYT*czE3NzU5NTE3NjMkbzE3JGcxJHQxNzc1OTUyODkzJGoxMSRsMCRoMA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-coral hover:bg-gray-50 font-black py-4 px-10 rounded-full transition-all text-lg inline-block w-fit mx-auto shadow-lg relative z-10 hover:-translate-y-1"
              >
                START FUNDRAISING
              </a>
            </Reveal>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}