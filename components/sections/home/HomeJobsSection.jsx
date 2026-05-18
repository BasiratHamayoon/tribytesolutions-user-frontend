"use client";
import { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiMapPin, FiClock, FiBriefcase } from "react-icons/fi";
import Link from "next/link";

const openings = [
  {
    title: "Senior React Developer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    tag: "Hot 🔥",
  },
  {
    title: "Backend Engineer (Node.js)",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    tag: "New",
  },
  {
    title: "UI/UX Designer",
    dept: "Design",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    tag: "New",
  },
  {
    title: "Mobile Developer (Flutter)",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    tag: "",
  },
  {
    title: "DevOps Engineer",
    dept: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    tag: "Hot 🔥",
  },
  {
    title: "Project Manager",
    dept: "Operations",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    tag: "",
  },
];

function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 15 + 10,
        delay: Math.random() * 8,
        isOrange: i % 4 === 0,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.isOrange
              ? "rgba(255,107,0,0.25)"
              : "rgba(128,128,128,0.08)",
            animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomeJobsSection() {
  const [inView, setInView] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={ref}
      className="relative w-full bg-gray-50 dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Elements */}
      <Particles />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,107,0,0.3), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,107,0,0.15), transparent)",
          }}
        />
        <div
          className="absolute -top-60 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] dark:opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-60 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02] dark:opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div style={t(0)}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                  We&apos;re hiring
                </span>
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              </div>
            </div>

            <div style={t(150)}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
                Join our{" "}
                <span className="relative inline-block text-orange-500">
                  world-class
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full"
                    height="5"
                    viewBox="0 0 200 5"
                    fill="none"
                  >
                    <path
                      d="M1 3.5C40 1 80 1 100 2.5C120 4 160 2 199 3.5"
                      stroke="#ff6b00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="200"
                      style={{
                        strokeDashoffset: inView ? 0 : 200,
                        transition: "stroke-dashoffset 1.2s ease-out 0.6s",
                      }}
                    />
                  </svg>
                </span>{" "}
                team
              </h2>
            </div>

            <div style={t(300)}>
              <p className="mt-4 text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                We&apos;re always looking for talented people who are passionate
                about building great products. Remote-first, competitive pay,
                and a culture you&apos;ll love.
              </p>
            </div>
          </div>

          <div style={t(400)}>
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[12.5px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer"
              style={{ borderRadius: "4px" }}
            >
              View all openings
              <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid lg:grid-cols-2 gap-2.5" style={t(450)}>
          {openings.map((job, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-orange-500/30 dark:hover:border-orange-500/25 hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-all duration-400 cursor-pointer"
              style={{ borderRadius: "4px" }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-orange-500 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex items-center justify-between p-5 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 text-[9px] font-bold bg-orange-500/10 text-orange-500 uppercase tracking-wider"
                      style={{ borderRadius: "3px" }}
                    >
                      {job.dept}
                    </span>
                    {job.tag && (
                      <span
                        className="px-2 py-0.5 text-[9px] font-bold bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        style={{ borderRadius: "3px" }}
                      >
                        {job.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-[14px] text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300 mb-2 truncate">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                      <FiMapPin className="w-3 h-3 text-gray-400 dark:text-gray-600" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                      <FiClock className="w-3 h-3 text-gray-400 dark:text-gray-600" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                      <FiBriefcase className="w-3 h-3 text-gray-400 dark:text-gray-600" />
                      {job.level}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Link
                    href="/#contact"
                    onClick={(e) => e.stopPropagation()}
                    className="group/btn inline-flex items-center gap-1.5 px-4 py-1.5 border border-gray-200 dark:border-white/[0.1] text-gray-700 dark:text-white text-[11px] font-bold hover:border-orange-500 hover:text-orange-500 transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer"
                    style={{ borderRadius: "4px" }}
                  >
                    Apply
                    <FiArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Subtle number */}
              <span className="absolute bottom-4 right-5 text-[9px] font-bold text-gray-200 dark:text-white/[0.04] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Hover glow */}
              {hoveredIndex === i && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.04) 0%, transparent 70%)",
                    borderRadius: "4px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}