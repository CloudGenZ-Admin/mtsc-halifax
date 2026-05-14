import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaCheckCircle, FaChevronLeft, FaChevronRight, FaHeart
} from 'react-icons/fa';

// Import existing images
import volunteersImg from '../assets/MtS Halifax Center.jpg';
import helenImg from '../assets/Helen-Glenn-Mission-Manager-174x300.jpg';
import portHalifaxImg from '../assets/port_halifax.jpg';
import seafarersOnDeckImg from '../assets/Awards/seafarers-ondeck-working-min.webp';
import josephImg from '../assets/Josefloot.jpg';
import helecncircle from '../assets/HelenCircle.jpg'
// ==========================================
// IMPORT VOLUNTEER GALLERY IMAGES
// ==========================================
import volunteer1 from '../assets/events/A-grand-team-effort-768x1024.jpg';
import volunteer2 from '../assets/events/Atlantic-Sky-crew-members-with-Helen-Elizabeth-and-Ronaldo-scaled.jpg';
import volunteer3 from '../assets/events/Maria-and-Elizabeth-serves-Andy-with-Susan-and-Will-1024x768.jpg';
import volunteer4 from '../assets/events/Nadia-and-Joanne-1024x768.jpg';
import volunteer5 from '../assets/events/Volunteer-John-Attersley-with-Chris-Hall-768x1024.jpg';
import volunteer6 from '../assets/events/Day-of-Seafarers-1024x683.jpg';
import volunteer7 from '../assets/events/International-Day-of-the-Seafarer-1024x768.jpg';
import volunteer8 from '../assets/events/Patricia-Susan-Elizabeth-Jack-Andy-.-Maria-Colm-Jim-Helen-768x1024.jpg';

// ==========================================
// IMPORT GALLERY IMAGES (AMENITIES)
// ==========================================
import bicyclesImg from '../assets/Amenities - Bicycles for Loan.jpg';
import canteenImg from '../assets/Amenities - Canteen-Souvenir Shop.jpg';
import chapelImg from '../assets/Amenities - Chapel-Prayer Room.jpg';
import transportImg from '../assets/Amenities - Complimentary Transport Service.jpg';
import conferenceImg from '../assets/Amenities - Conference Space.jpg';
import freeRoomImg from '../assets/Amenities - Free Room.jpg';
import basketballImg from '../assets/Amenities - Half Court Basketball 2.jpg';
import loungeImg from '../assets/Amenities - Lounge.jpg';
import sunDeckImg from '../assets/Amenities - Sun Deck.jpg';

// Combine Halifax content into London's timeline structure
const historyBlocks = [
  {
    era: "The Gateway",
    title: "Why Halifax Matters",
    content: (
      <>
        <p>As one of North America’s deepest and most connected Atlantic ports, Halifax plays a vital role in international shipping and global trade. Thousands of seafarers pass through Halifax Harbour each year, helping move cargo and goods between continents and communities.</p>
        <p className="mt-4">For many crews, Halifax may be one of only a few opportunities to step ashore during long voyages.</p>
        <p className="mt-4">That makes this port more than a shipping gateway. It becomes a place of rest, human connection, and care. Mission to Seafarers Halifax helps ensure that seafarers arriving on Canada’s Atlantic coast have access to hospitality, support, and a welcoming community while far from home.</p>
      </>
    ),
    img: portHalifaxImg,
  },
  {
    era: "Our Roots",
    title: "Rooted in Halifax’s Maritime Story",
    content: (
      <>
        <p>Halifax has always been shaped by the sea. Its waterfront tells stories of immigration, naval service, shipbuilding, resilience, and global connection. For generations, the harbour has welcomed ships and people from around the world, making Halifax one of Canada’s most historic maritime communities.</p>
        <p className="mt-4">Mission to Seafarers Halifax continues that tradition of welcome. Today, our station serves seafarers of all nationalities, cultures, and faiths through practical, emotional, and pastoral care rooted in compassion and dignity.</p>
        <p className="mt-4">Our work is made possible through volunteers, churches, maritime partners, donors, and community supporters who believe every seafarer deserves kindness, connection, and support during their time in port. While our care begins locally in Halifax, we are proud to be part of Mission to Seafarers Canada and the wider global Mission to Seafarers network supporting seafarers in ports around the world.</p>
      </>
    ),
    img: volunteersImg,
  },
  {
    era: "The History",
    title: "From One Chaplain’s Compassion to a Global Mission",
    content: (
      <>
        <p>The story of Mission to Seafarers began in 1835 with a simple but powerful act of compassion. While visiting the Bristol Channel in England, a young Anglican clergyman named Rev. John Ashley noticed that seafarers arriving by ship had no one to care for their spiritual or emotional well-being. Moved by their isolation and hardship, he chose to dedicate his life to supporting merchant crews working at sea.</p>
        <p className="mt-4">What started with one chaplain soon inspired a movement. By 1856, similar ministries joined together under the name The Mission to Seamen Afloat, expanding support across multiple ports. Through world wars, economic hardship, and the evolution of global shipping, the Mission continued to grow and adapt.</p>
        <p className="mt-4 font-semibold text-[#112A46] bg-[#F8FBFD] p-4 rounded-lg border-l-4 border-[#E05A2B]">
          Today, Mission to Seafarers supports seafarers in hundreds of ports across more than 70 countries, serving over a million crew members every year. Though the maritime world has changed dramatically over the last century, one thing has remained constant: our commitment to being a source of hope, care, dignity, and human connection for seafarers and their families.
        </p>
      </>
    ),
    img: seafarersOnDeckImg,
  },
  {
    era: "Community",
    title: "A Community That Continues to Show Up",
    content: (
      <>
        <p>The strength of Mission to Seafarers Halifax has always come from the community surrounding it. During the COVID-19 pandemic, when public restrictions forced many fundraising activities and events to pause, support for seafarers never stopped. Volunteers and supporters adapted quickly, organizing take-out dinners, outreach initiatives, and alternative fundraising efforts to ensure seafarers continued receiving care during one of the most isolating periods in modern shipping history.</p>
        <p className="mt-4">One of the most meaningful traditions remains our annual Christmas Shoebox program. Even during the height of the pandemic, volunteers and community supporters came together to distribute more than 1,000 Christmas gifts to seafarers visiting Halifax ports. For many crew members spending the holidays far from home, those gifts became reminders that they had not been forgotten.</p>
        <p className="mt-4">These moments reflect the heart of Mission to Seafarers Halifax: a community choosing to care for the people who keep the world moving.</p>
      </>
    ),
    img: volunteer4, // Using a volunteer image for community section
  }
];

function About() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const volunteersGallery = [
    { id: 1, img: volunteer1, title: 'Team Effort' },
    { id: 2, img: volunteer2, title: 'Welcoming Crew Members' },
    { id: 3, img: volunteer3, title: 'Serving with Care' },
    { id: 4, img: volunteer4, title: 'Community Connection' },
    { id: 5, img: volunteer5, title: 'Volunteer Support' },
    { id: 6, img: volunteer6, title: 'Day of Seafarers' },
    { id: 7, img: volunteer7, title: 'International Celebration' },
    { id: 8, img: volunteer8, title: 'Our Dedicated Team' },
  ];

  const amenitiesGallery = [
    { id: 1, img: loungeImg, title: 'Comfortable Lounge' },
    { id: 2, img: canteenImg, title: 'Canteen & Souvenir Shop' },
    { id: 3, img: freeRoomImg, title: 'Free Wi-Fi & Computers Room' },
    { id: 4, img: chapelImg, title: 'Chapel & Prayer Room' },
    { id: 5, img: transportImg, title: 'Complimentary Transport' },
    { id: 6, img: bicyclesImg, title: 'Bicycles for Loan' },
    { id: 7, img: basketballImg, title: 'Half Court Basketball' },
    { id: 8, img: sunDeckImg, title: 'Outdoor Sun Deck' },
    { id: 9, img: conferenceImg, title: 'Conference Space' },
  ];

  const carouselRef = useRef(null);
  const volunteerCarouselRef = useRef(null);

  const scrollPrev = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
  };
  const scrollNext = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
  };
  const scrollVolunteerPrev = () => {
    if (volunteerCarouselRef.current) volunteerCarouselRef.current.scrollBy({ left: -volunteerCarouselRef.current.offsetWidth, behavior: 'smooth' });
  };
  const scrollVolunteerNext = () => {
    if (volunteerCarouselRef.current) volunteerCarouselRef.current.scrollBy({ left: volunteerCarouselRef.current.offsetWidth, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-grow">

        {/* Hero Section - Matching London Design */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#112A46] min-h-[45vh] flex items-center justify-center border-b border-[#0a1a2c]">
          <div className="absolute inset-0 z-0">
            <img
              src={volunteersImg}
              alt="About Mission to Seafarers Halifax"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2c] via-[#112A46]/60 to-transparent" />
          </div>

          <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 text-center">
            <span className="inline-block text-[#E05A2B] font-bold tracking-widest uppercase text-sm mb-4">
              About Mission to Seafarers Halifax
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto mb-6">
              A Harbour of Care on Canada’s Atlantic Coast
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-3xl mx-auto">
              For generations, the Port of Halifax has stood as one of Canada’s most important gateways to the world. Ships arrive daily carrying the goods that sustain communities, industries, hospitals, businesses, and families across the country.
            </p>
          </div>
        </section>

        {/* Visually Engaging History Timeline Section (Adapted from London) */}
        <section className="py-24 bg-[#F8FBFD] overflow-hidden">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">Our Story</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#112A46] leading-tight">
                Behind every vessel is a crew.
              </h2>
              <p className="mt-6 text-gray-600 text-sm leading-relaxed font-medium">
                seafarers who spend months away from home, crossing oceans to keep global trade moving.
                Mission to Seafarers Halifax exists to ensure that when those seafarers arrive in Halifax, they are not alone.
                Whether visiting for only a few hours or several days, many crew members arrive exhausted, isolated, and disconnected from loved ones. Limited shore leave, demanding schedules, and long periods at sea can take a significant emotional and physical toll.
                At our station and through ship visits across Halifax Harbour, we provide a welcoming place where seafarers can rest, reconnect with family, receive practical support, and experience kindness far from home.
                Sometimes support means helping a crew member make their first video call home in weeks. Sometimes it means offering warm winter clothing after arriving from sea in harsh Atlantic weather. Sometimes it simply means listening.

              </p>
            </div>

            <div className="space-y-20 md:space-y-32 relative max-w-6xl mx-auto">
              {/* Vertical connecting line for desktop */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#E05A2B]/20 -translate-x-1/2"></div>

              {historyBlocks.map((block, idx) => (
                <Reveal key={idx}>
                  <div className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                    {/* Timeline Center Dot */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#E05A2B] items-center justify-center z-10 shadow-md">
                      <div className="w-3 h-3 bg-[#E05A2B] rounded-full"></div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative group">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border-4 border-white">
                        <img
                          src={block.img}
                          alt={block.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      {/* Year/Era Badge overlay on desktop */}
                      <div className={`absolute top-8 ${idx % 2 !== 0 ? '-left-8' : '-right-8'} bg-[#112A46] text-white px-8 py-3 rounded-xl shadow-xl z-20 hidden md:block transform transition-transform group-hover:-translate-y-2`}>
                        <span className="text-lg font-bold tracking-wider uppercase">{block.era}</span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2 space-y-6 bg-white md:bg-transparent p-8 md:p-0 rounded-3xl shadow-sm md:shadow-none border border-gray-100 md:border-none relative z-10">
                      {/* Badge for mobile */}
                      <div className="md:hidden inline-block bg-[#E05A2B] text-white px-4 py-2 rounded-lg text-sm font-bold mb-2 uppercase">
                        {block.era}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#112A46]">{block.title}</h3>

                      <div className="text-gray-600 text-[16px] leading-relaxed space-y-4 font-medium">
                        {block.content}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Supporting Seafarers Today (Services List) */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">Our Impact</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#112A46] leading-tight mb-6">
                  Supporting Seafarers in Halifax Today
                </h2>
                <p className="text-gray-600 text-[16px] leading-relaxed font-medium mb-6">
                  Every interaction matters. Volunteers regularly meet crews who have spent months at sea without stepping onto land. Others arrive carrying the stress of uncertain contracts, fatigue, isolation, or the emotional weight of being away from family for extended periods. For many seafarers, even a small moment of kindness can make a lasting difference.
                </p>
                <p className="text-[#112A46] font-bold text-lg mb-6">Our services include:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Friendly ship visits across Halifax Harbour",
                    "Transportation and local guidance",
                    "Wi-Fi and communication support",
                    "Seasonal clothing and essential items",
                    "Refreshments and hospitality",
                    "Emotional and spiritual care",
                    "Seafarers Parcel Pickup Service",
                    "Community connection and advocacy"
                  ].map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-[#E05A2B] text-[16px] mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-[15px] font-semibold">{service}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="bg-[#112A46] p-10 rounded-3xl text-white shadow-xl">
                  <h3 className="text-2xl font-extrabold mb-4">Looking Ahead</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    As Mission to Seafarers Halifax continues to grow, so does our vision for the future. We are building more than a station. We are building a welcoming maritime hub where seafarers can find rest, support, connection, and community while visiting Halifax.
                  </p>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Through volunteers, partnerships, churches, donors, and national collaboration, we hope to continue expanding services and outreach that respond to the evolving needs of seafarers visiting Canada’s Atlantic coast.
                  </p>
                  <p className="text-[#f48c6f] font-bold italic">
                    Every donation, volunteer hour, partnership, and act of kindness helps strengthen this mission.
                    Because behind every ship entering Halifax Harbour is a crew of people who deserve to feel seen, valued, and cared for.
                    Our team

                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Team Section (London Style) */}
        <section className="py-20 md:py-28 bg-white">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">Station Leadership</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#112A46] leading-tight">
                The People Behind the Welcome
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-sm leading-relaxed">
                Guided by our Board of Directors and supported by dedicated staff and volunteers, Mission to Seafarers Halifax works to create a welcoming and supportive environment for seafarers visiting Canada’s Atlantic gateway.
                Whether through ship visits, station hospitality, transportation support, outreach, or simply offering a listening ear, every interaction is rooted in compassion, dignity, and care.
                Together, our board, staff, and volunteers help ensure that seafarers arriving in Halifax feel seen, supported, and connected while far from home.

              </p>
            </div>

            {/* Featured Leader - Helen */}
            <Reveal>
              <div className="grid lg:grid-cols-12 gap-12 items-center mb-12 bg-[#F8FBFD] border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
               <div className="lg:col-span-5 flex justify-center">
  <img
    src={helecncircle}
    alt="Helen Glenn"
    className="w-full max-w-sm rounded-full shadow-md object-cover aspect-square object-top border-4 border-white"
  />
</div>
                <div className="lg:col-span-7">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#112A46] leading-tight">
                    Station Manager
                  </h2>
                  <h3 className="mt-4 text-lg font-bold text-[#E05A2B] uppercase tracking-wider">
                    HELEN GLENN
                  </h3>
                  <div className="mt-6 space-y-4 text-base md:text-lg text-gray-600 leading-relaxed">
                    <p>
                      Helen leads Mission to Seafarers Halifax with compassion, warmth, and a deep commitment to the welfare of seafarers visiting the Port of Halifax.
                    </p>c
                    <p>
                      Through leadership, outreach, volunteer coordination, and community engagement, she helps ensure that every seafarer who connects with the station experiences hospitality, practical support, and a welcoming place of care while ashore.
                    </p>
                    <p>
                      Helen continues to play an important role in strengthening Halifax’s maritime community and advancing the Mission’s work across the region.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Additional Team Member - Joseph & Volunteer Card */}
            <Reveal delay={100}>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-md transition-shadow">

                  <div className="w-40 h-40 mx-auto rounded-full shadow-md mb-6 overflow-hidden border-4 border-white flex justify-center items-center bg-[#DCD2B9]">
                    <img
                      src={josephImg}
                      alt="Joseph"
                      className="w-[98%] max-w-none h-auto"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#112A46]">Joseph</h3>
                  <p className="text-[#E05A2B] font-bold uppercase text-sm mt-2 mb-4 tracking-wider">Assistant Manager</p>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    Joseph supports the daily operations of the Halifax station and helps create a welcoming environment for seafarers visiting the port. His dedication and calm presence help make the station a trusted place for many visiting crews.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center bg-gradient-to-br from-[#112A46] to-[#1a3a5f] text-white rounded-3xl p-10 shadow-lg">
                  <div className="w-20 h-20 bg-[#E05A2B] rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <FaHeart className="text-white text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Volunteers</h3>
                  <p className="text-white/80 leading-relaxed font-medium mb-6">
                    Behind every ship visit, warm meal, ride into the city, care package, or friendly conversation is a volunteer helping make it possible.
                  </p>
                  <div className="flex justify-center gap-8 w-full mt-auto border-t border-white/20 pt-6">
                    <div>
                      <div className="text-3xl font-black text-[#FFD700]">50+</div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">Active<br />Volunteers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-[#FFD700]">1000+</div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">Hours<br />Served</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>



        {/* CAROUSEL SECTION: VOLUNTEERS */}
        <section className="py-20 bg-[#F8FBFD] border-y border-gray-100 overflow-hidden">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            <Reveal className="text-center mb-12">
              <h2 className="mt-4 text-[32px] md:text-4xl font-extrabold text-[#112A46] mb-6">
                The Heart of the Mission | Our Volunteers
              </h2>
              <div className="text-gray-600 text-[16px] max-w-3xl mx-auto leading-relaxed font-medium space-y-4">
                <p>
                  Behind every ship visit, warm meal, ride into the city, care package, or friendly conversation is a volunteer helping make it possible.
                </p>
                <p>
                  Mission to Seafarers Halifax is powered by a compassionate network of volunteers who generously give their time, skills, and energy to support seafarers arriving at the Port of Halifax.
                </p>
                <p>
                  Some volunteers greet seafarers at the station. Others help coordinate transportation, organize seasonal programs, prepare hospitality spaces, assist with outreach, or participate in ship visits across Halifax Harbour.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative group">
                <button
                  onClick={scrollVolunteerPrev}
                  className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                >
                  <FaChevronLeft className="text-lg pr-1" />
                </button>
                <button
                  onClick={scrollVolunteerNext}
                  className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                >
                  <FaChevronRight className="text-lg pl-1" />
                </button>

                <div
                  ref={volunteerCarouselRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-4 px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />
                  {volunteersGallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-3xl shadow-md shrink-0 snap-center sm:snap-start w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group/card border border-white"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#112A46]/5">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" draggable="false" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#112A46]/90 via-transparent to-transparent flex items-end p-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                          <h3 className="text-[#112A46] font-bold text-[14px]">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="mt-16">
              <div className="text-center max-w-4xl mx-auto space-y-12">
                <div className="text-gray-600 text-[16px] leading-relaxed font-medium space-y-4">
                  <p>
                    Many simply offer something equally meaningful: human connection.
                  </p>
                  <p>
                    For crew members who may spend months away from family and home, those moments of kindness and conversation can leave a lasting impact.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#112A46] mb-4">A Community of Care</h3>
                  <p className="text-gray-600 text-[16px] leading-relaxed font-medium max-w-3xl mx-auto">
                    Our volunteers come from diverse backgrounds but share one common purpose: to ensure seafarers visiting Halifax feel welcomed, respected, and supported. Their commitment reflects the spirit of Halifax’s maritime community and the long-standing tradition of caring for those who work at sea.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                    <div className="text-4xl font-extrabold text-[#E05A2B] mb-2">50+</div>
                    <div className="text-lg font-bold text-[#112A46] uppercase tracking-wider mb-2">Active Volunteers</div>
                    <p className="text-gray-600 text-sm font-medium">
                      Supporting ship visits, hospitality, outreach, transportation, and station programs
                    </p>
                  </div>
                  <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                    <div className="text-4xl font-extrabold text-[#E05A2B] mb-2">1,000+</div>
                    <div className="text-lg font-bold text-[#112A46] uppercase tracking-wider mb-2">Volunteer Hours Served</div>
                    <p className="text-gray-600 text-sm font-medium">
                      Dedicated annually to supporting seafarers visiting Halifax
                    </p>
                  </div>
                </div>

                <div className="bg-[#112A46] p-10 md:p-14 rounded-3xl shadow-xl text-left text-white max-w-3xl mx-auto">
                  <h3 className="text-2xl font-extrabold mb-4 text-[#E05A2B]">Thank You</h3>
                  <p className="text-white/80 leading-relaxed font-medium mb-8">
                    To every volunteer, supporter, maritime partner, church community, and donor who helps sustain this mission: thank you. Your compassion and generosity continue to make Mission to Seafarers Halifax a place of welcome, care, and connection for seafarers from around the world.
                  </p>

                  <h3 className="text-2xl font-extrabold mb-4 text-[#E05A2B]">Interested in Volunteering?</h3>
                  <p className="text-white/80 leading-relaxed font-medium">
                    Whether you can help occasionally or become part of ongoing outreach efforts, there are many ways to get involved and support seafarers visiting Halifax.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </section>


        {/* CAROUSEL SECTION: AMENITIES */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            <Reveal className="text-center mb-12">
              <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">Our Facilities</span>
              <h2 className="mt-4 text-[32px] md:text-4xl font-extrabold text-[#112A46] mb-4">Comfort & Care for Seafarers</h2>
              <p className="text-gray-600 text-[16px] max-w-2xl mx-auto leading-relaxed font-medium">
                We offer a variety of amenities designed to provide a relaxing and welcoming environment for seafarers arriving in the Port of Halifax.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative group">
                <button
                  onClick={scrollPrev}
                  className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                >
                  <FaChevronLeft className="text-lg pr-1" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                >
                  <FaChevronRight className="text-lg pl-1" />
                </button>

                <div
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-4 px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style dangerouslySetInnerHTML={{ __html: `div::-webkit-scrollbar { display: none; }` }} />
                  {amenitiesGallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex flex-col overflow-hidden rounded-3xl bg-[#112A46] border border-gray-100 shadow-md shrink-0 snap-center sm:snap-start w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" draggable="false" />
                      </div>
                      <div className="p-5 text-center flex-grow flex items-center justify-center">
                        <h3 className="text-white font-bold text-[15px] leading-tight">{item.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>




        {/* How the structure works (London Style) */}
        <section className="py-20 md:py-28 bg-[#F8FBFD] border-t border-gray-200">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#112A46] leading-tight">
                How the Structure Works
              </h2>
            </div>

            <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
              <div className="rounded-3xl bg-white border border-gray-100 p-10 shadow-sm hover:shadow-lg transition-all text-center">
                <p className="text-gray-600 leading-relaxed font-medium text-lg">
                  <strong className="text-[#112A46] block text-2xl mb-4 font-extrabold">Mission to Seafarers Canada</strong>
                  provides the national foundation, leadership, and support.
                </p>
              </div>
              <div className="rounded-3xl bg-white border border-gray-100 p-10 shadow-sm hover:shadow-lg transition-all text-center">
                <p className="text-gray-600 leading-relaxed font-medium text-lg">
                  <strong className="text-[#112A46] block text-2xl mb-4 font-extrabold">Mission to Seafarers Halifax</strong>
                  brings that mission to life locally at the Port of Halifax.
                </p>
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto text-center">
              <p className="text-xl font-bold text-[#E05A2B] leading-relaxed italic mb-8">
                Together, ensure that every seafarer who comes through Halifax is not only seen, but cared for.
              </p>
              <Link
                to="/get-involved"
                className="inline-flex items-center justify-center bg-[#E05A2B] hover:bg-[#c94d22] text-white font-bold shadow-lg h-14 px-8 rounded-md text-lg transition-colors"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>





      </main>
      <Footer />
    </div>
  );
}

export default About;