"use client";
import { useState, useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import ParticleBackground from "@/components/ui/ParticleBackground";

export default function PortfolioCTA() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const t = (d) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${d}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section ref={ref} className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative p-10 sm:p-14 border border-white/[0.08] overflow-hidden text-center" style={{ borderRadius: "4px", ...t(0) }}>
          <div className="absolute inset-0 z-0">
            <Image src="/slides/7.jpg" alt="CTA" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/45" />
          </div>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-orange-500/[0.12] blur-3xl pointer-events-none z-[1]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-orange-500/[0.08] blur-3xl pointer-events-none z-[1]" />
          <div className="relative z-10">
            <div style={t(100)}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Have a project?</span>
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              </div>
            </div>
            <div style={t(250)}>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-[-0.03em] mb-4 max-w-lg mx-auto">
                Let&apos;s create your next{" "}
                <span className="text-orange-500">success story</span>
              </h2>
            </div>
            <div style={t(400)}>
              <p className="text-[14px] text-white/70 max-w-md mx-auto mb-8 leading-relaxed">Tell us about your project and we&apos;ll bring it to life with our proven process.</p>
            </div>
            <div style={t(550)}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/#contact" className="group inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[12.5px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer" style={{ borderRadius: "4px" }}>
                  Start a project
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 px-6 py-2.5 border-[1.5px] border-white/20 text-white/90 text-[12.5px] font-bold transition-all duration-300 hover:border-orange-500/50 hover:text-white hover:-translate-y-[1px] active:scale-[0.98] cursor-pointer" style={{ borderRadius: "4px" }}>
                  Our services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}