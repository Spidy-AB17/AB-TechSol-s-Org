import React, { useState } from 'react';
import { technologiesData } from '../../data/technologiesData';
import { TechItem } from '../../types';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Databases' },
    { id: 'ai-ml', label: 'AI & ML' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'tools', label: 'Tools & Design' },
  ];

  const filtered =
    selectedCategory === 'all'
      ? technologiesData
      : technologiesData.filter((t) => t.category === selectedCategory);

  return (
    <section id="technologies-section" className="py-24 bg-[#F5F8FC] dark:bg-[#081524] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Engineering Toolbox
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Modern, Maintainable Technologies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            We deliberately select open, production-hardened technologies with thriving ecosystems, ensuring your software remains serviceable and fast for years to come.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0A84FF] text-white shadow-sm'
                  : 'bg-white dark:bg-[#0B1B2B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-[#0B1B2B] border border-slate-200/80 dark:border-slate-800 hover:border-[#0A84FF]/60 dark:hover:border-[#0A84FF]/60 shadow-sm hover:shadow transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#0A84FF] font-semibold">
                    {item.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-sm font-bold font-display text-slate-900 dark:text-white">
                  {item.name}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {item.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
