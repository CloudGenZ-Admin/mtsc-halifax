import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaHandsHelping, FaBars, FaTimes, FaBox } from 'react-icons/fa';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useEvents } from '../../context/EventsContext';
import seafarerLogoImg from '../../assets/seafarers-logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State to handle donate modal visibility
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const { featuredEvents } = useEvents(); 
  const [expandedMenus, setExpandedMenus] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null); 

  // Handle scroll for sticky header glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setExpandedMenus({});
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside); 
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu and reset accordion when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMenus({});
  }, [location.pathname]);

  // Prevent background scrolling when the donate modal is open
  useEffect(() => {
    if (isDonateModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDonateModalOpen]);

  const toggleMobileSubmenu = (index, e) => {
    e.preventDefault(); 
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Halifax specific logic for hash routing within the same page
  const handleNavClick = (e, fullPath) => {
    const [path, hash] = fullPath.split('#');
    
    if (location.pathname === path && hash) {
      e.preventDefault();
      window.history.pushState(null, '', fullPath);
      
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Who We Are', path: '/whoweare' },
    { name: 'Get Involved', path: '/WaystoGive' },
    {
      name: 'Publications',
      path: '/publication',
      dropdown: [
        { name: 'Mission to Seafarers Halifax Flying Angel Newsletters', path: '/publication#halifax-newsletters' },
        { name: 'Mission to Seafarers The Sea Newsletters', path: '/publication#the-sea' },
        { name: 'Mission to Seafarers Flying Angel News (FAN)', path: '/publication#fan' },
        { name: 'MtS Halifax Statistics', path: '/publication#mts-statistics' },
        { name: 'Seafarers Happiness Index', path: '/publication#happiness-index' },
        { name: 'Mission to Seafarers ESG Strategy', path: '/publication#esg-strategy' },
        { name: 'The Foghorn – Master Mariners of Canada, Maritimes Division', path: '/publication#foghorn' },
        { name: 'Marine Safety Handbook', path: '/publication#marine-safety' },
        { name: 'The Mental Health of Seafarers in Canada During Covid 19 Pandemic', path: '/publication#mental-health' }
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0B1A30] text-white text-[12.5px] py-2 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-7 flex justify-between items-center">
          <span className="font-bold">✦ The Mission to Seafarers Canada ✦</span>
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
        ref={navRef} 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(17,42,70,.08)]' : 'bg-white/80 backdrop-blur'}`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 flex h-20 items-center justify-between md:h-24 lg:h-28 gap-4">
          
          {/* Logo Block */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 lg:gap-3 group shrink-0 no-underline">
            <img 
              src={seafarerLogoImg} 
              alt="Mission to Seafarers Logo" 
              className="h-20 md:h-20 lg:h-24 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
            />
            <span className="flex flex-col leading-none justify-center">
              <span className="text-[16px] lg:text-[15px] xl:text-[18px] font-extrabold text-[#112A46] whitespace-nowrap">Mission to Seafarers</span>
              <span className="text-[12px] lg:text-[11px] xl:text-[13px] font-bold uppercase tracking-[0.18em] text-[#E05A2B] mt-0.5 whitespace-nowrap">Canada</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2">
            {navLinks.map((item, index) => (
              item.dropdown ? (
                <div key={index} className="relative group">
                  <Link 
                    to={item.path} 
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`flex items-center gap-1 px-2 xl:px-3 py-2 text-[13px] xl:text-[15px] 2xl:text-base font-semibold whitespace-nowrap rounded-md transition-colors ${location.pathname.includes(item.path) ? "text-[#E05A2B]" : "text-[#112A46] hover:text-[#E05A2B]"}`}
                  >
                    {item.name} 
                    <FaChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Desktop Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-[380px] bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,.06)] border border-gray-100 p-2 flex flex-col gap-1">
                      {item.dropdown.map((dropItem, idx) => {
                        const isActive = location.pathname === dropItem.path.split('#')[0] && location.hash === '#' + dropItem.path.split('#')[1];
                        return (
                          <Link 
                            key={idx}
                            to={dropItem.path} 
                            onClick={(e) => handleNavClick(e, dropItem.path)}
                            className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-normal ${isActive ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-gray-600 hover:text-[#112A46] hover:bg-[#f7f7f7]"}`}
                          >
                            {dropItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  key={index}
                  to={item.path} 
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`px-2 xl:px-3 py-2 text-[13px] xl:text-[15px] 2xl:text-base font-semibold whitespace-nowrap rounded-md transition-colors ${location.pathname === item.path ? "text-[#E05A2B]" : "text-[#112A46] hover:text-[#E05A2B]"}`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Parcel Pickup Button */}
            <a 
              href="https://parcelservice.mtsc.ca/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-gray-200 bg-[#f7f7f7] text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4 py-2.5 rounded-md transition-colors"
            >
              <FaBox className="w-3.5 h-3.5 mr-1.5 hidden 2xl:block" />
              <span className="hidden 2xl:inline">Seafarer Parcel Pickup Service</span>
              <span className="2xl:hidden">Parcel Pickup</span>
            </a>

            {/* Prayer Button */}
            <Link 
              to="/prayer"
              className="flex items-center justify-center border border-[#112A46] text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4 py-2.5 rounded-md transition-colors"
            >
              Send a Prayer
            </Link>

            {/* CHANGED: Donate Button triggers modal instead of redirecting */}
            <button
              onClick={() => setIsDonateModalOpen(true)}
              className="flex items-center justify-center bg-[#E05A2B] hover:bg-[#c94d23] text-white font-bold shadow-[0_6px_20px_rgba(224,90,43,.35)] hover:shadow-[0_10px_28px_rgba(224,90,43,.45)] px-5 xl:px-6 py-2.5 text-sm xl:text-base whitespace-nowrap rounded-md transition-all cursor-pointer"
            >
              Donate
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#112A46] hover:bg-[#f7f7f7] transition-colors shrink-0 focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes className="h-7 w-7" /> : <FaBars className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full border-t border-gray-100 bg-white shadow-xl origin-top animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col gap-2 max-h-[85vh] overflow-y-auto">
              {navLinks.map((item, index) => (
                <div key={index} className="flex flex-col">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={(e) => toggleMobileSubmenu(index, e)}
                        className={`px-3 py-3 text-base font-semibold rounded-md flex items-center justify-between w-full text-left transition-colors ${location.pathname.includes(item.path) ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-[#112A46] hover:bg-[#f7f7f7]"}`}
                      >
                        {item.name}
                        <FaChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${expandedMenus[index] ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus[index] ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-100 ml-3 mb-2">
                          {item.dropdown.map((dropItem, idx) => (
                            <Link
                              key={idx}
                              to={dropItem.path}
                              onClick={(e) => handleNavClick(e, dropItem.path)}
                              className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${location.pathname === dropItem.path.split('#')[0] && location.hash === '#' + dropItem.path.split('#')[1] ? "text-[#E05A2B] font-bold bg-[#FDF0EC]/50" : "text-gray-600 hover:text-[#112A46] hover:bg-[#f7f7f7]"}`}
                            >
                              {dropItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className={`px-3 py-3 text-base font-semibold rounded-md transition-colors ${location.pathname === item.path ? "bg-[#FDF0EC] text-[#E05A2B]" : "text-[#112A46] hover:bg-[#f7f7f7]"}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-2">
                <a 
                  href="https://parcelservice.mtsc.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-start border-2 border-gray-200 bg-[#f7f7f7] text-[#112A46] font-bold w-full h-12 px-4 rounded-md transition-colors hover:bg-gray-200"
                >
                  <FaBox className="w-4 h-4 mr-2" />
                  Seafarer Parcel Pickup Service
                </a>
                <Link 
                  to="/prayer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-start border-2 border-[#112A46] text-[#112A46] font-bold w-full h-12 px-4 rounded-md transition-colors hover:bg-gray-50"
                >
                  <FaHandsHelping className="w-4 h-4 mr-2" />
                  Send a Prayer
                </Link>
                {/* CHANGED: Mobile Donate Button triggers modal */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsDonateModalOpen(true);
                  }}
                  className="bg-[#E05A2B] hover:bg-[#c94d23] text-white font-extrabold w-full text-lg h-14 rounded-md flex items-center justify-center transition-colors cursor-pointer"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* --- DONATION MODAL POPUP --- */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#112A46]/80 backdrop-blur-sm transition-opacity">
          
          {/* Modal Container */}
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl relative max-h-[95vh] flex flex-col overflow-hidden animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 md:px-8 border-b border-gray-100 bg-white z-10">
              <h3 className="text-2xl font-black text-[#112A46] flex items-center gap-3">
                <svg className="w-6 h-6 text-[#E05A2B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Secure Donation
              </h3>
              <button
                onClick={() => setIsDonateModalOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 p-3 rounded-full transition-colors focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            {/* Modal Iframe Content */}
            <div className="flex-grow overflow-y-auto w-full bg-gray-50 p-4 md:p-8 flex justify-center">
              <iframe 
                src="https://www.canadahelps.org/en/dn/42880" 
                title="CanadaHelps Secure Donation Form"
                className="w-full max-w-[800px] h-[75vh] md:h-[800px] lg:h-[950px] border-none block bg-transparent rounded-xl"
                scrolling="auto"
                allow="payment"
              ></iframe>
            </div>

          </div>
        </div>
      )}
    </>
  );
}