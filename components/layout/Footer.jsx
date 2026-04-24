"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
  FiHeart,
} from "react-icons/fi";

const footerLinks = {
  Company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#team" },
    { name: "Careers", href: "#careers" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ],
  Services: [
    { name: "Web Development", href: "#services" },
    { name: "Mobile Apps", href: "#services" },
    { name: "Cloud Solutions", href: "#services" },
    { name: "AI & ML", href: "#services" },
    { name: "DevOps", href: "#services" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Case Studies", href: "#portfolio" },
    { name: "Tech Blog", href: "#" },
    { name: "Open Source", href: "#" },
    { name: "API Reference", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR Compliance", href: "#" },
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-tribyte-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-tribyte-orange/5 rounded-full blur-3xl" />

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
                Stay <span className="text-tribyte-orange">Updated</span>
              </h3>
              <p className="text-white/60 max-w-md">
                Subscribe to our newsletter for the latest tech insights and company updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 text-white placeholder:text-white/40 w-full sm:w-80 transition-all duration-300"
              />
              <button className="px-8 py-3 rounded-xl bg-tribyte-orange text-white font-semibold hover:bg-tribyte-orange-dark transition-all duration-300 hover:shadow-tribyte whitespace-nowrap magnetic-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="TriByte Solutions"
                width={180}
                height={50}
                className="object-contain h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Transforming businesses through innovative software solutions. We build the future, one byte at a time.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contact@tribytesolutions.com"
                className="flex items-center gap-3 text-white/60 hover:text-tribyte-orange transition-colors group"
              >
                <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                contact@tribytesolutions.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-white/60 hover:text-tribyte-orange transition-colors group"
              >
                <FiPhone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <FiMapPin className="w-4 h-4 flex-shrink-0" />
                123 Tech Avenue, Silicon Valley, CA 94025
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-tribyte-orange/50 hover:bg-tribyte-orange/10 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white/60 group-hover:text-tribyte-orange transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-tribyte-orange transition-colors duration-300 text-sm animated-underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} TriByte Solutions. All rights reserved. Made with{" "}
              <FiHeart className="inline w-3 h-3 text-tribyte-orange" /> in Silicon Valley.
            </p>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-tribyte-orange/50 hover:bg-tribyte-orange/10 transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <FiArrowUp className="w-4 h-4 text-white/60 group-hover:text-tribyte-orange transition-all duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}