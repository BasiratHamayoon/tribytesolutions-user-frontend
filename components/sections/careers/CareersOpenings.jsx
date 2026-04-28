"use client";
import { useState, useEffect, useRef } from "react";
import { FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import ParticleBackground from "@/components/ui/ParticleBackground";

const departments = ["All", "Engineering", "Design", "Marketing", "Operations"];

const openings = [
  { title: "Senior React Developer", dept: "Engineering", location: "Remote", type: "Full-time", level: "Senior" },
  { title: "Backend Engineer (Node.js)", dept: "Engineering", location: "Remote", type: "Full-time", level: "Mid-Senior" },
  { title: "Mobile Developer (Flutter)", dept: "Engineering", location: "Remote", type: "Full-time", level: "Mid" },
  { title: "DevOps Engineer", dept: "Engineering", location: "Remote", type: "Full-time", level: "Senior" },
  { title: "UI/UX Designer", dept: "Design", location: "Remote", type: "Full-time", level: "Mid" },
  { title: "Product Designer", dept: "Design", location: "Hybrid", type: "Full-time", level: "Senior" },
  { title: "Content Strategist", dept: "Marketing", location: "Remote", type: "Full-time", level: "Mid" },
  { title: "Project Manager", dept: "Operations", location: "Remote", type: "Full-time", level: "Senior" },
];

export default function CareersOpenings() {
  const [inView, setInView] = useState(false);
  const [activeDept, setActiveDept] = useState("All");
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeDept === "All" ? openings : openings.filter((o) => o.dept === activeDept);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section ref={ref} id="openings" className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-10">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Open positions</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Current{" "}
              <span className="relative inline-block text-orange-500">
                openings
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 170 5" fill="none">
                  <path d="M1 3.5C30 1 60 1 85 2.5C110 4 140 2 169 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="170" style={{ strokeDashoffset: inView ? 0 : 170, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-10 flex-wrap" style={t(300)}>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-1.5 text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                activeDept === dept
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-500/[0.06] hover:text-orange-500"
              }`}
              style={{ borderRadius: "4px" }}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="space-y-2" style={t(400)}>
          {filtered.map((job, i) => (
            <div key={i} className="group relative bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 cursor-pointer" style={{ borderRadius: "4px" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3">
                <div>
                  <h3 className="font-heading font-bold text-[14px] text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300 mb-1">{job.title}</h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-orange-500/10 text-orange-500 uppercase tracking-wider" style={{ borderRadius: "3px" }}>{job.dept}</span>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                      <FiMapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
                      <FiClock className="w-3 h-3" />
                      {job.type}
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{job.level}</span>
                  </div>
                </div>

                <Link
                  href="/#contact"
                  className="group/btn inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer self-start sm:self-center"
                  style={{ borderRadius: "4px" }}
                >
                  Apply
                  <FiArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[13px] text-gray-400 dark:text-gray-500">No openings in this department right now. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}