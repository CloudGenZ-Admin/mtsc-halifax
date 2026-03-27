import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaFilePdf, FaExternalLinkAlt, FaBookOpen, FaChartBar,
  FaSmile, FaLeaf, FaShip, FaShieldAlt, FaBrain, FaEnvelopeOpenText
} from 'react-icons/fa';

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
import mtsHalifaxStats from '../assets/pdf/MtS-ESG-Report-2023_29112024 (1).pdf';

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

export default function Publication() {
  const location = useLocation();

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

  // Mapped to actual imported PDF files for Halifax Newsletters
  const halifaxNewslettersData = [
    { title: "Fall 2025", href: faFall2025 },
    { title: "Summer 2025", href: faSummer2025 },
    { title: "Spring 2025", href: faSpring2025 },
    { title: "Fall 2024", href: faFall2024 },
    { title: "Summer 2024", href: faSummer2024 },
    { title: "Spring 2024", href: faSpring2024 },
    { title: "Fall 2023", href: faFall2023 },
    { title: "Summer 2023", href: faSummer2023 },
    { title: "Spring 2023", href: null }, // Retained for visual list accuracy 
    { title: "Fall 2022", href: faFall2022 },
    { title: "Summer 2022", href: faSummer2022 },
    { title: "Spring 2022", href: faSpring2022 },
    { title: "Spring 2022 (Alt)", href: faSpring2022_alt },
    { title: "Fall 2021", href: faFall2021 },
    { title: "Summer 2021", href: faSummer2021 },
    { title: "Spring 2021", href: faSpring2021 }
  ];

  // Mapped to actual imported PDF files
  const happinessReportsData = [
    { title: "Quarter 3 2025 Report", href: shiQ3_2025 },
    { title: "Quarter 2 2025 Report", href: shiQ2_2025 },
    { title: "Quarter 2 2025 Report (Alt)", href: shiQ2_2025_alt },
    { title: "Quarter 1 2025 Report", href: shiQ1_2025 },
    { title: "Quarter 3 2024 Report", href: shiQ3_2024 },
    { title: "Quarter 2 2024 Report", href: shiQ2_2024 },
    { title: "Quarter 1 2024 Report", href: shiQ1_2024 }
  ];

  // Mapped to actual imported PDF files
  const foghornReportsData = [
    { title: "July 2025", href: foghornJuly2025 },
    { title: "February 2025", href: foghornFeb2025 }
  ];

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
        <section className="relative pt-24 pb-32 bg-[#0B1A30]">
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-[#E05A2B]/20 text-[#E05A2B] text-[13px] font-black tracking-wide px-4 py-1.5 rounded-full mb-5 border border-[#E05A2B]/30 uppercase">
              <FaBookOpen /> Resources & Archives
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto">
              Our <span className="text-[#E05A2B]">Publications</span> & Reports
            </h1>
          </div>
        </section>

        {/* 1. HALIFAX NEWSLETTERS */}
        <section id="halifax-newsletters" className="py-20 bg-gray-50 scroll-mt-[90px]">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-10">
                <h2 className="text-[32px] font-black text-[#112A46] mb-2">
                  Mission to Seafarers Halifax Flying Angel Newsletters
                </h2>

              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {halifaxNewslettersData.map((newsletter, index) => (
                  <PdfCard key={index} title={newsletter.title} href={newsletter.href} />
                ))}
              </div>
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
                  <span>To sign up and have the latest issue sent to your inbox, click here.</span>
                  <span>For Archive copies of the magazine, click here.</span>
                </p>
              </div>
              <div className="relative z-10 flex flex-col gap-3 w-full md:w-auto shrink-0">
                <a
                  href="https://www.missiontoseafarers.org/the-sea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#112A46] transition-colors shadow-md"
                >
                  <FaEnvelopeOpenText /> Sign Up
                </a>
                <a
                  href="https://www.missiontoseafarers.org/the-sea-archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-[#112A46] border border-[#112A46]/20 px-8 py-4 rounded-xl font-bold hover:border-[#112A46] transition-colors"
                >
                  <FaBookOpen /> Archive Copies
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. FAN */}
        <section id="fan" className="py-20 bg-[#0B1A30] scroll-mt-[90px]">
          <div className="max-w-[1200px] mx-auto px-7 text-center">
            <Reveal>
              <div className="w-16 h-16 bg-[#E05A2B] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
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
                className="inline-flex items-center gap-2 bg-white text-[#112A46] px-8 py-4 rounded-xl font-black text-[15px] hover:bg-[#E05A2B] hover:text-white transition-all shadow-lg"
              >
                Sign Up Here <FaExternalLinkAlt />
              </a>
            </Reveal>
          </div>
        </section>

        {/* 4. STATISTICS */}
        <section id="mts-statistics" className="py-20 bg-white scroll-mt-[90px]">
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
                className="inline-flex items-center gap-2 text-[#E05A2B] font-bold text-[16px] hover:text-[#112A46] transition-colors group"
              >
                <FaChartBar className="text-xl" /> See the latest statistics here. <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform text-sm" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* 5. HAPPINESS INDEX */}
        <section id="happiness-index" className="py-20 bg-gray-50 scroll-mt-[90px]">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="border-l-4 border-[#E05A2B] pl-6 mb-10">
                <h2 className="text-[32px] font-black text-[#112A46] mb-2 flex items-center gap-3">
                  Seafarers Happiness Index <FaSmile className="text-[#E05A2B]" />
                </h2>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {happinessReportsData.map((report, index) => (
                  <PdfCard key={index} title={report.title} href={report.href} />
                ))}
              </div>

              <div className="bg-[#112A46] text-white p-6 rounded-xl flex items-center gap-4 hover:shadow-lg transition-shadow">
                <div className="bg-[#E05A2B] p-3 rounded-lg"><FaExternalLinkAlt /></div>
                <a
                  href="https://www.seafarershappinessindex.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[15px] hover:text-[#E05A2B] transition-colors"
                >
                  Read link to the survey and archive of Reports here
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. ESG STRATEGY */}
        <section id="esg-strategy" className="py-20 bg-white scroll-mt-[90px]">
          <div className="max-w-[800px] mx-auto px-7 text-center">
            <Reveal className="bg-green-50/50 border border-green-100 rounded-[32px] p-10 shadow-sm">
              <FaLeaf className="text-5xl text-green-600 mx-auto mb-6" />
              <h2 className="text-[32px] font-black text-[#112A46] mb-8">
                Mission to Seafarers ESG Strategy
              </h2>
              <PdfCard title="MtS ESG Strategy 2023" href={esgStrategy} />
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
                {foghornReportsData.map((report, idx) => (
                  <PdfCard key={idx} title={`The Foghorn – ${report.title}`} href={report.href} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8. MARINE SAFETY */}
        <section id="marine-safety" className="py-20 bg-white scroll-mt-[90px]">
          <div className="max-w-[800px] mx-auto px-7 text-center">
            <Reveal className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-10 shadow-sm">
              <FaShieldAlt className="text-5xl text-[#112A46] mx-auto mb-6" />
              <h2 className="text-[32px] font-black text-[#112A46] mb-8">
                Marine Safety Handbook
              </h2>
              <PdfCard title="Port of Halifax Marine Safety Handbook, May 2025" href={marineSafetyHandbook} />
            </Reveal>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}