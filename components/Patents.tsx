"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, FileText, CheckCircle2 } from "lucide-react";
import type { Patent } from "@/lib/sanity-types";

export default function Patents({ patentsData }: { patentsData: Patent[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const patents = patentsData || [];

  return (
    <section id="patents" className="relative py-28" ref={ref}>
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
            Innovation
            <span className="w-8 h-px bg-[#8B5CF6]" />
          </div>
          <h2 className="section-header">
            Patent <span className="gradient-text-purple">Portfolio</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#64748B] max-w-xl mx-auto">
            Inventing novel software systems and platform automation approaches that solve complex enterprise challenges.
          </p>
        </motion.div>

        {/* Patents Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {patents.map((patent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass rounded-2xl p-8 border hover:border-opacity-100 transition-all duration-300 relative overflow-hidden group"
              style={{ borderColor: `${patent.accent}30` }}
            >
              {/* Background gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                style={{ background: `linear-gradient(to bottom right, ${patent.accent}30, transparent)` }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ background: `${patent.accent}15`, borderColor: `${patent.accent}30` }}
                  >
                    <Award size={24} style={{ color: patent.accent }} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#F1F5F9] px-3 py-1 bg-[#1E2A45] rounded-full flex items-center gap-1.5 border border-[#3B82F6]/30">
                      <CheckCircle2 size={12} style={{ color: patent.accent }} />
                      {patent.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-[18px] font-bold text-[#F1F5F9] mb-3 leading-snug">
                  {patent.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-4 text-[#94A3B8] text-[13px] font-medium">
                  <FileText size={14} />
                  <span>{patent.number}</span>
                  <span>·</span>
                  <span>{patent.entity}</span>
                </div>

                <p className="text-[14px] text-[#94A3B8] leading-relaxed mb-6">
                  {patent.desc}
                </p>

                <div className="pt-5 border-t border-[#1E2A45]/60 flex flex-wrap gap-2">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#475569] w-full mb-1">Related Technology</span>
                  {patent.tech?.map((t: string) => (
                    <span key={t} className="tech-tag" style={{ fontSize: "11px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
