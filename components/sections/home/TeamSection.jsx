"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiLinkedin, FiTwitter, FiGithub, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

const leaders = [
  {
    name: "Michael Patel",
    role: "CEO & Founder",
    image: "/team/t1.jpg",
    bio: "15+ years in tech leadership. Previously VP of Engineering at a Fortune 500.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Emily Thompson",
    role: "CTO",
    image: "/team/t2.jpg",
    bio: "Full-stack architect with expertise in distributed systems and cloud infrastructure.",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Samantha Lee",
    role: "Head of Design",
    image: "/team/t3.jpg",
    bio: "Award-winning designer who has led design systems for global SaaS products.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Christopher Nguyen",
    role: "VP of Engineering",
    image: "/team/t4.jpg",
    bio: "10+ years building high-performance teams and scalable backend systems.",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Rachel Martin",
    role: "Head of Product",
    image: "/team/t5.jpg",
    bio: "Product strategist with a track record of launching 20+ successful digital products.",
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Daniel Kim",
    role: "Lead Architect",
    image: "/team/t6.jpg",
    bio: "Cloud-native expert specializing in microservices, Kubernetes, and DevOps at scale.",
    socials: { linkedin: "#", github: "#" },
  },
];

export default function TeamLeaders() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={ref}
      id="leaders"
      className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden"
    >
      <ParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                Leadership
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Our{" "}
              <span className="relative inline-block text-orange-500">
                Leaders
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
              Experienced leaders driving our vision and innovation forward.
            </p>
          </div>
        </div>

        <div style={t(400)} className="relative">
          <button
            onClick={scrollLeft}
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg shadow-black/[0.04] dark:shadow-black/30 cursor-pointer active:scale-90"
            style={{ borderRadius: "50%" }}
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg shadow-black/[0.04] dark:shadow-black/30 cursor-pointer active:scale-90"
            style={{ borderRadius: "50%" }}
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-[#09090b] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-1 py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {leaders.map((leader, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[260px] sm:w-[280px]"
              >
                <div
                  className="group relative overflow-hidden bg-gray-100 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/[0.08]"
                  style={{ borderRadius: "6px" }}
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      sizes="320px"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-500" />

                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500">
                      {leader.socials.linkedin && (
                        <a
                          href={leader.socials.linkedin}
                          className="w-7 h-7 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                          style={{ borderRadius: "3px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiLinkedin className="w-3 h-3" />
                        </a>
                      )}
                      {leader.socials.twitter && (
                        <a
                          href={leader.socials.twitter}
                          className="w-7 h-7 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                          style={{ borderRadius: "3px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiTwitter className="w-3 h-3" />
                        </a>
                      )}
                      {leader.socials.github && (
                        <a
                          href={leader.socials.github}
                          className="w-7 h-7 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                          style={{ borderRadius: "3px" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiGithub className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="mb-2">
                        <p className="font-heading font-bold text-[15px] text-white leading-tight">
                          {leader.name}
                        </p>
                        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-[0.15em] mt-0.5">
                          {leader.role}
                        </p>
                      </div>

                      <div className="overflow-hidden">
                        <p className="text-[11px] text-white/70 leading-[1.6] max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                          {leader.bio}
                        </p>
                      </div>

                      <div className="mt-2 w-0 group-hover:w-8 h-[2px] bg-orange-500 transition-all duration-500" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}