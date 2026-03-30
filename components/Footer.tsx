"use client";

import { motion } from "framer-motion";
import { Code2, Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-[#1E2A45]/60 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + copy */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center">
              <Code2 size={15} className="text-white" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#F1F5F9]">Sandeep Reddy Reddy</div>
              <div className="text-[12px] text-[#475569]">Senior Software Engineer · Durham, NC</div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:sandeepreddy@email.com", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-[#1E2A45]/40 border border-[#1E2A45]/60 flex items-center justify-center text-[#475569] hover:text-[#F1F5F9] hover:border-[#3B82F6]/40 transition-all duration-200"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>

          {/* Scroll top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 text-[12px] text-[#475569] hover:text-[#F1F5F9] transition-colors"
          >
            <ArrowUp size={14} />
            Back to top
          </motion.button>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-[#1E2A45]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#475569]">
          <span>© 2025 Sandeep Reddy Reddy. All rights reserved.</span>
          <span>Built with Next.js · Tailwind CSS · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
