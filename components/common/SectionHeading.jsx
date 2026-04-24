"use client";
import { useInView } from "@/hooks/useInView";

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
}) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"} ${
        isInView ? "animate-slide-up" : "opacity-0"
      }`}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider uppercase rounded-full bg-tribyte-orange/10 text-tribyte-orange border border-tribyte-orange/20">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
        <span className="text-foreground">{title.split(" ").slice(0, -2).join(" ")} </span>
        <span className="text-tribyte-orange">
          {title.split(" ").slice(-2).join(" ")}
        </span>
      </h2>
      {description && (
        <p
          className={`text-muted-foreground text-lg max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}