"use client";
import { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiLayout, FiCode, FiCheckCircle } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

const steps = [
  { icon: FiMessageSquare, title: "Discovery & Strategy", description: "We understand your business goals, target users, and competitive landscape to define the right product strategy." },
  { icon: FiLayout, title: "Design & Prototype", description: "We create wireframes, design systems, and interactive prototypes that bring your vision to life before development." },
  { icon: FiCode, title: "Development & Testing", description: "Agile development sprints with continuous testing, code reviews, and performance optimization at every step." },
  { icon: FiCheckCircle, title: "Launch & Support", description: "Smooth deployment, monitoring, and ongoing support to ensure your product succeeds in the real world." },
];

export default function PortfolioProcess() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
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
    <section ref={ref} className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Our approach</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              How we build{" "}
              <span className="relative inline-block text-orange-500">
                products
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 160 5" fill="none">
                  <path d="M1 3.5C30 1 60 1 80 2.5C100 4 130 2 159 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="160" style={{ strokeDashoffset: inView ? 0 : 160, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} style={t(i * 120 + 300)}>
                <div className="group relative p-6 h-full bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 cursor-default" style={{ borderRadius: "4px" }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="absolute top-4 right-4 text-[9px] font-bold text-gray-200 dark:text-white/[0.06] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div className="w-10 h-10 bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all duration-400" style={{ borderRadius: "4px" }}>
                    <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-400" />
                  </div>
                  <h3 className="font-heading font-bold text-[14px] text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">{step.title}</h3>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-[1.6]">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}