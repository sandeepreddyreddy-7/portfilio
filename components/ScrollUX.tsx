"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollUX() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setScrollProgress(windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0);
        setShowTopBtn(totalScroll > 400);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#14B8A6] z-[100]"
        style={{ originX: 0, scaleX: scrollProgress / 100 }}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full bg-[#1E2A45]/80 backdrop-blur-md border border-[#3B82F6]/30 shadow-[0_8px_32px_rgba(59,130,246,0.2)] flex items-center justify-center text-[#F1F5F9] hover:bg-[#3B82F6] hover:border-transparent transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
