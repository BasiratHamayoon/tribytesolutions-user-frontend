"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ParticleBackground from "@/components/ui/ParticleBackground";

const images = [
  { src: "/team/t1.jpg", alt: "Team member 1" },
  { src: "/team/t2.jpg", alt: "Team member 2" },
  { src: "/team/t3.jpg", alt: "Team member 3" },
  { src: "/team/t4.jpg", alt: "Team member 4" },
  { src: "/team/t5.jpg", alt: "Team member 5" },
  { src: "/team/t6.jpg", alt: "Team member 6" },
];

export default function CareersLife() {
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
    <section ref={ref} id="life" className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Our culture</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Life at{" "}
              <span className="relative inline-block text-orange-500">
                TriByte
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 140 5" fill="none">
                  <path d="M1 3.5C25 1 50 1 70 2.5C90 4 115 2 139 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="140" style={{ strokeDashoffset: inView ? 0 : 140, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
          <div style={t(300)}>
            <p className="mt-3 text-[14px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">A glimpse into our day-to-day — collaboration, creativity, and community.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={t(400)}>
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden bg-gray-100 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 cursor-default ${
                i === 0 ? "md:row-span-2" : ""
              }`}
              style={{
                borderRadius: "4px",
                height: i === 0 ? "100%" : "200px",
                minHeight: i === 0 ? "400px" : "200px",
              }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}