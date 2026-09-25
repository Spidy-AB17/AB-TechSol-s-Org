import { PricingPackage } from '../types';

export const pricingData: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    targetAudience: 'For individuals, professionals, and small emerging businesses establishing digital presence.',
    estimatedTimeline: '2 to 3 Weeks',
    description: 'A focused, high-performance web presence built with modern code to establish professional brand authority and capture customer inquiries.',
    highlights: [
      'Tailored responsive website (Up to 5 pages)',
      'Sub-second loading speed with zero template bloat',
      'Technical on-page SEO setup & XML sitemap',
      'Interactive contact and lead capture form',
      'Mobile optimization across all modern smartphone viewports',
      'Domain DNS setup and SSL security certificate'
    ],
    deliverables: [
      'Production-ready web application',
      'Clean modular TypeScript/React codebase',
      'Full source code ownership upon completion',
      'Basic analytics integration'
    ],
    supportPeriod: '30 Days Post-Launch Support',
    revisions: 'Up to 2 Iterative Review Rounds',
    isPopular: false
  },
  {
    id: 'business',
    name: 'Business Package',
    targetAudience: 'For growing companies, retail stores, and service providers scaling operations.',
    estimatedTimeline: '4 to 6 Weeks',
    description: 'Dynamic web solution or workflow portal with content management, database integrations, and customer engagement tools.',
    highlights: [
      'Custom web application or corporate portal (Up to 12 pages/views)',
      'Content management system (Headless CMS) for non-technical updates',
      'Database integration with secure API endpoints',
      'Advanced enquiry capture with email/WhatsApp webhook routing',
      'Conversion-optimized user experience with custom interaction design',
      'Automated daily backup and cloud CDN configuration'
    ],
    deliverables: [
      'Full-stack web application & CMS backend',
      'Complete documentation & admin training guide',
      'Database schema and automated deployment scripts',
      'Full source code and deployment rights'
    ],
    supportPeriod: '60 Days Post-Launch Support & Monitoring',
    revisions: 'Up to 3 Iterative Review Rounds',
    isPopular: true
  },
  {
    id: 'professional',
    name: 'Professional Package',
    targetAudience: 'For established enterprises, educational campuses, and multi-branch businesses.',
    estimatedTimeline: '6 to 10 Weeks',
    description: 'Comprehensive software platform featuring role-based portals, payment rails, inventory management, or cross-platform mobile apps.',
    highlights: [
      'Complex multi-user web application or cross-platform mobile app',
      'Role-based access control (Admin, Manager, Staff, Customer)',
      'Payment gateway integration (UPI, Cards, International)',
      'Real-time data visualization dashboards & automated PDF reporting',
      'Automated background jobs and notification service',
      'Docker containerization for flexible server or cloud hosting'
    ],
    deliverables: [
      'Multi-tier software ecosystem with role-gated portals',
      'Automated CI/CD deployment pipelines on your cloud',
      'Technical architecture blueprint & API documentation',
      'Comprehensive QA test suite reports'
    ],
    supportPeriod: '90 Days Dedicated Engineering Support',
    revisions: 'Collaborative Sprint Milestone Reviews',
    isPopular: false
  },
  {
    id: 'custom-enterprise',
    name: 'Custom Enterprise & AI',
    targetAudience: 'For specialized enterprise software, AI/ML pipelines, Agritech, Healthcare, or high-scale SaaS.',
    estimatedTimeline: 'Custom Milestone Roadmap',
    description: 'Tailored end-to-end software engineering for proprietary business logic, custom AI automation, machine learning models, and mission-critical systems.',
    highlights: [
      'Bespoke software architecture engineered specifically to your business rules',
      'Proprietary AI/ML model integration (Vision, NLP, Predictive analytics)',
      'High-throughput database architecture with distributed caching',
      'HIPAA/GDPR-conscious enterprise data privacy and security controls',
      'Legacy system migration and multi-party enterprise API integration',
      'Dedicated fractional engineering and DevOps architecture team'
    ],
    deliverables: [
      'Enterprise-grade custom software suite and proprietary algorithms',
      'Complete intellectual property, patents support, and source repositories',
      'Infrastructure as code (IaC) and cloud disaster recovery protocols',
      'SLA-backed enterprise maintenance contract'
    ],
    supportPeriod: 'Custom SLA Agreement & Ongoing Retainer',
    revisions: 'Agile 2-Week Sprints with Continuous Feedback',
    isPopular: false
  }
];
