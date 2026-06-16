import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';

// --- GOOGLE FORMS SUBMISSION URLS ---
const PARTNERSHIP_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdMc9xcl7H1QwBzURqGobi5IRoDZ_jIVBAOFGhraLR4XI_gBA/formResponse";
const VOLUNTEER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe59362MKmLAAyscUNZsmgYEtwQ5XREdWgOD7ewkA8wiH7RXQ/formResponse";
const WORKPLACE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdOeUXJy_Q9dB5YikBNq9o4O_bEmJelJ3Ce5f-KN4KCitP6-w/formResponse";

// --- HELPER FUNCTION FOR SUBMISSION ---
const submitToGoogleForms = async (e, url) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });
    return true; // no-cors hides response details, so we assume success if no network error
  } catch (error) {
    console.error("Form submission error:", error);
    return false;
  }
};

// --- MODAL WRAPPER COMPONENT ---
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#112A46]/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[24px] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in-up">
        <div className="sticky top-0 bg-white z-10 px-6 py-5 border-b border-gray-100 flex justify-between items-center rounded-t-[24px]">
          <h2 className="text-2xl font-black text-[#112A46]">{title}</h2>
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-gray-100 hover:bg-[#E05A2B]/10 hover:text-[#E05A2B] text-gray-500 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- BASE UI COMPONENTS ---
const FormGroup = ({ label, children }) => (
  <div className="mb-5">
    <label className="block text-[#112A46] text-[14px] font-bold mb-2">{label}</label>
    {children}
  </div>
);

const Input = ({ type = "text", name, placeholder, required = false }) => (
  <input 
    type={type} 
    name={name}
    placeholder={placeholder} 
    required={required}
    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#E05A2B] focus:ring-2 focus:ring-[#E05A2B]/20 transition-all bg-gray-50 hover:bg-white focus:bg-white" 
  />
);

const Textarea = ({ name, placeholder, rows = 3, required = false }) => (
  <textarea 
    name={name}
    rows={rows} 
    placeholder={placeholder} 
    required={required}
    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#E05A2B] focus:ring-2 focus:ring-[#E05A2B]/20 transition-all bg-gray-50 hover:bg-white focus:bg-white"
  ></textarea>
);

const Checkbox = ({ name, label }) => (
  <label className="flex items-start gap-3 cursor-pointer group mb-2">
    <input type="checkbox" name={name} value={label} className="mt-1 w-4 h-4 text-[#E05A2B] border-gray-300 rounded focus:ring-[#E05A2B]" />
    <span className="text-gray-600 text-[14.5px] group-hover:text-[#112A46] transition-colors">{label}</span>
  </label>
);

// Form handling logic perfectly maps to Google Forms requirements for 'Other' fields
const CheckboxWithOther = ({ name, label = "Other" }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col mb-2">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input 
          type="checkbox" 
          name={name} 
          value="__other_option__" 
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="mt-1 w-4 h-4 text-[#E05A2B] border-gray-300 rounded focus:ring-[#E05A2B]" 
        />
        <span className="text-gray-600 text-[14.5px] group-hover:text-[#112A46] transition-colors">{label}</span>
      </label>
      {isChecked && (
        <input 
          type="text" 
          name={`${name}.other_option_response`}
          placeholder="Please specify..." 
          required
          className="mt-2 ml-7 w-[calc(100%-1.75rem)] border border-gray-200 rounded-lg px-3 py-2 text-[14px] focus:outline-none focus:border-[#E05A2B] focus:ring-1 focus:ring-[#E05A2B]/20 transition-all bg-gray-50 hover:bg-white focus:bg-white"
        />
      )}
    </div>
  );
};

const Radio = ({ name, label }) => (
  <label className="flex items-center gap-3 cursor-pointer group mb-2">
    <input type="radio" name={name} value={label} className="w-4 h-4 text-[#E05A2B] border-gray-300 focus:ring-[#E05A2B]" />
    <span className="text-gray-600 text-[14.5px] group-hover:text-[#112A46] transition-colors">{label}</span>
  </label>
);

const SuccessMessage = () => (
  <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in-up">
    <FaCheckCircle className="text-[#E05A2B] cursor-pointer text-6xl mb-4" />
    <h3 className="text-2xl font-black text-[#112A46] mb-2">Thank You!</h3>
    <p className="text-gray-600">Your information has been successfully submitted. Our team will be in touch shortly.</p>
  </div>
);

// --- SPECIFIC FORM COMPONENTS ---

export const PartnershipForm = ({ onClose }) => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    setStatus('submitting');
    const success = await submitToGoogleForms(e, PARTNERSHIP_FORM_URL);
    if (success) setStatus('success');
  };

  if (status === 'success') return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Company / Organization Name"><Input name="entry.1906976925" placeholder="Enter company name" required /></FormGroup>
        <FormGroup label="Contact Name"><Input name="entry.888155157" placeholder="Enter your full name" required /></FormGroup>
        <FormGroup label="Position / Title"><Input name="entry.1063912020" placeholder="Enter your title" /></FormGroup>
        <FormGroup label="Email Address"><Input name="entry.1721510154" type="email" placeholder="you@example.com" required /></FormGroup>
        <FormGroup label="Phone Number"><Input name="entry.1099219570" type="tel" placeholder="(123) 456-7890" /></FormGroup>
        <FormGroup label="Website (Optional)"><Input name="entry.683055928" type="url" placeholder="https://" /></FormGroup>
      </div>

      <FormGroup label="Type of Partnership Interest (Select all that apply)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Checkbox name="entry.1984402703" label="Corporate Sponsorship" />
          <Checkbox name="entry.1984402703" label="Event Partnership" />
          <Checkbox name="entry.1984402703" label="In-Kind Donations" />
          <Checkbox name="entry.1984402703" label="Employee Volunteer Opportunities" />
          <Checkbox name="entry.1984402703" label="Seafarer Wellness Support" />
          <Checkbox name="entry.1984402703" label="Maritime Industry Collaboration" />
          <Checkbox name="entry.1984402703" label="Community Engagement Initiatives" />
          <CheckboxWithOther name="entry.1984402703" label="Other" />
        </div>
      </FormGroup>

      <FormGroup label="Areas You're Interested in Supporting">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Checkbox name="entry.294798000" label="Seafarer Care & Welfare" />
          <Checkbox name="entry.294798000" label="Transportation Assistance" />
          <Checkbox name="entry.294798000" label="Hospitality & Recreation" />
          <Checkbox name="entry.294798000" label="Mental Health & Wellbeing" />
          <Checkbox name="entry.294798000" label="Connectivity / Wi-Fi Support" />
          <Checkbox name="entry.294798000" label="Emergency Assistance" />
          <Checkbox name="entry.294798000" label="Station Operations" />
          <Checkbox name="entry.294798000" label="Special Events & Awareness Campaigns" />
          <CheckboxWithOther name="entry.294798000" label="Other" />
        </div>
      </FormGroup>

      <FormGroup label="Tell Us About Your Partnership Goals">
        <Textarea name="entry.70562568" rows="4" placeholder="Short Message..." />
      </FormGroup>

      <FormGroup label="Preferred Follow-Up Method">
        <div className="flex flex-wrap gap-6">
          <Radio name="entry.741330845" label="Email" />
          <Radio name="entry.741330845" label="Phone Call" />
          <Radio name="entry.741330845" label="Virtual Meeting" />
          <Radio name="entry.741330845" label="In-Person Meeting" />
        </div>
      </FormGroup>

      <button disabled={status === 'submitting'} type="submit" className="w-full cursor-pointer bg-[#E05A2B] text-white py-4 rounded-xl font-bold text-[16px] hover:bg-[#c94d23] transition-colors shadow-lg disabled:opacity-70">
        {status === 'submitting' ? 'Submitting...' : 'Submit Partnership Inquiry'}
      </button>
    </form>
  );
};

export const VolunteerForm = ({ onClose }) => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    setStatus('submitting');
    const success = await submitToGoogleForms(e, VOLUNTEER_FORM_URL);
    if (success) setStatus('success');
  };

  if (status === 'success') return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Full Name"><Input name="entry.175277445" placeholder="Enter your full name" required /></FormGroup>
        <FormGroup label="Email Address"><Input name="entry.1995203981" type="email" placeholder="you@example.com" required /></FormGroup>
        <FormGroup label="Phone Number"><Input name="entry.81293752" type="tel" placeholder="(123) 456-7890" /></FormGroup>
        <FormGroup label="Organization / Company (Optional)"><Input name="entry.747198555" placeholder="Enter organization name" /></FormGroup>
      </div>

      <FormGroup label="How Would You Like to Support? (Select all that apply)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Checkbox name="entry.431600604" label="Become a Volunteer" />
          <Checkbox name="entry.431600604" label="Raise Awareness in My Community" />
          <Checkbox name="entry.431600604" label="Share MTSC Halifax on My Social Media" />
          <Checkbox name="entry.431600604" label="Refer Mission to Seafarers Halifax for a Grant" />
          <Checkbox name="entry.431600604" label="Corporate or Workplace Engagement" />
          <Checkbox name="entry.431600604" label="Event Support" />
          <CheckboxWithOther name="entry.431600604" label="Other" />
        </div>
      </FormGroup>

      <div className="bg-[#F8FBFD] p-5 rounded-xl border border-[#112A46]/5 mb-6">
        <h3 className="text-[#112A46] font-bold mb-4">Volunteer Interest</h3>
        <FormGroup label="Areas of Interest">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Checkbox name="entry.1186036122" label="Ship Visits" />
            <Checkbox name="entry.1186036122" label="Event Support" />
            <Checkbox name="entry.1186036122" label="Hospitality & Seafarer Welcome" />
            <Checkbox name="entry.1186036122" label="Transportation Assistance" />
            <Checkbox name="entry.1186036122" label="Administrative Support" />
            <Checkbox name="entry.1186036122" label="Photography / Videography" />
            <Checkbox name="entry.1186036122" label="Communications & Social Media" />
            <Checkbox name="entry.1186036122" label="Fundraising Support" />
            <CheckboxWithOther name="entry.1186036122" label="Other" />
          </div>
        </FormGroup>
        <FormGroup label="Availability">
          <div className="flex flex-wrap gap-6">
            <Radio name="entry.718270641" label="Weekdays" />
            <Radio name="entry.718270641" label="Evenings" />
            <Radio name="entry.718270641" label="Weekends" />
            <Radio name="entry.718270641" label="Flexible" />
          </div>
        </FormGroup>
      </div>

      <div className="bg-[#FDF0EC] p-5 rounded-xl border border-[#E05A2B]/10 mb-6">
        <h3 className="text-[#112A46] font-bold mb-4">Grant Referral Information (If applicable)</h3>
        <div className="grid grid-cols-1 gap-4">
          <Input name="entry.1853302881" placeholder="Name of Grant / Foundation / Program" />
          <Input name="entry.1954342337" type="url" placeholder="Website or Link (Optional)" />
          <Textarea name="entry.2133279330" rows="2" placeholder="Additional Details..." />
        </div>
      </div>

      <FormGroup label="Advocacy & Awareness: How would you like to help spread awareness?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Checkbox name="entry.1146467075" label="Share social media posts" />
          <Checkbox name="entry.1146467075" label="Introduce us to community groups" />
          <Checkbox name="entry.1146467075" label="Invite MTSC Halifax to speak at an event" />
          <Checkbox name="entry.1146467075" label="Help promote campaigns & events" />
          <CheckboxWithOther name="entry.1146467075" label="Other" />
        </div>
      </FormGroup>

      <FormGroup label="Additional Comments or Questions">
        <Textarea name="entry.1805793184" rows="3" placeholder="Let us know..." />
      </FormGroup>

      <button disabled={status === 'submitting'} type="submit" className="w-full cursor-pointer cursor-pointer bg-[#E05A2B] text-white py-4 rounded-xl font-bold text-[16px] hover:bg-[#c94d23] transition-colors shadow-lg disabled:opacity-70">
        {status === 'submitting' ? 'Submitting...' : 'Submit Volunteer & Advocacy Form'}
      </button>
    </form>
  );
};

export const WorkplaceForm = ({ onClose }) => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    setStatus('submitting');
    const success = await submitToGoogleForms(e, WORKPLACE_FORM_URL);
    if (success) setStatus('success');
  };

  if (status === 'success') return <SuccessMessage />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Company / Organization Name"><Input name="entry.1040332455" placeholder="Company Name" required /></FormGroup>
        <FormGroup label="Contact Name"><Input name="entry.1832163936" placeholder="Your Full Name" required /></FormGroup>
        <FormGroup label="Position / Title"><Input name="entry.1459467614" placeholder="Your Title" /></FormGroup>
        <FormGroup label="Email Address"><Input name="entry.811942200" type="email" placeholder="you@example.com" required /></FormGroup>
        <FormGroup label="Phone Number"><Input name="entry.2012014604" type="tel" placeholder="(123) 456-7890" /></FormGroup>
        <FormGroup label="Company Website (Optional)"><Input name="entry.1704786251" type="url" placeholder="https://" /></FormGroup>
      </div>

      <FormGroup label="How Would You Like to Engage? (Select all that apply)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Checkbox name="entry.1289782486" label="Employer Matching Gifts" />
          <Checkbox name="entry.1289782486" label="Volunteer Grants" />
          <Checkbox name="entry.1289782486" label="Union or Association Partnership" />
          <Checkbox name="entry.1289782486" label="Employee Volunteer Opportunities" />
          <Checkbox name="entry.1289782486" label="Workplace Fundraising Campaign" />
          <Checkbox name="entry.1289782486" label="Sponsorship Opportunities" />
          <CheckboxWithOther name="entry.1289782486" label="Other" />
        </div>
      </FormGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <FormGroup label="Employer Matching Gifts">
            <p className="text-sm text-gray-500 mb-2">Does your company offer matching donations?</p>
            <div className="flex gap-4 mb-4">
              <Radio name="entry.660711152" label="Yes" />
              <Radio name="entry.660711152" label="No" />
              <Radio name="entry.660711152" label="Unsure" />
            </div>
            <Input name="entry.1398750561" placeholder="Matching Program Details (Optional)" />
          </FormGroup>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <FormGroup label="Volunteer Grants">
            <p className="text-sm text-gray-500 mb-2">Provide grants for employee volunteer hours?</p>
            <div className="flex gap-4 mb-4">
              <Radio name="entry.1123084684" label="Yes" />
              <Radio name="entry.1123084684" label="No" />
              <Radio name="entry.1123084684" label="Unsure" />
            </div>
            <p className="text-sm text-gray-500 mb-2 mt-4">Estimated Volunteer Group Size</p>
            <div className="grid grid-cols-2 gap-2">
              <Radio name="entry.2014712442" label="1–5" />
              <Radio name="entry.2014712442" label="6–15" />
              <Radio name="entry.2014712442" label="16–30" />
              <Radio name="entry.2014712442" label="30+" />
            </div>
          </FormGroup>
        </div>
      </div>

      <FormGroup label="Volunteer Interests">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Checkbox name="entry.492944244" label="Events" />
          <Checkbox name="entry.492944244" label="Seafarer Hospitality" />
          <Checkbox name="entry.492944244" label="Ship Visits" />
          <Checkbox name="entry.492944244" label="Fundraising Campaigns" />
          <Checkbox name="entry.492944244" label="Community Outreach" />
          <CheckboxWithOther name="entry.492944244" label="Other" />
        </div>
      </FormGroup>

      <div className="bg-[#F8FBFD] p-5 rounded-xl border border-[#112A46]/5 mb-6">
        <h3 className="text-[#112A46] font-bold mb-4">Union or Association Partnerships</h3>
        <div className="mb-4">
          <Input name="entry.58227692" placeholder="Name of Union / Association (If Applicable)" />
        </div>
        <FormGroup label="Partnership Interest">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Checkbox name="entry.905114847" label="Awareness Campaigns" />
            <Checkbox name="entry.905114847" label="Sponsorship" />
            <Checkbox name="entry.905114847" label="Joint Community Initiatives" />
            <Checkbox name="entry.905114847" label="Volunteer Opportunities" />
            <Checkbox name="entry.905114847" label="Educational Events" />
            <Checkbox name="entry.905114847" label="Member Engagement Activities" />
            <CheckboxWithOther name="entry.905114847" label="Other" />
          </div>
        </FormGroup>
      </div>

      <FormGroup label="Additional Information or Partnership Ideas">
        <Textarea name="entry.1753099926" rows="3" placeholder="Tell us more..." />
      </FormGroup>

      <FormGroup label="Preferred Follow-Up Method">
        <div className="flex flex-wrap gap-6">
          <Radio name="entry.802177888" label="Email" />
          <Radio name="entry.802177888" label="Phone Call" />
          <Radio name="entry.802177888" label="Virtual Meeting" />
          <Radio name="entry.802177888" label="In-Person Meeting" />
        </div>
      </FormGroup>

      <button disabled={status === 'submitting'} type="submit" className="w-full cursor-pointer bg-[#E05A2B] text-white py-4 rounded-xl font-bold text-[16px] hover:bg-[#c94d23] transition-colors shadow-lg disabled:opacity-70">
         {status === 'submitting' ? 'Submitting...' : 'Submit Workplace Engagement Form'}
      </button>
    </form>
  );
};