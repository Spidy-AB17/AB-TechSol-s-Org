import React from 'react';
import { pricingData } from '../../data/pricingData';
import { 
  Check, 
  Clock, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  Calculator, 
  AlertCircle 
} from 'lucide-react';

interface PricingViewProps {
  onSelectPackage: (packageName: string) => void;
  onOpenEstimator: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  onSelectPackage,
  onOpenEstimator,
}) => {
  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Investment & Scopes
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Transparent, Requirement-Driven Packages
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            We do not slap misleading arbitrary price tags onto complex custom software. We structure clear scopes with itemized deliverables, milestone schedules, and post-launch warranties.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#0A84FF]" />
            <span>
              Every project receives a comprehensive, itemized quotation after an initial technical discovery call.
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingData.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                  pkg.isPopular
                    ? 'bg-[#F8FAFC] dark:bg-[#0B1B2B] border-[#0A84FF] shadow-xl ring-2 ring-[#0A84FF]/20'
                    : 'bg-white dark:bg-[#081524] border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0A84FF] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-5">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                      Best Suited For:
                    </span>
                    <span className="line-clamp-2">{pkg.targetAudience}</span>
                  </div>

                  <div className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#0A84FF]" />
                      <span>{pkg.estimatedTimeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>{pkg.revisions}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{pkg.supportPeriod}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                      What's Included:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {pkg.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0A84FF] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      pkg.isPopular
                        ? 'bg-[#0A84FF] hover:bg-[#0070E0] text-white'
                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Request a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Estimator Callout */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B1B2B] to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-mono tracking-wider text-[#00E5FF] font-semibold block mb-1">
              Custom Calculator
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Need an immediate rough scope calculation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Use our interactive 7-step estimator to configure your application requirements, timeline preferences, and target features in under 2 minutes.
            </p>
          </div>
          <button
            onClick={onOpenEstimator}
            className="px-6 py-3 rounded-lg bg-[#00E5FF] hover:bg-[#00c8e0] text-slate-950 font-semibold text-xs transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Launch Interactive Estimator</span>
          </button>
        </div>
      </div>
    </div>
  );
};
