import React, { useState } from 'react';
import { solutionsData } from '../../data/solutionsData';
import { 
  Briefcase, 
  GraduationCap, 
  Activity, 
  Sprout, 
  ShoppingBag, 
  UtensilsCrossed, 
  Rocket, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SolutionsSectionProps {
  onStartProject: (solutionTitle?: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onStartProject }) => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(solutionsData[0].id);

  const iconMap: Record<string, React.ElementType> = {
    'business-management': Briefcase,
    'education-institutions': GraduationCap,
    'healthcare-clinics': Activity,
    'smart-agriculture': Sprout,
    'retail-ecommerce': ShoppingBag,
    'hospitality-dining': UtensilsCrossed,
    'startups-mvp': Rocket,
  };

  const currentSolution =
    solutionsData.find((s) => s.id === selectedSolutionId) || solutionsData[0];
  const CurrentIcon = iconMap[currentSolution.id] || Briefcase;

  return (
    <section id="solutions-section" className="py-24 bg-[#F5F8FC] dark:bg-[#081524] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Industry & Business Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Tailored for Your Exact Industry Realities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            We don't simply assemble generic tools. We engineer customized digital systems addressing specific business bottlenecks across diverse operational domains.
          </p>
        </div>

        {/* Industry Solution Selector Pills/Tabs (Interactive buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {solutionsData.map((item) => {
            const Icon = iconMap[item.id] || Briefcase;
            const isSelected = item.id === selectedSolutionId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSolutionId(item.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A84FF] text-white shadow-md'
                    : 'bg-white dark:bg-[#0B1B2B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#0A84FF]'}`} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Deep-Dive Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info: Industry & Problem / Solution Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF]">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                    Domain Focus &middot; {currentSolution.industry}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {currentSolution.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {currentSolution.summary}
              </p>

              {/* Problem vs Solution Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-semibold text-xs mb-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs text-rose-900/80 dark:text-rose-300/80 leading-relaxed">
                    {currentSolution.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-semibold text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Our Solution</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                    {currentSolution.solution}
                  </p>
                </div>
              </div>

              {/* Core Features */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Solution Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {currentSolution.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Tangible Outcomes & Call To Action */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-50 dark:bg-[#07121F] p-6 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono text-[#0A84FF] font-semibold block mb-3">
                  Direct Business Outcomes
                </span>
                <ul className="space-y-3 mb-6">
                  {currentSolution.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4 mb-6">
                  <span className="text-[11px] font-mono text-slate-400 block mb-2">
                    Recommended Technical Architecture
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSolution.recommendedTech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onStartProject(currentSolution.title)}
                className="w-full py-3 px-4 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discuss {currentSolution.title} Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
