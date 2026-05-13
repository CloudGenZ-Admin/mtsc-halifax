// import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import Reveal from '../components/common/Reveal';
// import {
//   FaHeart, FaHandsHelping, FaDollarSign, FaGift, FaUsers, FaBuilding,
//   FaBullhorn, FaHandshake, FaAnchor, FaShip, FaStar
// } from 'react-icons/fa';

// // Import newly created forms
// import { 
//   Modal, 
//   PartnershipForm, 
//   VolunteerForm, 
//   WorkplaceForm 
// } from '../components/forms/WaysToGiveForms';

// // Import images
// import portHalifaxImg from '../assets/port_halifax.jpg';
// import volunteersImg from '../assets/MtS Halifax Center.jpg';

// // CanadaHelps Embedded Widget Component
// const CanadaHelpsWidget = ({ pageId, formType }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // We use a small timeout to bypass React 18 Strict Mode double-invocations.
//     const timeoutId = setTimeout(() => {
//       if (!containerRef.current) return;

//       containerRef.current.innerHTML = '';
//       const script = document.createElement('script');
//       script.id = 'ch_cdn_embed';
//       script.type = 'text/javascript';
//       script.src = 'https://www.canadahelps.org/secure/js/cdf_embed.2.js';
//       script.charset = 'utf-8';
//       script.setAttribute('data-language', 'en');
//       script.setAttribute('data-page-id', pageId);
//       script.setAttribute('data-root-url', 'https://www.canadahelps.org');
//       script.setAttribute('data-formtype', formType);
//       script.setAttribute('data-cfasync', 'false');

//       containerRef.current.appendChild(script);
//     }, 50);

//     return () => {
//       clearTimeout(timeoutId);
//       if (containerRef.current) {
//         containerRef.current.innerHTML = '';
//       }
//     };
//   }, [pageId, formType]);

//   return <div ref={containerRef} className="w-full min-h-[600px]"></div>;
// };

// export default function WaystoGive() {
//   const [activeForm, setActiveForm] = useState(null); // null, 'monthly', or 'onetime'
//   const [activeModal, setActiveModal] = useState(null); // null, 'sponsorship', 'workplace', 'volunteer', 'partnership'
//   const donationSectionRef = useRef(null);

//   const handleScrollToDonate = () => {
//     setActiveForm(null); 
//     donationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     alert("Thank you! Your form has been successfully submitted.");
//     setActiveModal(null);
//   };

//   // All sponsors from Sponsors page
//   const allSponsors = [
//     "100 Bluenosers Who Care", "AON", "Associated Cargo Specialists", "Atlantic Towing Ltd", 
//     "Atship Services Ltd.", "Atlantic Container Line", "Atlantic Pilotage Authority", 
//     "Blue Water Agencies Ltd.", "CN", "CERES", "Canadian Institute of Marine Engineering", 
//     "Canadian Steamship Lines", "Colley Motorships Ltd.", "Diocese Synod of NS and PEI", 
//     "Edmonds Landscape & Construction Services Ltd", "F.K. Warren Ltd.", "Flying Angel Fund", 
//     "Freight Checkers Union 1342", "Halifax Marriot Habourside Hotel", "Halifax Pilots", 
//     "Halifax Port Authority", "Horizon Maritime Services", "ILA 269 Halifax Long Shoreman's Association", 
//     "Inchcape Shipping Services", "International Sailor's Society Canada", "ITF Seafarer's Trust", 
//     "Logistec Stevedoring", "Maritime World Logistics", "Mark & Dr. Joanne MacDonald", 
//     "Metcalf & Company", "Mothers Union of NS and PEI", "MV Asterix", "NAMMA", "NICOM IT", 
//     "Open Church/Reachout Society for Humanitarian Aid", "Partner International Inc.", 
//     "P & H Milling Group", "PRAXES Medical Group", "PSA HALIFAX", "Protos Shipping Ltd.", 
//     "Quay Marine Associates", "RCR", "Secunda", "Stewart Mckelvey", "The Company of Master Mariners", 
//     "The Shipping Federation of Canada", "TK Foundation", "UNIFOR Marine Workers Union", 
//     "Vanco Farms", "Wallenius Willhelmsen Logistics", "ZIM Integrated Shipping Services Ltd.",
//     "Atlantic Towing Ltd", "Atship Services Ltd", "Atlantic Container Line", 
//     "Atlantic Pilotage Authority", "Blue Water Agencies Ltd.", "Canadian Institute of Marine Engineering", 
//     "Canadian Steamship Lines", "Colley Motorships Ltd", "CN", "Diocese Synod of NS & PE", 
//     "Edmonds Landscape & Construction Services Ltd.", "F.K.Warren Ltd", "The Halifax Pilots", 
//     "Halifax Port Authority", "Hapag Lloyd (Canada) Ltd.", "Holland America Line", "LeeWay Marine", 
//     "Logistec Stevedoring", "Metcalf & Company", "International Sailors' Society Canada", 
//     "Northrop Grumman", "Partner International Inc.", "P & H Milling Group", "Protos Shipping Ltd.", 
//     "Spectacle Group", "Svitzer Canada Ltd.", "Wallenius Willhelmsen Logistics", 
//     "ZIM Integrated Shipping Services Ltd."
//   ];

//   // Remove duplicates for general sponsors
//   const uniqueSponsors = [...new Set(allSponsors)];
//   // Take top 28 for Star Club members
//   const starSponsors = uniqueSponsors.slice(0, 28);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       {/* --- INJECT MARQUEE ANIMATION STYLES --- */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes marquee {
//           0% { transform: translateX(0%); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes marquee-reverse {
//           0% { transform: translateX(-50%); }
//           100% { transform: translateX(0%); }
//         }
//         .animate-marquee {
//           animation: marquee 60s linear infinite;
//           width: max-content;
//         }
//         .animate-marquee-reverse {
//           animation: marquee-reverse 40s linear infinite;
//           width: max-content;
//         }
//         .animate-marquee:hover, .animate-marquee-reverse:hover {
//           animation-play-state: paused;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}} />

//       {/* --- MODALS --- */}
//       <Modal 
//         isOpen={activeModal === 'sponsorship'} 
//         onClose={() => setActiveModal(null)} 
//         title="Partner Through Sponsorship"
//       >
//         <CanadaHelpsWidget pageId="146459" formType="0" />
//       </Modal>

//       <Modal 
//         isOpen={activeModal === 'workplace'} 
//         onClose={() => setActiveModal(null)} 
//         title="Workplace Engagement"
//       >
//         <WorkplaceForm onSubmit={handleFormSubmit} />
//       </Modal>

//       <Modal 
//         isOpen={activeModal === 'volunteer'} 
//         onClose={() => setActiveModal(null)} 
//         title="Volunteer & Advocacy"
//       >
//         <VolunteerForm onSubmit={handleFormSubmit} />
//       </Modal>

//       <Modal 
//         isOpen={activeModal === 'partnership'} 
//         onClose={() => setActiveModal(null)} 
//         title="Partnership Inquiry"
//       >
//         <PartnershipForm onSubmit={handleFormSubmit} />
//       </Modal>

//       <main className="flex-grow">
//         {/* Hero Section */}
//         <section className="relative pt-24 pb-32 overflow-hidden">
//           <div className="absolute inset-0 z-0">
//             <img
//               src={portHalifaxImg}
//               alt="Port of Halifax"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-[#112A46]/90 via-[#2D5A7B]/85 to-[#E05A2B]/70"></div>
//           </div>

//           <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
//             <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-white/30">
//               ✦ Support Our Mission
//             </span>
//             <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-lg">
//               Get Involved with <span className="text-[#FFD700]">Mission to Seafarers Halifax</span>
//             </h1>
//             <p className="text-white/90 text-[18px] max-w-3xl mx-auto leading-relaxed">
//               There are many ways to support and help create a welcoming place for seafarers arriving at the Port of Halifax. Whether you choose to volunteer, donate, provide in-kind support, or partner with us, your support helps ensure that seafarers feel cared for.
//             </p>
//           </div>
//         </section>

//         {/* Donation Section */}
//         <section ref={donationSectionRef} className="py-24 bg-white scroll-mt-20">
//           <div className="max-w-[1200px] mx-auto px-7">
            
//             {/* Section Header */}
//             <Reveal className="text-center mb-16">
//               <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
//                 <FaDollarSign className="inline mr-1" /> DONATE
//               </span>
//               <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">
//                 Donate – Help Care for Seafarers
//               </h2>
//               <p className="text-[#5A6C7D] text-[17px] max-w-2xl mx-auto leading-relaxed">
//                 Every gift helps us provide hospitality, practical support, transportation, Wi-Fi, refreshments, haircuts, and a welcoming place for seafarers visiting Halifax.
//               </p>
//             </Reveal>

//             {/* Render Cards OR Embedded Form based on state */}
//             {!activeForm ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//                 {/* Monthly Giving */}
//                 <Reveal>
//                   <div className="bg-gradient-to-br from-[#F8FBFD] to-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#112A46]/5 hover:shadow-2xl transition-all h-full flex flex-col">
//                     <div className="flex items-center gap-3 mb-6">
//                       <div className="w-12 h-12 bg-[#E05A2B] rounded-xl flex items-center justify-center">
//                         <FaHeart className="text-white text-xl" />
//                       </div>
//                       <h3 className="text-[24px] font-black text-[#112A46]">Monthly Giving</h3>
//                     </div>
                    
//                     <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6">
//                       Become a monthly donor and help provide ongoing care and support throughout the year. Monthly gifts help us plan ahead.
//                     </p>

//                     <div className="space-y-3 mb-8 flex-grow">
//                       <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E05A2B]/10">
//                         <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
//                           <span className="text-[#E05A2B] text-xs font-black">$15</span>
//                         </div>
//                         <span className="text-[#112A46] text-[14px] font-medium">/month provides refreshments & hospitality</span>
//                       </div>
//                       <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E05A2B]/10">
//                         <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
//                           <span className="text-[#E05A2B] text-xs font-black">$25</span>
//                         </div>
//                         <span className="text-[#112A46] text-[14px] font-medium">/month supports transportation & Wi-Fi</span>
//                       </div>
//                       <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E05A2B]/10">
//                         <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
//                           <span className="text-[#E05A2B] text-xs font-black">$50</span>
//                         </div>
//                         <span className="text-[#112A46] text-[14px] font-medium">/month provides practical assistance & care</span>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => setActiveForm('monthly')}
//                       className="inline-flex items-center justify-center gap-2 bg-[#112A46] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#1a3a5f] transition-all shadow-lg hover:shadow-xl w-full"
//                     >
//                       Become a Monthly Donor
//                     </button>
//                   </div>
//                 </Reveal>

//                 {/* One-Time Gift */}
//                 <Reveal delay={100}>
//                   <div className="bg-gradient-to-br from-[#FDF0EC] to-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#E05A2B]/10 hover:shadow-2xl transition-all h-full flex flex-col">
//                     <div className="flex items-center gap-3 mb-6">
//                       <div className="w-12 h-12 bg-[#E05A2B] rounded-xl flex items-center justify-center">
//                         <FaGift className="text-white text-xl" />
//                       </div>
//                       <h3 className="text-[24px] font-black text-[#112A46]">One-Time Gift</h3>
//                     </div>
                    
//                     <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-8 flex-grow">
//                       Make a one-time donation to support Mission to Seafarers Halifax. Your gift helps create a welcoming space and care for seafarers right when they arrive.
//                     </p>

//                     <button
//                       onClick={() => setActiveForm('onetime')}
//                       className="inline-flex items-center justify-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl w-full"
//                     >
//                       Make a One-Time Gift
//                     </button>
//                   </div>
//                 </Reveal>
//               </div>
//             ) : (
//               /* Embedded Form View */
//               <Reveal className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-[#112A46]/10">
//                 <button 
//                   onClick={() => setActiveForm(null)}
//                   className="mb-8 flex items-center gap-2 text-[#E05A2B] font-bold text-[15px] hover:text-[#c94d23] hover:-translate-x-1 transition-all"
//                 >
//                   ← Back to Donation Options
//                 </button>
                
//                 {activeForm === 'monthly' ? (
//                   <CanadaHelpsWidget key="form-monthly" pageId="110798" formType="4" />
//                 ) : (
//                   <CanadaHelpsWidget key="form-onetime" pageId="42880" formType="0" />
//                 )}
//               </Reveal>
//             )}
//           </div>
//         </section>

//         {/* Choose How You Would Like to Support */}
//         <section className="relative py-24 overflow-hidden">
//           {/* Soft maritime background */}
//           <div className="absolute inset-0">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFD] via-[#EBF4F9] to-[#E0EEF7]"></div>
//             <svg className="absolute bottom-0 left-0 w-full h-64 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
//               <path fill="#112A46" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
//             </svg>
//           </div>

//           <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            
//             <Reveal className="text-center mb-16">
//               <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
//                 WAYS TO HELP
//               </span>
//               <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">
//                 Choose How You Would Like to Support
//               </h2>
//             </Reveal>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
//               {/* Partner Through Sponsorship */}
//               <Reveal>
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
//                   <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
//                     <FaHandshake className="text-[#E05A2B] text-2xl" />
//                   </div>
//                   <h3 className="text-[20px] font-black text-[#112A46] mb-3">Partner Through Sponsorship</h3>
//                   <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
//                     <li>• Fund a Project</li>
//                     <li>• Sponsor a Program</li>
//                     <li>• Sponsor an Event</li>
//                   </ul>
//                   <button
//                     onClick={() => setActiveModal('sponsorship')}
//                     className="inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
//                   >
//                     Sponsor Now →
//                   </button>
//                 </div>
//               </Reveal>

//               {/* Engage Your Workplace */}
//               <Reveal delay={100}>
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
//                   <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
//                     <FaBuilding className="text-[#E05A2B] text-2xl" />
//                   </div>
//                   <h3 className="text-[20px] font-black text-[#112A46] mb-3">Engage Your Workplace</h3>
//                   <p className="text-[#5A6C7D] text-[14px] mb-4">Empower your team to make a difference together.</p>
//                   <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
//                     <li>• <a href="https://portal.healthpartners.ca/servlet/eAndar.article/30" target="_blank" rel="noopener noreferrer" className="text-[#E05A2B] hover:underline">Workplace or Payroll Giving</a></li>
//                     <li>• Employer Matching Gifts</li>
//                     <li>• Volunteer Grants</li>
//                     <li>• Union or Association Partnerships</li>
//                   </ul>
//                   <button
//                     onClick={() => setActiveModal('workplace')}
//                     className="inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
//                   >
//                     Fill out the form →
//                   </button>
//                 </div>
//               </Reveal>

//               {/* Awareness Through Purpose */}
//               <Reveal delay={200}>
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
//                   <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
//                     <FaBullhorn className="text-[#E05A2B] text-2xl" />
//                   </div>
//                   <h3 className="text-[20px] font-black text-[#112A46] mb-3">Awareness Through Purpose</h3>
//                   <p className="text-[#5A6C7D] text-[14px] mb-4">Host an event on our behalf:</p>
//                   <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
//                     <li>• Birthdays</li>
//                     <li>• Bake sales</li>
//                     <li>• Knitting groups</li>
//                     <li>• Garage sales</li>
//                   </ul>
//                   <a
//                     href="https://fundraising.mtsc.ca/?_gl=1*146le4y*_ga*MTM4NDM0OTE4My4xNzc4MDgxMDQx*_ga_PRGHG34XYT*czE3NzgxODUzMjAkbzgkZzEkdDE3NzgxODUzNzQkajYkbDAkaDA."
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
//                   >
//                     Start Fundraising →
//                   </a>
//                 </div>
//               </Reveal>

//               {/* Volunteer & Advocate */}
//               <Reveal>
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
//                   <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
//                     <FaUsers className="text-[#E05A2B] text-2xl" />
//                   </div>
//                   <h3 className="text-[20px] font-black text-[#112A46] mb-3">Volunteer & Advocate</h3>
//                   <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
//                     <li>• Become a Volunteer</li>
//                     <li>• Raise Awareness</li>
//                     <li>• Share Our Work on Your Social Feed</li>
//                     <li>• Refer Our Organization for a Grant</li>
//                   </ul>
//                   <button
//                     onClick={() => setActiveModal('volunteer')}
//                     className="inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
//                   >
//                     Get Involved →
//                   </button>
//                 </div>
//               </Reveal>

//               {/* Explore Customized Partnership Opportunities */}
//               <Reveal delay={100}>
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
//                   <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
//                     <FaAnchor className="text-[#E05A2B] text-2xl" />
//                   </div>
//                   <h3 className="text-[20px] font-black text-[#112A46] mb-3">Explore Customized Partnership Opportunities</h3>
//                   <p className="text-[#5A6C7D] text-[14px] mb-6">
//                     Across Halifax's Port
//                   </p>
//                   <button
//                     onClick={() => setActiveModal('partnership')}
//                     className="inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
//                   >
//                     Contact Us →
//                   </button>
//                 </div>
//               </Reveal>

//               {/* In-Kind Gifts */}
//               <Reveal delay={200}>
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
//                   <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
//                     <FaGift className="text-[#E05A2B] text-2xl" />
//                   </div>
//                   <h3 className="text-[20px] font-black text-[#112A46] mb-3">In-Kind Gifts</h3>
//                   <p className="text-[#5A6C7D] text-[14px] mb-6">
//                     Support us with goods and services from our wishlist
//                   </p>
//                   <a
//                     href="https://www.amazon.ca/hz/wishlist/ls/3C9KTQNHTZ0NM/ref=hz_ls_biz_ex"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
//                   >
//                     View Wishlist →
//                   </a>
//                 </div>
//               </Reveal>

//             </div>
//           </div>
//         </section>

//         {/* ======================================================== */}
//         {/* AUTO-SCROLLING GENERAL SPONSORS SECTION                  */}
//         {/* ======================================================== */}
//         <section className="py-24 bg-gradient-to-br from-[#F8FBFD] via-[#EBF4F9] to-[#E0EEF7] overflow-hidden">
//           <div className="max-w-[1200px] mx-auto px-7 mb-14">
//             <Reveal className="text-center">
//               <FaHeart className="text-[#E05A2B] text-4xl mx-auto mb-4" />
//               <h2 className="text-[34px] md:text-[40px] font-black text-[#112A46] mb-4 leading-tight">
//                 The Mission to Seafarers Halifax is <br className="hidden md:block"/> grateful to our Sponsors!
//               </h2>
//               <p className="text-[#5A6C7D] max-w-2xl mx-auto text-[17px]">
//                 Your generous support ensures we can continue to provide a "home away from home" for seafarers visiting our port.
//               </p>
//             </Reveal>
//           </div>

//           {/* Marquee Wrapper */}
//           <div className="w-full relative flex flex-col gap-6">
//             <div className="flex animate-marquee hover:[animation-play-state:paused]">
              
//               {/* Box 1 (Original List) */}
//               <div className="flex gap-4 pr-4 pl-4">
//                 {uniqueSponsors.map((sponsor, index) => (
//                   <div 
//                     key={`gen1-${index}`} 
//                     className="shrink-0 w-[240px] bg-white border border-[#112A46]/5 rounded-xl px-4 py-4 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group min-h-[80px]"
//                   >
//                     <span className="font-bold text-[13px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-snug whitespace-normal break-words">
//                       {sponsor}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Box 2 (Duplicated List for Seamless Loop) */}
//               <div className="flex gap-4 pr-4">
//                 {uniqueSponsors.map((sponsor, index) => (
//                   <div 
//                     key={`gen2-${index}`} 
//                     className="shrink-0 w-[240px] bg-white border border-[#112A46]/5 rounded-xl px-4 py-4 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group min-h-[80px]"
//                   >
//                     <span className="font-bold text-[13px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-snug whitespace-normal break-words">
//                       {sponsor}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         </section>

//         {/* Corporate Sponsorship Info */}
//         <section className="pt-24 pb-12 bg-white border-t-4 border-[#E05A2B]">
//           <div className="max-w-[1200px] mx-auto px-7">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//               <Reveal>
//                 <h2 className="text-[36px] font-black text-[#112A46] leading-tight mb-6">
//                   Corporate Sponsorship Opportunities
//                 </h2>
//                 <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6">
//                   Partnering with the Mission will provide your organization with extraordinary and rewarding relationship opportunities on both a local and global stage.
//                 </p>
//                 <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-8">
//                   Our team is happy to work with you to find a fit that realizes your philanthropic corporate social responsibility goal. Please check out how to become a community sponsor through our <strong>STAR PROGRAM</strong> and/or <strong>CORPORATE SPONSORSHIP PACKAGE</strong>.
//                 </p>
//                 <div className="flex flex-wrap gap-4">
//                   <div className="flex items-center gap-3 bg-[#FDF0EC] px-5 py-3 rounded-xl border border-[#E05A2B]/20">
//                     <FaShip className="text-[#E05A2B] text-xl" />
//                     <span className="font-bold text-[14px] text-[#112A46]">Global Reach</span>
//                   </div>
//                   <div className="flex items-center gap-3 bg-[#FDF0EC] px-5 py-3 rounded-xl border border-[#E05A2B]/20">
//                     <FaBuilding className="text-[#E05A2B] text-xl" />
//                     <span className="font-bold text-[14px] text-[#112A46]">Local Impact</span>
//                   </div>
//                 </div>
//               </Reveal>

//               {/* Program Cards */}
//               <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="bg-[#E05A2B] border-2 border-[#E05A2B] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
//                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
//                     <FaHandshake className="text-3xl text-[#E05A2B]" />
//                   </div>
//                   <h3 className="text-[18px] font-black text-white mb-3 leading-tight">STAR<br/>Program</h3>
//                   <p className="text-[13px] text-white/90 mb-6 leading-relaxed">
//                     Join an elite group of recurring sponsors dedicated to seafarer welfare.
//                   </p>
//                 </div>

//                 <div className="bg-[#112A46] border-2 border-[#112A46] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
//                   <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
//                     <FaBuilding className="text-3xl text-white" />
//                   </div>
//                   <h3 className="text-[18px] font-black text-white mb-3 leading-tight">Corporate<br/>Package</h3>
//                   <p className="text-[13px] text-white/70 mb-6 leading-relaxed">
//                     Customized sponsorship packages designed for maximum CSR impact.
//                   </p>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </section>

//         {/* ======================================================== */}
//         {/* AUTO-SCROLLING STAR CLUB MEMBERS SECTION                 */}
//         {/* ======================================================== */}
//         <section className="pb-24 pt-12 bg-white overflow-hidden">
//           <div className="max-w-[1200px] mx-auto px-7">
//             <div className="bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] rounded-[32px] py-12 border border-[#112A46]/5 shadow-sm relative overflow-hidden">
              
//               <Reveal className="text-center px-6 mb-10">
//                 <div className="inline-flex items-center justify-center gap-2 text-[#E05A2B] mb-4">
//                   <FaStar /><FaStar className="text-2xl" /><FaStar />
//                 </div>
//                 <h3 className="text-[32px] font-black text-[#112A46] mb-4">Star Club Members</h3>
//                 <p className="text-[#5A6C7D] max-w-2xl mx-auto text-[16px] font-medium">
//                   THANK YOU to our sponsors without whom we could not offer our service.
//                 </p>
//               </Reveal>

//               {/* Star Club Marquee Wrapper */}
//               <div className="w-full relative">
//                 <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
                  
//                   {/* Box 1 (Original List) */}
//                   <div className="flex gap-4 pr-4 pl-4">
//                     {starSponsors.map((sponsor, index) => (
//                       <div 
//                         key={`star1-${index}`} 
//                         className="shrink-0 w-[260px] md:w-[300px] bg-white border border-gray-100 rounded-2xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group min-h-[100px]"
//                       >
//                         <span className="font-extrabold text-[15px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-tight whitespace-normal break-words">
//                           {sponsor}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Box 2 (Duplicated List for Seamless Loop) */}
//                   <div className="flex gap-4 pr-4">
//                     {starSponsors.map((sponsor, index) => (
//                       <div 
//                         key={`star2-${index}`} 
//                         className="shrink-0 w-[260px] md:w-[300px] bg-white border border-gray-100 rounded-2xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group min-h-[100px]"
//                       >
//                         <span className="font-extrabold text-[15px] text-[#112A46] group-hover:text-[#E05A2B] transition-colors leading-tight whitespace-normal break-words">
//                           {sponsor}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                 </div>
//               </div>
              
//             </div>

//             {/* CTA to become a sponsor */}
//             <Reveal className="text-center mt-12">
//               <button
//                 onClick={() => setActiveModal('partnership')}
//                 className="inline-flex items-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl"
//               >
//                 <FaHandshake />
//                 Become a Sponsor
//               </button>
//             </Reveal>
            
//           </div>
//         </section>

//         {/* Final Call to Action */}
//         <section className="relative py-24 overflow-hidden">
//           <div className="absolute inset-0 z-0">
//             <img
//               src={volunteersImg}
//               alt="MTSC Halifax"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-[#E05A2B]/90"></div>
//           </div>

//           <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
//             <Reveal>
//               <FaHeart className="text-white text-5xl mx-auto mb-6 opacity-90" />
//               <h2 className="text-[clamp(32px,4vw,48px)] font-black text-white mb-6 leading-tight">
//                 Every Act of Kindness Makes a Difference
//               </h2>
//               <p className="text-white/90 text-[18px] max-w-3xl mx-auto leading-relaxed mb-10">
//                 From a warm drink and a haircut to a monthly donation or a few hours of volunteering, every act of support helps remind seafarers that they are not alone.
//               </p>

//               <div className="flex flex-wrap justify-center gap-4">
//                 <button
//                   onClick={handleScrollToDonate}
//                   className="inline-flex items-center gap-2 bg-white text-[#E05A2B] px-8 py-4 rounded-full font-bold text-[15px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
//                 >
//                   Donate Now
//                 </button>
//                 <Link
//                   to="/contact"
//                   className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white hover:text-[#E05A2B] transition-all"
//                 >
//                   Contact Us
//                 </Link>
//               </div>
//             </Reveal>
//           </div>
//         </section>

//       </main>
//       <Footer />
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaHeart, FaBuilding, FaBullhorn, FaHandshake, FaAnchor, FaShip, FaStar, FaGift, FaUsers, FaDollarSign
} from 'react-icons/fa';

// Import newly created forms
import { 
  Modal, 
  PartnershipForm, 
  VolunteerForm, 
  WorkplaceForm 
} from '../components/forms/WaysToGiveForms';

// Import images
import portHalifaxImg from '../assets/port_halifax.jpg';
import volunteersImg from '../assets/MtS Halifax Center.jpg';

// Import Sponsor Logos
import img1 from '../assets/images/image1.png';
import img2 from '../assets/images/image2.png';
import img3 from '../assets/images/image3.png';
import img4 from '../assets/images/image4.png';
import img5 from '../assets/images/image5.png';
import img6 from '../assets/images/image6.png';
import img7 from '../assets/images/image7.png';
import img8 from '../assets/images/image8.png';
import img9 from '../assets/images/image9.png';
import img10 from '../assets/images/image10.png';
import img11 from '../assets/images/image11.png';
import img12 from '../assets/images/image12.png';
import img13 from '../assets/images/image13.png';
import img14 from '../assets/images/image14.png';
import img15 from '../assets/images/image15.png';
import img16 from '../assets/images/image16.png';
import img17 from '../assets/images/image17.png';
import img18 from '../assets/images/image18.png';
import img19 from '../assets/images/image19.png';
import img20 from '../assets/images/image20.png';
import img21 from '../assets/images/image21.png';
import img22 from '../assets/images/image22.png';
import img23 from '../assets/images/image23.png';
import img24 from '../assets/images/image24.png';
import img25 from '../assets/images/image25.png';

// Sponsor logo array for dynamic rendering
const sponsorLogos = [
  img12, img13, img2, img14, img15, img16, img17, img18, img19, img20, 
  img21,  img3, img4, 
  img5, img6, img7, img8, img9, img10, img11 ,img22, img23, img24, img25, img1,
];

// CanadaHelps Embedded Widget Component (Restored)
const CanadaHelpsWidget = ({ pageId, formType }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // We use a small timeout to bypass React 18 Strict Mode double-invocations.
    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.id = 'ch_cdn_embed';
      script.type = 'text/javascript';
      script.src = 'https://www.canadahelps.org/secure/js/cdf_embed.2.js';
      script.charset = 'utf-8';
      script.setAttribute('data-language', 'en');
      script.setAttribute('data-page-id', pageId);
      script.setAttribute('data-root-url', 'https://www.canadahelps.org');
      script.setAttribute('data-formtype', formType);
      script.setAttribute('data-cfasync', 'false');

      containerRef.current.appendChild(script);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [pageId, formType]);

  return <div ref={containerRef} className="w-full min-h-[600px]"></div>;
};

export default function WaystoGive() {
  const [activeForm, setActiveForm] = useState(null); // null, 'monthly', or 'onetime'
  const [activeModal, setActiveModal] = useState(null); // null, 'sponsorship', 'workplace', 'volunteer', 'partnership'
  const donationSectionRef = useRef(null);

  const handleScrollToDonate = () => {
    setActiveForm(null); 
    donationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your form has been successfully submitted.");
    setActiveModal(null);
  };

  // Split logos for visual variety between the two scrolling sections
  const generalLogos = sponsorLogos.slice(0, 15);
  const starLogos = sponsorLogos.slice(15, 25);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* --- INJECT MARQUEE ANIMATION STYLES --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
          width: max-content;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* --- MODALS --- */}
      <Modal 
        isOpen={activeModal === 'sponsorship'} 
        onClose={() => setActiveModal(null)} 
        title="Partner Through Sponsorship"
      >
        {/* Restored CanadaHelps for Sponsorship */}
        <CanadaHelpsWidget pageId="146459" formType="0" />
      </Modal>

      <Modal 
        isOpen={activeModal === 'workplace'} 
        onClose={() => setActiveModal(null)} 
        title="Workplace Engagement"
      >
        <WorkplaceForm onSubmit={handleFormSubmit} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'volunteer'} 
        onClose={() => setActiveModal(null)} 
        title="Volunteer & Advocacy"
      >
        <VolunteerForm onSubmit={handleFormSubmit} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'partnership'} 
        onClose={() => setActiveModal(null)} 
        title="Partnership Inquiry"
      >
        <PartnershipForm onSubmit={handleFormSubmit} />
      </Modal>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={portHalifaxImg}
              alt="Port of Halifax"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#112A46]/90 via-[#2D5A7B]/85 to-[#E05A2B]/70"></div>
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-white/30">
              ✦ Support Our Mission
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-lg">
              Get Involved with <span className="text-[#FFD700]">Mission to Seafarers Halifax</span>
            </h1>
            <p className="text-white/90 text-[18px] max-w-3xl mx-auto leading-relaxed">
              There are many ways to support Mission to Seafarers Halifax and help create a welcoming place for seafarers arriving at the Port of Halifax. Whether you choose to volunteer, donate, provide in-kind support, or partner with us, your support helps ensure that seafarers feel cared for, connected, and welcomed while they are far from home.
            </p>
          </div>
        </section>

        {/* Donation Section */}
        <section ref={donationSectionRef} className="py-24 bg-white scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-7">
            
            {/* Section Header */}
            <Reveal className="text-center mb-16">
              <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                <FaDollarSign className="inline mr-1" /> DONATE
              </span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">
                Donate – Help Care for Seafarers
              </h2>
              <p className="text-[#5A6C7D] text-[17px] max-w-2xl mx-auto leading-relaxed">
                Every gift helps us provide hospitality, practical support, transportation, Wi-Fi, refreshments, haircuts, and a welcoming place for seafarers visiting Halifax.
              </p>
            </Reveal>

            {/* Render Cards OR Embedded Form based on state */}
            {!activeForm ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Monthly Giving */}
                <Reveal>
                  <div className="bg-gradient-to-br from-[#F8FBFD] to-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#112A46]/5 hover:shadow-2xl transition-all h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#E05A2B] rounded-xl flex items-center justify-center">
                        <FaHeart className="text-white text-xl" />
                      </div>
                      <h3 className="text-[24px] font-black text-[#112A46]">Monthly Giving</h3>
                    </div>
                    
                    <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6">
                      Become a monthly donor and help provide ongoing care and support for seafarers throughout the year. Monthly gifts help us plan ahead and ensure that seafarers arriving in Halifax always have access to the support they need.
                    </p>

                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E05A2B]/10">
                        <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[#E05A2B] text-xs font-black">$15</span>
                        </div>
                        <span className="text-[#112A46] text-[14px] font-medium">/month can help provide refreshments and hospitality</span>
                      </div>
                      <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E05A2B]/10">
                        <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[#E05A2B] text-xs font-black">$25</span>
                        </div>
                        <span className="text-[#112A46] text-[14px] font-medium">/month can help support transportation and communication needs</span>
                      </div>
                      <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E05A2B]/10">
                        <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[#E05A2B] text-xs font-black">$50</span>
                        </div>
                        <span className="text-[#112A46] text-[14px] font-medium">/month can help provide care, comfort, and practical assistance</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveForm('monthly')}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#112A46] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#1a3a5f] transition-all shadow-lg hover:shadow-xl w-full"
                    >
                      Become a Monthly Donor
                    </button>
                  </div>
                </Reveal>

                {/* One-Time Gift */}
                <Reveal delay={100}>
                  <div className="bg-gradient-to-br from-[#FDF0EC] to-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#E05A2B]/10 hover:shadow-2xl transition-all h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#E05A2B] rounded-xl flex items-center justify-center">
                        <FaGift className="text-white text-xl" />
                      </div>
                      <h3 className="text-[24px] font-black text-[#112A46]">One-Time Gift</h3>
                    </div>
                    
                    <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-8 flex-grow">
                      Make a one-time donation to support Mission to Seafarers Halifax and the work of Mission to Seafarers Canada. Your gift can help create a welcoming station space, support local programs, and care for seafarers when they arrive in Halifax.
                    </p>

                    <button
                      onClick={() => setActiveForm('onetime')}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl w-full"
                    >
                      Make a One-Time Gift
                    </button>
                  </div>
                </Reveal>
              </div>
            ) : (
              /* Embedded Form View (Restored to CanadaHelps) */
              <Reveal className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-[#112A46]/10">
                <button 
                  onClick={() => setActiveForm(null)}
                  className="mb-8 flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[15px] hover:text-[#c94d23] hover:-translate-x-1 transition-all"
                >
                  ← Back to Donation Options
                </button>
                
                {activeForm === 'monthly' ? (
                  <CanadaHelpsWidget key="form-monthly" pageId="110798" formType="4" />
                ) : (
                  <CanadaHelpsWidget key="form-onetime" pageId="42880" formType="0" />
                )}
              </Reveal>
            )}

            {/* Disclaimer under donations */}
            <Reveal delay={200}>
              <p className="text-center text-[#5A6C7D] text-[13px] mt-10 max-w-2xl mx-auto bg-[#F8FBFD] p-4 rounded-xl border border-[#112A46]/5 shadow-sm">
                All donations are processed through Mission to Seafarers Canada in support of the Halifax station and the national mission to care for seafarers across Canada.
              </p>
            </Reveal>

          </div>
        </section>

        {/* Choose How You Would Like to Support */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFD] via-[#EBF4F9] to-[#E0EEF7]"></div>
            <svg className="absolute bottom-0 left-0 w-full h-64 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#112A46" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
            </svg>
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10">
            
            <Reveal className="text-center mb-16">
              <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                WAYS TO HELP
              </span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">
                Choose How You Would Like to Support
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Partner Through Sponsorship */}
              <Reveal>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
                    <FaHandshake className="text-[#E05A2B] text-2xl" />
                  </div>
                  <h3 className="text-[20px] font-black text-[#112A46] mb-3">Partner Through Sponsorship</h3>
                  <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
                    <li>• Fund a Project</li>
                    <li>• Sponsor a Program</li>
                    <li>• Sponsor an Event</li>
                  </ul>
                  <button
                    onClick={() => setActiveModal('sponsorship')}
                    className="inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
                  >
                    Sponsor Now →
                  </button>
                </div>
              </Reveal>

              {/* Engage Your Workplace */}
              <Reveal delay={100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
                    <FaBuilding className="text-[#E05A2B] text-2xl" />
                  </div>
                  <h3 className="text-[20px] font-black text-[#112A46] mb-3">Engage Your Workplace</h3>
                  <p className="text-[#5A6C7D] text-[14px] mb-4">Empower your team to make a difference together.</p>
                  <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
                    <li>• <a href="https://portal.healthpartners.ca/servlet/eAndar.article/30" target="_blank" rel="noopener noreferrer" className="text-[#E05A2B] hover:underline">Workplace or Payroll Giving</a></li>
                    <li>• Employer Matching Gifts</li>
                    <li>• Volunteer Grants</li>
                    <li>• Union or Association Partnerships</li>
                  </ul>
                  <button
                    onClick={() => setActiveModal('workplace')}
                    className="inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
                  >
                    Fill out the form →
                  </button>
                </div>
              </Reveal>

              {/* Awareness Through Purpose */}
              <Reveal delay={200}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
                    <FaBullhorn className="text-[#E05A2B] text-2xl" />
                  </div>
                  <h3 className="text-[20px] font-black text-[#112A46] mb-3">Awareness Through Purpose</h3>
                  <p className="text-[#5A6C7D] text-[14px] mb-4">Host an event on our behalf:</p>
                  <ul className="space-y-2 mb-6 text-[#5A6C7D] text-[14px]">
                    <li>• Birthdays</li>
                    <li>• Bake sales</li>
                    <li>• Knitting groups</li>
                    <li>• Garage sales</li>
                  </ul>
                  <a
                    href="https://fundraising.mtsc.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
                  >
                    Start Fundraising →
                  </a>
                </div>
              </Reveal>

              {/* Volunteer & Advocate */}
              <Reveal>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
                    <FaUsers className="text-[#E05A2B] text-2xl" />
                  </div>
                  <h3 className="text-[20px] font-black text-[#112A46] mb-3">Volunteer with Us</h3>
                  <p className="text-[#5A6C7D] text-[13px] mb-3">By sharing your time and skills, you can help ensure seafarers are welcomed with kindness.</p>
                  <ul className="space-y-1 mb-5 text-[#5A6C7D] text-[13px]">
                    <li>• Help at the station</li>
                    <li>• Support local events</li>
                    <li>• Visit ships alongside our team</li>
                    <li>• Assist with hospitality & support</li>
                    <li>• Donate to the clothing bank</li>
                    <li>• Share professional skills or services</li>
                  </ul>
                  <button
                    onClick={() => setActiveModal('volunteer')}
                    className="inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
                  >
                    Become a Volunteer →
                  </button>
                </div>
              </Reveal>

              {/* Explore Customized Partnership Opportunities */}
              <Reveal delay={100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
                    <FaAnchor className="text-[#E05A2B] text-2xl" />
                  </div>
                  <h3 className="text-[20px] font-black text-[#112A46] mb-3">Explore Customized Partnerships</h3>
                  <p className="text-[#5A6C7D] text-[14px] mb-6">
                    Connect with our team to find a fit that realizes your philanthropic goals across Halifax's Port.
                  </p>
                  <button
                    onClick={() => setActiveModal('partnership')}
                    className="inline-flex cursor-pointer items-center gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
                  >
                    Contact Us →
                  </button>
                </div>
              </Reveal>

              {/* In-Kind Gifts */}
              <Reveal delay={200}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5 h-full">
                  <div className="w-14 h-14 bg-[#E05A2B]/10 rounded-xl flex items-center justify-center mb-5">
                    <FaGift className="text-[#E05A2B] text-2xl" />
                  </div>
                  <h3 className="text-[20px] font-black text-[#112A46] mb-3">In-Kind Gifts</h3>
                  <p className="text-[#5A6C7D] text-[13px] mb-3">We are always grateful for items that help create a comfortable space:</p>
                  <ul className="space-y-1 mb-5 text-[#5A6C7D] text-[13px]">
                    <li>• Snacks & Refreshments</li>
                    <li>• Gift cards & Wi-Fi support</li>
                    <li>• Office & Personal care items</li>
                    <li>• Clothing for Seafarers</li>
                  </ul>
                  <div className="flex flex-col items-start gap-3 mt-auto">
                    <a
                      href="https://www.amazon.ca/hz/wishlist/ls/3C9KTQNHTZ0NM/ref=hz_ls_biz_ex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center cursor-pointer gap-2 text-[#E05A2B] font-bold text-[14px] hover:text-[#c94d23] transition-colors"
                    >
                      View Amazon Wishlist →
                    </a>
                    <Link
                      to="/contact"
                      className="inline-flex items-center cursor-pointer gap-2 text-[#112A46] font-bold text-[14px] hover:text-[#E05A2B] transition-colors"
                    >
                      Contact About In-Kind →
                    </Link>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* AUTO-SCROLLING GENERAL SPONSORS (LOGOS) SECTION          */}
        {/* ======================================================== */}
        <section className="py-24 bg-gradient-to-br from-[#F8FBFD] via-[#EBF4F9] to-[#E0EEF7] overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-7 mb-14">
            <Reveal className="text-center">
              <FaHeart className="text-[#E05A2B] text-4xl mx-auto mb-4" />
              <h2 className="text-[34px] md:text-[40px] font-black text-[#112A46] mb-4 leading-tight">
                The Mission to Seafarers Halifax is <br className="hidden md:block"/> grateful to our Sponsors!
              </h2>
              <p className="text-[#5A6C7D] max-w-2xl mx-auto text-[17px]">
                Your generous support ensures we can continue to provide a "home away from home" for seafarers visiting our port.
              </p>
            </Reveal>
          </div>

          {/* Marquee Wrapper - LOGOS */}
          <div className="w-full relative flex flex-col gap-6">
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              
              {/* Box 1 */}
              <div className="flex gap-6 pr-6 pl-6 items-center">
                {generalLogos.map((logo, index) => (
                  <div 
                    key={`gen1-${index}`} 
                    className="shrink-0 w-[240px] h-[140px] bg-white border border-[#112A46]/5 rounded-xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                  >
                    <img 
                      src={logo} 
                      alt="Sponsor Logo" 
                      className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Box 2 (Duplicated for Loop) */}
              <div className="flex gap-6 pr-6 items-center">
                {generalLogos.map((logo, index) => (
                  <div 
                    key={`gen2-${index}`} 
                    className="shrink-0 w-[240px] h-[140px] bg-white border border-[#112A46]/5 rounded-xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-lg hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                  >
                    <img 
                      src={logo} 
                      alt="Sponsor Logo" 
                      className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Corporate Sponsorship / Community Partners Info */}
        <section className="pt-24 pb-12 bg-white border-t-4 border-[#E05A2B]">
          <div className="max-w-[1200px] mx-auto px-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <h2 className="text-[36px] font-black text-[#112A46] leading-tight mb-6">
                  Community & Business Partners
                </h2>
                <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-4">
                  We welcome support from local businesses, organizations, schools, faith communities, and community groups. Partnering with the Mission will provide your organization with extraordinary and rewarding relationship opportunities.
                </p>
                <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6">
                  You can support local events, volunteer activities, hospitality, and community awareness initiatives. For customized packages, please complete the partnership inquiry form, and our team will connect with you directly at <a href="mailto:marsha.clyne@missiontoseafarers.org" className="text-[#E05A2B] font-bold hover:underline">marsha.clyne@missiontoseafarers.org</a>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={() => setActiveModal('partnership')}
                    className="inline-flex items-center justify-center cursor-pointer gap-2 bg-[#E05A2B] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#c94d23] transition-all shadow-md"
                  >
                    <FaBuilding />
                    Partner with Halifax Station
                  </button>
                  <a
                    href="https://www.missiontoseafarers.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center cursor-pointer gap-2 bg-[#112A46] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#1a3a5f] transition-all shadow-md"
                  >
                    <FaShip />
                    National Partnerships
                  </a>
                </div>
              </Reveal>

              {/* Program Cards */}
              <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#E05A2B] border-2 border-[#E05A2B] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <FaHandshake className="text-3xl text-[#E05A2B]" />
                  </div>
                  <h3 className="text-[18px] font-black text-white mb-3 leading-tight">STAR<br/>Program</h3>
                  <p className="text-[13px] text-white/90 mb-6 leading-relaxed">
                    Join an elite group of recurring sponsors dedicated to seafarer welfare.
                  </p>
                </div>

                <div className="bg-[#112A46] border-2 border-[#112A46] rounded-[24px] p-8 text-center hover:-translate-y-2 transition-transform shadow-lg group">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <FaBuilding className="text-3xl text-white" />
                  </div>
                  <h3 className="text-[18px] font-black text-white mb-3 leading-tight">Corporate<br/>Package</h3>
                  <p className="text-[13px] text-white/70 mb-6 leading-relaxed">
                    Customized sponsorship packages designed for maximum CSR impact.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* AUTO-SCROLLING STAR CLUB MEMBERS (LOGOS) SECTION         */}
        {/* ======================================================== */}
        <section className="pb-24 pt-12 bg-white overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-7">
            <div className="bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] rounded-[32px] py-12 border border-[#112A46]/5 shadow-sm relative overflow-hidden">
              
              <Reveal className="text-center px-6 mb-10">
                <div className="inline-flex items-center justify-center gap-2 text-[#E05A2B] mb-4">
                  <FaStar /><FaStar className="text-2xl" /><FaStar />
                </div>
                <h3 className="text-[32px] font-black text-[#112A46] mb-4">Star Club Members</h3>
                <p className="text-[#5A6C7D] max-w-2xl mx-auto text-[16px] font-medium">
                  THANK YOU to our elite sponsors without whom we could not offer our service.
                </p>
              </Reveal>

              {/* Star Club Marquee Wrapper - LOGOS */}
              <div className="w-full relative">
                <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
                  
                  {/* Box 1 */}
                  <div className="flex gap-6 pr-6 pl-6 items-center">
                    {starLogos.map((logo, index) => (
                      <div 
                        key={`star1-${index}`} 
                        className="shrink-0 w-[240px] h-[140px] bg-white border border-gray-100 rounded-2xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                      >
                        <img 
                          src={logo} 
                          alt="Star Sponsor Logo" 
                          className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Box 2 (Duplicated for Loop) */}
                  <div className="flex gap-6 pr-6 items-center">
                    {starLogos.map((logo, index) => (
                      <div 
                        key={`star2-${index}`} 
                        className="shrink-0 w-[240px] h-[140px] bg-white border border-gray-100 rounded-2xl px-6 py-6 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#E05A2B]/30 hover:-translate-y-1 transition-all group"
                      >
                        <img 
                          src={logo} 
                          alt="Star Sponsor Logo" 
                          className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>

                </div>
              </div>
              
            </div>

            {/* CTA to become a sponsor */}
            <Reveal className="text-center mt-12">
              <button
                onClick={() => setActiveModal('partnership')}
                className="inline-flex items-center gap-2 bg-[#E05A2B] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl"
              >
                <FaHandshake />
                Become a Sponsor
              </button>
            </Reveal>
            
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={volunteersImg}
              alt="MTSC Halifax"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#E05A2B]/90"></div>
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
            <Reveal>
              <FaHeart className="text-white text-5xl mx-auto mb-6 opacity-90" />
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-white mb-6 leading-tight">
                Every Act of Kindness Makes a Difference
              </h2>
              <p className="text-white/90 text-[18px] max-w-3xl mx-auto leading-relaxed mb-10">
                From a warm drink and a haircut to a monthly donation or a few hours of volunteering, every act of support helps remind seafarers that they are not alone.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleScrollToDonate}
                  className="inline-flex items-center gap-2 cursor-pointer bg-white text-[#E05A2B] px-6 py-4 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  <FaDollarSign />
                  Donate Now
                </button>
                <button
                  onClick={() => setActiveModal('volunteer')}
                  className="inline-flex items-center gap-2 cursor-pointer bg-white text-[#E05A2B] px-6 py-4 rounded-full font-bold text-[14px] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  <FaUsers />
                  Become a Volunteer
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 cursor-pointer bg-transparent border-2 border-white text-white px-6 py-4 rounded-full font-bold text-[14px] hover:bg-white hover:text-[#E05A2B] transition-all"
                >
                  Contact Halifax Station
                </Link>
                <a
                  href="https://www.amazon.ca/hz/wishlist/ls/3C9KTQNHTZ0NM/ref=hz_ls_biz_ex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-4 rounded-full font-bold text-[14px] hover:bg-white hover:text-[#E05A2B] transition-all"
                >
                  <FaGift />
                  Gift from Wishlist
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}