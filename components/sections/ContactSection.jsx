"use client";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiClock,
  FiMessageSquare,
  FiCheck,
} from "react-icons/fi";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/common/SectionHeading";

const contactInfo = [
  {
    icon: FiMail,
    title: "Email Us",
    value: "contact@tribytesolutions.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: FiPhone,
    title: "Call Us",
    value: "+1 (234) 567-890",
    description: "Mon-Fri from 9am to 6pm",
  },
  {
    icon: FiMapPin,
    title: "Visit Us",
    value: "123 Tech Avenue, Silicon Valley",
    description: "CA 94025, United States",
  },
  {
    icon: FiClock,
    title: "Business Hours",
    value: "Monday - Friday",
    description: "9:00 AM - 6:00 PM PST",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-tribyte-orange/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Contact Us"
          title="Let's Build Something Great"
          description="Ready to transform your business? Get in touch with us to discuss your project and discover how we can help."
        />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <ScrollReveal key={index} direction="left" delay={index * 100}>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-tribyte-orange/20 transition-all duration-300 card-3d">
                  <div className="w-12 h-12 rounded-xl bg-tribyte-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-tribyte-orange group-hover:shadow-tribyte transition-all duration-300">
                    <info.icon className="w-5 h-5 text-tribyte-orange group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-0.5">{info.title}</h4>
                    <p className="text-tribyte-orange text-sm font-medium">
                      {info.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {info.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Map placeholder */}
            <ScrollReveal direction="left" delay={400}>
              <div className="h-48 rounded-2xl bg-gradient-to-br from-tribyte-orange/10 to-tribyte-orange/5 border border-border flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="w-8 h-8 text-tribyte-orange mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Interactive Map
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <div className="p-8 rounded-3xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-8">
                  <FiMessageSquare className="w-6 h-6 text-tribyte-orange" />
                  <h3 className="text-xl font-heading font-bold">
                    Send us a Message
                  </h3>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-16 animate-scale-in">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-heading font-bold mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-muted-foreground">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all duration-300"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          Service Needed
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all duration-300"
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
                      <label className="block text-sm font-medium mb-1.5">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k+">$100,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-tribyte-orange/50 focus:outline-none focus:ring-2 focus:ring-tribyte-orange/20 transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-tribyte-orange text-white font-semibold text-lg hover:bg-tribyte-orange-dark transition-all duration-300 hover:shadow-tribyte-lg magnetic-btn"
                    >
                      <FiSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}