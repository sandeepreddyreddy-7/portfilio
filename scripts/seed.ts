import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load the local env file
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("❌ Missing required Sanity credentials in .env.local!");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2024-03-31',
});

// Full Application Data

const projects = [
  {
    _type: 'project',
    title: 'VerifAI',
    slug: { _type: 'slug', current: 'verifai' },
    status: 'Patent Pending',
    category: 'Generative AI',
    subtitle: 'Dual-LLM Security Validation Pipeline',
    problem: 'Validating LLM outputs for security workflows was highly manual. Traditional assertion testing failed to handle the non-deterministic nature of generative AI.',
    solution: "Architected a dual-LLM pipeline where an 'evaluator' LLM dynamically scores outputs from the 'generator' LLM against strict cyber security rubrics. (Patent U.S. App. No. 19/008667)",
    architecture: [
      "Dual-LLM architecture (Generator vs. Evaluator Model)",
      "IBM watsonx.ai integration and LLaMA 3-70B model tuning",
      "Dynamic prompt engineering and strict JSON schema enforcement",
      "FastAPI backend for asynchronous validation pipelines",
    ],
    impact: [
      "Achieved 94% overall validation accuracy without human intervention",
      "Delivered 77% higher quality outputs compared to generic prompting",
      "Drove a 70% cost reduction in security validation tasks",
    ],
    techStack: ["Python", "FastAPI", "watsonx.ai", "LLaMA 3", "Prompt Engineering"],
    accentColor: '#3B82F6',
    order: 1,
  },
  {
    _type: 'project',
    title: 'SupplierIQ',
    slug: { _type: 'slug', current: 'supplieriq' },
    status: 'Production',
    category: 'Generative AI',
    subtitle: 'Multi-Agent Supplier Onboarding Framework',
    problem: 'Supplier security documentation tracking and onboarding was fragmented across silos, resulting in week-long review cycles.',
    solution: 'Engineered an autonomous multi-agent system powered by IBM watsonx Orchestrate. Deployed task-specific skills orchestrating ProcessUnity GRC APIs, extracting JSON threat reports, and generating vendor security summaries.',
    architecture: [
      "Multi-agent architecture using IBM watsonx Orchestrate",
      "Java Spring Boot microservices wrapping legacy GRC APIs",
      "Custom skill development using OpenAPI/Swagger contracts",
      "Automated extraction and structured generation of risk reports",
    ],
    impact: [
      "Achieved 100% automation of initial supplier onboarding checks",
      "Compressed the supplier onboarding cycle by 7+ days",
      "Scaled to handle enterprise-level supplier volumes concurrently",
    ],
    techStack: ["Java", "Spring Boot", "watsonx Orchestrate", "OpenAPI", "ProcessUnity"],
    accentColor: '#8B5CF6',
    order: 2,
  },
  {
    _type: 'project',
    title: 'AskTPSRM',
    slug: { _type: 'slug', current: 'asktpsrm' },
    status: 'Production',
    category: 'Enterprise Automation',
    subtitle: 'Conversational Service Request Bot',
    problem: 'Security engineers spent hours triaging basic Slack queries. End-users lacked a unified, instant way to request security exception reviews.',
    solution: 'Built a highly available Slack Bot backend. Intercepts natural language, integrates with internal ITSM workflows, and categorizes or instantly resolves security service requests.',
    architecture: [
      "Node.js microservices architecture",
      "Slack Bolt Framework integration with Events API",
      "Containerized in Docker, deployed seamlessly via Travis CI to IBM Cloud",
    ],
    impact: [
      "Delivered a 10-second response time for critical security inquiries",
      "Automated triage for hundreds of operational requests weekly",
      "Eliminated L1 support bottlenecks",
    ],
    techStack: ["Node.js", "Slack API", "Docker", "Travis CI", "IBM Cloud"],
    accentColor: '#14B8A6',
    order: 3,
  },
  {
    _type: 'project',
    title: 'SmartGate',
    slug: { _type: 'slug', current: 'smartgate' },
    status: 'Production',
    category: 'Security / DevSecOps',
    subtitle: 'DevSecOps Policy Enforcement Layer',
    problem: 'Compliance and security reviews were acting as major bottlenecks during IBM release cycles, frustrating developers.',
    solution: 'Architected a transparent DevSecOps pipeline gate. Implemented SAST/DAST tools, integrated Gitleaks for secrets detection, and orchestrated policy validation scripts.',
    architecture: [
      "Shift-left pipeline interceptor hooks",
      "Integration with SonarQube, AppScan, and Gitleaks",
      "Spring Boot aggregation API to consolidate compliance status",
    ],
    impact: [
      "Secured 6+ distributed services across the TPSRM portfolio",
      "Increased the team's release cadence by 4×",
      "Dramatically reduced security vulnerabilities reaching production",
    ],
    techStack: ["Java", "DevSecOps", "SAST/DAST", "SonarQube", "AppScan"],
    accentColor: '#06B6D4',
    order: 4,
  }
];

const experiences = [
  {
    _type: 'experience',
    role: 'Senior Software Engineer',
    company: 'IBM · TPSRM',
    period: 'May 2021 — Present',
    type: 'work',
    isCurrent: true,
    location: 'Durham, NC',
    highlights: [
      "Engineered production GenAI conversational assistant (watsonx Assistant + FastAPI) on Slack and web — reduced vendor risk response time from hours to under 10 seconds across IBM's global workforce",
      "Architected fully autonomous multi-agent AI system (watsonx Orchestrate) — achieved 100% end-to-end automation and eliminated manual supplier engagement, compressing assessment cycle time by 7+ days",
      "Designed dual-LLM validation engine (watsonx.ai + LLaMA 3-70B) — 77% quality improvement, 70% review effort reduction, 94% AI accuracy across thousands of assessments",
      "Engineered DevSecOps CI/CD pipeline (Jenkins, GitHub Actions) with SAST, SBOM scanning, and secrets detection — increased release cadence 4× (monthly → weekly)",
      "Technical lead across 6+ distributed TPSRM services — owned system design, led code/design reviews, mentored junior engineers, partnered with Security, Product, Legal, and Compliance",
      "2× Patent Inventor: Anomaly Detection in Assessment Data (App. 19/008667) and Multi-Model LLM Questionnaire Verification (P202501766)",
    ],
    tags: ["watsonx", "Java", "Python", "FastAPI", "Spring Boot", "OpenShift", "Slack API", "CI/CD"],
    accentColor: '#3B82F6',
    order: 1,
  },
  {
    _type: 'experience',
    role: 'Software Engineer',
    company: 'IBM via Inteliroute Technologies LLC',
    period: 'Apr 2018 — May 2021',
    type: 'work',
    isCurrent: false,
    location: 'Durham, NC',
    highlights: [
      "Built and maintained Agile Risk Management (ARM) platform — full-stack features with Java Spring Boot, Angular, REST APIs, end-to-end ownership across multiple release cycles",
      "Contributed foundational buildout of ProcessUnity GRC workflows, SSO/SAML integrations, and microservice vendor assessment pipelines that scaled into the enterprise TPSRM platform",
      "Designed SSO/SAML federated identity (IBM Liberty + ProcessUnity SaaS) and SendGrid email infrastructure — establishing secure identity and notification foundation for the TPRM program",
      "Containerized microservices with Docker on IBM Hybrid Cloud (OpenShift), configured NGINX for load balancing, built Jenkins CI/CD pipelines",
      "Developed reusable Angular component libraries; Python (Pandas, BeautifulSoup) for backend data processing and automated vendor data enrichment",
    ],
    tags: ["Java", "Spring Boot", "Angular", "Python", "Docker", "ProcessUnity", "SSO", "NGINX"],
    accentColor: '#8B5CF6',
    order: 2,
  },
  {
    _type: 'experience',
    role: 'M.S. Computer Science',
    company: 'Texas A&M University',
    period: 'Dec 2017',
    type: 'education',
    isCurrent: false,
    location: 'College Station, TX',
    highlights: [
      "Graduate-level coursework in distributed systems, algorithms, and software engineering",
      "Foundation for advanced system design and architectural thinking",
    ],
    tags: ["Computer Science", "Distributed Systems", "Algorithms"],
    accentColor: '#06B6D4',
    order: 3,
  },
  {
    _type: 'experience',
    role: 'B.E. Computer Science',
    company: 'SRM University',
    period: 'Apr 2016',
    type: 'education',
    isCurrent: false,
    location: 'India',
    highlights: [
      "Undergraduate foundation in computer science, data structures, and systems programming",
    ],
    tags: ["Computer Science Engineering"],
    accentColor: '#14B8A6',
    order: 4,
  }
];

const patents = [
  {
    _type: 'patent',
    title: 'Detection and Management of Anomalies in Assessment Data',
    number: 'U.S. Patent Application No. 19/008667',
    status: 'Filed',
    date: 'January 2025',
    entity: 'IBM',
    desc: 'Covers automated anomaly detection and management within third-party security assessment data pipelines to improve data integrity and risk accuracy.',
    tech: ["App Scan", "Contrast Security", "ProcessUnity", "IBM Cloud"],
    accent: '#8B5CF6',
    order: 1,
  },
  {
    _type: 'patent',
    title: 'System and Method for Automated Verification of Supplier Risk Questionnaire Data Using Multi-Model Language Understanding',
    number: 'IBM Invention Disclosure P202501766',
    status: 'Review Completed',
    date: 'May 2025',
    entity: 'IBM',
    desc: 'Covers multi-model LLM-based automated verification of supplier risk questionnaire submissions — directly tied to the production dual-LLM validation engine built for the TPSRM platform.',
    tech: ["watsonx.ai", "LLaMA 3-70B", "FastAPI", "ProcessUnity"],
    accent: '#06B6D4',
    order: 2,
  }
];

const skills = [
  {
    _type: 'skill',
    label: 'AI / GenAI',
    icon: '🤖',
    color: 'from-[#3B82F6]/20 to-[#8B5CF6]/20',
    accent: '#3B82F6',
    tags: ['LLMs', 'Multi-Agent Systems', 'RAG', 'Prompt Engineering', 'watsonx Orchestrate', 'watsonx.ai', 'LLaMA 3-70B'],
    order: 1,
  },
  {
    _type: 'skill',
    label: 'Backend & APIs',
    icon: '⚙️',
    color: 'from-[#8B5CF6]/20 to-[#D946EF]/20',
    accent: '#8B5CF6',
    tags: ['Spring Boot', 'Node.js', 'FastAPI', 'REST APIs', 'gRPC', 'Microservices', 'Event-Driven', 'Java 8 Streams'],
    order: 2,
  },
  {
    _type: 'skill',
    label: 'Cloud & DevOps',
    icon: '☁️',
    color: 'from-[#14B8A6]/20 to-[#3B82F6]/20',
    accent: '#14B8A6',
    tags: ['IBM Cloud', 'Docker', 'OpenShift', 'Kubernetes', 'CI/CD Pipelines', 'GitHub Actions', 'Jenkins', 'NGINX'],
    order: 3,
  },
  {
    _type: 'skill',
    label: 'Security & GRC',
    icon: '🔐',
    color: 'from-[#F59E0B]/20 to-[#EF4444]/20',
    accent: '#F59E0B',
    tags: ['OWASP Top 10', 'DevSecOps', 'SAST/DAST', 'SBOM', 'Gitleaks', 'Zero Trust IAM', 'ProcessUnity GRC'],
    order: 4,
  },
  {
    _type: 'skill',
    label: 'Languages',
    icon: '🖥️',
    color: 'from-[#10B981]/20 to-[#14B8A6]/20',
    accent: '#10B981',
    tags: ['Java', 'Python', 'TypeScript', 'JavaScript', 'Bash', 'SQL'],
    order: 5,
  },
  {
    _type: 'skill',
    label: 'Frontend',
    icon: '🌐',
    color: 'from-[#06B6D4]/20 to-[#3B82F6]/20',
    accent: '#06B6D4',
    tags: ['React', 'Next.js', 'Angular', 'TypeScript', 'HTML5', 'Tailwind', 'Framer Motion'],
    order: 6,
  },
  {
    _type: 'skill',
    label: 'Databases & Tools',
    icon: '🗄️',
    color: 'from-[#6366F1]/20 to-[#8B5CF6]/20',
    accent: '#6366F1',
    tags: ['Cloudant', 'MongoDB', 'PostgreSQL', 'Redis', 'S3 Object Storage', 'SonarQube', 'Postman', 'Git'],
    order: 7,
  }
];

const aboutDoc = {
  _type: 'about',
  _id: 'site-about',
  title: 'About Content singleton',
  paragraphs: [
    "I'm a Senior Software Engineer and 2x Patent Inventor with 8+ years building production-grade systems at IBM - specializing in Generative AI, distributed platforms, and enterprise security automation. I've shipped high-impact systems end-to-end from architecture through production, at enterprise scale.",
    "At IBM's Third-Party Security Risk Management organization, I've led the design and delivery of systems that directly changed how security works at scale. I architected multi-agent LLM frameworks on watsonx Orchestrate achieving 94% validation accuracy. I engineered DevSecOps pipelines that took release cadence from monthly to weekly. I built the conversational AI assistant - powered by Python and FastAPI - that reduced security triage response time from hours to 10 seconds. My work spans the full stack - React and Next.js frontends, Python microservices and APIs, IBM Cloud infrastructure, and GRC platform administration.",
    "I'm looking for my next role at a company where engineering depth matters - Senior Engineer, Staff Engineer, Solutions Architect, or Technical Lead - particularly in cloud, security, or AI-native organizations where I can own systems at the same level of complexity and impact."
  ],
  valueCards: [
    {
      title: "Systems Thinking",
      desc: "Designed 6+ distributed TPSRM services at IBM — owned architecture decisions end-to-end across security, cloud, GRC, and AI layers.",
      color: "text-[#3B82F6]",
      iconName: 'Layers',
    },
    {
      title: "Ownership Mindset",
      desc: "From initial system design to production deployment to compliance review — I own outcomes, not just tickets.",
      color: "text-[#8B5CF6]",
      iconName: 'Zap',
    },
    {
      title: "Secure by Default",
      desc: "OWASP Top 10 enforcement, SAST/DAST pipelines, SBOM scanning, Gitleaks secrets detection, Zero Trust IAM — security is not a phase, it's the default.",
      color: "text-[#14B8A6]",
      iconName: 'Shield',
    },
    {
      title: "AI-Native Builder",
      desc: "Shipped production Generative AI systems: multi-agent frameworks, RAG pipelines, conversational assistants, and LLM validation engines — at enterprise scale, not just prototypes.",
      color: "text-[#06B6D4]",
      iconName: 'Bot',
    }
  ]
};

async function seed() {
  console.log('🌱 Starting database seed...');
  
  try {
    // We execute concurrently, logging each category
    const projectPromises = projects.map(p => client.create(p));
    const expPromises = experiences.map(e => client.create(e));
    const patentPromises = patents.map(p => client.create(p));
    const skillPromises = skills.map(s => client.create(s));
    
    // We insert the About singleton directly overwriting if exists
    await client.createOrReplace(aboutDoc);
    console.log('✅ About data migrated.');

    await Promise.all(projectPromises);
    console.log(`✅ Migrated ${projects.length} Projects.`);

    await Promise.all(expPromises);
    console.log(`✅ Migrated ${experiences.length} Experience points.`);

    await Promise.all(patentPromises);
    console.log(`✅ Migrated ${patents.length} Patents.`);

    await Promise.all(skillPromises);
    console.log(`✅ Migrated ${skills.length} Skill categories.`);

    console.log('🚀 SEED COMPLETE. The Sanity Database is now populated.');
  } catch (error) {
    console.error('❌ SEED FAILED:', error);
  }
}

seed();
