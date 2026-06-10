"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight, FiExternalLink,
  FiChevronLeft, FiChevronRight, FiGithub,
} from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useProjects } from "@/hooks/useProjects";
import { getImageUrl } from "@/utils/getImageUrl";

function cleanSlug(project) {
  const raw = project.slug || project.title || String(project._id);
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function SkeletonCard() {
  return (
    <div
      className="relative flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
      style={{ borderRadius: "4px" }}
    >
      <div className="w-full lg:w-[400px] xl:w-[440px] flex-shrink-0 min-h-[280px] lg:min-h-[320px] bg-gray-100 dark:bg-[#0a0a0d] animate-pulse" />
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-11 space-y-4">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
          <div className="h-5 w-20 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
        </div>
        <div className="h-7 w-3/4 bg-gray-100 dark:bg-white/[0.06] rounded animate-pulse" />
        <div className="h-4 w-full bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
        <div className="h-px bg-gray-100 dark:bg-white/[0.04]" />
        <div className="flex gap-3">
          <div className="h-7 w-28 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioShowcase() {
  const { projects, loading, error, categories } = useProjects();
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const allCategories = ["All", ...categories];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => { setCurrent(0); }, [activeCategory]);

  const prev = () => setCurrent((c) => (c - 1 + filtered.length) % filtered.length);
  const next = () => setCurrent((c) => (c + 1) % filtered.length);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={ref}
      id="showcase"
      className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden"
    >
      <ParticleBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-10">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                Case studies
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Featured{" "}
              <span className="relative inline-block text-orange-500">
                Portfolio
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  height="5"
                  viewBox="0 0 160 5"
                  fill="none"
                >
                  <path
                    d="M1 3.5C30 1 60 1 80 2.5C100 4 130 2 159 3.5"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="160"
                    style={{
                      strokeDashoffset: inView ? 0 : 160,
                      transition: "stroke-dashoffset 1.2s ease-out 0.6s",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        {!loading && allCategories.length > 1 && (
          <div
            className="flex items-center justify-center gap-1.5 mb-10 flex-wrap"
            style={t(300)}
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-500/[0.06] hover:text-orange-500 border border-gray-200 dark:border-transparent"
                }`}
                style={{ borderRadius: "4px" }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div style={t(400)} className="relative">
          {loading ? (
            <SkeletonCard />
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Unable to load projects. Please try again later.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {filtered.map((project, i) => {
                    const imageUrl = getImageUrl(project.image);
                    const techStack = Array.isArray(project.techStack)
                      ? project.techStack
                      : [];
                    const slug = cleanSlug(project);

                    return (
                      <div key={project._id} className="w-full flex-shrink-0">
                        <div
                          className="group relative flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] dark:hover:shadow-black/30"
                          style={{ borderRadius: "4px" }}
                        >
                          <div
                            className={`relative w-full lg:w-[400px] xl:w-[440px] flex-shrink-0 min-h-[280px] lg:min-h-[360px] overflow-hidden bg-gray-100 dark:bg-[#0a0a0d] ${
                              i % 2 === 1 ? "lg:order-last" : ""
                            }`}
                          >
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 440px"
                                unoptimized
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-[#0a0a0d]">
                                <span className="text-6xl font-black text-gray-200 dark:text-white/[0.04]">
                                  {project.title?.charAt(0)}
                                </span>
                              </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                            <div className="absolute top-4 left-4 z-10">
                              <span
                                className="px-3 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-[10px] font-bold tracking-[0.15em] uppercase border border-white/20"
                                style={{ borderRadius: "3px" }}
                              >
                                {project.category}
                              </span>
                            </div>

                            {project.tag && (
                              <div className="absolute top-4 right-4 z-10">
                                <span
                                  className="px-2.5 py-1 bg-orange-500 text-white text-[9px] font-bold tracking-wider uppercase"
                                  style={{ borderRadius: "3px" }}
                                >
                                  {project.tag}
                                </span>
                              </div>
                            )}

                            <div className="absolute bottom-4 right-5 font-heading font-extrabold text-white/10 text-6xl leading-none select-none pointer-events-none z-10">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                          </div>

                          <div className="flex-1 flex flex-col justify-center p-8 lg:p-11">
                            {techStack.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-5">
                                {techStack.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 text-[10px] font-bold tracking-wider uppercase border border-gray-200/60 dark:border-white/[0.06]"
                                    style={{ borderRadius: "3px" }}
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {techStack.length > 4 && (
                                  <span
                                    className="px-2.5 py-1 bg-orange-500/[0.08] text-orange-500 text-[10px] font-bold"
                                    style={{ borderRadius: "3px" }}
                                  >
                                    +{techStack.length - 4}
                                  </span>
                                )}
                              </div>
                            )}

                            <h3 className="font-heading font-bold text-xl lg:text-[22px] text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-300 tracking-[-0.02em]">
                              {project.title}
                            </h3>

                            <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 leading-[1.7] mb-6 max-w-md">
                              {project.description}
                            </p>

                            <div className="w-full h-px bg-gray-200 dark:bg-white/[0.04] mb-6" />

                            <div className="flex items-center gap-4 flex-wrap">
                              <Link
                                href={`/portfolio/${slug}`}
                                className="group/link inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98]"
                                style={{ borderRadius: "3px" }}
                              >
                                View Case Study
                                <FiArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                              </Link>
                              {project.liveLink && (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors duration-300"
                                >
                                  <FiExternalLink className="w-3 h-3" />
                                  Live Demo
                                </a>
                              )}
                              {project.githubLink && (
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                >
                                  <FiGithub className="w-3 h-3" />
                                  GitHub
                                </a>
                              )}
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  {filtered.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === current
                          ? "w-6 h-[6px] bg-orange-500"
                          : "w-[6px] h-[6px] bg-gray-300 dark:bg-white/20 hover:bg-orange-400"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111114] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300"
                    style={{ borderRadius: "3px" }}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111114] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300"
                    style={{ borderRadius: "3px" }}
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}