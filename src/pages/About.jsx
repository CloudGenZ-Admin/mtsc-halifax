import { useState, useRef, useEffect, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { FaCheckCircle, FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';

import { useMtscWhoWeAreLive } from '../hooks/usePayloadLive';
import { getMediaUrl } from '../services/payloadApi';

// Import newly added forms
import { Modal, VolunteerForm } from '../components/forms/WaysToGiveForms';

// Helper component to safely render CMS text without any fallback overrides
const RenderCmsContent = ({ content }) => {
  if (content !== undefined && content !== null) {
    if (typeof content === 'string') {
      return content ? <p className="whitespace-pre-line">{content}</p> : null;
    }
    if (Array.isArray(content)) {
      return (
        <>
          {content.map((item, idx) => {
            const val = typeof item === 'string' ? item : (item?.text || '');
            return val ? <p key={idx}>{val}</p> : null;
          })}
        </>
      );
    }
  }
  return null;
};

import LoadingSpinner from '../components/common/LoadingSpinner';

function About() {
  const { data, isLoading } = useMtscWhoWeAreLive();
  const [activeModal, setActiveModal] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your application has been successfully submitted.");
    setActiveModal(null);
  };

  // Dynamic Media URLs from CMS
  const heroImageUrl = getMediaUrl(data?.hero_image, null);
  const leader1ImageUrl = getMediaUrl(data?.leader_1_image, null);
  const leader2ImageUrl = getMediaUrl(data?.leader_2_image, null);

  // Resolved Timeline History Blocks (Strict CMS only)
  const historyBlocks = useMemo(() => {
    if (Array.isArray(data?.history_blocks) && data.history_blocks.length > 0) {
      return data.history_blocks.map((block) => ({
        era: block.era || "",
        title: block.title || "",
        content: block.content || "",
        img: getMediaUrl(block.image, null)
      }));
    }
    return [];
  }, [data?.history_blocks]);

  // Resolved Volunteers Gallery (Strict CMS only)
  const volunteersGallery = useMemo(() => {
    if (Array.isArray(data?.volunteers_gallery) && data.volunteers_gallery.length > 0) {
      return data.volunteers_gallery.map((item, idx) => {
        const imgUrl = getMediaUrl(item?.image || item, null);
        if (!imgUrl) return null;
        return {
          id: `cms-vol-${idx}`,
          img: imgUrl,
          title: item.image_caption || ""
        };
      }).filter(Boolean);
    }
    return [];
  }, [data?.volunteers_gallery]);

  // Resolved Amenities Gallery (Strict CMS only)
  const amenitiesGallery = useMemo(() => {
    if (Array.isArray(data?.amenities_gallery) && data.amenities_gallery.length > 0) {
      return data.amenities_gallery.map((item, idx) => {
        const imgUrl = getMediaUrl(item?.image || item, null);
        if (!imgUrl) return null;
        return {
          id: `cms-amenity-${idx}`,
          img: imgUrl,
          title: item.title || ""
        };
      }).filter(Boolean);
    }
    return [];
  }, [data?.amenities_gallery]);

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

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      {/* Volunteer Modal */}
      <Modal
        isOpen={activeModal === 'volunteer'}
        onClose={() => setActiveModal(null)}
        title="Volunteer Application"
      >
        <VolunteerForm onSubmit={handleFormSubmit} />
      </Modal>

      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-[#112A46] min-h-[30vh] flex items-center justify-center border-b border-[#0a1a2c]">
          {heroImageUrl && (
            <div className="absolute inset-0 z-0">
              <img
                src={heroImageUrl}
                alt={data?.hero_title || "About Mission to Seafarers Halifax"}
                className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
              />
            </div>
          )}

          <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 text-center">
            {data?.hero_eyebrow && (
              <span className="inline-block text-[#E05A2B] font-bold tracking-widest uppercase text-sm mb-4">
                {data.hero_eyebrow}
              </span>
            )}
            {data?.hero_title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto mb-6">
                {data.hero_title}
              </h1>
            )}
            {data?.hero_subtitle && (
              <div className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-3xl mx-auto [&>p]:m-0">
                <RenderCmsContent content={data.hero_subtitle} />
              </div>
            )}
          </div>
        </section>

        {/* History Timeline Section */}
        <section className="py-24 bg-[#F8FBFD] overflow-hidden">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            {(data?.story_eyebrow || data?.story_title || data?.story_description) && (
              <div className="max-w-3xl mx-auto text-center mb-20">
                {data?.story_eyebrow && (
                  <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">
                    {data.story_eyebrow}
                  </span>
                )}
                {data?.story_title && (
                  <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#112A46] leading-tight">
                    {data.story_title}
                  </h2>
                )}
                {data?.story_description && (
                  <div className="mt-6 text-gray-600 text-sm leading-relaxed font-medium space-y-4 [&>p]:m-0 [&>p+p]:mt-4">
                    <RenderCmsContent content={data.story_description} />
                  </div>
                )}
              </div>
            )}

            {historyBlocks.length > 0 && (
              <div className="space-y-20 md:space-y-32 relative max-w-6xl mx-auto">
                <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#E05A2B]/20 -translate-x-1/2"></div>

                {historyBlocks.map((block, idx) => (
                  <Reveal key={idx}>
                    <div className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#E05A2B] items-center justify-center z-10 shadow-md">
                        <div className="w-3 h-3 bg-[#E05A2B] rounded-full"></div>
                      </div>

                      {block.img && (
                        <div className="w-full md:w-1/2 relative group">
                          <div className="aspect-[3/3] rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border-4 border-white">
                            <img
                              src={block.img}
                              alt={block.title || "Story Image"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          {block.era && (
                            <div className={`absolute top-8 ${idx % 2 !== 0 ? '-left-8' : '-right-8'} bg-[#112A46] text-white px-8 py-3 rounded-xl shadow-xl z-20 hidden md:block transform transition-transform group-hover:-translate-y-2`}>
                              <span className="text-lg font-bold tracking-wider uppercase">{block.era}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="w-full md:w-1/2 space-y-6 bg-white md:bg-transparent p-8 md:p-0 rounded-3xl shadow-sm md:shadow-none border border-gray-100 md:border-none relative z-10">
                        {block.era && (
                          <div className="md:hidden inline-block bg-[#E05A2B] text-white px-4 py-2 rounded-lg text-sm font-bold mb-2 uppercase">
                            {block.era}
                          </div>
                        )}

                        {block.title && (
                          <h3 className="text-2xl md:text-3xl font-extrabold text-[#112A46]">{block.title}</h3>
                        )}

                        {block.content && (
                          <div className="text-gray-600 text-[16px] leading-relaxed space-y-4 font-medium [&>p]:m-0 [&>p+p]:mt-4">
                            <RenderCmsContent content={block.content} />
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Supporting Seafarers Today */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                {data?.impact_eyebrow && (
                  <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">
                    {data.impact_eyebrow}
                  </span>
                )}
                {data?.impact_title && (
                  <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#112A46] leading-tight mb-6">
                    {data.impact_title}
                  </h2>
                )}
                {data?.impact_description && (
                  <div className="text-gray-600 text-[16px] leading-relaxed font-medium mb-6 space-y-4 [&>p]:m-0">
                    <RenderCmsContent content={data.impact_description} />
                  </div>
                )}

                {Array.isArray(data?.services_list) && data.services_list.length > 0 && (
                  <>
                    <p className="text-[#112A46] font-bold text-lg mb-6">Our services include:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {data.services_list.map((service, index) => {
                        const serviceText = service.service_text || service;
                        return (
                          <div key={index} className="flex items-start gap-3">
                            <FaCheckCircle className="text-[#E05A2B] text-[16px] mt-0.5 shrink-0" />
                            <span className="text-gray-700 text-[15px] font-semibold">{serviceText}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </Reveal>

              {(data?.looking_ahead_title || data?.looking_ahead_paragraphs || data?.looking_ahead_quote) && (
                <Reveal delay={100}>
                  <div className="bg-[#112A46] p-10 rounded-3xl text-white shadow-xl">
                    {data?.looking_ahead_title && (
                      <h3 className="text-2xl font-extrabold mb-4">{data.looking_ahead_title}</h3>
                    )}
                    {data?.looking_ahead_paragraphs && (
                      <div className="text-white/80 leading-relaxed mb-6 space-y-4 [&>p]:m-0 [&>p+p]:mt-4">
                        <RenderCmsContent content={data.looking_ahead_paragraphs} />
                      </div>
                    )}
                    {data?.looking_ahead_quote && (
                      <div className="text-[#f48c6f] font-bold italic space-y-2 [&>p]:m-0">
                        <RenderCmsContent content={data.looking_ahead_quote} />
                      </div>
                    )}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="w-full max-w-[1200px] px-6 mx-auto">
            {(data?.team_eyebrow || data?.team_title || data?.team_description) && (
              <div className="text-center mb-16">
                {data?.team_eyebrow && (
                  <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">
                    {data.team_eyebrow}
                  </span>
                )}
                {data?.team_title && (
                  <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-[#112A46] leading-tight">
                    {data.team_title}
                  </h2>
                )}
                {data?.team_description && (
                  <div className="text-gray-600 max-w-3xl mx-auto mt-4 text-sm leading-relaxed space-y-4 [&>p]:m-0">
                    <RenderCmsContent content={data.team_description} />
                  </div>
                )}
              </div>
            )}

            {/* Featured Leader - Leader 1 */}
            {(data?.leader_1_name || data?.leader_1_role || data?.leader_1_bio || leader1ImageUrl) && (
              <Reveal>
                <div className="grid lg:grid-cols-12 gap-12 items-center mb-12 bg-[#F8FBFD] border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
                  {leader1ImageUrl && (
                    <div className="lg:col-span-5 flex justify-center">
                      <img
                        src={leader1ImageUrl}
                        alt={data?.leader_1_name || "Leader Photo"}
                        className="w-full max-w-sm rounded-full shadow-md object-cover aspect-square object-top border-4 border-white"
                      />
                    </div>
                  )}
                  <div className={leader1ImageUrl ? "lg:col-span-7" : "lg:col-span-12 text-center"}>
                    {data?.leader_1_role && (
                      <h2 className="text-2xl md:text-3xl font-extrabold text-[#112A46] leading-tight">
                        {data.leader_1_role}
                      </h2>
                    )}
                    {data?.leader_1_name && (
                      <h3 className="mt-4 text-lg font-bold text-[#E05A2B] uppercase tracking-wider">
                        {data.leader_1_name}
                      </h3>
                    )}
                    {data?.leader_1_bio && (
                      <div className="mt-6 space-y-4 text-base md:text-lg text-gray-600 leading-relaxed [&>p]:m-0 [&>p+p]:mt-4">
                        <RenderCmsContent content={data.leader_1_bio} />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Additional Team Member - Leader 2 & Volunteer Card */}
            <Reveal delay={100}>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {(data?.leader_2_name || data?.leader_2_role || data?.leader_2_bio || leader2ImageUrl) && (
                  <div className="flex flex-col items-center text-center bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-md transition-shadow">
                    {leader2ImageUrl && (
                      <div className="w-40 h-40 mx-auto rounded-full shadow-md mb-6 overflow-hidden border-4 border-white flex justify-center items-center bg-[#DCD2B9]">
                        <img
                          src={leader2ImageUrl}
                          alt={data?.leader_2_name || "Assistant Manager"}
                          className="w-[98%] max-w-none h-auto"
                        />
                      </div>
                    )}
                    {data?.leader_2_name && <h3 className="text-2xl font-bold text-[#112A46]">{data.leader_2_name}</h3>}
                    {data?.leader_2_role && <p className="text-[#E05A2B] font-bold uppercase text-sm mt-2 mb-4 tracking-wider">{data.leader_2_role}</p>}
                    {data?.leader_2_bio && (
                      <div className="text-gray-600 leading-relaxed font-medium space-y-2 [&>p]:m-0">
                        <RenderCmsContent content={data.leader_2_bio} />
                      </div>
                    )}
                  </div>
                )}

                {(data?.volunteers_card_title || data?.volunteers_card_description || data?.volunteers_active_count || data?.volunteers_hours_count) && (
                  <div className="flex flex-col items-center text-center bg-gradient-to-br from-[#112A46] to-[#1a3a5f] text-white rounded-3xl p-10 shadow-lg">
                    <div className="w-20 h-20 bg-[#E05A2B] rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <FaHeart className="text-white text-3xl" />
                    </div>
                    {data?.volunteers_card_title && <h3 className="text-2xl font-bold text-white mb-4">{data.volunteers_card_title}</h3>}
                    {data?.volunteers_card_description && (
                      <div className="text-white/80 leading-relaxed font-medium mb-6 [&>p]:m-0">
                        <RenderCmsContent content={data.volunteers_card_description} />
                      </div>
                    )}
                    {(data?.volunteers_active_count || data?.volunteers_hours_count) && (
                      <div className="flex justify-center gap-8 w-full mt-auto border-t border-white/20 pt-6">
                        {data?.volunteers_active_count && (
                          <div>
                            <div className="text-3xl font-black text-coral">{data.volunteers_active_count}</div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">Active<br />Volunteers</div>
                          </div>
                        )}
                        {data?.volunteers_hours_count && (
                          <div>
                            <div className="text-3xl font-black text-coral">{data.volunteers_hours_count}</div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-white/70">Hours<br />Served</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CAROUSEL SECTION: VOLUNTEERS */}
        {(data?.gallery_section_title || data?.gallery_section_description || volunteersGallery.length > 0) && (
          <section className="py-20 bg-[#F8FBFD] border-y border-gray-100 overflow-hidden">
            <div className="w-full max-w-[1200px] px-6 mx-auto">
              <Reveal className="text-center mb-12">
                {data?.gallery_section_title && (
                  <h2 className="mt-4 text-[32px] md:text-4xl font-extrabold text-[#112A46] mb-6">
                    {data.gallery_section_title}
                  </h2>
                )}
                {data?.gallery_section_description && (
                  <div className="text-gray-600 text-[16px] max-w-3xl mx-auto leading-relaxed font-medium space-y-4 [&>p]:m-0 [&>p+p]:mt-4">
                    <RenderCmsContent content={data.gallery_section_description} />
                  </div>
                )}
              </Reveal>

              {volunteersGallery.length > 0 && (
                <Reveal delay={100}>
                  <div className="relative group">
                    <button
                      onClick={scrollVolunteerPrev}
                      className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <FaChevronLeft className="text-lg pr-1" />
                    </button>
                    <button
                      onClick={scrollVolunteerNext}
                      className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95 cursor-pointer"
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
                            <img src={item.img} alt={item.title || "Volunteer"} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" draggable="false" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              <Reveal delay={200} className="mt-16">
                <div className="text-center max-w-4xl mx-auto space-y-12">
                  {data?.community_care_description && (
                    <div className="text-gray-600 text-[16px] leading-relaxed font-medium space-y-4 [&>p]:m-0 [&>p+p]:mt-4">
                      <RenderCmsContent content={data.community_care_description} />
                    </div>
                  )}

                  {(data?.community_care_title || data?.community_care_subtext) && (
                    <div>
                      {data?.community_care_title && <h3 className="text-2xl md:text-3xl font-extrabold text-[#112A46] mb-4">{data.community_care_title}</h3>}
                      {data?.community_care_subtext && (
                        <div className="text-gray-600 text-[16px] leading-relaxed font-medium max-w-3xl mx-auto space-y-4 [&>p]:m-0">
                          <RenderCmsContent content={data.community_care_subtext} />
                        </div>
                      )}
                    </div>
                  )}

                  {(data?.stat_box_1_number || data?.stat_box_2_number) && (
                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                      {data?.stat_box_1_number && (
                        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                          <div className="text-4xl font-extrabold text-[#E05A2B] mb-2">{data.stat_box_1_number}</div>
                          {data?.stat_box_1_label && <div className="text-lg font-bold text-[#112A46] uppercase tracking-wider mb-2">{data.stat_box_1_label}</div>}
                          {data?.stat_box_1_desc && (
                            <div className="text-gray-600 text-sm font-medium [&>p]:m-0">
                              <RenderCmsContent content={data.stat_box_1_desc} />
                            </div>
                          )}
                        </div>
                      )}
                      {data?.stat_box_2_number && (
                        <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                          <div className="text-4xl font-extrabold text-[#E05A2B] mb-2">{data.stat_box_2_number}</div>
                          {data?.stat_box_2_label && <div className="text-lg font-bold text-[#112A46] uppercase tracking-wider mb-2">{data.stat_box_2_label}</div>}
                          {data?.stat_box_2_desc && (
                            <div className="text-gray-600 text-sm font-medium [&>p]:m-0">
                              <RenderCmsContent content={data.stat_box_2_desc} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {(data?.thank_you_title || data?.volunteer_cta_title) && (
                    <div className="bg-[#112A46] p-10 md:p-14 rounded-3xl shadow-xl text-left text-white max-w-3xl mx-auto">
                      {data?.thank_you_title && <h3 className="text-2xl font-extrabold mb-4 text-[#E05A2B]">{data.thank_you_title}</h3>}
                      {data?.thank_you_text && (
                        <div className="text-white/80 leading-relaxed font-medium mb-8 space-y-4 [&>p]:m-0">
                          <RenderCmsContent content={data.thank_you_text} />
                        </div>
                      )}

                      {data?.volunteer_cta_title && <h3 className="text-2xl font-extrabold mb-4 text-[#E05A2B]">{data.volunteer_cta_title}</h3>}
                      {data?.volunteer_cta_text && (
                        <div className="text-white/80 leading-relaxed font-medium mb-6 space-y-4 [&>p]:m-0">
                          <RenderCmsContent content={data.volunteer_cta_text} />
                        </div>
                      )}

                      {(data?.volunteer_button_text || true) && (
                        <button
                          onClick={() => setActiveModal('volunteer')}
                          className="inline-flex cursor-pointer items-center justify-center bg-[#E05A2B] hover:bg-[#c94d22] text-white font-bold shadow-lg h-12 px-8 rounded-full text-[15px] transition-colors"
                        >
                          {data?.volunteer_button_text || "Volunteer Application"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>

            </div>
          </section>
        )}

        {/* CAROUSEL SECTION: AMENITIES */}
        {(data?.facilities_eyebrow || data?.facilities_title || amenitiesGallery.length > 0) && (
          <section className="py-20 bg-white overflow-hidden">
            <div className="w-full max-w-[1200px] px-6 mx-auto">
              <Reveal className="text-center mb-12">
                {data?.facilities_eyebrow && (
                  <span className="text-[#E05A2B] font-bold tracking-widest uppercase text-sm">
                    {data.facilities_eyebrow}
                  </span>
                )}
                {data?.facilities_title && (
                  <h2 className="mt-4 text-[32px] md:text-4xl font-extrabold text-[#112A46] mb-4">
                    {data.facilities_title}
                  </h2>
                )}
                {data?.facilities_description && (
                  <div className="text-gray-600 text-[16px] max-w-2xl mx-auto leading-relaxed font-medium space-y-4 [&>p]:m-0">
                    <RenderCmsContent content={data.facilities_description} />
                  </div>
                )}
              </Reveal>

              {amenitiesGallery.length > 0 && (
                <Reveal delay={100}>
                  <div className="relative group">
                    <button
                      onClick={scrollPrev}
                      className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <FaChevronLeft className="text-lg pr-1" />
                    </button>
                    <button
                      onClick={scrollNext}
                      className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#E05A2B] text-white shadow-xl flex items-center justify-center hover:bg-[#112A46] transition-all hover:scale-110 active:scale-95 cursor-pointer"
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
                          className="relative flex flex-col overflow-hidden rounded-3xl bg-[#112A46] border border-gray-100 shadow-md shrink-0 snap-center sm:snap-start w-[75%] sm:w-[calc(45%-12px)] lg:w-[calc(30%-16px)]"
                        >
                          <div className="relative w-full aspect-[5/4] overflow-hidden bg-[#112A46]">
                            <img 
                              src={item.img} 
                              alt={item.title || "Amenity"} 
                              className="absolute inset-0 w-full h-full object-cover object-center" 
                              draggable="false" 
                            />
                          </div>
                          {item.title && (
                            <div className="p-5 text-center flex-grow flex items-center justify-center min-h-[80px]">
                              <h3 className="text-white font-bold text-[15px] leading-tight">{item.title}</h3>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* How the structure works */}
        {(data?.structure_title || data?.canada_card_title || data?.halifax_card_title) && (
          <section className="py-20 md:py-28 bg-[#F8FBFD] border-t border-gray-200">
            <div className="w-full max-w-[1200px] px-6 mx-auto">
              <div className="text-center max-w-3xl mx-auto">
                {data?.structure_title && (
                  <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#112A46] leading-tight">
                    {data.structure_title}
                  </h2>
                )}
                {data?.structure_subtitle && (
                  <p className="mt-2 text-gray-600 text-[14px] max-w-2xl mx-auto leading-relaxed font-medium">
                    {data.structure_subtitle}
                  </p>
                )}
              </div>

              <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
                {(data?.canada_card_title || data?.canada_card_text) && (
                  <div className="rounded-3xl bg-white border border-gray-100 p-10 shadow-sm hover:shadow-lg transition-all text-center">
                    <div className="text-gray-600 leading-relaxed font-medium text-lg [&>p]:m-0">
                      {data?.canada_card_title && (
                        <strong className="text-[#112A46] block text-2xl mb-4 font-extrabold">
                          {data.canada_card_title}
                        </strong>
                      )}
                      <RenderCmsContent content={data?.canada_card_text} />
                    </div>
                  </div>
                )}
                {(data?.halifax_card_title || data?.halifax_card_text) && (
                  <div className="rounded-3xl bg-white border border-gray-100 p-10 shadow-sm hover:shadow-lg transition-all text-center">
                    <div className="text-gray-600 leading-relaxed font-medium text-lg [&>p]:m-0">
                      {data?.halifax_card_title && (
                        <strong className="text-[#112A46] block text-2xl mb-4 font-extrabold">
                          {data.halifax_card_title}
                        </strong>
                      )}
                      <RenderCmsContent content={data?.halifax_card_text} />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 max-w-3xl mx-auto text-center">
                {data?.structure_footer_quote && (
                  <div className="text-xl font-bold text-[#E05A2B] leading-relaxed italic mb-8 [&>p]:m-0">
                    <RenderCmsContent content={data.structure_footer_quote} />
                  </div>
                )}
                <button
                  onClick={() => setActiveModal('volunteer')}
                  className="inline-flex cursor-pointer items-center justify-center bg-[#E05A2B] hover:bg-[#c94d22] text-white font-bold shadow-lg h-14 px-8 rounded-md text-lg transition-colors"
                >
                  {data?.structure_button_text || "Become a Volunteer"}
                </button>
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default About;