import CareersCTA from "@/components/sections/careers/CareersCTA";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersOpenings from "@/components/sections/careers/CareersOpenings";
import CareersPerks from "@/components/sections/careers/CareersPerks";
import CareersProcess from "@/components/sections/careers/CareersProcess";


export const metadata = {
  title: "Careers - TriByte Solutions",
  description:
    "Join TriByte Solutions — explore open roles, perks, culture, and build the future of technology with our world-class team.",
};

export default function CareersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <CareersHero />
      <CareersPerks />
      <CareersOpenings />
      <CareersProcess />
      <CareersCTA />
    </main>
  );
}