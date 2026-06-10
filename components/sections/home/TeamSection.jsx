"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi";
import { useTeam } from "@/hooks/useTeam";
import { getImageUrl } from "@/utils/getImageUrl";

function MemberImageWithFallback({ src, alt, name }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getImageUrl(src);

  if (!imageUrl || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-orange-500/5">
        <span className="text-2xl font-black text-orange-500/20">
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
      sizes="200px"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] animate-pulse"
      style={{ borderRadius: "4px" }}
    >
      <div className="w-full h-[220px] bg-gray-200 dark:bg-white/[0.06]" />
      <div className="p-4 space-y-1.5">
        <div className="h-3.5 w-3/4 bg-gray-200 dark:bg-white/[0.06] rounded" />
        <div className="h-2.5 w-1/2 bg-gray-100 dark:bg-white/[0.04] rounded" />
        <div className="h-2 w-1/3 bg-gray-100 dark:bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}

export default function TeamSection() {
  const { featured, active, loading, error } = useTeam();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const displayMembers = (featured.length > 0 ? featured : active).slice(0, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <div>
            <div style={t(0)}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                  Our people
                </span>
              </div>
            </div>
            <div style={t(150)}>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.5rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
                Meet Our{" "}
                <span className="relative inline-block text-orange-500">
                  Team
                  <svg className="absolute -bottom-1 left-0 w-full" height="5" viewBox="0 0 100 5" fill="none">
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
              <p className="mt-3 text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                {error
                  ? "Unable to load team members right now."
                  : "The talented people behind everything we build."}
              </p>
            </div>
          </div>

          <div style={t(300)}>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 px-4 py-1.5 border-[1.5px] border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 text-[11px] font-bold tracking-wide hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
              style={{ borderRadius: "3px" }}
            >
              Meet everyone
              <FiArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" style={t(400)}>
          {loading ? (
            [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
          ) : error || displayMembers.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {error ? "Unable to load team." : "No team members available yet."}
              </p>
            </div>
          ) : (
            displayMembers.map((member, i) => (
              <div
                key={member._id}
                className="group relative overflow-hidden bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 hover:shadow-lg hover:shadow-orange-500/[0.06]"
                style={{
                  borderRadius: "4px",
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                <div className="relative w-full h-[220px] overflow-hidden bg-gray-100 dark:bg-[#0a0a0d]">
                  <MemberImageWithFallback
                    src={member.image}
                    alt={member.name}
                    name={member.name}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 z-10">
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                        style={{ borderRadius: "3px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiLinkedin className="w-3 h-3" />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                        style={{ borderRadius: "3px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub className="w-3 h-3" />
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300"
                        style={{ borderRadius: "3px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiTwitter className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <Link
                  href={`/team/${member.slug}`}
                  className="block px-4 py-3"
                >
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
                      {member.skills.slice(0, 2).map((skill, si) => (
                        <span
                          key={si}
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
                  <div className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-orange-500/40 group-hover:text-orange-500 transition-colors duration-300">
                    <span>View profile</span>
                    <FiArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </Link>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}