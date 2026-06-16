import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaCalendarAlt, FaArrowLeft, FaArrowRight, FaChurch, FaFilePdf, FaDownload, FaYoutube, FaPlayCircle
} from 'react-icons/fa';

export default function SeaSunday() {
  const location = useLocation();

  // Smooth scrolling for page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Reusable Download Button Component
  const DownloadBtn = ({ text, href }) => (
    <a 
      href={href || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-white border-2 border-navy/10 text-navy font-bold text-[13px] px-5 py-2.5 rounded-xl hover:border-coral hover:text-coral hover:shadow-md transition-all group"
    >
      <FaDownload className="text-coral/70 group-hover:text-coral transition-colors" />
      {text}
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white">
        
        {/* Inner Page Hero */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          {/* Oceanic / Church theme background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?w=1200&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              <FaCalendarAlt /> Annual Event
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
              Sea <span className="text-coral">Sunday</span>
            </h1>
            <p className="text-white/80 text-[17px] font-medium max-w-2xl mx-auto">
              A day when seafarers are remembered and prayers are offered for them and their families worldwide.
            </p>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* INTRO SECTION */}
        {/* ------------------------------------------- */}
        <section className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="bg-warm-gray rounded-[32px] p-8 md:p-12 shadow-sm border border-navy/5 relative overflow-hidden">
              <FaChurch className="absolute -bottom-10 -right-10 text-[180px] text-navy/5" />
              <div className="relative z-10">
                <h2 className="text-[28px] font-black text-navy mb-5 flex items-center gap-3">
                  <FaChurch className="text-coral" /> Honoring Our Seafarers
                </h2>
                <p className="text-text-mid text-[16px] leading-relaxed mb-6">
                  The Mission to Seafarers Halifax joins Christian churches and faith or religious organizations worldwide in observing Sea Sunday.
                </p>
                <p className="text-text-mid text-[16px] leading-relaxed font-medium text-navy/80">
                  Sea Sunday is a day when seafarers are remembered and prayers are offered for them and their families. It is also an occasion to advocate for the welfare of seafarers – the essential workers – and thank them for their hard work and sacrifice for themselves, their families, and the people who benefit from the seafarers’ significant contribution to global trade and commerce.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* 2025 SECTION (WITH PDF IFRAME) */}
        {/* ------------------------------------------- */}
        <section id="2025" className="py-20 bg-coral-pale border-t-2 border-coral/20">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-coral text-white font-extrabold text-sm px-4 py-1.5 rounded-full shadow-sm">2025</span>
                <h3 className="text-[32px] font-black text-navy leading-tight">Sea Sunday 2025</h3>
              </div>
              <p className="text-text-mid text-[16px] leading-relaxed mb-6">
                Once again this year, Sea Sunday honors the courageous men and women who keep the global economy moving. Together, let’s continue to pray, give thanks, and raise vital funds to support seafarers facing tough and often lonely conditions.
              </p>
              
              <div className="mb-10">
                <a href="#" className="inline-block text-coral font-bold text-[15px] underline underline-offset-4 hover:text-navy transition-colors">
                  For the Mission to Seafarers’ celebration of Sea Sunday, please click here.
                </a>
              </div>

              {/* PDF Embedded Iframe */}
              <div className="bg-white p-4 rounded-2xl shadow-card border border-navy/10">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h4 className="font-bold text-navy flex items-center gap-2">
                    <FaFilePdf className="text-coral text-lg" /> 
                    Sea Sunday A4 Poster
                  </h4>
                  <a href="#" className="text-[12px] font-extrabold bg-navy-dark text-white px-4 py-1.5 rounded-full hover:bg-coral transition-colors flex items-center gap-2">
                    <FaDownload /> Download PDF
                  </a>
                </div>
                {/* Replace src with your actual PDF URL */}
                <iframe 
                  src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                  title="Sea Sunday Poster PDF"
                  className="w-full h-[500px] md:h-[700px] rounded-xl border-2 border-warm-gray"
                >
                  <p>Your browser does not support PDFs. <a href="#">Download the PDF</a>.</p>
                </iframe>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* 2024 SECTION */}
        {/* ------------------------------------------- */}
        <section id="2024" className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <span className="bg-navy text-white font-extrabold text-sm px-4 py-1.5 rounded-full shadow-sm">2024</span>
                  <h3 className="text-[28px] font-black text-navy leading-tight">A Celebration & Opportunity</h3>
                </div>
                <p className="text-text-mid text-[15px] leading-relaxed mb-4">
                  Sea Sunday is on 14 July 2024. This Day is an opportunity to remember and say prayers for all the brave men and women who work at sea to make sure people get what they need. 
                </p>
                <p className="text-text-mid text-[15px] leading-relaxed mb-6">
                  The Day is a celebration and opportunity to raise funds for the essential support of the work and services for seafarers who often work in dangerous and lonely conditions. To know more about why Sea Sunday is celebrated, please read more below.
                </p>
                <div className="flex flex-wrap gap-3">
                  <DownloadBtn text="Read More" />
                  <DownloadBtn text="Kids Activity PDF" />
                </div>
              </div>
              <div className="bg-warm-gray rounded-2xl aspect-square flex flex-col items-center justify-center border-2 border-dashed border-navy/20 p-6 text-center">
                 <FaChurch className="text-5xl text-coral/40 mb-3" />
                 <span className="font-bold text-navy/50 text-[14px]">July 14, 2024</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* 2022 & 2021 SECTION */}
        {/* ------------------------------------------- */}
        <section id="past-years" className="py-20 bg-warm-gray">
          <div className="max-w-[1000px] mx-auto px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              
              {/* 2022 */}
              <Reveal className="bg-white rounded-[24px] p-8 shadow-sm border-t-4 border-navy">
                <span className="inline-block bg-navy/10 text-navy font-extrabold text-xs px-3 py-1 rounded-md mb-4">2022</span>
                <h3 className="text-[22px] font-black text-navy mb-4">Support Sea Sunday 2022</h3>
                <p className="text-text-mid text-[14px] leading-relaxed mb-6">
                  For more information about the Mission and support the Sea Sunday 2022, check out our resources below.
                </p>
                <div className="flex flex-wrap gap-3">
                  <DownloadBtn text="Sea Sunday Flyer" />
                  <DownloadBtn text="Sermon Notes" />
                </div>
              </Reveal>

              {/* 2021 */}
              <Reveal className="bg-white rounded-[24px] p-8 shadow-sm border-t-4 border-coral">
                <span className="inline-block bg-coral/10 text-coral font-extrabold text-xs px-3 py-1 rounded-md mb-4">2021</span>
                <h3 className="text-[22px] font-black text-navy mb-4">Support Sea Sunday 2021</h3>
                <p className="text-text-mid text-[14px] leading-relaxed mb-6">
                  For more information about the Mission to Seafarers and support the Sea Sunday, see our flyer and kids activity below.
                </p>
                <div className="flex flex-wrap gap-3">
                  <DownloadBtn text="Sea Sunday Flyer" />
                  <DownloadBtn text="Kids Activity" />
                </div>
              </Reveal>

            </div>

            {/* ------------------------------------------- */}
            {/* YOUTUBE VIDEO GALLERY */}
            {/* ------------------------------------------- */}
            <Reveal>
              <div className="text-center mb-10">
                <h3 className="text-[28px] font-black text-navy mb-3 flex items-center justify-center gap-3">
                  <FaYoutube className="text-coral" /> Watch Our Videos
                </h3>
                <p className="text-text-mid text-[15px]">Catch up on our past Sea Sunday services and messages.</p>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Video 1 */}
                <div className="bg-navy-dark rounded-2xl overflow-hidden shadow-card border-2 border-white relative group aspect-video flex items-center justify-center">
                  {/* Replace with actual YouTube embed iframe */}
                  {/* <iframe className="w-full h-full" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                  
                  {/* Placeholder for Design Purposes */}
                  <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                  <FaPlayCircle className="relative z-10 text-6xl text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-lg" />
                  <div className="absolute top-4 left-4 z-10 bg-navy-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="text-white font-bold text-[12px]">Sea Sunday 2021 Message</span>
                  </div>
                </div>

                {/* Video 2 */}
                <div className="bg-navy-dark rounded-2xl overflow-hidden shadow-card border-2 border-white relative group aspect-video flex items-center justify-center">
                  {/* Replace with actual YouTube embed iframe */}
                  {/* <iframe className="w-full h-full" src="https://www.youtube.com/embed/YOUR_VIDEO_ID2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                  
                  {/* Placeholder for Design Purposes */}
                  <img src="https://images.unsplash.com/photo-1548625361-ec857f12ebfc?w=800&q=80" alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
                  <FaPlayCircle className="relative z-10 text-6xl text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-lg" />
                  <div className="absolute top-4 left-4 z-10 bg-navy-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="text-white font-bold text-[12px]">Service Highlight Reel</span>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* PAGINATION / NEXT EVENT NAVIGATION */}
        {/* ------------------------------------------- */}
        <section className="bg-navy-dark border-t border-white/10 py-8">
          <div className="max-w-[1000px] mx-auto px-7 flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link 
              to="/events/day-of-the-seafarer" 
              className="group flex items-center gap-3 text-white/70 hover:text-coral-light font-bold text-[14px] transition-colors"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-coral-light transition-colors">
                <FaArrowLeft />
              </div>
              Prev Event: Day of the Seafarer
            </Link>
            
            <Link 
              to="/events/take-out-luncheon" 
              className="group flex items-center gap-3 text-white hover:text-coral-light font-bold text-[14px] transition-colors text-right"
            >
              Next Event: Take-out Luncheon
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