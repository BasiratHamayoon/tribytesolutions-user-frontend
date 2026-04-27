"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiX, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Case Studies", href: "#portfolio" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Hire", href: "#hire" },
  { name: "Contact", href: "#contact" },
];

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-400 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[82%] max-w-[360px] z-[120] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-white/95 dark:bg-[#0c0c0f]/95 backdrop-blur-2xl border-l border-gray-200/50 dark:border-white/[0.06] flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
            <Link href="/" onClick={onClose} className="cursor-pointer">
              <Image
                src="/logo.png"
                alt="TriByte Solutions"
                width={130}
                height={38}
                className="object-contain h-9 w-auto"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-gray-100 dark:bg-white/[0.06] hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-4">
            <ul className="space-y-0.5">
              {navLinks.map((link, index) => (
                <li
                  key={link.name}
                  className={`transition-all duration-500 ${
                    isOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 100}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-4 rounded-md text-[14px] font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/[0.06] transition-all duration-300 group active:scale-[0.98] cursor-pointer"
                  >
                    <span>{link.name}</span>
                    <FiArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-orange-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-5 py-5 border-t border-gray-100 dark:border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Theme
              </span>
              <div className="scale-[0.85] cursor-pointer">
                <ThemeToggle />
              </div>
            </div>
            <Link
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[4px] bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-[13px] hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 active:scale-[0.97] cursor-pointer"
            >
              Start a Project
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}