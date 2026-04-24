"use client";
import { useState } from "react";
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiDollarSign,
  FiArrowRight,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiZap,
  FiHeart,
  FiBookOpen,
  FiMonitor,
  FiX,
} from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/common/SectionHeading";
import { jobs } from "@/data/jobs";

const departments = ["All", ...new Set(jobs.map((j) => j.department))];

export default function CareersSection() {
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment =
      activeDepartment === "All" || job.department === activeDepartment;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <section id="careers" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-muted/30 dark:bg-tribyte-dark-gray/30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Careers"
          title="Join Our Amazing Team"
          description="Be part of a dynamic team that's shaping the future of technology. Explore exciting career opportunities at TriByte Solutions."
        />

        {/* Benefits Banner */}
        <ScrollReveal direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: FiHeart, label: "Health & Wellness", desc: "Full coverage" },
              { icon: FiMonitor, label: "Remote Friendly", desc: "Work anywhere" },
              { icon: FiBookOpen, label: "Learning Budget", desc: "$2K/year" },
              { icon: FiZap, label: "Growth Path", desc: "Clear career track" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="group p-5 rounded-2xl bg-card border border-border hover:border-tribyte-orange/30 transition-all duration-300 text-center card-3d"
              >
                <benefit.icon className="w-8 h-8 text-tribyte-orange mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-bold mb-1">{benefit.label}</h4>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Search and Filters */}
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeDepartment === dept
                      ? "bg-tribyte-orange text-white"
                      : "bg-card border border-border text-muted-foreground hover:border-tribyte-orange/30"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing{" "}
          <span className="text-tribyte-orange font-semibold">
            {filteredJobs.length}
          </span>{" "}
          open position{filteredJobs.length !== 1 ? "s" : ""}
        </p>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <ScrollReveal key={job.id} direction="up" delay={index * 80}>
              <div
                className={`rounded-2xl bg-card border transition-all duration-500 overflow-hidden ${
                  expandedJob === job.id
                    ? "border-tribyte-orange/50 shadow-tribyte"
                    : "border-border hover:border-tribyte-orange/20"
                }`}
              >
                {/* Job Header */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() =>
                    setExpandedJob(expandedJob === job.id ? null : job.id)
                  }
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-heading font-bold group-hover:text-tribyte-orange">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="px-2.5 py-0.5 text-xs rounded-full bg-red-500/10 text-red-500 font-semibold border border-red-500/20 animate-pulse">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <FiBriefcase className="w-3.5 h-3.5" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiMapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiClock className="w-3.5 h-3.5" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiDollarSign className="w-3.5 h-3.5" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {job.posted}
                      </span>
                      {expandedJob === job.id ? (
                        <FiChevronUp className="w-5 h-5 text-tribyte-orange" />
                      ) : (
                        <FiChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    expandedJob === job.id
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-border pt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-muted-foreground mb-6">
                          {job.description}
                        </p>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-tribyte-orange mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-tribyte-orange mt-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-tribyte-orange mb-3">
                          Benefits & Perks
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {job.benefits.map((benefit) => (
                            <span
                              key={benefit}
                              className="px-3 py-1.5 text-sm rounded-lg bg-tribyte-orange/5 text-tribyte-orange border border-tribyte-orange/10 font-medium"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowApplicationForm(job.id);
                          }}
                          className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-tribyte-orange text-white font-semibold hover:bg-tribyte-orange-dark transition-all duration-300 hover:shadow-tribyte magnetic-btn"
                        >
                          Apply Now
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No positions found. Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowApplicationForm(null)}
          />
          <div className="relative bg-card border border-border rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowApplicationForm(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-muted hover:bg-tribyte-orange/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-heading font-bold mb-2">
              Apply for Position
            </h3>
            <p className="text-muted-foreground mb-6">
              {jobs.find((j) => j.id === showApplicationForm)?.title}
            </p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Application submitted successfully! We'll be in touch.");
                setShowApplicationForm(null);
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Portfolio / LinkedIn URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Cover Letter
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all resize-none"
                  placeholder="Tell us why you're a great fit..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Resume / CV *
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-tribyte-orange/30 transition-colors cursor-pointer">
                  <input type="file" className="hidden" id="resume" required />
                  <label htmlFor="resume" className="cursor-pointer">
                    <p className="text-muted-foreground text-sm">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC up to 5MB
                    </p>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-tribyte-orange text-white font-semibold hover:bg-tribyte-orange-dark transition-all duration-300 hover:shadow-tribyte magnetic-btn"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}