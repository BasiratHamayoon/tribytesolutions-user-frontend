"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/common/SectionHeading";
import { techStack } from "@/data/techStack";

const categoryColors = {
  Frontend: "from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400",
  Backend: "from-green-500/20 to-green-600/10 border-green-500/20 text-green-400",
  Database: "from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400",
  Cloud: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 text-cyan-400",
  DevOps: "from-orange-500/20 to-orange-600/10 border-orange-500/20 text-orange-400",
  "AI/ML": "from-pink-500/20 to-pink-600/10 border-pink-500/20 text-pink-400",
  Mobile: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/20 text-yellow-400",
  API: "from-red-500/20 to-red-600/10 border-red-500/20 text-red-400",
};

export default function TechStackSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Tech Stack"
          title="Technologies We Master"
          description="We use the latest and most reliable technologies to build robust, scalable solutions."
        />

        {/* Scrolling Tech Marquee */}
        <div className="relative mb-16 overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] gap-6">
            {[...techStack, ...techStack].map((tech, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r ${
                  categoryColors[tech.category]?.split(" ").slice(0, 2).join(" ") || "from-gray-500/20 to-gray-600/10"
                } border ${
                  categoryColors[tech.category]?.split(" ")[2] || "border-gray-500/20"
                } transition-all duration-300 hover:scale-105 cursor-default`}
              >
                <span className="text-sm font-semibold whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(
            techStack.reduce((acc, tech) => {
              if (!acc[tech.category]) acc[tech.category] = [];
              acc[tech.category].push(tech.name);
              return acc;
            }, {})
          ).map(([category, techs], index) => (
            <ScrollReveal key={category} direction="up" delay={index * 80}>
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-tribyte-orange/20 transition-all duration-500 card-3d">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-tribyte-orange mb-4">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-lg bg-muted text-muted-foreground hover:text-tribyte-orange hover:bg-tribyte-orange/5 transition-colors cursor-default font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CSS for marquee */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}