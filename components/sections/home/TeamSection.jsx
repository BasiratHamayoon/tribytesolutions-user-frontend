"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiLinkedin, FiTwitter, FiGithub } from "react-icons/fi";

const team = [
  {
    id: 1,
    name: "Michael Patel",
    role: "Supply Chain",
    image: "/team/t1.jpg",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 2,
    name: "Emily Thompson",
    role: "Product Development",
    image: "/team/t2.jpg",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 3,
    name: "Samantha Lee",
    role: "Human Resources",
    image: "/team/t3.jpg",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 4,
    name: "Christopher Nguyen",
    role: "Operations Manager",
    image: "/team/t4.jpg",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 5,
    name: "Rachel Martin",
    role: "Sales Executive",
    image: "/team/t5.jpg",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 6,
    name: "Daniel Kim",
    role: "Lead Engineer",
    image: "/team/t6.jpg",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
];

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const total = team.length;
  const goPrev = () => setActiveIndex((p) => Math.max(p - 1, 0));
  const goNext = () => setActiveIndex((p) => Math.min(p + 1, total - 1));

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
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full bg-white dark:bg-[#09090b] pt-20 pb-0 lg:pt-28 overflow-hidden"
    >
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-[0.02]"
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

      {/* ══════ Centered Header ══════ */}
      <div className="relative z-10 text-center mb-14 px-4">
        <div style={t(0)}>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
              Pure talent
            </span>
            <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
          </div>
        </div>

        <div style={t(150)}>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
            Meet our{" "}
            <span className="relative inline-block text-orange-500">
              team
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                height="5"
                viewBox="0 0 100 5"
                fill="none"
              >
                <path
                  d="M1 3.5C20 1 40 1 50 2.5C60 4 80 2 99 3.5"
                  stroke="#ff6b00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  style={{
                    strokeDashoffset: inView ? 0 : 100,
                    transition: "stroke-dashoffset 1.2s ease-out 0.6s",
                  }}
                />
              </svg>
            </span>
          </h2>
        </div>

        <div style={t(300)}>
          <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            Unleashing creativity, our team of design visionaries turns
            ordinary spaces into extraordinary experiences.
          </p>
        </div>
      </div>

      {/* ══════ Team Cards Carousel ══════ */}
      <div
        className="relative z-10 w-full overflow-hidden"
        style={{ height: 440, ...t(450) }}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#09090b] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#09090b] to-transparent z-20 pointer-events-none" />

        <div
          ref={trackRef}
          className="absolute inset-0 flex items-end justify-center pb-10"
        >
          {team.map((member, idx) => {
            const offset = idx - activeIndex;
            const absOffset = Math.abs(offset);
            if (absOffset > 2) return null;

            const xPx = offset * 220;
            const scale = offset === 0 ? 1 : absOffset === 1 ? 0.88 : 0.76;
            const opacity = offset === 0 ? 1 : absOffset === 1 ? 0.65 : 0.35;
            const zIndex = 10 - absOffset;
            const yPx = offset === 0 ? 0 : absOffset === 1 ? 28 : 52;
            const isActive = offset === 0;
            const rotateY = offset * -3;

            return (
              <div
                key={member.id}
                onClick={() => setActiveIndex(idx)}
                className="absolute bottom-0 cursor-pointer select-none"
                style={{
                  transform: `translateX(${xPx}px) translateY(${yPx}px) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex,
                  transition:
                    "all 0.55s cubic-bezier(0.34, 1.2, 0.64, 1)",
                  width: 190,
                }}
              >
                {/* Photo */}
                <div
                  className={`relative w-full overflow-hidden transition-all duration-500 ${
                    isActive
                      ? "rounded-t-[100px] rounded-b-2xl shadow-2xl shadow-orange-500/20 ring-4 ring-orange-500/30"
                      : "rounded-t-[80px] rounded-b-xl"
                  }`}
                  style={{ height: isActive ? 310 : 260 }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="200px"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent" />
                  )}

                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20 flex items-center justify-center">
                    <span className="text-5xl font-heading font-bold text-orange-300 dark:text-orange-700 select-none">
                      {member.name[0]}
                    </span>
                  </div>
                </div>

                {/* Name + role */}
                <div
                  className={`pt-3 pb-1 px-1 text-center transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <p
                    className={`font-heading font-bold text-[15px] leading-tight transition-colors duration-300 ${
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {member.name}
                  </p>
                  <p
                    className={`text-[10px] mt-0.5 font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      isActive
                        ? "text-orange-500"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {member.role}
                  </p>

                  {/* Social icons — only on active */}
                  {isActive && (
                    <div className="flex items-center justify-center gap-2 mt-2.5">
                      {[
                        { href: member.socials.linkedin, Icon: FiLinkedin },
                        { href: member.socials.twitter, Icon: FiTwitter },
                        { href: member.socials.github, Icon: FiGithub },
                      ].map(({ href, Icon }, i) => (
                        <a
                          key={i}
                          href={href}
                          className="w-7 h-7 border border-orange-200 dark:border-orange-500/30 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200 cursor-pointer active:scale-90"
                          style={{ borderRadius: "4px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════ Bottom Controls ══════ */}
      <div
        className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 mt-6 flex items-center justify-center gap-4"
        style={t(600)}
      >
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-400 cursor-pointer ${
                i === activeIndex
                  ? "w-6 h-1.5 bg-orange-500"
                  : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-orange-300 dark:hover:bg-orange-700"
              }`}
              style={{ borderRadius: "1px" }}
              aria-label={`Go to team member ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-1.5 ml-3">
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="w-8 h-8 border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-orange-500 hover:text-orange-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer active:scale-90"
            style={{ borderRadius: "4px" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={activeIndex === total - 1}
            className="w-8 h-8 border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-orange-500 hover:text-orange-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer active:scale-90"
            style={{ borderRadius: "4px" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}