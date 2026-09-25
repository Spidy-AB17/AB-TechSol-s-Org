import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import { PageId } from '../../types';
import { SEOGuideModal } from '../common/SEOGuideModal';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Layers,
  ExternalLink,
  Search,
  Globe
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenService: (serviceId: string) => void;
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenService,
  onOpenEstimator,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [isSEOModalOpen, setIsSEOModalOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const handleLink = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#07121F] text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 relative z-10 transition-colors">
      {/* Upper Pre-footer Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B1B2B]/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#0A84FF] dark:text-[#00E5FF] font-mono block mb-1 font-semibold">
              Technology Partnership
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Ready to engineer your next digital solution?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              From responsive websites and enterprise apps to practical AI systems, we transform ideas into resilient software.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenEstimator}
              className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-[#0A84FF] text-slate-800 dark:text-white text-xs font-semibold transition-all hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer shadow-xs"
            >
              Estimate Project
            </button>
            <button
              onClick={() => handleLink('contact')}
              className="px-5 py-2.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo variant="full" size="md" theme="adaptive" onClick={() => handleLink('home')} />
            
            <p className="text-sm text-slate-700 dark:text-slate-400 mt-4 leading-relaxed max-w-sm font-medium">
              "Your Vision. Our Technology. Real Solutions."
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-sm">
              AB TechSol builds modern websites, applications, custom software, and AI-powered solutions that help businesses operate smarter and grow faster.
            </p>

            {/* Direct Contact Details */}
            <div className="mt-6 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0A84FF] shrink-0" />
                <a href="mailto:abtechsol660@gmail.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  abtechsol660@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00B4D8] dark:text-[#00E5FF] shrink-0" />
                <a href="tel:+918861375377" className="hover:text-slate-900 dark:hover:text-white transition-colors font-mono">
                  +91 8861375377
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0A84FF] shrink-0" />
                <span>Hassan, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="https://wa.me/918861375377?text=Hello%20AB%20TechSol,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>WhatsApp: 8861375377</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column: Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onOpenService('web-development')}
                  className="hover:text-[#0A84FF] dark:hover:text-white transition-colors text-left"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenService('web-application-development')}
                  className="hover:text-[#0A84FF] dark:hover:text-white transition-colors text-left"
                >
                  Web Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenService('mobile-app-development')}
                  className="hover:text-[#0A84FF] dark:hover:text-white transition-colors text-left"
                >
                  Mobile Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenService('custom-software-development')}
                  className="hover:text-[#0A84FF] dark:hover:text-white transition-colors text-left"
                >
                  Custom Software & ERP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenService('ai-machine-learning')}
                  className="hover:text-[#0A84FF] dark:hover:text-white transition-colors text-left"
                >
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenService('cloud-deployment')}
                  className="hover:text-[#0A84FF] dark:hover:text-white transition-colors text-left"
                >
                  Cloud & Deployment
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Company & Solutions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => handleLink('about')} className="hover:text-[#0A84FF] dark:hover:text-white transition-colors">
                  About AB TechSol
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('projects')} className="hover:text-[#0A84FF] dark:hover:text-white transition-colors">
                  Projects & Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('solutions')} className="hover:text-[#0A84FF] dark:hover:text-white transition-colors">
                  Industry Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('process')} className="hover:text-[#0A84FF] dark:hover:text-white transition-colors">
                  Development Process
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('careers')} className="hover:text-[#0A84FF] dark:hover:text-white transition-colors">
                  Careers & Culture
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('pricing')} className="hover:text-[#0A84FF] dark:hover:text-white transition-colors">
                  Pricing & Packages
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Resources & Newsletter */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold mb-4">
              Insights & Updates
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Subscribe to our engineering newsletter for occasional architecture blueprints and practical tech insights.
            </p>
            {newsletterSubscribed ? (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Thank you. You're subscribed to technical updates.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#0A84FF] shadow-xs"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#0A84FF] hover:bg-[#0070E0] rounded text-white text-xs font-medium transition-colors"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-500 block">
                  Zero spam. Unsubscribe anytime.
                </span>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <span className="text-xs uppercase font-mono text-slate-500 dark:text-slate-400 block mb-2 font-semibold">Connect</span>
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A84FF] transition-colors"
                >
                  LinkedIn
                </a>
                <span>&middot;</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A84FF] transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Internal Management Demo Link */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AB TechSol. All rights reserved.</span>
            <span>&middot;</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium">"Your Vision. Our Technology. Real Solutions."</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => handleLink('privacy')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleLink('terms')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => handleLink('cookies')} className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
              Cookie Policy
            </button>

            {/* Google Search & SEO Guide Button */}
            <button
              onClick={() => setIsSEOModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0A84FF] dark:hover:text-[#00E5FF] hover:border-[#0A84FF] transition-colors shadow-xs cursor-pointer"
              title="Google Search Console, Keywords & Ranking Setup"
            >
              <Search className="w-3.5 h-3.5 text-[#0A84FF] dark:text-[#00E5FF]" />
              <span>Google Search &amp; SEO</span>
            </button>

            {/* Admin Hub & Database Management Link */}
            <button
              onClick={() => handleLink('admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0A84FF] dark:hover:text-white hover:border-[#0A84FF] transition-colors shadow-xs"
              title="Admin Control Panel & Supabase CRM"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Admin Hub & Leads (Supabase)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Google Search & SEO Guide Modal */}
      <SEOGuideModal isOpen={isSEOModalOpen} onClose={() => setIsSEOModalOpen(false)} />
    </footer>
  );
};
