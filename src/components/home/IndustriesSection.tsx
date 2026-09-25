import React from 'react';
import { 
  Rocket, 
  Store, 
  GraduationCap, 
  Activity, 
  Sprout, 
  ShoppingBag, 
  UtensilsCrossed, 
  Scale, 
  Factory 
} from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const industries = [
    {
      title: 'Startups & Early-Stage',
      focus: 'High-speed MVP delivery, seed-stage validation, scalable initial cloud setup.',
      icon: Rocket,
    },
    {
      title: 'Small & Medium Enterprises',
      focus: 'Operational digitization, custom inventory, GST invoicing, replacing spreadsheet chaos.',
      icon: Store,
    },
    {
      title: 'Education & Academies',
      focus: 'Admissions, automated student attendance, online fee collections, academic report cards.',
      icon: GraduationCap,
    },
    {
      title: 'Healthcare & Clinics',
      focus: 'Appointment calendars, electronic health records, patient lab report distribution.',
      icon: Activity,
    },
    {
      title: 'Agriculture & Agritech',
      focus: 'Computer-vision leaf disease alerts, weather telemetry, cooperative FPO management.',
      icon: Sprout,
    },
    {
      title: 'Retail & D2C Brands',
      focus: 'Sub-second headless e-commerce, real-time POS stock sync, frictionless UPI checkouts.',
      icon: ShoppingBag,
    },
    {
      title: 'Hospitality & Dining',
      focus: 'Contactless QR menus, kitchen display systems (KDS), table billing, turnover tracking.',
      icon: UtensilsCrossed,
    },
    {
      title: 'Professional Services',
      focus: 'Client document vaults, time-tracking billing, audit-ready activity trails.',
      icon: Scale,
    },
    {
      title: 'Manufacturing & Fabrication',
      focus: 'Production batch tracking, raw material stock, custom work order generation.',
      icon: Factory,
    },
  ];

  return (
    <section id="industries-section" className="py-24 bg-white dark:bg-[#07121F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Sector Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Industries We Support
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            We adapt our engineering frameworks to the practical compliance, workflow, and customer interface requirements of your specific sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1B2B] border border-slate-200/80 dark:border-slate-800 hover:border-[#0A84FF]/60 dark:hover:border-[#0A84FF]/60 shadow-sm transition-all"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2.5 rounded-lg bg-[#0A84FF]/10 text-[#0A84FF]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    {ind.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ind.focus}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
