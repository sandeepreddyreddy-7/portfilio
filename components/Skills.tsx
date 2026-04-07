"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Skill } from "@/lib/sanity-types";

export default function Skills({ skillsData }: { skillsData: Skill[] }) {
  const categories = skillsData || [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedMobile, setExpandedMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(min-width: 768px)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const MAX_VISIBLE_MOBILE = 3;
  const showMore = categories.length > MAX_VISIBLE_MOBILE;

  return (
    <section id="skills" className="relative py-28" ref={ref} suppressHydrationWarning>
      <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-gradient-radial from-[#8B5CF6]/6 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B5CF6] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#8B5CF6]" />
            Tech Stack
            <span className="w-8 h-px bg-[#8B5CF6]" />
          </div>
          <h2 className="section-header">
            Tools of the{" "}
            <span className="gradient-text">Trade</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#64748B] max-w-xl mx-auto">
            A comprehensive, production-grade toolkit spanning scalable backends, multi-agent AI frameworks, and secure cloud pipelines.
          </p>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {categories.map((category, ci) => {
              const isVisible = isMobile === null || ci < MAX_VISIBLE_MOBILE || expandedMobile || !isMobile;
              if (!isVisible) return null;

              return (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: ci * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-6 border border-[#1E2A45]/80 hover:border-[#1E2A45] transition-all duration-300 min-h-[280px] flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1E2A45]/60 h-10" suppressHydrationWarning>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} opacity-90 flex items-center justify-center text-xl flex-shrink-0`}>
                      {category.icon}
                    </div>
                    <h3 className="text-[15px] font-bold text-[#F1F5F9] h-10 flex items-center min-w-[120px]">{category.label}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.tags?.map((skill: string) => (
                      <span
                        key={skill}
                        className="tech-tag hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        {/* Show More Button - Mobile Only */}
        {showMore && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mt-8 md:hidden"
          >
            <button
              onClick={() => setExpandedMobile(!expandedMobile)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1E2A45]/40 border border-[#1E2A45]/60 text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/8 transition-all duration-300 text-sm font-semibold"
            >
              {expandedMobile ? (
                <>
                  <ChevronUp size={16} /> Show Less Skills
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> Show More Skills
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
