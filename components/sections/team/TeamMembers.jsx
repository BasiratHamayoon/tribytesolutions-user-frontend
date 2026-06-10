"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLinkedin, FiGithub, FiTwitter, FiGlobe, FiArrowRight } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useTeam } from "@/hooks/useTeam";
import { getImageUrl } from "@/utils/getImageUrl";

function MemberImageWithFallback({ src, alt, name }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getImageUrl(src);

  if (!imageUrl || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-orange-500/5">
        <span className="text-3xl font-black text-orange-500/20">
          {name?.charAt(0)?.toUpperCase() || "?"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt || name}
      fill
      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
      sizes="220px"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}

function MemberCard({ member }) {
  return (
    <div className="flex-shrink-0 mx-2 group" style={{ width: 200 }}>
      <div
        className="relative overflow-hidden bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 hover:shadow-xl hover:shadow-orange-500/[0.05]"
        style={{ borderRadius: "6px" }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

        <div className="relative w-full h-[220px] overflow-hidden bg-gray-100 dark:bg-white/[0.02]">
          <MemberImageWithFallback src={member.image} alt={member.name} name={member.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 z-10">
            {member.socialLinks?.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                style={{ borderRadius: "3px" }}
              >
                <FiLinkedin className="w-3 h-3" />
              </a>
            )}
            {member.socialLinks?.github && (
              <a
                href={member.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                style={{ borderRadius: "3px" }}
              >
                <FiGithub className="w-3 h-3" />
              </a>
            )}
            {member.socialLinks?.twitter && (
              <a
                href={member.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                style={{ borderRadius: "3px" }}
              >
                <FiTwitter className="w-3 h-3" />
              </a>
            )}
            {member.socialLinks?.website && (
              <a
                href={member.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                style={{ borderRadius: "3px" }}
              >
                <FiGlobe className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        <div className="px-4 py-3">
          <p className="font-heading font-bold text-[13px] text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300 truncate">
            {member.name}
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5 truncate">
            {member.role}
          </p>
          {member.department && (
            <p className="text-[9px] text-orange-500/50 font-bold uppercase tracking-wider mt-0.5">
              {member.department}
            </p>
          )}
          {Array.isArray(member.skills) && member.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {member.skills.slice(0, 2).map((skill, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 text-[8px] font-bold bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-500"
                  style={{ borderRadius: "2px" }}
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 2 && (
                <span
                  className="px-1.5 py-0.5 text-[8px] font-bold bg-gray-100 dark:bg-white/[0.04] text-gray-400 dark:text-gray-600"
                  style={{ borderRadius: "2px" }}
                >
                  +{member.skills.length - 2}
                </span>
              )}
            </div>
          )}
          <Link
            href={`/team/${member.slug}`}
            className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-orange-500/40 group-hover:text-orange-500 transition-colors duration-300"
          >
            <span>View profile</span>
            <FiArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 mx-2 animate-pulse" style={{ width: 200 }}>
      <div
        className="overflow-hidden bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06]"
        style={{ borderRadius: "6px" }}
      >
        <div className="w-full h-[220px] bg-gray-200 dark:bg-white/[0.06]" />
        <div className="px-4 py-3 space-y-1.5">
          <div className="h-3.5 w-3/4 bg-gray-200 dark:bg-white/[0.06] rounded" />
          <div className="h-2.5 w-1/2 bg-gray-100 dark:bg-white/[0.04] rounded" />
          <div className="h-2 w-1/3 bg-gray-100 dark:bg-white/[0.04] rounded mt-2" />
        </div>
      </div>
    </div>
  );
}

export default function TeamMembers() {
  const { active, loading, error } = useTeam();
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

  const half = Math.ceil(active.length / 2);
  const row1 = active.slice(0, half);
  const row2 = active.slice(half);
  const skeletonRow = [...Array(6)];

  return (
    <section
      ref={ref}
      className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden"
    >
      <ParticleBackground />

      <div className="relative z-10">
        <div className="text-center mb-14 px-6">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                The team
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Our{" "}
              <span className="relative inline-block text-orange-500">
                Experts
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 140 5" fill="none">
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
              {error
                ? "Unable to load team members right now."
                : "The talented individuals who make the magic happen every day."}
            </p>
          </div>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-[13px] text-gray-400 dark:text-gray-500">
              Unable to load team members. Please try again later.
            </p>
          </div>
        ) : (
          <div className="relative overflow-hidden" style={t(400)}>
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-gray-50 dark:from-[#0c0c0f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 dark:from-[#0c0c0f] to-transparent z-10 pointer-events-none" />

            <div className="marquee-track mb-4">
              {loading
                ? [...skeletonRow, ...skeletonRow].map((_, i) => <SkeletonCard key={`s1-${i}`} />)
                : [...row1, ...row1, ...row1, ...row1].map((member, i) => (
                    <MemberCard key={`r1-${member._id}-${i}`} member={member} />
                  ))
              }
            </div>

            <div className="marquee-track-reverse">
              {loading
                ? [...skeletonRow, ...skeletonRow].map((_, i) => <SkeletonCard key={`s2-${i}`} />)
                : [...row2, ...row2, ...row2, ...row2].map((member, i) => (
                    <MemberCard key={`r2-${member._id}-${i}`} member={member} />
                  ))
              }
            </div>
          </div>
        )}
      </div>
    </section>
  );
}