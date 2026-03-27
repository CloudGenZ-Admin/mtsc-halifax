import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaPrayingHands, FaWater, FaCompass, FaGlobe, FaPaperPlane 
} from 'react-icons/fa';

// Import the local image provided (matching your exact spelling)
import prayerImg from '../assets/paryer.jpg';

export default function Prayer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Inner Page Hero with Image */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          {/* Top Image: Calm ocean sunset */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495555687398-3f50fa82fd06?w=1200&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              <FaPrayingHands /> Spiritual Care • Prayer
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-3xl mx-auto">
              Finding Strength & Hope <span className="text-coral">Through Prayer</span>
            </h1>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[900px] mx-auto px-7 text-center">
            <Reveal>
              {/* --- ADDED RESPONSIVE IMAGE --- */}
              <img 
                src={prayerImg} 
                alt="Prayer and Spiritual Care for Seafarers" 
                className="w-full h-auto max-h-[500px] object-cover rounded-3xl shadow-lg mb-12 border border-navy/5"
              />

              <h2 className="text-3xl font-black text-navy mb-6">A Source of Comfort in Challenging Moments</h2>
              <div className="space-y-6 text-text-mid text-[17px] leading-relaxed">
                <p>
                  At the Halifax Mission to Seafarers we believe that prayer has a significant impact on our lives and the lives of seafarers. It is the faith and hope that we can be heard in our most challenging moments, when we are in need of the divine.
                </p>
                <p>
                  If you, or a member of your family, or someone you know is a seafarer in need of prayer, please send us your prayer request (see the Request Form below) and we will pray for you.
                </p>
                <div className="pt-4">
                  <a href="#worldwide-chaplain" className="inline-flex items-center gap-2 text-coral font-bold hover:text-coral-light transition-colors border-b-2 border-coral pb-1">
                    <FaGlobe /> Speak or chat with an MtS Chaplain worldwide
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Prayers Grid Section */}
        <section className="py-24 bg-warm-gray border-y border-coral/10">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Prayer 1 */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all border-t-4 border-coral relative overflow-hidden group">
                <FaWater className="absolute -bottom-4 -right-4 text-[100px] text-coral-pale opacity-50 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-navy mb-5 leading-tight">Prayer for Seafarers to Find Safe Passage</h3>
                  <p className="text-navy font-bold mb-2">Dear Lord,</p>
                  <p className="text-text-mid text-[15px] leading-relaxed italic">
                    As our seafarers embark on their journeys, we humbly ask you to guide them through treacherous waters and turbulent storms. Grant them safe passage, and may your divine light shine brightly upon their vessels. Keep them shielded from harm’s way, so that they may return to their loved ones, who eagerly await their safe return. Their presence is not only a source of joy but also a beacon of hope, inspiring all of us to be a presence for them.
                  </p>
                  <p className="text-navy font-bold mt-4">Amen.</p>
                </div>
              </div>

              {/* Prayer 2 */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all border-t-4 border-navy relative overflow-hidden group">
                <FaPrayingHands className="absolute -bottom-4 -right-4 text-[100px] text-warm-gray opacity-50 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-navy mb-5 leading-tight">Prayer for Seafarers to Stay Strong in Storms</h3>
                  <p className="text-navy font-bold mb-2">Dear Heavenly Father,</p>
                  <p className="text-text-mid text-[15px] leading-relaxed italic">
                    In the face of tempestuous seas and crashing waves, we beseech you to grant our seafarers the strength to stand firm. Help them find courage amidst the storm, and may your divine presence be their unwavering anchor. When the world rages around them, let them stand resolute, knowing that your protection is their unyielding shield. Grant them the resilience to weather any adversity that may come their way.
                  </p>
                  <p className="text-navy font-bold mt-4">Amen.</p>
                </div>
              </div>

              {/* Prayer 3 */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all border-t-4 border-teal relative overflow-hidden group">
                <FaCompass className="absolute -bottom-4 -right-4 text-[100px] text-coral-pale opacity-50 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-navy mb-5 leading-tight">Prayer for Seafarers to Navigate with Faith</h3>
                  <p className="text-navy font-bold mb-2">Dear God,</p>
                  <p className="text-text-mid text-[15px] leading-relaxed italic">
                    As seafarers navigate the vast expanse of the open sea, we earnestly ask you to instill in them unwavering faith. May their compass be guided by your divine hand, and may they find their way through even the darkest of nights. Bless them with clarity of purpose and the knowledge that they are never alone on this perilous journey. In moments of uncertainty, let their faith in you be their guiding star.
                  </p>
                  <p className="text-navy font-bold mt-4">Amen.</p>
                </div>
              </div>

            </Reveal>
          </div>
        </section>

        {/* Prayer Request Form Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="bg-coral-pale rounded-[32px] p-8 md:p-14 shadow-card border border-coral/20">
              <div className="text-center mb-10">
                <h2 className="text-[32px] font-black text-navy mb-3">Request a Prayer</h2>
                <p className="text-text-mid">Send your prayer request to our MtS Halifax Chaplain.</p>
              </div>

              <form className="space-y-6 max-w-[700px] mx-auto" onSubmit={(e) => e.preventDefault()}>
                
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">First Name *</label>
                    <input type="text" required className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" placeholder="First Name" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Last Name *</label>
                    <input type="text" required className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" placeholder="Last Name" />
                  </div>
                </div>

                {/* Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Email *</label>
                    <input type="email" required className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Confirm Email *</label>
                    <input type="email" required className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" placeholder="your@email.com" />
                  </div>
                </div>

                {/* Prayer Request Textarea */}
                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">Prayer Request *</label>
                  <textarea required rows="5" className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px] resize-none" placeholder="Share your prayer request here..."></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4" id="worldwide-chaplain">
                  <button type="submit" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-coral text-white px-8 py-4 rounded-full font-extrabold text-[15px] hover:bg-coral-light shadow-warm hover:shadow-warm-hover transition-all">
                    <FaPaperPlane /> Submit Request
                  </button>
                  <a href="#" className="w-full sm:w-auto inline-flex justify-center text-center items-center bg-transparent border-2 border-navy text-navy px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-navy hover:text-white transition-colors">
                    Contact a Chaplain Worldwide
                  </a>
                </div>

              </form>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}