"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  { id: 1, src: "/slides/1.jpg", alt: "Digital Innovation" },
  { id: 2, src: "/slides/2.jpg", alt: "Cloud Solutions" },
  { id: 3, src: "/slides/3.jpg", alt: "Team Collaboration" },
];

function Particles() {
  const particles = useRef(
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      isOrange: i % 5 === 0,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.isOrange
              ? "rgba(255,107,0,0.4)"
              : "rgba(255,255,255,0.15)",
            animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const SLIDE_DURATION = 5000;

  useEffect(() => setMounted(true), []);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    intervalRef.current = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(intervalRef.current);
  }, [goNext]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 40);
    return () => clearInterval(tick);
  }, [currentSlide]);

  const t = (delay) => ({
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(36px)",
  });

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden"
    >
      {/* ═══════ BG IMAGE CAROUSEL ═══════ */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-all duration-[1200ms] ease-out"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? "scale(1)" : "scale(1.08)",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* ═══════ OVERLAYS ═══════ */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,107,0,0.06) 0%, transparent 60%)",
        }}
      />

      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <Particles />

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="relative z-10 h-full flex items-center justify-center pt-16">
        <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Eyebrow */}
            <div style={t(100)}>
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="w-7 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[11px] font-extrabold text-orange-400 tracking-[0.2em] uppercase">
                  IT Solutions &amp; Services
                </span>
                <span className="w-7 h-[2px] bg-orange-500 rounded-full" />
              </div>
            </div>

            {/* Heading */}
            <div style={t(250)}>
              <h1 className="font-heading font-bold text-white leading-[1.08] tracking-[-0.03em] mb-4">
                <span className="block text-[2.4rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]">
                  Great <span className="text-orange-500">Product</span> is
                </span>
                <span className="block text-[2.4rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] mt-0.5">
                  built by great{" "}
                  <span className="relative inline-block text-orange-500">
                    teams
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
                      height="6"
                      viewBox="0 0 200 6"
                      fill="none"
                    >
                      <path
                        d="M1 4.5C40 1 80 1 100 3C120 5 160 2 199 4"
                        stroke="#ff6b00"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="200"
                        style={{
                          strokeDashoffset: mounted ? 0 : 200,
                          transition: "stroke-dashoffset 1.4s ease-out 1.2s",
                        }}
                      />
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <div style={t(400)}>
              <p className="text-[14px] sm:text-[15px] text-white/50 leading-[1.7] max-w-[480px] mx-auto mb-6">
                We help build and manage a team of world-class developers to
                bring your vision to life — from concept to scalable product.
              </p>
            </div>

            {/* Buttons */}
            <div style={t(540)}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-5 py-2 rounded-[4px] bg-white text-gray-900 text-[12.5px] font-bold tracking-[-0.01em] transition-all duration-300 hover:bg-gray-100 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  Let&apos;s get started
                  <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="#portfolio"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-[4px] border-[1.5px] border-orange-500/60 bg-transparent text-white text-[12.5px] font-bold tracking-[-0.01em] transition-all duration-300 hover:border-orange-400 hover:bg-orange-500/10 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  View case studies
                </Link>
              </div>
            </div>

            {/* Trust avatars */}
            <div style={t(680)}>
              <div className="mt-6 flex items-center justify-center gap-2.5">
                <div className="flex -space-x-2">
                  {["#f97316", "#3b82f6", "#10b981", "#8b5cf6"].map(
                    (bg, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-black/30 flex items-center justify-center text-[8px] font-bold text-white"
                        style={{ background: bg }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    )
                  )}
                </div>
                <span className="text-[10px] text-white/35 font-medium">
                  <span className="text-white/60 font-semibold">200+</span>{" "}
                  businesses trust us
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CAROUSEL CONTROLS ═══════ */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative cursor-pointer group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-[3px] rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 bg-orange-500"
                  : "w-3 bg-white/25 group-hover:bg-white/50"
              }`}
            >
              {index === currentSlide && (
                <div
                  className="absolute top-0 left-0 h-full bg-orange-300 rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-5 right-6 sm:right-10 lg:right-14 z-20 flex items-center gap-1.5">
        <button
          onClick={goPrev}
          className="p-1.5 rounded-[4px] bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 cursor-pointer active:scale-95"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-3.5 h-3.5 text-white/70" />
        </button>
        <button
          onClick={goNext}
          className="p-1.5 rounded-[4px] bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 cursor-pointer active:scale-95"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-3.5 h-3.5 text-white/70" />
        </button>
      </div>

      <div className="absolute bottom-6 left-6 sm:left-10 lg:left-14 z-20">
        <div className="flex items-baseline gap-1 font-mono text-white/30">
          <span className="text-white/80 text-sm font-bold">
            0{currentSlide + 1}
          </span>
          <span className="text-[10px]">/</span>
          <span className="text-[10px]">0{slides.length}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent z-[4] pointer-events-none" />
    </section>
  );
}