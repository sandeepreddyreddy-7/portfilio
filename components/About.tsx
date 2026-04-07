"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { About as AboutData } from "@/lib/sanity-types";

export default function About({ aboutData }: { aboutData: AboutData | null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const paragraphs = [
    "I'm a Senior Software Engineer and 2× Patent Inventor with 8+ years building production-grade systems at IBM — specializing in Generative AI, distributed platforms, and enterprise security automation. I've shipped high-impact systems end-to-end from architecture through production, at enterprise scale.",
    "At IBM's Third-Party Security Risk Management organization, I've architected multi-agent LLM frameworks using watsonx Orchestrate and watsonx.ai, built conversational AI assistants deployed on Slack and web, designed dual-LLM validation engines achieving 94% AI accuracy, and engineered DevSecOps pipelines that increased release cadence 4× while reducing deployment time from hours to minutes. My work spans the full stack — from React and Next.js frontends to Spring Boot microservices, IBM Cloud infrastructure, and GRC platform administration.",
    "I'm actively exploring Senior Software Engineer, Staff Engineer, Solutions Architect, and Technical Lead roles — particularly in cloud, security, and AI-native organizations where I can bring this same depth of engineering and platform thinking to the next team.",
  ];
  const valueCards = aboutData?.valueCards || [];

  const getIcon = (name?: string) => {
    if (!name) return LucideIcons.CircleDot;
    const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[name];
    return Icon || LucideIcons.CircleDot;
  };

  return (
    <section id="about" className="relative py-28 overflow-hidden" ref={ref} suppressHydrationWarning>
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#3B82F6]/5 to-transparent blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              suppressHydrationWarning
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-[#3B82F6]" />
                About Me
              </div>
              <h2 className="section-header mb-8">
                I Build Systems That{" "}
                <span className="gradient-text">Help Teams Move Faster</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="space-y-5 text-[16px] text-[#94A3B8] leading-relaxed"
              suppressHydrationWarning
            >
              {paragraphs.map((text: string, idx: number) => (
                <p key={idx}>{text}</p>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 pt-8 border-t border-[#1E2A45]/60 grid grid-cols-2 gap-6"
              suppressHydrationWarning
            >
              {[
                { school: "Texas A&M University", degree: "M.S. Computer Science" },
                { school: "SRM University", degree: "B.S. Computer Science" },
              ].map((e) => (
                <div key={e.school} className="space-y-1">
                  <div className="text-xs text-[#475569] font-semibold uppercase tracking-wider">{e.school}</div>
                  <div className="text-sm text-[#94A3B8] font-medium">{e.degree}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valueCards.map((val, i) => {
              const Icon = getIcon(val.iconName);
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className={`glass rounded-xl p-5 border border-[#1E2A45]/80 hover:border-opacity-50 transition-all duration-300 group hover:bg-[#1E2A45]/30`}
                  suppressHydrationWarning
                >
                  <div className={`mb-3 ${val.color}`}>
                    <Icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#F1F5F9] mb-1.5">{val.title}</h4>
                  <p className="text-[13px] text-[#94A3B8] leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
