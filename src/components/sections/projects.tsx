"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Palette, Music, Megaphone, X, ZoomIn } from "lucide-react";
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

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/92 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="relative max-w-[88vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={500}
          height={700}
          className="w-auto max-h-[82vh] rounded-xl object-contain shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Fermer"
        >
          <X size={14} />
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function CursorPreview({
  src,
  alt,
  color,
  mouseX,
  mouseY,
}: {
  src: string;
  alt: string;
  color: string;
  mouseX: number;
  mouseY: number;
}) {
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => { springX.set(mouseX); }, [mouseX, springX]);
  useEffect(() => { springY.set(mouseY); }, [mouseY, springY]);

  return createPortal(
    <motion.div
      className="fixed z-[200] pointer-events-none"
      style={{ left: springX, top: springY, x: 20, y: -120 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-[220px] rounded-xl overflow-hidden shadow-2xl border border-white/10"
        style={{ boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 30px ${color}25` }}
      >
        <Image
          src={src}
          alt={alt}
          width={220}
          height={320}
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </motion.div>,
    document.body
  );
}

function MobileLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-full max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={600}
          height={900}
          className="w-auto h-auto max-h-[80vh] rounded-xl object-contain"
        />
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
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

  const handleImageMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <AnimatePresence>
        {previewVisible && !isTouch && (
          <CursorPreview
            src={project.image}
            alt={project.title}
            color={project.color}
            mouseX={cursorPos.x}
            mouseY={cursorPos.y}
          />
        )}
        {lightboxOpen && (
          <ImageLightbox
            src={project.image}
            alt={project.title}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

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

        <div
          className={`relative w-full overflow-hidden ${isTouch ? "cursor-pointer" : "cursor-none"}`}
          style={{ height: "200px" }}
          onMouseEnter={() => !isTouch && setPreviewVisible(true)}
          onMouseLeave={() => setPreviewVisible(false)}
          onMouseMove={handleImageMouseMove}
          onClick={() => isTouch && setLightboxOpen(true)}
        >
          {isTouch && (
            <div className="absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white pointer-events-none">
              <ZoomIn size={14} />
            </div>
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
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
