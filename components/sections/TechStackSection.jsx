"use client";
import { useState, useEffect, useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiRust,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiKubernetes,
  SiGithub,
  SiVercel,
  SiGraphql,
  SiFlutter,
  SiVuedotjs,
  SiAngular,
  SiDjango,
  SiExpress,
  SiMysql,
  SiSvelte,
} from "react-icons/si";

const techRow1 = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: null },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "Svelte", icon: SiSvelte, color: "#FF3E00" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
  { name: "Rust", icon: SiRust, color: "#DEA584" },
];

const techRow2 = [
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "GitHub", icon: SiGithub, color: null },
  { name: "Vercel", icon: SiVercel, color: null },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "Express", icon: SiExpress, color: null },
];

function TechItem({ icon: Icon, name, color }) {
  const isNeutral = !color;

  return (
    <div className="flex-shrink-0 mx-2 group cursor-default">
      <div className="flex items-center gap-2.5 px-4 py-2 transition-all duration-300 group-hover:scale-105">
        <Icon
          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
            isNeutral ? "text-gray-700 dark:text-white" : ""
          }`}
          style={color ? { color } : undefined}
        />
        <span className="text-[12px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors duration-300 whitespace-nowrap tracking-wide">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function TechStackSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gray-50/50 dark:bg-[#0c0c0f] py-14 overflow-hidden border-t border-gray-100 dark:border-white/[0.04] border-b border-gray-100 dark:border-b-white/[0.04]"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

      {/* Label */}
      <div style={t(0)} className="text-center mb-8">
        <div className="inline-flex items-center gap-2">
          <span className="w-5 h-[1.5px] bg-orange-500 rounded-full" />
          <span className="text-[9px] font-extrabold text-gray-500 dark:text-gray-400 tracking-[0.25em] uppercase">
            Technologies we master
          </span>
          <span className="w-5 h-[1.5px] bg-orange-500 rounded-full" />
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="relative overflow-hidden" style={t(150)}>
        {/* Row 1 → left to right */}
        <div className="marquee-track mb-2">
          {[...techRow1, ...techRow1, ...techRow1].map((tech, index) => (
            <TechItem
              key={`r1-${index}`}
              icon={tech.icon}
              name={tech.name}
              color={tech.color}
            />
          ))}
        </div>

        {/* Row 2 → right to left */}
        <div className="marquee-track-reverse">
          {[...techRow2, ...techRow2, ...techRow2].map((tech, index) => (
            <TechItem
              key={`r2-${index}`}
              icon={tech.icon}
              name={tech.name}
              color={tech.color}
            />
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />
    </section>
  );
}