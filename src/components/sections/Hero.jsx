import React from 'react';
import { FaHeart } from 'react-icons/fa';

// Import the hero image and port background
import heroImg from '../../assets/impact-img-min-1024x510.webp';
import portHalifaxBg from '../../assets/port_halifax.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={portHalifaxBg} 
          alt="Port of Halifax" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay - darker on left for text, lighter on right to show image */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/60 to-navy-dark/40"></div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[88vh]">
        <div className="flex flex-col justify-center px-7 py-16 md:pl-16 md:pr-10">
          <div className="max-w-[600px]">
            <span className="inline-block bg-coral text-white text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5">
              ✦ Serving Seafarers Since 1856
            </span>
            
            {/* Updated Welcome Message - WHITE TEXT */}
            <h1 className="text-[clamp(36px,4.5vw,56px)] font-black text-white leading-[1.1] mb-5">
              Welcome to <br/>
              <span className="text-coral">The Mission to Seafarers Halifax</span>
            </h1>
            
            {/* Updated Introductory Text - WHITE TEXT */}
            <p className="text-[17px] text-white/90 leading-relaxed mb-8 max-w-[500px]">
              At The Mission to Seafarers Halifax, we are a global lifeline with a local heart. From the historic waterfront of Halifax, we welcome seafarers with hospitality, practical support, and a place to belong while they are far from home.
            </p>
            
            <div className="flex flex-wrap gap-3.5 mb-12">
              <a href="/donate" className="inline-flex items-center gap-2 bg-coral text-white px-8 py-3.5 rounded-full font-extrabold text-sm hover:bg-coral-light hover:-translate-y-0.5 shadow-warm hover:shadow-warm-hover transition-all">
                DONATE NOW
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex flex-col"><strong className="text-4xl font-black text-coral">90%</strong><span className="text-sm font-semibold text-white/80">World goods by sea</span></div>
            <div className="w-px h-9 bg-white/30"></div>
            <div className="flex flex-col"><strong className="text-4xl font-black text-coral">7,104</strong><span className="text-sm font-semibold text-white/80">Ships</span></div>
            <div className="w-px h-9 bg-white/30"></div>
            <div className="flex flex-col"><strong className="text-4xl font-black text-coral">181K+</strong><span className="text-sm font-semibold text-white/80">Seafarers</span></div>
            <div className="w-px h-9 bg-white/30"></div>
            <div className="flex flex-col"><strong className="text-4xl font-black text-coral">160+</strong><span className="text-sm font-semibold text-white/80">Year Legacy</span></div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center p-10 relative">
          <div className="relative w-full max-w-[540px]">
            {/* Adjusted aspect ratio to 4/3 to better accommodate the wider landscape image */}
            <div className="rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_20px_60px_rgba(45,53,128,.15)] bg-white">
              <img 
                src={heroImg} 
                alt="Mission to Seafarers Halifax Station and Staff" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-6 -left-5 bg-white rounded-2xl p-5 flex flex-col gap-1 shadow-[0_8px_32px_rgba(45,53,128,.12)] min-w-[180px]">
              <FaHeart className="text-[22px] text-coral mb-1" />
              <strong className="text-[15px] font-extrabold text-navy">Compassion First</strong>
              <span className="text-xs text-text-mid">Every seafarer matters</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}