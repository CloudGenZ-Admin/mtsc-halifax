import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaFilePdf, FaExternalLinkAlt, FaBookOpen, FaChartBar,
  FaSmile, FaLeaf, FaShip, FaShieldAlt, FaBrain, FaEnvelopeOpenText,
  FaCompass, FaLifeRing, FaAnchor, FaPaperPlane
} from 'react-icons/fa';

// Background Image
import publicaBg from '../assets/publica.jpg';

// Maritime storytelling images
import seafarersOnDeck from '../assets/Awards/seafarers-ondeck-working-min.webp';
import captainOnline from '../assets/Awards/captain-looking-online-resources.webp';
import portHalifaxImg from '../assets/port_halifax.jpg';

// Happiness, Foghorn, etc. PDF Imports
import shiQ1_2024 from '../assets/pdf/Happyness/Seafarers_Happiness_Index_Q1_2024.pdf';
import shiQ2_2024 from '../assets/pdf/Happyness/Seafarers_Happiness_Index_Q2_2024.pdf';
import shiQ3_2024 from '../assets/pdf/Happyness/Seafarers_Happiness_Index_Q3_2024-1.pdf';
import shiQ1_2025 from '../assets/pdf/Happyness/Seafarers-Happiness-Index_Q1_2025_.pdf';
import shiQ2_2025 from '../assets/pdf/Happyness/SHI-Q2-2025.pdf';
import shiQ2_2025_alt from '../assets/pdf/Happyness/SHI-Q2-2025 (1).pdf';
import shiQ3_2025 from '../assets/pdf/Happyness/SHI_Q3_2025_3.pdf';
import esgStrategy from '../assets/pdf/MtS-ESG-Report-2023_29112024 (1).pdf';
import foghornJuly2025 from '../assets/pdf/Foghorn/July-2025-Foghorn.pdf';
import foghornFeb2025 from '../assets/pdf/Foghorn/February-2025-Foghorn-.pdf';
import marineSafetyHandbook from '../assets/pdf/PORT-OF-HALIFAX-MARINE-SAFETY-HANDBOOK-2nd-ed.pdf';
import mtsHalifaxStats from '../assets/pdf/2026YearToYearComparisons.pdf';
import shiQ1_2026 from '../assets/pdf/Happyness/SHI_Q1_2026-2.pdf';

// Flying Angel PDF Imports
import faFall2021 from '../assets/pdf/FlyingAngel/Mission-Newsletter-Fall-2021.pdf';
import faFall2022 from '../assets/pdf/FlyingAngel/Mission-Newsletter-Fall-2022.pdf';
import faSpring2021 from '../assets/pdf/FlyingAngel/Mission-Newsletter-Spring-2021.pdf';
import faSummer2021 from '../assets/pdf/FlyingAngel/Mission-Newsletter-Summer-2021.pdf';
import faSummer2022 from '../assets/pdf/FlyingAngel/Mission-Newsletter-Summer-2022.pdf';
import faSummer2023 from '../assets/pdf/FlyingAngel/Mission-Newsletter-Summer-2023.pdf';
import faSpring2022_alt from '../assets/pdf/FlyingAngel/Mission-to-Seafarers-Spring-Newsletter-2022 (1).pdf';
import faSpring2022 from '../assets/pdf/FlyingAngel/Mission-to-Seafarers-Spring-Newsletter-2022.pdf';
import faFall2023 from '../assets/pdf/FlyingAngel/MtS-2023-FALL-Newsletter.pdf';
import faFall2024 from '../assets/pdf/FlyingAngel/MtS-Fall-2024-Newsletter-DIGITAL.pdf';
import faFall2025 from '../assets/pdf/FlyingAngel/MtS-Fall-2025-Newsletter-Digital.pdf';
import faSpring2024 from '../assets/pdf/FlyingAngel/MtS-Spring-2024-Newsletter.pdf';
import faSpring2025 from '../assets/pdf/FlyingAngel/MtS-Spring-2025-Newsletter_Digital.pdf';
import faSummer2024 from '../assets/pdf/FlyingAngel/MtS-Summer-2024-Newsletter-DIGITAL.pdf';
import faSummer2025 from '../assets/pdf/FlyingAngel/MtS-Summer-2025-Newsletter_Digital.pdf';
import faSpring2026 from '../assets/pdf/FlyingAngel/MtS-Spring-2026-Newsletter_DIGITAL.pdf';

export default function Publication() {
  const location = useLocation();
  
  // States for toggling archives
  const [showArchivesHalifax, setShowArchivesHalifax] = useState(false);
  const [showArchivesHappiness, setShowArchivesHappiness] = useState(false);
  const [showArchivesFoghorn, setShowArchivesFoghorn] = useState(false);
  const [showArchivesEsg, setShowArchivesEsg] = useState(false);
  const [showArchivesSafety, setShowArchivesSafety] = useState(false);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // 1. Halifax Newsletters Data
  const halifaxNewslettersData = [
    { title: "Spring 2026", href: faSpring2026 },
    { title: "Fall 2025", href: faFall2025 },
    { title: "Summer 2025", href: faSummer2025 },
    { title: "Spring 2025", href: faSpring2025 },
    { title: "Fall 2024", href: faFall2024 },
    { title: "Summer 2024", href: faSummer2024 },
    { title: "Spring 2024", href: faSpring2024 },
    { title: "Fall 2023", href: faFall2023 },
    { title: "Summer 2023", href: faSummer2023 },
    { title: "Fall 2022", href: faFall2022 },
    { title: "Summer 2022", href: faSummer2022 },
    { title: "Spring 2022", href: faSpring2022 },
    { title: "Spring 2022 (Alt)", href: faSpring2022_alt },
    { title: "Fall 2021", href: faFall2021 },
    { title: "Summer 2021", href: faSummer2021 },
    { title: "Spring 2021", href: faSpring2021 }
  ];
  const currentHalifax = halifaxNewslettersData.filter(item => item.title.includes('2026'));
  const archiveHalifax = halifaxNewslettersData.filter(item => !item.title.includes('2026'));

  // 2. Happiness Reports Data
  const happinessReportsData = [
    { title: "Quarter 1 2026 Report", href: shiQ1_2026 },
    { title: "Quarter 3 2025 Report", href: shiQ3_2025 },
    { title: "Quarter 2 2025 Report", href: shiQ2_2025 },
    { title: "Quarter 2 2025 Report (Alt)", href: shiQ2_2025_alt },
    { title: "Quarter 1 2025 Report", href: shiQ1_2025 },
    { title: "Quarter 3 2024 Report", href: shiQ3_2024 },
    { title: "Quarter 2 2024 Report", href: shiQ2_2024 },
    { title: "Quarter 1 2024 Report", href: shiQ1_2024 }
  ];
  const currentHappiness = happinessReportsData.filter(item => item.title.includes('2026'));
  const archiveHappiness = happinessReportsData.filter(item => !item.title.includes('2026'));

  // 3. Foghorn Reports Data
  const foghornReportsData = [
    { title: "July 2025", href: foghornJuly2025 },
    { title: "February 2025", href: foghornFeb2025 }
  ];
  const currentFoghorn = foghornReportsData.filter(item => item.title.includes('2026'));
  const archiveFoghorn = foghornReportsData.filter(item => !item.title.includes('2026'));

  // 4. ESG Strategy Data
  const esgStrategyData = [
    { title: "MtS ESG Strategy 2023", href: esgStrategy }
  ];
  const currentEsg = esgStrategyData.filter(item => item.title.includes('2026'));
  const archiveEsg = esgStrategyData.filter(item => !item.title.includes('2026'));

  // 5. Marine Safety Data
  const marineSafetyData = [
    { title: "Port of Halifax Marine Safety Handbook, May 2025", href: marineSafetyHandbook }
  ];
  const currentSafety = marineSafetyData.filter(item => item.title.includes('2026'));
  const archiveSafety = marineSafetyData.filter(item => !item.title.includes('2026'));

  // Upgraded PdfCard Component
  const PdfCard = ({ title, href }) => (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/90 backdrop-blur-md border border-[#112A46]/10 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-2xl hover:border-[#E05A2B] hover:-translate-y-1 transition-all duration-300 group w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
      <span className="font-bold text-[14px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-snug pr-4 relative z-10">
        {title}
      </span>
      <div className="bg-[#112A46]/5 p-2.5 rounded-lg group-hover:bg-[#E05A2B]/10 transition-colors relative z-10">
        <FaFilePdf className="text-[#112A46]/40 group-hover:text-[#E05A2B] text-xl shrink-0 transition-colors" />
      </div>
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden w-full">
      {/* RICH ANIMATIONS */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        @keyframes float-soft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes rock-ship {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes sway-leaf {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.15); }
          40% { transform: scale(1); }
          60% { transform: scale(1.15); }
          80% { transform: scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; filter: drop-shadow(0 0 15px rgba(17,42,70,0.6)); }
        }
        @keyframes drift-bg {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fog-drift {
          0% { transform: translateX(-10%); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translateX(10%); opacity: 0.3; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-[#112A46]">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${publicaBg})`, animation: 'subtle-zoom 20s ease-in-out infinite alternate' }}
          ></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#112A46] via-[#112A46]/40 to-transparent"></div>
          <div className="absolute inset-0 z-0 bg-black/30"></div>

          {/* Floating animated hero element */}
          <div className="absolute top-1/4 right-[10%] opacity-20 pointer-events-none z-0">
            <FaCompass className="text-white text-[250px]" style={{ animation: 'spin-slow 60s linear infinite' }} />
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center mt-8">
            <span 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E05A2B] to-[#F2784B] text-white text-[13px] font-black tracking-wide px-5 py-2 rounded-full mb-5 border border-white/20 shadow-[0_0_20px_rgba(224,90,43,0.4)] uppercase"
              style={{ animation: 'float-soft 4s ease-in-out infinite' }}
            >
              <FaBookOpen /> Resources & Archives
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-2xl">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E05A2B] to-[#ff9770]">Publications</span> & Reports
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium drop-shadow-md">
              Explore our latest newsletters, happiness indexes, marine safety guidelines, and vital research supporting global seafarers.
            </p>
          </div>
        </section>

        {/* 1. HALIFAX NEWSLETTERS */}
        <section id="halifax-newsletters" className="py-24 relative overflow-hidden bg-white scroll-mt-[90px]">
          {/* Complex Background Mesh */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-orange-50/30 opacity-70 pointer-events-none z-0"></div>
          <div 
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#EAF4FA] rounded-full blur-[100px] pointer-events-none z-0"
            style={{ animation: 'drift-bg 15s ease-in-out infinite alternate' }}
          ></div>
          {/* Giant Watermark Icon */}
          <div className="absolute bottom-[-5%] left-[-5%] opacity-[0.03] pointer-events-none z-0">
            <FaBookOpen className="text-[400px] text-[#112A46] transform -rotate-12" />
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-12">
                <h2 className="text-[36px] font-black text-[#112A46] mb-2 drop-shadow-sm">
                  Mission to Seafarers Halifax Flying Angel Newsletters
                </h2>
                <p className="text-gray-500 font-medium">Catch up on our latest local updates and stories from the Halifax station.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {currentHalifax.map((newsletter, index) => (
                  <PdfCard key={index} title={newsletter.title} href={newsletter.href} />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowArchivesHalifax(!showArchivesHalifax)}
                  className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-[#112A46] border-2 border-[#112A46] px-8 py-3.5 rounded-xl font-bold hover:border-[#E05A2B] hover:text-white hover:bg-[#E05A2B] hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer group"
                >
                  <FaBookOpen className="group-hover:scale-110 transition-transform" /> 
                  {showArchivesHalifax ? "Hide Archives" : "Halifax Newsletter Archives"}
                </button>
              </div>

              {showArchivesHalifax && (
                <div className="mt-10 pt-10 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {archiveHalifax.map((newsletter, index) => (
                      <PdfCard key={index} title={newsletter.title} href={newsletter.href} />
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {/* 2. THE SEA NEWSLETTERS */}
        <section id="the-sea" className="py-24 relative overflow-hidden bg-gradient-to-br from-[#FFF5F0] via-white to-[#FDE8E0] scroll-mt-[90px]">
          {/* Decorative Waves */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 opacity-10 pointer-events-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[150px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#E05A2B"></path>
            </svg>
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            <Reveal className="bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2rem] p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_20px_50px_rgba(224,90,43,0.08)]">
              {/* Rocking Ship Animation */}
              <FaShip 
                className="absolute -bottom-16 -right-12 text-[250px] text-[#E05A2B]/10 pointer-events-none z-0" 
                style={{ animation: 'rock-ship 6s ease-in-out infinite', transformOrigin: 'bottom center' }}
              />
              
              <div className="relative z-10 max-w-2xl">
                <div className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] px-4 py-1.5 rounded-full font-bold text-sm mb-4">Global Reach</div>
                <h2 className="text-[36px] font-black text-[#112A46] mb-4 leading-tight">
                  Mission to Seafarers<br/>The Sea Newsletters
                </h2>
                <p className="text-gray-600 text-[18px] font-medium leading-relaxed">
                  To sign up and have the latest issue sent directly to your inbox with news from Canada and around the world, choose an option below.
                </p>
              </div>

              <div className="relative z-10 flex flex-col w-full md:w-auto shrink-0 gap-4">
                <a
                  href="https://www.missiontoseafarers.org/the-sea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#E05A2B] to-[#F2784B] text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_10px_25px_rgba(224,90,43,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <FaEnvelopeOpenText className="group-hover:-translate-y-1 group-hover:scale-110 transition-all" /> Global Sign Up
                </a>
                <a
                  href="contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#112A46] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a3a5f] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <FaEnvelopeOpenText className="group-hover:-translate-y-1 group-hover:scale-110 transition-all" /> Canada Newsletter
                </a>
                <a
                  href="https://www.missiontoseafarers.org/the-sea-archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white text-[#112A46] border-2 border-gray-200 px-8 py-4 rounded-xl font-bold hover:border-[#112A46] hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <FaBookOpen /> Archive Copies
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. FAN */}
        <section id="fan" className="py-28 relative overflow-hidden bg-gradient-to-b from-[#FDE8E0] via-white to-[#F4F8FB] scroll-mt-[90px]">
          {/* Light animated background blobs for contrast */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-300/20 blur-[80px] pointer-events-none" style={{ animation: 'float-soft 8s infinite alternate' }}></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-300/20 blur-[100px] pointer-events-none" style={{ animation: 'float-soft 10s infinite alternate-reverse' }}></div>

          <div className="max-w-[1100px] mx-auto px-7 relative z-10">
            <Reveal className="relative bg-[#112A46] rounded-[2.5rem] p-10 md:p-16 shadow-[0_30px_60px_rgba(17,42,70,0.4)] border border-[#1a3a5f] flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden group">
              
              {/* Internal decorative elements inside the dark card */}
              <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              <div className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-[#E05A2B] to-[#F2784B] rounded-full blur-[80px] opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity duration-700"></div>
              
              <div className="relative z-10 md:w-2/3 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E05A2B] to-[#F2784B] rounded-2xl mb-8 shadow-[0_0_30px_rgba(224,90,43,0.6)] border border-white/20" style={{ animation: 'float-soft 4s ease-in-out infinite' }}>
                  <FaPaperPlane className="text-3xl text-white" />
                </div>
                
                <h2 className="text-[20px] md:text-[46px] font-black text-white mb-6 leading-tight drop-shadow-lg tracking-tight">
                 Mission to Seafarers Flying Angel News <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E05A2B] to-[#ff9770]">(FAN)</span>
                </h2>
                
                <p className="text-blue-100 text-[18px] md:text-[20px] mb-0 leading-relaxed font-medium max-w-xl">
                     To receive a free copy of the FAN, sign up here.
                </p>
              </div>

              <div className="relative z-10 md:w-1/3 flex justify-center md:justify-end w-full">
                <a
                  href="https://www.missiontoseafarers.org/fan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#E05A2B] to-[#F2784B] text-white px-10 py-5 rounded-2xl font-black text-[18px] shadow-[0_15px_35px_rgba(224,90,43,0.4)] hover:shadow-[0_20px_45px_rgba(224,90,43,0.6)] hover:-translate-y-2 transition-all duration-300 w-full md:w-auto text-center cursor-pointer border border-white/20 group/btn"
                >
                  Sign Up Now <FaExternalLinkAlt className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4. STATISTICS */}
        <section id="mts-statistics" className="py-24 relative overflow-hidden bg-white scroll-mt-[90px]">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#f0f4f8 1px, transparent 1px), linear-gradient(90deg, #f0f4f8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="absolute right-[-10%] top-[10%] opacity-[0.03] z-0 pointer-events-none">
            <FaChartBar className="text-[#112A46] text-[500px]" style={{ animation: 'float-soft 10s infinite' }} />
          </div>

          <div className="max-w-[1000px] mx-auto px-7 relative z-10">
            <Reveal className="flex flex-col md:flex-row gap-10 items-center bg-gradient-to-br from-white to-blue-50/50 p-10 rounded-[2rem] border border-blue-100 shadow-xl">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#112A46]/10 text-[#112A46] rounded-xl mb-6">
                  <FaChartBar className="text-2xl" />
                </div>
                <h2 className="text-[36px] font-black text-[#112A46] mb-4 leading-tight">
                  MtS Halifax Statistics
                </h2>
                <p className="text-gray-600 text-[17px] leading-relaxed font-medium mb-8">
                  Statistics include the frequency count of three categories: (1) seafarers visiting the Mission Centre; (2) volunteer and staff visits to ships; and, (3) seafarers provided with transport to and from the port and desired destination in Halifax and Dartmouth. Data are presented in actual counts and tables, showcasing monthly and annual comparisons.
                </p>
                <a
                  href={mtsHalifaxStats}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white bg-gradient-to-r from-[#112A46] to-[#1a3a5f] px-8 py-4 rounded-xl font-bold text-[16px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <FaChartBar className="text-xl group-hover:scale-110 transition-transform" /> 
                  View Latest Statistics
                  <FaExternalLinkAlt className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-sm" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. HAPPINESS INDEX */}
        <section id="happiness-index" className="py-24 relative overflow-hidden bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#FCE3DA] via-[#FDF0EC] to-white scroll-mt-[90px]">
          {/* Giant Rotating Smile Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
            <FaSmile className="text-[#E05A2B] text-[800px]" style={{ animation: 'spin-slow 120s linear infinite' }} />
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-[36px] font-black text-[#112A46] mb-2 flex items-center gap-4">
                    Seafarers Happiness Index 
                    <FaSmile className="text-[#E05A2B] filter drop-shadow-md" style={{ animation: 'heartbeat 2.5s infinite' }} />
                  </h2>
                  <p className="text-gray-500 font-medium">Measuring the wellbeing of seafarers worldwide across various categories.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {currentHappiness.map((report, index) => (
                  <PdfCard key={index} title={report.title} href={report.href} />
                ))}
              </div>

              <div className="mt-10 mb-10 flex justify-center">
                <button
                  onClick={() => setShowArchivesHappiness(!showArchivesHappiness)}
                  className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-[#E05A2B] border-2 border-[#E05A2B]/30 px-8 py-3.5 rounded-xl font-bold hover:border-[#E05A2B] hover:bg-[#E05A2B] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-pointer group"
                >
                  <FaBookOpen className="group-hover:-rotate-12 transition-transform" /> 
                  {showArchivesHappiness ? "Hide Archives" : "Happiness Index Archives"}
                </button>
              </div>

              {showArchivesHappiness && (
                <div className="mb-10 pt-10 border-t border-orange-200/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {archiveHappiness.map((report, index) => (
                      <PdfCard key={index} title={report.title} href={report.href} />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-[#112A46] via-[#1a3a5f] to-[#112A46] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-2xl hover:shadow-[0_20px_50px_rgba(17,42,70,0.3)] hover:-translate-y-1 transition-all duration-300 border border-white/10 group relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }}></div>
                <div className="bg-[#E05A2B] p-4 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg relative z-10">
                  <FaExternalLinkAlt className="text-xl" />
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <h4 className="text-xl font-black mb-1">Participate in the Survey</h4>
                  <a
                    href="https://www.seafarershappinessindex.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-200 hover:text-white transition-colors cursor-pointer text-[16px] underline underline-offset-4 decoration-blue-200/50 hover:decoration-white"
                  >
                    Read link to the survey and access the full archive of Reports here.
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. ESG STRATEGY */}
        <section id="esg-strategy" className="py-24 relative overflow-hidden bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-emerald-50 scroll-mt-[90px]">
          {/* Swaying Leaves Background */}
          <div className="absolute left-[-5%] top-[20%] opacity-[0.03] z-0 pointer-events-none">
             <FaLeaf className="text-green-800 text-[400px]" style={{ animation: 'sway-leaf 8s ease-in-out infinite alternate', transformOrigin: 'bottom right' }} />
          </div>
          
          <div className="max-w-[800px] mx-auto px-7 text-center relative z-10">
            <Reveal className="bg-white/60 backdrop-blur-2xl border border-green-200 rounded-[2.5rem] p-10 md:p-14 shadow-[0_20px_50px_rgba(16,185,129,0.08)]">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-green-200/50 relative">
                <div className="absolute inset-0 rounded-3xl border border-green-400 animate-ping opacity-20"></div>
                <FaLeaf 
                  className="text-5xl text-green-600 drop-shadow-md" 
                  style={{ animation: 'sway-leaf 4s ease-in-out infinite', transformOrigin: 'bottom center' }} 
                />
              </div>
              <h2 className="text-[36px] font-black text-[#112A46] mb-4">
                Mission to Seafarers ESG Strategy
              </h2>
              <p className="text-gray-600 mb-10 font-medium">Read about our commitment to Environmental, Social, and Governance principles.</p>
              
              <div className="flex flex-col gap-5">
                {currentEsg.map((item, idx) => (
                  <PdfCard key={idx} title={item.title} href={item.href} />
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowArchivesEsg(!showArchivesEsg)}
                  className="flex items-center justify-center gap-2 bg-white text-green-700 border-2 border-green-600/30 px-8 py-3.5 rounded-xl font-bold hover:border-green-600 hover:bg-green-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-md cursor-pointer group"
                >
                  <FaBookOpen className="group-hover:scale-110 transition-transform" /> 
                  {showArchivesEsg ? "Hide Archives" : "ESG Strategy Archives"}
                </button>
              </div>

              {showArchivesEsg && (
                <div className="mt-8 pt-8 border-t border-green-100">
                  <div className="flex flex-col gap-5">
                    {archiveEsg.map((item, idx) => (
                      <PdfCard key={idx} title={item.title} href={item.href} />
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {/* 7. THE FOGHORN */}
        <section id="foghorn" className="py-24 relative overflow-hidden bg-[#faf9f8] scroll-mt-[90px]">
          {/* Fog Effect CSS */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-0 left-[-20%] w-[140%] h-[150%] bg-gradient-to-r from-transparent via-[#FDE4DB]/40 to-transparent blur-[80px]" style={{ animation: 'fog-drift 20s infinite alternate linear' }}></div>
            <div className="absolute bottom-0 right-[-20%] w-[140%] h-[150%] bg-gradient-to-l from-transparent via-gray-300/30 to-transparent blur-[100px]" style={{ animation: 'fog-drift 25s infinite alternate-reverse linear' }}></div>
          </div>

          <div className="max-w-[1000px] mx-auto px-7 relative z-10">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-12">
                <h2 className="text-[36px] font-black text-[#112A46] mb-2 drop-shadow-sm">
                  The Foghorn
                </h2>
                <p className="text-gray-600 font-medium">Master Mariners of Canada, Maritimes Division Publications</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentFoghorn.map((report, idx) => (
                  <PdfCard key={idx} title={`The Foghorn – ${report.title}`} href={report.href} />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowArchivesFoghorn(!showArchivesFoghorn)}
                  className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-[#112A46] border-2 border-gray-300 px-8 py-3.5 rounded-xl font-bold hover:border-[#E05A2B] hover:text-[#E05A2B] hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-md cursor-pointer group"
                >
                  <FaBookOpen className="group-hover:scale-110 transition-transform" /> 
                  {showArchivesFoghorn ? "Hide Archives" : "Foghorn Archives"}
                </button>
              </div>

              {showArchivesFoghorn && (
                <div className="mt-10 pt-10 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {archiveFoghorn.map((report, idx) => (
                      <PdfCard key={idx} title={`The Foghorn – ${report.title}`} href={report.href} />
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {/* 8. MARINE SAFETY */}
        <section id="marine-safety" className="py-28 relative overflow-hidden bg-gradient-to-br from-[#112A46] via-[#1a3a5f] to-[#0a192f] scroll-mt-[90px]">
          {/* Smooth, static gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_50%)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.1),_transparent_50%)] pointer-events-none"></div>

          <div className="max-w-[1100px] mx-auto px-7 relative z-10">
            <Reveal className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
              
              <div className="flex-1 text-center lg:text-left w-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-6 shadow-[0_10px_20px_rgba(59,130,246,0.3)] border border-blue-300/20">
                  <FaShieldAlt className="text-2xl text-white drop-shadow-md" />
                </div>
                
                <h2 className="text-[36px] md:text-[42px] font-black text-white mb-4 leading-tight">
                  Marine Safety Handbook
                </h2>
                
                <p className="text-blue-100/80 mb-10 font-medium text-[18px] max-w-lg mx-auto lg:mx-0">
                  Port of Halifax guidelines and crucial safety protocols for all mariners.
                </p>
                
                <div className="flex flex-col gap-4 mb-10">
                  {currentSafety.map((item, idx) => (
                    <PdfCard key={idx} title={item.title} href={item.href} />
                  ))}
                </div>

                <div className="flex justify-center lg:justify-start">
                  <button
                    onClick={() => setShowArchivesSafety(!showArchivesSafety)}
                    className="flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-[#112A46] transition-all duration-300 shadow-md cursor-pointer group"
                  >
                    <FaBookOpen className={`transition-transform duration-300 ${showArchivesSafety ? 'rotate-180' : ''}`} /> 
                    {showArchivesSafety ? "Hide Archives" : "Marine Safety Archives"}
                  </button>
                </div>
              </div>

              {/* Gradient Decorative Graphic */}
              <div className="hidden lg:flex w-[400px] shrink-0 justify-center items-center relative">
                <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 blur-3xl rounded-full"></div>
                <div className="w-[85%] aspect-square bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-[3rem] shadow-2xl border border-white/20 flex flex-col items-center justify-center relative z-10 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] opacity-50"></div>
                  <FaShieldAlt className="text-[100px] text-white drop-shadow-xl mb-4 relative z-10" />
                  <div className="w-16 h-1 bg-white/30 rounded-full relative z-10"></div>
                </div>
              </div>

            </Reveal>

            {showArchivesSafety && (
              <div className="mt-10 pt-10 border-t border-white/10 relative z-10">
                <h3 className="text-white font-bold text-xl mb-6 text-center lg:text-left flex items-center justify-center lg:justify-start gap-3">
                   <FaBookOpen className="text-blue-400" /> Archived Handbooks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {archiveSafety.map((item, idx) => (
                    <PdfCard key={idx} title={item.title} href={item.href} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 9. INDUSTRY RESOURCES */}
        <section id="industry-resources" className="py-24 relative overflow-hidden bg-white scroll-mt-[90px]">
           {/* Hexagon Pattern CSS */}
           <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(30deg, transparent, transparent 20px, #112A46 20px, #112A46 21px), repeating-linear-gradient(-30deg, transparent, transparent 20px, #112A46 20px, #112A46 21px), repeating-linear-gradient(90deg, transparent, transparent 34px, #112A46 34px, #112A46 35px)', backgroundSize: '40px 69.28px' }}></div>
           
           <div className="absolute right-[-5%] top-[30%] opacity-[0.03] z-0 pointer-events-none">
             <FaLifeRing className="text-[#112A46] text-[400px]" style={{ animation: 'spin-slow 40s linear infinite' }} />
           </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            <Reveal>
              <div className="border-l-4 border-[#112A46] pl-6 mb-12">
                <h2 className="text-[36px] font-black text-[#112A46] mb-2 drop-shadow-sm">
                  Industry Resources & Certifications
                </h2>
                <p className="text-gray-500 font-medium">Important links for marine training, qualifications, and career building.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://tc.canada.ca/en/marine-transportation/marine-training-certification-individuals/foreign-other-qualifications-skills-recognition/canadian-endorsement-attesting-recognition-foreign-certificate-through-reciprocal-arrangement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-[0_20px_40px_rgba(17,42,70,0.1)] hover:border-[#E05A2B] hover:-translate-y-2 transition-all duration-300 group w-full relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#E05A2B] to-[#112A46] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <span className="font-bold text-[16px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-relaxed pr-6 relative z-10">
                    Canada Recognition of Foreign Seafarers’ STCW Certificate
                  </span>
                  <div className="bg-[#112A46]/5 p-3.5 rounded-xl group-hover:bg-[#E05A2B] transition-colors relative z-10">
                    <FaExternalLinkAlt className="text-[#112A46]/50 group-hover:text-white text-xl shrink-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>

                <a
                  href="https://imagine-marine.ca/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-[0_20px_40px_rgba(17,42,70,0.1)] hover:border-[#E05A2B] hover:-translate-y-2 transition-all duration-300 group w-full relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#E05A2B] to-[#112A46] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                  <span className="font-bold text-[16px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-relaxed pr-6 relative z-10">
                    Canadian Marine Careers Foundation
                  </span>
                  <div className="bg-[#112A46]/5 p-3.5 rounded-xl group-hover:bg-[#E05A2B] transition-colors relative z-10">
                    <FaExternalLinkAlt className="text-[#112A46]/50 group-hover:text-white text-xl shrink-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 10. MARITIME STORYTELLING SECTION (FIXED: Added bg-[#112A46] to prevent bottom white gap on large screens) */}
        <section className="relative py-32  overflow-hidden bg-[#112A46]">
          <div className="absolute inset-0 z-0">
            <img
              src={portHalifaxImg}
              alt="Port of Halifax"
              className="w-full h-full object-cover"
            />
            {/* Enhanced complex gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#112A46]/95 via-[#1A3A5F]/90 to-[#E05A2B]/85"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            
            <Reveal className="text-center mb-20">
              {/* Soft floating ship */}
              <div 
                className="w-20 h-20 bg-gradient-to-br from-[#E05A2B] to-[#F2784B] rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(224,90,43,0.6)] border border-white/20"
                style={{ animation: 'float-soft 4s ease-in-out infinite' }}
              >
                <FaAnchor className="text-white text-4xl" />
              </div>
              <h2 className="text-[clamp(36px,5vw,52px)] font-black text-white mb-6 drop-shadow-2xl">
                Connecting Seafarers to the World
              </h2>
              <p className="text-blue-100/90 text-[20px] max-w-3xl mx-auto leading-relaxed drop-shadow-md font-medium">
                Through our publications, we keep seafarers, supporters, and maritime communities informed, advocated for, and connected.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              
              <Reveal>
                <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-3 group h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                      src={seafarersOnDeck}
                      alt="Seafarers working on deck"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-10 flex-grow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E05A2B] to-[#F2784B] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                        <FaBookOpen className="text-white text-xl" />
                      </div>
                      <h3 className="text-[26px] font-black text-white drop-shadow-md">Stories from the Sea</h3>
                    </div>
                    <p className="text-blue-50/90 text-[16px] leading-relaxed">
                      Our newsletters share real stories from seafarers, highlighting their unique experiences, daily challenges, and the essential support they receive at our Halifax station.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-3 group h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img
                      src={captainOnline}
                      alt="Captain accessing online resources"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-10 flex-grow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E05A2B] to-[#F2784B] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                        <FaChartBar className="text-white text-xl" />
                      </div>
                      <h3 className="text-[26px] font-black text-white drop-shadow-md">Research & Insights</h3>
                    </div>
                    <p className="text-blue-50/90 text-[16px] leading-relaxed">
                      Through happiness surveys, statistics, and deeply researched reports, we continuously track seafarer wellbeing and strongly advocate for better conditions at sea.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>

            <Reveal delay={200} className="text-center">
              <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 border border-white/30 max-w-4xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-white/50 transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
                {/* Floating Brain */}
                <FaBrain 
                  className="text-[#E05A2B] text-6xl mx-auto mb-8 filter drop-shadow-[0_0_20px_rgba(224,90,43,0.8)] relative z-10" 
                  style={{ animation: 'float-soft 4s ease-in-out infinite' }} 
                />
                <h3 className="text-[32px] font-black text-white mb-6 relative z-10 drop-shadow-lg">
                  Stay Informed About Seafarer Welfare
                </h3>
                <p className="text-blue-100/90 text-[18px] mb-10 leading-relaxed relative z-10 font-medium">
                  Our publications provide invaluable insights into the daily lives of seafarers and the vital, life-saving work being done to support them in ports around the globe.
                </p>
                <div className="flex flex-wrap justify-center gap-5 relative z-10">
                  <a
                    href="#halifax-newsletters"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E05A2B] to-[#F2784B] text-white px-10 py-4 rounded-full font-bold text-[16px] hover:shadow-[0_15px_30px_rgba(224,90,43,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <FaBookOpen /> Read Our Newsletters
                  </a>
                  <a
                    href="https://www.missiontoseafarers.org/the-sea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-transparent text-white border-2 border-white/50 px-10 py-4 rounded-full font-bold text-[16px] hover:bg-white hover:text-[#112A46] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <FaExternalLinkAlt /> Subscribe to The Sea
                  </a>
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