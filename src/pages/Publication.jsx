import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaFilePdf, FaExternalLinkAlt, FaBookOpen, FaChartBar,
  FaSmile, FaLeaf, FaShip, FaShieldAlt, FaBrain, FaEnvelopeOpenText
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


  // Updated PdfCard to accept 'href'
  const PdfCard = ({ title, href }) => (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-[#112A46]/10 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-lg hover:border-[#E05A2B] hover:-translate-y-1 transition-all group w-full"
    >
      <span className="font-bold text-[14px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-snug">
        {title}
      </span>
      <FaFilePdf className="text-[#112A46]/30 group-hover:text-[#E05A2B] text-xl shrink-0 transition-colors" />
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-neutral-900">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${publicaBg})` }}
          ></div>
          <div className="absolute inset-0 z-0 bg-black/60"></div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-[#E05A2B] text-white text-[13px] font-black tracking-wide px-4 py-1.5 rounded-full mb-5 border border-[#E05A2B]/30 uppercase">
              <FaBookOpen /> Resources & Archives
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-md">
              Our <span className="text-[#E05A2B]">Publications</span> & Reports
            </h1>
          </div>
        </section>

        {/* 1. HALIFAX NEWSLETTERS */}
        <section id="halifax-newsletters" className="py-20 bg-gradient-to-br from-[#F8FBFD] via-white to-[#EBF4F9] scroll-mt-[90px]">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-10">
                <h2 className="text-[32px] font-black text-[#112A46] mb-2">
                  Mission to Seafarers Halifax Flying Angel Newsletters
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {currentHalifax.map((newsletter, index) => (
                  <PdfCard key={index} title={newsletter.title} href={newsletter.href} />
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowArchivesHalifax(!showArchivesHalifax)}
                  className="flex items-center justify-center gap-2 bg-white text-[#112A46] border border-[#112A46]/20 px-8 py-3 rounded-xl font-bold hover:border-[#112A46] hover:bg-[#F8FBFD] transition-colors shadow-sm cursor-pointer"
                >
                  <FaBookOpen /> {showArchivesHalifax ? "Hide Archives" : "Halifax Newsletter Archives"}
                </button>
              </div>

              {showArchivesHalifax && (
                <div className="mt-8 pt-8 border-t border-[#112A46]/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
        <section id="the-sea" className="py-20 bg-white scroll-mt-[90px]">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="bg-[#FDF0EC] rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <FaShip className="absolute -bottom-10 -right-10 text-[200px] text-[#E05A2B]/5 transform -rotate-12" />
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-[32px] font-black text-[#112A46] mb-4 leading-tight">
                  Mission to Seafarers The Sea Newsletters
                </h2>
                <p className="text-gray-700 text-[16px] font-medium space-y-2 flex flex-col">
                  <span>To sign up and have the latest issue sent directly to your inbox with news from Canada and around the world, click here.</span>
                </p>
              </div>
              <div className="relative z-10 flex flex-col gap-3 w-full md:w-auto shrink-0">
                <a
                  href="https://www.missiontoseafarers.org/the-sea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#112A46] transition-colors shadow-md cursor-pointer"
                >
                  <FaEnvelopeOpenText /> Sign Up
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#112A46] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#E05A2B] transition-colors shadow-md cursor-pointer"
                >
                  <FaEnvelopeOpenText /> Canada Newsletter
                </a>
                <a
                  href="https://www.missiontoseafarers.org/the-sea-archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-[#112A46] border border-[#112A46]/20 px-8 py-4 rounded-xl font-bold hover:border-[#112A46] transition-colors cursor-pointer"
                >
                  <FaBookOpen /> Archive Copies
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. FAN */}
        <section id="fan" className="py-20 bg-gradient-to-br from-[#112A46] via-[#1a3a5f] to-[#2D5A7B] scroll-mt-[90px] relative overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#E05A2B" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
          </svg>
          
          <div className="max-w-[1200px] mx-auto px-7 text-center relative z-10">
            <Reveal>
              <div className="w-16 h-16 bg-[#E05A2B] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 shadow-lg">
                <FaEnvelopeOpenText className="text-3xl text-white" />
              </div>
              <h2 className="text-[32px] font-black text-white mb-4">
                Mission to Seafarers Flying Angel News (FAN)
              </h2>
              <p className="text-gray-300 text-[18px] mb-8">
                To receive a free copy of the FAN, sign up here.
              </p>
              <a
                href="https://www.missiontoseafarers.org/fan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#112A46] px-8 py-4 rounded-xl font-black text-[15px] hover:bg-[#E05A2B] hover:text-white transition-all shadow-lg cursor-pointer"
              >
                Sign Up Here <FaExternalLinkAlt />
              </a>
            </Reveal>
          </div>
        </section>

        {/* 4. STATISTICS */}
        <section id="mts-statistics" className="py-20 bg-gradient-to-br from-white via-[#F8FBFD] to-[#EBF4F9] scroll-mt-[90px]">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal>
              <div className="border-l-4 border-[#112A46] pl-6 mb-8">
                <h2 className="text-[32px] font-black text-[#112A46] mb-2">
                  MtS Halifax Statistics
                </h2>
              </div>
              <p className="text-gray-700 text-[17px] leading-relaxed font-medium mb-6">
                Statistics include the frequency count of three categories: (1) seafarers visiting the Mission Centre; (2) volunteer and staff visits to ships; and, (3) seafarers provided with transport to and from the port and desired destination in Halifax and Dartmouth. Data are presented in actual counts and tables. Also, the data presentation shows a comparison of the monthly and annual counts.
              </p>
              <a
                href={mtsHalifaxStats}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#E05A2B] font-bold text-[16px] hover:text-[#112A46] transition-colors group cursor-pointer"
              >
                <FaChartBar className="text-xl" /> See the latest statistics here. <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform text-sm" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* 5. HAPPINESS INDEX */}
        <section id="happiness-index" className="py-20 bg-gradient-to-br from-[#FDF0EC] via-white to-[#F8FBFD] scroll-mt-[90px]">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-10">
                <h2 className="text-[32px] font-black text-[#112A46] mb-2 flex items-center gap-3">
                  Seafarers Happiness Index <FaSmile className="text-[#E05A2B]" />
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentHappiness.map((report, index) => (
                  <PdfCard key={index} title={report.title} href={report.href} />
                ))}
              </div>

              <div className="mt-8 mb-8 flex justify-center">
                <button
                  onClick={() => setShowArchivesHappiness(!showArchivesHappiness)}
                  className="flex items-center justify-center gap-2 bg-white text-[#112A46] border border-[#112A46]/20 px-8 py-3 rounded-xl font-bold hover:border-[#112A46] hover:bg-[#FDF0EC] transition-colors shadow-sm cursor-pointer"
                >
                  <FaBookOpen /> {showArchivesHappiness ? "Hide Archives" : "Happiness Index Archives"}
                </button>
              </div>

              {showArchivesHappiness && (
                <div className="mb-8 pt-8 border-t border-[#112A46]/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {archiveHappiness.map((report, index) => (
                      <PdfCard key={index} title={report.title} href={report.href} />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#112A46] text-white p-6 rounded-xl flex items-center gap-4 hover:shadow-lg transition-shadow">
                <div className="bg-[#E05A2B] p-3 rounded-lg"><FaExternalLinkAlt /></div>
                <a
                  href="https://www.seafarershappinessindex.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[15px] hover:text-[#E05A2B] transition-colors cursor-pointer"
                >
                  Read link to the survey and archive of Reports here
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. ESG STRATEGY */}
        <section id="esg-strategy" className="py-20 bg-gradient-to-br from-[#F0F9F4] via-white to-[#E8F5E9] scroll-mt-[90px]">
          <div className="max-w-[800px] mx-auto px-7 text-center">
            <Reveal className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-[32px] p-10 shadow-xl">
              <FaLeaf className="text-5xl text-green-600 mx-auto mb-6" />
              <h2 className="text-[32px] font-black text-[#112A46] mb-8">
                Mission to Seafarers ESG Strategy
              </h2>
              
              <div className="flex flex-col gap-4">
                {currentEsg.map((item, idx) => (
                  <PdfCard key={idx} title={item.title} href={item.href} />
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowArchivesEsg(!showArchivesEsg)}
                  className="flex items-center justify-center gap-2 bg-white text-[#112A46] border border-[#112A46]/20 px-8 py-3 rounded-xl font-bold hover:border-[#112A46] hover:bg-[#F0F9F4] transition-colors shadow-sm cursor-pointer"
                >
                  <FaBookOpen /> {showArchivesEsg ? "Hide Archives" : "ESG Strategy Archives"}
                </button>
              </div>

              {showArchivesEsg && (
                <div className="mt-6 pt-6 border-t border-gray-200/50">
                  <div className="flex flex-col gap-4">
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
        <section id="foghorn" className="py-20 bg-[#FDF0EC] scroll-mt-[90px]">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-10">
                <h2 className="text-[32px] font-black text-[#112A46] mb-2">
                  The Foghorn – Master Mariners of Canada, Maritimes Division
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFoghorn.map((report, idx) => (
                  <PdfCard key={idx} title={`The Foghorn – ${report.title}`} href={report.href} />
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowArchivesFoghorn(!showArchivesFoghorn)}
                  className="flex items-center justify-center gap-2 bg-white text-[#112A46] border border-[#112A46]/20 px-8 py-3 rounded-xl font-bold hover:border-[#112A46] hover:bg-white transition-colors shadow-sm cursor-pointer"
                >
                  <FaBookOpen /> {showArchivesFoghorn ? "Hide Archives" : "Foghorn Archives"}
                </button>
              </div>

              {showArchivesFoghorn && (
                <div className="mt-8 pt-8 border-t border-[#112A46]/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <section id="marine-safety" className="py-20 bg-gradient-to-br from-[#E3F2FD] via-white to-[#F8FBFD] scroll-mt-[90px]">
          <div className="max-w-[800px] mx-auto px-7 text-center">
            <Reveal className="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-[32px] p-10 shadow-xl">
              <FaShieldAlt className="text-5xl text-[#112A46] mx-auto mb-6" />
              <h2 className="text-[32px] font-black text-[#112A46] mb-8">
                Marine Safety Handbook
              </h2>
              
              <div className="flex flex-col gap-4">
                {currentSafety.map((item, idx) => (
                  <PdfCard key={idx} title={item.title} href={item.href} />
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowArchivesSafety(!showArchivesSafety)}
                  className="flex items-center justify-center gap-2 bg-white text-[#112A46] border border-[#112A46]/20 px-8 py-3 rounded-xl font-bold hover:border-[#112A46] hover:bg-[#E3F2FD] transition-colors shadow-sm cursor-pointer"
                >
                  <FaBookOpen /> {showArchivesSafety ? "Hide Archives" : "Marine Safety Archives"}
                </button>
              </div>

              {showArchivesSafety && (
                <div className="mt-6 pt-6 border-t border-gray-200/50">
                  <div className="flex flex-col gap-4">
                    {archiveSafety.map((item, idx) => (
                      <PdfCard key={idx} title={item.title} href={item.href} />
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {/* 9. INDUSTRY RESOURCES */}
        <section id="industry-resources" className="py-20 bg-gradient-to-br from-[#F8FBFD] via-white to-[#EBF4F9] scroll-mt-[90px]">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="border-l-4 border-[#112A46] pl-6 mb-10">
                <h2 className="text-[32px] font-black text-[#112A46] mb-2">
                  Industry Resources & Certifications
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="https://tc.canada.ca/en/marine-transportation/marine-training-certification-individuals/foreign-other-qualifications-skills-recognition/canadian-endorsement-attesting-recognition-foreign-certificate-through-reciprocal-arrangement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[#112A46]/10 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-lg hover:border-[#E05A2B] hover:-translate-y-1 transition-all group w-full"
                >
                  <span className="font-bold text-[14px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-snug">
                    Canada Recognition of Foreign Seafarers’ STCW Certificate
                  </span>
                  <FaExternalLinkAlt className="text-[#112A46]/30 group-hover:text-[#E05A2B] text-xl shrink-0 transition-colors" />
                </a>

                <a
                  href="https://imagine-marine.ca/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[#112A46]/10 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-lg hover:border-[#E05A2B] hover:-translate-y-1 transition-all group w-full"
                >
                  <span className="font-bold text-[14px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-snug">
                    Canadian Marine Careers Foundation
                  </span>
                  <FaExternalLinkAlt className="text-[#112A46]/30 group-hover:text-[#E05A2B] text-xl shrink-0 transition-colors" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* MARITIME STORYTELLING SECTION */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={portHalifaxImg}
              alt="Port of Halifax"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#112A46]/95 via-[#2D5A7B]/90 to-[#E05A2B]/85"></div>
          </div>

          <svg className="absolute top-0 left-0 w-full h-32 opacity-10 transform rotate-180" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#E05A2B" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
          </svg>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            
            <Reveal className="text-center mb-16">
              <div className="w-16 h-16 bg-[#E05A2B] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FaShip className="text-white text-3xl" />
              </div>
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-white mb-4">
                Connecting Seafarers to the World
              </h2>
              <p className="text-white/90 text-[18px] max-w-2xl mx-auto leading-relaxed">
                Through our publications, we keep seafarers, supporters, and maritime communities informed and connected
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              <Reveal>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-3xl transition-all group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={seafarersOnDeck}
                      alt="Seafarers working on deck"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#E05A2B] rounded-lg flex items-center justify-center">
                        <FaBookOpen className="text-white text-lg" />
                      </div>
                      <h3 className="text-[22px] font-black text-white">Stories from the Sea</h3>
                    </div>
                    <p className="text-white/80 text-[15px] leading-relaxed">
                      Our newsletters share real stories from seafarers, highlighting their experiences, challenges, and the support they receive at our Halifax station.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-3xl transition-all group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={captainOnline}
                      alt="Captain accessing online resources"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#E05A2B] rounded-lg flex items-center justify-center">
                        <FaChartBar className="text-white text-lg" />
                      </div>
                      <h3 className="text-[22px] font-black text-white">Research & Insights</h3>
                    </div>
                    <p className="text-white/80 text-[15px] leading-relaxed">
                      Through happiness surveys, statistics, and research reports, we track seafarer wellbeing and advocate for better conditions at sea.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>

            <Reveal delay={200} className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
                <FaBrain className="text-[#E05A2B] text-4xl mx-auto mb-4" />
                <h3 className="text-[24px] font-black text-white mb-3">
                  Stay Informed About Seafarer Welfare
                </h3>
                <p className="text-white/80 text-[16px] mb-6 leading-relaxed">
                  Our publications provide valuable insights into the lives of seafarers and the vital work being done to support them in ports around the world.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="#halifax-newsletters"
                    className="inline-flex items-center gap-2 bg-[#E05A2B] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-white hover:text-[#112A46] transition-all shadow-lg cursor-pointer"
                  >
                    <FaBookOpen /> Read Our Newsletters
                  </a>
                  <a
                    href="https://www.missiontoseafarers.org/the-sea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 px-6 py-3 rounded-full font-bold text-[14px] hover:bg-white hover:text-[#112A46] transition-all cursor-pointer"
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