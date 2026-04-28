import AboutCTA from "@/components/sections/about/AboutCTA";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutMission from "@/components/sections/about/AboutMission";
import AboutStats from "@/components/sections/about/AboutStats";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutTeam from "@/components/sections/about/AboutTeam";
import AboutTimeline from "@/components/sections/about/AboutTimeline";
import AboutValues from "@/components/sections/about/AboutValues";


export const metadata = {
  title: "About Us - TriByte Solutions",
  description:
    "Learn about TriByte Solutions — our story, mission, values, and the talented team behind your next digital product.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutValues />
      <AboutStats />
      <AboutTeam />
      <AboutTimeline />
      <AboutCTA />
    </main>
  );
}