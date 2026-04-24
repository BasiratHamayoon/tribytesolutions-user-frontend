"use client";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  FiUsers,
  FiCode,
  FiGlobe,
  FiCoffee,
  FiAward,
  FiGitBranch,
} from "react-icons/fi";

const stats = [
  {
    icon: FiUsers,
    value: 50,
    suffix: "+",
    label: "Happy Clients",
    description: "Worldwide",
  },
  {
    icon: FiCode,
    value: 150,
    suffix: "+",
    label: "Projects Completed",
    description: "And counting",
  },
  {
    icon: FiGlobe,
    value: 25,
    suffix: "+",
    label: "Countries Served",
    description: "Global reach",
  },
  {
    icon: FiCoffee,
    value: 100000,
    suffix: "+",
    label: "Cups of Coffee",
    description: "Fuel for innovation",
  },
  {
    icon: FiAward,
    value: 30,
    suffix: "+",
    label: "Awards Won",
    description: "Industry recognition",
  },
  {
    icon: FiGitBranch,
    value: 2000000,
    suffix: "+",
    label: "Lines of Code",
    description: "Clean & efficient",
  },
];

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-tribyte-black" />
      <div className="absolute inset-0 bg-mesh-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 100}>
              <div className="group text-center p-6 rounded-2xl border border-white/5 hover:border-tribyte-orange/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500">
                <stat.icon className="w-8 h-8 text-tribyte-orange mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2500}
                  />
                </div>
                <div className="text-sm font-semibold text-white/80 mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-white/40">{stat.description}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}