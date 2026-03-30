"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    label: "Frontend",
    color: "from-[#3B82F6] to-[#06B6D4]",
    accent: "#3B82F6",
    skills: [
      { name: "React", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Angular", level: 82 },
      { name: "HTML5 / CSS3", level: 90 },
    ],
    tags: ["React", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    label: "Backend",
    color: "from-[#8B5CF6] to-[#3B82F6]",
    accent: "#8B5CF6",
    skills: [
      { name: "Java / Spring Boot", level: 95 },
      { name: "Node.js", level: 88 },
      { name: "Python / Flask", level: 82 },
      { name: "REST APIs", level: 95 },
    ],
    tags: ["Java", "Spring Boot", "Node.js", "Python", "Flask", "REST APIs", "Microservices"],
  },
  {
    label: "Cloud & DevOps",
    color: "from-[#14B8A6] to-[#8B5CF6]",
    accent: "#14B8A6",
    skills: [
      { name: "IBM Hybrid Cloud", level: 90 },
      { name: "OpenShift / Docker", level: 88 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "NGINX", level: 78 },
    ],
    tags: ["Docker", "OpenShift", "IBM Cloud", "CI/CD", "Travis CI", "NGINX", "Kubernetes"],
  },
  {
    label: "Data & Security",
    color: "from-[#06B6D4] to-[#14B8A6]",
    accent: "#06B6D4",
    skills: [
      { name: "Cloudant / NoSQL", level: 85 },
      { name: "SQL / Relational", level: 80 },
      { name: "Secure SDLC", level: 88 },
      { name: "SSO / IAM", level: 82 },
    ],
    tags: ["Cloudant", "SQL", "NoSQL", "Secure SDLC", "SSO", "OAuth", "GitHub", "Swagger"],
  },
];

function SkillBar({ name, level, accent, delay }: {
  name: string; level: number; accent: string; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[13px] font-medium text-[#94A3B8]">{name}</span>
        <span className="text-[12px] font-bold" style={{ color: accent }}>{level}%</span>
      </div>
      <div className="h-[3px] bg-[#1E2A45] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
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
          <p className="mt-4 text-[16px] text-[#475569] max-w-xl mx-auto">
            A full-stack toolkit built for production — from scalable backends to cloud-native deployment.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6 border border-[#1E2A45]/80 hover:border-[#1E2A45] transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} opacity-90 flex items-center justify-center`}>
                  <div className="w-3 h-3 bg-white/30 rounded-sm" />
                </div>
                <h3 className="font-bold text-[15px] text-[#F1F5F9]">{cat.label}</h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4 mb-6">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    accent={cat.accent}
                    delay={0.3 + ci * 0.1 + si * 0.08}
                  />
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1E2A45]/60">
                {cat.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional tools row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 glass rounded-2xl p-6 border border-[#1E2A45]/80"
        >
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-[#475569] uppercase tracking-widest">Also Proficient With</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Postman", "Swagger", "GitHub", "Agile/Scrum",
              "Distributed Systems", "System Design", "Microservices Architecture",
              "Slack API / Bots", "watsonx AI", "Linux", "Shell Scripting",
            ].map((tool) => (
              <span key={tool} className="tech-tag">{tool}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
