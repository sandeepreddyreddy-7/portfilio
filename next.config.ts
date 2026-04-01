import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // unsafe-eval only in dev — React needs it for error overlays / call stack reconstruction
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io"
                : "script-src 'self' 'unsafe-inline' https://plausible.io",
              // Google Fonts CSS is served from fonts.googleapis.com
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://cdn.sanity.io",
              // Google Fonts binary files are served from fonts.gstatic.com
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://plausible.io",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
