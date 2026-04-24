"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiPlay,
  FiCode,
  FiCloud,
  FiSmartphone,
  FiShield,
  FiDatabase,
  FiGlobe,
  FiCpu,
  FiLayers,
  FiTerminal,
  FiServer,
  FiLock,
  FiTrendingUp,
  FiZap,
  FiGitBranch,
  FiBox,
  FiMonitor,
  FiWifi,
  FiHardDrive,
} from "react-icons/fi";

const techIcons = [
  { icon: FiCode, name: "React", color: "#61DAFB" },
  { icon: FiGlobe, name: "Next.js", color: "#ffffff" },
  { icon: FiServer, name: "Node.js", color: "#339933" },
  { icon: FiTerminal, name: "Python", color: "#3776AB" },
  { icon: FiCloud, name: "AWS", color: "#FF9900" },
  { icon: FiBox, name: "Docker", color: "#2496ED" },
  { icon: FiLayers, name: "Kubernetes", color: "#326CE5" },
  { icon: FiDatabase, name: "MongoDB", color: "#47A248" },
  { icon: FiHardDrive, name: "PostgreSQL", color: "#4169E1" },
  { icon: FiCpu, name: "TensorFlow", color: "#FF6F00" },
  { icon: FiSmartphone, name: "Flutter", color: "#02569B" },
  { icon: FiCode, name: "TypeScript", color: "#3178C6" },
  { icon: FiZap, name: "Go", color: "#00ADD8" },
  { icon: FiShield, name: "Rust", color: "#DEA584" },
  { icon: FiGitBranch, name: "GraphQL", color: "#E10098" },
  { icon: FiMonitor, name: "Figma", color: "#F24E1E" },
  { icon: FiWifi, name: "Tailwind", color: "#06B6D4" },
  { icon: FiGitBranch, name: "GitHub", color: "#ffffff" },
  { icon: FiTrendingUp, name: "Firebase", color: "#FFCA28" },
  { icon: FiLock, name: "Redis", color: "#DC382D" },
];

const slides = [
  {
    id: 1,
    badge: "Custom Software Development",
    title: "Building Digital",
    highlight: "Solutions",
    subtitle: "That Scale Your Business",
    description:
      "We craft bespoke software solutions that transform your business operations, drive efficiency, and accelerate growth across every touchpoint.",
    cta: "Start Your Project",
    ctaLink: "/contact",
    secondaryCta: "Our Services",
    secondaryLink: "/services",
    image: "/slides/1.jpg",
  },
  {
    id: 2,
    badge: "Cloud & DevOps",
    title: "Powering Your",
    highlight: "Cloud",
    subtitle: "Infrastructure at Scale",
    description:
      "Scalable cloud architecture and DevOps automation that keeps your applications running at peak performance with 99.99% reliability.",
    cta: "Explore Cloud",
    ctaLink: "/services",
    secondaryCta: "Case Studies",
    secondaryLink: "/portfolio",
    image: "/slides/2.jpg",
  },
  {
    id: 3,
    badge: "Mobile App Development",
    title: "Crafting Mobile",
    highlight: "Experiences",
    subtitle: "Users Absolutely Love",
    description:
      "Native and cross-platform mobile applications with stunning UI, blazing performance, and seamless user experiences on every device.",
    cta: "Build Your App",
    ctaLink: "/contact",
    secondaryCta: "See Our Work",
    secondaryLink: "/portfolio",
    image: "/slides/3.jpg",
  },
  {
    id: 4,
    badge: "Cybersecurity & AI",
    title: "Securing Your",
    highlight: "Digital",
    subtitle: "Future with Intelligence",
    description:
      "AI-powered security solutions that protect your data, detect threats in real-time, and ensure compliance across your entire infrastructure.",
    cta: "Secure Now",
    ctaLink: "/contact",
    secondaryCta: "Learn More",
    secondaryLink: "/services",
    image: "/slides/4.jpg",
  },
  {
    id: 5,
    badge: "Data & Analytics",
    title: "Transforming Data",
    highlight: "Into",
    subtitle: "Actionable Intelligence",
    description:
      "Harness big data, machine learning, and predictive analytics to unlock actionable insights and make smarter business decisions.",
    cta: "Get Insights",
    ctaLink: "/contact",
    secondaryCta: "Our Approach",
    secondaryLink: "/about",
    image: "/slides/5.jpg",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("down");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const SLIDE_DURATION = 7000;

  const goToSlide = useCallback(
    (index, dir = "down") => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setDirection(dir);
      setPreviousSlide(currentSlide);
      setProgress(0);

      setTimeout(() => {
        setCurrentSlide(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 150);
      }, 500);
    },
    [isTransitioning, currentSlide]
  );

  const goNext = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next, "down");
  }, [currentSlide, goToSlide]);

  const goPrev = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev, "up");
  }, [currentSlide, goToSlide]);

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) goNext();
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning, goNext]);

  // Progress
  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 30);
    return () => clearInterval(progressInterval);
  }, [currentSlide]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Mouse wheel
  useEffect(() => {
    let timeout;
    const handleWheel = (e) => {
      if (timeout) return;
      timeout = setTimeout(() => {
        timeout = null;
      }, 1500);

      if (e.deltaY > 50) goNext();
      else if (e.deltaY < -50) goPrev();
    };

    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      heroEl.addEventListener("wheel", handleWheel, { passive: true });
      return () => heroEl.removeEventListener("wheel", handleWheel);
    }
  }, [goNext, goPrev]);

  useEffect(() => {
    setImagesLoaded(true);
  }, []);

  const slide = slides[currentSlide];
  const prevSlideData = slides[previousSlide];

  return (
    <section
      id="hero-section"
      className="relative h-screen min-h-[700px] max-h-[1200px] overflow-hidden"
    >
      {/* ===== BACKGROUND IMAGE LAYERS ===== */}

      {/* Previous slide image (crossfade) */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={prevSlideData.image}
          alt={prevSlideData.badge}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Current slide image */}
      <div
        className={`absolute inset-0 z-[1] transition-all duration-1000 ease-out ${
          isTransitioning
            ? direction === "down"
              ? "opacity-0 scale-110 translate-y-4"
              : "opacity-0 scale-110 -translate-y-4"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        <Image
          src={slide.image}
          alt={slide.badge}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{
            transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px) scale(1.05)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {/* Noise grain */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Orange glow */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(255,107,0,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 z-[3] grid-pattern opacity-20 pointer-events-none" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Content area */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Badge */}
              <div
                className={`transition-all duration-700 ease-out ${
                  isTransitioning
                    ? direction === "down"
                      ? "opacity-0 translate-y-8"
                      : "opacity-0 -translate-y-8"
                    : "opacity-100 translate-y-0"
                }`}
                style={{ transitionDelay: "0ms" }}
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-tribyte-orange opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-tribyte-orange" />
                  </span>
                  <span className="text-sm font-semibold text-tribyte-orange tracking-wide">
                    {slide.badge}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div
                className={`transition-all duration-700 ease-out ${
                  isTransitioning
                    ? direction === "down"
                      ? "opacity-0 translate-y-10"
                      : "opacity-0 -translate-y-10"
                    : "opacity-100 translate-y-0"
                }`}
                style={{ transitionDelay: "80ms" }}
              >
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6 text-white"
                  style={{
                    transform: `translate(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px)`,
                  }}
                >
                  <span className="block">{slide.title}</span>
                  <span className="block text-tribyte-orange text-glow mt-1">
                    {slide.highlight}
                  </span>
                  <span className="block text-white/70 text-[0.75em] mt-1">
                    {slide.subtitle}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <div
                className={`transition-all duration-700 ease-out ${
                  isTransitioning
                    ? direction === "down"
                      ? "opacity-0 translate-y-12"
                      : "opacity-0 -translate-y-12"
                    : "opacity-100 translate-y-0"
                }`}
                style={{ transitionDelay: "160ms" }}
              >
                <p className="text-lg sm:text-xl text-white/60 max-w-xl mb-10 leading-relaxed">
                  {slide.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className={`transition-all duration-700 ease-out ${
                  isTransitioning
                    ? direction === "down"
                      ? "opacity-0 translate-y-14"
                      : "opacity-0 -translate-y-14"
                    : "opacity-100 translate-y-0"
                }`}
                style={{ transitionDelay: "240ms" }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-tribyte-orange text-white font-semibold text-lg transition-all duration-300 hover:bg-tribyte-orange-dark hover:shadow-tribyte-lg magnetic-btn overflow-hidden"
                  >
                    <span className="relative z-10">{slide.cta}</span>
                    <FiArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-tribyte-orange-dark to-tribyte-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                  <Link
                    href={slide.secondaryLink}
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/15 text-white font-semibold text-lg transition-all duration-300 hover:border-tribyte-orange/50 hover:bg-white/5 magnetic-btn"
                  >
                    <FiPlay className="w-5 h-5 text-tribyte-orange" />
                    <span>{slide.secondaryCta}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== VERTICAL NAVIGATION (Right Side) ===== */}
        <div className="absolute right-6 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
          {slides.map((s, index) => (
            <button
              key={s.id}
              onClick={() =>
                goToSlide(index, index > currentSlide ? "down" : "up")
              }
              className="group relative flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Progress ring */}
              {index === currentSlide && (
                <svg
                  className="absolute w-10 h-10 -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(255,107,0,0.15)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 0.94} 94`}
                    className="transition-all duration-100 ease-linear"
                  />
                </svg>
              )}

              {/* Dot */}
              <div
                className={`relative rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-3.5 h-3.5 bg-tribyte-orange shadow-tribyte"
                    : "w-2 h-2 bg-white/30 group-hover:bg-white/60 group-hover:scale-150"
                }`}
              />

              {/* Tooltip */}
              <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                <span className="text-xs font-medium text-white">
                  {s.badge}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* ===== TECH ICONS MARQUEE (Bottom) ===== */}
        <div className="relative z-20 pb-6">
          {/* Separator line */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

          <div className="relative overflow-hidden">
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

            {/* Row 1 → left to right */}
            <div className="marquee-track mb-3">
              {[...techIcons, ...techIcons].map((tech, index) => {
                const IconComp = tech.icon;
                return (
                  <div
                    key={`r1-${index}`}
                    className="flex-shrink-0 mx-2 group"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-tribyte-orange/30 hover:bg-white/[0.08] transition-all duration-300 cursor-default">
                      <IconComp
                        className="w-4 h-4 transition-all duration-300 opacity-50 group-hover:opacity-100"
                        style={{ color: tech.color }}
                      />
                      <span className="text-xs font-medium text-white/40 group-hover:text-white/80 transition-colors whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Row 2 → right to left */}
            <div className="marquee-track-reverse">
              {[
                ...techIcons.slice(10),
                ...techIcons.slice(0, 10),
                ...techIcons.slice(10),
                ...techIcons.slice(0, 10),
              ].map((tech, index) => {
                const IconComp = tech.icon;
                return (
                  <div
                    key={`r2-${index}`}
                    className="flex-shrink-0 mx-2 group"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-tribyte-orange/30 hover:bg-white/[0.08] transition-all duration-300 cursor-default">
                      <IconComp
                        className="w-4 h-4 transition-all duration-300 opacity-50 group-hover:opacity-100"
                        style={{ color: tech.color }}
                      />
                      <span className="text-xs font-medium text-white/40 group-hover:text-white/80 transition-colors whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== SLIDE THUMBNAILS (Bottom Right) ===== */}
      <div className="absolute bottom-24 right-6 sm:right-8 lg:right-12 z-20 hidden lg:flex flex-col gap-2">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() =>
              goToSlide(index, index > currentSlide ? "down" : "up")
            }
            className={`relative w-16 h-10 rounded-lg overflow-hidden transition-all duration-500 ${
              index === currentSlide
                ? "ring-2 ring-tribyte-orange ring-offset-2 ring-offset-black/50 scale-110"
                : "opacity-40 hover:opacity-70 hover:scale-105"
            }`}
          >
            <Image
              src={s.image}
              alt={s.badge}
              fill
              className="object-cover"
              sizes="64px"
            />
            {index === currentSlide && (
              <div className="absolute inset-0 bg-tribyte-orange/10" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}