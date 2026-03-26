import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { FaHeart, FaGift, FaHistory, FaShip } from 'react-icons/fa';

// Import the local image provided
import canadaHelpImg from '../assets/candahelp.png';

export default function Donate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 bg-[#0B1A30]">
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-[#E05A2B]/20 text-[#E05A2B] text-[13px] font-black tracking-wide px-4 py-1.5 rounded-full mb-5 border border-[#E05A2B]/30 uppercase">
              <FaHeart /> Support Our Mission
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto">
              Donate to the <span className="text-[#E05A2B]">Mission</span>
            </h1>
            <p className="text-[18px] md:text-[22px] font-medium text-gray-300 max-w-3xl mx-auto">
              Over 80 Years providing services for seafarers at the Port of Halifax!
            </p>
          </div>
        </section>

        {/* MAIN CONTENT SECTION */}
        <section className="py-20">
          <div className="max-w-[1200px] mx-auto px-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* LEFT CONTENT: History & Text */}
              <div className="lg:col-span-7 space-y-8 text-[16px] md:text-[17px] leading-relaxed text-gray-700 font-medium">
                <Reveal>
                  <h2 className="text-[32px] font-black text-[#112A46] mb-6 border-l-4 border-[#E05A2B] pl-5 leading-tight">
                    Our History & Global Impact
                  </h2>
                  <p>
                    The history of the Mission to Seafarers dates back to 1835, when a young Anglican clergyman, the Rev John Ashley, holidaying near the Bristol Channel, realized that the seafarers who manned the ships there had no one to minister to them. He decided to change his plans to join a parish, and immediately became a chaplain for crews who sailed the merchant fleet.
                  </p>
                  <p className="mt-4">
                    In 1856, similar ministries inspired by Rev Ashley’s work grouped together under the name The Mission to Seamen Afloat and expanded its work to 14 ports. The outbreak of the First World War meant that some of the smaller stations were closed down. However, new ones opened. Gradually, after the Second World War the shipping industry was in a fairly stable condition. Although recovery was slow after the war, both the shipping industry and the Mission gradually re-organized, and by 1956, when the Mission to Seamen celebrated its centenary, it had centers in 81 ports.
                  </p>
                </Reveal>

                <Reveal className="bg-white p-8 rounded-2xl shadow-sm border border-[#112A46]/10 my-8 relative overflow-hidden">
                  <FaShip className="absolute -bottom-6 -right-6 text-[120px] text-[#E05A2B]/5 transform -rotate-12" />
                  <p className="relative z-10 text-[#112A46] font-bold">
                    The challenge The Mission to Seafarers faces today, is how best to minister to people of many different cultures and faiths who are facing ever-increasing physical, cultural and social isolation. The Mission is now present in 278 ports in 71 countries, and ministering to over 1.3 million crewmen and women.
                  </p>
                  <p className="relative z-10 mt-4 text-[#112A46] font-bold">
                    The Mission to Seafarers continues to develop, the fundamentals will not change. Its mission is to be there for all crew men and women as a source of help, strength and hope to seafarers and their families.
                  </p>
                </Reveal>

                <Reveal>
                  <h2 className="text-[28px] font-black text-[#112A46] mb-6 flex items-center gap-3">
                    <FaGift className="text-[#E05A2B]" /> Fundraising & Support
                  </h2>
                  <h3 className="text-xl font-bold text-[#E05A2B] mb-4 uppercase tracking-wide">
                    THANK YOU FOR HELPING US!
                  </h3>
                  <p>
                    Our fund raising projects have mostly been canceled due to the public health and safety restrictions addressing the COVID-19 pandemic. However, we continue to hold successful take-out BBQ and dinners in lieu of the monthly luncheons.
                  </p>
                  <p className="mt-4">
                    When the restrictions ease up, we are looking forward to holding our exciting regular fund raising activities including the Golf Tournament, Spring Winefest, and Christmas Luncheon. We are also excited to see our patrons, sponsors, and friends.
                  </p>
                  <p className="mt-4">
                    Our annual Christmas Shoebox Gift-giving to seafarers continues! Last Christmas 2020, in the middle of the COVID-19 pandemic, we gave over 1,000 gifts to seafarers whose ships visited the Halifax ports.
                  </p>
                  <div className="mt-8 p-6 bg-[#FDF0EC] border-l-4 border-[#E05A2B] rounded-r-xl">
                    <p className="text-[18px] font-black text-[#112A46] italic">
                      "Our seafarers depend on us… we are so fortunate to be able to depend on YOU."
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT CONTENT: Sticky Donation Box */}
              <div className="lg:col-span-5 sticky top-[100px]">
                <Reveal className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(17,42,70,.08)] border border-[#112A46]/10 text-center flex flex-col items-center">
                  <h3 className="text-[26px] font-black text-[#112A46] mb-3 leading-tight">
                    Please DONATE!
                  </h3>
                  <p className="text-gray-500 font-medium mb-8 text-[15px]">
                    Your generous support allows us to continue our mission for the unsung heroes of the sea.
                  </p>
                  
                  {/* CanadaHelps Image */}
                  <div className="w-full mb-8 flex justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <img 
                      src={canadaHelpImg} 
                      alt="Canada Helps - Donate Now" 
                      className="max-w-[200px] w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Donate Button Action */}
                  <a 
                    href="https://www.canadahelps.org/en/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#E05A2B] text-white py-4 px-8 rounded-xl font-black text-[16px] tracking-wide hover:bg-[#112A46] hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-3 uppercase group"
                  >
                    <FaHeart className="group-hover:scale-110 transition-transform" /> Donate Now
                  </a>
                  
                  <p className="text-[12px] text-gray-400 mt-5 uppercase font-bold tracking-wider">
                    Secure donations via CanadaHelps
                  </p>
                </Reveal>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}