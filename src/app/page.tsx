import { prisma } from '@/lib/prisma';
import Hero from '../components/Hero';
import HorizontalScroll from '../components/HorizontalScroll';
import MeshNetwork from '../components/MeshNetwork';
import ParallaxSection from '../components/ParallaxSection';
import SplitScreenAnalytics from '../components/SplitScreenAnalytics';
import GalleryGrid from '../components/GalleryGrid';
import AboutSection from '../components/AboutSection';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let portfolio;
  
  try {
    // For the prototype, just grab the first portfolio in the DB
    portfolio = await prisma.portfolio.findFirst();
  } catch (err) {
    console.error("Database connection failed, using fallback data", err);
  }

  // Fallback defaults if DB is empty or unreachable locally
  const aboutText = portfolio?.aboutText || "A multidisciplinary 3rd-year Computer Science student focused on data workflows, automation, and software development with applied artificial intelligence. Built backend systems, web applications, and AI-enabled tools through internships, projects, and winning hackathons.";
  const missionLog = portfolio?.missionLog || "Architecting resilient, decentralized mesh networks for nano-satellites. Integrating onboard Edge AI for autonomous orbital decision-making, minimizing ground-station latency, and ensuring continuous high-fidelity telemetry streaming.";
  const profileImage = portfolio?.profileImage || "/img/profile.jpg";
  const primaryColor = portfolio?.themePrimaryColor || "#ff3333";

  return (
    <main className="w-full bg-[var(--background)]">
      {/* Dynamically inject the CSS variables for the theme */}
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --accent-neon-red: ${primaryColor};
          }
        `
      }} />

      <Hero missionLog={missionLog} />
      <AboutSection aboutText={aboutText} profileImage={profileImage} />
      <HorizontalScroll />
      <MeshNetwork />
      <ParallaxSection />
      <SplitScreenAnalytics />
      <GalleryGrid />
    </main>
  );
}
