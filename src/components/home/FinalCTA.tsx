import React from 'react';
import { ArrowRight, MessageSquare, Calculator } from 'lucide-react';

interface FinalCTAProps {
  onStartProject: () => void;
  onOpenEstimator: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onStartProject,
  onOpenEstimator,
}) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-[#F5F8FC] dark:from-[#07121F] dark:via-[#0B1B2B] dark:to-[#07121F] text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0A84FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-3">
          Get Started Today
        </span>

        <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-6">
          Have an Idea? Let's Build It.
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
          Tell us what you're trying to achieve. We'll help you turn the idea into a practical digital solution engineered with modern technology, scalable architecture, and transparent communication.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartProject}
            className="px-8 py-3.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] active:scale-95 text-white text-sm font-semibold shadow-lg hover:shadow-[#0A84FF]/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/918861375377?text=Hello%20AB%20TechSol,%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-white dark:bg-[#0B1B2B] text-slate-800 dark:text-slate-200 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            <span>Talk to Us via WhatsApp</span>
          </a>

          <button
            onClick={onOpenEstimator}
            className="px-6 py-3.5 text-xs font-semibold text-[#0A84FF] dark:text-[#00E5FF] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Use Interactive Project Estimator &rarr;</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>&bull; Response within 24 business hours</span>
          <span>&bull; Direct engineering consultation</span>
          <span>&bull; Zero obligation</span>
        </div>
      </div>
    </section>
  );
};
