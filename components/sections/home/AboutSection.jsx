"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function AboutSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

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

  // Pause video when modal closes
  useEffect(() => {
    if (!videoOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [videoOpen]);

  const tLeft = (delay) => ({
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-40px)",
  });

  const tRight = (delay) => ({
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(40px)",
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* ── LEFT: Text ── */}
          <div className="flex-1 max-w-[480px]">
            {/* Eyebrow */}
            <div style={tLeft(100)}>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                  About us
                </span>
              </div>
            </div>

            {/* Heading */}
            <div style={tLeft(250)}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.5rem] leading-[1.12] tracking-[-0.03em] text-gray-900 dark:text-white mb-5">
                Leading companies trust us{" "}
                <span className="block mt-1">
                  to develop{" "}
                  <span className="relative inline-block text-orange-500">
                    software
                    <svg
                      className="absolute -bottom-1 left-0 w-full"
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
                          transition:
                            "stroke-dashoffset 1.2s ease-out 0.8s",
                        }}
                      />
                    </svg>
                  </span>
                </span>
              </h2>
            </div>

            {/* Body text */}
            <div style={tLeft(400)}>
              <p className="text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 leading-[1.75] mb-8">
                We{" "}
                <span className="text-orange-500 font-semibold">
                  add development capacity
                </span>{" "}
                to tech teams. Our value isn&apos;t limited to building teams
                but is equally distributed across the project lifecycle. We are
                a custom software development company that guarantees the
                successful delivery of your project.
              </p>
            </div>

            {/* Stats */}
            <div style={tLeft(520)}>
              <div className="flex items-center gap-8 mb-10">
                {[
                  { value: "150+", label: "Projects Done" },
                  { value: "50+", label: "Expert Team" },
                  { value: "8+", label: "Years Experience" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-heading font-extrabold text-2xl text-gray-900 dark:text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA link */}
            <div style={tLeft(640)}>
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 text-[13px] font-bold text-orange-500 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
              >
                See more Informations
                <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Thumbnail with play button ── */}
          <div className="flex-1 w-full max-w-[520px]">
            <div style={tRight(300)}>
              <div
                className="relative overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30 group cursor-pointer"
                style={{ borderRadius: "4px" }}
                onClick={() => setVideoOpen(true)}
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/slides/4.jpg"
                    alt="Watch our story"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/30 transition-all duration-500" />
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 rounded-full bg-orange-500/20 animate-ping" />
                    <span className="absolute w-16 h-16 rounded-full bg-orange-500/15" />
                    <div
                      className="relative w-14 h-14 bg-orange-500 hover:bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/40 transition-all duration-300 group-hover:scale-110 active:scale-95"
                      style={{ borderRadius: "4px" }}
                    >
                      <FiPlay
                        className="w-5 h-5 text-white ml-0.5"
                        fill="white"
                      />
                    </div>
                  </div>
                </div>

                {/* "Watch Video" label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span className="text-[11px] font-bold text-white/80 tracking-wider uppercase">
                    Watch Video
                  </span>
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 left-3">
                  <div className="w-6 h-[2px] bg-orange-500" />
                  <div className="w-[2px] h-6 bg-orange-500 mt-[-2px]" />
                </div>
                <div className="absolute bottom-3 right-3 rotate-180">
                  <div className="w-6 h-[2px] bg-orange-500" />
                  <div className="w-[2px] h-6 bg-orange-500 mt-[-2px]" />
                </div>

                {/* Duration badge */}
                <div
                  className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm"
                  style={{ borderRadius: "3px" }}
                >
                  <span className="text-[10px] font-bold text-white/90 tabular-nums">
                    02:30
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black overflow-hidden shadow-2xl"
            style={{ borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src="/video.mp4"
              poster="/slides/4.jpg"
              className="w-full h-full object-cover"
              autoPlay
              controls
              playsInline
            />
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90"
              style={{ borderRadius: "4px" }}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}