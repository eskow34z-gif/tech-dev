"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Globe, Palette, Monitor } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  SectionDivider,
} from "@/components/ui/motion";

const projects = [
  {
    title: "Boulangerie Parisienne",
    category: "Site vitrine + Google My Business",
    description:
      "Un site élégant pour une boulangerie artisanale dans le 11e. Horaires, menu du jour, commande en ligne, et fiche Google optimisée. Résultat : +180% de visites organiques en 3 mois.",
    tags: ["Site vitrine", "SEO local", "Responsive"],
    icon: Globe,
    color: "#F59E0B",
  },
  {
    title: "Studio Créatif Mila",
    category: "Identité visuelle complète",
    description:
      "Logo, cartes de visite, habillage réseaux sociaux et 20 visuels Instagram pour un studio de tatouage. Une identité forte et cohérente qui reflète l'univers artistique.",
    tags: ["Logo", "Print", "Réseaux sociaux"],
    icon: Palette,
    color: "#EC4899",
  },
  {
    title: "Cabinet Durand & Associés",
    category: "Informatique + Site web",
    description:
      "Migration e-mail pro, installation réseau sécurisé pour 8 postes, et création d'un site vitrine 5 pages. Le cabinet a gagné en crédibilité et en productivité.",
    tags: ["Réseau", "E-mail pro", "Site 5 pages"],
    icon: Monitor,
    color: "#3B82F6",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [3, -3]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-3, 3]), {
    stiffness: 200,
    damping: 30,
  });

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
      className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors duration-300"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${project.color}10, transparent 60%)`,
        }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center transition-shadow duration-300 group-hover:shadow-lg"
              style={{ background: `${project.color}15` }}
            >
              <project.icon
                size={22}
                style={{ color: project.color }}
                strokeWidth={1.8}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-xs text-foreground-subtle mt-0.5">
                {project.category}
              </p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_15px_var(--accent-glow)] transition-all duration-300 shrink-0"
          >
            <ArrowUpRight
              size={16}
              className="group-hover:rotate-0 -rotate-12 transition-transform duration-300"
            />
          </motion.div>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-[var(--radius-full)] bg-white/[0.04] text-foreground-subtle border border-border group-hover:border-[var(--border-hover)] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className="h-1 w-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-sm" />
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8 z-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Réalisations
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Nos derniers projets
          </h2>
        </FadeIn>

        <StaggerContainer
          stagger={0.12}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
