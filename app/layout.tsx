import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-[#F1F5F9]">
        {children}
      </body>
    </html>
  );
}
