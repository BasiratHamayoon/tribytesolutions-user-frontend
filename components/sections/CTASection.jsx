"use client";
import Link from "next/link";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-tribyte-black" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Animated orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-tribyte-orange/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-tribyte-orange/5 rounded-full blur-3xl animate-float-slow" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase rounded-full bg-tribyte-orange/10 text-tribyte-orange border border-tribyte-orange/20">
            Ready to Start?
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Let&apos;s Transform Your
            <br />
            <span className="text-tribyte-orange text-glow">
              Business Together
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Join 50+ companies that have already accelerated their digital
            transformation with TriByte Solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-tribyte-orange text-white font-semibold text-lg hover:bg-tribyte-orange-dark transition-all duration-300 hover:shadow-tribyte-xl magnetic-btn"
            >
              Start Your Project
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+1234567890"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg hover:border-tribyte-orange/50 hover:bg-white/5 transition-all duration-300 magnetic-btn"
            >
              <FiPhone className="w-5 h-5 text-tribyte-orange" />
              Schedule a Call
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}