"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Skill } from "@/lib/sanity-types";

export default function Skills({ skillsData }: { skillsData: Skill[] }) {
  const categories = skillsData || [];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-28" ref={ref}>
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
          {categories.map((category, ci) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6 border border-[#1E2A45]/80 hover:border-[#1E2A45] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1E2A45]/60">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} opacity-90 flex items-center justify-center text-xl`}>
                  {category.icon}
                </div>
                <h3 className="text-[16px] font-bold text-[#F1F5F9]">{category.label}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.tags?.map((skill: string) => (
                  <span 
                    key={skill} 
                    className="tech-tag hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 transition-colors"
                    style={{ borderColor: 'rgba(30, 42, 69, 0.8)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
