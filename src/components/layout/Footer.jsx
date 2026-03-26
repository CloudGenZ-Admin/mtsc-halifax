import React from 'react';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

// Import the local logo image
import seafarerLogoImg from '../../assets/seafarers-logo.png';

export default function Footer() {
  return (
    <footer className="bg-navy-dark">
      <div className="max-w-[1200px] mx-auto px-7 pt-14 pb-10 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10">
        <div className="md:col-span-2">
          {/* Replaced FaAnchor with the imported logo image */}
          <div className="mb-4">
            <img 
              src={seafarerLogoImg} 
              alt="Mission to Seafarers Logo" 
              className="h-12 w-auto object-contain " 
            />
          </div>
          <p className="font-extrabold text-white text-sm mb-2.5">✦ Mission to Seafarers Canada ✦</p>
          <p className="text-white/55 text-[13px] leading-relaxed max-w-sm">
            Serving seafarers with compassion, friendship, and vital support throughout Canada.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {['For Seafarers', 'Get Involved', 'Who We Are', 'Our Impact', 'Contact'].map(link => (
            <a key={link} href="#" className="text-white/70 hover:text-coral font-semibold text-sm transition-colors">{link}</a>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5 h-fit">
          {[FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok].map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white text-sm hover:bg-coral transition-colors"><Icon /></a>
          ))}
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-7 py-5 text-center">
        <p className="text-white/30 text-[13px]">&copy; 2026 Mission to Seafarers Canada. All rights reserved.</p>
      </div>
    </footer>
  );
}