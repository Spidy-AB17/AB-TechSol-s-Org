import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { ProjectItem } from '../../types';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ProjectsViewProps {
  onSelectProject: (project: ProjectItem) => void;
  onStartProject: (projectTitle?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onSelectProject,
  onStartProject,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered =
    filterType === 'all'
      ? projectsData
      : projectsData.filter((p) => p.badge === filterType);

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Portfolio & Systems
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Engineered Systems & Prototypes
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Real architectural prototypes and systems developed by AB TechSol. In adherence to our transparency commitment, every project is explicitly labeled as a "Concept Project" or "Demo Project" until full production enterprise deployment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#0A84FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Prototypes ({projectsData.length})
          </button>
          <button
            onClick={() => setFilterType('Concept Project')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'Concept Project'
                ? 'bg-[#0A84FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Concept Projects
          </button>
          <button
            onClick={() => setFilterType('Demo Project')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'Demo Project'
                ? 'bg-[#0A84FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Demo Systems
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 hover:border-[#0A84FF]/60 dark:hover:border-[#0A84FF]/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Visual Mockup Header */}
              <div className="relative h-48 bg-gradient-to-br from-slate-900 to-[#07121F] p-5 flex flex-col justify-between overflow-hidden border-b border-slate-200 dark:border-slate-800">
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, ${project.accentColor} 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-300">
                    {project.industry}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[#00E5FF]">
                    {project.badge}
                  </span>
                </div>

                <div className="relative z-10 my-auto text-center">
                  <div className="text-2xl font-black font-display tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                    {project.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    {project.type}
                  </div>
                </div>

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

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                    {project.name} &mdash; {project.type}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
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
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onStartProject(project.name)}
                    className="text-[11px] font-mono text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Build Similar &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
