"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { FiMenu, FiArrowRight, FiChevronDown } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Careers", href: "#careers" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div className="absolute -inset-2 bg-tribyte-orange/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src="/logo.png"
                  alt="TriByte Solutions"
                  width={160}
                  height={45}
                  className="relative object-contain h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    activeSection === link.href.replace("#", "")
                      ? "text-tribyte-orange"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-tribyte-orange rounded-full transition-all duration-300 ${
                      activeSection === link.href.replace("#", "")
                        ? "w-6"
                        : "w-0 group-hover:w-4"
                    }`}
                  />
                  {/* Hover background */}
                  <span className="absolute inset-0 rounded-lg bg-tribyte-orange/0 group-hover:bg-tribyte-orange/5 transition-colors duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* CTA Button - Desktop */}
              <Link
                href="#contact"
                className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-tribyte-orange text-white text-sm font-semibold hover:bg-tribyte-orange-dark transition-all duration-300 hover:shadow-tribyte group magnetic-btn"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl bg-muted/50 hover:bg-muted border border-border/50 hover:border-tribyte-orange/30 transition-all duration-300"
              >
                <FiMenu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/30">
          <div
            className="h-full bg-gradient-to-r from-tribyte-orange to-tribyte-orange-light transition-all duration-150"
            style={{
              width: `${
                typeof window !== "undefined"
                  ? (window.scrollY /
                      (document.documentElement.scrollHeight -
                        window.innerHeight)) *
                    100
                  : 0
              }%`,
            }}
            id="scroll-progress"
          />
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Progress bar updater */}
      <ScrollProgressUpdater />
    </>
  );
}

function ScrollProgressUpdater() {
  useEffect(() => {
    const updateProgress = () => {
      const bar = document.getElementById("scroll-progress");
      if (bar) {
        const progress =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        bar.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return null;
}