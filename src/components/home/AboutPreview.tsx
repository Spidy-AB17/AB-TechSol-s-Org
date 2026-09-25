import React from 'react';
import { PageId } from '../../types';
import { ArrowRight, CheckCircle2, Shield, Target, Award } from 'lucide-react';

interface AboutPreviewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F8FC] dark:bg-[#0B1B2B]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-3">
              About AB TechSol
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
              Technology Built Around Your Business
            </h2>

            <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p>
                At AB TechSol, we believe software engineering is fundamentally about understanding business challenges before writing code. We do not sell generic templates or push trendy technologies that leave you stranded with technical debt.
              </p>
              <p>
                Our core philosophy is straightforward: <strong className="text-slate-900 dark:text-white font-semibold">We understand your business problem, design the right digital solution, build it with modern technology, deploy it securely, and continue supporting it as your business grows.</strong>
              </p>
            </div>

            {/* Differentiator Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold text-sm mb-1.5">
                  <Target className="w-4 h-4 text-[#0A84FF]" />
                  <span>Business-Driven Strategy</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every feature is weighed against concrete operational utility, customer acquisition, or labor savings.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-semibold text-sm mb-1.5">
                  <Shield className="w-4 h-4 text-[#00E5FF]" />
                  <span>Transparent Engineering</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct communication with developers, complete code ownership, and no locked proprietary traps.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('process')}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0A84FF] dark:hover:text-[#00E5FF] transition-colors cursor-pointer"
              >
                See How We Work &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Visual Infographic of the Problem-to-Growth Cycle */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                  <span className="text-[11px] font-mono text-[#0A84FF] uppercase tracking-wider block">
                    Our Engagement Flow
                  </span>
                  <div className="text-base font-bold font-display text-slate-900 dark:text-white">
                    The Problem-to-Growth Lifecycle
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#0A84FF]/10 flex items-center justify-center text-[#0A84FF]">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              {/* Step Sequence */}
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Problem Discovery', desc: 'Identify bottlenecks, business objectives, and workflow needs.' },
                  { step: '02', title: 'Architectural Blueprint', desc: 'Map schemas, system flow, security guards, and design language.' },
                  { step: '03', title: 'Modern Construction', desc: 'Write clean, modular, typed code with continuous integration.' },
                  { step: '04', title: 'Secure Deployment', desc: 'Deploy containerized builds with SSL, CDN, and backup routines.' },
                  { step: '05', title: 'Continuous Partnership', desc: 'Support, monitor, and scale as your user base expands.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <span className="font-mono text-xs font-bold text-[#0A84FF] bg-[#0A84FF]/10 px-2 py-0.5 rounded shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero guesswork &middot; Every milestone is tested & verifiable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
