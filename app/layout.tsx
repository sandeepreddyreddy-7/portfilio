import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sandeepreddy.dev"),
  title: "Sandeep Reddy Reddy — Senior Software Engineer",
  description:
    "Senior Full Stack Software Engineer with 8+ years building enterprise-grade platforms, automation systems, and cloud-native applications at IBM. 2× Patent Inventor.",
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
  authors: [{ name: "Sandeep Reddy Reddy" }],
  openGraph: {
    title: "Sandeep Reddy Reddy — Senior Software Engineer",
    description:
      "Building enterprise-grade platforms and automation systems that power real-world operations.",
    type: "website",
    locale: "en_US",
    url: "https://sandeepreddy.dev",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sandeep Reddy Reddy - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Reddy Reddy — Senior Software Engineer",
    description:
      "Building enterprise-grade platforms and automation systems that power real-world operations.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sandeep Reddy Reddy",
  url: "https://sandeepreddy.dev",
  jobTitle: "Senior Software Engineer",
  description:
    "Senior Full Stack Software Engineer with 8+ years building enterprise-grade platforms, automation systems, and cloud-native applications at IBM. 2× Patent Inventor.",
  email: "asandeepreddy170@gmail.com",
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
