import React from 'react';
import { 
  Code, 
  Layers, 
  Eye, 
  TrendingUp, 
  Headphones 
} from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const benefits = [
    {
      title: 'Custom-Built Solutions',
      desc: 'Engineered specifically for your unique operational workflows, not forced into generic website templates.',
      icon: Code,
    },
    {
      title: 'Modern Technology',
      desc: 'Built using production-proven, maintainable modern stacks like React, TypeScript, Node.js, and Python.',
      icon: Layers,
    },
    {
      title: 'Transparent Process',
      desc: 'Clear scope roadmaps, regular bi-weekly sprint demos, and open communication with direct engineering leads.',
      icon: Eye,
    },
    {
      title: 'Scalable Architecture',
      desc: 'Constructed to handle business growth smoothly from initial launch to high-volume multi-user enterprise loads.',
      icon: TrendingUp,
    },
    {
      title: 'Long-Term Support',
      desc: 'Continuous post-deployment monitoring, security patch maintenance, and ongoing evolutionary updates.',
      icon: Headphones,
    },
  ];

  return (
    <section className="bg-white dark:bg-[#07121F] border-y border-slate-200 dark:border-slate-800/80 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-start p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
