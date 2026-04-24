"use client";
import { useState, useEffect } from "react";
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
} from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/common/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => setActiveIndex(index);
  const goPrev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-muted/30 dark:bg-tribyte-dark-gray/30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 bg-tribyte-orange/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it. Hear from the businesses we've helped transform."
        />

        {/* Main Testimonial */}
        <ScrollReveal direction="up">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-card border border-border">
              {/* Quote icon - using RiDoubleQuotesL from react-icons/ri */}
              <RiDoubleQuotesL className="absolute top-6 left-6 w-12 h-12 text-tribyte-orange/10" />

              {/* Content */}
              <div className="relative text-center">
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-tribyte-orange fill-tribyte-orange"
                      style={{ fill: "#FF6B00" }}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium leading-relaxed mb-8 text-foreground">
                  &ldquo;{testimonials[activeIndex].content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-tribyte-orange/10 flex items-center justify-center text-xl font-bold text-tribyte-orange mb-3 border-2 border-tribyte-orange/20">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <h4 className="text-lg font-heading font-bold">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-muted/50 hover:bg-tribyte-orange/10 border border-border hover:border-tribyte-orange/30 transition-all duration-300 hidden sm:block"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-muted/50 hover:bg-tribyte-orange/10 border border-border hover:border-tribyte-orange/30 transition-all duration-300 hidden sm:block"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-8 h-2.5 bg-tribyte-orange"
                      : "w-2.5 h-2.5 bg-border hover:bg-tribyte-orange/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Small testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.id}
              direction="up"
              delay={index * 100}
            >
              <div
                className={`group p-6 rounded-2xl bg-card border transition-all duration-500 cursor-pointer card-3d ${
                  activeIndex === index
                    ? "border-tribyte-orange/50 shadow-tribyte"
                    : "border-border hover:border-tribyte-orange/20"
                }`}
                onClick={() => goTo(index)}
              >
                {/* Mini quote icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-3 h-3 text-tribyte-orange"
                        style={{ fill: "#FF6B00" }}
                      />
                    ))}
                  </div>
                  <FiMessageSquare className="w-4 h-4 text-tribyte-orange/30" />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tribyte-orange/10 flex items-center justify-center text-xs font-bold text-tribyte-orange flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}