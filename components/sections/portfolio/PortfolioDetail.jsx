"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiExternalLink,
  FiCalendar,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { portfolio } from "@/data/portfolio";

export default function PortfolioDetail({ item }) {
  const [inView, setInView] = useState(false);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
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

  const related = portfolio
    .filter((p) => p.id !== item.id && p.category === item.category)
    .slice(0, 2);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  const prevScreenshot = () =>
    setScreenshotIndex(
      (i) => (i - 1 + item.screenshots.length) % item.screenshots.length
    );
  const nextScreenshot = () =>
    setScreenshotIndex((i) => (i + 1) % item.screenshots.length);

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-white dark:bg-[#09090b] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] dark:opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] dark:opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 lg:pt-36 pb-24">
        <div style={t(0)} className="mb-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>
        </div>

        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] mb-12 overflow-hidden bg-gray-100 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]" style={{ borderRadius: "8px" }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="1280px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 z-10">
            <span
              className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ borderRadius: "3px" }}
            >
              {item.category}
            </span>
          </div>
          <div className="absolute bottom-5 right-6 font-heading font-extrabold text-white/10 text-7xl leading-none select-none pointer-events-none">
            {String(item.id).padStart(2, "0")}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 mb-16">
          <div>
            <div style={t(100)}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                  {item.category}
                </span>
              </div>
            </div>

            <div style={t(200)}>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight mb-5">
                {item.title}
              </h1>
            </div>

            <div style={t(300)}>
              <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-[1.8] mb-8">
                {item.fullDescription}
              </p>
            </div>

            <div style={t(350)} className="flex flex-wrap gap-3 mb-8">
              {Object.entries(item.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-col items-center px-5 py-3 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
                  style={{ borderRadius: "4px" }}
                >
                  <span className="font-heading font-extrabold text-xl text-orange-500 leading-none">
                    {value}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1 capitalize">
                    {key}
                  </span>
                </div>
              ))}
            </div>

            <div style={t(400)}>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-wider uppercase border border-gray-200 dark:border-white/[0.06]"
                    style={{ borderRadius: "3px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={t(500)} className="flex items-center gap-4 mt-8">
              <Link
                href={item.liveUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-[12px] font-bold transition-all duration-300 hover:bg-orange-600 hover:-translate-y-[1px] active:scale-[0.98]"
                style={{ borderRadius: "4px" }}
              >
                <FiExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </Link>
              <Link
                href={item.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-[12px] font-bold hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
                style={{ borderRadius: "4px" }}
              >
                View Code
              </Link>
            </div>
          </div>

          <div style={t(200)} className="space-y-5">
            <div
              className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
              style={{ borderRadius: "6px" }}
            >
              <h4 className="text-[11px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase mb-4">
                Portfolio Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiUser className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Client
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                      {item.client}
                    </p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200 dark:bg-white/[0.04]" />
                <div className="flex items-start gap-3">
                  <FiCalendar className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Year
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                      {item.year}
                    </p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200 dark:bg-white/[0.04]" />
                <div className="flex items-start gap-3">
                  <FiClock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Duration
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                      {item.duration}
                    </p>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200 dark:bg-white/[0.04]" />
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Category
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
              style={{ borderRadius: "6px" }}
            >
              <h4 className="text-[11px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase mb-4">
                Services Delivered
              </h4>
              <div className="space-y-2.5">
                {item.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={t(300)} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-[2px] bg-orange-500 rounded-full" />
            <h3 className="text-[11px] font-extrabold text-orange-500 tracking-[0.15em] uppercase">
              Portfolio Screenshots
            </h3>
          </div>
          <div
            className="relative overflow-hidden bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
            style={{ borderRadius: "8px" }}
          >
            <div className="relative min-h-[350px] sm:min-h-[420px] overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, currentColor 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-[220px] h-[360px]">
                  <Image
                    src={item.screenshots[screenshotIndex]}
                    alt={`${item.title} screenshot ${screenshotIndex + 1}`}
                    fill
                    className="object-contain drop-shadow-2xl transition-opacity duration-500"
                    sizes="300px"
                  />
                </div>
              </div>
              <button
                onClick={prevScreenshot}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300 z-10"
                style={{ borderRadius: "4px" }}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextScreenshot}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300 z-10"
                style={{ borderRadius: "4px" }}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-200 dark:border-white/[0.04]">
              {item.screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setScreenshotIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === screenshotIndex
                      ? "w-6 h-[6px] bg-orange-500"
                      : "w-[6px] h-[6px] bg-gray-300 dark:bg-white/20 hover:bg-orange-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <div
            style={t(400)}
            className="p-7 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
            style2={{ borderRadius: "6px" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
              <h3 className="text-[11px] font-extrabold text-orange-500 tracking-[0.15em] uppercase">
                The Challenge
              </h3>
            </div>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-[1.8]">
              {item.challenge}
            </p>
          </div>

          <div
            style={t(500)}
            className="p-7 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
            style2={{ borderRadius: "6px" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
              <h3 className="text-[11px] font-extrabold text-orange-500 tracking-[0.15em] uppercase">
                Our Solution
              </h3>
            </div>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-[1.8]">
              {item.solution}
            </p>
          </div>

          <div
            style={t(600)}
            className="p-7 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
            style2={{ borderRadius: "6px" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
              <h3 className="text-[11px] font-extrabold text-orange-500 tracking-[0.15em] uppercase">
                Key Results
              </h3>
            </div>
            <ul className="space-y-3">
              {item.results.map((result, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <FiCheckCircle className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[13px] text-gray-600 dark:text-gray-400 leading-[1.6]">
                    {result}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div style={t(700)}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-[2px] bg-orange-500 rounded-full" />
              <h3 className="text-[11px] font-extrabold text-orange-500 tracking-[0.15em] uppercase">
                Related Portfolio
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/portfolio/${rp.id}`}
                  className="group relative flex flex-col sm:flex-row overflow-hidden bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-500 hover:shadow-lg"
                  style={{ borderRadius: "4px" }}
                >
                  <div className="relative w-full sm:w-[160px] flex-shrink-0 min-h-[140px] bg-gray-100 dark:bg-[#0a0a0d] overflow-hidden">
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      sizes="160px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center p-5">
                    <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-1.5">
                      {rp.category}
                    </span>
                    <h4 className="font-heading font-bold text-[14px] text-gray-900 dark:text-white leading-snug group-hover:text-orange-500 transition-colors duration-300 mb-2">
                      {rp.title}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {rp.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 text-[9px] font-bold tracking-wider uppercase"
                          style={{ borderRadius: "3px" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}