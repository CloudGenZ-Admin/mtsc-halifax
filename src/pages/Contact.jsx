import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Mailbox, CheckCircle2, AlertCircle, User } from "lucide-react";

import { useMtscContactLive } from '../hooks/usePayloadLive';
import { getMediaUrl } from '../services/payloadApi';

const defaultInterests = [
  "Seafarer support",
  "Volunteering",
  "Donating goods or services",
  "Local partnership",
  "Clothing ",
  "Media inquiry",
  "Other"
];

// Helper to safely render string values and avoid rendering raw objects as React children
const safeString = (val) => {
  if (!val) return "";
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (typeof val === "object" && val !== null) {
    if (val.option_label) return String(val.option_label);
    if (val.label) return String(val.label);
    if (val.text) return String(val.text);
    if (val.name) return String(val.name);
  }
  return "";
};

import LoadingSpinner from '../components/common/LoadingSpinner';

const Contact = () => {
  const { data, isLoading } = useMtscContactLive();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Resolved Interest Options Array safely extracted as strings
  const interestsList = (Array.isArray(data?.interest_options) && data.interest_options.length > 0)
    ? data.interest_options.map(i => safeString(i)).filter(Boolean)
    : defaultInterests;

  // Resolved Hero Background Image URL from CMS (Zero hardcoded image fallbacks)
  const heroBg = getMediaUrl(data?.hero_bg_image, null);

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSuccess(false);

    if (!recaptchaToken) {
      setErrorMessage('Please complete the reCAPTCHA verification before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current);
      const payload = {
        name: formData.get('name') || formData.get('entry.2050372848'),
        email: formData.get('email') || formData.get('entry.608487628'),
        phone: formData.get('phone') || formData.get('entry.278774456'),
        interest: formData.get('interest') || formData.get('entry.1990273286'),
        message: formData.get('message') || formData.get('entry.1454859148'),
        recaptchaToken: recaptchaToken
      };

      const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${rawApiUrl}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        if (formRef.current) {
          formRef.current.reset();
        }
        setRecaptchaToken('');
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMessage(result.message || 'Form submission failed. Please try again.');
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken('');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setErrorMessage('An error occurred while connecting to the server. Please try again.');
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "mt-1.5 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#112A46] font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E05A2B]/50 focus:border-[#E05A2B] disabled:cursor-not-allowed disabled:opacity-50 transition-colors";
  const labelClasses = "text-sm font-medium leading-none text-[#112A46] peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#272d46] min-h-[45vh] flex items-center justify-center border-b border-[#0a1a2c]">
          {heroBg && (
            <div className="absolute inset-0 z-0">
              <img
                src={heroBg}
                alt="Contact Background"
                className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
              />
            </div>
          )}

          {/* Hero Content */}
          <div className="w-full max-w-[1200px] mx-auto relative z-10 text-center px-6">
            {data?.hero_badge && (
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05A2B]/20 text-[#f48c6f] text-xs font-extrabold uppercase tracking-widest border border-[#E05A2B]/30">
                  <Mail className="w-4 h-4 text-[#f48c6f]" /> {safeString(data.hero_badge)}
                </span>
              </div>
            )}
            {data?.hero_title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                {safeString(data.hero_title)}
              </h1>
            )}
            {data?.hero_subtitle && (
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-3xl mx-auto">
                {safeString(data.hero_subtitle)}
              </p>
            )}
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="w-full max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-10 items-start px-6">

            {/* Contact info (Left Column) */}
            <div className="lg:col-span-5 space-y-5">

              {/* Blue Gradient Box */}
              {(data?.mission_title || data?.civic_address || data?.email_address) && (
                <div className="rounded-2xl bg-gradient-hero text-white p-7 md:p-8 shadow-soft">
                  {data?.mission_title && <h2 className="text-2xl font-extrabold !text-white">{safeString(data.mission_title)}</h2>}
                  {data?.location_subtitle && <p className="mt-2 text-white/85 text-sm">{safeString(data.location_subtitle)}</p>}

                  <ul className="mt-7 space-y-4 text-sm">
                    {data?.civic_address && (
                      <li className="flex gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                          <MapPin className="h-4 w-4 text-[#f48c6f]" />
                        </span>
                        <span>
                          <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Civic Address</span>
                          {safeString(data.civic_address)}<br />
                          {data?.civic_address_note && <span className="text-white/80 text-xs">{safeString(data.civic_address_note)}</span>}
                        </span>
                      </li>
                    )}
                    {data?.mailing_address && (
                      <li className="flex gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                          <Mailbox className="h-4 w-4 text-[#f48c6f]" />
                        </span>
                        <span>
                          <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Mailing Address</span>
                          {safeString(data.mailing_address)}
                        </span>
                      </li>
                    )}
                    {data?.email_address && (
                      <li className="flex gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                          <Mail className="h-4 w-4 text-[#f48c6f]" />
                        </span>
                        <span className="break-all">
                          <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Email</span>
                          <a href={`mailto:${safeString(data.email_address)}`} className="text-white hover:text-[#f48c6f] transition-colors underline">
                            {safeString(data.email_address)}
                          </a>
                        </span>
                      </li>
                    )}
                    {data?.telephone && (
                      <li className="flex gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                          <Phone className="h-4 w-4 text-[#f48c6f]" />
                        </span>
                        <span>
                          <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Telephone</span>
                          <a href={`tel:${safeString(data.telephone).replace(/[^0-9+]/g, '')}`} className="text-white hover:text-[#f48c6f] transition-colors underline">
                            {safeString(data.telephone)}
                          </a>
                        </span>
                      </li>
                    )}
                    {data?.whatsapp_number && (
                      <li className="flex gap-3.5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                          <MessageCircle className="h-4 w-4 text-[#f48c6f]" />
                        </span>
                        <span>
                          <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">WhatsApp / Mobile</span>
                          <a href={safeString(data?.whatsapp_url) || "#"} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#f48c6f] transition-colors underline">
                            {safeString(data.whatsapp_number)}
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Hours Box */}
              {(data?.hours_title || data?.hours_weekday_time) && (
                <div className="rounded-2xl border bg-warm-gray-contact p-6 text-sm text-text-mid leading-relaxed">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-[#E05A2B]" />
                    {data?.hours_title && <h3 className="text-base font-extrabold text-[#112A46]">{safeString(data.hours_title)}</h3>}
                  </div>
                  {data?.hours_note && (
                    <p className="mb-4 font-medium">
                      {safeString(data.hours_note)}
                    </p>
                  )}
                  <ul className="space-y-2 mb-4 font-medium">
                    {/* Monday to Saturday */}
                    {data?.hours_weekday_label && (
                      <li className="flex items-start justify-between gap-3 py-2 border-b border-gray-200">
                        <span className="text-[#112A46] font-medium min-w-[80px]">
                          {safeString(data.hours_weekday_label)}
                        </span>

                        <div className="flex flex-col items-end gap-1 text-right">
                          {data?.hours_weekday_time && (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-700">
                              {safeString(data.hours_weekday_time)}
                            </span>
                          )}
                        </div>
                      </li>
                    )}

                    {/* Sunday */}
                    {data?.hours_sunday_label && (
                      <li className="flex items-start justify-between gap-3 py-2">
                        <span className="text-[#112A46] font-medium min-w-[80px]">
                          {safeString(data.hours_sunday_label)}
                        </span>

                        <div className="flex flex-col items-end gap-1 text-right">
                          {data?.hours_sunday_status && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                              {safeString(data.hours_sunday_status)}
                            </span>
                          )}

                          {data?.hours_sunday_description && (
                            <span className="max-w-[240px] text-xs leading-relaxed text-gray-500">
                              {safeString(data.hours_sunday_description)}
                            </span>
                          )}
                        </div>
                      </li>
                    )}
                  </ul>
                  {data?.hours_footer_italic && (
                    <p className="text-xs italic text-gray-500">
                      {safeString(data.hours_footer_italic)}
                    </p>
                  )}
                </div>
              )}

              {/* Emergency & Direct Contact Box */}
              {(data?.urgent_title || data?.manager_1_name) && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-gray-800 leading-relaxed shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    {data?.urgent_title && <h3 className="text-base font-extrabold text-red-700">{safeString(data.urgent_title)}</h3>}
                  </div>
                  {data?.urgent_subtitle && (
                    <p className="mb-5 font-medium text-red-900/80">
                      {safeString(data.urgent_subtitle)}
                    </p>
                  )}

                  <div className="space-y-4">
                    {data?.urgent_main_phone_text && (
                      <a href={safeString(data?.urgent_main_phone_url) || "#"} className="flex items-center justify-center gap-2 w-full bg-white border border-red-200 text-red-700 font-bold py-3.5 px-4 rounded-xl shadow-sm hover:bg-red-100 transition-colors">
                        <Phone className="h-5 w-5" /> {safeString(data.urgent_main_phone_text)}
                      </a>
                    )}

                    <div className="space-y-3">
                      {data?.manager_1_name && (
                        <div className="bg-white p-3.5 rounded-xl border border-red-100 shadow-sm">
                          <div className="font-bold text-[#112A46] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-[#E05A2B]" /> {safeString(data.manager_1_name)}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {data?.manager_1_whatsapp_text && (
                              <a href={safeString(data?.manager_1_whatsapp_url) || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-bold py-2.5 rounded-lg transition-colors text-xs">
                                <MessageCircle className="h-4 w-4" /> {safeString(data.manager_1_whatsapp_text)}
                              </a>
                            )}
                            {data?.manager_1_email && (
                              <a href={`mailto:${safeString(data.manager_1_email)}`} className="flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold py-2.5 rounded-lg transition-colors text-xs truncate px-2">
                                <Mail className="h-4 w-4 shrink-0" /> Email
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {data?.manager_2_name && (
                        <div className="bg-white p-3.5 rounded-xl border border-red-100 shadow-sm">
                          <div className="font-bold text-[#112A46] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-[#E05A2B]" /> {safeString(data.manager_2_name)}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {data?.manager_2_whatsapp_text && (
                              <a href={safeString(data?.manager_2_whatsapp_url) || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-bold py-2.5 rounded-lg transition-colors text-xs">
                                <MessageCircle className="h-4 w-4" /> {safeString(data.manager_2_whatsapp_text)}
                              </a>
                            )}
                            {data?.manager_2_email && (
                              <a href={`mailto:${safeString(data.manager_2_email)}`} className="flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold py-2.5 rounded-lg transition-colors text-xs truncate px-2">
                                <Mail className="h-4 w-4 shrink-0" /> Email
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form wrapper (Right Column) */}
            <div className="lg:col-span-7 rounded-2xl bg-[#f9fafb] border border-gray-100 p-6 md:p-8 shadow-[0_8px_30px_rgba(17,42,70,.05)] space-y-5">
              {(data?.form_title || data?.form_subtitle) && (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <Send className="h-6 w-6 text-[#E05A2B]" />
                    {data?.form_title && <h2 className="text-xl md:text-3xl font-extrabold text-[#112A46]">{safeString(data.form_title)}</h2>}
                  </div>

                  {data?.form_subtitle && (
                    <p className="text-gray-600 font-medium leading-relaxed pb-4 border-b border-gray-200">
                      {safeString(data.form_subtitle)}
                    </p>
                  )}
                </>
              )}

              {/* Error Message Banner */}
              {errorMessage && (
                <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-4 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Success Message Banner */}
              {isSuccess && (
                <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 mb-4 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm font-medium">
                    {safeString(data?.form_success_message) || "Your inquiry has been successfully sent. We will be in touch with you shortly."}
                  </p>
                </div>
              )}

              <form
                ref={formRef}
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cname" className={labelClasses}>Name *</label>
                    <input
                      id="cname"
                      name="name"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="cemail" className={labelClasses}>Email *</label>
                    <input
                      id="cemail"
                      type="email"
                      name="email"
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="cphone" className={labelClasses}>Phone</label>
                    <input
                      id="cphone"
                      type="tel"
                      name="phone"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="cinterest" className={labelClasses}>I am interested in: *</label>
                    <select
                      id="cinterest"
                      name="interest"
                      required
                      defaultValue=""
                      className={inputClasses}
                    >
                      <option value="" className="cursor-pointer" disabled>Select an option...</option>
                      {interestsList.map((interestText, idx) => (
                        <option key={idx} value={interestText}>{interestText}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cmessage" className={labelClasses}>Message *</label>
                    <textarea
                      id="cmessage"
                      name="message"
                      required
                      rows={5}
                      className="mt-1.5 flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[#112A46] font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E05A2B]/50 focus:ring-offset-0 focus:border-[#E05A2B] resize-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    />
                  </div>
                </div>

                {/* reCAPTCHA Widget */}
                <div className="flex justify-center pt-2">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6Ldcf24tAAAAAGGAjW7Q_2g2oY0p-etJCNa12hi2"}
                    onChange={(token) => {
                      setRecaptchaToken(token || '');
                      if (token) setErrorMessage('');
                    }}
                    onExpired={() => setRecaptchaToken('')}
                  />
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

          {data?.footer_note && (
            <div className="w-full max-w-[800px] mx-auto px-6 mt-16 text-center text-sm font-medium text-gray-500">
              <p>{safeString(data.footer_note)}</p>
            </div>
          )}
        </section>

        {/* Map Section */}
        {data?.google_map_embed_url && (
          <section className="w-full h-[450px] bg-gray-200 relative border-t border-gray-200">
            <iframe
              src={safeString(data.google_map_embed_url)}
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Contact;