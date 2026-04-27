"use client";
import { useState, useEffect, useRef } from "react";
import {
  FiCode,
  FiSmartphone,
  FiCloud,
  FiShield,
  FiTrendingUp,
  FiDatabase,
  FiGlobe,
  FiCpu,
  FiArrowRight,
} from "react-icons/fi";

const services = [
  {
    icon: FiCode,
    title: "Web Development",
    description: "High-performance websites and web applications built with modern frameworks.",
    features: ["React / Next.js", "Full-stack", "E-commerce"],
  },
  {
    icon: FiSmartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile apps with seamless user experiences.",
    features: ["iOS / Android", "React Native", "Flutter"],
  },
  {
    icon: FiCloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure on AWS, Azure, and Google Cloud Platform.",
    features: ["AWS / GCP", "Serverless", "Migration"],
  },
  {
    icon: FiShield,
    title: "Cybersecurity",
    description: "Protect your digital assets with enterprise-grade security solutions.",
    features: ["Audit", "Compliance", "Monitoring"],
  },
  {
    icon: FiTrendingUp,
    title: "AI & Machine Learning",
    description: "Intelligent solutions powered by cutting-edge machine learning models.",
    features: ["NLP", "Computer Vision", "Predictive"],
  },
  {
    icon: FiDatabase,
    title: "Data Engineering",
    description: "End-to-end data pipelines and analytics for data-driven decisions.",
    features: ["ETL", "Warehousing", "Analytics"],
  },
  {
    icon: FiGlobe,
    title: "Digital Transformation",
    description: "Modernize legacy systems with cutting-edge digital strategies.",
    features: ["Strategy", "Migration", "Automation"],
  },
  {
    icon: FiCpu,
    title: "DevOps & CI/CD",
    description: "Automated pipelines and infrastructure for faster, reliable deployments.",
    features: ["Docker", "Kubernetes", "Terraform"],
  },
];

export default function ServicesOverview() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
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
      id="services-overview"
      className="relative w-full bg-gray-50 dark:bg-[#0c0c0f] py-20 lg:py-28 overflow-hidden"
    >
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                Our expertise
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>

          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
              Comprehensive{" "}
              <span className="relative inline-block text-orange-500">
                Solutions
                <svg className="absolute -bottom-1.5 left-0 w-full" height="5" viewBox="0 0 160 5" fill="none">
                  <path d="M1 3.5C30 1 60 1 80 2.5C100 4 130 2 159 3.5" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeDasharray="160" style={{ strokeDashoffset: inView ? 0 : 160, transition: "stroke-dashoffset 1.2s ease-out 0.6s" }} />
                </svg>
              </span>
            </h2>
          </div>

          <div style={t(300)}>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
              End-to-end services designed to cover every aspect of your digital needs.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} style={t(index * 80 + 400)}>
                <div className="group relative p-5 h-full bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 transition-all duration-400 cursor-default" style={{ borderRadius: "4px" }}>
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Number */}
                  <span className="absolute top-4 right-4 text-[9px] font-bold text-gray-200 dark:text-white/[0.06] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all duration-400"
                    style={{ borderRadius: "4px" }}
                  >
                    <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-400" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-[14px] text-gray-900 dark:text-white mb-2 tracking-[-0.01em] group-hover:text-orange-500 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-[1.6] mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 text-[9px] font-bold bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        style={{ borderRadius: "3px" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}