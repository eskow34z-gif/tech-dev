"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionDivider } from "@/components/ui/motion";

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

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-3, 3]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative grid grid-cols-1 lg:grid-cols-5 gap-6 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-border bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors duration-300 cursor-pointer"
    >
      <div
        className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at 50% 50%, ${project.color}08, transparent 60%)`,
        }}
      />

      <div className="relative lg:col-span-1 flex items-start">
        <motion.div
          className="w-3 h-3 rounded-full mt-2 shrink-0"
          style={{ backgroundColor: project.color }}
          whileHover={{ scale: 1.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-xs text-foreground-subtle mt-1">
            {project.category}
          </p>
        </div>
      </div>

      <div className="relative lg:col-span-3">
        <p className="text-sm text-foreground-muted leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-[var(--radius-full)] bg-[var(--bg-elevated)] text-foreground-subtle border border-border group-hover:border-[var(--border-hover)] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative lg:col-span-1 flex items-center justify-end">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_15px_var(--accent-glow)] transition-all duration-300"
        >
          <ArrowUpRight
            size={18}
            className="group-hover:rotate-0 -rotate-12 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[var(--bg-base)]" />
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8 z-10" />

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
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
