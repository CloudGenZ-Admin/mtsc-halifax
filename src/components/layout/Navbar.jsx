import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaHandsHelping, FaBars, FaTimes, FaStar } from 'react-icons/fa';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { eventService } from '../../services/eventService';
import seafarerLogoImg from '../../assets/seafarers-logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  
  const [expandedMenus, setExpandedMenus] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null); 

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const events = await eventService.getFeaturedEvents();
        
        // Reverse the array so the last items (like Sea Sunday) appear first
        const reversedEvents = [...events].reverse();
     
        setFeaturedEvents(reversedEvents.slice(0, 10));
      } catch (error) {
        console.error('Error fetching featured events for Navbar:', error);
      }
    };
    fetchFeaturedEvents();
  }, []);

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
    { 
      name: 'Events', 
      path: '/events',
     
      ...(featuredEvents.length > 0 && {
        dropdown: [
          { name: 'View All Events', path: '/events' },
          ...featuredEvents.map(event => ({
            name: `${event.title}`,
            path: `/events/${event.url}`
          }))
        ]
      })
    },
    { 
      name: 'Sponsors', 
      path: '/sponsors',
      dropdown: [
        { name: 'Our Sponsors', path: '/sponsors#our-sponsors' },
        { name: 'Corporate Sponsorship', path: '/sponsors#corporate-sponsorship' }
      ]
    },
    { name: 'Who We Are', path: '/whoweare' }, 
    { 
      name: 'Ways to Give ', 
      path: '/WaystoGive',
      dropdown: [
        { name: 'Volunteer Awardees', path: '/WaystoGive#volunteer-awards' },
        { name: 'Staff Awardees', path: '/WaystoGive#staff-awards' }
      ]
    }, 
    {
      name: 'Publication',
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
    { name: 'Prayer', path: '/prayer' },
    { name: 'Contact Us', path: '/contact' },
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
        <div className="max-w-[1200px] mx-auto px-7 flex items-center justify-between h-[75px] gap-5">
          
          <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-3 no-underline group shrink-0">
            <div className="w-24 h-18 flex items-center justify-center overflow-hidden border-2 border-[#ffffff] group-hover:border-[#faf9f8] transition-colors">
              <img src={seafarerLogoImg} alt="Mission to Seafarers" className="w-full h-full object-contain" />
            </div>
          </Link>
          
          <ul className="hidden xl:flex gap-1.5 list-none ml-auto mr-4 items-center">
            {navLinks.map((item, index) => (
              <li key={index} className="relative group">
                <Link 
                  to={item.path} 
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="text-[#112A46] font-bold text-[13.5px] px-3.5 py-2.5 rounded-lg hover:bg-[#FDF0EC] hover:text-[#E05A2B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {item.name} 
                  {item.dropdown && <FaChevronDown className="text-[10px] opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
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
                              className={`block px-5 py-3 text-[13px] font-bold text-[#112A46] hover:bg-[#FDF0EC] hover:text-[#E05A2B] hover:pl-6 transition-all border-b border-gray-50 last:border-0 whitespace-normal leading-tight ${dropItem.name.includes('✦') ? 'text-[#E05A2B]' : ''}`}
                            >
                              {dropItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Link to="/donate" className="hidden xl:inline-flex bg-[#E05A2B] text-white px-7 py-2.5 rounded-full font-black text-[13px] tracking-wide hover:bg-[#112A46] hover:shadow-lg transition-all transform hover:-translate-y-0.5 shrink-0">
            DONATE
          </Link>

          <button 
            className="xl:hidden text-2xl text-[#112A46] focus:outline-none ml-auto hover:text-[#E05A2B] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-white shadow-[0_8px_24px_rgba(0,0,0,.15)] border-t border-gray-100 flex flex-col max-h-[85vh] overflow-y-auto z-50">
            <ul className="flex flex-col list-none m-0 p-4">
              {navLinks.map((item, index) => (
                <li key={index} className="border-b border-gray-100 last:border-0">
                  <div className="flex flex-col">
                    
                    {/* Top Row: Link + Optional Toggle Button */}
                    <div className="flex justify-between items-center w-full">
                      <Link 
                        to={item.path} 
                        className="py-4 px-2 font-black text-[#112A46] hover:text-[#E05A2B] text-[15px] flex-grow"
                        onClick={(e) => handleNavClick(e, item.path)}
                      >
                        {item.name}
                      </Link>
                      
                      {item.dropdown && (
                        <button 
                          onClick={(e) => toggleMobileSubmenu(index, e)}
                          className="p-4 text-[#112A46] hover:text-[#E05A2B] transition-colors focus:outline-none"
                          aria-expanded={expandedMenus[index]}
                        >
                          <FaChevronDown 
                            className={`text-[14px] transition-transform duration-300 ease-in-out ${expandedMenus[index] ? 'rotate-180 text-[#E05A2B]' : ''}`} 
                          />
                        </button>
                      )}
                    </div>
                    
                    {/* Submenu: Animated Accordion */}
                    {item.dropdown && (
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedMenus[index] 
                            ? 'max-h-[1000px] opacity-100 mb-2' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <ul className="pl-4 pb-2 border-l-2 border-[#E05A2B]/30 flex flex-col gap-1 mt-1 bg-gray-50/50 rounded-r-lg mx-2">
                          {item.dropdown.map((dropItem, idx) => (
                            <li key={idx}>
                              <Link 
                                to={dropItem.path} 
                                className={`block py-3 px-3 text-[14px] font-bold text-gray-600 hover:text-[#E05A2B] hover:bg-white rounded-md transition-colors leading-tight ${dropItem.name.includes('✦') ? 'text-[#E05A2B]' : ''}`}
                                onClick={(e) => handleNavClick(e, dropItem.path)}
                              >
                                {dropItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </li>
              ))}
            </ul>
            <div className="p-5 bg-gray-50 border-t border-gray-100 mt-auto">
              <Link 
                to="/donate" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-center bg-[#E05A2B] text-white px-6 py-4 rounded-xl font-black text-[15px] hover:bg-[#112A46] transition-all shadow-md"
              >
                DONATE NOW
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}