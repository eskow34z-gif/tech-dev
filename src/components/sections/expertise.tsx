"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const stats = [
  { value: "100+", label: "Projets livrés" },
  { value: "100/100", label: "Lighthouse score" },
  { value: "< 1s", label: "Temps de chargement" },
  { value: "WCAG AA", label: "Accessibilité" },
];

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Three.js", category: "3D" },
  { name: "GSAP", category: "Animation" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Vercel", category: "Deploy" },
  { name: "Figma", category: "Design" },
  { name: "Stripe", category: "Payment" },
];

export function Expertise() {
  return (
    <section id="expertise" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            La stack des meilleurs
          </h2>
        </FadeIn>

        <StaggerContainer
          stagger={0.06}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center p-6 rounded-[var(--radius-lg)] border border-border bg-[var(--bg-surface)]">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted">
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer
          stagger={0.04}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3"
        >
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="group flex flex-col items-center p-4 rounded-[var(--radius-md)] border border-border bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--border-hover)] transition-all duration-300 cursor-default">
                <span className="text-sm font-medium">{tech.name}</span>
                <span className="text-xs text-foreground-subtle mt-1">
                  {tech.category}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
