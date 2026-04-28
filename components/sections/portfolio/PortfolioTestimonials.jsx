"use client";
import { useState, useEffect, useRef } from "react";
import { FiStar } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

const testimonials = [
  { name: "Sarah Johnson", role: "CEO, TechStart Inc.", quote: "TriByte delivered our MVP in 8 weeks. Their team was incredibly responsive and the quality exceeded our expectations.", rating: 5 },
  { name: "Mark Williams", role: "CTO, HealthFlow", quote: "The mobile app they built handles 10K+ daily users flawlessly. Best development partner we've worked with.", rating: 5 },
  { name: "Lisa Chen", role: "Founder, EduPlatform", quote: "They understood our vision from day one. The LMS they built became our highest-revenue product within 6 months.", rating: 5 },
];

export default function PortfolioTestimonials() {
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
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
    const interval = setInterval(() => { setActive((p) => (p + 1) % testimonials.length); }, 5000);
    return () => clearInterval(interval);
  }, [inView]);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section ref={ref} className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Client feedback</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              What clients{" "}
              <span className="relative inline-block text-orange-500">
                say
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 60 5" fill="none">
                  <path d="M1 3.5C12 1 24 1 30 2.5C36 4 48 2 59 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="60" style={{ strokeDashoffset: inView ? 0 : 60, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div style={t(300)}>
          <div className="relative overflow-hidden">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0"}`}
              >
                <div className="text-center p-8 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]" style={{ borderRadius: "4px" }}>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FiStar key={j} className="w-4 h-4 text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                  <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.7] mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="font-heading font-bold text-[14px] text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-400 cursor-pointer ${i === active ? "w-6 h-1.5 bg-orange-500" : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-orange-300"}`}
                style={{ borderRadius: "1px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}