"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";

const members = [
  { name: "Rachel Martin", role: "Senior Frontend Dev", image: "/team/t5.jpg", socials: { linkedin: "#", github: "#" } },
  { name: "Daniel Kim", role: "Backend Engineer", image: "/team/t6.jpg", socials: { linkedin: "#", github: "#" } },
  { name: "Sarah Wilson", role: "Mobile Developer", image: "/team/t1.jpg", socials: { linkedin: "#" } },
  { name: "James Chen", role: "DevOps Engineer", image: "/team/t2.jpg", socials: { linkedin: "#", github: "#" } },
  { name: "Priya Sharma", role: "UI/UX Designer", image: "/team/t3.jpg", socials: { linkedin: "#" } },
  { name: "Alex Rivera", role: "QA Engineer", image: "/team/t4.jpg", socials: { linkedin: "#" } },
  { name: "Lisa Park", role: "Product Manager", image: "/team/t5.jpg", socials: { linkedin: "#" } },
  { name: "Omar Hassan", role: "Data Engineer", image: "/team/t6.jpg", socials: { linkedin: "#", github: "#" } },
];

function MemberCard({ member }) {
  return (
    <div className="flex-shrink-0 mx-2 group cursor-default" style={{ width: 200 }}>
      <div className="relative overflow-hidden bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400" style={{ borderRadius: "4px" }}>
        <div className="relative w-full h-[240px] overflow-hidden bg-gray-100 dark:bg-white/[0.02]">
          <Image src={member.image} alt={member.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-110" sizes="200px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
            {member.socials.linkedin && (
              <a href={member.socials.linkedin} className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90" style={{ borderRadius: "3px" }}>
                <FiLinkedin className="w-3 h-3" />
              </a>
            )}
            {member.socials.github && (
              <a href={member.socials.github} className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90" style={{ borderRadius: "3px" }}>
                <FiGithub className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="font-heading font-bold text-[13px] text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">{member.name}</p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">{member.role}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );
}

export default function TeamMembers() {
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

  const row1 = members;
  const row2 = [...members.slice(4), ...members.slice(0, 4)];

  return (
    <section ref={ref} className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <div className="text-center mb-14 px-6">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">The team</span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Our{" "}
              <span className="relative inline-block text-orange-500">
                Experts
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 140 5" fill="none">
                  <path d="M1 3.5C25 1 50 1 70 2.5C90 4 115 2 139 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="140" style={{ strokeDashoffset: inView ? 0 : 140, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>
          <div style={t(300)}>
            <p className="mt-3 text-[14px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">The talented individuals who make the magic happen every day.</p>
          </div>
        </div>

        <div className="relative overflow-hidden" style={t(400)}>
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 dark:from-[#0c0c0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 dark:from-[#0c0c0f] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track mb-4">
            {[...row1, ...row1, ...row1, ...row1].map((member, i) => (
              <MemberCard key={`r1-${i}`} member={member} />
            ))}
          </div>

          <div className="marquee-track-reverse">
            {[...row2, ...row2, ...row2, ...row2].map((member, i) => (
              <MemberCard key={`r2-${i}`} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}