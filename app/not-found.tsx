"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Nav />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#EF4444]/5 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 glass p-10 rounded-3xl border border-[#1E2A45]/80 max-w-lg w-full">
          <div className="flex justify-center mb-6">
            <div className="text-[#EF4444] font-black text-8xl tracking-tighter mix-blend-plus-lighter drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              404
            </div>
          </div>
          <h1 className="text-[22px] font-bold mb-3 text-[#F1F5F9]">Signal Lost</h1>
          <p className="text-[#94A3B8] text-[15px] leading-relaxed mb-8 max-w-sm mx-auto">
            The endpoint you requested does not exist or has been securely deprecated from the platform. 
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex justify-center w-full sm:w-auto items-center gap-2 group mx-auto"
          >
            <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm tracking-wide">Return to Root</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
