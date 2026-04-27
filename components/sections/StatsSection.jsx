"use client";
import { useState, useEffect, useRef } from "react";
import {
  FiUsers,
  FiCode,
  FiGlobe,
  FiCoffee,
  FiAward,
  FiGitBranch,
} from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

const stats = [
  {
    icon: FiUsers,
    value: 50,
    suffix: "+",
    label: "Happy Clients",
    description: "Worldwide",
  },
  {
    icon: FiCode,
    value: 150,
    suffix: "+",
    label: "Projects Completed",
    description: "And counting",
  },
  {
    icon: FiGlobe,
    value: 25,
    suffix: "+",
    label: "Countries Served",
    description: "Global reach",
  },
  {
    icon: FiCoffee,
    value: 100000,
    suffix: "+",
    label: "Cups of Coffee",
    description: "Fuel for innovation",
  },
  {
    icon: FiAward,
    value: 30,
    suffix: "+",
    label: "Awards Won",
    description: "Industry recognition",
  },
  {
    icon: FiGitBranch,
    value: 2000000,
    suffix: "+",
    label: "Lines of Code",
    description: "Clean & efficient",
  },
];

function formatNumber(num) {
  if (num >= 1000000)
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf;
    const duration = 2200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return (
    <span ref={ref}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-white dark:bg-[#09090b]"
    >
      {/* BG Animation */}
      <ParticleBackground />

      {/* BG Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

      {/* ══════ Header ══════ */}
      <div className="relative z-10 text-center mb-14 px-4">
        <div style={t(0)}>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
              Numbers speak
            </span>
            <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
          </div>
        </div>

        <div style={t(150)}>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
            Our{" "}
            <span className="relative inline-block text-orange-500">
              Impact
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                height="5"
                viewBox="0 0 120 5"
                fill="none"
              >
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
            </span>{" "}
            in numbers
          </h2>
        </div>

        <div style={t(300)}>
          <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            Real results, real impact — here&apos;s what we&apos;ve achieved
            together with our clients worldwide.
          </p>
        </div>
      </div>

      {/* ══════ Stats Grid ══════ */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                style={t(index * 100 + 400)}
                className="group relative text-center p-5 border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 bg-gray-50/50 dark:bg-white/[0.02] hover:bg-orange-50/50 dark:hover:bg-white/[0.05] transition-all duration-500 cursor-default"
              >
                {/* Top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Number badge */}
                <span className="absolute top-3 right-3 text-[9px] font-bold text-gray-200 dark:text-white/[0.06] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="w-10 h-10 mx-auto mb-3 bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-400"
                  style={{ borderRadius: "4px" }}
                >
                  <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-400" />
                </div>

                {/* Counter */}
                <div className="text-xl sm:text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-[11px] font-bold text-gray-600 dark:text-white/60 mb-0.5 tracking-wide">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-[9px] text-gray-400 dark:text-white/25 font-semibold uppercase tracking-wider">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />
    </section>
  );
}