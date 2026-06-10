"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLinkedin, FiTwitter, FiGithub, FiGlobe, FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useTeam } from "@/hooks/useTeam";
import { getImageUrl } from "@/utils/getImageUrl";

function SkeletonCard() {
  return (
    <div
      className="flex-shrink-0 w-[260px] sm:w-[280px] overflow-hidden bg-gray-100 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] animate-pulse"
      style={{ borderRadius: "6px" }}
    >
      <div className="w-full aspect-square bg-gray-200 dark:bg-white/[0.06]" />
      <div className="p-5 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/[0.06] rounded" />
        <div className="h-3 w-1/2 bg-gray-100 dark:bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}

function MemberImageWithFallback({ src, alt, name }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getImageUrl(src);

  if (!imageUrl || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-orange-500/5">
        <span className="text-5xl font-black text-orange-500/20">
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
      sizes="320px"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}

export default function TeamLeaders() {
  const { featured, active, loading, error } = useTeam();
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const scrollRef = useRef(null);

  const leaders = featured.length > 0 ? featured : active.slice(0, 8);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
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
                {featured.length > 0 ? "Featured Members" : "Leadership"}
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em]">
              Our{" "}
              <span className="relative inline-block text-orange-500">
                {featured.length > 0 ? "Stars" : "Leaders"}
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
              Experienced professionals driving our vision and innovation forward.
            </p>
          </div>
        </div>

        <div style={t(400)} className="relative">
          {!loading && leaders.length > 3 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute -left-4 sm:-left-5 top-[45%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg cursor-pointer active:scale-90"
                style={{ borderRadius: "50%" }}
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute -right-4 sm:-right-5 top-[45%] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:text-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg cursor-pointer active:scale-90"
                style={{ borderRadius: "50%" }}
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-[#09090b] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-1 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : error ? (
              <div className="w-full text-center py-12">
                <p className="text-[13px] text-gray-400 dark:text-gray-500">
                  Unable to load team members right now.
                </p>
              </div>
            ) : leaders.length === 0 ? (
              <div className="w-full text-center py-12">
                <p className="text-[13px] text-gray-400 dark:text-gray-500">
                  No team members available yet.
                </p>
              </div>
            ) : (
              leaders.map((member) => (
                <div key={member._id} className="flex-shrink-0 w-[260px] sm:w-[280px]">
                  <div
                    className="group relative overflow-hidden bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/[0.06]"
                    style={{ borderRadius: "6px" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                    <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-white/[0.03]">
                      <MemberImageWithFallback
                        src={member.image}
                        alt={member.name}
                        name={member.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-500" />

                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500 z-10">
                        {member.socialLinks?.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                            style={{ borderRadius: "3px" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiLinkedin className="w-3 h-3" />
                          </a>
                        )}
                        {member.socialLinks?.twitter && (
                          <a
                            href={member.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                            style={{ borderRadius: "3px" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiTwitter className="w-3 h-3" />
                          </a>
                        )}
                        {member.socialLinks?.github && (
                          <a
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                            style={{ borderRadius: "3px" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub className="w-3 h-3" />
                          </a>
                        )}
                        {member.socialLinks?.website && (
                          <a
                            href={member.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 cursor-pointer active:scale-90"
                            style={{ borderRadius: "3px" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGlobe className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-heading font-bold text-[15px] text-white leading-tight">
                          {member.name}
                        </p>
                        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-[0.15em] mt-0.5">
                          {member.role}
                        </p>
                        {member.department && (
                          <p className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">
                            {member.department}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      {member.bio && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-[1.7] line-clamp-2 mb-3">
                          {member.bio}
                        </p>
                      )}

                      {Array.isArray(member.skills) && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {member.skills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[9px] font-bold bg-orange-500/[0.06] text-orange-500/70 border border-orange-500/10"
                              style={{ borderRadius: "3px" }}
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span
                              className="px-2 py-0.5 text-[9px] font-bold bg-gray-100 dark:bg-white/[0.04] text-gray-400 dark:text-gray-600"
                              style={{ borderRadius: "3px" }}
                            >
                              +{member.skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/team/${member.slug}`}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors duration-300 group/link"
                      >
                        View profile
                        <FiArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}