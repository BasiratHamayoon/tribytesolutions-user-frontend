import TeamCTA from "@/components/sections/team/TeamCTA";
import TeamCulture from "@/components/sections/team/TeamCulture";
import TeamHero from "@/components/sections/team/TeamHero";
import TeamLeaders from "@/components/sections/team/TeamLeaders";
import TeamMembers from "@/components/sections/team/TeamMembers";
import TeamStats from "@/components/sections/team/TeamStats";


export const metadata = {
  title: "Our Team - TriByte Solutions",
  description:
    "Meet the talented engineers, designers, and strategists behind TriByte Solutions. World-class talent building world-class products.",
};

export default function TeamPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <TeamHero />
      <TeamLeaders />
      <TeamMembers />
      <TeamStats />
      <TeamCulture />
      <TeamCTA />
    </main>
  );
}