import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaHandsHelping, FaBars, FaTimes, FaStar, FaBox } from 'react-icons/fa';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useEvents } from '../../context/EventsContext';
import seafarerLogoImg from '../../assets/seafarers-logo.png';
import happyAtSeaLogo from '../../assets/happy-sea-app.svg';
import appStoreBtn from '../../assets/btn-appstore.png';
import googlePlayBtn from '../../assets/btnapp-google-play.png.webp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { featuredEvents } = useEvents();
  
  const [expandedMenus, setExpandedMenus] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setExpandedMenus({});
    }
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = (index, e) => {
    e.preventDefault(); 
    setExpandedMenus((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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

      <nav 
        ref={navRef} 
        className={`bg-white border-b-4 border-[#E05A2B] sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_20px_rgba(224,90,43,.12)]' : ''}`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 flex h-20 items-center justify-between md:h-24 lg:h-28 gap-4">
          
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 lg:gap-3 no-underline group shrink-0">
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
              <div key={index} className="relative group">
                <Link 
                  to={item.path} 
                  end={item.path === '/'}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="px-2 xl:px-3 py-2 text-[13px] xl:text-[15px] 2xl:text-base font-semibold whitespace-nowrap rounded-md transition-colors text-[#112A46] hover:text-[#E05A2B] flex items-center gap-1"
                >
                  {item.name} 
                  {item.dropdown && <FaChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                </Link>

                {item.dropdown && (
                  <div className="absolute top-full left-0 pt-2 w-[380px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border-t-4 border-[#E05A2B] rounded-b-xl shadow-[0_12px_30px_rgba(17,42,70,.15)] overflow-hidden">
                      <ul className="flex flex-col py-2 list-none m-0">
                        {item.dropdown.map((dropItem, idx) => (
                          <li key={idx} className="m-0">
                            <Link 
                              to={dropItem.path} 
                              onClick={(e) => handleNavClick(e, dropItem.path)}
                              className="block px-5 py-3 text-[13px] font-bold text-[#112A46] hover:bg-[#FDF0EC] hover:text-[#E05A2B] hover:pl-6 transition-all border-b border-gray-50 last:border-0 whitespace-normal leading-tight"
                            >
                              {dropItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Parcel Pickup Button */}
            <a 
              href="https://parcelservice.mtsc.ca/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center border-2 border-gray-300 bg-gray-50 text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4 py-2 rounded-md transition-colors"
            >
              <FaBox className="w-4 h-4 mr-1.5 hidden 2xl:block" />
              Parcel Pickup
            </a>

            {/* Prayer Button */}
            <Link 
              to="/prayer"
              className="flex items-center border-2 border-[#112A46] text-[#112A46] hover:bg-[#112A46] hover:text-white font-bold whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4 py-2 rounded-md transition-colors"
            >
              Prayer
            </Link>

            {/* Donate Button */}
            <Link
              to="/donate"
              className="bg-[#E05A2B] hover:bg-[#c94d23] text-white font-bold shadow-lg hover:shadow-xl px-5 xl:px-6 py-2.5 text-sm xl:text-base whitespace-nowrap rounded-md transition-all"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            aria-label="Toggle menu"
            className="lg:hidden text-2xl text-[#112A46] focus:outline-none ml-auto hover:text-[#E05A2B] transition-colors p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes className="h-7 w-7" /> : <FaBars className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-xl">
            <div className="px-4 py-4 flex flex-col gap-2 max-h-[85vh] overflow-y-auto">
              {navLinks.map((item, index) => (
                <div key={index} className="flex flex-col">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={(e) => toggleMobileSubmenu(index, e)}
                        className="px-3 py-3 text-base font-semibold rounded-md flex items-center justify-between w-full text-left transition-colors text-[#112A46] hover:bg-[#FDF0EC]"
                      >
                        {item.name}
                        <FaChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${expandedMenus[index] ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus[index] ? 'max-h-[400px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-gray-300 ml-3 mb-2">
                          {item.dropdown.map((dropItem, idx) => (
                            <Link
                              key={idx}
                              to={dropItem.path}
                              className="px-3 py-2.5 text-sm font-medium rounded-md transition-colors text-gray-600 hover:text-[#112A46] hover:bg-[#FDF0EC]"
                              onClick={(e) => handleNavClick(e, dropItem.path)}
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
                      end={item.path === '/'}
                      className="px-3 py-3 text-base font-semibold rounded-md transition-colors text-[#112A46] hover:bg-[#FDF0EC]"
                      onClick={(e) => handleNavClick(e, item.path)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 mt-2">
                <a 
                  href="https://parcelservice.mtsc.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-start border-2 border-gray-300 bg-gray-50 text-[#112A46] font-bold w-full h-12 px-4 rounded-md"
                >
                  <FaBox className="w-5 h-5 mr-2" />
                  Parcel Pickup Service
                </a>
                <Link 
                  to="/prayer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-start border-2 border-[#112A46] text-[#112A46] font-bold w-full h-12 px-4 rounded-md"
                >
                  <FaHandsHelping className="w-5 h-5 mr-2" />
                  Prayer
                </Link>
                <Link
                  to="/donate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#E05A2B] hover:bg-[#c94d23] text-white font-extrabold w-full text-lg h-14 rounded-md flex items-center justify-center"
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}