import React from 'react';
import { projectsData } from '../../data/projectsData';
import { ProjectItem } from '../../types';
import { ArrowRight, Layers, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface FeaturedProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
  onNavigateProjects: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
  onNavigateProjects,
}) => {
  return (
    <section id="portfolio-section" className="py-24 bg-white dark:bg-[#07121F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
              Portfolio & Engineering Showcases
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Featured Systems & Case Studies
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Explore our architectural builds and proof-of-concept solutions. We maintain complete transparency: conceptual and demo prototypes are clearly designated.
            </p>
          </div>

          <button
            onClick={onNavigateProjects}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0A84FF] hover:text-[#0070E0] dark:hover:text-[#00E5FF] transition-colors cursor-pointer"
          >
            <span>View All Engineering Prototypes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.slice(0, 3).map((project) => {
            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 hover:border-[#0A84FF]/60 dark:hover:border-[#0A84FF]/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Visual Header / Mockup Representation Container */}
                <div className="relative h-48 bg-gradient-to-br from-slate-900 to-[#07121F] p-5 flex flex-col justify-between overflow-hidden border-b border-slate-200 dark:border-slate-800">
                  {/* Subtle Tech Pattern */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, ${project.accentColor} 1px, transparent 0)`,
                      backgroundSize: '20px 20px',
                    }}
                  />

                  {/* Top Metadata */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-300">
                      {project.industry}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[#00E5FF]">
                      {project.badge}
                    </span>
                  </div>

                  {/* Centered Graphic Identity */}
                  <div className="relative z-10 my-auto flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-black font-display tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                        {project.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        {project.type}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Tech Tags */}
                  <div className="relative z-10 flex items-center gap-1.5 overflow-hidden">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                      {project.name} &mdash; {project.type}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {project.summary}
                    </p>

                    <div className="space-y-1.5 mb-6 text-xs text-slate-600 dark:text-slate-300">
                      {project.goals.slice(0, 2).map((goal, gIdx) => (
                        <div key={gIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A84FF] group-hover:text-[#0070E0] dark:group-hover:text-[#00E5FF] transition-colors cursor-pointer"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <span className="text-[11px] font-mono text-slate-400">
                      Verified Architecture
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
