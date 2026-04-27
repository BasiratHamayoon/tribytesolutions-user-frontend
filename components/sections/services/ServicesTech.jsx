"use client";
import { useState, useEffect, useRef } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb,
  SiRedis, SiDocker, SiKubernetes, SiFirebase,
  SiGraphql, SiGithub, SiVercel, SiFlutter,
} from "react-icons/si";
import ParticleBackground from "@/components/ui/ParticleBackground";

const techs = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: null },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "GitHub", icon: SiGithub, color: null },
  { name: "Vercel", icon: SiVercel, color: null },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
];

export default function ServicesTech() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const t = (d) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${d}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
  });

  return (
    <section
      ref={ref}
      className="relative w-full bg-white dark:bg-[#09090b] py-16 overflow-hidden border-t border-gray-100 dark:border-white/[0.04]"
    >
      <ParticleBackground />

      <div className="relative z-10">
        <div className="text-center mb-8" style={t(0)}>
          <div className="inline-flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-orange-500 rounded-full" />
            <span className="text-[9px] font-extrabold text-gray-500 dark:text-gray-400 tracking-[0.25em] uppercase">
              Technologies we use
            </span>
            <span className="w-5 h-[1.5px] bg-orange-500 rounded-full" />
          </div>
        </div>

        <div className="relative overflow-hidden" style={t(150)}>
          <div className="marquee-track">
            {[...techs, ...techs, ...techs].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={i} className="flex-shrink-0 mx-2 group cursor-default">
                  <div className="flex items-center gap-2.5 px-4 py-2 group-hover:scale-105 transition-all duration-300">
                    <Icon
                      className={`w-5 h-5 ${!tech.color ? "text-gray-700 dark:text-white" : ""}`}
                      style={tech.color ? { color: tech.color } : undefined}
                    />
                    <span className="text-[12px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors duration-300 whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}