"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiLinkedin, FiTwitter, FiGithub } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

const leaders = [
  { name: "Michael Patel", role: "CEO & Founder", image: "/team/t1.jpg", bio: "15+ years in tech leadership. Previously VP of Engineering at a Fortune 500.", socials: { linkedin: "#", twitter: "#" } },
  { name: "Emily Thompson", role: "CTO", image: "/team/t2.jpg", bio: "Full-stack architect with expertise in distributed systems and cloud infrastructure.", socials: { linkedin: "#", github: "#" } },
  { name: "Samantha Lee", role: "Head of Design", image: "/team/t3.jpg", bio: "Award-winning designer who has led design systems for global SaaS products.", socials: { linkedin: "#", twitter: "#" } },
  { name: "Christopher Nguyen", role: "VP of Engineering", image: "/team/t4.jpg", bio: "10+ years building high-performance teams and scalable backend systems.", socials: { linkedin: "#", github: "#" } },
];

export default function TeamLeaders() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section ref={ref} id="leaders" className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">Leadership</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Our{" "}
              <span className="relative inline-block text-orange-500">
                Leaders
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 140 5" fill="none">
                  <path d="M1 3.5C25 1 50 1 70 2.5C90 4 115 2 139 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="140" style={{ strokeDashoffset: inView ? 0 : 140, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
          <div style={t(300)}>
            <p className="mt-3 text-[14px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">Experienced leaders driving our vision and innovation forward.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaders.map((leader, i) => (
            <div key={i} style={t(i * 120 + 400)}>
              <div className="group relative overflow-hidden bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400" style={{ borderRadius: "4px" }}>
                <div className="relative w-full h-[300px] overflow-hidden">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-110" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                    <div className="flex items-center gap-2 mb-2">
                      {leader.socials.linkedin && (
                        <a href={leader.socials.linkedin} className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90" style={{ borderRadius: "3px" }}>
                          <FiLinkedin className="w-3 h-3" />
                        </a>
                      )}
                      {leader.socials.twitter && (
                        <a href={leader.socials.twitter} className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90" style={{ borderRadius: "3px" }}>
                          <FiTwitter className="w-3 h-3" />
                        </a>
                      )}
                      {leader.socials.github && (
                        <a href={leader.socials.github} className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90" style={{ borderRadius: "3px" }}>
                          <FiGithub className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-[10px] text-white/70 text-center px-4 leading-[1.5]">{leader.bio}</p>
                  </div>
                </div>

                <div className="p-4 text-center">
                  <p className="font-heading font-bold text-[14px] text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">{leader.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">{leader.role}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}