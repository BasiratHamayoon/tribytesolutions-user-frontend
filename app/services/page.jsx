import ServiceProcess from "@/components/sections/ServiceProcess";
import ServicesCTA from "@/components/sections/ServicesCTA";
import ServicesDetailed from "@/components/sections/ServicesDetailed";
import ServicesHero from "@/components/sections/ServicesHero";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ServicesTech from "@/components/sections/ServicesTech";


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