"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    id: 1,
    category: "Mobile App",
    title: "FireFit — Health & Fitness Platform",
    description:
      "A world-class fitness tracking app with real-time workout analytics, personalized training plans, and seamless UX across iOS and Android used by thousands of fitness enthusiasts.",
    image: "/p1.png",
    tags: ["React Native", "Node.js", "Firebase"],
    link: "#",
  },
  {
    id: 2,
    category: "SaaS Product",
    title: "MyGoals — Productivity & Goal Tracker",
    description:
      "A comprehensive productivity platform with habit tracking, milestone management, and insightful progress dashboards helping professionals achieve their goals daily.",
    image: "/p2.png",
    tags: ["Next.js", "PostgreSQL", "Tailwind"],
    link: "#",
  },
  {
    id: 3,
    category: "Web Platform",
    title: "MediTrack — Healthcare Management",
    description:
      "A HIPAA-compliant healthcare platform streamlining patient records, appointment scheduling, and telemedicine for clinics across North America.",
    image: "/p3.png",
    tags: ["React", "Python", "AWS"],
    link: "#",
  },
];

function ProjectCard({ project, index, inView }) {
  const isEven = index % 2 === 0;

  const cardStyle = {
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${index * 200 + 200}ms`,
    opacity: inView ? 1 : 0,
    transform: inView
      ? "translateY(0) translateX(0)"
      : `translateY(40px) translateX(${isEven ? "-20px" : "20px"})`,
  };

  return (
    <div
      style={cardStyle}
      className="group relative flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-gray-200 dark:hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] dark:hover:shadow-black/30"
    >
      {/* ── Image Panel ── */}
      <div
        className={`relative w-full lg:w-[400px] xl:w-[440px] flex-shrink-0 min-h-[280px] lg:min-h-[300px] overflow-hidden bg-gray-50 dark:bg-[#0a0a0d] ${
          index % 2 === 1 ? "lg:order-last" : ""
        }`}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Phone mockup — overflows top and bottom */}
        <div className="absolute inset-x-0 -top-6 -bottom-6 flex items-center justify-center px-6">
          <div className="relative w-[240px] h-[calc(100%+12px)] transition-transform duration-700 group-hover:scale-[1.08] group-hover:-translate-y-3">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="300px"
            />
          </div>
        </div>

        {/* Category pill */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-3 py-1 bg-white dark:bg-white/[0.08] text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-[0.15em] uppercase border border-gray-200 dark:border-white/[0.08]"
            style={{ borderRadius: "3px" }}
          >
            {project.category}
          </span>
        </div>

        {/* Project number */}
        <div className="absolute bottom-4 right-5 font-heading font-extrabold text-gray-200/40 dark:text-white/[0.04] text-6xl leading-none select-none pointer-events-none">
          {String(project.id).padStart(2, "0")}
        </div>

        {/* Corner accents on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-5 h-[1.5px] bg-orange-500 ml-auto" />
          <div className="w-[1.5px] h-5 bg-orange-500 ml-auto mt-[-1.5px]" />
        </div>
      </div>

      {/* ── Text Panel ── */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-11">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 text-[10px] font-bold tracking-wider uppercase border border-gray-200/60 dark:border-white/[0.06]"
              style={{ borderRadius: "3px" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl lg:text-[22px] text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-400 tracking-[-0.02em]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 leading-[1.7] mb-7 max-w-md">
          {project.description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 dark:bg-white/[0.04] mb-6" />

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href={project.link}
            className="group/link inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-bold tracking-[-0.01em] transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-100 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer"
            style={{ borderRadius: "3px" }}
          >
            View Project
            <FiArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
          </Link>

          <Link
            href={project.link}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 cursor-pointer"
          >
            <FiExternalLink className="w-3 h-3" />
            Live Demo
          </Link>
        </div>
      </div>

      {/* Hover border accent — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

export default function PortfolioSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-gray-50 dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden"
    >
      {/* BG decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 left-0 w-[350px] h-[350px] rounded-full opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-6">
          <div>
            <div style={t(0)}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                  Our recent work
                </span>
              </div>
            </div>

            <div style={t(150)}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.5rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
                Featured{" "}
                <span className="relative inline-block text-orange-500">
                  Projects
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
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

            <div style={t(300)}>
              <p className="mt-3 text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                Explore our latest work — real products built for real
                businesses.
              </p>
            </div>
          </div>

          <div style={t(300)}>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 px-4 py-1.5 border-[1.5px] border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 text-[11px] font-bold tracking-wide hover:border-orange-500 hover:text-orange-500 transition-all duration-300 cursor-pointer"
              style={{ borderRadius: "3px" }}
            >
              View all projects
              <FiArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}