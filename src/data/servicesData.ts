import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Website Development',
    tagline: 'High-performance, conversion-focused websites engineered for business authority.',
    category: 'Engineering',
    iconName: 'Globe',
    shortDesc: 'Responsive, fast and conversion-focused websites built with clean code and modern SEO architecture.',
    problem: 'Generic website templates and bloated page builders load slowly, fail Core Web Vitals, provide poor mobile experiences, and fail to turn visitors into qualified business inquiries.',
    solution: 'We engineer custom, lightweight corporate websites using React, Next.js, and modern headless architectures that load instantly, rank on Google, and clearly articulate your value proposition.',
    features: [
      'Sub-second page loading speeds with zero template bloat',
      'Mobile-first responsive architecture tested on dozens of viewport sizes',
      'Engineered for Core Web Vitals and technical on-page SEO',
      'Headless CMS integration for effortless client content management',
      'Built-in analytics and lead-capture tracking integration',
      'Accessible semantics conforming to WCAG AA guidelines'
    ],
    techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Headless CMS'],
    process: [
      'Requirement mapping and target audience analysis',
      'Wireframing and content information architecture',
      'Custom UI styling and component system development',
      'Full-stack frontend implementation and API hooks',
      'Cross-browser and mobile responsive QA testing',
      'SSL, CDN setup and global edge deployment'
    ],
    benefits: [
      'Elevated brand authority that sets you apart from template-built competitors',
      'Higher organic search rankings via pristine semantic markup',
      'Higher conversion rates with strategic call-to-action placement',
      'Zero monthly lock-in fees to restrictive proprietary website builders'
    ],
    useCases: [
      'Corporate brand websites for IT and manufacturing firms',
      'High-conversion product landing pages for marketing campaigns',
      'Institutional portals for educational and healthcare organizations',
      'B2B professional services and consulting showcases'
    ],
    faqs: [
      {
        q: 'Do you use WordPress or custom code?',
        a: 'We build primarily with custom modern stacks like React and Next.js because they offer superior security, speed, and design freedom. When clients require easy content updates, we pair custom code with modern headless CMS backends.'
      },
      {
        q: 'How long does a website take to build?',
        a: 'A focused corporate website typically takes 3 to 5 weeks from initial discovery to deployment, depending on content availability and custom functionality required.'
      }
    ]
  },
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    tagline: 'Custom cloud web applications built around your operational workflows.',
    category: 'Applications',
    iconName: 'Layout',
    shortDesc: 'Custom web applications designed around business workflows, client portals, and internal dashboards.',
    problem: 'Off-the-shelf SaaS software rarely fits specific operational processes, forcing teams to wrestle with clunky workarounds, duplicate data entry, and escalating subscription licenses.',
    solution: 'We build bespoke web applications with dedicated client portals, real-time data synchronization, role-based authorization, and seamless API integrations tailored exactly to how your business operates.',
    features: [
      'Modular component architecture with TypeScript strict typing',
      'Role-based access control (RBAC) with granular user permissions',
      'Interactive dashboards with real-time charts and data tables',
      'Secure REST and GraphQL API communication with error resiliency',
      'Audit logging, activity trails, and automated export tools (CSV/PDF)',
      'Optimistic UI updates for desktop-class operational speed'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    process: [
      'User workflow analysis and operational process mapping',
      'Database schema modeling and entity-relationship design',
      'High-fidelity UX prototype walkthroughs with stakeholders',
      'Full-stack development with test-driven API endpoints',
      'Integration testing with third-party software and payment rails',
      'Staging verification followed by production rollout'
    ],
    benefits: [
      'Eliminate repetitive manual tasks and multi-app spreadsheet chaos',
      '100% ownership of your business logic and operational data',
      'Scale smoothly from dozens to thousands of concurrent daily users',
      'Save significant recurring software license fees over time'
    ],
    useCases: [
      'Customer self-service portals and member dashboards',
      'Internal operations management and workflow automation suites',
      'Multi-tenant SaaS products ready for commercial monetization',
      'B2B inventory ordering and distributor booking systems'
    ],
    faqs: [
      {
        q: 'Can our web application connect to our existing database or ERP?',
        a: 'Yes. We build custom API connectors to bridge modern web apps with legacy SQL databases, third-party ERPs, and cloud storage.'
      },
      {
        q: 'How do you handle security for sensitive customer records?',
        a: 'We implement industry best practices: token-based session management, data sanitization, parameterized database queries, HTTPS encryption in transit, and encrypted storage at rest.'
      }
    ]
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile Application Development',
    tagline: 'Modern, cross-platform Android and iOS applications built for performance.',
    category: 'Mobile',
    iconName: 'Smartphone',
    shortDesc: 'Modern Android and iOS mobile applications engineered for native responsiveness, offline capability, and smooth user experiences.',
    problem: 'Building separate native apps for iOS and Android doubles development costs and maintenance overhead, while naive hybrid wrappers often feel sluggish and unpolished.',
    solution: 'We craft high-performance mobile applications using cross-platform frameworks (React Native/Flutter) that compile to genuine native controls, delivering smooth 60fps animations with a unified, maintainable codebase.',
    features: [
      'Unified codebase delivering simultaneous iOS and Android builds',
      'Native device integration: Camera, Biometrics, GPS, Push Notifications',
      'Offline-first architecture with local SQLite/AsyncStorage sync',
      'Sub-100ms touch interaction responses and fluid screen transitions',
      'App Store and Google Play compliance and submission handling',
      'Integrated crash reporting and user session analytics'
    ],
    techStack: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'SQLite', 'Fastlane'],
    process: [
      'Mobile UX flow definition and ergonomics wireframing',
      'Native interaction prototype review on actual test devices',
      'Core app logic and offline persistence layer implementation',
      'Native API bridging (sensors, biometric authentication, push)',
      'Beta testing via Apple TestFlight and Google Play Internal Testing',
      'Store listing optimization, asset bundling, and release'
    ],
    benefits: [
      'Reach both iOS and Android users simultaneously without 2x budget',
      'Instant access to users via timely push alerts and home screen presence',
      'Resilient operation even in areas with spotty cellular connectivity',
      'Straightforward long-term maintenance from a single engineering team'
    ],
    useCases: [
      'Field workforce tracking, attendance, and reporting applications',
      'Customer loyalty, ordering, and mobile payment apps',
      'On-demand booking and service dispatch platforms',
      'Healthcare and telemedicine consultation mobile clients'
    ],
    faqs: [
      {
        q: 'Will the app work smoothly on budget Android devices?',
        a: 'Yes. We rigorously benchmark and profile memory consumption, layout rendering, and asset sizes on low-to-mid range Android devices to guarantee smooth 60fps performance.'
      },
      {
        q: 'Do you help with Apple App Store and Google Play publishing?',
        a: 'Yes. We handle privacy policy checklists, cryptographic certificate signing, store screenshots, metadata preparation, and review submission.'
      }
    ]
  },
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    tagline: 'Tailored enterprise software built around your unique business rules.',
    category: 'Enterprise',
    iconName: 'Cpu',
    shortDesc: 'Business-specific software solutions that automate operations, integrate legacy systems, and solve complex operational bottlenecks.',
    problem: 'Packaged commercial software forces your team to bend unique competitive business logic into generic templates, resulting in data fragmentation and efficiency leaks.',
    solution: 'We architect and build tailored software solutions from the ground up, modeling your specific business entities, approval chains, billing structures, and reporting hierarchies.',
    features: [
      'Custom database schema engineered around your exact data entities',
      'Automated multi-step approval workflows and status notifications',
      'Comprehensive audit trails with timestamped revision history',
      'Custom PDF document generation (invoices, reports, work orders)',
      'Enterprise data migration tools from legacy spreadsheets or DBs',
      'Modular service architecture ready for future modular expansion'
    ],
    techStack: ['Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'Redis'],
    process: [
      'Deep stakeholder interviews and operational bottleneck audit',
      'System architecture blueprint and entity relationship mapping',
      'Milestone-based sprint development with bi-weekly demos',
      'Data migration script testing with historical business records',
      'End-user role training and comprehensive documentation handover',
      'Phased deployment with fail-safe rollback mechanisms'
    ],
    benefits: [
      'Preserve and amplify your proprietary operational advantages',
      'Eliminate manual data re-keying across disconnected software',
      'Unrestricted ownership of complete intellectual property and source code',
      'Zero per-seat licensing price hikes as your company hires more staff'
    ],
    useCases: [
      'Custom ERP systems for manufacturing and fabrication facilities',
      'Custom inventory management with multi-warehouse tracking',
      'B2B billing, invoicing, and receivable collection platforms',
      'Logistics dispatch, fleet routing, and consignment tracking systems'
    ],
    faqs: [
      {
        q: 'Who owns the intellectual property and source code?',
        a: 'You do. Upon project completion and milestone payment, 100% of the proprietary source code, database schemas, and assets are transferred to your organization.'
      },
      {
        q: 'Can we self-host the software on our internal servers?',
        a: 'Yes. We containerize all software components using Docker, allowing seamless deployment either in your private cloud, on on-premise servers, or on managed cloud providers.'
      }
    ]
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning Solutions',
    tagline: 'Practical, high-utility AI automation and intelligent data systems.',
    category: 'Intelligent Systems',
    iconName: 'Sparkles',
    shortDesc: 'AI automation, intelligent document processing, predictive analytics, and computer vision built for tangible business ROI.',
    problem: 'Companies want to harness artificial intelligence but get misled by hype, struggling to integrate AI in a way that actually saves hours of manual labor or improves accuracy.',
    solution: 'We build pragmatic AI solutions focused on concrete utility: automated document extraction, intelligent customer inquiry routing, computer vision inspection, and domain-grounded LLM workflows.',
    features: [
      'Intelligent document and invoice parsing with structured data extraction',
      'Domain-specific Retrieval-Augmented Generation (RAG) over company documents',
      'Computer vision models for visual inspection and anomaly detection',
      'Predictive analytics for inventory demand and customer churn modeling',
      'Integration with modern LLM APIs (Gemini, Claude, GPT) with guardrails',
      'Strict data privacy: models run without leaking proprietary data'
    ],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'Scikit-learn', 'OpenCV', 'LangChain', 'PostgreSQL pgvector'],
    process: [
      'Business use-case feasibility analysis and ROI assessment',
      'Dataset collection, sanitization, and baseline benchmarking',
      'Model selection, fine-tuning, and prompt pipeline engineering',
      'Validation against edge cases and latency SLA requirements',
      'API wrapper development and integration into frontend interfaces',
      'Continuous performance monitoring and drift detection'
    ],
    benefits: [
      'Reduce hours of repetitive manual data entry to seconds',
      'Uncover actionable trends hidden inside raw historical records',
      'Provide instant, accurate responses to operational inquiries',
      'Deliver automated verification without requiring constant human oversight'
    ],
    useCases: [
      'Automated agricultural crop disease detection and soil analytics',
      'Intelligent optical character recognition (OCR) for invoices and receipts',
      'Internal knowledge base assistants for technical staff and support teams',
      'Quality control visual defect classification in manufacturing lines'
    ],
    faqs: [
      {
        q: 'Will our company data be used to train public AI models?',
        a: 'Never. We build enterprise solutions using isolated private infrastructure and commercial enterprise APIs with strict zero-data-retention guarantees for training.'
      },
      {
        q: 'Do we need massive datasets to get started with AI?',
        a: 'Not necessarily. Many modern business solutions (such as document intelligence and knowledge-base search) leverage foundation models and semantic embeddings, requiring only your existing business documents.'
      }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'User-centered digital product design that balances clarity with aesthetic precision.',
    category: 'Design',
    iconName: 'Palette',
    shortDesc: 'User-centered digital product design, wireframing, high-fidelity prototypes, and comprehensive design systems.',
    problem: 'Confusing user interfaces cause user frustration, increase training overhead, and lead to high bounce rates and abandoned checkouts.',
    solution: 'We design intuitive, research-backed interfaces that guide users smoothly toward their objectives, backed by coherent typography, clear information hierarchy, and scalable design tokens.',
    features: [
      'User journey mapping and behavioral task analysis',
      'Low-fidelity wireframes exploring optimal spatial layouts',
      'High-fidelity interactive prototypes in Figma with real click-through flows',
      'Comprehensive Design Systems with reusable UI components and tokens',
      'WCAG AA accessible color contrast and keyboard navigation specs',
      'Developer-ready asset export with exact spacing and CSS specs'
    ],
    techStack: ['Figma', 'FigJam', 'Tailwind CSS', 'Radix Primitives', 'Motion Design'],
    process: [
      'Discovery interviews with stakeholders and target users',
      'Information architecture and user journey diagramming',
      'Interactive low-fidelity wireframe reviews',
      'Visual design language definition (typography, color, spacing)',
      'High-fidelity prototyping and interactive usability testing',
      'Design system documentation and engineering handover'
    ],
    benefits: [
      'Dramatically lower user training time and reduce support tickets',
      'Increase customer conversion and product retention rates',
      'Accelerate future feature development through standardized components',
      'Establish a cohesive, premium brand aesthetic across every touchpoint'
    ],
    useCases: [
      'Complete redesign of legacy enterprise software dashboards',
      'New SaaS product concept design from scratch to MVP ready',
      'Mobile application UI/UX overhaul for iOS and Android',
      'E-commerce user experience optimization and checkout redesign'
    ],
    faqs: [
      {
        q: 'Do you deliver prototypes we can interact with before coding?',
        a: 'Yes. Every project includes interactive, clickable Figma prototypes so stakeholders can experience the exact look, feel, and navigation flow before any engineering starts.'
      },
      {
        q: 'Can our developers use your design system directly?',
        a: 'Absolutely. We design using atomic principles and tokenized scales that map directly to modern CSS and Tailwind utility classes.'
      }
    ]
  },
  {
    id: 'cloud-deployment',
    title: 'Cloud & Deployment Solutions',
    tagline: 'Resilient, automated cloud infrastructure engineered for zero downtime.',
    category: 'Infrastructure',
    iconName: 'Cloud',
    shortDesc: 'Secure deployment, hosting, database architecture, containerization, and continuous integration pipelines.',
    problem: 'Unstable hosting, manual deployment procedures, and unmanaged databases lead to unexpected outages, slow response times, and catastrophic data loss risks.',
    solution: 'We architect modern, automated cloud infrastructures on leading providers (AWS, GCP, DigitalOcean), packaging applications into Docker containers with automated CI/CD and disaster-recovery backups.',
    features: [
      'Containerized deployments with Docker and Docker Compose',
      'Automated CI/CD pipelines via GitHub Actions for seamless updates',
      'High-availability database setups with automated daily backups',
      'SSL/TLS certificate automation and enterprise DDoS protection',
      'Global Content Delivery Network (CDN) caching for sub-100ms asset delivery',
      'Server health monitoring, uptime alerting, and structured logging'
    ],
    techStack: ['AWS', 'Google Cloud', 'Docker', 'GitHub Actions', 'Nginx', 'PostgreSQL', 'Redis'],
    process: [
      'Current infrastructure audit and traffic requirement estimation',
      'Cloud architecture blueprinting (VPC, security groups, subnets)',
      'Dockerfile creation and multi-stage container optimization',
      'Automated CI/CD deployment pipeline configuration',
      'Stress testing, load balancing validation, and failover verification',
      'Telemetry setup, alert thresholds, and operations runbook delivery'
    ],
    benefits: [
      'Eliminate manual deployment mistakes with one-click automated pipelines',
      'Ensure 99.9%+ availability for business-critical operational tools',
      'Protect vital business data with automated encrypted offsite backups',
      'Optimize cloud hosting costs by right-sizing server capacities'
    ],
    useCases: [
      'Migration of on-premise software into scalable cloud infrastructure',
      'Setting up production, staging, and preview environments for dev teams',
      'Multi-region database replication and disaster recovery setup',
      'High-traffic e-commerce hosting optimization ahead of seasonal peaks'
    ],
    faqs: [
      {
        q: 'Which cloud provider do you recommend?',
        a: 'We select the provider that best matches your budget and operational needs. For most modern web apps, AWS, Google Cloud, or DigitalOcean offer the best balance of cost, performance, and reliability.'
      },
      {
        q: 'How do you prevent data loss during server incidents?',
        a: 'We configure automated daily snapshots, point-in-time recovery for databases, and off-site encrypted backup replication.'
      }
    ]
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting & Tech Advisory',
    tagline: 'Strategic technical guidance to help leadership make confident technology choices.',
    category: 'Strategy',
    iconName: 'Compass',
    shortDesc: 'Technology planning, software architecture audits, digital transformation roadmaps, and vendor technical evaluations.',
    problem: 'Non-technical business leaders often struggle to evaluate conflicting vendor proposals, choose appropriate technology stacks, or plan scalable software budgets.',
    solution: 'We provide pragmatic, objective technology consulting: auditing legacy systems, outlining achievable digital roadmaps, vetting third-party software, and guiding strategic architectural decisions.',
    features: [
      'Architecture reviews identifying technical debt, security flaws, and bottlenecks',
      'Objective technology stack evaluation tailored to your business model',
      'Digital transformation roadmaps broken into prioritized milestone phases',
      'Third-party software vendor evaluation and technical vetting',
      'Codebase audits and security posture assessments',
      'Technical hiring assistance and developer skill evaluations'
    ],
    techStack: ['Architecture Blueprints', 'Security Audits', 'Tech Due Diligence', 'System Diagrams'],
    process: [
      'Leadership alignment meetings and operational objective discovery',
      'Technical audit of existing systems, code repositories, and hosting',
      'Gap analysis between business ambitions and current technology',
      'Drafting actionable strategic roadmap with estimated costs and timelines',
      'Executive presentation and milestone review with leadership',
      'Ongoing advisory support during implementation milestones'
    ],
    benefits: [
      'Avoid costly multi-month mistakes on dead-end technology choices',
      'Align technology investments directly with measurable business ROI',
      'Empower leadership with clear, jargon-free technical clarity',
      'Protect your organization from predatory vendor lock-ins'
    ],
    useCases: [
      'Preparing technical roadmaps for venture-backed seed and series A startups',
      'Auditing legacy software before committing to an expensive rebuild',
      'Independent technical due diligence for software acquisitions',
      'Digitizing paper-based operations in traditional industries'
    ],
    faqs: [
      {
        q: 'Can you consult on projects without building the software?',
        a: 'Yes. We frequently provide independent advisory and code review services for organizations that already have internal or third-party engineering teams.'
      },
      {
        q: 'Do you deliver actionable documentation or just general advice?',
        a: 'We deliver comprehensive, written technical blueprints, architecture diagrams, risk matrices, and step-by-step implementation roadmaps.'
      }
    ]
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Support',
    tagline: 'Continuous monitoring, proactive security updates, and dependable engineering support.',
    category: 'Operations',
    iconName: 'ShieldCheck',
    shortDesc: 'Continuous updates, uptime monitoring, security patching, and dependable technical support to keep systems healthy.',
    problem: 'Software is not static; unmaintained applications develop security vulnerabilities, suffer database bloat, break when third-party APIs change, and eventually fail without warning.',
    solution: 'We provide dedicated monthly maintenance agreements: monitoring uptime 24/7, applying timely security patches, managing database health, and implementing ongoing feature refinements.',
    features: [
      '24/7 automated uptime and response-time monitoring',
      'Regular security patching of operating systems, libraries, and frameworks',
      'Scheduled database indexing, query optimization, and log rotations',
      'Third-party API version migration and webhook maintenance',
      'Guaranteed SLA response times for critical incident resolution',
      'Monthly engineering hours included for incremental UI and feature updates'
    ],
    techStack: ['Prometheus', 'Grafana', 'Sentry', 'Uptime Kuma', 'PostgreSQL Maintenance'],
    process: [
      'Initial system health check and monitoring agent installation',
      'Configuration of automated alerting channels (Email/SMS/Slack)',
      'Scheduled bi-weekly dependency audits and vulnerability scans',
      'Monthly maintenance sprint execution during low-traffic windows',
      'Transparent monthly maintenance report delivered to management',
      'Priority ticket queue for ad-hoc feature requests and minor fixes'
    ],
    benefits: [
      'Peace of mind knowing experienced engineers are guarding your digital systems',
      'Prevent minor bugs from escalating into catastrophic business outages',
      'Keep software compliant with evolving browser and OS standards',
      'Predictable operational IT budgeting without emergency surge charges'
    ],
    useCases: [
      'E-commerce stores requiring zero-downtime reliability during high-sales periods',
      'Mission-critical business software where an outage halts physical operations',
      'Client portals holding sensitive user records that require constant patching',
      'Startups needing fractional DevOps without hiring full-time staff'
    ],
    faqs: [
      {
        q: 'What is your response time for emergency outages?',
        a: 'Under our priority support agreements, critical outages receive engineering response within 1 hour, 24/7.'
      },
      {
        q: 'Can we include regular feature additions in our maintenance plan?',
        a: 'Yes. Our maintenance packages include a dedicated allocation of engineering hours each month for ongoing feature enhancements and UI refinements.'
      }
    ]
  }
];
