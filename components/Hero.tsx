"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, ChevronDown } from "lucide-react";
import { GitHubSVG, LinkedInSVG } from "@/components/Icons";

const codeSnippet = `// AskTPSRM · SmartGate · CatTrap
async function buildAtScale(problem: string) {
  const architecture = await design({
    approach: "distributed-first",
    resilience: "multi-zone",
    ownership: "end-to-end",
  });

  return deploy(architecture, {
    cloud: "IBM Hybrid Cloud",
    container: "OpenShift",
    pipeline: "CI/CD",
  });
}`;

const words = ["Generative AI Systems", "Security Engineering", "Enterprise Cloud Architecture", "Multi-Agent AI", "DevSecOps Pipelines", "GRC Automation"];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const word = words[wordIndex];
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(word.slice(0, displayed.length + 1));
        if (displayed.length + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(word.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  // ── Particle engine ──────────────────────────────────────────────────────────
  // 240 filled dots with idle drift, cursor repulsion, spring back, connection lines
  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }) as CanvasRenderingContext2D;
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const CLR = [
      { r: 59,  g: 130, b: 246 },
      { r: 139, g: 92,  b: 246 },
      { r: 20,  g: 184, b: 166 },
      { r: 96,  g: 165, b: 250 },
    ];

    interface Pt {
      ox: number; oy: number;
      x: number;  y: number;
      vx: number; vy: number;
      size: number; alpha: number; ci: number;
    }

    const COUNT       = W < 768 ? 80 : 240;
    const INFLUENCE_R = 130;
    const REPEL       = 4.5;
    const SPRING      = 0.035;
    const FRICTION    = 0.86;
    const IDLE_SPEED  = 0.12;
    const CONNECT_R   = 80;

    let mx = -9999, my = -9999;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOut  = () => { mx = -9999; my = -9999; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onOut, { passive: true });

    const mkPt = (): Pt => {
      const ox = Math.random() * W;
      const oy = Math.random() * H;
      return {
        ox, oy, x: ox, y: oy,
        vx: (Math.random() - 0.5) * IDLE_SPEED,
        vy: (Math.random() - 0.5) * IDLE_SPEED,
        size:  0.6 + Math.random() * 1.8,
        alpha: 0.20 + Math.random() * 0.55,
        ci: Math.floor(Math.random() * 4),
      };
    };
    const pts: Pt[] = Array.from({ length: COUNT }, mkPt);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INFLUENCE_R && dist > 0) {
          const force = (1 - dist / INFLUENCE_R) * REPEL;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;
        p.vx *= FRICTION; p.vy *= FRICTION;
        p.x  += p.vx;     p.y  += p.vy;
      }

      // Connection lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d > CONNECT_R) continue;
          const fade = (1 - d / CONNECT_R) * ((a.alpha + b.alpha) * 0.5) * 0.28;
          const c = CLR[a.ci];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + fade.toFixed(3) + ')';
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }

      // Dots + micro glow for larger particles
      for (const p of pts) {
        const c = CLR[p.ci];
        if (p.size > 1.5) {
          const gr = p.size * 5;
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
          grd.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (p.alpha * 0.20).toFixed(3) + ')');
          grd.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0)');
          ctx.beginPath(); ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + p.alpha.toFixed(3) + ')';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onOut);
    };
  }, [prefersReducedMotion]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3-D canvas — mouse parallax passes through */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-radial from-[#1E2A4A]/60 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-[#8B5CF6]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-xs font-medium text-[#94A3B8] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] shadow-[0_0_8px_#14B8A6] animate-pulse" />
              <MapPin size={12} className="text-[#14B8A6]" />
              Durham, NC | Open to Senior Engineering, Staff, and Technical Lead roles
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-[clamp(36px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-[clamp(28px,4vw,40px)] text-[#F1F5F9] block mb-2">Sandeep Reddy</span>
              <span className="text-[clamp(16px,2vw,22px)] text-[#94A3B8] block mb-8 font-medium">Senior Software Engineer <span className="text-[#1E2A45] px-2">|</span> AI / Security / GRC <span className="text-[#1E2A45] px-2">|</span> Full Stack & Cloud Engineering</span>
              Engineering
              <br />
              <span className="gradient-text">{displayed}</span>
              <span className="cursor-blink gradient-text">|</span>
              <br />
              <span className="text-[#F1F5F9]">That Ships at</span>{" "}
              <span className="gradient-text">Enterprise Scale</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="text-[17px] text-[#94A3B8] leading-relaxed mb-10 max-w-lg"
            >
              Senior Full Stack Engineer with{" "}
              <span className="text-[#F1F5F9] font-semibold">8+ years</span> delivering
              production-grade platforms at <span className="text-[#F1F5F9] font-semibold">IBM</span>.
              Patent inventor, automation architect, and cloud-native builder.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </button>
              <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                Get In Touch
              </a>
            </motion.div>

            {/* Social + stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex items-center gap-6"
            >
              <a
                href="https://github.com/sandeepreddyreddy-7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#475569] hover:text-[#F1F5F9] transition-colors"
                aria-label="GitHub"
              >
                <GitHubSVG size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/sandeepreddy170"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#475569] hover:text-[#3B82F6] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInSVG size={20} />
              </a>
              <div className="h-4 w-px bg-[#1E2A45]" />
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {[
                  { value: "8+", label: "Years @ IBM" },
                  { value: "2×", label: "IBM Patents Filed" },
                  { value: "10+", label: "Distributed Services" },
                  { value: "94%", label: "AI Accuracy" },
                  { value: "4×", label: "Release Cadence" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-[15px] font-bold gradient-text">{s.value}</div>
                    <div className="text-[10px] text-[#475569] font-medium uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Code snippet */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 rounded-2xl blur-2xl" />

              <div className="relative glass rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1E2A45]/60 bg-[#0F1424]/80">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-3 text-xs text-[#475569] font-mono">system.architecture.ts</span>
                </div>

                {/* Code */}
                <div className="p-6 font-mono text-[13px] leading-7">
                  {codeSnippet.split("\n").map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                      className="text-[#94A3B8] whitespace-pre"
                    >
                      {line
                        .split(/(\/\/.*|"[^"]*"|async|await|const|return|function|true|false)/)
                        .map((part, j) => {
                          if (part.startsWith("//")) return <span key={j} className="text-[#475569] italic">{part}</span>;
                          if (part.startsWith('"')) return <span key={j} className="text-[#14B8A6]">{part}</span>;
                          if (["async", "await", "const", "return", "function"].includes(part))
                            return <span key={j} className="text-[#8B5CF6]">{part}</span>;
                          if (part === "true" || part === "false")
                            return <span key={j} className="text-[#3B82F6]">{part}</span>;
                          return <span key={j}>{part}</span>;
                        })}
                    </motion.div>
                  ))}
                </div>

                {/* Status bar */}
                <div className="px-5 py-3 border-t border-[#1E2A45]/60 bg-[#0F1424]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                    <span className="text-xs text-[#64748B] font-mono">TypeScript · Ready</span>
                  </div>
                  <div className="flex gap-3 text-xs text-[#64748B] font-mono">
                    <span>IBM Hybrid Cloud</span>
                    <span>·</span>
                    <span>OpenShift</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="text-xs text-[#64748B] font-medium mb-1">Patents Filed</div>
                <div className="text-lg font-bold gradient-text">2×</div>
              </motion.div>

              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="text-xs text-[#64748B] font-medium mb-1">Experience</div>
                <div className="text-lg font-bold gradient-text-teal">8+ yrs</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#475569] hover:text-[#94A3B8] transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
