"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft, FiExternalLink, FiGithub,
  FiCode, FiTag, FiCalendar, FiArrowRight,
} from "react-icons/fi";
import { useProjects } from "@/hooks/useProjects";
import { getImageUrl } from "@/utils/getImageUrl";

export default function PortfolioDetail({ project }) {
  const { projects } = useProjects();
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const imageUrl = getImageUrl(project.image);
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];

  const related = projects
    .filter((p) => p._id !== project._id && p.category === project.category)
    .slice(0, 2);

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-white dark:bg-[#09090b] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 lg:pt-36 pb-24">
        <div style={t(0)} className="mb-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>
        </div>

        {imageUrl && (
          <div
            className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] mb-12 overflow-hidden bg-gray-100 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
            style={{ borderRadius: "8px" }}
          >
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="1280px"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2">
              <span
                className="px-3 py-1 bg-orange-500 text-white text-[10px] font-bold tracking-[0.15em] uppercase"
                style={{ borderRadius: "3px" }}
              >
                {project.category}
              </span>
              {project.tag && (
                <span
                  className="px-3 py-1 bg-white/90 text-gray-900 text-[10px] font-bold tracking-[0.15em] uppercase"
                  style={{ borderRadius: "3px" }}
                >
                  {project.tag}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 mb-16">
          <div>
            <div style={t(100)}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                  {project.category}
                </span>
              </div>
            </div>

            <div style={t(200)}>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight mb-5">
                {project.title}
              </h1>
            </div>

            <div style={t(300)}>
              <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-[1.8] mb-6">
                {project.description}
              </p>
            </div>

            {project.fullDescription && (
              <div style={t(350)}>
                <p className="text-[13px] text-gray-500 dark:text-gray-500 leading-[1.8] mb-8">
                  {project.fullDescription}
                </p>
              </div>
            )}

            {techStack.length > 0 && (
              <div style={t(400)}>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FiCode className="w-3.5 h-3.5 text-orange-500" />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 text-[11px] font-bold tracking-wider uppercase border border-gray-200 dark:border-white/[0.06]"
                      style={{ borderRadius: "3px" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={t(500)} className="flex items-center gap-4 flex-wrap">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-[12px] font-bold transition-all duration-300 hover:bg-orange-600 hover:-translate-y-[1px] active:scale-[0.98]"
                  style={{ borderRadius: "4px" }}
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-[12px] font-bold hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
                  style={{ borderRadius: "4px" }}
                >
                  <FiGithub className="w-3.5 h-3.5" />
                  View Code
                </a>
              )}
            </div>
          </div>

          <div style={t(200)} className="space-y-5">
            <div
              className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
              style={{ borderRadius: "6px" }}
            >
              <h4 className="text-[11px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase mb-4">
                Project Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiTag className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      Category
                    </p>
                    <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                      {project.category}
                    </p>
                  </div>
                </div>
                {project.tag && (
                  <>
                    <div className="w-full h-px bg-gray-200 dark:bg-white/[0.04]" />
                    <div className="flex items-start gap-3">
                      <span className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                          Tag
                        </p>
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                          {project.tag}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {project.createdAt && (
                  <>
                    <div className="w-full h-px bg-gray-200 dark:bg-white/[0.04]" />
                    <div className="flex items-start gap-3">
                      <FiCalendar className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                          Published
                        </p>
                        <p className="text-[13px] font-bold text-gray-900 dark:text-white">
                          {formatDate(project.createdAt)}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {techStack.length > 0 && (
              <div
                className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
                style={{ borderRadius: "6px" }}
              >
                <h4 className="text-[11px] font-extrabold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white dark:bg-white/[0.03] text-gray-600 dark:text-gray-400 text-[10px] font-bold border border-gray-200 dark:border-white/[0.06] uppercase tracking-wider"
                      style={{ borderRadius: "3px" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div
              className="p-5 bg-orange-500/[0.04] border border-orange-500/20"
              style={{ borderRadius: "6px" }}
            >
              <p className="text-[12px] font-bold text-gray-700 dark:text-gray-300 mb-3">
                Interested in a similar project?
              </p>
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 text-[12px] font-bold text-orange-500 hover:text-orange-600 transition-colors duration-300"
              >
                Let's talk
                <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={t(700)}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-[2px] bg-orange-500 rounded-full" />
              <h3 className="text-[11px] font-extrabold text-orange-500 tracking-[0.15em] uppercase">
                Related Projects
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((rp) => {
                const rpImg = getImageUrl(rp.image);
                const rpStack = Array.isArray(rp.techStack) ? rp.techStack : [];
                return (
                  <Link
                    key={rp._id}
                    href={`/portfolio/${rp.slug}`}
                    className="group relative flex flex-col sm:flex-row overflow-hidden bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] hover:border-orange-500/40 dark:hover:border-orange-500/30 transition-all duration-500 hover:shadow-lg"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="relative w-full sm:w-[160px] flex-shrink-0 min-h-[140px] bg-gray-100 dark:bg-[#0a0a0d] overflow-hidden">
                      {rpImg ? (
                        <Image
                          src={rpImg}
                          alt={rp.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="160px"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-black text-gray-200 dark:text-white/[0.04]">
                            {rp.title?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center p-5">
                      <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-1.5">
                        {rp.category}
                      </span>
                      <h4 className="font-heading font-bold text-[14px] text-gray-900 dark:text-white leading-snug group-hover:text-orange-500 transition-colors duration-300 mb-2">
                        {rp.title}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {rpStack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 text-[9px] font-bold tracking-wider uppercase"
                            style={{ borderRadius: "3px" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}