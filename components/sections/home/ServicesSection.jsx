"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiCode, FiSmartphone, FiCloud, FiShield, FiTrendingUp,
  FiDatabase, FiGlobe, FiCpu, FiLayers, FiTerminal,
  FiMonitor, FiZap, FiBriefcase, FiSettings, FiPackage,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useServices } from "@/hooks/useServices";

const ICON_MAP = {
  web: FiCode, mobile: FiSmartphone, cloud: FiCloud,
  security: FiShield, cyber: FiShield, ai: FiTrendingUp,
  machine: FiTrendingUp, data: FiDatabase, digital: FiGlobe,
  iot: FiCpu, devops: FiLayers, api: FiTerminal,
  ui: FiMonitor, ux: FiMonitor, performance: FiZap,
  testing: FiSettings, software: FiCode, development: FiCode,
  design: FiMonitor, consulting: FiBriefcase, support: FiPackage,
};

function getIconForService(title = "", category = "") {
  const text = `${title} ${category}`.toLowerCase();
  for (const [key, Icon] of Object.entries(ICON_MAP)) {
    if (text.includes(key)) return Icon;
  }
  return FiCode;
}

function ServiceCardSkeleton() {
  return (
    <div className="absolute" style={{ width: 220, opacity: 1 }}>
      <div
        className="relative p-6 h-[260px] flex flex-col bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] animate-pulse"
        style={{ borderRadius: "4px" }}
      >
        <div className="w-11 h-11 bg-gray-100 dark:bg-white/[0.04] mb-4" style={{ borderRadius: "4px" }} />
        <div className="h-3.5 w-3/4 bg-gray-100 dark:bg-white/[0.06] rounded mb-2.5" />
        <div className="h-2.5 w-full bg-gray-100 dark:bg-white/[0.04] rounded mb-1.5" />
        <div className="h-2.5 w-5/6 bg-gray-100 dark:bg-white/[0.04] rounded mb-1.5" />
        <div className="h-2.5 w-4/6 bg-gray-100 dark:bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { services, loading, error } = useServices();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const total = services.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!loading && services.length > 0) {
      setActiveIndex(Math.min(2, services.length - 1));
    }
  }, [loading, services.length]);

  const navigate = (index) => {
    if (isAnimating || index === activeIndex || index < 0 || index >= total) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goPrev = () => navigate(activeIndex - 1);
  const goNext = () => navigate(activeIndex + 1);

  const getVisible = () => {
    const result = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = activeIndex + offset;
      if (idx >= 0 && idx < total) result.push({ idx, offset });
    }
    return result;
  };

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden bg-white dark:bg-[#09090b] py-20 lg:py-28"
    >
      <ParticleBackground />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 text-center mb-16 px-4">
        <div style={t(0)}>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
              What we do
            </span>
            <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
          </div>
        </div>

        <div style={t(150)}>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
            Services we{" "}
            <span className="relative inline-block text-orange-500">
              offer
              <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 120 5" fill="none">
                <path
                  d="M1 3.5C25 1 50 1 60 2.5C70 4 95 2 119 3.5"
                  stroke="#ff6b00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="120"
                  style={{
                    strokeDashoffset: inView ? 0 : 120,
                    transition: "stroke-dashoffset 1.2s ease-out 0.6s",
                  }}
                />
              </svg>
            </span>
          </h2>
        </div>

        <div style={t(300)}>
          <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            {error
              ? "Unable to load services right now."
              : "From concept to deployment, comprehensive IT services tailored to your unique business needs."}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full" style={{ height: 310, ...t(450) }}>
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-white dark:from-[#09090b] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-white dark:from-[#09090b] to-transparent z-20 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center">
          {loading ? (
            [-2, -1, 0, 1, 2].map((offset) => (
              <div
                key={offset}
                className="absolute"
                style={{
                  transform: `translateX(${offset * 230}px) scale(${offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.92 : 0.82})`,
                  opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.3,
                  zIndex: 10 - Math.abs(offset),
                  transition: "all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)",
                  width: 220,
                }}
              >
                <ServiceCardSkeleton />
              </div>
            ))
          ) : (
            getVisible().map(({ idx, offset }) => {
              const service = services[idx];
              const Icon = getIconForService(service.title, service.category);
              const isActive = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const xPercent = offset * 230;
              const scale = isActive ? 1 : isAdjacent ? 0.92 : 0.82;
              const opacity = isActive ? 1 : isAdjacent ? 0.6 : 0.3;
              const zIndex = 10 - Math.abs(offset);
              const rotateY = offset * -2;

              return (
                <div
                  key={service._id || idx}
                  onClick={() => !isActive && navigate(idx)}
                  className="absolute select-none"
                  style={{
                    transform: `translateX(${xPercent}px) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                    transition: "all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)",
                    width: 220,
                    cursor: isActive ? "default" : "pointer",
                  }}
                >
                  <div
                    className={`relative p-6 h-[260px] flex flex-col transition-all duration-400 ${
                      isActive
                        ? "bg-white dark:bg-[#111114] border-[1.5px] border-orange-500 shadow-2xl shadow-orange-500/15 dark:shadow-orange-500/10"
                        : "bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] shadow-md dark:shadow-none"
                    }`}
                    style={{ borderRadius: "4px" }}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-400 ${
                        isActive
                          ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                          : "bg-transparent"
                      }`}
                    />

                    <span
                      className={`absolute top-4 right-5 text-[10px] font-bold tabular-nums transition-colors duration-300 ${
                        isActive ? "text-orange-500/40" : "text-gray-300 dark:text-white/[0.06]"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div
                      className={`w-11 h-11 flex items-center justify-center mb-3 transition-all duration-400 ${
                        isActive ? "bg-orange-500/10" : "bg-gray-100 dark:bg-white/[0.04]"
                      }`}
                      style={{ borderRadius: "4px" }}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors duration-400 ${
                          isActive ? "text-orange-500" : "text-gray-400 dark:text-gray-600"
                        }`}
                      />
                    </div>

                    <h3
                      className={`font-heading font-bold text-[13px] leading-snug mb-1.5 transition-colors duration-300 ${
                        isActive ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {service.title}
                    </h3>

                    {service.category && (
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${
                          isActive ? "text-orange-500/50" : "text-gray-300 dark:text-gray-600"
                        }`}
                      >
                        {service.category}
                      </span>
                    )}

                    <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-[1.6] line-clamp-3 flex-1">
                      {service.description}
                    </p>

                    {service.popular && (
                      <div
                        className={`mt-1.5 inline-flex items-center gap-1 transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span className="text-[9px] font-bold text-orange-500/60 uppercase tracking-wider">
                          Popular
                        </span>
                      </div>
                    )}

                    <div
                      className={`mt-3 transition-all duration-400 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                      }`}
                    >
                      <Link
                        href="/services"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-500 hover:gap-2.5 transition-all duration-300 group"
                      >
                        Learn more
                        <FiArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Link>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-400 ${
                        isActive
                          ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div
        className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-between max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 gap-6"
        style={t(600)}
      >
        <div className="flex items-center gap-1.5">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 bg-gray-200 dark:bg-gray-700 animate-pulse"
                  style={{ width: i === 2 ? 24 : 6, borderRadius: "1px" }}
                />
              ))
            : services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`transition-all duration-400 cursor-pointer ${
                    i === activeIndex
                      ? "w-6 h-1.5 bg-orange-500"
                      : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-orange-300 dark:hover:bg-orange-700"
                  }`}
                  style={{ borderRadius: "1px" }}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[12px] font-bold text-gray-400 dark:text-gray-500 tabular-nums font-mono">
            {String(loading ? 1 : activeIndex + 1).padStart(2, "0")}
          </span>

          <div className="w-24 h-[2px] bg-gray-200 dark:bg-white/[0.06] overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500 ease-out"
              style={{
                width: `${total > 0 ? ((activeIndex + 1) / total) * 100 : 20}%`,
              }}
            />
          </div>

          <span className="text-[12px] font-bold text-gray-400 dark:text-gray-500 tabular-nums font-mono">
            {String(loading ? 0 : total).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-1.5 ml-3">
            <button
              onClick={goPrev}
              disabled={loading || activeIndex === 0}
              className="w-8 h-8 border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-orange-500 hover:text-orange-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer active:scale-90"
              style={{ borderRadius: "4px" }}
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={loading || activeIndex === total - 1}
              className="w-8 h-8 border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-orange-500 hover:text-orange-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer active:scale-90"
              style={{ borderRadius: "4px" }}
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}