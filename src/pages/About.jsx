import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaAnchor, FaHeart, FaHandsHelping, FaUsers, 
  FaCheckCircle, FaPrayingHands, FaShip, FaUserTie 
} from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Inner Page Hero */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=85')] bg-cover bg-center opacity-20 mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
            <span className="inline-block bg-coral/20 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-coral/30">
              ✦ MTSC Halifax • Who We Are • About Us
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto">
              A Welcoming Harbour for <span className="text-coral">Seafarers in Halifax</span>
            </h1>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl font-black text-navy mb-6">The unseen workforce behind global trade.</h2>
                <div className="space-y-5 text-text-mid text-[16px] leading-relaxed">
                  <p>
                    The Mission to Seafarers Halifax exists to support the men and women who arrive in the Port of Halifax after long journeys across the world’s oceans.
                  </p>
                  <p>
                    More than <strong>90% of the world’s goods are transported by sea</strong>, carried by nearly two million seafarers who spend months away from home to keep supply chains moving.
                  </p>
                  <p>
                    When ships arrive in Halifax, crews often have little time ashore and limited opportunities to connect with the outside world. The Mission to Seafarers Halifax provides a place where seafarers can step away from the demands of ship life, reconnect with family, and receive practical and pastoral support.
                  </p>
                  <p>
                    Rooted in Halifax’s maritime community, our centre serves seafarers of all nationalities, cultures, and faiths. While our work is local, we are proud to be part of Mission to Seafarers Canada and the global Mission to Seafarers network, which supports seafarers in ports around the world.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-[24px] overflow-hidden aspect-square md:aspect-[4/5] shadow-warm">
                  <img src="https://images.unsplash.com/photo-1518081461904-9d8f136351c2?w=800&q=80" alt="Halifax Port at Sunset" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-coral text-white rounded-2xl p-6 shadow-card min-w-[200px]">
                  <FaAnchor className="text-3xl mb-2" />
                  <strong className="block text-lg font-black">A Global Network</strong>
                  <span className="text-sm font-medium opacity-90">Local support, global reach</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Mission & Vision (Split Style) */}
        <section className="py-12 bg-warm-gray">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-navy rounded-3xl p-10 md:p-14 shadow-card hover:-translate-y-1 transition-transform">
                <h3 className="text-coral text-sm font-extrabold tracking-widest uppercase mb-3">Our Mission</h3>
                <p className="text-white/90 text-[17px] leading-relaxed mb-6">
                  To care for and support seafarers visiting the Port of Halifax by offering a welcoming environment where they can rest, communicate with loved ones, and access practical assistance and pastoral care during their time in port.
                </p>
                <p className="text-white/70 text-[15px] leading-relaxed">
                  Through our station ship visits, and outreach services, we strive to ensure that every seafarer who arrives in Halifax feels supported and valued.
                </p>
              </div>
              
              <div className="bg-coral rounded-3xl p-10 md:p-14 shadow-warm hover:-translate-y-1 transition-transform">
                <h3 className="text-navy-dark text-sm font-extrabold tracking-widest uppercase mb-3">Our Vision</h3>
                <p className="text-white text-[22px] font-bold leading-snug">
                  To be a trusted place of welcome and care for seafarers visiting Halifax, where every crew member arriving in port can find support, connection, and a sense of belonging.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="text-center mb-16">
              <h2 className="text-[36px] font-black text-navy mb-4">Our Core Values</h2>
              <p className="text-text-mid max-w-2xl mx-auto">The principles that guide our work and ensure every seafarer receives the highest level of care and respect.</p>
            </Reveal>

            <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FaHandsHelping, title: 'Welcome', desc: 'We provide a safe and friendly environment where seafarers arriving in Halifax are greeted with warmth and hospitality.' },
                { icon: FaHeart, title: 'Compassion', desc: 'We recognize the personal challenges faced by seafarers and offer support that addresses their emotional, practical, and spiritual needs.' },
                { icon: FaUsers, title: 'Respect', desc: 'We celebrate the diversity of the maritime community and treat every seafarer with dignity regardless of nationality, culture, or faith.' },
                { icon: FaShip, title: 'Collaboration', desc: 'We work alongside the Port of Halifax, maritime partners, volunteers, and community organizations to strengthen services for visiting crews.' },
                { icon: FaCheckCircle, title: 'Accountability', desc: 'We operate with transparency and responsibility, ensuring that our resources are used to support seafarers effectively.' },
                { icon: FaPrayingHands, title: 'Service in Faith', desc: 'Inspired by Christian values, we offer compassionate and inclusive pastoral care while respecting the beliefs and traditions of all who visit our station.' }
              ].map((value, idx) => (
                <div key={idx} className="bg-warm-gray border-2 border-transparent hover:border-coral/20 rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all text-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-coral text-2xl mx-auto shadow-sm mb-5">
                    <value.icon />
                  </div>
                  <h3 className="text-lg font-black text-navy mb-3">{value.title}</h3>
                  <p className="text-[14px] text-text-mid leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-coral-pale border-y border-coral/10">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="text-center mb-16">
              <h2 className="text-[36px] font-black text-navy">Meet Our Team</h2>
            </Reveal>

            <div className="space-y-12">
              {/* Helen */}
              <Reveal className="bg-white rounded-3xl p-8 md:p-12 shadow-card flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start border-b-4 border-coral">
                <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden border-4 border-coral-pale shadow-inner">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" alt="Helen Glenn" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-navy">Helen Glenn</h3>
                  <p className="text-coral font-bold text-sm mb-4 uppercase tracking-wide">Station Manager</p>
                  <p className="text-text-mid text-[15px] leading-relaxed mb-4">
                    Helen Glenn has served as Station Manager of the Mission to Seafarers Halifax for more than 13 years, working closely with local maritime partners and international seafarers visiting the Port of Halifax. Through ship visits, transportation service, and the seafarers’ station, she helps ensure that crews arriving from around the world find a place of welcome, support, and connection while in port.
                  </p>
                  <p className="text-text-mid text-[15px] leading-relaxed mb-5">
                    Helen works closely with volunteers, port authorities, and maritime organizations to strengthen welfare services for seafarers and advocate for their wellbeing within the Canadian and international maritime community.
                  </p>
                  <div className="bg-warm-gray p-4 rounded-xl border border-coral/15 flex items-start gap-3">
                    <FaCheckCircle className="text-coral text-xl shrink-0 mt-0.5" />
                    <p className="text-sm text-navy font-semibold italic">
                      In recognition of her dedication to social service and seafarer welfare, Helen was awarded the Queen’s Platinum Jubilee Medal in 2022 by the Lieutenant Governor of Nova Scotia.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Joseph */}
              <Reveal className="bg-white rounded-3xl p-8 md:p-12 shadow-card flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start border-b-4 border-navy">
                <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden border-4 border-warm-gray shadow-inner">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" alt="Joseph Loot" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-navy">Joseph Loot</h3>
                  <p className="text-coral font-bold text-sm mb-4 uppercase tracking-wide">Assistant Manager</p>
                  <p className="text-text-mid text-[15px] leading-relaxed mb-4">
                    Joseph Loot serves as the Assistant Manager at the Mission to Seafarers Halifax, supporting the day-to-day operations of the centre and helping ensure that seafarers visiting the Port of Halifax receive a warm welcome and meaningful support during their time ashore.
                  </p>
                  <p className="text-text-mid text-[15px] leading-relaxed">
                    Working closely with the Station Manager, volunteers, and maritime partners, Joseph assists with seafarer transportation, ship visits, and centre activities, helping create a space where crews from around the world can rest, connect with loved ones, and access practical assistance while in port. Through his work, Joseph contributes to strengthening the Mission’s commitment to caring for the global maritime community that passes through Halifax.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Board & Volunteers (Split layout) */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-7 space-y-20">
            
            {/* Board of Directors */}
            <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 relative">
                <div className="rounded-3xl overflow-hidden shadow-card aspect-square">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" alt="Board Meeting" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-6 -right-6 bg-navy text-white p-5 rounded-2xl shadow-xl">
                  <FaUserTie className="text-3xl text-coral mb-2" />
                  <span className="font-bold">Strategic Leadership</span>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 lg:pl-10">
                <h2 className="text-[32px] font-black text-navy mb-6">Board of Directors</h2>
                <div className="space-y-4 text-text-mid text-[15.5px] leading-relaxed">
                  <p>
                    The Mission to Seafarers Halifax is guided by a dedicated Board of Directors made up of leaders from the maritime industry and the Halifax community. Their experience, leadership, and commitment help ensure that the station continues to serve seafarers visiting the Port of Halifax with care, integrity, and accountability.
                  </p>
                  <p>
                    Working closely with the Station Manager, the Board provides strategic direction, governance, and oversight, while also helping strengthen relationships with local maritime partners, port authorities, and community supporters.
                  </p>
                  <p>
                    Through their guidance and advocacy, the Board plays an important role in advancing the Mission’s work and ensuring that seafarers arriving in Halifax find a place of welcome and support during their time in port.
                  </p>
                  <p className="font-bold text-coral pt-2">
                    We are grateful for their leadership and continued commitment to the welfare of seafarers.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="w-full h-px bg-warm-gray"></div>

            {/* Station Volunteers */}
            <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 lg:pr-10">
                <h2 className="text-[32px] font-black text-navy mb-6">Station Volunteers</h2>
                <div className="space-y-4 text-text-mid text-[15.5px] leading-relaxed">
                  <p>
                    The Mission to Seafarers Halifax is made possible through the dedication of our incredible volunteers. Their time, compassion, and commitment help ensure that seafarers visiting the Port of Halifax feel welcomed, supported, and valued during their time ashore.
                  </p>
                  <p>
                    Our volunteers come from diverse backgrounds within the Halifax community, including maritime professionals, retirees, students, and individuals who simply want to give back to those who spend much of their lives at sea.
                  </p>
                  <p>
                    Working alongside our station staff, volunteers support many aspects of our work, including welcoming seafarers to the centre, assisting with ship visits, helping organize events, and providing practical support that helps crews stay connected with loved ones while far from home.
                  </p>
                  <p>
                    Through their kindness and service, our volunteers play a vital role in creating a place of hospitality and care for the international seafarers who pass through Halifax each year.
                  </p>
                  <p className="font-bold text-coral pt-2">
                    We are deeply grateful for their dedication and the difference they make in the lives of seafarers.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="rounded-3xl overflow-hidden shadow-card aspect-square">
                  <img src="https://images.unsplash.com/photo-1593113585090-348df8ee712b?w=800&q=80" alt="Volunteers" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-coral text-white p-5 rounded-2xl shadow-warm">
                  <FaHandsHelping className="text-3xl mb-2" />
                  <span className="font-bold">Compassionate Care</span>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}