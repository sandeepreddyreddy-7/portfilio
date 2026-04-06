"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, MapPin, CheckCircle } from "lucide-react";
import { GitHubSVG, LinkedInSVG } from "@/components/Icons";

const socials = [
  {
    Icon: ({ color }: { color: string }) => <Mail size={16} style={{ color }} />,
    label: "Email",
    value: "sandeep@sandeepreddy.dev",
    href: "mailto:sandeep@sandeepreddy.dev",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    Icon: ({ color }: { color: string }) => <LinkedInSVG size={16} color={color} />,
    label: "LinkedIn",
    value: "linkedin.com/in/sandeepreddy170",
    href: "https://www.linkedin.com/in/sandeepreddy170",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.1)",
    border: "rgba(10,102,194,0.2)",
  },
  {
    Icon: ({ color }: { color: string }) => <GitHubSVG size={16} color={color} />,
    label: "GitHub",
    value: "github.com/sandeepreddyreddy-7",
    href: "https://github.com/sandeepreddyreddy-7",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.15)",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? 'Failed to send message. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28" ref={ref}>
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-radial from-[#8B5CF6]/8 to-transparent blur-3xl pointer-events-none" />

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
            Contact
            <span className="w-8 h-px bg-[#8B5CF6]" />
          </div>
          <h2 className="section-header">
            Let&apos;s Build{" "}
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#64748B] max-w-xl mx-auto">
            Open to senior engineering roles, technical leadership, and high-impact opportunities. Based in Durham, NC — open to remote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Location */}
            <div className="flex items-center gap-3 text-[#94A3B8]">
              <div className="w-9 h-9 rounded-xl bg-[#1E2A45]/60 flex items-center justify-center">
                <MapPin size={16} className="text-[#3B82F6]" />
              </div>
              <div>
                <div className="text-[11px] text-[#475569] font-semibold uppercase tracking-wider">Location</div>
                <div className="text-[14px] font-medium text-[#F1F5F9]">Durham, NC</div>
              </div>
            </div>

            {/* Social links */}
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-3 group hover:translate-x-1 transition-all duration-200"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <s.Icon color={s.color} />
                </div>
                <div>
                  <div className="text-[11px] text-[#475569] font-semibold uppercase tracking-wider">{s.label}</div>
                  <div className="text-[13px] font-medium text-[#94A3B8] group-hover:text-[#F1F5F9] transition-colors">
                    {s.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Availability badge */}
            <div className="glass rounded-2xl p-5 border border-[#1E2A45]/60">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] shadow-[0_0_8px_#14B8A6] animate-pulse" />
                <span className="text-xs font-semibold text-[#14B8A6] uppercase tracking-wider">Available</span>
              </div>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                Currently exploring senior engineering and technical lead opportunities.
                Response within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="glass rounded-2xl p-10 border border-[#1E2A45]/60 flex flex-col items-center justify-center text-center h-full min-h-[360px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle size={48} className="text-[#14B8A6] mb-4" />
                </motion.div>
                <h3 className="text-[20px] font-bold text-[#F1F5F9] mb-2">Message Received</h3>
                <p className="text-[14px] text-[#64748B]">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-[#1E2A45]/60 space-y-5" aria-label="Contact form">
                <div aria-live="polite" aria-atomic="true" className="sr-only">
                  {error ? `Error: ${error}` : ""}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-[12px] font-semibold text-[#475569] uppercase tracking-wider block mb-2">
                      Name <span aria-hidden="true" className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Smith"
                      required
                      aria-required="true"
                      className="w-full bg-[#0B0F19]/60 border border-[#1E2A45] rounded-xl px-4 py-3 text-[14px] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-[12px] font-semibold text-[#475569] uppercase tracking-wider block mb-2">
                      Email <span aria-hidden="true" className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@company.com"
                      required
                      aria-required="true"
                      className="w-full bg-[#0B0F19]/60 border border-[#1E2A45] rounded-xl px-4 py-3 text-[14px] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-[12px] font-semibold text-[#475569] uppercase tracking-wider block mb-2">
                    Message <span aria-hidden="true" className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about the opportunity or project..."
                    required
                    aria-required="true"
                    rows={5}
                    className="w-full bg-[#0B0F19]/60 border border-[#1E2A45] rounded-xl px-4 py-3 text-[14px] text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p role="alert" className="text-[13px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 text-[14px]"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
