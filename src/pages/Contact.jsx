import React, { useState, useRef, useEffect } from "react";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Mailbox, CheckCircle2, AlertCircle, User } from "lucide-react";

import centerImage from '../assets/MtS Halifax Center.jpg';

const interests = [
  "Seafarer support",
  "Volunteering",
  "Donating goods or services",
  "Local partnership",
  "Clothing ",
  "Media inquiry",
  "Other"
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // This handles the iframe finishing its load (meaning Google received the data)
  const handleIframeLoad = () => {
    if (isSubmitting) {
      setIsSuccess(true);
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();
      }
      // Auto-hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  // Reusable Tailwind classes mimicking the standard UI
  const inputClasses = "mt-1.5 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#112A46] font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E05A2B]/50 focus:border-[#E05A2B] disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
  const labelClasses = "text-sm font-medium leading-none text-[#112A46] peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#272d46] min-h-[45vh] flex items-center justify-center border-b border-[#0a1a2c]">
          {/* Background Image & Overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src={centerImage}
              alt="Contact Background"
              className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#233373] via-[#233373]/70 to-[#233373]/40" /> */}
          </div>

          {/* Hero Content */}
          <div className="w-full max-w-[1200px] mx-auto relative z-10 text-center px-6">
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05A2B]/20 text-[#f48c6f] text-xs font-extrabold uppercase tracking-widest border border-[#E05A2B]/30">
                <Mail className="w-4 h-4 text-[#f48c6f]" /> Contact
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Contact Mission to Seafarers Halifax
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-3xl mx-auto">
              We would love to hear from you.
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="w-full max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-10 items-start px-6">

            {/* Contact info (Left Column) */}
            <div className="lg:col-span-5 space-y-5">

              {/* Blue Gradient Box */}
              <div className="rounded-2xl bg-gradient-hero text-white p-7 md:p-8 shadow-soft">
                <h2 className="text-2xl font-extrabold !text-white">Halifax Station</h2>
                <p className="mt-2 text-white/85 text-sm">Location: 844 Marginal Road, Halifax, Nova Scotia ,</p>

                <ul className="mt-7 space-y-4 text-sm">
                  <li className="flex gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                      <MapPin className="h-4 w-4 text-[#f48c6f]" />
                    </span>
                    <span>
                      <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Civic Address</span>
                      844 Marginal Road, Halifax, Nova Scotia , B3H0A1<br />
                      <span className="text-white/80 text-xs">Situated across from Pier 24 in the Halifax Seaport area.</span>
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                      <Mailbox className="h-4 w-4 text-[#f48c6f]" />
                    </span>
                    <span>
                      <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Mailing Address</span>
                      P.O. Box 27114, Halifax, NS B3H 4M8
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                      <Mail className="h-4 w-4 text-[#f48c6f]" />
                    </span>
                    <span className="break-all">
                      <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Email</span>
                      <a href="mailto:hglenn@missiontoseafarershalifax.ca" className="text-white hover:text-[#f48c6f] transition-colors underline">
                        hglenn@missiontoseafarershalifax.ca
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                      <Phone className="h-4 w-4 text-[#f48c6f]" />
                    </span>
                    <span>
                      <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Telephone</span>
                      <a href="tel:+19024227790" className="text-white hover:text-[#f48c6f] transition-colors underline">
                        +1 902-422-7790
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                      <MessageCircle className="h-4 w-4 text-[#f48c6f]" />
                    </span>
                    <span>
                      <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">WhatsApp / Mobile</span>
                      <a href="https://wa.me/19024561658" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#f48c6f] transition-colors underline">
                        +1 902-456-1658
                      </a>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Hours Box */}
              <div className="rounded-2xl border bg-warm-gray-contact p-6 text-sm text-text-mid leading-relaxed">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-[#E05A2B]" />
                  <h3 className="text-base font-extrabold text-[#112A46]">General Station Hours</h3>
                </div>
                <p className="mb-4 font-medium">
                  Hours may vary depending on ship arrivals, vessel schedules, and volunteer availability.
                </p>
                <ul className="space-y-2 mb-4 font-medium">
                  <li className="flex items-start justify-between gap-3 py-2">
                    <span className="text-[#112A46] font-medium min-w-[80px]">
                      Sunday
                    </span>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                        Generally Closed
                      </span>

                      <span className="max-w-[240px] text-xs leading-relaxed text-gray-500">
                        Hours may occasionally change depending on ship schedules at port.
                      </span>
                    </div>
                  </li>
                </ul>
                <p className="text-xs italic text-gray-500">
                  Ship visits and seafarer support may still occur outside regular station hours.
                </p>
              </div>

              {/* Emergency & Direct Contact Box */}
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-gray-800 leading-relaxed shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h3 className="text-base font-extrabold text-red-700">Need Urgent Assistance?</h3>
                </div>
                <p className="mb-5 font-medium text-red-900/80">
                  Contact us directly by phone or WhatsApp for immediate support.
                </p>

                <div className="space-y-4">
                  <a href="tel:+19024227790" className="flex items-center justify-center gap-2 w-full bg-white border border-red-200 text-red-700 font-bold py-3.5 px-4 rounded-xl shadow-sm hover:bg-red-100 transition-colors">
                    <Phone className="h-5 w-5" /> Main Station: +1 902-422-7790
                  </a>

                  <div className="space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-red-100 shadow-sm">
                      <div className="font-bold text-[#112A46] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-[#E05A2B]" /> Helen Glenn, Station Manager
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a href="https://wa.me/19024561658" className="flex items-center justify-center gap-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-bold py-2.5 rounded-lg transition-colors text-xs">
                          <MessageCircle className="h-4 w-4" /> +1 902-456-1658
                        </a>
                        <a href="mailto:hglenn@missiontoseafarershalifax.ca" className="flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold py-2.5 rounded-lg transition-colors text-xs truncate px-2">
                          <Mail className="h-4 w-4 shrink-0" /> Email
                        </a>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-red-100 shadow-sm">
                      <div className="font-bold text-[#112A46] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-[#E05A2B]" /> Joseph Loot, Assistant Manager
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a href="https://wa.me/19029893388" className="flex items-center justify-center gap-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-bold py-2.5 rounded-lg transition-colors text-xs">
                          <MessageCircle className="h-4 w-4" /> +1 902-989-3388
                        </a>
                        <a href="mailto:jloot@missiontoseafarershalifax.ca" className="flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold py-2.5 rounded-lg transition-colors text-xs truncate px-2">
                          <Mail className="h-4 w-4 shrink-0" /> Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form wrapper (Right Column) */}
            <div className="lg:col-span-7  rounded-2xl bg-[#f9fafb] border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgba(17,42,70,.05)] space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Send className="h-6 w-6 text-[#E05A2B]" />
                <h2 className="text-xl md:text-3xl font-extrabold text-[#112A46]">Send Us a Message</h2>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed pb-4 border-b border-gray-200">
                Whether you are a seafarer, volunteer, supporter, donor, or community partner, we welcome your questions and inquiries.
              </p>

              {/* Success Message Banner */}
              {isSuccess && (
                <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 mb-4 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm font-medium">
                    Your inquiry has been successfully sent. We will be in touch with you shortly.
                  </p>
                </div>
              )}

              {/* Hidden iframe triggers handleIframeLoad when Google Form finishes processing */}
              <iframe
                name="hidden_iframe"
                id="hidden_iframe"
                style={{ display: 'none' }}
                onLoad={handleIframeLoad}
              ></iframe>

              <form
                ref={formRef}
                className="space-y-5"
                action="https://docs.google.com/forms/d/e/1FAIpQLSdDRLf8Fjde4Y-q1oUmoa_5JAbmAFp5TeG0RV3qjyVL3Aabhg/formResponse"
                method="POST"
                target="hidden_iframe"
                onSubmit={() => setIsSubmitting(true)}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cname" className={labelClasses}>Name *</label>
                    <input
                      id="cname"
                      name="entry.2050372848"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="cemail" className={labelClasses}>Email *</label>
                    <input
                      id="cemail"
                      type="email"
                      name="entry.608487628"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="cphone" className={labelClasses}>Phone</label>
                    <input
                      id="cphone"
                      type="tel"
                      name="entry.278774456"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="cinterest" className={labelClasses}>I am interested in: *</label>
                    <select
                      id="cinterest"
                      name="entry.1990273286"
                      required
                      defaultValue=""
                      className={inputClasses}
                    >
                      <option value="" className="cursor-pointer" disabled>Select an option...</option>
                      {interests.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cmessage" className={labelClasses}>Message *</label>
                    <textarea
                      id="cmessage"
                      name="entry.1454859148"
                      required
                      rows={5}
                      className="mt-1.5 flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#112A46] font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E05A2B]/50 focus:ring-offset-0 focus:border-[#E05A2B] resize-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center cursor-pointer justify-center w-full bg-[#E05A2B] hover:bg-[#c94d22] text-white font-bold shadow-lg h-12 rounded-md text-base transition-colors focus:outline-none focus:ring-2 focus:ring-[#E05A2B]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>

          </div>

          <div className="w-full max-w-[800px] mx-auto px-6 mt-16 text-center text-sm font-medium text-gray-500">
            <p>
              Mission to Seafarers Halifax operates as part of Mission to Seafarers Canada.<br className="hidden md:block" /> Local volunteer opportunities, station engagement, seafarer support, and community partnerships are coordinated through the Halifax station.
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[450px] bg-gray-200 relative border-t border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.293424683058!2d-63.56860368425113!3d44.6318359790998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a223631f45025%3A0xc47eeb09f06a0302!2s844%20Marginal%20Rd%2C%20Halifax%2C%20NS%20B3H%202P7%2C%20Canada!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mission to Seafarers Halifax Map"
            className="absolute inset-0 grayscale-[20%] contrast-125"
          ></iframe>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;