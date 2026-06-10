"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  FiArrowLeft, FiUser, FiMail, FiPhone,
  FiFileText, FiUpload, FiMapPin, FiClock,
  FiBriefcase, FiCheckCircle, FiAlertCircle,
  FiSend, FiLoader,
} from "react-icons/fi";
import { jobsApi } from "@/lib/api/jobs";

function cleanSlug(job) {
  const raw = job.slug || job.title || String(job._id);
  return raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function JobApplyPage({ job }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg", "image/jpg", "image/png",
    ];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC, DOCX, or image files allowed" }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: "File must be under 10MB" }));
      return;
    }
    setErrors((prev) => ({ ...prev, resume: null }));
    setResumeFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const fd = new FormData();
      fd.append("name", formData.name.trim());
      fd.append("email", formData.email.trim());
      fd.append("phone", formData.phone.trim());
      fd.append("coverLetter", formData.coverLetter.trim());
      if (resumeFile) fd.append("resume", resumeFile);

      await jobsApi.apply(job._id, fd);
      setStatus("success");
    } catch (err) {
      setErrors({ submit: err.message });
      setStatus("error");
    }
  };

  const deadline = job.applicationDeadline
    ? new Date(job.applicationDeadline).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : null;

  const isExpired = job.applicationDeadline && new Date() > new Date(job.applicationDeadline);

  if (status === "success") {
    return (
      <div className="relative min-h-screen bg-white dark:bg-[#09090b] flex items-center justify-center px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
          />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white tracking-[-0.03em] mb-3">
            Application Submitted!
          </h1>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
            Thank you for applying for{" "}
            <span className="font-bold text-gray-900 dark:text-white">{job.title}</span>.
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-8">
            We've sent a confirmation to your email. Our team will review your application and get back to you within 5–7 business days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold transition-all duration-300 hover:-translate-y-[1px]"
              style={{ borderRadius: "4px" }}
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              Back to Careers
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-[13px] font-bold hover:border-orange-500/40 hover:text-orange-500 transition-all duration-300"
              style={{ borderRadius: "4px" }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#09090b]">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #ff6b00, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 lg:pt-32 pb-20">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-[12px] font-bold text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300 mb-8"
        >
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back to Careers
        </Link>

        <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-14">
          <div className="space-y-5">
            <div
              className="p-6 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] relative overflow-hidden"
              style={{ borderRadius: "8px" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
                <span className="text-[9px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                  Position
                </span>
              </div>

              <h1 className="font-heading font-bold text-xl sm:text-2xl text-gray-900 dark:text-white tracking-[-0.03em] leading-tight mb-2">
                {job.title}
              </h1>
              <p className="text-[12px] font-bold text-orange-500 mb-5">{job.department}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <FiMapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span className="text-[12px] text-gray-600 dark:text-gray-400">{job.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiClock className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span className="text-[12px] text-gray-600 dark:text-gray-400">{job.type}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiBriefcase className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span className="text-[12px] text-gray-600 dark:text-gray-400">{job.experience}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-orange-500 text-[13px] flex-shrink-0">💰</span>
                    <span className="text-[12px] text-gray-600 dark:text-gray-400">{job.salary}</span>
                  </div>
                )}
                {deadline && (
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[13px] flex-shrink-0 ${isExpired ? "text-red-500" : "text-orange-500"}`}>📅</span>
                    <span className={`text-[12px] ${isExpired ? "text-red-500 font-bold" : "text-gray-600 dark:text-gray-400"}`}>
                      {isExpired ? "Deadline passed" : `Apply by ${deadline}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {job.description && (
              <div
                className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
                style={{ borderRadius: "6px" }}
              >
                <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">About the Role</p>
                <p className="text-[12px] text-gray-600 dark:text-gray-400 leading-[1.7]">
                  {job.description}
                </p>
              </div>
            )}

            {job.skills?.length > 0 && (
              <div
                className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
                style={{ borderRadius: "6px" }}
              >
                <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Skills Required</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-orange-500/[0.07] text-orange-500 text-[10px] font-bold border border-orange-500/20"
                      style={{ borderRadius: "3px" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {job.requirements?.length > 0 && (
              <div
                className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
                style={{ borderRadius: "6px" }}
              >
                <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Requirements</p>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                      <span className="text-[12px] text-gray-600 dark:text-gray-400 leading-[1.6]">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits?.length > 0 && (
              <div
                className="p-5 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06]"
                style={{ borderRadius: "6px" }}
              >
                <p className="text-[9px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">Benefits</p>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FiCheckCircle className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-[12px] text-gray-600 dark:text-gray-400 leading-[1.6]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <div
              className="p-7 lg:p-9 bg-gray-50 dark:bg-[#111114] border border-gray-200 dark:border-white/[0.06] relative overflow-hidden"
              style={{ borderRadius: "8px" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
                  <span className="text-[9px] font-extrabold text-orange-500 tracking-[0.2em] uppercase">
                    Apply Now
                  </span>
                </div>
                <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white tracking-[-0.02em]">
                  Submit Your Application
                </h2>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
                  Fill in your details below. Fields marked * are required.
                </p>
              </div>

              {isExpired && (
                <div
                  className="flex items-center gap-2.5 p-4 bg-red-50 dark:bg-red-500/[0.06] border border-red-200 dark:border-red-500/20 mb-6"
                  style={{ borderRadius: "6px" }}
                >
                  <FiAlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-[12px] font-bold text-red-600 dark:text-red-400">
                    The application deadline for this position has passed.
                  </p>
                </div>
              )}

              {errors.submit && (
                <div
                  className="flex items-center gap-2.5 p-4 bg-red-50 dark:bg-red-500/[0.06] border border-red-200 dark:border-red-500/20 mb-6"
                  style={{ borderRadius: "6px" }}
                >
                  <FiAlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-[12px] font-bold text-red-600 dark:text-red-400">{errors.submit}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      <FiUser className="w-3.5 h-3.5 text-orange-500" />
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={isExpired || status === "loading"}
                      className={`w-full h-10 px-3.5 text-[13px] bg-white dark:bg-white/[0.03] border rounded-[4px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 ${
                        errors.name
                          ? "border-red-400 dark:border-red-500/50"
                          : "border-gray-200 dark:border-white/[0.08]"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      <FiMail className="w-3.5 h-3.5 text-orange-500" />
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      disabled={isExpired || status === "loading"}
                      className={`w-full h-10 px-3.5 text-[13px] bg-white dark:bg-white/[0.03] border rounded-[4px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 ${
                        errors.email
                          ? "border-red-400 dark:border-red-500/50"
                          : "border-gray-200 dark:border-white/[0.08]"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    <FiPhone className="w-3.5 h-3.5 text-orange-500" />
                    Phone Number
                    <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(Optional)</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 890"
                    disabled={isExpired || status === "loading"}
                    className="w-full h-10 px-3.5 text-[13px] bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-[4px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    <FiUpload className="w-3.5 h-3.5 text-orange-500" />
                    Resume / CV
                    <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(Optional — PDF, DOC, DOCX)</span>
                  </label>

                  {resumeFile ? (
                    <div
                      className="flex items-center justify-between p-3.5 bg-orange-500/[0.05] border border-orange-500/20"
                      style={{ borderRadius: "4px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        <FiFileText className="w-4 h-4 text-orange-500" />
                        <div>
                          <p className="text-[12px] font-bold text-gray-900 dark:text-white truncate max-w-[220px]">
                            {resumeFile.name}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                      onClick={() => !isExpired && fileInputRef.current?.click()}
                      className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 ${
                        isDragging
                          ? "border-orange-500 bg-orange-500/[0.04] scale-[1.01]"
                          : "border-gray-200 dark:border-white/[0.08] hover:border-orange-500/40 hover:bg-orange-500/[0.02]"
                      } ${isExpired ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={{ borderRadius: "4px" }}
                    >
                      <FiUpload className={`w-5 h-5 mx-auto mb-2 transition-colors duration-300 ${isDragging ? "text-orange-500" : "text-gray-400"}`} />
                      <p className="text-[12px] font-bold text-gray-700 dark:text-gray-300">
                        {isDragging ? "Drop your file here" : "Click or drag to upload resume"}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                    className="hidden"
                    disabled={isExpired}
                  />
                  {errors.resume && (
                    <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.resume}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    <FiFileText className="w-3.5 h-3.5 text-orange-500" />
                    Cover Letter
                    <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(Optional)</span>
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you're a great fit for this role, your relevant experience, and what excites you about joining TriByte Solutions..."
                    rows={6}
                    disabled={isExpired || status === "loading"}
                    className="w-full px-3.5 py-3 text-[13px] bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-[4px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all duration-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 resize-none disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed"
                  />
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    {formData.coverLetter.length} characters
                  </p>
                </div>

                <div
                  className="p-4 bg-orange-500/[0.04] border border-orange-500/15"
                  style={{ borderRadius: "4px" }}
                >
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-[1.6]">
                    By submitting this application, you confirm that all information provided is accurate.
                    A confirmation email will be sent to your email address upon successful submission.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isExpired || status === "loading"}
                  className="w-full flex items-center justify-center gap-2.5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-lg shadow-orange-500/20"
                  style={{ borderRadius: "4px" }}
                >
                  {status === "loading" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}