"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiX, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Auto close on route change
  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-background border-l border-border z-50 transition-transform duration-500 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" onClick={onClose}>
              <Image
                src="/logo.png"
                alt="TriByte Solutions"
                width={120}
                height={34}
                className="object-contain h-8 w-auto"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-muted hover:bg-tribyte-orange/10 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-6">
            <ul className="space-y-1">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={link.name}
                    className={`transition-all duration-300 ${
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                    style={{ transitionDelay: `${index * 50 + 100}ms` }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 group ${
                        isActive
                          ? "bg-tribyte-orange text-white"
                          : "text-foreground hover:text-tribyte-orange hover:bg-tribyte-orange/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      <FiArrowRight
                        className={`w-4 h-4 transition-all duration-300 ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-tribyte-orange text-white font-semibold hover:bg-tribyte-orange-dark transition-all duration-300"
            >
              Get Started
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}