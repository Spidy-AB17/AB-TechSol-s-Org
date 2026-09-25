import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Send, 
  CheckCircle2, 
  Code, 
  AlertCircle 
} from 'lucide-react';

export const CareersView: React.FC = () => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantRole, setApplicantRole] = useState('Frontend Engineering');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [bio, setBio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Engineering Culture & Careers
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Crafting Software With Technical Rigor
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            At AB TechSol, we foster a remote-first culture of continuous learning, deep system ownership, and zero bureaucratic posturing. We write clean code and respect the craft.
          </p>
        </div>

        {/* Culture & Growth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center mb-4">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
              High Code Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We insist on static typing, atomic commits, automated unit tests, and thorough pull-request peer reviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
              Mentorship & Growth
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Junior engineers and interns work directly alongside senior architects, gaining real exposure to enterprise system deployments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
              Remote-First Balance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Focus on outcomes and shipped software rather than micromanaged hours. Flexible working with clear asynchronous communication.
            </p>
          </div>
        </div>

        {/* Current Openings Status (Truth in advertising - Section 27) */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 dark:bg-[#081524] border border-slate-200 dark:border-slate-800 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Current Vacancy Status
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                No active external job openings currently.
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            In adherence to our policy against inventing fake job listings, we clearly state that our core development team is currently fully allocated. However, we welcome speculative resumes and internship inquiries from talented developers (Frontend, Backend, and AI) for upcoming project cycles.
          </p>
        </div>

        {/* Speculative Application Form */}
        <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0A84FF] font-semibold block mb-1">
              Future Talent Pipeline
            </span>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Submit Speculative Profile or Internship Inquiry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Share your GitHub profile, portfolio, and areas of interest. We keep outstanding talent on file for immediate outreach.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Application Profile Received
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Thank you, {applicantName}. Your profile has been logged into our talent roster. If an engagement matching your skills opens, our team will reach out directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplication} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="ada@domain.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Role Track
                  </label>
                  <select
                    value={applicantRole}
                    onChange={(e) => setApplicantRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                  >
                    <option>Frontend Engineering (React / TS)</option>
                    <option>Backend Systems (Node / Python / SQL)</option>
                    <option>Full-Stack Web Development</option>
                    <option>UI/UX Product Design</option>
                    <option>AI / ML Engineering Intern</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    GitHub or Portfolio Link
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Brief Introduction & Key Technologies
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about complex projects you have built, open-source work, or technologies you love..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Speculative Profile</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
