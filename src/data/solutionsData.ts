import { SolutionItem } from '../types';

export const solutionsData: SolutionItem[] = [
  {
    id: 'business-management',
    title: 'Business Management & ERP',
    industry: 'Enterprises & SMEs',
    summary: 'Unified operational platforms bridging inventory, CRM, employee tracking, and financial billing into one secure system.',
    problem: 'SMEs run on fragmented spreadsheets, disjointed WhatsApp chats, and disconnected invoicing tools, causing lost billing, stock discrepancies, and poor executive visibility.',
    solution: 'We engineer integrated operational suites that unify customer relationships, quote generation, purchase orders, inventory counts, and staff task tracking into a single role-gated web dashboard.',
    features: [
      'Multi-warehouse stock inventory tracking with automated low-stock reorder alerts',
      'Lead-to-invoice pipeline with customizable PDF quote and tax invoice generation',
      'Employee attendance, task assignments, and performance tracking',
      'Comprehensive financial reporting: P&L summary, GST reconciliation, outstanding dues',
      'Granular role-based permissions (Cashier, Warehouse Manager, Accountant, Director)'
    ],
    benefits: [
      'Reduce inventory discrepancies by up to 80%',
      'Eliminate duplicate manual data entry across departments',
      'Instant executive insights with real-time financial dashboards',
      'Secure operational data behind enterprise-grade encryption'
    ],
    recommendedTech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
  },
  {
    id: 'education-institutions',
    title: 'Education & Campus Solutions',
    industry: 'Schools, Colleges & Training Institutes',
    summary: 'Student lifecycle management, automated attendance, fee collection portals, and online learning management systems.',
    problem: 'Educational institutions struggle with paper-heavy admission records, manual fee tracking, disengaged parent communication, and cumbersome grade report generation.',
    solution: 'We design unified academic portals: handling digital admissions, automated SMS/email notifications, online fee payment gateways, timetable scheduling, and parent-student portals.',
    features: [
      'Student information system from online admission inquiry to alumni archiving',
      'Digital attendance recording via web or mobile with instant parent SMS alerts',
      'Online fee collection with automated receipt issuance and outstanding dues reminders',
      'Exam schedule management, grade card generation, and performance analytics',
      'Secure digital library and resource repository for study materials'
    ],
    benefits: [
      'Save hundreds of administrative staff hours per academic term',
      'Accelerate fee collection cycles with seamless online payment links',
      'Strengthen parent satisfaction through transparent academic reporting',
      'Completely eliminate paper-based record degradation and loss'
    ],
    recommendedTech: ['React', 'Next.js', 'PostgreSQL', 'Express', 'Tailwind CSS']
  },
  {
    id: 'healthcare-clinics',
    title: 'Healthcare & Clinical Management',
    industry: 'Clinics, Diagnostic Centers & Hospitals',
    summary: 'Secure patient record workflows, appointment booking, diagnostic reporting, and doctor scheduling portals.',
    problem: 'Clinics face crowded waiting rooms, missed patient follow-ups, lost physical paper prescriptions, and inefficient doctor schedule coordination.',
    solution: 'We build HIPAA-conscious clinic management systems that streamline patient registration, queue management, digital doctor prescriptions, and patient report access.',
    features: [
      'Smart appointment scheduling with patient queue status tracking',
      'Electronic Health Records (EHR) with secure diagnosis and prescription history',
      'Diagnostic lab test order tracking and digital report PDF downloads for patients',
      'Doctor availability calendar with automated rescheduling and leave management',
      'Pharmacy billing integration with medicine inventory tracking'
    ],
    benefits: [
      'Shorten clinic waiting times and eliminate double-booked appointments',
      'Give clinicians instant, secure access to patient historical records',
      'Enhance patient loyalty with convenient online appointment booking',
      'Strict data privacy and access logging compliant with health regulations'
    ],
    recommendedTech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    id: 'smart-agriculture',
    title: 'Smart Agriculture & Agritech',
    industry: 'Farming Enterprises, FPOs & Agri-Startups',
    summary: 'Telemetry-driven crop advisory, disease diagnostics, weather analytics, and farmer producer organization (FPO) management.',
    problem: 'Farmers and agriculture organizations struggle with unpredictable crop diseases, lack of localized soil/weather insights, and fragmented supply-chain middleman pricing.',
    solution: 'We develop intelligent agritech software: combining computer vision for plant disease detection, sensor telemetry dashboards, harvest planning, and direct farmer-to-buyer marketplaces.',
    features: [
      'Image-based plant disease classification powered by lightweight computer vision',
      'Micro-climate weather monitoring and irrigation scheduling recommendations',
      'FPO member database with crop acreage, yield forecasts, and input distribution',
      'Marketplace pricing feeds and direct procurement booking',
      'Multi-lingual mobile interface supporting regional languages'
    ],
    benefits: [
      'Mitigate crop losses through early visual pest and pathogen detection',
      'Optimize fertilizer and water usage through data-backed recommendations',
      'Streamline cooperative procurement and aggregate purchasing power',
      'Empower rural stakeholders with intuitive mobile-first designs'
    ],
    recommendedTech: ['Python', 'FastAPI', 'PyTorch / OpenCV', 'React Native', 'PostgreSQL']
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & Omnichannel E-Commerce',
    industry: 'Retailers, D2C Brands & Distributors',
    summary: 'High-speed headless e-commerce storefronts, point-of-sale (POS) synchronization, and multi-location inventory.',
    problem: 'Standard e-commerce templates suffer from slow page load speeds, high shopping cart abandonment, and inventory discrepancies between offline retail stores and online channels.',
    solution: 'We engineer ultra-fast headless e-commerce platforms that load in under a second, sync real-time stock across physical retail shops and web channels, and offer frictionless one-click checkouts.',
    features: [
      'Lightning-fast catalog browsing with sub-second instant search and filtering',
      'Real-time inventory synchronization between offline POS and online store',
      'Integrated payment gateways (UPI, Cards, NetBanking, International Stripe)',
      'Automated order fulfillment workflow with courier tracking API integration',
      'Customer loyalty points, promotional coupon engines, and abandoned cart recovery'
    ],
    benefits: [
      'Boost checkout conversion rates by eliminating page lag and clunky forms',
      'Never oversell out-of-stock items across multiple retail branches',
      'Full brand customization with zero restrictive template limitations',
      'Eliminate 2-3% platform transaction cuts charged by proprietary platforms'
    ],
    recommendedTech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis']
  },
  {
    id: 'hospitality-dining',
    title: 'Hospitality & Restaurant Solutions',
    industry: 'Restaurants, Cafes & Boutique Hotels',
    summary: 'Contactless QR ordering, Kitchen Display Systems (KDS), table management, and guest reservation suites.',
    problem: 'Restaurants suffer from high commissions charged by food aggregators, lost orders during rush hours, and slow table turnover due to delayed billing.',
    solution: 'We build direct-to-consumer hospitality technology: contactless digital menus, instant table ordering, synchronized kitchen display screens, and direct table booking.',
    features: [
      'Dynamic QR code menus with instant price and item availability updates',
      'Kitchen Display System (KDS) replacing paper order tickets in real time',
      'Split-billing and digital payment via UPI / QR right at the customer table',
      'Table occupancy visual map and reservation management',
      'Guest feedback collection and repeat customer loyalty discounts'
    ],
    benefits: [
      'Increase table turnover by up to 25% during peak dining hours',
      'Eliminate order transmission errors between waitstaff and kitchen',
      'Grow your direct customer database for zero-commission repeat sales',
      'Effortlessly update seasonal menus and specials without reprinting paper'
    ],
    recommendedTech: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'startups-mvp',
    title: 'Startups & Rapid MVP Development',
    industry: 'Tech Founders & Early-Stage Startups',
    summary: 'Speed-to-market engineering to build, launch, and validate scalable Minimum Viable Products in weeks, not months.',
    problem: 'Startups often burn their initial runway on bloated agency contracts that take 6+ months to deliver an over-engineered product before testing real market demand.',
    solution: 'We partner as your technical co-pilot: scoping the core essential value proposition, engineering a clean, rock-solid MVP in 4–8 weeks, and setting up cloud infrastructure ready for scale.',
    features: [
      'Rapid prototype validation and prioritized feature backlog scoping',
      'Production-ready authentication, role permissions, and billing rails from day one',
      'Clean, strictly typed TypeScript codebase that won’t require a complete rewrite later',
      'Integrated analytics to track user activation, funnels, and retention metrics',
      'Automated CI/CD deployment pipelines on scalable serverless or container cloud'
    ],
    benefits: [
      'Reach the market in 4 to 8 weeks with a professional, credible product',
      'Conserve precious startup capital while maintaining institutional code quality',
      'Impress angel investors and accelerators with genuine product velocity',
      'Seamlessly scale architecture as initial user traction surges'
    ],
    recommendedTech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker']
  }
];
