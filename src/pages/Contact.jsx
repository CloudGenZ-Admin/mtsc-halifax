import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { FaMapMarkerAlt, FaPhoneAlt, FaFax, FaClock, FaShip } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="relative bg-[#112A46] pt-32 pb-24 overflow-hidden">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1494459940152-1e911caa8bf5?w=1600&q=80')] bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
            <Reveal>
              <span className="inline-block bg-[#E05A2B] text-white text-[13px] font-extrabold px-4 py-1.5 rounded-full mb-4 tracking-wide">
                GET IN TOUCH
              </span>
              <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white mb-4 leading-tight">
                Contact Us
              </h1>
              <p className="text-white/80 text-[17px] max-w-2xl mx-auto leading-relaxed font-medium">
                Whether you need assistance, want to volunteer, or have a question about our services, we're here to help seafarers in the Port of Halifax.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="bg-white py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Left Column: Hours of Operation */}
              <Reveal>
                <div className="bg-[#FDF0EC] border-2 border-[#E05A2B]/15 rounded-[24px] p-8 md:p-12 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#E05A2B] rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-[#E05A2B]/30">
                      <FaClock />
                    </div>
                    <h2 className="text-3xl font-black text-[#112A46]">Hours of Operation</h2>
                  </div>
                  
                  <p className="text-[#112A46]/80 text-[15px] leading-relaxed mb-8 font-medium">
                    We are open Mondays to Saturdays including holidays when ships are in the Port of Halifax. Our hours of operation (opening to closing) are flexible depending on whether there are ships in port and seafarers need our services and access to our facilities at the Centre.
                  </p>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E05A2B]/10">
                    <ul className="flex flex-col gap-3 text-[15px] font-bold text-[#112A46]">
                      <li className="flex justify-between items-center pb-3 border-b border-gray-100 text-gray-400">
                        <span>Sunday</span>
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-[12px] font-extrabold">CLOSED</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span>Monday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span>Tuesday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span>Wednesday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span>Thursday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span>Friday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Saturday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 flex items-start gap-3 text-[#112A46]/70 text-sm font-semibold bg-white/50 p-4 rounded-xl">
                    <FaShip className="text-[#E05A2B] mt-0.5 text-lg shrink-0" />
                    <p>Hours may vary slightly based on port activity to best serve visiting seafarers.</p>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Address & Contact Details */}
              <div className="flex flex-col gap-6">
                
                {/* Civic Address */}
                <Reveal className="bg-white border-2 border-gray-100 hover:border-[#E05A2B]/30 transition-colors rounded-[24px] p-8 shadow-[0_8px_30px_rgba(17,42,70,.04)] flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#112A46] rounded-full flex items-center justify-center text-white text-xl shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black text-[#112A46] mb-2">Civic Address</h3>
                    <p className="text-[#112A46]/70 text-[15px] leading-relaxed font-semibold">
                      Mission to Seafarers Halifax<br />
                      844 Marginal Road<br />
                      Halifax, NS B3H 2P7<br />
                      Canada
                    </p>
                  </div>
                </Reveal>

                {/* Mailing Address */}
                <Reveal className="bg-white border-2 border-gray-100 hover:border-[#E05A2B]/30 transition-colors rounded-[24px] p-8 shadow-[0_8px_30px_rgba(17,42,70,.04)] flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#112A46]/5 rounded-full flex items-center justify-center text-[#112A46] text-xl shrink-0 border border-[#112A46]/10">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black text-[#112A46] mb-2">Mailing Address</h3>
                    <p className="text-[#112A46]/70 text-[15px] leading-relaxed font-semibold">
                      Mission to Seafarers Halifax<br />
                      P.O. Box 27114<br />
                      Halifax, NS B3H 4M8
                    </p>
                  </div>
                </Reveal>

                {/* Phone & Fax */}
                <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#112A46] text-white rounded-[24px] p-7 shadow-lg flex flex-col items-center text-center hover:-translate-y-1 transition-transform cursor-pointer">
                    <FaPhoneAlt className="text-[#E05A2B] text-2xl mb-3" />
                    <h3 className="text-[14px] text-white/70 font-bold mb-1 uppercase tracking-wider">Telephone</h3>
                    <a href="tel:19024227790" className="text-[18px] font-black hover:text-[#E05A2B] transition-colors">
                      1-902-422-7790
                    </a>
                  </div>

                  <div className="bg-white border-2 border-gray-100 rounded-[24px] p-7 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-md transition-all">
                    <FaFax className="text-[#112A46]/40 text-2xl mb-3" />
                    <h3 className="text-[14px] text-[#112A46]/60 font-bold mb-1 uppercase tracking-wider">Fax</h3>
                    <span className="text-[18px] font-black text-[#112A46]">
                      1-902-420-9786
                    </span>
                  </div>
                </Reveal>

              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[450px] bg-gray-200 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.293424683058!2d-63.56860368425113!3d44.6318359790998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a223631f45025%3A0xc47eeb09f06a0302!2s844%20Marginal%20Rd%2C%20Halifax%2C%20NS%20B3H%202P7%2C%20Canada!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mission to Seafarers Halifax Map"
            className="absolute inset-0 grayscale-[20%] contrast-125"
          ></iframe>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}