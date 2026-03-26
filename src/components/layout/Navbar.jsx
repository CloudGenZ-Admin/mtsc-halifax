import React, { useState, useEffect } from 'react';
import { FaAnchor, FaChevronDown, FaHandsHelping, FaBars, FaTimes } from 'react-icons/fa';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Events', 
      path: '/events'
    },
    { 
      name: 'Sponsors', 
      path: '/sponsors',
      dropdown: [
        { name: 'Our Sponsors', path: '/sponsors#our-sponsors' },
        { name: 'Corporate Sponsorship', path: '/sponsors#corporate-sponsorship' }
      ]
    },
    { name: 'Who We Are', path: '/about' }, 
    { 
      name: 'Awards', 
      path: '/awards',
      dropdown: [
        { name: 'Volunteer Awardees', path: '/awards#volunteer-awards' },
        { name: 'Staff Awardees', path: '/awards#staff-awards' }
      ]
    }, 
    { name: 'Prayer', path: '/prayer' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Topbar */}
      <div className="bg-[#0B1A30] text-white text-[12.5px] py-2">
        <div className="max-w-[1200px] mx-auto px-7 flex justify-between items-center">
          <span className="font-bold hidden md:block">✦ The Mission to Seafarers Canada ✦</span>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <Link to="/prayer" className="font-semibold flex items-center gap-1.5 hover:opacity-75 transition-opacity">
              <FaHandsHelping /> Prayer Wall
            </Link>
            <div className="flex gap-2.5">
              {[FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok].map((Icon, i) => (
                <a key={i} href="#" className="hover:opacity-75 transition-opacity"><Icon /></a>
              ))}
            </div>
            <Link to="#" className="bg-[#E05A2B] px-3.5 py-1.5 rounded-full font-bold text-xs hover:bg-[#E67045] transition-colors">
              DONATE
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white border-b-4 border-[#E05A2B] sticky top-0 z-50 transition-shadow duration-300 relative ${scrolled ? 'shadow-[0_4px_20px_rgba(224,90,43,.12)]' : ''}`}>
        <div className="max-w-[1200px] mx-auto px-7 flex items-center justify-between h-[68px] gap-5">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 bg-[#E05A2B] rounded-xl flex items-center justify-center text-white text-lg group-hover:bg-[#E67045] transition-colors">
              <FaAnchor />
            </div>
            <span className="font-extrabold text-sm text-[#112A46] leading-tight">
              Mission to Seafarers<br/><small className="font-medium text-gray-500 text-[11px]">Canada</small>
            </span>
          </Link>
          
          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-1 list-none ml-auto mr-4">
            {navLinks.map((item, index) => (
              <li key={index} className="relative group">
                <Link 
                  to={item.path} 
                  className="text-[#112A46] font-bold text-[13.5px] px-3 py-2 rounded-lg hover:bg-[#FDF0EC] hover:text-[#E05A2B] transition-colors flex items-center gap-1.5"
                >
                  {item.name} 
                  {item.dropdown && <FaChevronDown className="text-[10px]" />}
                </Link>

                {/* Desktop Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white border-t-4 border-[#E05A2B] rounded-b-xl shadow-[0_8px_24px_rgba(224,90,43,.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="absolute -top-3 left-0 w-full h-3 bg-transparent"></div>
                    <ul className="flex flex-col py-2 list-none m-0">
                      {item.dropdown.map((dropItem, idx) => (
                        <li key={idx} className="m-0">
                          <Link 
                            to={dropItem.path} 
                            className="block px-4 py-2.5 text-[13px] font-bold text-[#112A46] hover:bg-[#FDF0EC] hover:text-[#E05A2B] transition-colors"
                          >
                            {dropItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Donate Button */}
          <Link to="#" className="hidden lg:inline-flex bg-[#E05A2B] text-white px-6 py-2.5 rounded-full font-extrabold text-sm hover:bg-[#E67045] hover:-translate-y-[1px] transition-all">
            DONATE
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden text-2xl text-[#112A46] focus:outline-none ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-[0_8px_24px_rgba(0,0,0,.15)] border-t border-gray-100 flex flex-col max-h-[75vh] overflow-y-auto">
            <ul className="flex flex-col list-none m-0 p-4">
              {navLinks.map((item, index) => (
                <li key={index} className="border-b border-gray-100 last:border-0">
                  <div className="flex flex-col">
                    <Link 
                      to={item.path} 
                      className="py-3 font-bold text-[#112A46] hover:text-[#E05A2B] flex justify-between items-center"
                      onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile Nested Dropdown */}
                    {item.dropdown && (
                      <ul className="pl-4 pb-2 border-l-2 border-[#FDF0EC] flex flex-col gap-2">
                        {item.dropdown.map((dropItem, idx) => (
                          <li key={idx}>
                            <Link 
                              to={dropItem.path} 
                              className="text-[13px] font-semibold text-gray-600 hover:text-[#E05A2B]"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link to="#" className="flex justify-center bg-[#E05A2B] text-white px-6 py-3 rounded-full font-extrabold text-sm hover:bg-[#E67045] transition-all">
                DONATE NOW
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}