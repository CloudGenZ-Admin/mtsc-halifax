import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaPrayingHands, FaGlobe, FaPaperPlane, FaCheckCircle, FaQuoteLeft 
} from 'react-icons/fa';

// Import the local image provided
import prayerImg from '../assets/paryer.jpg';

// Helper function to clean text (removes &quot; and extra quotes)
const formatPrayerText = (text) => {
  if (!text) return '';
  let cleanText = text.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  // Agar API se already quotes aa rahe hain, toh unhe double hone se rokne ke liye
  if (cleanText.startsWith('"') && cleanText.endsWith('"')) {
    cleanText = cleanText.substring(1, cleanText.length - 1);
  }
  return cleanText;
};

export default function Prayer() {
  // Form State Management (Confirm Email Removed)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    prayerRequest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // State: Submitted Prayers List
  const [prayersList, setPrayersList] = useState([]);
  const [expandedPrayers, setExpandedPrayers] = useState({});

  // Fetch Prayers on Component Mount
  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://mediumpurple-giraffe-353804.hostingersite.com/api';
      const response = await fetch(`${API_URL}/prayers/public`);
      if (response.ok) {
        const data = await response.json();
        setPrayersList(data);
      }
    } catch (error) {
      console.error("Failed to fetch prayers:", error);
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form Submit Handler 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://mediumpurple-giraffe-353804.hostingersite.com/api';
      
      const response = await fetch(`${API_URL}/prayers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          prayerRequest: formData.prayerRequest
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit prayer');
      }

      const newPrayer = await response.json();
      
      // Add to top of list
      setPrayersList(prevList => [newPrayer, ...prevList]);
      
      setIsSuccess(true);
      // Reset form
      setFormData({
        firstName: '', lastName: '', prayerRequest: ''
      });
      
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Inner Page Hero with Image */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-navy-dark z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495555687398-3f50fa82fd06?w=1200&q=80')] 
          bg-cover bg-center opacity-30 mix-blend-overlay z-0"></div>
          
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

        {/* Prayer Request Form Section */}
        <section className="pt-24 pb-12 bg-white">
          <div className="max-w-[1000px] mx-auto px-7">
            <Reveal className="bg-coral-pale rounded-[32px] p-8 md:p-14 shadow-card border border-coral/20">
              
              {isSuccess ? (
                // Success State
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <FaCheckCircle className="text-coral text-6xl mb-4" />
                  <h2 className="text-[32px] font-black text-navy mb-3">Prayer Request Received</h2>
                  <p className="text-text-mid text-lg max-w-md">
                    Thank you for reaching out. Your prayer has been added to our community wall below.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-coral font-bold hover:text-coral-light underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                // Form State
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-[32px] font-black text-navy mb-3">Submit a Prayer</h2>
                    <p className="text-text-mid">Send your prayer request to our MtS Halifax Chaplain.</p>
                  </div>

                  {errorMsg && (
                    <div className="max-w-[700px] mx-auto bg-red-50 text-red-600 p-4 rounded-xl text-[14px] mb-6 font-medium border border-red-100 text-center">
                      {errorMsg}
                    </div>
                  )}

                  <form className="space-y-6 max-w-[700px] mx-auto" onSubmit={handleSubmit}>
                    
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">First Name *</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required 
                          className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" 
                          placeholder="First Name" 
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">Last Name *</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required 
                          className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" 
                          placeholder="Last Name" 
                        />
                      </div>
                    </div>

                    {/* Email Field - Full Width */}
                   

                    {/* Prayer Request Textarea */}
                    <div>
                      <label className="block text-[13px] font-bold text-navy mb-2">Your Prayer *</label>
                      <textarea 
                        name="prayerRequest"
                        value={formData.prayerRequest}
                        onChange={handleChange}
                        required 
                        rows="5" 
                        className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px] resize-none" 
                        placeholder="Share your prayer request here..."
                      ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4" id="worldwide-chaplain">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto cursor-pointer inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-extrabold text-[15px] shadow-warm transition-all ${
                          isSubmitting 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : 'bg-coral text-white hover:bg-coral-light hover:shadow-warm-hover'
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : <><FaPaperPlane /> Submit Request</>}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Reveal>
          </div>
        </section>

        {/* PERFECT HEIGHT FIX: Community Prayers Section */}
        <section className="pb-24 pt-12 bg-white">
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-[32px] font-black text-navy mb-3">Community Prayers</h2>
                <p className="text-text-mid max-w-2xl mx-auto">
                  Join us in praying for these seafarers, their families, and our community.
                </p>
              </div>

              {prayersList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prayersList.map((prayer) => {
                    const isExpanded = expandedPrayers[prayer.id];
                    const text = formatPrayerText(prayer.prayerRequest);
                    const isLong = text.length > 200;
                    
                    return (
                    <div key={prayer.id} className="bg-warm-gray rounded-2xl p-7 relative border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                      <FaQuoteLeft className="text-coral/20 text-3xl absolute top-6 right-6" />
                      
                      <div className="flex-grow flex flex-col mb-6 relative z-10">
                        <p className={`text-text-mid text-[15px] leading-relaxed italic break-words ${!isExpanded && isLong ? 'line-clamp-5' : ''}`}>
                          "{text}"
                        </p>
                        {isLong && (
                          <button
                            onClick={() => setExpandedPrayers(prev => ({ ...prev, [prayer.id]: !prev[prayer.id] }))}
                            className="text-coral font-bold text-[13px] mt-2 hover:text-coral-light transition-colors self-start cursor-pointer"
                          >
                            {isExpanded ? 'Read less' : 'Read more'}
                          </button>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 flex justify-between items-center mt-auto">
                        <div>
                          <h4 className="text-navy font-bold text-[14px]">
                            {prayer.firstName} {prayer.lastName?.charAt(0)}.
                          </h4>
                          <p className="text-xs text-gray-500 font-medium">
                            {new Date(prayer.createdAt).toLocaleDateString('en-US', {
                               year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </p>
                        </div>
                        <FaPrayingHands className="text-coral/60 text-xl flex-shrink-0" />
                      </div>
                    </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center bg-gray-50 rounded-2xl p-10 border border-gray-100">
                  <FaPrayingHands className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Be the first to share a prayer request.</p>
                </div>
              )}
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}