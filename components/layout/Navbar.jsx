"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { FiMenu } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/", anchor: null },
  { name: "About us", href: "/about", anchor: null },
  { name: "Services", href: "/services", anchor: null },
  { name: "Portfolio", href: "/portfolio", anchor: null },
  { name: "Careers", href: "/careers", anchor: null },
  { name: "Team", href: "/team", anchor: null },
];

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const isServicesPage = pathname === "/services";
  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";
  const isCareersPage = pathname === "/careers";
  const isTeamPage = pathname === "/team";
  const isPortfolioPage = pathname === "/portfolio";


  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const anchors = navLinks
        .filter((l) => l.anchor)
        .map((l) => l.anchor);
      const scrollPosition = window.scrollY + 100;

      for (const section of [...anchors].reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }

      if (window.scrollY < 80) setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isLinkActive = (link) => {
    if (isServicesPage && link.href === "/services") return true;
    if (isAboutPage && link.href === "/about") return true;
    if (isCareersPage && link.href === "/careers") return true;
    if (isTeamPage && link.href === "/team") return true;
    if (isPortfolioPage && link.href === "/portfolio") return true;
    if (isHomePage) {
      if (link.href === "/" && activeSection === "home") return true;
      if (link.anchor && activeSection === link.anchor) return true;
    }
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-out ${
          isScrolled ? "py-1.5" : "py-3"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <nav
            className={`flex items-center justify-between px-4 sm:px-6 transition-all duration-700 ease-out rounded-xl ${
              isScrolled
                ? "py-2 bg-white/95 dark:bg-[#0c0c0f]/90 backdrop-blur-2xl border border-gray-100 dark:border-white/[0.07] shadow-lg shadow-black/[0.03] dark:shadow-black/30"
                : "py-2.5 bg-white/80 dark:bg-[#0c0c0f]/70 backdrop-blur-xl border border-white/60 dark:border-white/[0.04]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group relative z-10 shrink-0 cursor-pointer"
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <Image
                  src="/logo.png"
                  alt="TriByte Solutions"
                  width={170}
                  height={48}
                  className="relative object-contain h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-[13px] font-semibold tracking-[-0.01em] transition-all duration-300 rounded-md cursor-pointer group ${
                      active
                        ? "text-orange-500"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-orange-500 rounded-full transition-all duration-300 ease-out ${
                        active
                          ? "w-4 opacity-100"
                          : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-40"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <div className="scale-[0.85] cursor-pointer">
                <ThemeToggle />
              </div>

              <Link
                href="/#contact"
                className="hidden md:flex items-center px-4 py-1.5 rounded-[4px] bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[12px] font-bold transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-100 hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
              >
                Contact us
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 rounded-md bg-white dark:bg-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.1] border border-gray-100 dark:border-white/[0.08] transition-all duration-300 cursor-pointer"
              >
                <FiMenu className="w-4 h-4 text-gray-700 dark:text-white" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}