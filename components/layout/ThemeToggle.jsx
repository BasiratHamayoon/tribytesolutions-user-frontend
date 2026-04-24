"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2.5 rounded-xl bg-muted/50 hover:bg-muted border border-border/50 hover:border-tribyte-orange/30 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <FiSun
          className={`absolute inset-0 h-5 w-5 text-tribyte-orange transition-all duration-300 ${
            theme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <FiMoon
          className={`absolute inset-0 h-5 w-5 text-tribyte-orange transition-all duration-300 ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
      <span className="absolute -inset-1 rounded-xl bg-tribyte-orange/0 group-hover:bg-tribyte-orange/5 transition-colors duration-300" />
    </button>
  );
}