"use client";
import { useState } from "react";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeading from "@/components/common/SectionHeading";
import { portfolio } from "@/data/portfolio";

const categories = [
  "All",
  "Web Application",
  "Enterprise Software",
  "Mobile & Web",
  "IoT Solution",
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-tribyte-orange/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Portfolio"
          title="Our Recent Projects"
          description="Explore our latest work showcasing innovative solutions across various industries and technologies."
        />

        {/* Filter Tabs */}
        <ScrollReveal direction="up">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-tribyte-orange text-white shadow-tribyte"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-tribyte-orange/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} direction="up" delay={index * 100}>
              <GlowCard className="h-full">
                <div className="group h-full rounded-2xl bg-card border border-border hover:border-tribyte-orange/30 overflow-hidden transition-all duration-500 card-3d">
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-tribyte-orange/10 to-tribyte-orange/5 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-tribyte-orange/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                          <FiExternalLink className="w-8 h-8 text-tribyte-orange" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-tribyte-orange/0 group-hover:bg-tribyte-orange/10 transition-colors duration-500" />

                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <button className="p-2 rounded-lg bg-white/90 dark:bg-black/70 backdrop-blur-sm hover:bg-tribyte-orange hover:text-white transition-all">
                        <FiExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/90 dark:bg-black/70 backdrop-blur-sm hover:bg-tribyte-orange hover:text-white transition-all">
                        <FiGithub className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-tribyte-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs rounded-lg bg-muted text-muted-foreground font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-sm font-bold text-tribyte-orange">
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal direction="up" delay={300}>
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-tribyte-orange/30 text-tribyte-orange font-semibold hover:bg-tribyte-orange hover:text-white transition-all duration-300 magnetic-btn">
              View All Projects
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}