"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
  FiHeart,
  FiGithub,
} from "react-icons/fi";

const footerLinks = {
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/#contact" },
  ],
  Services: [
    { name: "Web Development", href: "/services" },
    { name: "Mobile Apps", href: "/services" },
    { name: "Cloud Solutions", href: "/services" },
    { name: "AI & ML", href: "/services" },
  ],
  Resources: [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Get in Touch", href: "/#contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Security", href: "#" },
  ],
};

const socialLinks = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  const [inView, setInView] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = (delay) => ({
    transition: `all 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
  });

  return (
    <footer
      ref={footerRef}
      className="relative bg-gray-950 dark:bg-[#06060a] text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #ff6b00, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="relative max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-4" style={t(100)}>
            <Link href="/" className="inline-block cursor-pointer">
              <Image
                src="/logo.png"
                alt="TriByte Solutions"
                width={140}
                height={40}
                className="object-contain h-8 w-auto brightness-0 invert"
              />
            </Link>

            <p className="text-[11px] text-white/35 max-w-[220px] leading-[1.65]">
              Transforming businesses through innovative software solutions. One
              byte at a time.
            </p>

            <div className="space-y-2">
              <a
                href="mailto:info@tribyte.org"
                className="flex items-center gap-2 text-[11px] text-white/35 hover:text-orange-500 transition-colors duration-300 group cursor-pointer"
              >
                <FiMail className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                info@tribyte.org
              </a>
              <a
                href="tel:+923249875634"
                className="flex items-center gap-2 text-[11px] text-white/35 hover:text-orange-500 transition-colors duration-300 group cursor-pointer"
              >
                <FiPhone className="w-3 h-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                +92 324 987 5634
              </a>
              <div className="flex items-start gap-2 text-[11px] text-white/35">
                <FiMapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>
                  Office no 3, IT Technology Park,<br />
                  SBBWU, Larama, Peshawar
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300 group cursor-pointer active:scale-90"
                  style={{ borderRadius: "4px" }}
                  aria-label={social.label}
                >
                  <social.icon className="w-3 h-3 text-white/35 group-hover:text-orange-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links], colIndex) => (
            <div key={category} style={t(colIndex * 80 + 200)}>
              <h4 className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/50 mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-[11px] text-white/30 hover:text-orange-500 transition-all duration-300 cursor-pointer"
                    >
                      <span className="w-0 h-px bg-orange-500 group-hover:w-2 transition-all duration-300 flex-shrink-0" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-4">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-2"
            style={t(500)}
          >
            <p className="text-white/20 text-[10px] text-center sm:text-left">
              © {new Date().getFullYear()} TriByte Solutions. All rights
              reserved. Made with{" "}
              <FiHeart className="inline w-2 h-2 text-orange-500" /> in
              Peshawar, Pakistan.
            </p>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3">
                {["Privacy", "Terms", "Cookies"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-[9px] text-white/20 hover:text-orange-500 transition-colors duration-300 cursor-pointer font-semibold uppercase tracking-wider"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <button
                onClick={scrollToTop}
                className="w-7 h-7 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300 group cursor-pointer active:scale-90"
                style={{ borderRadius: "4px" }}
                aria-label="Scroll to top"
              >
                <FiArrowUp className="w-3 h-3 text-white/35 group-hover:text-orange-500 transition-all duration-300 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}