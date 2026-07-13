import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { X, Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import the local logo and app images
import seafarerLogoImg from '../../assets//logo.jpeg';
import happyAtSeaLogo from '../../assets/happy-sea-app.svg';
import appStoreBtn from '../../assets/btn-appstore.png';
import googlePlayBtn from '../../assets/btnapp-google-play.png.webp';

export default function Footer() {
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const footerLinks = [
    { name: 'About', path: '/whoweare' },
    { name: 'Events', path: '/events' },
    { name: 'Sponsors', path: '/WaystoGive' },
    { name: 'Volunteer', path: '/contact' },
    { name: 'Publication', path: '/publication' },
    { name: 'Send a Prayer', path: '/prayer' },
    { name: 'Donate', path: '/donate' }
  ];

  const socialLinks = [
    { Icon: FaLinkedinIn, url: 'https://www.linkedin.com/company/mission-to-seafarers-halifax-ns/', label: 'LinkedIn' },
    // { Icon: FaYoutube, url: 'https://www.youtube.com/@MissiontoSeafarersCanada', label: 'YouTube' },
    // { Icon: FaInstagram, url: 'https://www.instagram.com/missiontoseafarerscanada/', label: 'Instagram' },
    { Icon: FaFacebookF, url: 'https://www.facebook.com/MissionToSeafarersHalifaxCanada', label: 'Facebook' },
    { Icon: FaTiktok, url: 'https://www.tiktok.com/@seafarerscanada', label: 'TikTok' }
  ];

  return (
    // UPDATED: bg-[#233465] -> bg-navy-dark, added text-white/90 for base text
    <footer className="bg-navy-dark text-white/90 font-sans w-full  relative">
      <div className="max-w-[1480px] mx-auto px-4 md:px-8 py-8 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
        
        {/* Column 1: Brand & About */}
        <div className="flex flex-col lg:col-span-4 lg:pl-10 xl:pl-[70px]">
          <Link 
            to="/" 
            className="flex items-center gap-4 group"
            onClick={handleScrollToTop}
          >
            <div className="bg-white rounded-lg p-1.5 w-[68px] h-[68px] md:w-[72px] md:h-[72px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img 
                src={seafarerLogoImg} 
                alt="Mission to Seafarers Logo" 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
            <div className="flex flex-col justify-center mt-1">
              <span className="text-[18px] lg:text-[20px] font-bold text-white leading-none tracking-wide whitespace-nowrap">
                Mission to Seafarers
              </span>
              {/* UPDATED: text-[#ee5a32] -> text-coral-light */}
              <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-coral-light mt-1.5">
                Halifax
              </span>
            </div>
          </Link>
          
          {/* UPDATED: text-[#b6c2d9] -> text-white/70 */}
          <p className="mt-5 text-[14.5px] leading-[1.6] text-white/70 md:pr-10 xl:pr-22">
            Caring for seafarers visiting the Port of Halifax by providing a welcoming harbour, pastoral care, and practical support.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div className="lg:col-span-3 lg:pl-4">
          {/* UPDATED: text-[#ee5a32] -> text-coral-light, font-bold -> font-extrabold to match other footer */}
          <h4 className="text-[14px] font-extrabold uppercase tracking-wider text-coral-light mb-4">
            Explore
          </h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14.5px]">
            {footerLinks.map(link => (
              <li key={link.name}>
                {link.name === 'Donate' ? (
                  <button 
                    onClick={() => setDonateDialogOpen(true)}
                    className="text-white/90 hover:text-coral-light transition-colors block text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link 
                    to={link.path} 
                    className="text-white/90 hover:text-coral-light transition-colors block"
                    onClick={handleScrollToTop}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Connect With Us */}
        <div className="lg:col-span-2">
          {/* UPDATED: text-[#ee5a32] -> text-coral-light */}
          <h4 className="text-[14px] font-extrabold uppercase tracking-wider text-coral-light mb-4">
            Connect With Us
          </h4>
          <ul className="space-y-2.5 text-[14.5px]">
            {socialLinks.map(({ Icon, url, label }, i) => (
              <li key={i} className="flex items-center gap-3">
                {/* UPDATED: text-[#ee5a32] -> text-coral-light */}
                <Icon className="text-[16px] shrink-0 text-coral-light mt-0.5" />
                {/* UPDATED: hover:text-white -> hover:text-coral-light */}
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/90 hover:text-coral-light transition-colors leading-tight"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Happy at Sea App */}
        <div className="lg:col-span-3">
          {/* UPDATED: text-[#ee5a32] -> text-coral-light */}
          <h4 className="text-[14px] font-extrabold uppercase tracking-wider text-coral-light mb-4">
            Happy at Sea App
          </h4>
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={happyAtSeaLogo} 
              alt="Happy at Sea App" 
              className="h-6 w-6 shrink-0 object-contain" 
            />
            {/* UPDATED: text-[#b6c2d9] -> text-white/70 */}
            <p className="text-[14.5px] text-white/70 leading-tight">
              24/7 chaplain chat service
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a 
              href="https://apps.apple.com/us/app/happy-at-sea/id6447320913" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="transition-transform hover:scale-105 inline-block w-max"
            >
              <img src={appStoreBtn} alt="Download on the App Store" className="h-[36px] w-auto object-contain" />
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=org.missiontoseafarers.app&hl=en_IN" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="transition-transform hover:scale-105 inline-block w-max"
            >
              <img src={googlePlayBtn} alt="Get it on Google Play" className="h-[36px] w-auto object-contain" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10">
        {/* UPDATED: text-[#b6c2d9] -> text-white/60 to match previous footer styling */}
        <div className="max-w-[1480px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p className="text-center md:text-left lg:pl-10 xl:pl-[70px]">
            &copy; {new Date().getFullYear()} Mission to Seafarers Canada. All rights reserved.
          </p>
          <p className="text-center md:text-right md:pr-4">
            Designed with purpose for the seafarers of Halifax.
          </p>
        </div>
      </div>

      {/* FULLY RESPONSIVE DONATE DIALOG POPUP (Matches Header) */}
      <Dialog open={donateDialogOpen} onOpenChange={setDonateDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] lg:max-w-[1200px] w-full h-[95vh] md:h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl"
        >
          <DialogHeader className="p-4 md:p-5 shrink-0 border-b bg-white shadow-sm z-10 flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-extrabold text-navy">
              <Gift className="h-5 w-5 text-coral" />
              Secure Donation Form
            </DialogTitle>
            <button
              onClick={() => setDonateDialogOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </DialogHeader>

          <div className="flex-1 overflow-hidden p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-50/80 flex flex-col">
            <div className="w-full flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative">
              <iframe
                src="https://www.canadahelps.org/en/dn/146457"
                title="CanadaHelps Secure Donation Form"
                className="absolute inset-0 w-full h-full border-none bg-transparent"
                allow="payment"
              ></iframe>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}