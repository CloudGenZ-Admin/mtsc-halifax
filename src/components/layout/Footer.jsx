import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

// Import the local logo image
import seafarerLogoImg from '../../assets/seafarers-logo.png';

export default function Footer() {
  // Links extracted directly from your Navbar content
  const footerLinks = [
    { name: 'Who We Are', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Publication', path: '/publication' },
    { name: 'Prayer', path: '/prayer' },
    { name: 'Donate', path: '/donate' }
  ];

  return (
    <footer className="bg-navy-dark">
      <div className="max-w-[1200px] mx-auto px-7 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 border-b border-white/10">
        
        {/* Column 1: Brand & About */}
        <div className="lg:col-span-1">
          <div className="mb-6 bg-white inline-flex items-center justify-center p-2 rounded-xl shadow-sm">
            <img 
              src={seafarerLogoImg} 
              alt="Mission to Seafarers Logo" 
              className="h-12 w-auto object-contain" 
            />
          </div>
          <p className="font-extrabold text-white text-[14.5px] mb-3 tracking-wide">
            ✦ Mission to Seafarers Canada ✦
          </p>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-sm">
            Caring for seafarers visiting the Port of Halifax by providing a welcoming harbour, pastoral care, and practical support.
          </p>
        </div>

        {/* Column 2: Navigation Links (Part 1) */}
        <div className="flex flex-col gap-3 lg:pl-8">
          <h4 className="text-white font-black text-[16px] mb-2 tracking-wide uppercase text-sm">Explore</h4>
          {footerLinks.slice(0, 4).map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => window.scrollTo(0,0)}
              className="text-white/70 hover:text-coral font-medium text-[14.5px] transition-colors w-fit flex items-center gap-2"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 3: Navigation Links (Part 2) */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-black text-[16px] mb-2 tracking-wide uppercase text-sm opacity-0 hidden lg:block">&nbsp;</h4>
          <h4 className="text-white font-black text-[16px] mb-2 tracking-wide uppercase text-sm lg:hidden">More Links</h4>
          {footerLinks.slice(4).map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => window.scrollTo(0,0)}
              className="text-white/70 hover:text-coral font-medium text-[14.5px] transition-colors w-fit flex items-center gap-2"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h4 className="text-white font-black text-[16px] mb-5 tracking-wide uppercase text-sm">Connect With Us</h4>
          <div className="flex flex-wrap gap-3">
            {[FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white text-[15px] hover:bg-coral hover:-translate-y-1 transition-all shadow-sm"
                aria-label="Social Media Link"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1200px] mx-auto px-7 py-6 text-center lg:flex lg:justify-between lg:items-center">
        <p className="text-white/40 text-[13px] font-medium">
          &copy; {new Date().getFullYear()} Mission to Seafarers Canada. All rights reserved.
        </p>
        <p className="text-white/30 text-[12px] mt-2 lg:mt-0">
          Designed with purpose for the seafarers of Halifax.
        </p>
      </div>
    </footer>
  );
}