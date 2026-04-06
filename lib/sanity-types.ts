export interface SanityDocument {
  _id: string;
  _type: string;
}

export interface SanitySlug {
  current: string;
}

export interface Project extends SanityDocument {
  _type: 'project';
  title: string;
  slug: SanitySlug;
  status: 'Production' | 'Prototype' | 'Patent Pending';
  category: 'Generative AI' | 'Enterprise Automation' | 'Security / DevSecOps';
  subtitle?: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  impact?: string[];
  techStack?: string[];
  accentColor?: string;
  url?: string;
  order?: number;
  caseStudy?: string;
}

export interface Experience extends SanityDocument {
  _type: 'experience';
  role: string;
  company: string;
  period: string;
  type: 'work' | 'education';
  isCurrent?: boolean;
  location?: string;
  highlights?: string[];
  tags?: string[];
  accentColor?: string;
  order?: number;
}

export interface Patent extends SanityDocument {
  _type: 'patent';
  title: string;
  number?: string;
  status?: string;
  date?: string;
  entity?: string;
  desc?: string;
  tech?: string[];
  accent?: string;
  order?: number;
}

export interface Skill extends SanityDocument {
  _type: 'skill';
  label: string;
  icon?: string;
  color?: string;
  accent?: string;
  tags?: string[];
  order?: number;
}

export interface ValueCard extends SanityDocument {
  _type: 'valueCard';
  title?: string;
  desc?: string;
  iconName?: string;
  color?: string;
}

export interface About extends SanityDocument {
  _type: 'about';
  title?: string;
  paragraphs?: string[];
  valueCards?: ValueCard[];
}
