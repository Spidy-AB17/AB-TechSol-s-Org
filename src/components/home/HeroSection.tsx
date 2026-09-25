import React, { useState } from 'react';
import { PageId } from '../../types';
import { 
  ArrowRight, 
  Terminal, 
  Layers, 
  Cpu, 
  Cloud, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Code2
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenEstimator,
}) => {
  const [activeModule, setActiveModule] = useState<'web' | 'enterprise' | 'ai' | 'cloud'>('web');

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#EBF3FC] via-[#F8FAFD] to-[#EBF3FC] dark:from-[#07121F] dark:via-[#0B1B2B] dark:to-[#07121F] text-slate-900 dark:text-white transition-colors">
      {/* Subtle background tech grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] text-[#0A84FF] dark:text-[#00E5FF] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Atmospheric lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0A84FF]/10 dark:bg-[#0A84FF]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-[#00B4D8]/10 dark:bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Value Tagline Marker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#0A84FF] dark:text-[#00E5FF] tracking-wider uppercase mb-5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0A84FF] dark:bg-[#00E5FF] animate-pulse" />
              <span>AB TechSol &bull; Custom Website &amp; Project Development</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-2xl text-balance">
              Your Vision.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] via-[#00B4D8] to-slate-900 dark:to-white">
                Our Technology.
              </span>{' '}
              Real Solutions.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
              Looking for website or project development? <strong className="font-semibold text-slate-900 dark:text-white">AB TechSol</strong> builds modern, high-speed websites, custom web applications, and tailor-made software solutions that help businesses dominate online and grow faster.
            </p>

            {/* Key Value Prop List */}
            <div className="mt-6 grid grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0A84FF] dark:text-[#00E5FF] shrink-0" />
                <span>Custom Website Development</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0A84FF] dark:text-[#00E5FF] shrink-0" />
                <span>Full-Cycle Project Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0A84FF] dark:text-[#00E5FF] shrink-0" />
                <span>100% Code &amp; IP Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#0A84FF] dark:text-[#00E5FF] shrink-0" />
                <span>Google Search &amp; SEO Engineered</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] active:scale-95 text-white text-sm font-semibold transition-all shadow-lg hover:shadow-[#0A84FF]/25 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-white/80 dark:bg-transparent text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-all hover:bg-white dark:hover:bg-slate-800/40 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore Our Services</span>
              </button>

              <button
                onClick={onOpenEstimator}
                className="w-full sm:w-auto px-4 py-3.5 text-xs text-[#0A84FF] dark:text-[#00E5FF] hover:underline flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-medium"
              >
                <span>Calculate Project Scope &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Original Digital Ecosystem Mockup */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl bg-white/95 dark:bg-[#081524]/90 border border-slate-200/90 dark:border-slate-700/80 p-5 shadow-xl dark:shadow-2xl backdrop-blur-xl">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    abtechsol.core.sys
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>SYSTEM OPERATIONAL</span>
                </div>
              </div>

              {/* Module Selector Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-[#06101B] border border-slate-200 dark:border-slate-800/80 rounded-lg mb-4 text-[11px] font-mono">
                <button
                  onClick={() => setActiveModule('web')}
                  className={`py-1.5 px-2 rounded font-medium transition-all text-center truncate cursor-pointer ${
                    activeModule === 'web'
                      ? 'bg-[#0A84FF] text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Web/App
                </button>
                <button
                  onClick={() => setActiveModule('enterprise')}
                  className={`py-1.5 px-2 rounded font-medium transition-all text-center truncate cursor-pointer ${
                    activeModule === 'enterprise'
                      ? 'bg-[#0A84FF] text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Enterprise
                </button>
                <button
                  onClick={() => setActiveModule('ai')}
                  className={`py-1.5 px-2 rounded font-medium transition-all text-center truncate cursor-pointer ${
                    activeModule === 'ai'
                      ? 'bg-[#0A84FF] text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  AI Engine
                </button>
                <button
                  onClick={() => setActiveModule('cloud')}
                  className={`py-1.5 px-2 rounded font-medium transition-all text-center truncate cursor-pointer ${
                    activeModule === 'cloud'
                      ? 'bg-[#0A84FF] text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Cloud/Ops
                </button>
              </div>

              {/* Interactive Module Display Area */}
              <div className="bg-slate-50/80 dark:bg-[#050C15] rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 min-h-[290px] flex flex-col justify-between">
                {activeModule === 'web' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">Architecture: React 19 + TypeScript</span>
                      <span className="text-[#0A84FF] dark:text-[#00E5FF] font-mono font-semibold">Load: 0.28s</span>
                    </div>
                    {/* Simulated Web Application Layout preview */}
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <div className="font-semibold text-slate-900 dark:text-white">Client Portal / Dashboard</div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-medium">
                          Sync Active
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px] my-2">
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-transparent">
                          <div className="text-slate-500 dark:text-slate-400 text-[10px]">Response Time</div>
                          <div className="font-bold text-slate-900 dark:text-white font-mono">18ms</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-transparent">
                          <div className="text-slate-500 dark:text-slate-400 text-[10px]">Lighthouse</div>
                          <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">99/100</div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-transparent">
                          <div className="text-slate-500 dark:text-slate-400 text-[10px]">SEO Score</div>
                          <div className="font-bold text-[#0A84FF] dark:text-[#00E5FF] font-mono">100%</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                        Engineered with strict zero-layout-shift (CLS: 0.0), responsive viewport math, and modern edge CDN distribution.
                      </p>
                    </div>
                  </div>
                )}

                {activeModule === 'enterprise' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">Core: PostgreSQL + Express + Docker</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">ACID Guaranteed</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <div className="font-semibold text-slate-900 dark:text-white">Enterprise BusinessHub Pipeline</div>
                        <span className="text-[10px] text-blue-700 dark:text-[#0A84FF] bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded font-medium">
                          Multi-Role (RBAC)
                        </span>
                      </div>
                      <div className="space-y-1.5 font-mono text-[11px]">
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/50">
                          <span className="text-slate-500 dark:text-slate-400">Inventory Sync</span>
                          <span className="text-slate-900 dark:text-white">Active (3 Warehouses)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/50">
                          <span className="text-slate-500 dark:text-slate-400">Invoice Engine</span>
                          <span className="text-emerald-600 dark:text-emerald-400">Automated GST PDF</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500 dark:text-slate-400">Audit Logging</span>
                          <span className="text-slate-900 dark:text-white">Immutable Trail (AES-256)</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                        Eliminates multi-app spreadsheet fragmentation with tailor-made role-based access.
                      </p>
                    </div>
                  </div>
                )}

                {activeModule === 'ai' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">Engine: Python FastAPI + PyTorch / RAG</span>
                      <span className="text-[#0A84FF] dark:text-[#00E5FF] font-mono font-semibold">Privacy Preserved</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <div className="font-semibold text-slate-900 dark:text-white">Document & Vision Intelligence</div>
                        <span className="text-[10px] text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded font-medium">
                          Inference Ready
                        </span>
                      </div>
                      <div className="bg-slate-900 dark:bg-[#03080F] p-2.5 rounded font-mono text-[10px] text-slate-200 dark:text-slate-300 space-y-1">
                        <div className="text-emerald-400">// Diagnostic Pipeline</div>
                        <div>Input: Multi-spectral leaf scan (AgroIntel)</div>
                        <div>Pathology: Leaf Blight Classified [94.8% conf]</div>
                        <div>Action: Automated irrigation & fertilizer delta dispatched</div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                        Pragmatic AI pipelines engineered for operational precision with zero customer data retention for training.
                      </p>
                    </div>
                  </div>
                )}

                {activeModule === 'cloud' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-mono">Infra: Docker + AWS/GCP + Nginx</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">99.9% Uptime Target</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <div className="font-semibold text-slate-900 dark:text-white">Automated Deployment Cluster</div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-medium">
                          Zero Downtime
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] my-2">
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-transparent">
                          <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Database Backup</span>
                          <span className="text-slate-900 dark:text-white font-mono">Daily Point-In-Time</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-transparent">
                          <span className="text-slate-500 dark:text-slate-400 text-[10px] block">SSL & DDoS</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Edge Shield Active</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                        Automated CI/CD pipelines via GitHub Actions ensuring push-to-deploy reliability with rollback safety.
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer status row */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0A84FF]" />
                    <span>Security: OWASP Standard</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#0A84FF] dark:text-[#00E5FF]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Edge Optimized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
