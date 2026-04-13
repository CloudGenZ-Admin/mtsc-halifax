import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { FaMapMarkerAlt, FaPhoneAlt, FaFax, FaClock, FaShip, FaCheckCircle } from 'react-icons/fa';

import centerImage from '../assets/MtS Halifax Center.jpg';

export default function Contact() {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const maxChars = 600;

  // 1. Form State Management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    inquiryType: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > maxChars) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Form Submit Handler (GOOGLE FORM INTEGRATION)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Check if emails match
    if (formData.email !== formData.confirmEmail) {
      setErrorMsg("Emails do not match!");
      return;
    }

    setIsSubmitting(true);

  
    const FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdDRLf8Fjde4Y-q1oUmoa_5JAbmAFp5TeG0RV3qjyVL3Aabhg/formResponse";

    const data = new FormData();
    
   
    data.append('entry.2050372848', formData.firstName);   // First Name
    data.append('entry.608487628', formData.lastName);    // Last Name
    data.append('entry.278774456', formData.email);       // Email
    data.append('entry.1990273286', formData.inquiryType); // Dropdown
    data.append('entry.1454859148', formData.message);     // Message

    try {
      // mode: 'no-cors' is crucial for Google Forms
      await fetch(FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      });
      
      // Success
      setIsSuccess(true);
      setFormData({
        firstName: '', lastName: '', email: '', confirmEmail: '', inquiryType: 'General Inquiry', message: ''
      });
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="relative bg-[#112A46] pt-32 pb-24 overflow-hidden">
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

        {/* Office Image */}
        <section className="bg-gray-50 pt-16 pb-12 border-b border-gray-200">
          <div className="max-w-[1300px] mx-auto px-6">
            <Reveal>
              <img 
                src={centerImage} 
                alt="MtS Halifax Center" 
                className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-[24px] shadow-[0_8px_30px_rgba(17,42,70,.1)] border-4 border-white"
              />
            </Reveal>
          </div>
        </section>

        {/* 3-COLUMN SECTION */}
        <section className="bg-white py-20">
          <div className="max-w-[1300px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              
              {/* COLUMN 1: HOURS */}
              <Reveal>
                <div className="bg-[#FDF0EC] border-2 border-[#E05A2B]/15 rounded-[24px] p-8 h-full shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#E05A2B] rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-[#E05A2B]/30 shrink-0">
                      <FaClock />
                    </div>
                    <h2 className="text-[22px] font-black text-[#112A46] leading-tight">Hours of Operation</h2>
                  </div>
                  <p className="text-[#112A46]/80 text-[14px] leading-relaxed mb-6 font-medium">
                    We are open Mondays to Saturdays including holidays when ships are in the Port of Halifax. Our hours are flexible depending on whether there are ships in port.
                  </p>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E05A2B]/10">
                    <ul className="flex flex-col gap-3 text-[14px] font-bold text-[#112A46]">
                      <li className="flex justify-between items-center pb-2 border-b border-gray-100 text-gray-400">
                        <span>Sunday</span>
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-[11px] font-extrabold">CLOSED</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span>Monday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span>Tuesday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span>Wednesday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span>Thursday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span>Friday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Saturday</span>
                        <span className="text-[#E05A2B]">10:00 – Closing</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 flex items-start gap-3 text-[#112A46]/70 text-[13px] font-semibold bg-white/50 p-4 rounded-xl">
                    <FaShip className="text-[#E05A2B] mt-0.5 text-[16px] shrink-0" />
                    <p>Hours may vary slightly based on port activity to best serve visiting seafarers.</p>
                  </div>
                </div>
              </Reveal>

              {/* COLUMN 2: ADDRESSES */}
              <Reveal>
                <div className="flex flex-col gap-5 h-full">
                  <div className="bg-white border-2 border-gray-100 hover:border-[#E05A2B]/30 transition-colors rounded-[24px] p-7 shadow-[0_4px_20px_rgba(17,42,70,.03)] flex gap-5 items-start">
                    <div className="w-12 h-12 bg-[#112A46] rounded-full flex items-center justify-center text-white text-lg shrink-0">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-black text-[#112A46] mb-1.5">Civic Address</h3>
                      <p className="text-[#112A46]/70 text-[14px] leading-relaxed font-semibold">
                        Mission to Seafarers Halifax<br />
                        844 Marginal Road<br />
                        Halifax, NS B3H 2P7
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-gray-100 hover:border-[#E05A2B]/30 transition-colors rounded-[24px] p-7 shadow-[0_4px_20px_rgba(17,42,70,.03)] flex gap-5 items-start">
                    <div className="w-12 h-12 bg-[#112A46]/5 rounded-full flex items-center justify-center text-[#112A46] text-lg shrink-0 border border-[#112A46]/10">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-black text-[#112A46] mb-1.5">Mailing Address</h3>
                      <p className="text-[#112A46]/70 text-[14px] leading-relaxed font-semibold">
                        Mission to Seafarers Halifax<br />
                        P.O. Box 27114<br />
                        Halifax, NS B3H 4M8
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#112A46] text-white rounded-[20px] p-5 shadow-lg flex flex-col items-center text-center hover:-translate-y-1 transition-transform cursor-pointer">
                      <FaPhoneAlt className="text-[#E05A2B] text-xl mb-2" />
                      <h3 className="text-[12px] text-white/70 font-bold mb-1 uppercase tracking-wider">Telephone</h3>
                      <a href="tel:19024227790" className="text-[15px] font-black hover:text-[#E05A2B] transition-colors whitespace-nowrap">
                        1-902-422-7790
                      </a>
                    </div>
                    <div className="bg-white border-2 border-gray-100 rounded-[20px] p-5 shadow-sm flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-md transition-all">
                      <FaFax className="text-[#112A46]/40 text-xl mb-2" />
                      <h3 className="text-[12px] text-[#112A46]/60 font-bold mb-1 uppercase tracking-wider">Fax</h3>
                      <span className="text-[15px] font-black text-[#112A46] whitespace-nowrap">
                        1-902-420-9786
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* COLUMN 3: FORM */}
              <Reveal>
                <div className="bg-white p-8 rounded-[24px] border-2 border-gray-100 shadow-[0_8px_30px_rgba(17,42,70,.04)] h-full">
                  
                  {/* Success Message UI */}
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10">
                      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                      <h2 className="text-[26px] font-bold text-[#112A46] mb-2">Message Sent!</h2>
                      <p className="text-gray-600 text-[15px]">Thank you for reaching out. We will get back to you shortly.</p>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="mt-6 text-[#E05A2B] font-bold hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-[26px] font-bold text-[#E05A2B] leading-tight mb-6">
                        Send Us a Message
                      </h2>

                      {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-[13px] mb-4 font-medium border border-red-100">
                          {errorMsg}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-serif text-[14px]">
                        {/* Name */}
                        <div>
                          <span className="text-[#112A46] font-semibold block mb-1.5 font-sans">
                            Name <span className="text-[#E05A2B] text-[12px] font-normal">(Required)</span>
                          </span>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-gray-500 text-[12px] block mb-1">First</label>
                              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-300 rounded-[6px] p-2 focus:outline-none focus:border-[#2A4582] focus:ring-1 focus:ring-[#2A4582]" />
                            </div>
                            <div>
                              <label className="text-gray-500 text-[12px] block mb-1">Last</label>
                              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-300 rounded-[6px] p-2 focus:outline-none focus:border-[#2A4582] focus:ring-1 focus:ring-[#2A4582]" />
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <span className="text-[#112A46] font-semibold block mb-1.5 font-sans">
                            Email <span className="text-[#E05A2B] text-[12px] font-normal">(Required)</span>
                          </span>
                          <div className="grid grid-cols-1 gap-3">
                            <div>
                              <label className="text-gray-500 text-[12px] block mb-1">Enter Email</label>
                              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-[6px] p-2 focus:outline-none focus:border-[#2A4582] focus:ring-1 focus:ring-[#2A4582]" />
                            </div>
                            <div>
                              <label className="text-gray-500 text-[12px] block mb-1">Confirm Email</label>
                              <input type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required className="w-full border border-gray-300 rounded-[6px] p-2 focus:outline-none focus:border-[#2A4582] focus:ring-1 focus:ring-[#2A4582]" />
                            </div>
                          </div>
                        </div>

                        {/* Dropdown */}
                        <div>
                          <label className="text-[#112A46] font-semibold block mb-1.5 font-sans">
                            What would you like to chat about?
                          </label>
                          <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full border border-gray-300 bg-white rounded-[6px] p-2 focus:outline-none focus:border-[#2A4582] focus:ring-1 focus:ring-[#2A4582]">
                            <option>General Inquiry</option>
                            <option>Volunteer</option>
                            <option>Corporate Partnership</option>
                            <option>Financial Gift</option>
                          </select>
                        </div>

                        {/* Message Area */}
                        <div>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 rounded-[6px] p-2 focus:outline-none focus:border-[#2A4582] focus:ring-1 focus:ring-[#2A4582] resize-y"
                          ></textarea>
                          <div className="text-gray-500 text-[11px] mt-1 text-right font-sans">
                            {formData.message.length} of {maxChars} max characters
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="mt-1 font-sans cursor-pointer">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`font-bold py-2.5  px-6 rounded-[8px] cursor-pointer shadow-md transition-colors w-full text-[14px] ${isSubmitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#2A4582] hover:bg-[#1C3263] text-white'}`}
                          >
                            {isSubmitting ? 'Sending...' : 'Submit Message'}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[450px] bg-gray-200 relative border-t border-gray-200">
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