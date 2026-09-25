import React, { useState } from 'react';
import { faqData } from '../../data/faqData';
import { ChevronDown, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqData[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'process', label: 'Process' },
    { id: 'technical', label: 'Technical' },
    { id: 'support', label: 'Support' },
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="faq-section" className="py-24 bg-[#F5F8FC] dark:bg-[#081524] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Clarity & Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Honest answers regarding our technical process, pricing philosophy, code ownership, and post-launch maintenance.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. pricing, source code, hosting)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0A84FF]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-200/60 dark:bg-slate-800/80 rounded-lg">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCat === c.id
                    ? 'bg-white dark:bg-[#0B1B2B] text-slate-900 dark:text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-white dark:bg-[#0B1B2B] rounded-xl border border-slate-200 dark:border-slate-800">
              No matching questions found for "{searchQuery}". Please contact us directly for specific inquiries.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-white dark:bg-[#0B1B2B] border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold font-display text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0A84FF]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
