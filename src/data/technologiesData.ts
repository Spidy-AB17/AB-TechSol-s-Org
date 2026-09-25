import { TechItem } from '../types';

export const technologiesData: TechItem[] = [
  // Frontend
  { name: 'React', category: 'frontend', role: 'Component-Driven UI Framework', level: 'Core Specialty' },
  { name: 'TypeScript', category: 'frontend', role: 'Static Typing & Scalable Codebases', level: 'Core Specialty' },
  { name: 'Next.js', category: 'frontend', role: 'Server-Side Rendering & Edge Routing', level: 'Advanced' },
  { name: 'Tailwind CSS', category: 'frontend', role: 'Utility-First Modern Responsive Styling', level: 'Core Specialty' },
  { name: 'HTML5 & CSS3', category: 'frontend', role: 'Accessible Semantics & Modern Layouts', level: 'Standard' },
  { name: 'Vite', category: 'frontend', role: 'High-Speed Build Tooling & Bundling', level: 'Core Specialty' },

  // Backend
  { name: 'Node.js', category: 'backend', role: 'High-Throughput Asynchronous APIs', level: 'Core Specialty' },
  { name: 'Express.js', category: 'backend', role: 'RESTful Microservices & API Architecture', level: 'Core Specialty' },
  { name: 'FastAPI', category: 'backend', role: 'High-Performance Python Async Services', level: 'Advanced' },
  { name: 'Django', category: 'backend', role: 'Robust Batteries-Included Web Framework', level: 'Advanced' },
  { name: 'Flask', category: 'backend', role: 'Lightweight Microservices & Prototyping', level: 'Proficient' },
  { name: 'Spring Boot', category: 'backend', role: 'Enterprise Java Scalable Backends', level: 'Enterprise' },

  // Databases
  { name: 'PostgreSQL', category: 'database', role: 'Reliable ACID Relational Database & pgvector', level: 'Primary RDBMS' },
  { name: 'MySQL', category: 'database', role: 'High-Traffic Transactional SQL Storage', level: 'Advanced' },
  { name: 'MongoDB', category: 'database', role: 'Flexible Document-Based Data Modeling', level: 'Advanced' },
  { name: 'Redis', category: 'database', role: 'In-Memory Caching & Real-Time Pub/Sub', level: 'Advanced' },
  { name: 'SQLite', category: 'database', role: 'Embedded Zero-Config Mobile & Local Storage', level: 'Core Utility' },

  // AI & ML
  { name: 'Python', category: 'ai-ml', role: 'Primary Language for Data Science & AI', level: 'Core Specialty' },
  { name: 'PyTorch', category: 'ai-ml', role: 'Deep Learning Model Training & Fine-Tuning', level: 'Advanced' },
  { name: 'TensorFlow', category: 'ai-ml', role: 'Production ML Deployment & Edge Models', level: 'Advanced' },
  { name: 'Scikit-learn', category: 'ai-ml', role: 'Classical Machine Learning & Statistical Modeling', level: 'Advanced' },
  { name: 'OpenCV', category: 'ai-ml', role: 'Computer Vision & Real-Time Image Processing', level: 'Advanced' },
  { name: 'LLM APIs & RAG', category: 'ai-ml', role: 'Enterprise Generative AI & Semantic Search', level: 'Specialty' },

  // Cloud & Deployment
  { name: 'Docker', category: 'cloud', role: 'Containerization & Reproducible Environments', level: 'Standard' },
  { name: 'AWS', category: 'cloud', role: 'Cloud Infrastructure (EC2, S3, RDS, Lambda)', level: 'Advanced' },
  { name: 'Google Cloud Platform', category: 'cloud', role: 'Managed Kubernetes, Cloud Run & BigQuery', level: 'Advanced' },
  { name: 'CI/CD Pipelines', category: 'cloud', role: 'Automated GitHub Actions Testing & Deployment', level: 'Core Practice' },
  { name: 'Nginx', category: 'cloud', role: 'Reverse Proxy, SSL Termination & Edge Caching', level: 'Standard' },

  // Tools & Design
  { name: 'Git & GitHub', category: 'tools', role: 'Version Control & Collaborative Code Reviews', level: 'Standard' },
  { name: 'Figma', category: 'tools', role: 'Design Systems, Wireframes & Interactive UI', level: 'Core Design' },
  { name: 'VS Code', category: 'tools', role: 'Integrated Development Environment', level: 'Standard' },
  { name: 'Postman', category: 'tools', role: 'API Testing, Documentation & Mock Servers', level: 'Standard' }
];
