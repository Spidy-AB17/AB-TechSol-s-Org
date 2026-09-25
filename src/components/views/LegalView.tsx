import React, { useState } from 'react';
import { Shield, FileText, Cookie } from 'lucide-react';

interface LegalViewProps {
  initialTab?: 'privacy' | 'terms' | 'cookies';
}

export const LegalView: React.FC<LegalViewProps> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>(initialTab);

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'privacy'
                ? 'bg-[#0A84FF] text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'terms'
                ? 'bg-[#0A84FF] text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'cookies'
                ? 'bg-[#0A84FF] text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>Cookie Policy</span>
          </button>
        </div>

        {/* Tab 1: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0A84FF] block mb-1">
                Transparency & Data Protection
              </span>
              <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Last updated: March 2026 &middot; AB TechSol
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 text-xs">
              <strong>Notice:</strong> AB TechSol is committed to respecting your privacy. This policy outlines how we handle information submitted through our website and client communications.
            </div>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us when submitting inquiries through our contact forms, project estimators, or speculative career portals. This includes your name, company affiliation, email address, phone number, and project descriptions.
            </p>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              2. How We Use Collected Information
            </h2>
            <p>
              We use your submitted information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Evaluate project requirements and draft itemized technical proposals.</li>
              <li>Communicate directly with you regarding discovery meetings and sprint schedules.</li>
              <li>Improve our website performance and diagnostic accuracy.</li>
              <li>Prevent spam and unauthorized access to our digital services.</li>
            </ul>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              3. Data Non-Disclosure & AI Model Training
            </h2>
            <p>
              We do not sell, rent, or trade your personal information. Furthermore, proprietary documents or project specifications shared with AB TechSol are never utilized to train public artificial intelligence or machine learning foundation models.
            </p>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              4. Data Retention and Security
            </h2>
            <p>
              We apply standard technical safeguards, including HTTPS transport encryption and parameterized database queries, to safeguard submitted project records. You may request deletion of your contact records at any time by emailing abtechsol660@gmail.com.
            </p>
          </div>
        )}

        {/* Tab 2: Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0A84FF] block mb-1">
                Contractual Guidelines
              </span>
              <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Terms & Conditions
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Last updated: March 2026 &middot; AB TechSol
              </p>
            </div>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by the following terms of service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              2. Intellectual Property & Source Code Ownership
            </h2>
            <p>
              All software developed by AB TechSol for paying clients is governed by individual Master Services Agreements (MSAs). Upon full payment of agreed project milestones, complete ownership of the proprietary custom code, database schemas, and unique assets is transferred entirely to the client.
            </p>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              3. Non-Binding Nature of Online Estimates
            </h2>
            <p>
              Calculations generated by the interactive Project Estimator on this website are provided for initial scoping guidance only. They do not constitute formal, legally binding quotations until verified in a formal Statement of Work (SOW).
            </p>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              4. Limitation of Liability
            </h2>
            <p>
              In no event shall AB TechSol or its partners be liable for any damages arising out of the use or inability to use the materials on this website.
            </p>
          </div>
        )}

        {/* Tab 3: Cookie Policy */}
        {activeTab === 'cookies' && (
          <div className="space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0A84FF] block mb-1">
                Session Storage & Cookies
              </span>
              <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Cookie Policy
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Last updated: March 2026 &middot; AB TechSol
              </p>
            </div>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              1. How We Use Cookies
            </h2>
            <p>
              We believe in minimal tracking. AB TechSol uses only essential local storage and session items necessary to provide a smooth user experience, such as remembering your preferred dark/light visual theme and keeping track of interactive form steps.
            </p>

            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white pt-4">
              2. Managing Preferences
            </h2>
            <p>
              You can choose to disable cookies through your individual browser options. Because we do not rely on aggressive third-party advertising cookies, disabling cookies will not break your browsing experience on our site.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
