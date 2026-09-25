import React, { useState } from 'react';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Lightbulb, 
  Users, 
  HeartHandshake, 
  GraduationCap, 
  Compass,
  ArrowRight,
  Code2,
  Download,
  Check,
  Sparkles,
  Layers
} from 'lucide-react';
import { Logo } from '../brand/Logo';
import { AB_TECHSOL_SVG } from '../../data/logoSvg';

interface AboutViewProps {
  onStartProject: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartProject }) => {
  const [downloadCopied, setDownloadCopied] = useState(false);

  const handleDownloadSvg = () => {
    const blob = new Blob([AB_TECHSOL_SVG], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ab-techsol-official-logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadCopied(true);
    setTimeout(() => setDownloadCopied(false), 3000);
  };
  const values = [
    { title: 'Innovation', desc: 'Seeking smarter, more efficient architectural solutions rather than accepting traditional friction.', icon: Lightbulb },
    { title: 'Quality', desc: 'Writing clean, typed, modular code designed to survive production stresses.', icon: ShieldCheck },
    { title: 'Integrity', desc: 'Honest technical advisement. We tell clients when an idea does not require custom code.', icon: Target },
    { title: 'Transparency', desc: 'Clear roadmaps, visible code repositories, and zero hidden proprietary traps.', icon: Eye },
    { title: 'Client Success', desc: 'Measuring engineering success by how much operational time or money our software saves.', icon: HeartHandshake },
    { title: 'Continuous Learning', desc: 'Constantly tracking emerging technologies to separate genuine utility from empty hype.', icon: GraduationCap },
    { title: 'Long-Term Thinking', desc: 'Architecting databases and codebases that can gracefully grow over 5+ years.', icon: Compass },
  ];

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-3">
            Company Story & Principles
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
            Building Technology That Solves Real Problems.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            AB TechSol was founded on a simple premise: software engineering should be measured by business utility, not technological complexity. We build modern digital products that turn ideas into scalable operational reality.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0A84FF] font-bold block mb-2">
              Our Mission
            </span>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
              "To empower businesses with efficient, innovative, and user-focused digital solutions."
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We partner with organizations to identify operational friction, design intuitive digital interfaces, and build resilient software that enables teams to focus on growth.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] font-bold block mb-2">
              Our Vision
            </span>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
              "To become a trusted technology partner known for quality, creativity, and long-term impact."
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We strive to set the standard for high-integrity software development in India and internationally, demonstrating that authentic craftsmanship and transparent partnerships endure.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
              Foundational Beliefs
            </span>
            <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white dark:bg-[#0B1B2B] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Philosophy */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#F8FAFC] dark:bg-[#081524] border border-slate-200 dark:border-slate-800 mb-20">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0A84FF] font-bold block mb-2">
              Engineering Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white mb-4">
              We Solve Business Problems, Not Fashionable Trends
            </h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                In the technology industry, companies often default to whatever stack is currently trending on developer forums. At AB TechSol, we take the opposite stance:
              </p>
              <p className="font-semibold text-slate-900 dark:text-white">
                "The process is: Problem &rarr; Strategy &rarr; Design &rarr; Technology &rarr; Development &rarr; Deployment &rarr; Support &rarr; Growth."
              </p>
              <p>
                We prioritize simplicity, strict type-checking, clean database indexes, and modular component design over hyper-complex architectures that nobody can maintain.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0A84FF] to-[#00E5FF] p-1 shadow-lg mb-4 flex items-center justify-center">
                <div className="w-full h-full bg-[#07121F] rounded-xl flex items-center justify-center text-white font-display font-extrabold text-3xl">
                  AB
                </div>
              </div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                AB
              </h2>
              <div className="text-xs font-mono text-[#0A84FF] font-semibold mt-0.5">
                Founder / Technology Lead
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                AB TechSol &middot; Software & Digital Solutions
              </div>
            </div>

            <div className="md:col-span-8 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                As Founder and Technology Lead, AB oversees system architecture, technical strategy, and engineering quality across all client engagements.
              </p>
              <p>
                With a focus on full-stack application architecture, database engineering, and practical AI implementations, the objective remains centered on engineering digital products that provide quantifiable operational value to organizations.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <strong>Authenticity Standard:</strong> AB TechSol operates with complete transparency. We do not manufacture fictitious employee counts, awards, or fabricated testimonials. Every client milestone is verifiable.
              </div>
            </div>
          </div>
        </div>

        {/* Brand Identity & Official Logo Assets Showcase */}
        <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00E5FF] tracking-wider uppercase mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Visual Identity & Brand Architecture</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Official AB TechSol Brand Mark
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Interlocking slanted monogram seamlessly uniting the dynamic ascending letter <strong>A</strong> with the precision dual loops of <strong>B</strong> in electric cyan-to-azure gradients, representing cutting-edge engineering and agile digital transformation.
              </p>
            </div>

            <button
              onClick={handleDownloadSvg}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold shadow flex items-center gap-2 transition-all cursor-pointer shrink-0 self-start md:self-auto"
            >
              {downloadCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>SVG Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#00E5FF] dark:text-[#0A84FF]" />
                  <span>Download Official Vector (.SVG)</span>
                </>
              )}
            </button>
          </div>

          {/* Logo Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Primary Horizontal */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[160px] text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 mb-4 tracking-wider">
                Primary Horizontal Lockup
              </span>
              <Logo variant="horizontal" size="md" />
            </div>

            {/* Stacked Emblem */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[160px] text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 mb-4 tracking-wider">
                Stacked Executive Emblem
              </span>
              <Logo variant="stacked" size="md" />
            </div>

            {/* Standalone Symbol / App Icon */}
            <div className="p-6 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[160px] text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 mb-4 tracking-wider">
                Digital Mark / App Favicon
              </span>
              <Logo variant="symbol" size="lg" />
            </div>
          </div>

          {/* Color Matrix */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">Official Brand Palette:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5FF]" />
              <span>Cyber Cyan (#00F5FF)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0A84FF]" />
              <span>Azure Blue (#0A84FF)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#07121F]" />
              <span>Obsidian Core (#07121F)</span>
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onStartProject}
            className="px-7 py-3.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Partner With AB TechSol</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
