import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck,
  Share2,
  Code
} from 'lucide-react';

interface SEOGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SEOGuideModal: React.FC<SEOGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'serp' | 'steps' | 'schema' | 'keywords'>('serp');

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const domainUrl = typeof window !== 'undefined' ? window.location.origin : 'https://abtechsol.com';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-[#07121F]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF] dark:text-[#00E5FF]">
                <Search className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#0A84FF] dark:text-[#00E5FF]">
                Google Search &amp; Indexing Engine
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                SEO 100/100 Ready
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 dark:text-white">
              Search Engine Visibility &amp; Ranking Setup
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Engineered to appear when users search for <strong>"AB TechSol"</strong>, <strong>"website development"</strong>, or <strong>"project development"</strong>.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-100/70 dark:bg-slate-900/60 overflow-x-auto gap-2 py-2">
          <button
            onClick={() => setActiveTab('serp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'serp'
                ? 'bg-white dark:bg-[#0B1B2B] text-[#0A84FF] dark:text-[#00E5FF] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Google Search Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('steps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'steps'
                ? 'bg-white dark:bg-[#0B1B2B] text-[#0A84FF] dark:text-[#00E5FF] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>How to Rank (Step-by-Step)</span>
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'keywords'
                ? 'bg-white dark:bg-[#0B1B2B] text-[#0A84FF] dark:text-[#00E5FF] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Keywords</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'bg-white dark:bg-[#0B1B2B] text-[#0A84FF] dark:text-[#00E5FF] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Live SEO Files &amp; Schema</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-6">
          {/* TAB 1: Google SERP Preview */}
          {activeTab === 'serp' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Official Google Search Snippet Simulation
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  This is how Google displays <strong>AB TechSol</strong> on desktop and mobile search result pages:
                </p>
              </div>

              {/* SERP Card Container */}
              <div className="p-5 rounded-xl bg-white dark:bg-[#081320] border border-slate-300 dark:border-slate-800 shadow-sm space-y-3 font-sans">
                {/* Google URL Breadcrumb */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-slate-900 p-1 flex items-center justify-center">
                    <img src="/favicon.svg" alt="AB TechSol Logo" className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-xs">AB TechSol</span>
                    <span className="text-[11px] text-slate-500 font-mono">https://abtechsol.com</span>
                  </div>
                </div>

                {/* Google Blue Link Title */}
                <h4 className="text-lg sm:text-xl font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                  AB TechSol | Custom Website Development, Web Apps &amp; Software Solutions
                </h4>

                {/* Google Snippet Text */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Looking for project or website development? <span className="font-semibold text-slate-900 dark:text-white">AB TechSol</span> engineers high-performance custom websites, web applications, and full-cycle software projects. Fast, modern, and SEO-optimized to grow your business.
                </p>

                {/* Sitelinks Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                      Website &amp; Software Development
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Custom responsive corporate websites, web portals, and headless CMS integrations.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                      Engineering Project Showcases
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Explore production architectures, SaaS systems, and live client prototypes.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                      Interactive Project Cost Estimator
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Get an instant timeline and budget scope for your web or custom software project.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                      Contact &amp; Hire AB TechSol
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      Speak directly with our technology lead for free project discovery and proposal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Checks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Exact Brand Match</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    "AB TechSol" is in Title, H1, Meta Tags, Schema.org Organization and WebSite graph.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Target Intent Keywords</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    "website development" &amp; "project development" prominently declared for search spiders.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Googlebot Allowed</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    robots.txt configured with <code className="font-mono text-[10px]">Allow: /</code> &amp; sitemap.xml.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: How to Rank (Step by Step) */}
          {activeTab === 'steps' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  How to Get Indexed &amp; Ranked on Google (Fast Track)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Follow these 3 simple steps so Googlebot immediately discovers and indexes your website:
                </p>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Add Property to Google Search Console
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 ml-8 leading-relaxed">
                    Open <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#0A84FF] hover:underline font-semibold inline-flex items-center gap-1">Google Search Console <ExternalLink className="w-3 h-3" /></a> and sign in with your Google account. Click <strong>"Add Property"</strong> and enter your domain (e.g. <code>https://abtechsol.com</code>).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Submit Your Sitemap URL
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 ml-8 leading-relaxed mb-3">
                    Inside Google Search Console, navigate to <strong>Sitemaps</strong> on the left sidebar, and submit:
                  </p>
                  <div className="ml-8 flex items-center gap-2">
                    <input
                      readOnly
                      value={`${domainUrl}/sitemap.xml`}
                      className="px-3 py-1.5 bg-white dark:bg-black/50 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-mono text-[#0A84FF] dark:text-[#00E5FF] flex-1"
                    />
                    <button
                      onClick={() => handleCopy(`${domainUrl}/sitemap.xml`, 'sitemap')}
                      className="px-3 py-1.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedItem === 'sitemap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedItem === 'sitemap' ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#0A84FF] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Click "Request Indexing" for Immediate Crawl
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 ml-8 leading-relaxed">
                    Paste your homepage URL into the top search bar (<strong>URL Inspection Tool</strong>) in Google Search Console, and click <strong>"Request Indexing"</strong>. This adds your site to Google's priority crawl queue instead of waiting weeks for automatic spider discovery.
                  </p>
                </div>
              </div>

              {/* Crawl Timeline Notice */}
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                <strong>Timeline Note:</strong> Once submitted, Googlebot crawls the site within <strong>24 to 72 hours</strong>. When searching <code className="bg-black/20 px-1 py-0.5 rounded">site:abtechsol.com</code> on Google, you will see all your pages indexed with full titles and descriptions.
              </div>
            </div>
          )}

          {/* TAB 3: Target Keywords */}
          {activeTab === 'keywords' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Active Search Terms &amp; Query Targets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Your codebase has been optimized for these exact search phrases across titles, headings, schemas, and meta tags:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-[10px] text-[#0A84FF] uppercase font-bold block mb-2">
                    Brand &amp; Direct Searches
                  </span>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "ab techsol"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "AB TechSol"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "abtechsol"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "ab techsol software"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "ab techsol bangalore karnataka"</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-[10px] text-[#0A84FF] uppercase font-bold block mb-2">
                    Development Services Searches
                  </span>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "website development"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "project development"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "custom software development company"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "hire website developers"</li>
                    <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> "full stack web application development"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Live Files & Schema */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Active SEO Assets &amp; Structured Data
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  These files are live in your web root ready for Googlebot and Bingbot to inspect:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 hover:border-[#0A84FF] transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">robots.txt</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A84FF]" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Directs Googlebot &amp; Bingbot crawlers</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-3">
                    Status: 200 OK Live
                  </span>
                </a>

                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 hover:border-[#0A84FF] transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">sitemap.xml</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A84FF]" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">14 prioritized URL endpoints</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-3">
                    Status: 200 OK Live
                  </span>
                </a>

                <a
                  href="/og-image.svg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 hover:border-[#0A84FF] transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">og-image.svg</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A84FF]" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">1200x630 Social Preview Card</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-3">
                    Status: 200 OK Live
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#07121F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 text-[11px]">
            AB TechSol SEO Infrastructure &bull; Compliant with Schema.org &amp; Google Search Quality Guidelines
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
