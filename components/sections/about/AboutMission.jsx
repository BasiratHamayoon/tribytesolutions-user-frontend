"use client";
import { useState, useEffect, useRef } from "react";
import { FiTarget, FiEye } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function AboutMission() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">What drives us</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Mission &amp;{" "}
              <span className="relative inline-block text-orange-500">
                Vision
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 120 5" fill="none">
                  <path d="M1 3.5C25 1 50 1 60 2.5C70 4 95 2 119 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="120" style={{ strokeDashoffset: inView ? 0 : 120, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: FiTarget, title: "Our Mission", description: "To empower businesses with transformative software solutions that drive growth, efficiency, and innovation. We believe technology should solve real problems and create measurable impact for every client we serve." },
            { icon: FiEye, title: "Our Vision", description: "To become the world's most trusted technology partner — known for our engineering excellence, human-centered design, and unwavering commitment to delivering products that change industries." },
          ].map((item, i) => (
            <div key={i} style={t(i * 150 + 300)}>
              <div className="group relative p-8 h-full bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 cursor-default" style={{ borderRadius: "4px" }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="w-12 h-12 bg-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-all duration-400" style={{ borderRadius: "4px" }}>
                  <item.icon className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-400" />
                </div>

                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-3 tracking-[-0.02em] group-hover:text-orange-500 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-[1.7]">
                  {item.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}