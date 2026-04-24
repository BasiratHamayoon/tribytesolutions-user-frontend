"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";

const partners = [
  "Google Cloud",
  "Microsoft Azure",
  "Amazon AWS",
  "Stripe",
  "Salesforce",
  "MongoDB",
  "Docker",
  "GitHub",
  "Vercel",
  "Datadog",
];

export default function PartnersSection() {
  return (
    <section className="relative py-16 overflow-hidden border-y border-border">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-widest font-medium mb-10">
            Trusted by industry leaders & partners
          </p>
        </ScrollReveal>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-[scroll_40s_linear_infinite] gap-16 items-center">
            {[...partners, ...partners].map((partner, index) => (
              <span
                key={index}
                className="flex-shrink-0 text-lg font-heading font-bold text-muted-foreground/40 hover:text-tribyte-orange transition-colors duration-300 cursor-default whitespace-nowrap"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}