"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  FiTarget,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiCheck,
} from "react-icons/fi";
import SectionHeading from "@/components/common/SectionHeading";

const values = [
  {
    icon: FiTarget,
    title: "Mission Driven",
    description: "Empowering businesses with innovative technology solutions that create lasting impact.",
  },
  {
    icon: FiUsers,
    title: "Client Focused",
    description: "Your success is our priority. We build lasting partnerships, not just software.",
  },
  {
    icon: FiAward,
    title: "Excellence First",
    description: "Every line of code meets the highest standards of quality and performance.",
  },
  {
    icon: FiTrendingUp,
    title: "Future Ready",
    description: "Staying ahead of technology trends to keep your business at the cutting edge.",
  },
];

const highlights = [
  "10+ Years of Industry Experience",
  "100+ Skilled Developers & Designers",
  "ISO 27001 Certified Security Practices",
  "Agile Development Methodology",
  "24/7 Dedicated Support Team",
  "Transparent Communication & Reporting",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-tribyte-orange/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="About Us"
          title="Pioneering Digital Innovation"
          description="TriByte Solutions is a premier IT services company dedicated to transforming businesses through technology. We combine expertise with innovation to deliver exceptional results."
        />

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Visual */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative bg-gradient-to-br from-tribyte-orange/10 to-tribyte-orange/5 rounded-3xl p-8 border border-tribyte-orange/10">
                {/* Code Block Visual */}
                <div className="bg-tribyte-black rounded-2xl p-6 font-mono text-sm overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-white/40 text-xs">tribyte-solutions.js</span>
                  </div>
                  <div className="space-y-2 text-white/80">
                    <p>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">tribyte</span>{" "}
                      <span className="text-white">=</span> {"{"}
                    </p>
                    <p className="pl-4">
                      <span className="text-green-400">name</span>:{" "}
                      <span className="text-tribyte-orange">&apos;TriByte Solutions&apos;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-green-400">mission</span>:{" "}
                      <span className="text-tribyte-orange">&apos;Transform Businesses&apos;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-green-400">expertise</span>: [
                    </p>
                    <p className="pl-8">
                      <span className="text-tribyte-orange">&apos;Software Development&apos;</span>,
                    </p>
                    <p className="pl-8">
                      <span className="text-tribyte-orange">&apos;Cloud & DevOps&apos;</span>,
                    </p>
                    <p className="pl-8">
                      <span className="text-tribyte-orange">&apos;AI & Machine Learning&apos;</span>,
                    </p>
                    <p className="pl-4">],</p>
                    <p className="pl-4">
                      <span className="text-green-400">innovation</span>:{" "}
                      <span className="text-purple-400">true</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-green-400">clients</span>:{" "}
                      <span className="text-blue-400">Infinity</span>,
                    </p>
                    <p>{"}"}</p>
                    <p className="mt-2">
                      <span className="text-purple-400">export default</span>{" "}
                      <span className="text-blue-400">tribyte</span>;
                    </p>
                  </div>
                  {/* Blinking cursor */}
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-tribyte-orange">❯</span>
                    <div className="w-2 h-4 bg-tribyte-orange animate-pulse" />
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-tribyte-orange text-white text-sm font-bold shadow-tribyte animate-bounce-slow">
                  10+ Years
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Content */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold">
                Building the Future with{" "}
                <span className="text-tribyte-orange">Code & Creativity</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Founded with a vision to bridge the gap between technology and business success,
                TriByte Solutions has grown into a trusted partner for companies worldwide. Our
                team of passionate developers, designers, and strategists work together to
                deliver solutions that make a real difference.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in the power of clean code, beautiful design, and agile processes.
                Every project we undertake is a commitment to excellence, innovation, and
                our clients&apos; success.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-tribyte-orange/10 flex items-center justify-center group-hover:bg-tribyte-orange/20 transition-colors">
                      <FiCheck className="w-3 h-3 text-tribyte-orange" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 100}>
              <div className="group p-8 rounded-2xl bg-card border border-border hover:border-tribyte-orange/30 transition-all duration-500 card-3d">
                <div className="w-14 h-14 rounded-2xl bg-tribyte-orange/10 flex items-center justify-center mb-6 group-hover:bg-tribyte-orange/20 group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-7 h-7 text-tribyte-orange" />
                </div>
                <h4 className="text-xl font-heading font-bold mb-3 group-hover:text-tribyte-orange transition-colors">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}