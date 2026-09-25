import React from 'react';
import { ServiceItem } from '../../types';
import { 
  X, 
  ArrowRight, 
  Check, 
  Layers, 
  Code, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Cpu
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onStartProject: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onStartProject,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#07121F]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#0A84FF] uppercase tracking-wider font-semibold">
              Service Specification &middot; {service.category}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-900 dark:text-slate-100">
          {/* Hero Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              {service.title}
            </h2>
            <p className="text-base text-[#0A84FF] font-medium mt-1">
              {service.tagline}
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.shortDesc}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-semibold text-xs mb-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>The Core Business Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-900/90 dark:text-rose-300/90 leading-relaxed">
                {service.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-semibold text-xs mb-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Our Engineering Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed">
                {service.solution}
              </p>
            </div>
          </div>

          {/* Key Features & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-3">
                Key Technical Features
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0A84FF] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-3">
                Technology Stack Used
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mb-3">
                Tangible Business Benefits
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {service.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Example Use Cases */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Standard Use Cases
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              {service.useCases.map((uc, uIdx) => (
                <div key={uIdx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] shrink-0" />
                  <span>{uc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">
                Service-Specific FAQs
              </h3>
              <div className="space-y-3">
                {service.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-lg bg-slate-50 dark:bg-[#081524] border border-slate-200 dark:border-slate-800">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {faq.q}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-slate-50 dark:bg-[#081524] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Have questions about {service.title}? Speak directly with our lead architect.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartProject(service.id);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Discuss Requirements for {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
