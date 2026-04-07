import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import type { Project, Experience as ExperienceData, Patent, Skill, About as AboutData } from "@/lib/sanity-types";
import * as Sentry from "@sentry/nextjs";
import { logger } from "@/lib/logger";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Patents from "@/components/Patents";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectsSkeleton from "@/components/ProjectsSkeleton";
import SkillsSkeleton from "@/components/SkillsSkeleton";
import ExperienceSkeleton from "@/components/ExperienceSkeleton";

export const revalidate = 60;

export default async function Home() {
  let projectsData: Project[] = [];
  let experienceData: ExperienceData[] = [];
  let patentsData: Patent[] = [];
  let skillsData: Skill[] = [];
  let aboutData: AboutData | null = null;

  try {
    [projectsData, experienceData, patentsData, skillsData, aboutData] = await Promise.all([
      client.fetch<Project[]>(`*[_type == "project"] | order(order asc)[0...50]`),
      client.fetch<ExperienceData[]>(`*[_type == "experience"] | order(order asc)[0...50]`),
      client.fetch<Patent[]>(`*[_type == "patent"] | order(order asc)[0...50]`),
      client.fetch<Skill[]>(`*[_type == "skill"] | order(order asc)[0...50]`),
      client.fetch<AboutData | null>(`*[_type == "about"][0]`)
    ]);
  } catch (error) {
    // Log to observability service
    logger.error('[page] Sanity fetch failed', error instanceof Error ? error : new Error(String(error)), {
      queries: ['project', 'experience', 'patent', 'skill', 'about'],
    });

    // Capture in Sentry for monitoring
    Sentry.captureException(error, {
      level: 'error',
      tags: { component: 'home', section: 'sanity-fetch' },
      contexts: {
        sanity: {
          message: 'Failed to fetch portfolio data from Sanity CMS',
        },
      },
    });

    // Fallback: all data defaults to empty arrays/null
    // UI will render with skeleton loaders and empty states
  }

  return (
    <>
      <Nav />
      <main suppressHydrationWarning>
        <Hero />
        <About aboutData={aboutData} />
        <Suspense fallback={<SkillsSkeleton />}>
          <Skills skillsData={skillsData} />
        </Suspense>
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects projectsData={projectsData} />
        </Suspense>
        <Suspense fallback={<ExperienceSkeleton />}>
          <Experience experienceData={experienceData} />
        </Suspense>
        <Patents patentsData={patentsData} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
