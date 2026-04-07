"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Experience as ExperienceItem } from "@/lib/sanity-types";

// Default colors by type if accentColor is not set
const getExperienceColor = (item: { accentColor?: string; type: string }): string => {
  if (item.accentColor) return item.accentColor;
  return item.type === 'education' ? '#0EA5E9' : '#14B8A6'; // Cyan for education, teal for work
};

export default function Experience({ experienceData }: { experienceData: ExperienceItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const timeline = experienceData || [];

  return (
    <section id="experience" className="relative py-28" ref={ref} suppressHydrationWarning>
      <div className="absolute top-0 right-0 w-[500px] h-[600px] rounded-full bg-gradient-radial from-[#14B8A6]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#14B8A6] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#14B8A6]" />
            Timeline
            <span className="w-8 h-px bg-[#14B8A6]" />
          </div>
          <h2 className="section-header">
            Career{" "}
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#64748B] max-w-xl mx-auto">
            8 years of building. Every role defined by ownership, impact, and escalating complexity.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, i) => {
                const Icon = item.type === 'education' ? GraduationCap : Briefcase;
                const itemColor = getExperienceColor(item);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
                    className="relative pl-12"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 exp-dot ${item.isCurrent ? 'current' : ''}`}
                      style={{ '--item-color': itemColor } as React.CSSProperties}
                      suppressHydrationWarning
                    >
                      <Icon size={16} className="exp-dot-icon" style={{ '--item-color': itemColor } as React.CSSProperties} />
                    </div>

                    {/* Card */}
                    <div
                      className="glass rounded-2xl p-6 border transition-all duration-300 hover:border-opacity-50 exp-card"
                      style={{ '--item-color': itemColor } as React.CSSProperties}
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-[17px] font-bold text-[#F1F5F9]">{item.role}</h3>
                            {item.isCurrent && (
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full exp-badge"
                                style={{ '--item-color': itemColor } as React.CSSProperties}
                              >
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[14px] font-semibold exp-company" style={{ '--item-color': itemColor } as React.CSSProperties}>
                              {item.company}
                            </span>
                            <span className="text-[#475569] text-xs">·</span>
                            <span className="text-[13px] text-[#64748B]">{item.location}</span>
                          </div>
                        </div>
                        <span className="text-[12px] font-medium text-[#64748B] glass-light px-3 py-1.5 rounded-lg whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {item.highlights?.map((h: string, j: number) => (
                          <li key={j} className="flex items-start gap-2 text-[13px] text-[#94A3B8] leading-relaxed">
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 exp-highlight-dot"
                              style={{ '--item-color': itemColor } as React.CSSProperties}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1E2A45]/40">
                        {item.tags?.map((t: string) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
