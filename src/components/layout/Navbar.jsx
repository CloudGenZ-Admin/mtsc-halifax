import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaHandsHelping, FaBars, FaTimes, FaBox, FaGift } from 'react-icons/fa';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import seafarerLogoImg from '../../assets/seafarers-logo.png';

const nav = [
  { to: "/", label: "Home" },
  { to: "/whoweare", label: "Who We Are" },
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
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
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
  }, [location.pathname]);

  // Handle clicking outside of the header to close the mobile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false);
        setMobileExpanded(null);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  // Prevent background scrolling when the donate modal is open
  useEffect(() => {
    if (donateDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [donateDialogOpen]);

  const toggleMobileAccordion = (label) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  // Custom handler to scroll to hash tags seamlessly
  const handleNavClick = (e, fullPath) => {
    const [path, hash] = fullPath.split('#');
    
    if (location.pathname === path && hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
    if (open) setOpen(false);
  };

  // Custom function to check hash route match for styling
  const isActiveHash = (to) => {
    const [path, hash] = to.split('#');
    return location.pathname === path && location.hash === (hash ? `#${hash}` : '');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0B1A30] text-white text-[12.5px] py-2 hidden md:block z-50 relative">
        <div className="max-w-[1200px] mx-auto px-7 flex justify-between items-center">
          <span className="font-bold">✦ The Mission to Seafarers Halifax ✦</span>
          <div className="flex items-center gap-6">
            <Link to="/prayer" className="font-semibold flex items-center gap-1.5 hover:text-[#E05A2B] transition-colors">
              <FaHandsHelping /> Prayer Wall
            </Link>
            <div className="flex gap-3">
              {[FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-[#E05A2B] transition-colors text-sm"><Icon /></a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(17,42,70,.08)]" : "bg-white/80 backdrop-blur"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 flex h-16 sm:h-20 md:h-24 xl:h-28 items-center justify-between gap-2 xl:gap-4">

          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 xl:gap-3 group shrink-0 no-underline max-w-[75%] sm:max-w-none">
            <img
              src={seafarerLogoImg}
              alt="Mission to Seafarers Logo"
              className="h-12 sm:h-16 md:h-20 xl:h-24 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
            />
            <span className="flex flex-col leading-none justify-center">
              <span className="text-[13px] sm:text-[15px] xl:text-[18px] font-extrabold text-[#112A46] whitespace-nowrap truncate">Mission to Seafarers</span>
              <span className="text-[9px] sm:text-[11px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-[#E05A2B] mt-0.5 whitespace-nowrap truncate">Halifax</span>
            </span>
          </Link>

          {/* Desktop Navigation - Shifted to XL (1280px) to prevent overlap with long button text */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-3">
            {nav.map((n) => (
              n.subItems ? (
                <div key={n.to} className="relative group">
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-2 2xl:px-3 py-2 text-[14px] 2xl:text-base font-semibold whitespace-nowrap rounded-md transition-colors ${
                        isActive || location.pathname.includes(n.to) ? "text-[#E05A2B]" : "text-[#112A46] hover:text-[#E05A2B]"
                      }`
                    }
                  >
                    {n.label}
                    <FaChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </NavLink>

                  {/* Desktop Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="w-[380px] bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,.06)] border border-gray-100 p-2 flex flex-col gap-1">
                      {n.subItems.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={(e) => handleNavClick(e, sub.to)}
                          className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-normal ${
                            isActiveHash(sub.to) ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-gray-600 hover:text-[#112A46] hover:bg-[#f7f7f7]"
                          }`}
                        >
                          {sub.label}
                        </Link>
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
                    `px-2 2xl:px-3 py-2 text-[14px] 2xl:text-base font-semibold whitespace-nowrap rounded-md transition-colors ${
                      isActive ? "text-[#E05A2B]" : "text-[#112A46] hover:text-[#E05A2B]"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              )
            ))}
          </nav>

          {/* Desktop CTA Buttons - Shifted to XL */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-3 shrink-0">
            {/* Seafarer Parcel Pickup Service Button */}
            <a 
              href="https://parcelservice.mtsc.ca/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-gray-200 bg-[#f7f7f7] text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-[13px] 2xl:text-sm px-3 2xl:px-4 h-9 lg:h-10 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1"
            >
              <FaBox className="w-3.5 h-3.5 mr-1.5" />
              <span>Seafarer Parcel Pickup Service</span>
            </a>

            {/* Send a Prayer Button */}
            <Link 
              to="/prayer"
              className="inline-flex items-center justify-center border border-[#112A46] bg-transparent text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-[13px] 2xl:text-sm px-3 2xl:px-4 h-9 lg:h-10 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1"
            >
              Send a Prayer
            </Link>

            {/* Large Orange Donate Button */}
            <button
              onClick={() => setDonateDialogOpen(true)}
              className="inline-flex items-center justify-center bg-[#E05A2B] hover:bg-[#c94d23] text-white font-bold shadow-[0_6px_20px_rgba(224,90,43,.35)] hover:shadow-[0_10px_28px_rgba(224,90,43,.45)] px-5 2xl:px-6 h-10 2xl:h-11 text-sm 2xl:text-base whitespace-nowrap rounded-md transition-all focus-visible:outline-none focus-visible:ring-1 cursor-pointer"
            >
              Donate
            </button>
          </div>

          {/* Mobile Menu Toggle - Shows until XL (1280px) */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden p-2 rounded-md text-[#112A46] hover:bg-[#f7f7f7] shrink-0 transition-colors focus-visible:outline-none"
          >
            {open ? <FaTimes className="h-6 w-6 sm:h-7 sm:w-7" /> : <FaBars className="h-6 w-6 sm:h-7 sm:w-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer - Shows until XL */}
        {open && (
          <div className="xl:hidden absolute top-full left-0 w-full border-t border-gray-100 bg-white shadow-xl origin-top animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="max-w-[1600px] mx-auto px-5 py-4 flex flex-col gap-2 max-h-[calc(100vh-4rem)] sm:max-h-[85vh] overflow-y-auto">
              {nav.map((n) => (
                <div key={n.to} className="flex flex-col">
                  {n.subItems ? (
                    <>
                      <button
                        onClick={() => toggleMobileAccordion(n.label)}
                        className={`px-3 py-3 text-base sm:text-lg font-semibold rounded-md flex items-center justify-between w-full text-left transition-colors ${
                          location.pathname.includes(n.to) ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-[#112A46] hover:bg-[#f7f7f7]"
                        }`}
                      >
                        {n.label}
                        <FaChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileExpanded === n.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          mobileExpanded === n.label ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-100 ml-3 mb-2">
                          {n.subItems.map((sub) => (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              onClick={(e) => handleNavClick(e, sub.to)}
                              className={`px-3 py-2.5 text-sm sm:text-base font-medium rounded-md transition-colors whitespace-normal leading-snug ${
                                isActiveHash(sub.to) ? "text-[#E05A2B] font-bold bg-[#FDF0EC]/50" : "text-gray-600 hover:text-[#112A46] hover:bg-[#f7f7f7]"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={n.to}
                      end={n.to === "/"}
                      className={({ isActive }) =>
                        `px-3 py-3 text-base sm:text-lg font-semibold rounded-md transition-colors ${
                          isActive ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-[#112A46] hover:bg-[#f7f7f7]"
                        }`
                      }
                    >
                      {n.label}
                    </NavLink>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-2 pb-6">
                <a 
                  href="https://parcelservice.mtsc.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-start border-2 border-gray-200 bg-[#f7f7f7] text-[#112A46] font-bold w-full h-12 px-4 rounded-md transition-colors hover:bg-gray-200 text-sm sm:text-base whitespace-normal text-left leading-tight"
                >
                  <FaBox className="w-4 h-4 mr-2 shrink-0" />
                  <span>Seafarer Parcel Pickup Service</span>
                </a>
                <Link 
                  to="/prayer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-start border-2 border-[#112A46] text-[#112A46] bg-transparent font-bold w-full h-12 px-4 rounded-md transition-colors hover:bg-gray-50 text-sm sm:text-base"
                >
                  <FaHandsHelping className="w-4 h-4 mr-2 shrink-0" />
                  <span>Send a Prayer</span>
                </Link>
                <button
                  onClick={() => {
                    setDonateDialogOpen(true);
                    setOpen(false);
                  }}
                  className="inline-flex items-center justify-center bg-[#E05A2B] hover:bg-[#c94d23] text-white font-extrabold w-full text-lg h-14 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 shadow-md cursor-pointer"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Shadcn-Style Dialog Popup for Donations built with standard HTML */}
      {donateDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[95vh] flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 pb-3 shrink-0 border-b border-gray-100">
              <h2 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-extrabold text-[#112A46] m-0 truncate">
                <FaGift className="h-5 w-5 text-[#E05A2B] shrink-0" />
                Secure Donation Form
              </h2>
              <button
                onClick={() => setDonateDialogOpen(false)}
                className="p-1.5 rounded-sm opacity-70 hover:opacity-100 hover:bg-gray-100 transition-opacity focus:outline-none shrink-0"
                aria-label="Close modal"
              >
                <FaTimes className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-hidden p-0 sm:p-2 bg-gray-50 md:p-4">
              <div className="w-full h-full bg-white sm:rounded-lg border-0 sm:border border-gray-200 overflow-hidden shadow-none sm:shadow-sm">
                <iframe
                  src="https://www.canadahelps.org/en/dn/42880"
                  title="CanadaHelps Secure Donation Form"
                  className="w-full h-full border-none block bg-transparent"
                  allow="payment"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}