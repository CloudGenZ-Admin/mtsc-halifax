import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Reveal from '../components/common/Reveal';
import { 
  FaPrayingHands, FaWater, FaCompass, FaGlobe, FaPaperPlane, FaCheckCircle 
} from 'react-icons/fa';

// Import the local image provided (matching your exact spelling)
import prayerImg from '../assets/paryer.jpg';

export default function Prayer() {
  // 1. Form State Management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    prayerRequest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Form Submit Handler (GOOGLE FORM INTEGRATION)
  // 2. Form Submit Handler (GOOGLE FORM INTEGRATION)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Check if emails match
    if (formData.email !== formData.confirmEmail) {
      setErrorMsg("Emails do not match!");
      return;
    }

    setIsSubmitting(true);

    const FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSct44_ZBScaEOzu0v2PAhR3ics7jMPa0dlFfO_4NtarcNZoSA/formResponse";
    
    // ⚠️ CHANGE: Used URLSearchParams instead of FormData
    const data = new URLSearchParams();
    data.append('entry.933573082', formData.firstName);      // First Name
    data.append('entry.851808031', formData.lastName);       // Last Name
    data.append('entry.1643267528', formData.email);         // Email
    data.append('entry.1542329303', formData.prayerRequest); // Prayer Request

    try {
      await fetch(FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          // ⚠️ CHANGE: Added Header for URLSearchParams
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString() // ⚠️ CHANGE: Convert to string
      });
      
      // Success (Note: mode 'no-cors' doesn't return a readable response, 
      // so if fetch doesn't throw a network error, we assume it worked)
      setIsSuccess(true);
      setFormData({
        firstName: '', lastName: '', email: '', confirmEmail: '', prayerRequest: ''
      });
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
          {/* Top Image: Calm ocean sunset */}
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

        {/* Prayers Grid Section */}
        <section className="py-24 bg-warm-gray border-y border-coral/10">
          {/* ... (Your existing prayer grid cards go here exactly as they were) ... */}
          <div className="max-w-[1200px] mx-auto px-7">
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Prayer 1 */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all border-t-4 border-coral relative overflow-hidden group">
                <FaWater className="absolute -bottom-4 -right-4 text-[100px] text-coral-pale opacity-50 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-navy mb-5 leading-tight">Prayer for Seafarers to Find Safe Passage</h3>
                  <p className="text-navy font-bold mb-2">Dear Lord,</p>
                  <p className="text-text-mid text-[15px] leading-relaxed italic">
                    As our seafarers embark on their journeys...
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
                    In the face of tempestuous seas...
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
                    As seafarers navigate the vast expanse...
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
              
              {isSuccess ? (
                // Success State
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <FaCheckCircle className="text-coral text-6xl mb-4" />
                  <h2 className="text-[32px] font-black text-navy mb-3">Prayer Request Received</h2>
                  <p className="text-text-mid text-lg max-w-md">
                    Thank you for reaching out. We will keep your request in our prayers.
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

                    {/* Email Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">Email *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" 
                          placeholder="your@email.com" 
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">Confirm Email *</label>
                        <input 
                          type="email" 
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleChange}
                          required 
                          className="w-full px-5 py-3.5 rounded-xl border-2 border-white bg-white focus:border-coral outline-none transition-colors shadow-sm text-[15px]" 
                          placeholder="your@email.com" 
                        />
                      </div>
                    </div>

                    {/* Prayer Request Textarea */}
                    <div>
                      <label className="block text-[13px] font-bold text-navy mb-2">Submit a Prayer *</label>
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
                      {/* <a href="#" className="w-full sm:w-auto inline-flex justify-center text-center items-center bg-transparent border-2 border-navy text-navy px-8 py-3.5 rounded-full font-bold text-[14px] hover:bg-navy hover:text-white transition-colors">
                        Contact a Chaplain Worldwide
                      </a> */}
                    </div>
                  </form>
                </>
              )}

            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}