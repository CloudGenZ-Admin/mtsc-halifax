import React from 'react';
import { FaAnchor, FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-navy-dark">
      <div className="max-w-[1200px] mx-auto px-7 pt-14 pb-10 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10">
        <div className="md:col-span-2">
          <div className="text-2xl text-coral mb-3"><FaAnchor /></div>
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