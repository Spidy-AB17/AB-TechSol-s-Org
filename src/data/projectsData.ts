import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'agrointel',
    name: 'AgroIntel',
    badge: 'Concept Project',
    industry: 'Agriculture / Agritech',
    type: 'AI-Powered Smart Farming Assistant',
    summary: 'A computer vision and telemetry assistant enabling farmers and agricultural cooperatives to detect crop diseases and plan data-driven irrigation.',
    clientChallenge: 'Farmers frequently experience preventable crop losses due to late diagnosis of leaf pathogens and inaccurate irrigation schedules that deplete ground water.',
    goals: [
      'Enable sub-second visual crop leaf pathogen classification directly on low-bandwidth mobile devices',
      'Provide local micro-weather forecasts and sensor-based soil moisture recommendations',
      'Support multi-lingual prompts in regional languages with voice-accessible assistance',
      'Create an architectural prototype demonstrating offline-capable computer vision models'
    ],
    architecture: 'PWA frontend built with React and Tailwind CSS connecting to a lightweight FastAPI inference service running a fine-tuned MobileNet/YOLO model with SQLite offline caching.',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'PyTorch', 'OpenCV', 'Tailwind CSS'],
    uxStrategy: 'High-contrast outdoor UI with large 48px touch targets, minimal technical jargon, iconographic guidance, and audio feedback for accessibility in bright field conditions.',
    developmentHighlights: [
      'Optimized neural net weights down to under 15MB for fast loading on rural 4G networks',
      'Implemented progressive camera capture with on-screen bounding boxes for leaf framing',
      'Designed offline sync queue using IndexedDB to cache telemetry readings when disconnected'
    ],
    outcomes: [
      'Validated 93%+ model classification accuracy across 12 common regional leaf blight pathologies during test dataset evaluations',
      'Demonstrated 450ms end-to-end inference latency on mid-range Android hardware',
      'Selected as internal architectural benchmark for low-bandwidth rural applications'
    ],
    accentColor: '#16A34A'
  },
  {
    id: 'ab-businesshub',
    name: 'AB BusinessHub',
    badge: 'Demo Project',
    industry: 'Business Management / ERP',
    type: 'Integrated Enterprise Operations Suite',
    summary: 'An all-in-one business dashboard centralizing inventory tracking, lead pipelines, automated billing, and employee attendance.',
    clientChallenge: 'Growing small-to-medium enterprises lose up to 15 hours per week managing disconnected spreadsheets, manually reconciling payments, and tracking warehouse inventory.',
    goals: [
      'Unify multi-warehouse inventory levels with automated low-stock reorder workflows',
      'Streamline lead-to-invoice pipelines with instant GST-compliant PDF invoice creation',
      'Provide real-time executive analytics for sales velocity, outstanding collections, and margins',
      'Implement strict role-based access control (Admin, Sales, Warehouse, Accounts)'
    ],
    architecture: 'Full-stack single-page application built on React and TypeScript with a Node.js Express API, PostgreSQL relational database, and Redis caching for instant query speeds.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    uxStrategy: 'Dense yet balanced dashboard layout adhering to tabular numeral alignment, keyboard shortcuts for fast line-item entry, and visual color indicators for invoice aging.',
    developmentHighlights: [
      'Engineered optimistic UI updates so cashier transactions feel instant with zero lag',
      'Built custom PDF generation engine capable of rendering 100+ invoices per minute',
      'Created an audit log service tracking every inventory alteration with timestamp and actor ID'
    ],
    outcomes: [
      'Prototyped full order-to-cash workflow in under 3 clicks per transaction',
      'Demonstrated 80% reduction in mock order processing time compared to spreadsheet workflows',
      'Architecture benchmarked to handle 25,000+ daily SKU inventory transactions with <50ms query latency'
    ],
    accentColor: '#0A84FF'
  },
  {
    id: 'ab-shop',
    name: 'AB Shop',
    badge: 'Demo Project',
    industry: 'Retail & E-Commerce',
    type: 'Headless High-Performance E-Commerce Engine',
    summary: 'A sub-second modern digital commerce storefront with instant search filtering, fluid cart transitions, and omnichannel POS inventory synchronization.',
    clientChallenge: 'Legacy storefront platforms suffer from high bounce rates, 3–4 second page loading times, and frequent cart abandonment caused by multi-step sluggish checkout flows.',
    goals: [
      'Achieve sub-second initial page loads and instant zero-latency client-side product filtering',
      'Implement frictionless one-page checkout with instant UPI and card validation',
      'Build real-time inventory synchronization preventing overselling across online and retail channels',
      'Provide an accessible, mobile-first shopping experience with 100/100 Lighthouse performance'
    ],
    architecture: 'Next.js/React frontend with server-side rendered catalog pages, edge cached at CDN level, communicating with a Node.js microservice backed by PostgreSQL and Stripe/Razorpay rails.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    uxStrategy: 'Editorial visual hierarchy with generous negative space, sticky mobile checkout controls, instantaneous slide-over cart drawer, and single-tap checkout options.',
    developmentHighlights: [
      'Pre-computed static product category paths with incremental revalidation for freshness',
      'Custom fuzzy search algorithm running in Web Workers without blocking the main UI thread',
      'Engineered state machine for checkout handling payment retries and fail-safes gracefully'
    ],
    outcomes: [
      'Scored 99/100 on Google PageSpeed Mobile benchmarks in test environments',
      'Zero layout shift (CLS: 0.00) during rapid image and catalog rendering',
      'Demonstrated 60% faster checkout completion time compared to typical storefront benchmarks'
    ],
    accentColor: '#00E5FF'
  },
  {
    id: 'ab-schooldesk',
    name: 'AB SchoolDesk',
    badge: 'Demo Project',
    industry: 'Education Management',
    type: 'Unified Campus & Academic ERP Portal',
    summary: 'A secure cloud platform for schools and academies to manage student admissions, digital attendance, online fee collections, and report cards.',
    clientChallenge: 'Educational institutions struggle with fragmented paper admission files, manual fee reconciliation, and disengaged communication channels with parents.',
    goals: [
      'Digitize student lifecycle management from admission registration to graduation archiving',
      'Automate daily attendance recording with instant SMS/push notification triggers for parents',
      'Streamline fee invoicing with automated payment links, partial receipts, and overdue alerts',
      'Create teacher grade-book portals that automatically generate standardized student report cards'
    ],
    architecture: 'Role-based React web portal backed by Express REST API, PostgreSQL database with multi-tenant partitioning, and automated PDF report compilation jobs.',
    technologies: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    uxStrategy: 'Clean, approachable interface divided into distinct portal views for Administrators, Teachers, and Parents, with high contrast typography and clear schedule calendars.',
    developmentHighlights: [
      'Developed batch attendance entry grid enabling teachers to record 45 students in under 20 seconds',
      'Integrated dynamic fee formula calculator accommodating scholarships, bus routes, and sibling discounts',
      'Implemented automated cryptographic watermark hashing on digital student report cards'
    ],
    outcomes: [
      'Streamlined term fee reconciliation from 5 administrative days down to real-time auto-matching',
      'Zero data loss architecture with automated daily database snapshots and hot-standby replication',
      'Comprehensive parent portal mockup validating 95% user test task completion on mobile devices'
    ],
    accentColor: '#8B5CF6'
  },
  {
    id: 'ab-restaurant',
    name: 'AB Restaurant',
    badge: 'Demo Project',
    industry: 'Hospitality & Dining',
    type: 'Contactless Dining & Kitchen Display Ecosystem',
    summary: 'A fast digital ordering ecosystem featuring QR table menus, real-time Kitchen Display System (KDS), split billing, and table turnover tracking.',
    clientChallenge: 'Dine-in restaurants experience peak-hour order delays, misplaced paper order tickets, and long guest waits for staff to bring card machines and physical checks.',
    goals: [
      'Enable customers to browse dynamic photo menus and order directly from their smartphones via table QR codes',
      'Provide kitchen chefs with real-time color-coded order screens categorized by cook time and station',
      'Support split bill payments and digital receipts directly at the table',
      'Give managers real-time table turnover metrics and item sales analytics'
    ],
    architecture: 'Real-time WebSocket event architecture connecting customer PWA browsers, kitchen display monitors, and cashier terminals to a centralized Node.js/PostgreSQL backend.',
    technologies: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'PostgreSQL', 'Tailwind CSS'],
    uxStrategy: 'Large tap zones for rapid menu discovery, instant dietary filter toggles (Veg/Non-Veg/Spicy), and high-contrast kitchen ticket cards legible from 6 feet away.',
    developmentHighlights: [
      'Built sub-100ms WebSocket synchronization so kitchen tickets appear instantly when guest submits order',
      'Engineered offline-resilient cashier caching in case internet temporarily drops during peak dining rush',
      'Dynamic 86-list item flagging so sold-out items update instantly on guest mobile screens'
    ],
    outcomes: [
      'Average estimated order-to-kitchen transmission time dropped from 4 minutes to instant',
      'Kitchen ticket clutter completely replaced by modern synchronized digital station displays',
      'Validated seamless contactless ordering experience requiring zero app installation for patrons'
    ],
    accentColor: '#F59E0B'
  }
];
