/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, ServiceItem, ProjectItem, BlogPost, EnquirySubmission } from './types';
import { servicesData } from './data/servicesData';
import { projectsData } from './data/projectsData';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Homepage Sections
import { HeroSection } from './components/home/HeroSection';
import { TrustStrip } from './components/home/TrustStrip';
import { AboutPreview } from './components/home/AboutPreview';
import { ServicesSection } from './components/home/ServicesSection';
import { SolutionsSection } from './components/home/SolutionsSection';
import { FeaturedProjects } from './components/home/FeaturedProjects';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { ProcessSection } from './components/home/ProcessSection';
import { TechStackSection } from './components/home/TechStackSection';
import { IndustriesSection } from './components/home/IndustriesSection';
import { FAQSection } from './components/home/FAQSection';
import { FinalCTA } from './components/home/FinalCTA';

// Dedicated Views
import { AboutView } from './components/views/AboutView';
import { ProjectsView } from './components/views/ProjectsView';
import { PricingView } from './components/views/PricingView';
import { CareersView } from './components/views/CareersView';
import { BlogView } from './components/views/BlogView';
import { ContactView } from './components/views/ContactView';
import { LegalView } from './components/views/LegalView';
import { EnquiryManagerView } from './components/views/EnquiryManagerView';
import { AdminLoginView } from './components/admin/AdminLoginView';
import { NotFoundView } from './components/views/NotFoundView';

// Modals
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { CaseStudyModal } from './components/modals/CaseStudyModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { ProjectEstimatorModal } from './components/modals/ProjectEstimatorModal';

// Common
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Admin Auth & Direct Email Service
import { isAuthenticated, logout } from './services/authService';
import { sendEnquiryNotificationToAdmin } from './services/emailService';

// Supabase Database Service
import {
  fetchEnquiriesFromSupabase,
  saveEnquiryToSupabase,
  updateEnquiryStatusInSupabase,
  updateFullEnquiryInSupabase,
  deleteEnquiryFromSupabase,
  getDeletedEnquiryIds,
  getLocalEnquiries,
} from './services/supabaseClient';

const INITIAL_DEMO_ENQUIRIES: EnquirySubmission[] = [
  {
    id: 'ENQ-892104',
    fullName: 'Vikram Sharma',
    companyName: 'Sahyadri Agro Producer Co.',
    email: 'vikram.sharma@sahyadriagro.in',
    phone: '+91 98450 12345',
    country: 'India',
    serviceRequired: 'AI & Machine Learning',
    projectType: 'Agritech Crop Advisory Mobile Engine',
    estimatedBudget: 'Custom Enterprise Tier',
    timeline: 'Within 2 to 3 Months',
    description: 'Requirement for an offline-first mobile assistant for 1,200 member farmers with localized plant pathology image diagnostics and weather alerts.',
    heardFrom: 'Client / Industry Referral',
    timestamp: '2026-03-22T09:30:00Z',
    status: 'Discussion',
  },
  {
    id: 'ENQ-892091',
    fullName: 'Anita Desai',
    companyName: 'Apex Health Diagnostics',
    email: 'anita.d@apexdiagnostics.com',
    phone: '+91 97412 88900',
    country: 'India',
    serviceRequired: 'Web Application Development',
    projectType: 'Clinical Patient Record & Test Portal',
    estimatedBudget: 'Professional Tier',
    timeline: 'Within 1 to 2 Months',
    description: 'Need a HIPAA-compliant patient test results distribution portal with automated PDF generation, SMS alerts, and doctor appointment scheduling.',
    heardFrom: 'Direct Search / Google',
    timestamp: '2026-03-23T14:15:00Z',
    status: 'Proposal Sent',
  },
];

// Helper to guarantee consistent dark theme application across the entire document
const applyThemeToDOM = (isDark: boolean) => {
  const root = document.documentElement;
  const body = document.body;
  if (isDark) {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
    if (body) {
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    }
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
    if (body) {
      body.classList.remove('dark');
      body.setAttribute('data-theme', 'light');
    }
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home', 'about', 'services', 'solutions', 'projects', 'process',
        'technologies', 'pricing', 'estimator', 'careers', 'blog', 'contact',
        'privacy', 'terms', 'cookies', 'admin', 'enquiry-tracker', 'not-found'
      ];
      if (validPages.includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const savedTheme = localStorage.getItem('ab_theme');
      if (savedTheme === 'light') return false;
      if (savedTheme === 'dark') return true;
      return document.documentElement.classList.contains('dark');
    } catch {
      return true;
    }
  });
  const [isLoadingSupabase, setIsLoadingSupabase] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => isAuthenticated());

  // Modals & Selected states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);
  const [prefilledService, setPrefilledService] = useState<string>('');

  // Enquiries list initialized with local/sample records, strictly filtering out any permanently deleted IDs
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(() => {
    const deleted = getDeletedEnquiryIds();
    const local = getLocalEnquiries();
    if (local && local.length > 0) {
      return local.filter((e) => e && e.id && !deleted.has(e.id));
    }
    return INITIAL_DEMO_ENQUIRIES.filter((e) => !deleted.has(e.id));
  });

  // Dynamic SEO Meta & Document Title Synchronization per Page
  useEffect(() => {
    const pageMetaMap: Record<PageId, { title: string; desc: string }> = {
      home: {
        title: 'AB TechSol | Custom Website Development, Web Apps & Software Solutions',
        desc: 'AB TechSol builds high-performance custom websites, web applications, and full-cycle software projects. Fast, modern, and SEO-engineered to grow your business.',
      },
      services: {
        title: 'Website & Software Development Services | AB TechSol',
        desc: 'Explore custom website development, cloud web applications, mobile apps, and enterprise software engineering services by AB TechSol.',
      },
      projects: {
        title: 'Website Development & Software Projects Portfolio | AB TechSol',
        desc: 'Case studies, architectural prototypes, and engineering projects delivered by AB TechSol across SaaS, agritech, logistics, and healthcare.',
      },
      solutions: {
        title: 'Enterprise Digital Solutions & Systems | AB TechSol',
        desc: 'Scalable cloud infrastructure, AI integrations, data pipelines, and bespoke enterprise systems engineered by AB TechSol.',
      },
      pricing: {
        title: 'Website & Project Development Pricing Packages | AB TechSol',
        desc: 'Transparent pricing for custom website development, web applications, and enterprise software projects with clear milestone deliverables.',
      },
      estimator: {
        title: 'Interactive Project & Website Cost Estimator | AB TechSol',
        desc: 'Calculate instant timeline and cost estimates for your website, web application, or custom software project with AB TechSol.',
      },
      about: {
        title: 'About AB TechSol | Technology Leadership & Engineering Standards',
        desc: 'Learn about AB TechSol, our engineering principles, technology leadership, and dedication to building clean, high-performance software.',
      },
      process: {
        title: 'Agile Website & Project Development Process | AB TechSol',
        desc: 'Discover our 6-step project engineering methodology from discovery and architecture to deployment and continuous technical support.',
      },
      technologies: {
        title: 'Modern Tech Stack & Architecture | AB TechSol',
        desc: 'We build with React, Next.js, Node.js, TypeScript, Python, PostgreSQL, and cloud-native serverless architecture.',
      },
      blog: {
        title: 'Engineering & Website Development Insights | AB TechSol',
        desc: 'Deep-dive technical articles on full-stack web development, software architecture, modern SEO, and production performance.',
      },
      contact: {
        title: 'Hire Us | Start Your Website or Software Project | AB TechSol',
        desc: 'Partner with AB TechSol for your project or website development. Reach our engineering team for inquiries and free consultations.',
      },
      careers: {
        title: 'Careers & Opportunities | AB TechSol',
        desc: 'Join the engineering and product team at AB TechSol. Build modern websites, custom software, and innovative digital solutions.',
      },
      privacy: {
        title: 'Privacy Policy | AB TechSol',
        desc: 'Privacy policy and data governance practices at AB TechSol.',
      },
      terms: {
        title: 'Terms of Service | AB TechSol',
        desc: 'Terms of service and commercial agreements for software development services by AB TechSol.',
      },
      cookies: {
        title: 'Cookie Policy | AB TechSol',
        desc: 'Cookie policy and technical storage usage at AB TechSol.',
      },
      admin: {
        title: 'Admin Control Center | AB TechSol',
        desc: 'Secure management portal for client inquiries and projects.',
      },
      'enquiry-tracker': {
        title: 'Enquiry Tracker | AB TechSol',
        desc: 'Real-time project inquiry tracking and customer communication pipeline.',
      },
      'not-found': {
        title: 'Page Not Found | AB TechSol',
        desc: 'The requested page could not be found. Explore AB TechSol website development and custom software services.',
      },
    };

    const currentMeta = pageMetaMap[currentPage] || pageMetaMap.home;
    document.title = currentMeta.title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', currentMeta.desc);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentMeta.title);
    }
  }, [currentPage]);

  // Handle Theme Preference & Supabase Initial Fetch
  useEffect(() => {
    // Ensure DOM classes and attributes are synchronized
    applyThemeToDOM(darkMode);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ab_theme' && e.newValue) {
        const isDark = e.newValue === 'dark';
        setDarkMode(isDark);
        applyThemeToDOM(isDark);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Load live enquiries from Supabase
    loadSupabaseEnquiries();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loadSupabaseEnquiries = async () => {
    setIsLoadingSupabase(true);
    try {
      const res = await fetchEnquiriesFromSupabase();
      if (res.data) {
        const deleted = getDeletedEnquiryIds();
        const filtered = res.data.filter((e) => e && e.id && !deleted.has(e.id));
        setEnquiries(filtered);
      }
    } catch (err) {
      console.warn('Initial Supabase fetch note:', err);
    } finally {
      setIsLoadingSupabase(false);
    }
  };

  const handleToggleTheme = () => {
    setDarkMode((prev) => {
      const nextTheme = !prev;
      const themeKey = nextTheme ? 'dark' : 'light';
      try {
        localStorage.setItem('ab_theme', themeKey);
      } catch (err) {
        console.warn('Could not store theme in localStorage:', err);
      }
      applyThemeToDOM(nextTheme);
      window.dispatchEvent(
        new CustomEvent('themechange', { detail: { theme: themeKey, isDark: nextTheme } })
      );
      return nextTheme;
    });
  };

  const handleNavigate = (page: PageId, targetId?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      if (page === 'home' && !targetId) {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname);
        }
      } else {
        window.location.hash = targetId || page;
      }
    } catch {
      // fallback for iframe safety
    }

    if (targetId) {
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleOpenService = (serviceId: string) => {
    const found = servicesData.find((s) => s.id === serviceId);
    if (found) {
      setSelectedService(found);
    }
  };

  const handleStartProjectWithService = (serviceNameOrId?: string) => {
    if (serviceNameOrId) {
      setPrefilledService(serviceNameOrId);
    }
    handleNavigate('contact');
  };

  const handleAddEnquiry = async (newEnquiry: Partial<EnquirySubmission>) => {
    const fullRecord: EnquirySubmission = {
      id: newEnquiry.id || `ENQ-${Date.now().toString().slice(-6)}`,
      fullName: newEnquiry.fullName || 'Anonymous Prospect',
      companyName: newEnquiry.companyName,
      email: newEnquiry.email || 'pending@contact.com',
      phone: newEnquiry.phone || '[NOT PROVIDED]',
      country: newEnquiry.country || 'India',
      serviceRequired: newEnquiry.serviceRequired || 'Website Development',
      projectType: newEnquiry.projectType || 'Standard System',
      estimatedBudget: newEnquiry.estimatedBudget || 'Standard Scope Tier',
      timeline: newEnquiry.timeline || 'Within 1 to 2 Months',
      description: newEnquiry.description || 'Submitted via web interface',
      heardFrom: newEnquiry.heardFrom || 'Website',
      timestamp: new Date().toISOString(),
      status: 'New',
    };

    // Update React state immediately for instant feedback
    setEnquiries((prev) => [fullRecord, ...prev.filter((e) => e.id !== fullRecord.id)]);

    // Persist automatically to Supabase database
    try {
      const res = await saveEnquiryToSupabase(fullRecord);
      if (res.error) {
        console.warn('Enquiry stored locally, Supabase message:', res.error);
      }
    } catch (err) {
      console.error('Supabase auto-save error:', err);
    }

    // Directly dispatch email notification to abtechsol660@gmail.com from the website
    sendEnquiryNotificationToAdmin(fullRecord).catch((err) =>
      console.warn('Enquiry direct email dispatch notification note:', err)
    );
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    logout();
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleUpdateEnquiryStatus = async (
    id: string,
    newStatus: EnquirySubmission['status']
  ) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );

    // Persist status change to Supabase
    await updateEnquiryStatusInSupabase(id, newStatus);
  };

  const handleUpdateFullEnquiry = async (updated: EnquirySubmission) => {
    setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    await updateFullEnquiryInSupabase(updated);
  };

  const handleDeleteEnquiry = async (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    await deleteEnquiryFromSupabase(id);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F5F8FC] dark:bg-[#07121F] text-slate-900 dark:text-slate-100 transition-colors ${
        darkMode ? 'dark' : ''
      }`}
      data-theme={darkMode ? 'dark' : 'light'}
    >
      {/* Universal Top Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        newEnquiriesCount={enquiries.filter((e) => e.status === 'New').length}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onOpenEstimator={() => setIsEstimatorOpen(true)}
            />
            <TrustStrip />
            <AboutPreview onNavigate={handleNavigate} />
            <ServicesSection
              onSelectService={handleOpenService}
              onStartProject={handleStartProjectWithService}
            />
            <SolutionsSection onStartProject={handleStartProjectWithService} />
            <FeaturedProjects
              onSelectProject={(proj) => setSelectedProject(proj)}
              onNavigateProjects={() => handleNavigate('projects')}
            />
            <WhyChooseUs />
            <ProcessSection
              onStartProject={() => handleNavigate('contact')}
            />
            <TechStackSection />
            <IndustriesSection />
            <FAQSection />
            <FinalCTA
              onStartProject={() => handleNavigate('contact')}
              onOpenEstimator={() => setIsEstimatorOpen(true)}
            />
          </>
        )}

        {currentPage === 'about' && (
          <AboutView onStartProject={() => handleNavigate('contact')} />
        )}

        {currentPage === 'services' && (
          <div className="pt-28 pb-12">
            <ServicesSection
              onSelectService={handleOpenService}
              onStartProject={handleStartProjectWithService}
            />
          </div>
        )}

        {currentPage === 'solutions' && (
          <div className="pt-28 pb-12">
            <SolutionsSection onStartProject={handleStartProjectWithService} />
          </div>
        )}

        {currentPage === 'projects' && (
          <ProjectsView
            onSelectProject={(proj) => setSelectedProject(proj)}
            onStartProject={handleStartProjectWithService}
          />
        )}

        {currentPage === 'process' && (
          <div className="pt-28 pb-12">
            <ProcessSection onStartProject={() => handleNavigate('contact')} />
          </div>
        )}

        {currentPage === 'technologies' && (
          <div className="pt-28 pb-12">
            <TechStackSection />
          </div>
        )}

        {currentPage === 'pricing' && (
          <PricingView
            onSelectPackage={(pkg) => handleStartProjectWithService(pkg)}
            onOpenEstimator={() => setIsEstimatorOpen(true)}
          />
        )}

        {currentPage === 'estimator' && (
          <div className="pt-32 pb-24 text-center">
            <button
              onClick={() => setIsEstimatorOpen(true)}
              className="px-6 py-3 rounded-lg bg-[#0A84FF] text-white font-semibold text-sm"
            >
              Open Interactive Estimator
            </button>
          </div>
        )}

        {currentPage === 'careers' && <CareersView />}

        {currentPage === 'blog' && (
          <BlogView
            onSelectArticle={(article) => setSelectedArticle(article)}
            onStartProject={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            initialService={prefilledService}
            onEnquirySubmitted={(enq) => {
              handleAddEnquiry(enq);
            }}
          />
        )}

        {currentPage === 'privacy' && <LegalView initialTab="privacy" />}
        {currentPage === 'terms' && <LegalView initialTab="terms" />}
        {currentPage === 'cookies' && <LegalView initialTab="cookies" />}

        {(currentPage === 'admin' || currentPage === 'enquiry-tracker') && (
          isAdminAuthenticated ? (
            <EnquiryManagerView
              enquiries={enquiries}
              isLoading={isLoadingSupabase}
              onRefresh={loadSupabaseEnquiries}
              onUpdateStatus={handleUpdateEnquiryStatus}
              onUpdateFullEnquiry={handleUpdateFullEnquiry}
              onDeleteEnquiry={handleDeleteEnquiry}
              onLogout={handleAdminLogout}
            />
          ) : (
            <AdminLoginView
              onSuccess={handleAdminLoginSuccess}
              onGoHome={() => handleNavigate('home')}
            />
          )
        )}

        {currentPage === 'not-found' && (
          <NotFoundView onGoHome={() => handleNavigate('home')} />
        )}
      </main>

      {/* Modals */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onStartProject={(srvId) => handleStartProjectWithService(srvId)}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={(pName) => handleStartProjectWithService(pName)}
      />

      <ArticleModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onStartProject={() => handleNavigate('contact')}
      />

      <ProjectEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onSubmitEnquiry={(enq) => handleAddEnquiry(enq)}
      />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppButton />

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenService={handleOpenService}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
      />
    </div>
  );
}
