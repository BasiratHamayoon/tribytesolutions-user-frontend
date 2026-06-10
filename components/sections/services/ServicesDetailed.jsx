"use client";

import { useState, useEffect, useRef } from "react";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useServices } from "@/hooks/useServices";

function SkeletonTabs() {
  return (
    <div className="lg:col-span-4 flex flex-col gap-1.5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="p-4 bg-gray-50/50 dark:bg-white/[0.015] border border-gray-100 dark:border-white/[0.05] animate-pulse"
          style={{ borderRadius: "4px" }}
        >
          <div className="flex items-center gap-3.5">
            <div className="flex-1">
              <div className="h-3 w-3/4 bg-gray-100 dark:bg-white/[0.06] rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonContent() {
  return (
    <div className="lg:col-span-8">
      <div
        className="relative p-7 lg:p-9 bg-gray-50/80 dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] animate-pulse"
        style={{ borderRadius: "4px" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gray-200 dark:bg-white/[0.06]" />
        <div className="h-6 w-1/2 bg-gray-100 dark:bg-white/[0.06] rounded mb-3" />
        <div className="h-3 w-full bg-gray-100 dark:bg-white/[0.04] rounded mb-2" />
        <div className="h-3 w-5/6 bg-gray-100 dark:bg-white/[0.04] rounded mb-2" />
        <div className="h-3 w-4/6 bg-gray-100 dark:bg-white/[0.04] rounded mb-6" />
        <div className="grid sm:grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 p-2">
              <div className="w-5 h-5 bg-gray-100 dark:bg-white/[0.04]" style={{ borderRadius: "3px" }} />
              <div className="h-3 w-3/4 bg-gray-100 dark:bg-white/[0.04] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesDetailed() {
  const { services, loading, error } = useServices();
  const [activeIdx, setActiveIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const switchTab = (idx) => {
    if (idx === activeIdx || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setTimeout(() => setIsAnimating(false), 300);
    }, 200);
  };

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  const active = services[activeIdx];

  const displayPoints = active
    ? [
        ...(Array.isArray(active.features) ? active.features : []),
        ...(Array.isArray(active.keyBenefits) ? active.keyBenefits : []),
        ...(Array.isArray(active.whatweoffer) ? active.whatweoffer : []),
      ].slice(0, 6)
    : [];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden"
    >
      <ParticleBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.012] dark:opacity-[0.02]"
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
                Deep dive
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Detailed{" "}
              <span className="relative inline-block text-orange-500">
                Overview
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
            <p className="mt-3 text-[14px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              Explore each service in depth — what we deliver, how we deliver it, and why clients trust us.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5" style={t(400)}>
          {loading ? (
            <>
              <SkeletonTabs />
              <SkeletonContent />
            </>
          ) : error || services.length === 0 ? (
            <div className="lg:col-span-12 text-center py-16">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {error ? "Unable to load service details." : "No services available."}
              </p>
            </div>
          ) : (
            <>
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                {services.map((item, index) => {
                  const isActive = activeIdx === index;
                  return (
                    <button
                      key={item._id}
                      onClick={() => switchTab(index)}
                      className={`relative text-left p-4 border transition-all duration-400 cursor-pointer group overflow-hidden ${
                        isActive
                          ? "bg-orange-500/[0.05] dark:bg-orange-500/[0.07] border-orange-500/30"
                          : "bg-gray-50/50 dark:bg-white/[0.015] border-gray-100 dark:border-white/[0.05] hover:border-orange-500/20 hover:bg-orange-50/30 dark:hover:bg-orange-500/[0.03]"
                      }`}
                      style={{ borderRadius: "4px" }}
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500 ${
                          isActive ? "bg-orange-500" : "bg-transparent group-hover:bg-orange-500/20"
                        }`}
                      />
                      <div className="flex items-center gap-3.5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] font-bold tabular-nums transition-colors duration-300 ${
                                isActive ? "text-orange-500/60" : "text-gray-300 dark:text-gray-600"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-[13px] font-bold transition-colors duration-300 truncate ${
                                isActive
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          {item.category && (
                            <p className={`text-[10px] mt-0.5 ml-5 truncate transition-colors duration-300 ${
                              isActive ? "text-orange-500/50" : "text-gray-400 dark:text-gray-600"
                            }`}>
                              {item.category}
                            </p>
                          )}
                          {isActive && (
                            <div className="mt-1.5 ml-5 w-5 h-[2px] bg-orange-500 rounded-full" />
                          )}
                        </div>
                        <FiArrowRight
                          className={`w-3 h-3 flex-shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-orange-500 translate-x-0 opacity-100"
                              : "text-gray-300 -translate-x-1 opacity-0 group-hover:opacity-50 group-hover:translate-x-0"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}

                <div className="mt-3 flex items-center gap-3 px-1">
                  <div className="flex-1 h-[2px] bg-gray-100 dark:bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-500 ease-out"
                      style={{ width: `${((activeIdx + 1) / services.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tabular-nums font-mono">
                    {String(activeIdx + 1).padStart(2, "0")}
                    <span className="text-gray-300 dark:text-gray-600">
                      {" "}/ {String(services.length).padStart(2, "0")}
                    </span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8">
                {active && (
                  <div
                    className={`relative p-7 lg:p-9 bg-gray-50/80 dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] overflow-hidden transition-all duration-400 ${
                      isAnimating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
                    }`}
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

                    <span className="absolute top-5 right-6 text-5xl font-heading font-bold text-gray-100 dark:text-white/[0.03] select-none pointer-events-none">
                      {String(activeIdx + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[9px] font-extrabold text-orange-500/50 uppercase tracking-[0.2em]">
                        Service {String(activeIdx + 1).padStart(2, "0")}
                      </span>
                      {active.popular && (
                        <span
                          className="px-1.5 py-0.5 text-[7px] font-bold bg-orange-500/10 text-orange-500 uppercase tracking-wider"
                          style={{ borderRadius: "3px" }}
                        >
                          Popular
                        </span>
                      )}
                      {active.category && (
                        <span
                          className="px-1.5 py-0.5 text-[7px] font-bold bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          style={{ borderRadius: "3px" }}
                        >
                          {active.category}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-gray-900 dark:text-white tracking-[-0.02em] mb-3">
                      {active.title}
                    </h3>

                    <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 leading-[1.7] mb-4 max-w-lg">
                      {active.fullDescription || active.description}
                    </p>

                    {active.description && active.fullDescription && (
                      <p className="text-[12px] text-gray-400 dark:text-gray-500 leading-[1.7] mb-6 max-w-lg border-l-2 border-orange-500/20 pl-3">
                        {active.description}
                      </p>
                    )}

                    {displayPoints.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-3">
                          What&apos;s included
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {displayPoints.map((point, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2.5 group p-2 hover:bg-orange-500/[0.03] dark:hover:bg-orange-500/[0.04] transition-colors duration-300"
                              style={{ borderRadius: "3px" }}
                            >
                              <div
                                className="w-5 h-5 bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-all duration-300"
                                style={{ borderRadius: "3px" }}
                              >
                                <FiCheck className="w-3 h-3 text-orange-500 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {Array.isArray(active.features) && active.features.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-2">
                          Features
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {active.features.map((f, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-orange-500/[0.06] dark:bg-orange-500/[0.08] text-orange-600 dark:text-orange-400 text-[10px] font-bold border border-orange-500/10"
                              style={{ borderRadius: "3px" }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {Array.isArray(active.keyBenefits) && active.keyBenefits.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-2">
                          Key Benefits
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {active.keyBenefits.map((b, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 text-[10px] font-bold border border-gray-200 dark:border-white/[0.06]"
                              style={{ borderRadius: "3px" }}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {Array.isArray(active.whatweoffer) && active.whatweoffer.length > 0 && (
                      <div className="mb-6">
                        <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-2">
                          What We Offer
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {active.whatweoffer.map((w, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-gray-50 dark:bg-white/[0.03] text-gray-500 dark:text-gray-500 text-[10px] font-semibold border border-gray-100 dark:border-white/[0.04]"
                              style={{ borderRadius: "3px" }}
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-gray-100 dark:border-white/[0.04]">
                      <div className="flex items-center gap-6">
                        {active.price && (
                          <>
                            <div>
                              <span className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                                {active.price}
                              </span>
                              <span className="block text-[9px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                                Starting from
                              </span>
                            </div>
                            <div className="w-px h-8 bg-gray-100 dark:bg-white/[0.04]" />
                          </>
                        )}
                        {active.category && (
                          <div>
                            <span className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                              {active.category}
                            </span>
                            <span className="block text-[9px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                              Category
                            </span>
                          </div>
                        )}
                      </div>

                      <Link
                        href="/#contact"
                        className="group inline-flex items-center gap-2 px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[12px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer"
                        style={{ borderRadius: "4px" }}
                      >
                        Get started
                        <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}