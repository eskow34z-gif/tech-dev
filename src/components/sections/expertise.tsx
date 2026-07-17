"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlowCard,
  SectionDivider,
} from "@/components/ui/motion";

const stats = [
  { value: 100, suffix: "+", label: "Projets livrés" },
  { value: 100, suffix: "/100", label: "Lighthouse score" },
  { value: 0.8, suffix: "s", prefix: "< ", label: "Temps de chargement" },
  { value: 0, label: "WCAG AA", display: "WCAG AA" },
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

function AnimatedStat({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <GlowCard>
        <div className="text-center p-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.1 + 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-3xl sm:text-4xl font-bold text-accent mb-2"
          >
            {stat.display || `${stat.prefix || ""}${stat.value}${stat.suffix || ""}`}
          </motion.div>
          <div className="text-sm text-foreground-muted">{stat.label}</div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="py-24 sm:py-32 relative">
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            La stack des meilleurs
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <StaggerContainer
          stagger={0.04}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3"
        >
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex flex-col items-center p-4 rounded-[var(--radius-md)] border border-border bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 cursor-default"
              >
                <span className="text-sm font-medium group-hover:text-accent transition-colors duration-300">
                  {tech.name}
                </span>
                <span className="text-xs text-foreground-subtle mt-1">
                  {tech.category}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
