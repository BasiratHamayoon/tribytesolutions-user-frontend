"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft, FiLinkedin, FiGithub, FiTwitter,
  FiGlobe, FiMail, FiPhone, FiCalendar, FiBriefcase,
  FiUsers, FiCode, FiStar
} from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { getImageUrl } from "@/utils/getImageUrl";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function MemberImageWithFallback({ src, alt, name }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getImageUrl(src);

  if (!imageUrl || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-orange-500/5">
        <span className="text-7xl font-black text-orange-500/20">
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
      className="object-cover object-top"
      sizes="(max-width: 768px) 100vw, 500px"
      onError={() => setHasError(true)}
      unoptimized
    />
  );
}

export default function TeamMemberDetail({ slug }) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!slug || hasFetched.current) return;
    hasFetched.current = true;

    const fetchMember = async () => {
      try {
        const res = await fetch(`${API_BASE}/team/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const memberData = data.data || data;
        if (memberData && (memberData._id || memberData.slug)) {
          setMember(memberData);
          setTimeout(() => setVisible(true), 50);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [slug]);

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
    });
  };

  const socialLinks = member ? [
    { key: "linkedin", icon: FiLinkedin, label: "LinkedIn", href: member.socialLinks?.linkedin },
    { key: "github", icon: FiGithub, label: "GitHub", href: member.socialLinks?.github },
    { key: "twitter", icon: FiTwitter, label: "Twitter", href: member.socialLinks?.twitter },
    { key: "website", icon: FiGlobe, label: "Website", href: member.socialLinks?.website },
  ].filter(s => s.href) : [];

  if (loading) {
    return (
      <main className="relative min-h-screen bg-white dark:bg-[#09090b] pt-24 pb-20 overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="h-6 w-24 bg-gray-100 dark:bg-white/[0.06] rounded animate-pulse mb-10" />
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <div
                className="w-full aspect-square bg-gray-100 dark:bg-white/[0.06] animate-pulse"
                style={{ borderRadius: "6px" }}
              />
              <div className="h-24 bg-gray-100 dark:bg-white/[0.06] rounded animate-pulse" />
              <div className="h-32 bg-gray-100 dark:bg-white/[0.06] rounded animate-pulse" />
            </div>
            <div className="lg:col-span-3 space-y-4 pt-2">
              <div className="h-3 w-24 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
              <div className="h-10 w-3/4 bg-gray-100 dark:bg-white/[0.06] rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
              <div className="h-px bg-gray-100 dark:bg-white/[0.04]" />
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
                <div className="h-3 w-4/6 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
                ))}
              </div>
              <div className="h-32 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
              <div className="h-48 bg-gray-100 dark:bg-white/[0.04] rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !member) {
    return (
      <main className="relative min-h-screen bg-white dark:bg-[#09090b] flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 text-center px-6">
          <p className="text-8xl font-black text-gray-100 dark:text-white/[0.03] mb-4">404</p>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Member not found</h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 max-w-xs mx-auto">
            This team member does not exist or has been removed.
          </p>
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-[13px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98]"
            style={{ borderRadius: "4px" }}
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back to Team
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#09090b] overflow-hidden">
      <ParticleBackground />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-24">
        <div
          className="transition-all duration-500 mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-8px)"
          }}
        >
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors duration-300 group"
          >
            <FiArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
            Back to Team
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div
            className="lg:col-span-2 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transitionDelay: "80ms"
            }}
          >
            <div className="sticky top-24 space-y-4">
              <div
                className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
                style={{ borderRadius: "6px" }}
              >
                <MemberImageWithFallback
                  src={member.image}
                  alt={member.name}
                  name={member.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

                {member.isFeatured && (
                  <div
                    className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-orange-500 text-white text-[9px] font-bold uppercase tracking-wider"
                    style={{ borderRadius: "3px" }}
                  >
                    <FiStar className="w-2.5 h-2.5 fill-white" />
                    Featured
                  </div>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div
                  className="p-4 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]"
                  style={{ borderRadius: "4px" }}
                >
                  <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-3">
                    Connect
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.key}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 hover:text-orange-500 hover:border-orange-500/40 text-[11px] font-bold transition-all duration-300 hover:-translate-y-[1px]"
                          style={{ borderRadius: "4px" }}
                        >
                          <Icon className="w-3 h-3" />
                          {social.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              <div
                className="p-4 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] space-y-3"
                style={{ borderRadius: "4px" }}
              >
                <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                  Contact Info
                </p>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="flex items-center gap-2.5 group">
                    <div
                      className="w-7 h-7 bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-all duration-300"
                      style={{ borderRadius: "3px" }}
                    >
                      <FiMail className="w-3 h-3 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors duration-300 truncate">
                      {member.email}
                    </span>
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="flex items-center gap-2.5 group">
                    <div
                      className="w-7 h-7 bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-all duration-300"
                      style={{ borderRadius: "3px" }}
                    >
                      <FiPhone className="w-3 h-3 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                      {member.phone}
                    </span>
                  </a>
                )}
                {member.joinedAt && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 bg-orange-500/10 flex items-center justify-center flex-shrink-0"
                      style={{ borderRadius: "3px" }}
                    >
                      <FiCalendar className="w-3 h-3 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-wider block">
                        Joined
                      </span>
                      <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                        {formatDate(member.joinedAt)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div
              className="transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "120ms"
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-extrabold text-orange-500/60 uppercase tracking-[0.2em]">
                  Team Member
                </span>
                {member.order > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600 tabular-nums">
                      #{String(member.order).padStart(2, "0")}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight mb-2">
                {member.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-[13px] font-bold text-orange-500">
                  {member.role}
                </span>
                {member.department && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span
                      className="px-2 py-0.5 text-[10px] font-bold bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                      style={{ borderRadius: "3px" }}
                    >
                      {member.department}
                    </span>
                  </>
                )}
                {member.isActive && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Active
                    </span>
                  </>
                )}
              </div>

              {member.bio && (
                <p className="text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 leading-[1.8]">
                  {member.bio}
                </p>
              )}
            </div>

            <div
              className="w-full h-px bg-gray-100 dark:bg-white/[0.04]"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease 160ms"
              }}
            />

            <div
              className="grid grid-cols-3 gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.6s cubic-bezier(.22,1,.36,1) 180ms"
              }}
            >
              {[
                { icon: FiBriefcase, label: "Role", value: member.role },
                { icon: FiUsers, label: "Department", value: member.department },
                {
                  icon: FiCode,
                  label: "Skills",
                  value: Array.isArray(member.skills) && member.skills.length > 0
                    ? `${member.skills.length} Skills`
                    : "—"
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-4 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] text-center"
                    style={{ borderRadius: "4px" }}
                  >
                    <div
                      className="w-8 h-8 mx-auto mb-2 bg-orange-500/10 flex items-center justify-center"
                      style={{ borderRadius: "4px" }}
                    >
                      <Icon className="w-3.5 h-3.5 text-orange-500" />
                    </div>
                    <p className="text-[11px] font-extrabold text-gray-900 dark:text-white truncate">
                      {item.value || "—"}
                    </p>
                    <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-wider font-bold mt-0.5">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {Array.isArray(member.skills) && member.skills.length > 0 && (
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "all 0.6s cubic-bezier(.22,1,.36,1) 220ms"
                }}
              >
                <div
                  className="p-5 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]"
                  style={{ borderRadius: "4px" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-6 h-6 bg-orange-500/10 flex items-center justify-center"
                      style={{ borderRadius: "3px" }}
                    >
                      <FiCode className="w-3 h-3 text-orange-500" />
                    </div>
                    <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                      Skills & Technologies
                    </p>
                    <span
                      className="ml-auto px-2 py-0.5 text-[9px] font-bold bg-orange-500/10 text-orange-500"
                      style={{ borderRadius: "3px" }}
                    >
                      {member.skills.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-700 dark:text-gray-300 text-[11px] font-bold hover:border-orange-500/40 hover:text-orange-500 transition-all duration-300"
                        style={{ borderRadius: "4px" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.6s cubic-bezier(.22,1,.36,1) 280ms"
              }}
            >
              <div
                className="p-5 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06]"
                style={{ borderRadius: "4px" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 bg-orange-500/10 flex items-center justify-center"
                    style={{ borderRadius: "3px" }}
                  >
                    <FiUsers className="w-3 h-3 text-orange-500" />
                  </div>
                  <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                    Member Details
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Full Name", value: member.name },
                    { label: "Role", value: member.role },
                    { label: "Department", value: member.department },
                    { label: "Status", value: member.isActive ? "Active" : "Inactive" },
                    { label: "Featured", value: member.isFeatured ? "Yes" : "No" },
                    { label: "Member Since", value: formatDate(member.joinedAt) },
                    { label: "Email", value: member.email || "—" },
                    { label: "Phone", value: member.phone || "—" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04]"
                      style={{ borderRadius: "4px" }}
                    >
                      <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[12px] font-bold text-gray-900 dark:text-white truncate">
                        {item.value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.6s cubic-bezier(.22,1,.36,1) 340ms"
              }}
            >
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors duration-300 group"
              >
                <FiArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
                Back to all members
              </Link>

              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[12px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.98]"
                  style={{ borderRadius: "4px" }}
                >
                  <FiMail className="w-3.5 h-3.5" />
                  Send Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}