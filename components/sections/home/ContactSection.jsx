"use client";
import { useState, useEffect, useRef } from "react";
import {
  FiMail, FiPhone, FiMapPin, FiSend,
  FiClock, FiArrowRight, FiX, FiCheck,
} from "react-icons/fi";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useContact } from "@/hooks/useContact";

const contactInfo = [
  {
    icon: FiMail,
    title: "Email Us",
    value: "info@tribyte.org",
    sub: "We'll respond within 24 hours",
  },
  {
    icon: FiPhone,
    title: "Call Us",
    value: "+92 324 987 5634",
    sub: "Mon–Fri, 9am to 5pm",
  },
  {
    icon: FiMapPin,
    title: "Visit Us",
    value: "TribyteSolution Office no 3, IT Technology Park",
    sub: "SBBWU, Larama, Peshawar",
  },
  {
    icon: FiClock,
    title: "Business Hours",
    value: "Monday – Friday",
    sub: "9:00 AM – 5:00 PM PKT",
  },
];

function SuccessModal({ isOpen, onClose, name }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 50);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: show ? 1 : 0 }}
      />
      <div
        className="relative w-full max-w-md overflow-hidden transition-all duration-500"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          borderRadius: "6px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-orange-500 h-1.5 w-full" />
        <div className="bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/[0.08] border-t-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
            style={{ borderRadius: "4px" }}
          >
            <FiX className="w-4 h-4" />
          </button>
          <div className="px-8 pt-10 pb-8 text-center">
            <div className="relative mx-auto mb-6">
              <div
                className="w-20 h-20 mx-auto bg-orange-500/10 dark:bg-orange-500/15 flex items-center justify-center"
                style={{ borderRadius: "50%" }}
              >
                <div
                  className="w-14 h-14 bg-orange-500 flex items-center justify-center"
                  style={{ borderRadius: "50%" }}
                >
                  <FiCheck className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white tracking-[-0.02em] mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Thank you{name ? `, ${name}` : ""}! Your message has been received. Our team
              will get back to you within{" "}
              <span className="text-orange-500 font-semibold">24 hours</span>.
            </p>
            <div
              className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] px-5 py-4 mb-6"
              style={{ borderRadius: "4px" }}
            >
              <div className="flex items-center gap-3 text-left">
                <div
                  className="w-9 h-9 bg-orange-500/10 flex items-center justify-center flex-shrink-0"
                  style={{ borderRadius: "4px" }}
                >
                  <FiMail className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">
                    Confirmation sent to
                  </p>
                  <p className="text-[12px] font-bold text-gray-900 dark:text-white">
                    Your email address
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-[12px] transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-[0.98] cursor-pointer"
                style={{ borderRadius: "4px" }}
              >
                Got it, thanks!
              </button>
              <a
                href="mailto:info@tribyte.org"
                className="px-5 py-2.5 border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 font-bold text-[12px] transition-all duration-300 hover:border-orange-500 hover:text-orange-500 active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                style={{ borderRadius: "4px" }}
              >
                <FiMail className="w-3 h-3" />
                Email Us
              </a>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/[0.06] px-8 py-3 text-center">
            <p className="text-[10px] text-gray-400 dark:text-gray-600">
              <span className="text-orange-500 font-bold">TribyteSolutions</span>{" "}
              — Building digital excellence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const { submit } = useContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [focused, setFocused] = useState("");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submit({
        name: formData.name,
        email: formData.email,
        subject: formData.service
          ? `${formData.service}${formData.company ? ` - ${formData.company}` : ""}`
          : formData.company || "General Inquiry",
        message: formData.message,
        company: formData.company,
        service: formData.service,
      });

      setSubmittedName(formData.name);
      setShowModal(true);
      setFormData({ name: "", email: "", company: "", service: "", message: "" });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const t = (delay) => ({
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
  });

  const tLeft = (delay) => ({
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-30px)",
  });

  const tRight = (delay) => ({
    transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(30px)",
  });

  const inputBase =
    "w-full px-4 py-2.5 bg-gray-50 dark:bg-white/[0.03] text-[13px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-300 border";

  const inputClass = (name) =>
    `${inputBase} ${
      focused === name
        ? "border-orange-500 ring-2 ring-orange-500/10 bg-white dark:bg-white/[0.06]"
        : "border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12]"
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-white dark:bg-[#09090b] py-20 lg:py-28 overflow-hidden"
    >
      <ParticleBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div style={t(0)}>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                Get in touch
              </span>
              <span className="w-6 h-[2px] bg-orange-500 rounded-full" />
            </div>
          </div>
          <div style={t(150)}>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.8rem] text-gray-900 dark:text-white tracking-[-0.03em] leading-tight">
              Let&apos;s Build Something{" "}
              <span className="relative inline-block text-orange-500">
                Great
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  height="5"
                  viewBox="0 0 100 5"
                  fill="none"
                >
                  <path
                    d="M1 3.5C20 1 40 1 50 2.5C60 4 80 2 99 3.5"
                    stroke="#ff6b00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="100"
                    style={{
                      strokeDashoffset: inView ? 0 : 100,
                      transition: "stroke-dashoffset 1.2s ease-out 0.6s",
                    }}
                  />
                </svg>
              </span>
            </h2>
          </div>
          <div style={t(300)}>
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Ready to transform your business? Tell us about your project and
              we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {contactInfo.map((info, i) => (
              <div key={i} style={tLeft(i * 100 + 300)}>
                <div className="group flex items-start gap-4 p-4 border border-gray-100 dark:border-white/[0.06] hover:border-orange-500/30 bg-gray-50/50 dark:bg-white/[0.02] hover:bg-orange-50/50 dark:hover:bg-white/[0.04] transition-all duration-400 cursor-default">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div
                    className="w-10 h-10 bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-all duration-400"
                    style={{ borderRadius: "4px" }}
                  >
                    <info.icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-400" />
                  </div>
                  <div className="relative">
                    <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-0.5">
                      {info.title}
                    </p>
                    <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-tight">
                      {info.value}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                      {info.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div style={tLeft(700)}>
              <div
                className="mt-1 h-40 border border-gray-100 dark:border-white/[0.06] relative bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center overflow-hidden group cursor-default hover:border-orange-500/20 transition-all duration-400"
                style={{ borderRadius: "4px" }}
              >
                <div
                  className="absolute inset-0 opacity-[0.04] dark:opacity-[0.04]"
                  style={{
                    backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, #ff6b00, transparent 70%)",
                  }}
                />
                <div className="relative text-center">
                  <div
                    className="w-10 h-10 bg-orange-500/10 group-hover:bg-orange-500 flex items-center justify-center mx-auto mb-2 transition-all duration-400"
                    style={{ borderRadius: "4px" }}
                  >
                    <FiMapPin className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-400" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                    Peshawar, Pakistan
                  </p>
                  <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 uppercase tracking-wider">
                    IT Technology Park
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3" style={tRight(400)}>
            <div
              className="p-7 lg:p-9 bg-white dark:bg-[#111114] border border-gray-100 dark:border-white/[0.06] shadow-xl shadow-black/[0.03] dark:shadow-black/30"
              style={{ borderRadius: "4px" }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
                    <span className="text-[9px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                      Start a project
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white tracking-[-0.02em]">
                    Tell us about your project
                  </h3>
                </div>

                {submitError && (
                  <div
                    className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-[12px]"
                    style={{ borderRadius: "4px" }}
                  >
                    <FiX className="w-3.5 h-3.5 flex-shrink-0" />
                    {submitError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.18em] mb-2">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      required
                      className={inputClass("name")}
                      style={{ borderRadius: "4px" }}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.18em] mb-2">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      required
                      className={inputClass("email")}
                      style={{ borderRadius: "4px" }}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.18em] mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused("")}
                      className={inputClass("company")}
                      style={{ borderRadius: "4px" }}
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.18em] mb-2">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused("")}
                      className={inputClass("service")}
                      style={{ borderRadius: "4px" }}
                    >
                      <option value="">Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="cloud">Cloud Solutions</option>
                      <option value="ai">AI & ML Solutions</option>
                      <option value="devops">DevOps Services</option>
                      <option value="security">Cybersecurity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.18em] mb-2">
                    Project Details <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    required
                    rows={5}
                    className={`${inputClass("message")} resize-none`}
                    style={{ borderRadius: "4px" }}
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-[13px] transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-100 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ borderRadius: "4px" }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="3"
                          strokeLinecap="round" className="opacity-20"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      Send Message
                      <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-400 dark:text-gray-600">
                  By submitting, you agree to our{" "}
                  <span className="text-orange-500 cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                  . We never share your data.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        name={submittedName}
      />
    </section>
  );
}