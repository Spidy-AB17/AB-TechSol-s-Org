import React from 'react';
import { ProjectItem } from '../../types';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ExternalLink,
  Target,
  Sparkles
} from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartProject: (projectType?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#07121F]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#0A84FF] font-semibold uppercase tracking-wider">
              Engineering Case Study &middot; {project.industry}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#00E5FF] border border-slate-200 dark:border-slate-700">
              {project.badge}
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-900 dark:text-slate-100">
          {/* Title Area */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              {project.name} &mdash; {project.type}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Business Challenge */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-xs uppercase tracking-wider font-mono mb-2">
              <Target className="w-4 h-4 text-[#0A84FF]" />
              <span>Business Context & Operational Challenge</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.clientChallenge}
            </p>
          </div>

          {/* Project Goals */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Core Engineering Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#081524] border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & UX Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#0A84FF] font-semibold block mb-2">
                System Architecture
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.architecture}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#00E5FF] font-semibold block mb-2">
                UX & Interaction Strategy
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.uxStrategy}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Verified Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Development Highlights */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Key Engineering Milestones
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {project.developmentHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] shrink-0 mt-1.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Outcomes */}
          <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-semibold mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Test Outcomes & Benchmark Results</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90">
              {project.outcomes.map((out, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-slate-50 dark:bg-[#081524] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Looking to engineer a similar solution for your business?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartProject(project.name);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
