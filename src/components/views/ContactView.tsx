import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { EnquirySubmission } from '../../types';

interface ContactViewProps {
  initialService?: string;
  onEnquirySubmitted: (enquiry: EnquirySubmission) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  initialService,
  onEnquirySubmitted,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [serviceRequired, setServiceRequired] = useState(
    initialService || 'Website Development'
  );
  const [projectType, setProjectType] = useState('New Project from Scratch');
  const [estimatedBudget, setEstimatedBudget] = useState('Standard Scope Tier');
  const [timeline, setTimeline] = useState('Within 1 to 2 Months');
  const [description, setDescription] = useState('');
  const [heardFrom, setHeardFrom] = useState('Direct Search / Referral');

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const servicesList = [
    'Website Development',
    'Web Application Development',
    'Mobile Application Development',
    'Custom Software & ERP',
    'AI & Machine Learning',
    'UI/UX Design & Prototyping',
    'Cloud & Deployment Solutions',
    'IT Consulting & Architecture Audit',
    'Maintenance & Support Retainer',
    'Other / Custom Requirement',
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid business email address.';
    }

    if (!phone.trim() || phone.trim().replace(/\D/g, '').length < 8) {
      errs.phone = 'Please provide a valid contact number (minimum 8 digits).';
    }

    if (!description.trim() || description.trim().length < 15) {
      errs.description = 'Please describe your project requirements in at least 15 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate reliable API submission with sanitize
    setTimeout(() => {
      const newId = `ENQ-${Date.now().toString().slice(-6)}`;
      const submission: EnquirySubmission = {
        id: newId,
        fullName: fullName.trim(),
        companyName: companyName.trim() || undefined,
        email: email.trim(),
        phone: phone.trim(),
        country,
        serviceRequired,
        projectType,
        estimatedBudget,
        timeline,
        description: description.trim(),
        heardFrom,
        timestamp: new Date().toISOString(),
        status: 'New',
      };

      onEnquirySubmitted(submission);
      setSubmittedId(newId);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 800);
  };

  const handleReset = () => {
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setDescription('');
    setSubmitSuccess(false);
    setErrors({});
  };

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Project Inquiries
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Let's Build Something Great.
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Tell us about your business goals, target timelines, and technology expectations. You will hear back directly from an engineering lead within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Placeholders & Contact Channels */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                Direct Communications
              </h2>

              <div className="space-y-5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                      Business Email
                    </span>
                    <a
                      href="mailto:abtechsol660@gmail.com"
                      className="font-semibold text-slate-900 dark:text-white hover:text-[#0A84FF] transition-colors"
                    >
                      abtechsol660@gmail.com
                    </a>
                    <span className="block text-[11px] text-slate-400">
                      Direct inquiries & RFPs
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                      Mobile & Call
                    </span>
                    <a
                      href="tel:+918861375377"
                      className="font-semibold text-slate-900 dark:text-white hover:text-[#00E5FF] transition-colors font-mono"
                    >
                      +91 8861375377
                    </a>
                    <span className="block text-[11px] text-slate-400">
                      Mon &ndash; Sat, 9:00 AM &ndash; 7:00 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                      WhatsApp Direct Chat
                    </span>
                    <a
                      href="https://wa.me/918861375377?text=Hello%20AB%20TechSol,%20I'd%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Chat: +91 8861375377</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="block text-[11px] text-slate-400">
                      Instant response for project discussions
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                      Location & Office
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Hassan, Karnataka, India
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      Remote-First Engineering across India & Global
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Guarantee Badge */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0A84FF]">
                <Clock className="w-4 h-4" />
                <span>Our 24-Hour Commitment</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every inquiry is triaged directly by engineering leadership. We review your specifications, verify feasibility, and schedule an initial discovery session within one business day.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Strict Non-Disclosure & Privacy Protected</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Project Enquiry Form */}
          <div className="lg:col-span-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-xl">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    Thank you! Your project enquiry has been received.
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    We'll review your requirements and get back to you soon. A notification has been dispatched directly from the website to our engineering leadership (<span className="text-[#0A84FF] font-mono">abtechsol660@gmail.com</span>). Your enquiry reference number is:
                  </p>
                  <div className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-sm font-bold text-[#0A84FF] border border-slate-200 dark:border-slate-700">
                    {submittedId}
                  </div>
                  <div className="pt-6">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-lg bg-[#0A84FF] text-white text-xs font-semibold hover:bg-[#0070E0] transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      Project Specification Form
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Fields marked with an asterisk (*) are required for architectural evaluation.
                    </p>
                  </div>

                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border rounded-lg text-slate-900 dark:text-white focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-[#0A84FF]'
                        }`}
                      />
                      {errors.fullName && (
                        <span className="text-[11px] text-rose-500 mt-1 block">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Enterprise"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ada@company.com"
                        className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border rounded-lg text-slate-900 dark:text-white focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-[#0A84FF]'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-500 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border rounded-lg text-slate-900 dark:text-white focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-200 dark:border-slate-700 focus:border-[#0A84FF]'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-rose-500 mt-1 block">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Country & Service Required */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Country / Region
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="European Union">European Union</option>
                        <option value="Other">Other International</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Service Required *
                      </label>
                      <select
                        value={serviceRequired}
                        onChange={(e) => setServiceRequired(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      >
                        <option>New Project from Scratch</option>
                        <option>Redesign / Replatforming</option>
                        <option>Adding AI / Advanced Features</option>
                        <option>Codebase Audit / Consulting</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Estimated Budget
                      </label>
                      <select
                        value={estimatedBudget}
                        onChange={(e) => setEstimatedBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      >
                        <option>Starter Scope Tier</option>
                        <option>Business Application Tier</option>
                        <option>Professional Tier</option>
                        <option>Custom Enterprise Tier</option>
                        <option>Flexible / To Be Decided</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Target Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      >
                        <option>Urgent (Within 2 to 4 Weeks)</option>
                        <option>Within 1 to 2 Months</option>
                        <option>Within 2 to 4 Months</option>
                        <option>Flexible Exploration</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Project Description & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please outline the business problem you are solving, desired user actions, and any existing tools or databases we need to integrate with..."
                      className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border rounded-lg text-slate-900 dark:text-white focus:outline-none transition-colors ${
                        errors.description
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-200 dark:border-slate-700 focus:border-[#0A84FF]'
                      }`}
                    />
                    {errors.description && (
                      <span className="text-[11px] text-rose-500 mt-1 block">
                        {errors.description}
                      </span>
                    )}
                  </div>

                  {/* Referral Source */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      How did you hear about AB TechSol?
                    </label>
                    <select
                      value={heardFrom}
                      onChange={(e) => setHeardFrom(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                    >
                      <option>Direct Search / Google</option>
                      <option>Client / Industry Referral</option>
                      <option>LinkedIn</option>
                      <option>GitHub</option>
                      <option>Tech Blog / Article</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Validating & Dispatching Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Project Enquiry</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-slate-400 text-center block mt-2 font-mono">
                      Your details are held strictly confidential under privacy standards.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
