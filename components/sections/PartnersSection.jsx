"use client";
import { useEffect, useRef, useState } from "react";
import {
  SiGooglecloud,
  SiStripe,
  SiSalesforce,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiVercel,
  SiKubernetes,
  SiRedis,
  SiPostgresql,
  SiGraphql,
  SiFirebase,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const partners = [
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Salesforce", icon: SiSalesforce, color: "#00A1E0" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "GitHub", icon: SiGithub, color: null },
  { name: "Vercel", icon: SiVercel, color: null },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: null },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

function PartnerItem({ icon: Icon, name, color }) {
  const isNeutral = !color;

  return (
    <div className="flex-shrink-0 mx-3 group cursor-default">
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

export default function PartnersSection() {
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
      className="relative w-full bg-white dark:bg-[#0c0c0f] py-10 overflow-hidden border-t border-gray-100 dark:border-white/[0.04] border-b border-gray-100 dark:border-b-white/[0.04]"
    >
      {/* Label */}
      <div style={t(0)} className="text-center mb-6">
        <div className="inline-flex items-center gap-2">
          <span className="w-5 h-[1.5px] bg-orange-500 rounded-full" />
          <span className="text-[9px] font-extrabold text-gray-500 dark:text-gray-400 tracking-[0.25em] uppercase">
            Trusted by industry leaders
          </span>
          <span className="w-5 h-[1.5px] bg-orange-500 rounded-full" />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden" style={t(150)}>
        <div className="marquee-track">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <PartnerItem
              key={`p-${index}`}
              icon={partner.icon}
              name={partner.name}
              color={partner.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}