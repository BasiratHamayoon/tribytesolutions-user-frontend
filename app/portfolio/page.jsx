import PortfolioCTA from "@/components/sections/portfolio/PortfolioCTA";
import PortfolioHero from "@/components/sections/portfolio/PortfolioHero";
import PortfolioProcess from "@/components/sections/portfolio/PortfolioProcess";
import PortfolioShowcase from "@/components/sections/portfolio/PortfolioShowcase";
import PortfolioStats from "@/components/sections/portfolio/PortfolioStats";
import PortfolioTestimonials from "@/components/sections/portfolio/PortfolioTestimonials";


export const metadata = {
  title: "Portfolio - TriByte Solutions",
  description:
    "Explore our portfolio of successful projects — web apps, mobile apps, cloud solutions, and AI products built for clients worldwide.",
};

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <PortfolioHero />
      <PortfolioShowcase />
      <PortfolioStats />
      <PortfolioProcess />
      <PortfolioTestimonials />
      <PortfolioCTA />
    </main>
  );
}