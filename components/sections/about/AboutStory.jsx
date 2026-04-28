"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiPlay } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function AboutStory() {
  const [inView, setInView] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} id="our-story" className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden">
      <ParticleBackground />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          <div className="flex-1 w-full max-w-[520px] order-2 lg:order-1">
            <div style={tLeft(200)}>
              <div className="relative overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30 group cursor-pointer" style={{ borderRadius: "4px" }} onClick={() => setVideoOpen(true)}>
                <div className="relative aspect-[4/3] w-full">
                  <Image src="/slides/4.jpg" alt="Our story" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 90vw, 520px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 rounded-full bg-orange-500/20 animate-ping" />
                    <span className="absolute w-16 h-16 rounded-full bg-orange-500/15" />
                    <div className="relative w-14 h-14 bg-orange-500 hover:bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/40 transition-all duration-300 group-hover:scale-110 active:scale-95" style={{ borderRadius: "4px" }}>
                      <FiPlay className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <div className="w-6 h-[2px] bg-orange-500" />
                  <div className="w-[2px] h-6 bg-orange-500 mt-[-2px]" />
                </div>
                <div className="absolute bottom-3 right-3 rotate-180">
                  <div className="w-6 h-[2px] bg-orange-500" />
                  <div className="w-[2px] h-6 bg-orange-500 mt-[-2px]" />
                </div>

                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm" style={{ borderRadius: "3px" }}>
                  <span className="text-[10px] font-bold text-white/90 tabular-nums">02:30</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-[520px] order-1 lg:order-2">
            <div style={tRight(100)}>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Our story</span>
              </div>
            </div>

            <div style={tRight(250)}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.5rem] leading-[1.12] tracking-[-0.03em] text-gray-900 dark:text-white mb-5">
                Started with a{" "}
                <span className="relative inline-block text-orange-500">
                  vision
                  <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 120 5" fill="none">
                    <path d="M1 3.5C25 1 50 1 60 2.5C70 4 95 2 119 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="120" style={{ strokeDashoffset: inView ? 0 : 120, transition: "stroke-dashoffset 1.2s ease-out 0.8s" }} />
                  </svg>
                </span>
              </h2>
            </div>

            <div style={tRight(400)}>
              <p className="text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 leading-[1.75] mb-5">
                Founded in 2016, TriByte Solutions began with a simple belief — that great technology should be accessible to every business, regardless of size. What started as a three-person team in a small office has grown into a global force of 50+ engineers, designers, and strategists.
              </p>
              <p className="text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 leading-[1.75]">
                Today, we partner with startups, scale-ups, and enterprises across 25+ countries, delivering custom software that drives real business impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {videoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-3xl aspect-video bg-black overflow-hidden" style={{ borderRadius: "4px" }} onClick={(e) => e.stopPropagation()}>
            <video ref={videoRef} src="/video.mp4" poster="/slides/4.jpg" className="w-full h-full object-cover" autoPlay controls playsInline />
            <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90" style={{ borderRadius: "4px" }}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}