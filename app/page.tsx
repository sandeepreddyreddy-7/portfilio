import { client } from "@/sanity/lib/client";
import type { Project, Experience as ExperienceData, Patent, Skill, About as AboutData } from "@/lib/sanity-types";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Patents from "@/components/Patents";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  const [projectsData, experienceData, patentsData, skillsData, aboutData] = await Promise.all([
    client.fetch<Project[]>(`*[_type == "project"] | order(order asc)`),
    client.fetch<ExperienceData[]>(`*[_type == "experience"] | order(order asc)`),
    client.fetch<Patent[]>(`*[_type == "patent"] | order(order asc)`),
    client.fetch<Skill[]>(`*[_type == "skill"] | order(order asc)`),
    client.fetch<AboutData | null>(`*[_type == "about"][0]`)
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About aboutData={aboutData} />
        <Skills skillsData={skillsData} />
        <Projects projectsData={projectsData} />
        <Experience experienceData={experienceData} />
        <Patents patentsData={patentsData} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
