// import React, { useState, useEffect, useRef } from 'react';
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { FaChevronDown, FaHandsHelping, FaBars, FaTimes, FaBox, FaGift } from 'react-icons/fa';
// import seafarerLogoImg from '../../assets/seafarers-logo.png';

// const nav = [
//   { to: "/", label: "Home" },
//   { to: "/whoweare", label: "Who We Are" },
//   { to: "/WaystoGive", label: "Get Involved" },
//   { to: "/support", label: "Support" },
//   {
//     to: "/publication",
//     label: "Publications",
//     subItems: [
//       { to: "/publication#halifax-newsletters", label: "Mission to Seafarers Halifax Flying Angel Newsletters" },
//       { to: "/publication#the-sea", label: "Mission to Seafarers The Sea Newsletters" },
//       { to: "/publication#fan", label: "Mission to Seafarers Flying Angel News (FAN)" },
//       { to: "/publication#mts-statistics", label: "MtS Halifax Statistics" },
//       { to: "/publication#happiness-index", label: "Seafarers Happiness Index" },
//       { to: "/publication#esg-strategy", label: "Mission to Seafarers ESG Strategy" },
//       { to: "/publication#foghorn", label: "The Foghorn – Master Mariners of Canada, Maritimes Division" },
//       { to: "/publication#marine-safety", label: "Marine Safety Handbook" },
//       { to: "/publication#mental-health", label: "The Mental Health of Seafarers in Canada During Covid 19 Pandemic" }
//     ]
//   },
//   { to: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileExpanded, setMobileExpanded] = useState(null);
//   const [donateDialogOpen, setDonateDialogOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const headerRef = useRef(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     setOpen(false);
//     setMobileExpanded(null);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (headerRef.current && !headerRef.current.contains(event.target)) {
//         setOpen(false);
//         setMobileExpanded(null);
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("touchstart", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("touchstart", handleClickOutside);
//     };
//   }, [open]);

//   useEffect(() => {
//     if (donateDialogOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [donateDialogOpen]);

//   const toggleMobileAccordion = (label) => {
//     setMobileExpanded(mobileExpanded === label ? null : label);
//   };

//   const handleNavClick = (e, fullPath) => {
//     const [path, hash] = fullPath.split('#');

//     if (location.pathname === path && hash) {
//       setTimeout(() => {
//         const element = document.getElementById(hash);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//       }, 50);
//     }
//     if (open) setOpen(false);
//   };

//   const isActiveHash = (to) => {
//     const [path, hash] = to.split('#');
//     return location.pathname === path && location.hash === (hash ? `#${hash}` : '');
//   };

//   return (
//     <>

//       <header
//         ref={headerRef}
//         className={`sticky top-0 z-40 w-full transition-all duration-300 ${
//           scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(17,42,70,.08)]" : "bg-white/80 backdrop-blur"
//         }`}
//       >
//         <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-4 2xl:px-8 flex h-16 sm:h-20 md:h-24 xl:h-24 2xl:h-28 items-center justify-between gap-1 2xl:gap-4">

//           {/* Logo - Sizes aggressively reduced for xl screens */}
//           <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-1.5 2xl:gap-3 group shrink-0 no-underline">
//             <img
//               src={seafarerLogoImg}
//               alt="Mission to Seafarers Logo"
//               className="h-10 sm:h-14 md:h-16 xl:h-14 2xl:h-20 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
//             />
//             <span className="flex flex-col leading-none justify-center">
//               <span className="text-[12px] sm:text-[14px] xl:text-[13px] 2xl:text-[18px] font-extrabold text-[#112A46] whitespace-nowrap">Mission to Seafarers</span>
//               <span className="text-[9px] sm:text-[10px] xl:text-[10px] 2xl:text-[13px] font-bold uppercase tracking-[0.18em] text-[#E05A2B] mt-0.5 whitespace-nowrap">Halifax</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation - Reduced gap and paddings */}
//           <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-3">
//             {nav.map((n) => (
//               n.subItems ? (
//                 <div key={n.to} className="relative group">
//                   <NavLink
//                     to={n.to}
//                     className={({ isActive }) =>
//                       `flex items-center gap-1 px-1.5 2xl:px-3 py-2 text-[12.5px] 2xl:text-[15px] font-semibold whitespace-nowrap rounded-md transition-colors ${
//                         isActive || location.pathname.includes(n.to) ? "text-[#E05A2B]" : "text-[#112A46] hover:text-[#E05A2B]"
//                       }`
//                     }
//                   >
//                     {n.label}
//                     <FaChevronDown className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 transition-transform group-hover:rotate-180" />
//                   </NavLink>

//                   <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                     <div className="w-[380px] bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,.06)] border border-gray-100 p-2 flex flex-col gap-1">
//                       {n.subItems.map((sub) => (
//                         <Link
//                           key={sub.to}
//                           to={sub.to}
//                           onClick={(e) => handleNavClick(e, sub.to)}
//                           className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-normal ${
//                             isActiveHash(sub.to) ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-gray-600 hover:text-[#112A46] hover:bg-[#f7f7f7]"
//                           }`}
//                         >
//                           {sub.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <NavLink
//                   key={n.to}
//                   to={n.to}
//                   end={n.to === "/"}
//                   className={({ isActive }) =>
//                     `px-1.5 2xl:px-3 py-2 text-[12.5px] 2xl:text-[15px] font-semibold whitespace-nowrap rounded-md transition-colors ${
//                       isActive ? "text-[#E05A2B]" : "text-[#112A46] hover:text-[#E05A2B]"
//                     }`
//                   }
//                 >
//                   {n.label}
//                 </NavLink>
//               )
//             ))}
//           </nav>

//           {/* Desktop CTA Buttons - Aggressively shrunken for xl screens */}
//           <div className="hidden xl:flex items-center gap-1 2xl:gap-3 shrink-0">
//             <a 
//               href="https://parcelservice.mtsc.ca/" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center border border-gray-200 bg-[#f7f7f7] text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-[11px] 2xl:text-[13px] px-2 2xl:px-4 h-8 2xl:h-10 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1"
//             >
//               <FaBox className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 mr-1.5" />
//               <span>Seafarer Parcel Pickup Service</span>
//             </a>

//             <Link 
//               to="/prayer"
//               className="inline-flex items-center justify-center border border-[#112A46] bg-transparent text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-[11px] 2xl:text-[13px] px-2 2xl:px-4 h-8 2xl:h-10 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1"
//             >
//               Send a Prayer
//             </Link>

//             <button
//               onClick={() => setDonateDialogOpen(true)}
//               className="inline-flex items-center justify-center bg-[#E05A2B] hover:bg-[#c94d23] text-white font-bold shadow-[0_6px_20px_rgba(224,90,43,.35)] hover:shadow-[0_10px_28px_rgba(224,90,43,.45)] px-3 2xl:px-6 h-8 2xl:h-11 text-[12px] 2xl:text-[15px] whitespace-nowrap rounded-md transition-all focus-visible:outline-none focus-visible:ring-1 cursor-pointer"
//             >
//               Donate
//             </button>
//           </div>

//           <button
//             aria-label="Toggle menu"
//             onClick={() => setOpen((v) => !v)}
//             className="xl:hidden p-2 rounded-md text-[#112A46] hover:bg-[#f7f7f7] shrink-0 transition-colors focus-visible:outline-none"
//           >
//             {open ? <FaTimes className="h-6 w-6 sm:h-7 sm:w-7" /> : <FaBars className="h-6 w-6 sm:h-7 sm:w-7" />}
//           </button>
//         </div>

//         {open && (
//           <div className="xl:hidden absolute top-full left-0 w-full border-t border-gray-100 bg-white shadow-xl origin-top animate-in fade-in slide-in-from-top-4 duration-300">
//             <div className="max-w-[1600px] mx-auto px-5 py-4 flex flex-col gap-2 max-h-[calc(100vh-4rem)] sm:max-h-[85vh] overflow-y-auto">
//               {nav.map((n) => (
//                 <div key={n.to} className="flex flex-col">
//                   {n.subItems ? (
//                     <>
//                       <button
//                         onClick={() => toggleMobileAccordion(n.label)}
//                         className={`px-3 py-3 text-base sm:text-lg font-semibold rounded-md flex items-center justify-between w-full text-left transition-colors ${
//                           location.pathname.includes(n.to) ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-[#112A46] hover:bg-[#f7f7f7]"
//                         }`}
//                       >
//                         {n.label}
//                         <FaChevronDown
//                           className={`w-4 h-4 transition-transform duration-300 ${
//                             mobileExpanded === n.label ? "rotate-180" : ""
//                           }`}
//                         />
//                       </button>

//                       <div
//                         className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                           mobileExpanded === n.label ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"
//                         }`}
//                       >
//                         <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-100 ml-3 mb-2">
//                           {n.subItems.map((sub) => (
//                             <Link
//                               key={sub.to}
//                               to={sub.to}
//                               onClick={(e) => handleNavClick(e, sub.to)}
//                               className={`px-3 py-2.5 text-sm sm:text-base font-medium rounded-md transition-colors whitespace-normal leading-snug ${
//                                 isActiveHash(sub.to) ? "text-[#E05A2B] font-bold bg-[#FDF0EC]/50" : "text-gray-600 hover:text-[#112A46] hover:bg-[#f7f7f7]"
//                               }`}
//                             >
//                               {sub.label}
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <NavLink
//                       to={n.to}
//                       end={n.to === "/"}
//                       className={({ isActive }) =>
//                         `px-3 py-3 text-base sm:text-lg font-semibold rounded-md transition-colors ${
//                           isActive ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-[#112A46] hover:bg-[#f7f7f7]"
//                         }`
//                       }
//                     >
//                       {n.label}
//                     </NavLink>
//                   )}
//                 </div>
//               ))}

//               <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-2 pb-6">
//                 <a 
//                   href="https://parcelservice.mtsc.ca/" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center justify-start border-2 border-gray-200 bg-[#f7f7f7] text-[#112A46] font-bold w-full h-12 px-4 rounded-md transition-colors hover:bg-gray-200 text-sm sm:text-base whitespace-normal text-left leading-tight"
//                 >
//                   <FaBox className="w-4 h-4 mr-2 shrink-0" />
//                   <span>Seafarer Parcel Pickup Service</span>
//                 </a>
//                 <Link 
//                   to="/prayer"
//                   onClick={() => setOpen(false)}
//                   className="inline-flex items-center justify-start border-2 border-[#112A46] text-[#112A46] bg-transparent font-bold w-full h-12 px-4 rounded-md transition-colors hover:bg-gray-50 text-sm sm:text-base"
//                 >
//                   <FaHandsHelping className="w-4 h-4 mr-2 shrink-0" />
//                   <span>Send a Prayer</span>
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setDonateDialogOpen(true);
//                     setOpen(false);
//                   }}
//                   className="inline-flex items-center justify-center bg-[#E05A2B] hover:bg-[#c94d23] text-white font-extrabold w-full text-lg h-14 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 shadow-md cursor-pointer"
//                 >
//                   Donate
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {donateDialogOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[95vh] flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
//             <div className="flex items-center justify-between p-4 pb-3 shrink-0 border-b border-gray-100">
//               <h2 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-extrabold text-[#112A46] m-0 truncate">
//                 <FaGift className="h-5 w-5 text-[#E05A2B] shrink-0" />
//                 Secure Donation Form
//               </h2>
//               <button
//                 onClick={() => setDonateDialogOpen(false)}
//                 className="p-1.5 rounded-sm opacity-70 hover:opacity-100 hover:bg-gray-100 transition-opacity focus:outline-none shrink-0"
//                 aria-label="Close modal"
//               >
//                 <FaTimes className="h-5 w-5 text-gray-500" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-hidden p-0 sm:p-2 bg-gray-50 md:p-4">
//               <div className="w-full h-full bg-white sm:rounded-lg border-0 sm:border border-gray-200 overflow-hidden shadow-none sm:shadow-sm">
//                 <iframe
//                   src="https://www.canadahelps.org/en/dn/42880"
//                   title="CanadaHelps Secure Donation Form"
//                   className="w-full h-full border-none block bg-transparent"
//                   allow="payment"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Package, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import logo from "@/assets/logo.jpeg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/whoweare", label: "Who We Are" },
  { to: "/support", label: "Seafarer Support" },
  { to: "/WaystoGive", label: "Get Involved" },

  {
    to: "/publication",
    label: "Publications",
    subItems: [
      { to: "/publication#halifax-newsletters", label: "Mission to Seafarers Halifax Flying Angel Newsletters" },
      { to: "/publication#the-sea", label: "Mission to Seafarers The Sea Newsletters" },
      { to: "/publication#fan", label: "Mission to Seafarers Flying Angel News (FAN)" },
      { to: "/publication#mts-statistics", label: "MtS Halifax Statistics" },
      { to: "/publication#happiness-index", label: "Seafarers Happiness Index" },
      { to: "/publication#esg-strategy", label: "Mission to Seafarers ESG Strategy" },
      { to: "/publication#foghorn", label: "The Foghorn – Master Mariners of Canada, Maritimes Division" },
      { to: "/publication#marine-safety", label: "Marine Safety Handbook" },
      { to: "/publication#mental-health", label: "The Mental Health of Seafarers in Canada During Covid 19 Pandemic" }
    ]
  },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu and reset accordion when route changes
  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [location.pathname, location.hash]);

  // Handle clicking outside of the header to close the mobile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false);
        setMobileExpanded(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileAccordion = (label) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-soft" : "bg-white/80 backdrop-blur"
        }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 flex h-20 items-center justify-between md:h-24 lg:h-28 gap-4">

        {/* Logo - Ensures text doesn't wrap using whitespace-nowrap */}
        <Link to="/" className="flex items-center gap-2 lg:gap-3 group shrink-0">
          <img
            src={logo}
            alt="Mission to Seafarers Logo"
            className="h-20 md:h-20 lg:h-24 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
          />
          <span className="flex flex-col leading-none justify-center">
            <span className="text-[16px] lg:text-[15px] xl:text-[18px] font-extrabold text-navy whitespace-nowrap">Mission to Seafarers</span>
            <span className="text-[12px] lg:text-[11px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-coral mt-0.5 whitespace-nowrap">Halifax</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2">
          {nav.map((n) => (
            n.subItems ? (
              <div key={n.to} className="relative group">
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-1.5 xl:px-2 py-2 text-[11px] xl:text-[13px] 2xl:text-[14px] font-semibold whitespace-nowrap rounded-md transition-colors ${isActive || location.pathname.includes(n.to) ? "text-coral" : "text-navy hover:text-coral"
                    }`
                  }
                >
                  {n.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </NavLink>

                {/* Desktop Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-80 bg-white rounded-xl shadow-card border border-border p-2 flex flex-col gap-1">
                    {n.subItems.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-normal leading-snug ${isActive ? "bg-coral-pale text-coral" : "text-text-mid hover:text-navy hover:bg-warm-gray"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `px-1.5 xl:px-2 py-2 text-[11px] xl:text-[13px] 2xl:text-[14px] font-semibold whitespace-nowrap rounded-md transition-colors ${isActive ? "text-coral" : "text-navy hover:text-coral"
                  }`
                }
              >
                {n.label}
              </NavLink>
            )
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 shrink-0">
          <Button asChild variant="outline" size="sm" className="border-border bg-warm-gray text-navy hover:bg-navy hover:text-white font-bold whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4">
            <a href="https://parcelservice.mtsc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Package className="w-4 h-4 mr-1.5 hidden 2xl:block" />
              <span className="hidden 2xl:inline">Seafarer Parcel Pickup Service</span>
              <span className="2xl:hidden">Parcel Pickup</span>
            </a>
          </Button>

          <Button asChild variant="outline" size="sm" className="border-navy text-navy hover:bg-navy hover:text-white font-bold whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4">
            <Link to="/prayer">
              Send a Prayer
            </Link>
          </Button>

          <Button
            onClick={() => setDonateDialogOpen(true)}
            size="lg"
            className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm hover:shadow-warm-hover px-5 xl:px-6 text-sm xl:text-base whitespace-nowrap cursor-pointer"
          >
            Donate
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-md text-navy hover:bg-warm-gray shrink-0"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer - Gap Issue Fixed Here */}
      {open && (
        <div className="lg:hidden border-t border-border bg-white animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
          {/* Yahan 'container-page' ki jagah 'px-5 sm:px-8' add kiya gaya hai taaki left/right gap aaye */}
          <div className="px-5 sm:px-8 py-6 flex flex-col gap-2 max-h-[85vh] overflow-y-auto pb-10">
            {nav.map((n) => (
              <div key={n.to} className="flex flex-col">
                {n.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMobileAccordion(n.label)}
                      className={`px-4 py-3 text-base font-semibold rounded-lg flex items-center justify-between w-full text-left transition-colors ${location.pathname.includes(n.to) ? "bg-coral-pale text-coral" : "text-navy hover:bg-warm-gray"
                        }`}
                    >
                      {n.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${mobileExpanded === n.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExpanded === n.label ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="flex flex-col gap-1 pl-4 border-l-2 border-warm-gray ml-3 mb-2">
                        {n.subItems.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className={({ isActive }) =>
                              `px-3 py-2.5 text-sm font-medium rounded-md transition-colors leading-snug ${isActive ? "text-coral font-bold bg-coral-pale/50" : "text-text-mid hover:text-navy hover:bg-warm-gray"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={n.to}
                    end={n.to === "/"}
                    className={({ isActive }) =>
                      `px-4 py-3 text-base font-semibold rounded-lg transition-colors ${isActive ? "bg-coral-pale text-coral" : "text-navy hover:bg-warm-gray"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Mobile CTAs - Inme ab proper gap aayega screen ke edges se */}
            <div className="flex flex-col gap-3 pt-6 border-t border-gray-100 mt-2">
              <Button asChild variant="outline" className="border-2 border-border bg-warm-gray text-navy font-bold w-full justify-center h-12 rounded-xl">
                <a href="https://parcelservice.mtsc.ca/" target="_blank" rel="noopener noreferrer">
                  <Package className="w-5 h-5 mr-2" />
                  Seafarer Parcel Pickup Service
                </a>
              </Button>
              <Button asChild variant="outline" className="border-2 border-navy text-navy font-bold w-full justify-center h-12 rounded-xl">
                <Link to="/prayer">
                  Send a Prayer
                </Link>
              </Button>
              <Button
                onClick={() => {
                  setDonateDialogOpen(true);
                  setOpen(false);
                }}
                className="bg-coral hover:bg-coral-light text-white font-extrabold w-full text-lg h-14 rounded-xl"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FULLY RESPONSIVE DONATE DIALOG POPUP */}
      <Dialog open={donateDialogOpen} onOpenChange={setDonateDialogOpen}>
        {/* showCloseButton={false} use kiya hai taaki default cross button conflict na kare */}
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] lg:max-w-[1200px] w-full h-[95vh] md:h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl"
        >
          {/* Header mein flex-row lagaya aur explicit Close Button add kiya */}
          <DialogHeader className="p-4 md:p-5 shrink-0 border-b bg-white shadow-sm z-10 flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-extrabold text-navy">
              <Gift className="h-5 w-5 text-coral" />
              Secure Donation Form
            </DialogTitle>

            {/* CROSS (X) BUTTON - Yeh har device par clearly dikhega */}
            <button
              onClick={() => setDonateDialogOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </DialogHeader>

          {/* Responsive Padding inside Dialog */}
          <div className="flex-1 overflow-hidden p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-50/80 flex flex-col">
            <div className="w-full flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative">
              <iframe
                src="https://www.canadahelps.org/en/dn/145961"
                title="CanadaHelps Secure Donation Form"
                className="absolute inset-0 w-full h-full border-none bg-transparent"
                allow="payment"
              ></iframe>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default SiteHeader;