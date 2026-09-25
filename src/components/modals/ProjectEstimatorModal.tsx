import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Calculator, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { EnquirySubmission } from '../../types';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEnquiry: (enquiry: Partial<EnquirySubmission>) => void;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  onClose,
  onSubmitEnquiry,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [projectType, setProjectType] = useState<string>('Web Application');
  const [businessType, setBusinessType] = useState<string>('Small or Medium Business (SME)');
  const [screenScale, setScreenScale] = useState<string>('Medium (5 to 10 Views)');
  const [features, setFeatures] = useState<string[]>([
    'User Authentication & Roles',
    'Database & Custom API',
  ]);
  const [timeline, setTimeline] = useState<string>('Standard (1 to 2 Months)');
  const [budgetRange, setBudgetRange] = useState<string>('Custom Quote Based on Scope');

  // Contact info
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const projectTypes = [
    'Website Development',
    'Web Application',
    'Mobile App (Android/iOS)',
    'Custom Software & ERP',
    'AI & Automation Solution',
    'UI/UX Design & Prototyping',
    'Cloud Architecture & DevOps',
  ];

  const businessTypes = [
    'Early-Stage Startup / Founder',
    'Small or Medium Business (SME)',
    'Established Enterprise',
    'Educational Institution / School',
    'Healthcare / Medical Clinic',
    'Retail / E-Commerce Brand',
    'FPO / Agricultural Enterprise',
  ];

  const screenScales = [
    'Single Page / Landing (1-3 Views)',
    'Standard System (4-8 Views)',
    'Comprehensive Portal (9-18 Views)',
    'Complex Multi-Role Platform (18+ Views)',
  ];

  const featureOptions = [
    'User Authentication & Roles (RBAC)',
    'Payment Gateway Integration (UPI / Cards)',
    'Custom Database & API Architecture',
    'AI / Computer Vision / Machine Learning',
    'Real-Time WebSocket Sync / Alerts',
    'Headless CMS for Content Editing',
    'Automated PDF Report / Invoicing Engine',
    'Multi-Warehouse Inventory Tracking',
    'Mobile Responsive Optimization',
    'Automated Daily Cloud Backups',
  ];

  const timelineOptions = [
    'Urgent Priority (3 to 5 Weeks)',
    'Standard Pace (6 to 10 Weeks)',
    'Flexible Phased Milestones (2 to 4 Months)',
  ];

  const budgetOptions = [
    'Starter Scope Tier',
    'Business Application Tier',
    'Professional / Custom Enterprise',
    'To Be Determined Based on Architecture',
  ];

  const handleToggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const compiledEnquiry: Partial<EnquirySubmission> = {
        fullName,
        companyName: company || undefined,
        email,
        phone: phone || '[NOT PROVIDED]',
        country: 'India',
        serviceRequired: projectType,
        projectType: `${businessType} | ${screenScale}`,
        estimatedBudget: budgetRange,
        timeline,
        description: `Interactive Estimator Submission:\n- Features: ${features.join(', ')}\n- Additional Notes: ${notes || 'None'}`,
        heardFrom: 'Interactive Project Estimator',
      };

      onSubmitEnquiry(compiledEnquiry);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#07121F]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF]">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                Interactive Project Estimator
              </h2>
              <span className="text-[11px] font-mono text-slate-500">
                Step {step} of 7 &middot; Non-binding architectural scope tool
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800 w-full">
          <div
            className="h-full bg-[#0A84FF] transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1 text-slate-900 dark:text-slate-100">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Detailed Quote Request Received
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. We have compiled your architectural parameters for <strong>{projectType}</strong>. Our engineering lead will review your specifications and send a tailored proposal to <strong>{email}</strong> within 24 business hours.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
                <div><span className="text-slate-400">Project:</span> {projectType}</div>
                <div><span className="text-slate-400">Scale:</span> {screenScale}</div>
                <div><span className="text-slate-400">Timeline:</span> {timeline}</div>
                <div><span className="text-slate-400">Features:</span> {features.length} selected</div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-[#0A84FF] text-white text-xs font-semibold hover:bg-[#0070E0] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Project Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      1. What type of digital solution do you need?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Select the primary technology delivery category for your initiative.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`p-3.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                          projectType === type
                            ? 'bg-[#0A84FF]/10 border-[#0A84FF] text-[#0A84FF] dark:text-[#00E5FF]'
                            : 'bg-white dark:bg-[#0B1B2B] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Business Type */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      2. What describes your organization or business model?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Helps us recommend compliance standards and system architectural patterns.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {businessTypes.map((bType) => (
                      <button
                        key={bType}
                        type="button"
                        onClick={() => setBusinessType(bType)}
                        className={`p-3.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                          businessType === bType
                            ? 'bg-[#0A84FF]/10 border-[#0A84FF] text-[#0A84FF] dark:text-[#00E5FF]'
                            : 'bg-white dark:bg-[#0B1B2B] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {bType}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Scope Scale */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      3. Approximate number of screens or user views?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Gives us an estimate of frontend component density and state management complexity.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {screenScales.map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => setScreenScale(scale)}
                        className={`w-full p-4 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          screenScale === scale
                            ? 'bg-[#0A84FF]/10 border-[#0A84FF] text-[#0A84FF] dark:text-[#00E5FF]'
                            : 'bg-white dark:bg-[#0B1B2B] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <span>{scale}</span>
                        {screenScale === scale && <Check className="w-4 h-4 text-[#0A84FF]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Required Features */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      4. What key technical features do you require?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Select all modules that apply to your system architecture.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {featureOptions.map((feat) => {
                      const isSelected = features.includes(feat);
                      return (
                        <button
                          key={feat}
                          type="button"
                          onClick={() => handleToggleFeature(feat)}
                          className={`p-3 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#0A84FF]/10 border-[#0A84FF] text-[#0A84FF] dark:text-[#00E5FF]'
                              : 'bg-white dark:bg-[#0B1B2B] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <span className="pr-2">{feat}</span>
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-[#0A84FF] border-[#0A84FF] text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Timeline */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      5. What is your preferred delivery timeline?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Enables proper sprint team sizing and staging milestone allocation.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {timelineOptions.map((tOpt) => (
                      <button
                        key={tOpt}
                        type="button"
                        onClick={() => setTimeline(tOpt)}
                        className={`w-full p-4 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          timeline === tOpt
                            ? 'bg-[#0A84FF]/10 border-[#0A84FF] text-[#0A84FF] dark:text-[#00E5FF]'
                            : 'bg-white dark:bg-[#0B1B2B] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <span>{tOpt}</span>
                        {timeline === tOpt && <Check className="w-4 h-4 text-[#0A84FF]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Budget Range & Non-Binding Notice */}
              {step === 6 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      6. What budget bracket are you considering?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Allows us to architect appropriate technology trade-offs without over-engineering.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {budgetOptions.map((bOpt) => (
                      <button
                        key={bOpt}
                        type="button"
                        onClick={() => setBudgetRange(bOpt)}
                        className={`w-full p-3.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                          budgetRange === bOpt
                            ? 'bg-[#0A84FF]/10 border-[#0A84FF] text-[#0A84FF] dark:text-[#00E5FF]'
                            : 'bg-white dark:bg-[#0B1B2B] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <span>{bOpt}</span>
                        {budgetRange === bOpt && <Check className="w-4 h-4 text-[#0A84FF]" />}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-300">
                    <strong>Transparency Notice:</strong> This estimator generates non-binding scope parameters. Final itemized pricing is provided only after requirements confirmation.
                  </div>
                </div>
              )}

              {/* Step 7: Contact Information */}
              {step === 7 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                      7. Where should we send your detailed technical scope estimate?
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Our lead engineer will compile an itemized scope and proposal document.
                    </p>
                  </div>

                  {/* Summary Recap Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 text-xs space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Solution:</span>
                      <span className="text-slate-900 dark:text-white font-bold">{projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scope:</span>
                      <span className="text-slate-700 dark:text-slate-300">{screenScale}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Modules:</span>
                      <span className="text-[#0A84FF]">{features.length} selected</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Technologies"
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Additional Project Context (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific third-party APIs, legacy databases, or special features..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Compiling Scope Package...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Detailed Itemized Quote</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        {!submitted && (
          <div className="sticky bottom-0 z-20 px-6 py-4 bg-slate-50 dark:bg-[#081524] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {step < 7 && (
              <button
                onClick={() => setStep(Math.min(7, step + 1))}
                className="px-5 py-2 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
