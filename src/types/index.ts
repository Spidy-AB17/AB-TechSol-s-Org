export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'solutions'
  | 'projects'
  | 'process'
  | 'technologies'
  | 'pricing'
  | 'estimator'
  | 'careers'
  | 'blog'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'enquiry-tracker'
  | 'admin'
  | 'not-found';

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  category: string;
  iconName: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  process: string[];
  benefits: string[];
  useCases: string[];
  faqs: { q: string; a: string }[];
}

export interface SolutionItem {
  id: string;
  title: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  benefits: string[];
  recommendedTech: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  badge: 'Concept Project' | 'Demo Project';
  industry: string;
  type: string;
  summary: string;
  clientChallenge: string;
  goals: string[];
  architecture: string;
  technologies: string[];
  uxStrategy: string;
  developmentHighlights: string[];
  outcomes: string[];
  accentColor: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai-ml' | 'cloud' | 'tools';
  role: string;
  level: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'process' | 'technical' | 'support';
}

export interface PricingPackage {
  id: string;
  name: string;
  targetAudience: string;
  estimatedTimeline: string;
  description: string;
  highlights: string[];
  deliverables: string[];
  supportPeriod: string;
  revisions: string;
  isPopular?: boolean;
}

export interface EnquiryReplyItem {
  id: string;
  type: 'general' | 'presentation' | 'deal_accepted' | 'meeting_scheduled' | 'custom';
  subject: string;
  message: string;
  sentVia: 'email' | 'whatsapp' | 'logged' | 'direct_web_email';
  timestamp: string;
  meetingDetails?: {
    date: string;
    time: string;
    platform: string;
    link?: string;
  };
  dealDetails?: {
    amount?: string;
    notes?: string;
  };
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  country: string;
  serviceRequired: string;
  projectType: string;
  estimatedBudget: string;
  timeline: string;
  description: string;
  heardFrom: string;
  timestamp: string;
  status:
    | 'New'
    | 'Contacted'
    | 'Discussion'
    | 'Meeting Scheduled'
    | 'Proposal Sent'
    | 'Negotiation'
    | 'Won'
    | 'Lost';
  scheduledMeeting?: string; // ISO timestamp saved directly to Supabase as 'scheduled_meeting'
  scheduledMeetingDate?: string;
  scheduledMeetingTime?: string;
  meetingPlatform?: 'Google Meet' | 'Zoom' | 'Phone Call' | 'In-Person / Office';
  meetingLink?: string;
  dealAmount?: string;
  dealNotes?: string;
  replyHistory?: EnquiryReplyItem[];
}
