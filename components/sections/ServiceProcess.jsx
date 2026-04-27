"use client";
import { useState, useEffect, useRef } from "react";

const steps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We analyze your business needs, goals, and challenges to define a clear roadmap.",
  },
  {
    id: "02",
    title: "Planning",
    description:
      "Detailed project planning with timelines, milestones, and resource allocation.",
  },
  {
    id: "03",
    title: "Development",
    description:
      "Agile development sprints with regular demos and continuous feedback loops.",
  },
  {
    id: "04",
    title: "Testing",
    description:
      "Rigorous QA testing, performance optimization, and security audits.",
  },
  {
    id: "05",
    title: "Deployment",
    description:
      "Smooth deployment with CI/CD pipelines and zero-downtime releases.",
  },
  {
    id: "06",
    title: "Support",
    description:
      "Ongoing maintenance, monitoring, and iterative improvements post-launch.",
  },
];

export default function ServiceProcess() {
  const [inView, setInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle through steps
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden"
    >
      {/* BG */}
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
        {/* Header */}
        <div className="text-center mb-16">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                How it works
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Our{" "}
              <span className="relative inline-block text-orange-500">
                Process
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  height="5"
                  viewBox="0 0 140 5"
                  fill="none"
                >
                  <path
                    d="M1 3.5C25 1 50 1 70 2.5C90 4 115 2 139 3.5"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="140"
                    style={{
                      strokeDashoffset: inView ? 0 : 140,
                      transition: "stroke-dashoffset 1.2s ease-out 0.6s",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
          <div style={t(300)}>
            <p className="mt-3 text-[14px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              A proven methodology that ensures quality delivery, every time.
            </p>
          </div>
        </div>

        {/* ══════ Bus Topology Diagram ══════ */}
        <div style={t(450)}>
          {/* ── Desktop: Horizontal Bus ── */}
          <div className="hidden lg:block">
            {/* Main horizontal bus line */}
            <div className="relative">
              {/* The bus backbone */}
              <div className="absolute top-[28px] left-0 right-0 h-[2px] bg-gray-200 dark:bg-white/[0.06]">
                {/* Animated fill */}
                <div
                  className="h-full bg-orange-500 transition-all duration-700 ease-out"
                  style={{
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              {/* Nodes on the bus */}
              <div className="relative flex items-start justify-between">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;

                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center cursor-pointer group"
                      style={{ width: `${100 / steps.length}%` }}
                      onClick={() => setActiveStep(index)}
                    >
                      {/* Node dot */}
                      <div className="relative z-10 mb-4">
                        {/* Pulse ring on active */}
                        {isActive && (
                          <div className="absolute -inset-2 rounded-full bg-orange-500/20 animate-ping" />
                        )}
                        {/* Outer ring */}
                        <div
                          className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-500 ${
                            isActive
                              ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/30"
                              : isPast
                              ? "bg-orange-500/10 border-orange-500/40"
                              : "bg-white dark:bg-[#111114] border-gray-200 dark:border-white/[0.08] group-hover:border-orange-500/30"
                          }`}
                          style={{ borderRadius: "4px" }}
                        >
                          <span
                            className={`text-[13px] font-heading font-bold transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : isPast
                                ? "text-orange-500"
                                : "text-gray-400 dark:text-gray-500 group-hover:text-orange-500"
                            }`}
                          >
                            {step.id}
                          </span>
                        </div>
                      </div>

                      {/* Vertical connector line */}
                      <div
                        className={`w-[1.5px] h-5 transition-all duration-500 ${
                          isActive
                            ? "bg-orange-500"
                            : isPast
                            ? "bg-orange-500/30"
                            : "bg-gray-200 dark:bg-white/[0.06]"
                        }`}
                      />

                      {/* Content card */}
                      <div
                        className={`mt-2 p-4 w-full max-w-[170px] border transition-all duration-500 ${
                          isActive
                            ? "bg-white dark:bg-[#111114] border-orange-500/30 shadow-lg shadow-black/[0.03] dark:shadow-black/20 -translate-y-1"
                            : "bg-white/50 dark:bg-white/[0.01] border-gray-100 dark:border-white/[0.04] group-hover:border-orange-500/20"
                        }`}
                        style={{ borderRadius: "4px" }}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500" />
                        )}

                        <h3
                          className={`font-heading font-bold text-[13px] mb-1.5 tracking-[-0.01em] transition-colors duration-300 ${
                            isActive
                              ? "text-orange-500"
                              : "text-gray-700 dark:text-gray-300 group-hover:text-orange-500"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-[10px] leading-[1.6] transition-colors duration-300 ${
                            isActive
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Mobile/Tablet: Vertical Bus ── */}
          <div className="lg:hidden">
            <div className="relative flex">
              {/* Vertical bus backbone */}
              <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-white/[0.06]">
                <div
                  className="w-full bg-orange-500 transition-all duration-700 ease-out"
                  style={{
                    height: `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              {/* Nodes */}
              <div className="flex flex-col gap-3 w-full">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;

                  return (
                    <div
                      key={step.id}
                      className="flex items-start gap-4 cursor-pointer group"
                      onClick={() => setActiveStep(index)}
                    >
                      {/* Node dot */}
                      <div className="relative z-10 flex-shrink-0">
                        {isActive && (
                          <div className="absolute -inset-1.5 rounded-full bg-orange-500/20 animate-ping" />
                        )}
                        <div
                          className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-500 ${
                            isActive
                              ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/30"
                              : isPast
                              ? "bg-orange-500/10 border-orange-500/40"
                              : "bg-white dark:bg-[#111114] border-gray-200 dark:border-white/[0.08] group-hover:border-orange-500/30"
                          }`}
                          style={{ borderRadius: "4px" }}
                        >
                          <span
                            className={`text-[13px] font-heading font-bold transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : isPast
                                ? "text-orange-500"
                                : "text-gray-400 dark:text-gray-500 group-hover:text-orange-500"
                            }`}
                          >
                            {step.id}
                          </span>
                        </div>
                      </div>

                      {/* Horizontal connector + card */}
                      <div className="flex items-start gap-3 flex-1 pt-1">
                        {/* Horizontal line */}
                        <div
                          className={`w-6 h-[1.5px] mt-[12px] flex-shrink-0 transition-all duration-500 ${
                            isActive
                              ? "bg-orange-500"
                              : isPast
                              ? "bg-orange-500/30"
                              : "bg-gray-200 dark:bg-white/[0.06]"
                          }`}
                        />

                        {/* Content card */}
                        <div
                          className={`flex-1 p-4 border transition-all duration-500 ${
                            isActive
                              ? "bg-white dark:bg-[#111114] border-orange-500/30 shadow-lg shadow-black/[0.03] dark:shadow-black/20"
                              : "bg-white/50 dark:bg-white/[0.01] border-gray-100 dark:border-white/[0.04] group-hover:border-orange-500/20"
                          }`}
                          style={{ borderRadius: "4px" }}
                        >
                          {isActive && (
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500" />
                          )}

                          <h3
                            className={`font-heading font-bold text-[14px] mb-1 tracking-[-0.01em] transition-colors duration-300 ${
                              isActive
                                ? "text-orange-500"
                                : "text-gray-700 dark:text-gray-300 group-hover:text-orange-500"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-[11px] leading-[1.6] transition-colors duration-300 ${
                              isActive
                                ? "text-gray-500 dark:text-gray-400"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Bottom: Step counter ── */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`transition-all duration-400 cursor-pointer ${
                    i === activeStep
                      ? "w-6 h-1.5 bg-orange-500"
                      : i < activeStep
                      ? "w-1.5 h-1.5 bg-orange-500/40"
                      : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-orange-300"
                  }`}
                  style={{ borderRadius: "1px" }}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>

            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 tabular-nums font-mono">
              {String(activeStep + 1).padStart(2, "0")}{" "}
              <span className="text-gray-300 dark:text-gray-600">/</span>{" "}
              {String(steps.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}