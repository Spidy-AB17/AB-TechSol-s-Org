import React from 'react';
import { 
  Briefcase, 
  Code2, 
  MessageSquare, 
  TrendingUp, 
  Layers, 
  HeartHandshake 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const differentiators = [
    {
      title: 'Business-First Approach',
      desc: 'We do not push technology for its own sake. Stacks and architectures are chosen strictly based on what delivers optimal ROI for your operational reality.',
      icon: Briefcase,
    },
    {
      title: '100% Custom Development',
      desc: 'Every system is crafted from clean code designed around your workflow rules, rather than squeezing your team into fragile, generic templates.',
      icon: Code2,
    },
    {
      title: 'Transparent Communication',
      desc: 'No technical smoke and mirrors. You receive bi-weekly sprint demos, understandable progress reports, and direct access to your engineering leads.',
      icon: MessageSquare,
    },
    {
      title: 'Scalable Architecture',
      desc: 'We engineer modular components and strictly typed databases that handle initial launch seamlessly while remaining easily extensible for years.',
      icon: TrendingUp,
    },
    {
      title: 'Modern Technology',
      desc: 'Built using reliable, production-tested technologies (React, TypeScript, Node.js, Python, PostgreSQL) that avoid dead-end legacy baggage.',
      icon: Layers,
    },
    {
      title: 'Long-Term Partnership',
      desc: 'Our relationship does not terminate at deployment. We stand behind our code with proactive maintenance, monitoring, and ongoing refinements.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 bg-[#F5F8FC] dark:bg-[#07121F] border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            The AB TechSol Distinction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Why Businesses Choose AB TechSol
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            We are a dedicated technology partner, not just a freelance shop. Here is how our engineering discipline directly benefits your bottom line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-white dark:bg-[#0B1B2B] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-[11px] font-mono text-[#0A84FF]">
                  <span>Pillar 0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
