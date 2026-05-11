import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import {
  FaAnchor, FaHeart, FaHandsHelping, FaUsers,
  FaCheckCircle, FaPrayingHands, FaShip, FaUserTie,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

// Import existing images
import volunteersImg from '../assets/MtS Halifax Center.jpg';
import helenImg from '../assets/Helen-Glenn-Mission-Manager-174x300.jpg';
import portHalifaxImg from '../assets/port_halifax.jpg';
import seafarersOnDeckImg from '../assets/Awards/seafarers-ondeck-working-min.webp';
import josephImg from '../assets/Josefloot.jpeg';
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

function About() {

  // Volunteer Gallery Data Array
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

  // Gallery Data Array
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

  // Carousel Scroll Reference & Functions
  const carouselRef = useRef(null);
  const volunteerCarouselRef = useRef(null);

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollVolunteerPrev = () => {
    if (volunteerCarouselRef.current) {
      volunteerCarouselRef.current.scrollBy({ left: -volunteerCarouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollVolunteerNext = () => {
    if (volunteerCarouselRef.current) {
      volunteerCarouselRef.current.scrollBy({ left: volunteerCarouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-grow">
        {/* Inner Page Hero - Softer, Warmer Design */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* Background with Port Halifax Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={volunteersImg}
              alt="Halifax Port"
              className="w-full h-full object-cover"
            />
            {/* Softer gradient overlay - warmer tones */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A7B]/85 via-[#3A6B8F]/75 to-[#E05A2B]/60"></div>
          </div>

          <div className="max-w-[1200px] mx-auto px-7 relative z-10 text-center">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-5 border border-white/30">
              ✦ MTSC Halifax
            </span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-black text-white leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-lg">
              A Welcoming Harbour for <span className="text-[#FFD700]">Seafarers in Halifax</span>
            </h1>
            <p className="text-white/90 text-[18px] max-w-2xl mx-auto leading-relaxed">
              Providing care, support, and a home away from home for seafarers visiting the Port of Halifax
            </p>
          </div>
        </section>

        {/* 1. About the Station */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl font-black text-navy mb-6">About the Station</h2>
                <div className="space-y-5 text-text-mid text-[16px] leading-relaxed">
                  <p>
                    The Mission to Seafarers Halifax exists to support the men and women who arrive in the Port of Halifax after long journeys across the world's oceans.
                  </p>
                  <p>
                    More than <strong>90% of the world's goods are transported by sea</strong>, carried by nearly two million seafarers who spend months away from home to keep supply chains moving.
                  </p>
                  <p>
                    When ships arrive in Halifax, crews often have little time ashore and limited opportunities to connect with the outside world. The Mission to Seafarers Halifax provides a place where seafarers can step away from the demands of ship life, reconnect with family, and receive practical and pastoral support.
                  </p>
                  <p>
                    Rooted in Halifax's maritime community, our centre serves seafarers of all nationalities, cultures, and faiths. While our work is local, we are proud to be part of Mission to Seafarers Canada and the global Mission to Seafarers network, which supports seafarers in ports around the world.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-[24px] overflow-hidden aspect-square md:aspect-[4/5] shadow-warm">
                  <img src={volunteersImg} alt="MTSC Halifax Station Team" className="w-full h-full object-cover" />
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

        {/* 2 & 3. Mission & Vision - Complete Redesign */}
        <section className="relative py-24 overflow-hidden">
          {/* Soft ocean-inspired background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFD] via-[#EBF4F9] to-[#E0EEF7]"></div>
            {/* Subtle wave pattern */}
            <svg className="absolute bottom-0 left-0 w-full h-64 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#112A46" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L0,320Z"></path>
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto px-7 relative z-10">

            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                OUR PURPOSE
              </span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">
                Guided by Mission & Vision
              </h2>
              <p className="text-[#5A6C7D] text-[17px] max-w-2xl mx-auto">
                Our commitment to serving seafarers with compassion and care
              </p>
            </div>

            {/* Changed from items-start to items-stretch for equal heights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

              {/* Mission Card */}
              {/* Added h-full here */}
              <div className="group h-full">
                {/* Added h-full and flex flex-col here */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#112A46]/5 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">

                  {/* Image Header */}
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img
                      src={portHalifaxImg}
                      alt="Port of Halifax"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112A46]/90 via-[#112A46]/50 to-transparent"></div>

                    {/* Floating badge */}
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                        <div className="w-10 h-10 bg-[#E05A2B] rounded-xl flex items-center justify-center">
                          <FaAnchor className="text-white text-lg" />
                        </div>
                        <span className="text-[#112A46] font-extrabold text-[15px]">Our Mission</span>
                      </div>
                    </div>
                  </div>

                  {/* Content - Added flex-grow */}
                  <div className="p-8 md:p-10 flex-grow">
                    <p className="text-[#112A46] text-[18px] leading-relaxed mb-5 font-semibold">
                      To care for and support seafarers visiting the Port of Halifax by offering a welcoming environment where they can rest, communicate with loved ones, and access practical assistance and pastoral care during their time in port.
                    </p>
                    <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6">
                      Through our station ship visits, and outreach services, we strive to ensure that every seafarer who arrives in Halifax feels supported and valued.
                    </p>

                    {/* Key points */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <FaCheckCircle className="text-[#E05A2B] text-xs" />
                        </div>
                        <span className="text-[#112A46] text-[14px] font-medium">Welcoming environment for rest and connection</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <FaCheckCircle className="text-[#E05A2B] text-xs" />
                        </div>
                        <span className="text-[#112A46] text-[14px] font-medium">Practical assistance and pastoral care</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#E05A2B]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <FaCheckCircle className="text-[#E05A2B] text-xs" />
                        </div>
                        <span className="text-[#112A46] text-[14px] font-medium">Ship visits and outreach services</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vision Card */}
              {/* Added h-full here */}
              <div className="group h-full">
                {/* Added h-full and flex flex-col here */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E05A2B]/10 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">

                  {/* Image Header */}
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img
                      src={seafarersOnDeckImg}
                      alt="Seafarers at work"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E05A2B]/90 via-[#E05A2B]/50 to-transparent"></div>

                    {/* Floating badge */}
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg">
                        <div className="w-10 h-10 bg-[#E05A2B] rounded-xl flex items-center justify-center">
                          <FaHeart className="text-white text-lg" />
                        </div>
                        <span className="text-[#112A46] font-extrabold text-[15px]">Our Vision</span>
                      </div>
                    </div>
                  </div>

                  {/* Content - Added flex-grow */}
                  <div className="p-8 md:p-10 flex-grow">
                    <p className="text-[#112A46] text-[20px] leading-snug font-bold mb-6">
                      To be a trusted place of welcome and care for seafarers visiting Halifax, where every crew member arriving in port can find support, connection, and a sense of belonging.
                    </p>

                    {/* Vision pillars */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] rounded-xl p-5 border border-[#112A46]/5 hover:border-[#E05A2B]/20 transition-all">
                        <div className="w-10 h-10 bg-[#E05A2B]/10 rounded-lg flex items-center justify-center mb-3">
                          <FaUsers className="text-[#E05A2B] text-xl" />
                        </div>
                        <h4 className="text-[#112A46] font-bold text-[14px] mb-1">Community</h4>
                        <p className="text-[#5A6C7D] text-[12px]">Building connections</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] rounded-xl p-5 border border-[#112A46]/5 hover:border-[#E05A2B]/20 transition-all">
                        <div className="w-10 h-10 bg-[#E05A2B]/10 rounded-lg flex items-center justify-center mb-3">
                          <FaHandsHelping className="text-[#E05A2B] text-xl" />
                        </div>
                        <h4 className="text-[#112A46] font-bold text-[14px] mb-1">Support</h4>
                        <p className="text-[#5A6C7D] text-[12px]">Always available</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] rounded-xl p-5 border border-[#112A46]/5 hover:border-[#E05A2B]/20 transition-all">
                        <div className="w-10 h-10 bg-[#E05A2B]/10 rounded-lg flex items-center justify-center mb-3">
                          <FaPrayingHands className="text-[#E05A2B] text-xl" />
                        </div>
                        <h4 className="text-[#112A46] font-bold text-[14px] mb-1">Care</h4>
                        <p className="text-[#5A6C7D] text-[12px]">Compassionate service</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#F8FBFD] to-[#EBF4F9] rounded-xl p-5 border border-[#112A46]/5 hover:border-[#E05A2B]/20 transition-all">
                        <div className="w-10 h-10 bg-[#E05A2B]/10 rounded-lg flex items-center justify-center mb-3">
                          <FaShip className="text-[#E05A2B] text-xl" />
                        </div>
                        <h4 className="text-[#112A46] font-bold text-[14px] mb-1">Maritime</h4>
                        <p className="text-[#5A6C7D] text-[12px]">Port-focused mission</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">

            {/* Section Header */}
            <Reveal className="text-center mb-16">
              <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                MEET THE TEAM
              </span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">Our Team</h2>
              <p className="text-[#5A6C7D] text-[17px] max-w-2xl mx-auto leading-relaxed">
                The dedicated staff and volunteers ensuring a warm and hospitable welcome for every seafarer visiting Halifax.
              </p>
            </Reveal>

            {/* Staff Members - Helen & Joseph */}
            <Reveal className="mb-20">
              <h3 className="text-[28px] font-black text-[#112A46] mb-8 text-center">Station Staff</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                {/* Helen Glenn */}
                <div className="bg-gradient-to-br from-[#F8FBFD] to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-[#E05A2B]/20 shadow-lg">
                      <img
                        src={helenImg}
                        alt="Helen Glenn - Station Manager"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <h4 className="text-[24px] font-black text-[#112A46] mb-2">Helen Glenn</h4>
                    <p className="text-[#E05A2B] font-bold uppercase tracking-widest text-[13px] mb-4">Station Manager</p>
                    <p className="text-[#5A6C7D] text-[15px] leading-relaxed">
                      Helen leads the Mission to Seafarers Halifax with compassion and dedication, ensuring every seafarer receives the care and support they need during their time in port.
                    </p>
                  </div>
                </div>

             
                <div className="bg-gradient-to-br from-[#F8FBFD] to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#112A46]/5">
                  <div className="flex flex-col items-center text-center">
                  
                     <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-[#E05A2B]/20 shadow-lg bg-[#EAE6DF] flex items-center justify-center">
                      <img
                        src={josephImg}
                        alt="Joseph - Assistant Manager"
                     
                        className="w-full h-full object-contain scale-[1.2]"
                      />
                    </div>
                    <h4 className="text-[24px] font-black text-[#112A46] mb-2">Joseph</h4>
                    <p className="text-[#E05A2B] font-bold uppercase tracking-widest text-[13px] mb-4">Assistant Manager</p>
                    <p className="text-[#5A6C7D] text-[15px] leading-relaxed">
                      Joseph supports the daily operations of the station, providing essential assistance to seafarers and helping maintain a welcoming environment for all visitors.
                    </p>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Volunteers Section */}
            <Reveal>
              <div className="bg-gradient-to-br from-[#FDF0EC] to-white rounded-3xl p-10 md:p-12 shadow-lg border border-[#E05A2B]/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-[#E05A2B] rounded-xl flex items-center justify-center">
                    <FaUsers className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-[28px] font-black text-[#112A46]">Our Volunteers</h3>
                    <p className="text-[#5A6C7D] text-[14px]">The Heart of Our Mission</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-[#112A46] text-[17px] leading-relaxed mb-5 font-semibold">
                      Our volunteers are the backbone of the Mission to Seafarers Halifax, dedicating their time and energy to ensure every seafarer feels welcomed and supported.
                    </p>
                    <p className="text-[#5A6C7D] text-[16px] leading-relaxed mb-6">
                      From greeting seafarers at the station to organizing transportation, providing companionship, and offering practical assistance, our volunteers make a meaningful difference in the lives of those who spend months at sea.
                    </p>

                    {/* Volunteer Impact Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-5 shadow-md border border-[#E05A2B]/10">
                        <div className="text-[32px] font-black text-[#E05A2B] mb-1">50+</div>
                        <div className="text-[#5A6C7D] text-[13px] font-semibold">Active Volunteers</div>
                      </div>
                      <div className="bg-white rounded-xl p-5 shadow-md border border-[#E05A2B]/10">
                        <div className="text-[32px] font-black text-[#E05A2B] mb-1">1000+</div>
                        <div className="text-[#5A6C7D] text-[13px] font-semibold">Hours Served</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={volunteersImg}
                        alt="Volunteers at MTSC Halifax"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-[#E05A2B] text-white rounded-2xl p-6 shadow-xl">
                      <FaHeart className="text-3xl mb-2" />
                      <strong className="block text-lg font-black">Thank You!</strong>
                      <span className="text-sm font-medium opacity-90">To all our volunteers</span>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-10 text-center">
                  <p className="text-[#112A46] text-[16px] font-semibold mb-4">
                    Interested in volunteering with us?
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#E05A2B] text-white px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#c94d23] transition-all shadow-lg hover:shadow-xl"
                  >
                    <FaHandsHelping />
                    Get Involved
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* OUR VOLUNTEERS CAROUSEL SECTION             */}
        {/* ------------------------------------------- */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#F8FBFD] via-white to-[#FDF0EC]">
          <div className="max-w-[1200px] mx-auto px-7">

            {/* Section Header */}
            <Reveal className="text-center mb-12">
              <span className="inline-block bg-[#E05A2B]/10 text-[#E05A2B] text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                OUR COMMUNITY
              </span>
              <h2 className="text-[clamp(32px,4vw,48px)] font-black text-[#112A46] mb-4">Our Volunteers</h2>
              <p className="text-[#5A6C7D] text-[17px] max-w-2xl mx-auto leading-relaxed">
                Dedicated individuals bringing warmth, compassion, and hospitality to seafarers visiting Halifax
              </p>
            </Reveal>

            {/* Carousel Container */}
            <Reveal delay={100}>
              <div className="relative group">

                {/* Left Arrow Button */}
                <button
                  onClick={scrollVolunteerPrev}
                  className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                  aria-label="Previous Volunteer Photo"
                >
                  <FaChevronLeft className="text-lg pr-1" />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={scrollVolunteerNext}
                  className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95"
                  aria-label="Next Volunteer Photo"
                >
                  <FaChevronRight className="text-lg pl-1" />
                </button>

                {/* Carousel Track */}
                <div
                  ref={volunteerCarouselRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-4 px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    div::-webkit-scrollbar { display: none; }
                  `}} />

                  {volunteersGallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-3xl shadow-xl shrink-0 snap-center sm:snap-start
                                 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group/card"
                    >
                      {/* The Image */}
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#112A46]/5">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                          draggable="false"
                        />
                      </div>

                      {/* Overlay with Title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#112A46]/80 via-transparent to-transparent flex items-end p-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                          <h3 className="text-[#112A46] font-bold text-[15px]">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Bottom Message */}
            <Reveal delay={200} className="mt-12 text-center">
              <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-[#E05A2B]/10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FaHeart className="text-[#E05A2B] text-2xl" />
                  <h3 className="text-[#112A46] font-black text-[20px]">Gratitude & Appreciation</h3>
                </div>
                <p className="text-[#5A6C7D] text-[17px] leading-relaxed italic">
                  "We are grateful for their leadership and continued commitment to the welfare of seafarers."
                </p>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ------------------------------------------- */}
        {/* CAROUSEL SECTION (AMENITIES)                */}
        {/* ------------------------------------------- */}
        <section className="py-24 text-navy-dark bg-warm-gray border-y border-white/10 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-7">

            {/* Header */}
            <Reveal className="mb-12 text-center md:text-left">
              <div className="max-w-2xl mx-auto md:mx-0">
                <span className="inline-block bg-white/10 text-coral-light text-[13px] font-extrabold tracking-wide px-4 py-1.5 rounded-full mb-4">
                  OUR FACILITIES
                </span>
                <h2 className="text-[36px] font-black mb-4 leading-tight">Comfort & Care for Seafarers</h2>
                <p className="text-text-mid  text-[16px] leading-relaxed">
                  We offer a variety of amenities designed to provide a relaxing and welcoming environment for seafarers arriving in the Port of Halifax.
                </p>
              </div>
            </Reveal>

            {/* Carousel Container */}
            <Reveal delay={100}>
              <div className="relative group">

                {/* Left Arrow Button */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-coral text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-navy transition-all hover:scale-110 active:scale-95"
                  aria-label="Previous Facility"
                >
                  <FaChevronLeft className="text-lg pr-1" />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={scrollNext}
                  className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-coral text-white shadow-xl flex items-center justify-center hover:bg-white hover:text-navy transition-all hover:scale-110 active:scale-95"
                  aria-label="Next Facility"
                >
                  <FaChevronRight className="text-lg pl-1" />
                </button>

                {/* Carousel Track */}
                <div
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-4 px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style dangerouslySetInnerHTML={{
                    __html: `
                    div::-webkit-scrollbar { display: none; }
                  `}} />

                  {amenitiesGallery.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex flex-col overflow-hidden rounded-2xl bg-navy border border-white/10 shadow-lg shrink-0 snap-center sm:snap-start
                                 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                      {/* The Image (No dark filter) */}
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          draggable="false"
                        />
                      </div>

                      {/* Card Content (Title placed below the image) */}
                      <div className="p-5 text-center flex-grow flex items-center justify-center">
                        <h3 className="text-white font-bold text-[18px] leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
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

export default About;