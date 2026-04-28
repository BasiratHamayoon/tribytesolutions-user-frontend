"use client";
import { useState, useEffect, useRef } from "react";
import ParticleBackground from "@/components/ui/ParticleBackground";

const milestones = [
  { year: "2016", title: "Founded", description: "TriByte Solutions was born with 3 engineers and a big dream." },
  { year: "2018", title: "First Major Client", description: "Landed our first enterprise contract and grew to 15 team members." },
  { year: "2020", title: "Global Expansion", description: "Opened offices in 3 countries and reached 100+ completed projects." },
  { year: "2022", title: "AI Division", description: "Launched our AI & ML division, bringing intelligent solutions to clients." },
  { year: "2024", title: "50+ Team", description: "Grew to 50+ experts serving 25+ countries with cutting-edge solutions." },
];

export default function AboutTimeline() {
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

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
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Our journey</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Key{" "}
              <span className="relative inline-block text-orange-500">
                Milestones
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 180 5" fill="none">
                  <path d="M1 3.5C35 1 70 1 90 2.5C110 4 145 2 179 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="180" style={{ strokeDashoffset: inView ? 0 : 180, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div style={t(400)}>
          <div className="relative">
            <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-[2px] bg-gray-200 dark:bg-white/[0.06]">
              <div className="h-full bg-orange-500 transition-all duration-700 ease-out" style={{ width: `${((activeIndex + 1) / milestones.length) * 100}%` }} />
            </div>

            <div className="hidden lg:flex items-start justify-between relative">
              {milestones.map((m, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                return (
                  <div key={i} className="flex flex-col items-center cursor-pointer group" style={{ width: `${100 / milestones.length}%` }} onClick={() => setActiveIndex(i)}>
                    <div className="relative z-10 mb-4">
                      {isActive && <div className="absolute -inset-2 rounded-full bg-orange-500/20 animate-ping" />}
                      <div className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-500 ${isActive ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/30" : isPast ? "bg-orange-500/10 border-orange-500/40" : "bg-white dark:bg-[#111114] border-gray-200 dark:border-white/[0.08] group-hover:border-orange-500/30"}`} style={{ borderRadius: "4px" }}>
                        <span className={`text-[12px] font-heading font-bold transition-colors duration-300 ${isActive ? "text-white" : isPast ? "text-orange-500" : "text-gray-400 dark:text-gray-500 group-hover:text-orange-500"}`}>{m.year}</span>
                      </div>
                    </div>
                    <div className={`w-[1.5px] h-5 transition-all duration-500 ${isActive ? "bg-orange-500" : isPast ? "bg-orange-500/30" : "bg-gray-200 dark:bg-white/[0.06]"}`} />
                    <div className={`mt-2 p-4 w-full max-w-[180px] border transition-all duration-500 ${isActive ? "bg-white dark:bg-[#111114] border-orange-500/30 shadow-lg -translate-y-1" : "bg-white/50 dark:bg-white/[0.01] border-gray-100 dark:border-white/[0.04] group-hover:border-orange-500/20"}`} style={{ borderRadius: "4px" }}>
                      <h3 className={`font-heading font-bold text-[13px] mb-1.5 transition-colors duration-300 ${isActive ? "text-orange-500" : "text-gray-700 dark:text-gray-300 group-hover:text-orange-500"}`}>{m.title}</h3>
                      <p className={`text-[10px] leading-[1.6] ${isActive ? "text-gray-500 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>{m.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:hidden relative flex">
              <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-white/[0.06]">
                <div className="w-full bg-orange-500 transition-all duration-700" style={{ height: `${((activeIndex + 1) / milestones.length) * 100}%` }} />
              </div>
              <div className="flex flex-col gap-3 w-full">
                {milestones.map((m, i) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <div key={i} className="flex items-start gap-4 cursor-pointer group" onClick={() => setActiveIndex(i)}>
                      <div className="relative z-10 flex-shrink-0">
                        {isActive && <div className="absolute -inset-1.5 rounded-full bg-orange-500/20 animate-ping" />}
                        <div className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-500 ${isActive ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/30" : isPast ? "bg-orange-500/10 border-orange-500/40" : "bg-white dark:bg-[#111114] border-gray-200 dark:border-white/[0.08]"}`} style={{ borderRadius: "4px" }}>
                          <span className={`text-[12px] font-heading font-bold ${isActive ? "text-white" : isPast ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}>{m.year}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 flex-1 pt-1">
                        <div className={`w-6 h-[1.5px] mt-3 flex-shrink-0 ${isActive ? "bg-orange-500" : isPast ? "bg-orange-500/30" : "bg-gray-200 dark:bg-white/[0.06]"}`} />
                        <div className={`flex-1 p-4 border transition-all duration-500 ${isActive ? "bg-white dark:bg-[#111114] border-orange-500/30 shadow-lg" : "bg-white/50 dark:bg-white/[0.01] border-gray-100 dark:border-white/[0.04]"}`} style={{ borderRadius: "4px" }}>
                          <h3 className={`font-heading font-bold text-[14px] mb-1 ${isActive ? "text-orange-500" : "text-gray-700 dark:text-gray-300"}`}>{m.title}</h3>
                          <p className={`text-[11px] leading-[1.6] ${isActive ? "text-gray-500 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>{m.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              {milestones.map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)} className={`transition-all duration-400 cursor-pointer ${i === activeIndex ? "w-6 h-1.5 bg-orange-500" : i < activeIndex ? "w-1.5 h-1.5 bg-orange-500/40" : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-orange-300"}`} style={{ borderRadius: "1px" }} />
              ))}
            </div>
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tabular-nums font-mono">
              {String(activeIndex + 1).padStart(2, "0")} <span className="text-gray-300 dark:text-gray-600">/</span> {String(milestones.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}