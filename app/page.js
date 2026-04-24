import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TechStackSection from "@/components/sections/TechStackSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CareersSection from "@/components/sections/CareersSection";
import CTASection from "@/components/sections/CTASection";
import PartnersSection from "@/components/sections/PartnersSection";
import ContactSection from "@/components/sections/ContactSection";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <ParticleBackground />
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <TechStackSection />
      <TestimonialsSection />
      <CareersSection />
      <CTASection />
      <ContactSection />
    </main>
  );
}