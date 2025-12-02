import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TechMarquee from '@/components/TechMarquee';
import Difference from '@/components/Difference';
import Footer from '@/components/Footer';
import ColorBends from '@/components/ColorBends';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-a/30 selection:text-brand-a relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={1.4}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        />
      </div>
      <div className="relative z-10">
        <Header />
        <Hero />
        <TechMarquee />
        <Services />
        <Difference />
        <Footer />
      </div>
    </main>
  );
}
