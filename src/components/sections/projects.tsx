"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const projects = [
  {
    title: "Finova",
    category: "Fintech — SaaS Dashboard",
    description:
      "Dashboard analytics temps réel pour une plateforme de trading. Design system complet, dark mode, graphiques interactifs.",
    tags: ["Next.js", "Three.js", "WebSocket"],
    color: "#5E6AD2",
  },
  {
    title: "Maison Elara",
    category: "Luxury — E-commerce",
    description:
      "E-commerce premium pour une maison de joaillerie parisienne. Animations fluides, expérience immersive, performance 100/100.",
    tags: ["React", "GSAP", "Stripe"],
    color: "#A16207",
  },
  {
    title: "NeuraScan",
    category: "HealthTech — Application Web",
    description:
      "Plateforme d'imagerie médicale assistée par IA. Interface accessible WCAG AAA, visualisation de données avancée.",
    tags: ["TypeScript", "D3.js", "Python"],
    color: "#22C55E",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[var(--bg-base)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Projets
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Ce qu&apos;on a construit
          </h2>
        </FadeIn>

        <StaggerContainer stagger={0.12} className="space-y-6">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-border bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors duration-300 cursor-pointer"
              >
                <div className="lg:col-span-1 flex items-start">
                  <div
                    className="w-3 h-3 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-xs text-foreground-subtle mt-1">
                      {project.category}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-[var(--radius-full)] bg-[var(--bg-elevated)] text-foreground-subtle border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1 flex items-center justify-end">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                    <ArrowUpRight size={18} className="group-hover:rotate-0 -rotate-12 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
