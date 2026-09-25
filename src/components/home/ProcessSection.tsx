import React, { useState } from 'react';
import { 
  Search, 
  Map, 
  PenTool, 
  Code, 
  CheckCircle, 
  Rocket, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface ProcessSectionProps {
  onStartProject: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartProject }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Understand the business problem and operational reality.',
      desc: 'We conduct in-depth discovery sessions with your stakeholders to map user workflows, identify operational bottlenecks, and establish measurable project benchmarks.',
      deliverables: ['Stakeholder interview summaries', 'Target user personas', 'Requirement traceability matrix'],
      icon: Search,
    },
    {
      num: '02',
      title: 'Plan',
      tagline: 'Define technical architecture, scope boundaries, and sprint roadmaps.',
      desc: 'Our senior engineers map the database entity relationships, choose the optimal technology stack, define API contracts, and structure the sprint schedule.',
      deliverables: ['Database ER diagrams', 'System architecture specification', 'Itemized sprint roadmap'],
      icon: Map,
    },
    {
      num: '03',
      title: 'Design',
      tagline: 'Create intuitive user journeys and interactive prototypes.',
      desc: 'We design clear wireframes and high-fidelity interactive prototypes in Figma, establishing responsive layout rules and WCAG AA accessibility standards.',
      deliverables: ['Clickable Figma prototype', 'Design system tokens', 'Responsive layout specifications'],
      icon: PenTool,
    },
    {
      num: '04',
      title: 'Develop',
      tagline: 'Build clean, strictly typed, modular code.',
      desc: 'Our full-stack team writes modular TypeScript, React, and backend code in agile two-week sprints with automated linting, unit tests, and continuous integration.',
      deliverables: ['Modular component codebase', 'Secure REST/GraphQL endpoints', 'Bi-weekly demo builds'],
      icon: Code,
    },
    {
      num: '05',
      title: 'Test',
      tagline: 'Rigorous quality assurance, cross-device verification, and security testing.',
      desc: 'We subject the application to cross-browser testing, mobile device viewport validation, simulated edge-case inputs, and OWASP security vulnerability assessments.',
      deliverables: ['Automated test coverage reports', 'Cross-browser compatibility audit', 'Performance benchmark report'],
      icon: CheckCircle,
    },
    {
      num: '06',
      title: 'Deploy',
      tagline: 'Production rollout with zero downtime and global edge CDN.',
      desc: 'We package the software into Docker containers, configure your cloud infrastructure, install SSL certificates, set up automated daily backups, and launch.',
      deliverables: ['Production cloud setup', 'Automated CI/CD pipelines', 'Complete source code transfer'],
      icon: Rocket,
    },
    {
      num: '07',
      title: 'Support',
      tagline: 'Continuous monitoring, security updates, and evolution.',
      desc: 'Post-launch, our team monitors server health, applies security patches, tracks real-world user performance, and provides scheduled engineering hours for iterations.',
      deliverables: ['24/7 uptime monitoring alerts', 'Scheduled security maintenance', 'Priority bug resolution'],
      icon: ShieldCheck,
    },
  ];

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section id="process-section" className="py-24 bg-white dark:bg-[#07121F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
              Our Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              The 7-Step Engineering Lifecycle
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              A structured, transparent roadmap from initial requirement discovery to long-term post-deployment support.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Let's Build Your Solution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Indicator Nav Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-10">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0A84FF] text-white border-[#0A84FF] shadow-md'
                    : 'bg-[#F8FAFC] dark:bg-[#0B1B2B] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-blue-100' : 'text-[#0A84FF]'}`}>
                    {step.num}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-white' : 'bg-slate-300 dark:bg-slate-700'}`} />
                </div>
                <div className="text-xs font-bold font-display truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Highlight Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF]">
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#0A84FF]">
                    Phase {current.num} of 07
                  </span>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {current.num} &mdash; {current.title}
                  </h3>
                </div>
              </div>

              <div className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
                {current.tagline}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {current.desc}
              </p>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2.5">
                  Phase Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {current.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-2.5 rounded-lg bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center text-center p-6 bg-white dark:bg-[#07121F] rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Predictable Delivery
              </span>
              <div className="text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-2">
                Zero Guesswork
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                Every stage requires explicit milestone sign-off before progressing to the next.
              </p>
              <button
                onClick={onStartProject}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all cursor-pointer"
              >
                Initiate Project Discovery
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
