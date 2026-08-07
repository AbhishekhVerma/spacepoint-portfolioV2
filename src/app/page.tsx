import Hero from '../components/Hero';
import HorizontalScroll from '../components/HorizontalScroll';
import MeshNetwork from '../components/MeshNetwork';
import ParallaxSection from '../components/ParallaxSection';
import SplitScreenAnalytics from '../components/SplitScreenAnalytics';
import GalleryGrid from '../components/GalleryGrid';

export default function Home() {
  return (
    <main className="w-full bg-[var(--background)]">
      <Hero />
      <HorizontalScroll />
      <MeshNetwork />
      <ParallaxSection />
      <SplitScreenAnalytics />
      <GalleryGrid />
    </main>
  );
}
