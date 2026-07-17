"use client";

import {
  Code2,
  Palette,
  Gauge,
  Search,
  Smartphone,
  Layers,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlowCard,
  SectionDivider,
} from "@/components/ui/motion";

const services = [
  {
    icon: Palette,
    title: "Design UI/UX",
    description:
      "Interfaces élégantes, accessibles et pensées pour la conversion. Chaque pixel a un objectif.",
  },
  {
    icon: Code2,
    title: "Développement Web",
    description:
      "Applications React & Next.js performantes, typées, maintenables. Code de niveau production.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Lighthouse 100/100. Optimisation obsessionnelle du LCP, CLS, FID. Chaque milliseconde compte.",
  },
  {
    icon: Search,
    title: "SEO Technique",
    description:
      "Architecture SEO-first. Schema.org, Core Web Vitals, indexation parfaite.",
  },
  {
    icon: Smartphone,
    title: "Responsive Premium",
    description:
      "Du mobile au ultra-wide. Chaque breakpoint est optimisé, chaque interaction est fluide.",
  },
  {
    icon: Layers,
    title: "Design System",
    description:
      "Systèmes de design complets, scalables. Tokens, composants, documentation.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Tout ce qu&apos;il faut pour
            <br />
            <span className="text-foreground-muted">dominer le digital</span>
          </h2>
        </FadeIn>

        <StaggerContainer
          stagger={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <GlowCard className="h-full">
                <div className="group p-6 sm:p-8 h-full">
                  <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent mb-5 group-hover:shadow-[var(--shadow-glow)] transition-all duration-300 group-hover:scale-110">
                    <service.icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
