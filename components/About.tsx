"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Zap, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Layers,
    title: "Systems Thinking",
    desc: "I design for scale before writing the first line of code — understanding how components interact under real-world load.",
    color: "text-[#3B82F6]",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    border: "group-hover:border-[#3B82F6]/30",
  },
  {
    icon: Zap,
    title: "Ownership Mindset",
    desc: "End-to-end ownership from system design to production monitoring. I treat every service like a product.",
    color: "text-[#8B5CF6]",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    border: "group-hover:border-[#8B5CF6]/30",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    desc: "Security isn't a feature — it's a foundation. Secure SDLC practices are baked into every stage of development.",
    color: "text-[#14B8A6]",
    glow: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]",
    border: "group-hover:border-[#14B8A6]/30",
  },
  {
    icon: Users,
    title: "Builder + Multiplier",
    desc: "Beyond individual contribution — I mentor, document, and elevate the entire team's engineering quality.",
    color: "text-[#06B6D4]",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    border: "group-hover:border-[#06B6D4]/30",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-28 overflow-hidden" ref={ref}>
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
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3B82F6] uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-[#3B82F6]" />
                About Me
              </div>
              <h2 className="section-header mb-8">
                I Build Systems That{" "}
                <span className="gradient-text">Others Depend On</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="space-y-5 text-[16px] text-[#94A3B8] leading-relaxed"
            >
              <p>
                Over 8 years, I&apos;ve gone beyond feature delivery — I architect and own
                platforms that sit at the core of enterprise operations.
                At <span className="text-[#F1F5F9] font-semibold">IBM</span>, I&apos;ve built
                automation systems that replace hundreds of manual workflows daily, serving
                engineers and operations teams across the organization.
              </p>
              <p>
                My work lives at the intersection of{" "}
                <span className="text-[#F1F5F9] font-semibold">backend engineering</span>,{" "}
                <span className="text-[#F1F5F9] font-semibold">cloud-native infrastructure</span>,
                and{" "}
                <span className="text-[#F1F5F9] font-semibold">developer productivity</span>. I
                build tools that other engineers rely on — which means correctness, reliability,
                and maintainability aren&apos;t optional.
              </p>
              <p>
                I hold{" "}
                <span className="text-[#F1F5F9] font-semibold">2 patents</span> for
                software systems and platform automation — direct results of solving hard
                problems nobody had tackled before. That same curiosity drives every project
                I take on.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 pt-8 border-t border-[#1E2A45]/60 grid grid-cols-2 gap-6"
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
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className={`group glass rounded-2xl p-6 transition-all duration-300 ${v.glow} border border-[#1E2A45]/80 ${v.border} cursor-default`}
              >
                <div className={`mb-4 ${v.color}`}>
                  <v.icon size={22} />
                </div>
                <h3 className="text-[14px] font-bold text-[#F1F5F9] mb-2">{v.title}</h3>
                <p className="text-[13px] text-[#475569] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
