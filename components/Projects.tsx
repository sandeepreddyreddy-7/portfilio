"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Zap, Shield, Bot, Folder } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/sanity-types";

// Mapping Sanity category strings back to their semantic UI icons
const getCategoryIcon = (category: string) => {
  if (!category) return Folder;
  if (category.includes('AI')) return Bot;
  if (category.includes('Automation')) return Zap;
  if (category.includes('Security')) return Shield;
  return Folder;
};

// Default colors by category if accentColor is not set
const getCategoryColor = (category: string): string => {
  if (category.includes('AI')) return '#A78BFA'; // Purple
  if (category.includes('Automation')) return '#F97316'; // Orange
  if (category.includes('Security')) return '#06B6D4'; // Cyan
  return '#3B82F6'; // Default blue
};

// Helper to get the effective color (from project or category default)
const getProjectColor = (project: { accentColor?: string; category: string }): string => {
  return project.accentColor || getCategoryColor(project.category);
};

const categories = ["All", "Generative AI", "Enterprise Automation", "Security / DevSecOps"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const projectColor = getProjectColor(project);

  const renderBadge = () => {
    // Use logo if logoKind is set to 'logo' and logoUrl exists
    if (project.logoKind === 'logo' && project.logoUrl) {
      return (
        <span className="relative w-full h-full block">
          <Image
            src={project.logoUrl}
            alt={`${project.title} logo`}
            fill
            unoptimized
            className="object-contain p-0.5"
          />
        </span>
      );
    }

    // Fall back to category icon
    const Icon = getCategoryIcon(project.category);
    return <Icon size={18} style={{ color: projectColor }} />;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className="project-card rounded-2xl overflow-hidden border border-[#1E2A45]/80 hover:border-opacity-50 transition-all duration-300 glass min-h-[500px] flex flex-col"
    >
      <div
        className="p-6 pb-0 bg-opacity-10 project-bg-gradient"
        style={{ '--project-color': projectColor } as React.CSSProperties}
        suppressHydrationWarning
             >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border project-icon-box"
              style={{ '--project-color': projectColor } as React.CSSProperties}
                         >
              {renderBadge()}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider project-category" style={{ '--project-color': projectColor } as React.CSSProperties}>
                {project.category}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full project-status"
                  style={{ '--project-color': projectColor } as React.CSSProperties}
                                 >
                  {project.status}
                </span>
              </div>
            </div>
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#475569] hover:text-[#F1F5F9] transition-colors bg-[#1E2A45]/40"
              aria-label={`Open ${project.title}`}
            >
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>

        <h3 className="text-[22px] font-extrabold text-[#F1F5F9] tracking-tight">{project.title}</h3>
        <p className="text-[13px] text-[#94A3B8] mt-1 mb-4">{project.subtitle}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack?.map((t: string) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="p-6 pt-5 flex flex-col flex-1 gap-5">
        <div className="flex-1 space-y-5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Problem</div>
            <p className="text-[14px] text-[#94A3B8] leading-relaxed line-clamp-3">{project.problem}</p>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Key Impact</div>
            <ul className="space-y-1.5">
              {project.impact?.slice(0, 2).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#94A3B8]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 project-impact-dot" style={{ '--project-color': projectColor } as React.CSSProperties} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setExpanded(!expanded);
            }
          }}
          className="flex items-center gap-2 text-[12px] font-semibold transition-colors hover:opacity-80 rounded px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 project-btn"
          style={{ '--project-color': projectColor } as React.CSSProperties}
                   aria-expanded={expanded}
          aria-controls={`case-study-${index}`}
        >
          {expanded ? (
            <><ChevronUp size={14} /> Less detail</>
          ) : (
            <><ChevronDown size={14} /> Full case study</>
          )}
        </button>

        {/* Case study — CSS grid-rows trick for height 0→auto, no style injection */}
        <div
          id={`case-study-${index}`}
          className={`grid transition-[grid-template-rows,opacity] duration-350 ease-in-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!expanded}
        >
          <div className="overflow-hidden">
            <div className="space-y-5">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2 pt-4">Solution</div>
                <p className="text-[14px] text-[#94A3B8] leading-relaxed">{project.solution}</p>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Architecture</div>
                <ul className="space-y-1.5">
                  {project.architecture?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#94A3B8]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 project-impact-dot" style={{ '--project-color': projectColor } as React.CSSProperties} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#475569] mb-2">Full Impact</div>
                <ul className="space-y-1.5">
                  {project.impact?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#94A3B8]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 project-impact-dot" style={{ '--project-color': projectColor } as React.CSSProperties} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projectsData }: { projectsData: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = projectsData || [];
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28" ref={ref} suppressHydrationWarning>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-[#3B82F6]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
          suppressHydrationWarning
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
          <p className="mt-4 text-[16px] text-[#64748B] max-w-2xl mx-auto">
            Not just features - end-to-end platforms designed for scale, adopted by real teams, and running in production at IBM.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-[#3B82F6] text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)]" 
                  : "bg-[#1E2A45]/40 text-[#94A3B8] hover:bg-[#1E2A45] hover:text-[#F1F5F9] border border-[#3B82F6]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr items-stretch">
          {filteredProjects.map((project, i) => (
            <div key={project._id || i} className="h-full">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
