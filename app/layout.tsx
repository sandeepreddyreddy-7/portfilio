import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sandeepreddy.dev"),
  title: "Sandeep Reddy — Senior Software Engineer | AI, Security & Cloud",
  description:
    "Senior Software Engineer with 8+ years at IBM. Named inventor on 2 IBM patents. Production GenAI systems, enterprise security platforms, and DevSecOps pipelines.",
  keywords: [
    "Sandeep Reddy",
    "Senior Software Engineer",
    "Full Stack",
    "Cloud",
    "IBM",
    "React",
    "Node.js",
    "Java",
    "Spring Boot",
    "Docker",
    "OpenShift",
    "DevOps",
  ],
  authors: [{ name: "Sandeep Reddy" }],
  openGraph: {
    title: "Sandeep Reddy — Senior Software Engineer | AI, Security & Cloud",
    description:
      "Senior Software Engineer with 8+ years at IBM. Named inventor on 2 IBM patents. Production GenAI systems, enterprise security platforms, and DevSecOps pipelines.",
    type: "website",
    locale: "en_US",
    url: "https://sandeepreddy.dev",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sandeep Reddy - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Reddy — Senior Software Engineer | AI, Security & Cloud",
    description:
      "Senior Software Engineer with 8+ years at IBM. Named inventor on 2 IBM patents. Production GenAI systems, enterprise security platforms, and DevSecOps pipelines.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sandeep Reddy",
  url: "https://sandeepreddy.dev",
  jobTitle: "Senior Software Engineer",
  description:
    "Senior Full Stack Software Engineer with 8+ years building enterprise-grade platforms, automation systems, and cloud-native applications at IBM. 2× Patent Inventor.",
  email: "sandeep@sandeepreddy.dev",
  sameAs: [
    "https://github.com/sandeepreddyreddy-7",
    "https://www.linkedin.com/in/sandeepreddy170",
  ],
  worksFor: {
    "@type": "Organization",
    name: "IBM",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Texas A&M University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "SRM University",
    },
  ],
  knowsAbout: [
    "Generative AI",
    "Full Stack Engineering",
    "Cloud Architecture",
    "DevSecOps",
    "IBM OpenShift",
    "Security Engineering",
  ],
};

import ScrollUX from "@/components/ScrollUX";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <head>
        <Script defer data-domain="sandeepreddy.dev" src="https://plausible.io/js/script.js" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#F1F5F9]" suppressHydrationWarning>
        <ScrollUX />
        {children}
      </body>
    </html>
  );
}
