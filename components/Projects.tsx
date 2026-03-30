"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Layers, Zap, Shield, Bot } from "lucide-react";

const projects = [
  {
    id: "asktpsrm",
    icon: Bot,
    accentColor: "#3B82F6",
    gradientFrom: "from-[#3B82F6]/10",
    gradientTo: "to-[#8B5CF6]/5",
    borderHover: "hover:border-[#3B82F6]/40",
    category: "Enterprise Automation",
    title: "AskTPSRM",
    subtitle: "Conversational Service Request Automation",
    problem:
      "Teams were drowning in manual service request workflows — slow, error-prone, and requiring constant human intervention for routine approvals and escalations.",
    solution:
      "Built a Slack-integrated conversational bot that intercepts, classifies, and routes service requests end-to-end. The system uses natural language parsing to understand intent, validates against governance rules, and auto-resolves or escalates based on configurable policy engines.",
    architecture: [
      "Event-driven architecture — Slack Events API triggers async processing",
      "Node.js backend with REST API layer for request classification",
      "Policy engine for governance and approval routing",
      "IBM Hybrid Cloud / OpenShift deployment with horizontal scaling",
    ],
    impact: [
      "Eliminated manual triage for hundreds of daily service requests",
      "Reduced average resolution time from hours to minutes",
      "Adopted across multiple internal teams beyond initial scope",
      "Zero-downtime deployments via CI/CD pipeline",
    ],
    stack: ["Node.js", "Slack API", "REST APIs", "Docker", "OpenShift", "IBM Cloud", "CI/CD"],
    status: "Production",
  },
  {
    id: "smartgate",
    icon: Shield,
    accentColor: "#8B5CF6",
    gradientFrom: "from-[#8B5CF6]/10",
    gradientTo: "to-[#3B82F6]/5",
    borderHover: "hover:border-[#8B5CF6]/40",
    category: "Governance Platform",
    title: "SmartGate",
    subtitle: "Policy-Enforcement Automation Layer",
    problem:
      "Engineering teams needed to comply with governance standards but process enforcement added significant friction — often bypassed under pressure or simply forgotten.",
    solution:
      "Designed a lightweight governance automation layer that enforces compliance policies transparently within existing developer workflows. SmartGate hooks into deployment pipelines and developer tooling, surfacing policy violations early — not at audit time.",
    architecture: [
      "Pipeline integration via webhook interceptors",
      "Rule engine with configurable policy definitions (YAML-driven)",
      "Spring Boot microservice with REST API for policy evaluation",
      "Audit logging with immutable event stream",
    ],
    impact: [
      "Made compliance a non-blocking, developer-native experience",
      "Reduced policy violations detected post-deployment to near zero",
      "Configurable without engineering intervention — owned by governance teams",
      "Maintained system reliability without adding process overhead",
    ],
    stack: ["Java", "Spring Boot", "REST APIs", "Docker", "OpenShift", "YAML Policy Engine"],
    status: "Production",
  },
  {
    id: "cattrap",
    icon: Zap,
    accentColor: "#14B8A6",
    gradientFrom: "from-[#14B8A6]/10",
    gradientTo: "to-[#06B6D4]/5",
    borderHover: "hover:border-[#14B8A6]/40",
    category: "Reliability Engineering",
    title: "CatTrap",
    subtitle: "Operational Safety & Incident Prevention",
    problem:
      "Production incidents were being caused by risky or unvalidated operational actions — often executed manually without guardrails. Tribal knowledge, not systems, were preventing failures.",
    solution:
      "Built a protective automation layer that intercepts high-risk operations, validates them against safety criteria, and either blocks, warns, or routes for human approval. CatTrap brings reliability engineering practices to operational workflows.",
    architecture: [
      "Intercept layer integrated into operational tooling and CI/CD",
      "Risk classification engine with configurable signal weights",
      "Python/Flask service for real-time evaluation",
      "Slack notifications with actionable context for human review",
    ],
    impact: [
      "Reduced production incidents caused by operational errors",
      "Replaced tribal knowledge with automated safety guardrails",
      "Engineers received actionable feedback instead of cryptic failures",
      "Improved on-call experience by dramatically reducing false-positive alerts",
    ],
    stack: ["Python", "Flask", "Slack API", "Docker", "REST APIs", "IBM Cloud"],
    status: "Production",
  },
  {
    id: "ai-security-agent",
    icon: Layers,
    accentColor: "#06B6D4",
    gradientFrom: "from-[#06B6D4]/10",
    gradientTo: "to-[#3B82F6]/5",
    borderHover: "hover:border-[#06B6D4]/40",
    category: "AI Engineering",
    title: "AI Security Intelligence Agent",
    subtitle: "Browser Automation + LLM-Powered Threat Analysis",
    problem:
      "Security teams needed continuous, supplier-specific cybersecurity intelligence but manual research was slow, inconsistent, and didn't scale across hundreds of vendors.",
    solution:
      "Architected an end-to-end AI agent: Selenium-based browser automation crawls targeted sources, BeautifulSoup extracts structured content, and IBM watsonx AI analyzes each article for threats, CVEs, risk levels, and supplier-specific exposure — all surfaced in a clean web UI.",
    architecture: [
      "Selenium WebDriver (headless Chrome) for browser automation",
      "BeautifulSoup4 for structured content extraction",
      "IBM watsonx AI for intelligent risk summarization and CVE extraction",
      "FastAPI backend with async processing pipeline",
      "Modern React/HTML frontend for results visualization",
    ],
    impact: [
      "Reduced manual supplier threat research from hours to seconds",
      "Automated CVE identification, threat actor tagging, and risk assessment",
      "Scalable to any number of suppliers without engineering intervention",
      "Demonstrated build vs. buy evaluation: 10× cheaper than existing SaaS alternatives",
    ],
    stack: ["Python", "FastAPI", "Selenium", "BeautifulSoup4", "IBM watsonx", "React", "Docker"],
    status: "Prototype",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className={`project-card rounded-2xl overflow-hidden ${project.borderHover} transition-all duration-300`}
    >
      {/* Card header */}
      <div className={`bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} p-6 pb-0`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${project.accentColor}20`, border: `1px solid ${project.accentColor}30` }}
            >
              <project.icon size={18} style={{ color: project.accentColor }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: project.accentColor }}>
                {project.category}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${project.accentColor}15`, color: project.accentColor }}
                >
                  {project.status}
                </span>
              </div>
            </div>
          </div>
          <button
            className="p-2 rounded-lg text-[#475569] hover:text-[#F1F5F9] transition-colors"
            style={{ background: "rgba(30,42,69,0.4)" }}
            aria-label="Open project"
          >
            <ArrowUpRight size={14} />
          </button>
        </div>

        <h3 className="text-[22px] font-extrabold text-[#F1F5F9] tracking-tight">{project.title}</h3>
        <p className="text-[13px] text-[#94A3B8] mt-1 mb-4">{project.subtitle}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((t) => (
            <span key={t} className="tech-tag" style={{ fontSize: "11px" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Problem + Impact (always visible) */}
      <div className="p-6 pt-5 space-y-5">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Problem</div>
          <p className="text-[14px] text-[#94A3B8] leading-relaxed">{project.problem}</p>
        </div>

        {/* Impact metrics */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Key Impact</div>
          <ul className="space-y-1.5">
            {project.impact.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[#94A3B8]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accentColor }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[12px] font-semibold transition-colors"
          style={{ color: project.accentColor }}
        >
          {expanded ? (
            <><ChevronUp size={14} /> Less detail</>
          ) : (
            <><ChevronDown size={14} /> Full case study</>
          )}
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden space-y-5"
            >
              {/* Solution */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Solution</div>
                <p className="text-[14px] text-[#94A3B8] leading-relaxed">{project.solution}</p>
              </div>

              {/* Architecture */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Architecture</div>
                <ul className="space-y-1.5">
                  {project.architecture.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#94A3B8]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#3B82F6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* All impact */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Full Impact</div>
                <ul className="space-y-1.5">
                  {project.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#94A3B8]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accentColor }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-28" ref={ref}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-[#3B82F6]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#3B82F6]" />
            Projects
            <span className="w-8 h-px bg-[#3B82F6]" />
          </div>
          <h2 className="section-header">
            Systems I&apos;ve{" "}
            <span className="gradient-text">Built & Owned</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#475569] max-w-2xl mx-auto">
            Not just features — end-to-end platforms designed for scale, adopted by real teams, and running in production at IBM.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
