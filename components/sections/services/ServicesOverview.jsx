"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiCode, FiSmartphone, FiCloud, FiShield, FiTrendingUp,
  FiDatabase, FiGlobe, FiCpu, FiLayers, FiTerminal,
  FiMonitor, FiZap, FiBriefcase, FiSettings, FiPackage,
} from "react-icons/fi";
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

function getIcon(title = "", category = "") {
  const text = `${title} ${category}`.toLowerCase();
  for (const [key, Icon] of Object.entries(ICON_MAP)) {
    if (text.includes(key)) return Icon;
  }
  return FiCode;
}

function SkeletonCard() {
  return (
    <div
      className="relative p-5 h-full bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] animate-pulse"
      style={{ borderRadius: "4px" }}
    >
      <div className="w-10 h-10 bg-gray-100 dark:bg-white/[0.04] mb-4" style={{ borderRadius: "4px" }} />
      <div className="h-3.5 w-2/3 bg-gray-100 dark:bg-white/[0.06] rounded mb-2" />
      <div className="h-2.5 w-full bg-gray-100 dark:bg-white/[0.04] rounded mb-1.5" />
      <div className="h-2.5 w-5/6 bg-gray-100 dark:bg-white/[0.04] rounded mb-4" />
      <div className="flex gap-1">
        <div className="h-4 w-12 bg-gray-100 dark:bg-white/[0.04] rounded" />
        <div className="h-4 w-10 bg-gray-100 dark:bg-white/[0.04] rounded" />
        <div className="h-4 w-14 bg-gray-100 dark:bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}

export default function ServicesOverview() {
  const { services, loading, error } = useServices();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  const displayServices = loading
    ? [...Array(8)]
    : error
      ? []
      : services;

  return (
    <section
      ref={sectionRef}
      id="services-overview"
      className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                Our expertise
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>

          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
              Comprehensive{" "}
              <span className="relative inline-block text-orange-500">
                Solutions
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 160 5" fill="none">
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

          <div style={t(300)}>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              {error
                ? "Unable to load services. Please try again later."
                : "End-to-end services designed to cover every aspect of your digital needs."}
            </p>
          </div>
        </div>

        {error ? (
          <div style={t(400)} className="text-center py-16">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Something went wrong loading services.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {displayServices.map((service, index) => {
              if (loading || !service) {
                return (
                  <div key={index} style={t(index * 80 + 400)}>
                    <SkeletonCard />
                  </div>
                );
              }

              const Icon = getIcon(service.title, service.category);
              const features = Array.isArray(service.features)
                ? service.features.slice(0, 3)
                : [];

              return (
                <div key={service._id} style={t(index * 80 + 400)}>
                  <div
                    className="group relative p-5 h-full bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 cursor-default"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <span className="absolute top-4 right-4 text-[9px] font-bold text-gray-200 dark:text-white/[0.06] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="w-10 h-10 bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all duration-400"
                      style={{ borderRadius: "4px" }}
                    >
                      <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-400" />
                    </div>

                    <div className="flex items-center gap-1.5 mb-2">
                      <h3 className="font-heading font-bold text-[14px] text-gray-900 dark:text-white tracking-[-0.01em] group-hover:text-orange-500 transition-colors duration-300">
                        {service.title}
                      </h3>
                      {service.popular && (
                        <span
                          className="px-1.5 py-0.5 text-[7px] font-bold bg-orange-500/10 text-orange-500 uppercase tracking-wider"
                          style={{ borderRadius: "3px" }}
                        >
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-[1.6] mb-4">
                      {service.description}
                    </p>

                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {features.map((f, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[9px] font-bold bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            style={{ borderRadius: "3px" }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}

                    {service.price && (
                      <p className="mt-3 text-[10px] font-bold text-orange-500/60">
                        {service.price}
                      </p>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}