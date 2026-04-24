"use client";
import { useState } from "react";
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
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeading from "@/components/common/SectionHeading";
import { services } from "@/data/services";

const iconMap = {
  FiCode,
  FiSmartphone,
  FiCloud,
  FiShield,
  FiTrendingUp,
  FiDatabase,
  FiGlobe,
  FiCpu,
};

export default function ServicesSection() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30 dark:bg-tribyte-dark-gray/30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-tribyte-orange/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Services"
          title="Solutions That Drive Results"
          description="From concept to deployment, we offer comprehensive IT services tailored to your unique business needs and goals."
        />

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <ScrollReveal key={service.id} direction="up" delay={index * 80}>
                <GlowCard className="h-full">
                  <div
                    className="group relative h-full p-7 rounded-2xl bg-card border border-border hover:border-tribyte-orange/30 transition-all duration-500 card-3d overflow-hidden"
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                    />

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-tribyte-orange/10 flex items-center justify-center group-hover:bg-tribyte-orange group-hover:shadow-tribyte transition-all duration-500">
                        <IconComponent className="w-7 h-7 text-tribyte-orange group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-heading font-bold mb-3 group-hover:text-tribyte-orange transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 text-xs rounded-lg bg-tribyte-orange/5 text-tribyte-orange border border-tribyte-orange/10 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Learn More */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-tribyte-orange opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 cursor-pointer">
                      Learn More
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}