import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { PageId } from '../../types';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronDown, 
  ArrowRight,
  Calculator,
  Database,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, targetId?: string) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenEstimator: () => void;
  newEnquiriesCount?: number;
  isAdminAuthenticated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  darkMode,
  onToggleTheme,
  onOpenEstimator,
  newEnquiriesCount = 0,
  isAdminAuthenticated = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageId; isDropdown?: boolean }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Solutions', page: 'solutions' },
    { label: 'Projects', page: 'projects' },
    { label: 'Process', page: 'process' },
    { label: 'Technologies', page: 'technologies' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'About', page: 'about' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setResourcesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#07121F]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="shrink-0">
          <Logo
            variant="horizontal"
            size="md"
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer"
          />
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-300">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => handleLinkClick(item.page)}
              className={`transition-colors py-1 relative text-left cursor-pointer ${
                currentPage === item.page
                  ? 'text-[#0A84FF] font-semibold'
                  : 'hover:text-[#0A84FF] dark:hover:text-[#00E5FF]'
              }`}
            >
              {item.label}
              {currentPage === item.page && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A84FF] rounded-full" />
              )}
            </button>
          ))}

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={`flex items-center gap-1 py-1 cursor-pointer transition-colors ${
                currentPage === 'blog' || currentPage === 'careers'
                  ? 'text-[#0A84FF] font-semibold'
                  : 'hover:text-[#0A84FF] dark:hover:text-[#00E5FF]'
              }`}
            >
              <span>Resources</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            {resourcesOpen && (
              <div 
                className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0B1B2B] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  onClick={() => handleLinkClick('blog')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  Tech Blog & Insights
                </button>
                <button
                  onClick={() => handleLinkClick('careers')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  Careers & Culture
                </button>
                <button
                  onClick={() => {
                    handleLinkClick('home');
                    setTimeout(() => {
                      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  Frequently Asked Questions
                </button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={() => handleLinkClick('enquiry-tracker')}
                  className="w-full text-left px-4 py-2 text-xs font-mono text-[#0A84FF] hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between"
                >
                  <span>Admin Control</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded">
                    Supabase
                  </span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('contact')}
            className={`transition-colors py-1 cursor-pointer ${
              currentPage === 'contact'
                ? 'text-[#0A84FF] font-semibold'
                : 'hover:text-[#0A84FF] dark:hover:text-[#00E5FF]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Admin Panel Direct Button */}
          <button
            onClick={() => handleLinkClick('admin')}
            title={isAdminAuthenticated ? 'Admin Hub (Unlocked: ABSIR)' : 'Admin Security Portal (Requires Login)'}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentPage === 'admin' || currentPage === 'enquiry-tracker'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm font-bold'
                : 'border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0A84FF] hover:text-[#0A84FF]'
            }`}
          >
            {isAdminAuthenticated ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A84FF]" />
            )}
            <span className="hidden sm:inline">
              {isAdminAuthenticated ? 'Admin: ABSIR' : 'Admin'}
            </span>
            {newEnquiriesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            type="button"
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer flex items-center justify-center active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            {darkMode ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
            )}
          </button>

          {/* Project Estimator Quick Trigger */}
          <button
            onClick={onOpenEstimator}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0A84FF] hover:text-[#0A84FF] transition-all cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5 text-[#0A84FF]" />
            <span>Estimator</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-[#0A84FF] hover:bg-[#0070E0] active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#07121F] border-b border-slate-200 dark:border-slate-800 px-6 py-6 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`text-left py-2 text-base font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-[#0A84FF] font-semibold'
                    : 'text-slate-800 dark:text-slate-200 hover:text-[#0A84FF]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-mono block mb-2">
                Resources
              </span>
              <button
                onClick={() => handleLinkClick('blog')}
                className="w-full text-left py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Tech Blog & Insights
              </button>
              <button
                onClick={() => handleLinkClick('careers')}
                className="w-full text-left py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Careers & Culture
              </button>
              <button
                onClick={() => handleLinkClick('pricing')}
                className="w-full text-left py-2 text-sm text-slate-700 dark:text-slate-300"
              >
                Pricing & Packages
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full text-left py-2 text-sm font-semibold text-[#0A84FF]"
              >
                Contact & Enquiries
              </button>
              <button
                onClick={() => handleLinkClick('enquiry-tracker')}
                className="w-full text-left py-2 text-xs font-mono text-emerald-500 font-semibold flex items-center justify-between"
              >
                <span>Admin Control (Supabase DB)</span>
                <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded">Live</span>
              </button>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Theme Appearance
              </span>
              <button
                onClick={onToggleTheme}
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs cursor-pointer"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-[#0A84FF]" />
                Interactive Project Estimator
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0A84FF] text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
