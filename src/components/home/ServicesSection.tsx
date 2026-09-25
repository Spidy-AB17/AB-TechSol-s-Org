import React, { useState } from 'react';
import { servicesData } from '../../data/servicesData';
import { 
  Globe, 
  Layout, 
  Smartphone, 
  Cpu, 
  Sparkles, 
  Palette, 
  Cloud, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  Check,
  Filter
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onStartProject: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onStartProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const iconMap: Record<string, React.ElementType> = {
    Globe,
    Layout,
    Smartphone,
    Cpu,
    Sparkles,
    Palette,
    Cloud,
    Compass,
    ShieldCheck,
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Engineering', label: 'Web & Mobile' },
    { id: 'Enterprise', label: 'Custom Software' },
    { id: 'Intelligent Systems', label: 'AI & Data' },
    { id: 'Infrastructure', label: 'Cloud & DevOps' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory || (activeCategory === 'Engineering' && (s.category === 'Engineering' || s.category === 'Applications' || s.category === 'Mobile')));

  return (
    <section id="services-section" className="py-24 bg-white dark:bg-[#07121F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
              Capabilities & Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              End-to-End Technology Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              From responsive brand portals and cloud web apps to bespoke enterprise software and high-utility AI models, we deliver production-grade solutions tailored to your business model.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white dark:bg-[#0B1B2B] text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => {
            const Icon = iconMap[service.iconName] || Globe;
            const isMarquee = index === 0 || index === 3;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B1B2B]/70 border border-slate-200/80 dark:border-slate-800 hover:border-[#0A84FF]/60 dark:hover:border-[#0A84FF]/60 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Service Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF] group-hover:bg-[#0A84FF] group-hover:text-white transition-all duration-300 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0A84FF] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Key Features List */}
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2.5">
                      Key Highlights
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0A84FF] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A84FF] group-hover:text-[#0070E0] dark:group-hover:text-[#00E5FF] transition-colors cursor-pointer"
                  >
                    <span>View Full Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onStartProject(service.id)}
                    className="text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Discuss &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
