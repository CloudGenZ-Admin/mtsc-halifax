import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { Anchor } from 'lucide-react';


export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center py-32 px-6 text-center">
        <div className="relative flex items-center justify-center mb-6">
          {/* Pulsing ring background */}
          <div className="absolute w-20 h-20 rounded-full bg-[#E05A2B]/20 animate-ping" />
          {/* Branded Anchor Icon */}
          <div className="w-16 h-16 rounded-full bg-[#112A46] text-white flex items-center justify-center shadow-xl relative z-10">
            <Anchor className="w-8 h-8 text-[#E05A2B] animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#112A46] mb-1">Loading Content...</h3>
      </main>
      <Footer />
    </div>
  );
}
