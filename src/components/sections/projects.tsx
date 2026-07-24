"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Palette, Music, Megaphone, X } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  SectionDivider,
} from "@/components/ui/motion";
import { Spotlight } from "@/components/ui/spotlight";

const projects = [
  {
    title: "Emron Collection",
    category: "Identité visuelle + Communication",
    description:
      "Direction artistique complète pour la marque streetwear Emron — collection Rebellion Douce. Logo, flyers sold out, visuels lancement, et habillage réseaux sociaux Instagram & TikTok.",
    tags: ["Branding", "Direction artistique", "Réseaux sociaux"],
    icon: Palette,
    color: "#EC4899",
    image: "/portfolio/emron-lancement.png",
  },
  {
    title: "Cali — Papillon",
    category: "Cover art musicale",
    description:
      "Création de la pochette du single « Papillon » pour le rappeur Cali. Composition visuelle sombre et cinématique avec effets de fumée, papillons et typographie impact.",
    tags: ["Cover art", "Photomontage", "Direction artistique"],
    icon: Music,
    color: "#F59E0B",
    image: "/portfolio/cali-papillon.png",
  },
  {
    title: "Flyer Services Digital",
    category: "Design promotionnel",
    description:
      "Conception d'un flyer de services digitaux avec style néon gaming. Mise en page claire des prestations, icônes personnalisées et contact direct intégré.",
    tags: ["Flyer", "Design graphique", "Promo"],
    icon: Megaphone,
    color: "#3B82F6",
    image: "/portfolio/td-flyer.png",
  },
];

function ImagePreviewOverlay({
  src,
  alt,
  color,
  onClose,
}: {
  src: string;
  alt: string;
  color: string;
  onClose: () => void;
}) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
        style={{ backdropFilter: "blur(16px)", background: "rgba(0,0,0,0.75)" }}
        onMouseLeave={onClose}
        onClick={onClose}
      >
        <motion.div
          key="image-box"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative max-h-[88vh] max-w-[560px] w-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ boxShadow: `0 0 80px ${color}30, 0 32px 64px rgba(0,0,0,0.6)` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* glow border */}
          <div
            className="absolute -inset-[1px] rounded-2xl -z-10"
            style={{ background: `linear-gradient(135deg, ${color}60, transparent 60%)` }}
          />
          <Image
            src={src}
            alt={alt}
            width={560}
            height={800}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "85vh" }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
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
    <>
      {previewOpen && (
        <ImagePreviewOverlay
          src={project.image}
          alt={project.title}
          color={project.color}
          onClose={() => setPreviewOpen(false)}
        />
      )}

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors duration-300"
      >
        <Spotlight className="from-white/8 via-white/4 to-transparent" size={250} />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at 50% 0%, ${project.color}10, transparent 60%)`,
          }}
        />

        {/* Image thumbnail — hover to preview */}
        <div
          className="relative w-full overflow-hidden cursor-zoom-in"
          style={{ height: "200px" }}
          onMouseEnter={() => setPreviewOpen(true)}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          {/* hover hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <span className="text-xs font-medium text-white/90 tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              Voir le visuel
            </span>
          </motion.div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, var(--bg-surface) 100%)`,
            }}
          />
        </div>

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
    </>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-14 sm:py-32 relative">
      <div className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-sm" />
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8 z-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-10 sm:mb-20">
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
