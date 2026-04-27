
import AboutSection from "@/components/sections/home/AboutSection";
import StatsSection from "@/components/sections/home/StatsSection";
import PortfolioSection from "@/components/sections/home/PortfolioSection";
import TechStackSection from "@/components/sections/home/TechStackSection";
import PartnersSection from "@/components/sections/home/PartnersSection";
import ContactSection from "@/components/sections/home/ContactSection";
import ParticleBackground from "@/components/ui/ParticleBackground";
import HeroSection from "@/components/sections/home/HeroSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
import TeamSection from "@/components/sections/home/TeamSection";

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