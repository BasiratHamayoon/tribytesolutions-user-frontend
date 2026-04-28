"use client";
import { useState, useEffect, useRef } from "react";
import { FiUsers, FiGlobe, FiCode, FiAward } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

const stats = [
  { icon: FiUsers, value: "50+", label: "Team Members" },
  { icon: FiGlobe, value: "15+", label: "Countries" },
  { icon: FiCode, value: "30+", label: "Tech Skills" },
  { icon: FiAward, value: "8+", label: "Avg Experience" },
];

export default function TeamStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
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
    <section ref={ref} className="relative w-full bg-white dark:bg-[#09090b] py-16 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={t(i * 100 + 200)}>
                <div className="group relative text-center p-6 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 cursor-default" style={{ borderRadius: "4px" }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-10 h-10 mx-auto mb-3 bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-400" style={{ borderRadius: "4px" }}>
                    <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-400" />
                  </div>
                  <div className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}