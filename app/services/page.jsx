import ServiceProcess from "@/components/sections/services/ServiceProcess";
import ServicesCTA from "@/components/sections/services/ServicesCTA";
import ServicesDetailed from "@/components/sections/services/ServicesDetailed";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesOverview from "@/components/sections/services/ServicesOverview";
import ServicesTech from "@/components/sections/services/ServicesTech";


export const metadata = {
  title: "Our Services - TriByte Solutions",
  description:
    "Explore our comprehensive IT services including web development, mobile apps, cloud solutions, AI/ML, DevOps, and more.",
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ServicesHero />
      <ServicesOverview />
      <ServicesDetailed />
      <ServiceProcess />
      <ServicesTech />
      <ServicesCTA />
    </main>
  );
}