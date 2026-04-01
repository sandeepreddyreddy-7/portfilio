"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-[#F1F5F9] px-6 text-center">
      <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-700/10 border border-red-500/20 flex items-center justify-center">
        <span className="text-2xl" aria-hidden="true">⚠</span>
      </div>
      <h1 className="text-[28px] font-extrabold tracking-tight mb-3">Something went wrong</h1>
      <p className="text-[15px] text-[#64748B] max-w-md mb-8">
        An unexpected error occurred. You can try again or return to the home page.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
        <a href="/" className="btn-secondary">
          Go home
        </a>
      </div>
    </div>
  );
}
