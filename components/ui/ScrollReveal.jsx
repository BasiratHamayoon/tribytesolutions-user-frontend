"use client";
import { useInView } from "@/hooks/useInView";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const directionClasses = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    scale: "scale-90",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isInView
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : `opacity-0 ${directionClasses[direction]}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}