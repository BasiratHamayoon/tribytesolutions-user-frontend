
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TechStackSection from "@/components/sections/TechStackSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ContactSection from "@/components/sections/ContactSection";
import ParticleBackground from "@/components/ui/ParticleBackground";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <ParticleBackground />
      <HeroSection />
      <ServicesSection />
      <PartnersSection />
      <AboutSection />
      <StatsSection />
      <PortfolioSection />
      <TeamSection />
      <TechStackSection />
      <ContactSection />
    </main>
  );
}