"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { portfolio } from "@/data/portfolio";

const categories = [
  "All",
  "Web Application",
  "Enterprise Software",
  "Mobile & Web",
  "IoT Solution",
];

export default function PortfolioShowcase() {
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeCategory === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  useEffect(() => {
    setCurrent(0);
  }, [activeCategory]);

  const prev = () =>
    setCurrent((c) => (c - 1 + filtered.length) % filtered.length);
  const next = () => setCurrent((c) => (c + 1) % filtered.length);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={ref}
      id="showcase"
      className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden"
    >
      <ParticleBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-10">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                Case studies
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Featured{" "}
              <span className="relative inline-block text-orange-500">
                Portfolio
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  height="5"
                  viewBox="0 0 160 5"
                  fill="none"
                >
                  <path
                    d="M1 3.5C30 1 60 1 80 2.5C100 4 130 2 159 3.5"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="160"
                    style={{
                      strokeDashoffset: inView ? 0 : 160,
                      transition: "stroke-dashoffset 1.2s ease-out 0.6s",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-1.5 mb-10 flex-wrap"
          style={t(300)}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-500/[0.06] hover:text-orange-500 border border-gray-200 dark:border-transparent"
              }`}
              style={{ borderRadius: "4px" }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={t(400)} className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {filtered.map((item, i) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div
                    className="group relative flex flex-col lg:flex-row overflow-hidden bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] dark:hover:shadow-black/30"
                    style={{ borderRadius: "4px" }}
                  >
                    <div
                      className={`relative w-full lg:w-[400px] xl:w-[440px] flex-shrink-0 min-h-[280px] lg:min-h-[320px] overflow-hidden bg-gray-100 dark:bg-[#0a0a0d] ${
                        i % 2 === 1 ? "lg:order-last" : ""
                      }`}
                    >
                      <div
                        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, currentColor 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <div className="absolute inset-x-0 -top-6 -bottom-6 flex items-center justify-center px-6">
                        <div className="relative w-[240px] h-[calc(100%+12px)] transition-transform duration-700 group-hover:scale-[1.08] group-hover:-translate-y-3">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain drop-shadow-2xl"
                            sizes="300px"
                          />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className="px-3 py-1 bg-white dark:bg-white/[0.08] text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-[0.15em] uppercase border border-gray-200 dark:border-white/[0.08]"
                          style={{ borderRadius: "3px" }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-5 font-heading font-extrabold text-gray-200/40 dark:text-white/[0.04] text-6xl leading-none select-none pointer-events-none">
                        {String(item.id).padStart(2, "0")}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-5 h-[1.5px] bg-orange-500 ml-auto" />
                        <div className="w-[1.5px] h-5 bg-orange-500 ml-auto mt-[-1.5px]" />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center p-8 lg:p-11">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 text-[10px] font-bold tracking-wider uppercase border border-gray-200/60 dark:border-white/[0.06]"
                            style={{ borderRadius: "3px" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-heading font-bold text-xl lg:text-[22px] text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-300 tracking-[-0.02em]">
                        {item.title}
                      </h3>

                      <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 leading-[1.7] mb-6 max-w-md">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-6 mb-7">
                        {Object.entries(item.stats).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="font-heading font-extrabold text-lg text-gray-900 dark:text-white leading-none">
                              {value}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-0.5 capitalize">
                              {key}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="w-full h-px bg-gray-200 dark:bg-white/[0.04] mb-6" />

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/portfolio/${item.id}`}
                          className="group/link inline-flex items-center gap-2 px-4 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer"
                          style={{ borderRadius: "3px" }}
                        >
                          View Case Study
                          <FiArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                        </Link>
                        <Link
                          href={item.liveUrl}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                        >
                          <FiExternalLink className="w-3 h-3" />
                          Live Demo
                        </Link>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-6 h-[6px] bg-orange-500"
                      : "w-[6px] h-[6px] bg-gray-300 dark:bg-white/20 hover:bg-orange-400 dark:hover:bg-orange-400"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111114] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300"
                style={{ borderRadius: "3px" }}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 flex items-center justify-center border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#111114] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300"
                style={{ borderRadius: "3px" }}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}