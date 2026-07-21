"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Monitor,
  Globe,
  Palette,
  Wrench,
  ShieldCheck,
  Zap,
  Cpu,
  Wifi,
  Code2,
  Layers,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  FadeIn,
  GlowCard,
  SectionDivider,
} from "@/components/ui/motion";

const skills = [
  { name: "Dépannage PC", icon: Wrench, color: "#EF4444" },
  { name: "Réseau & Wi-Fi", icon: Wifi, color: "#F59E0B" },
  { name: "Sites Web", icon: Globe, color: "#3B82F6" },
  { name: "Design UI/UX", icon: Palette, color: "#8B5CF6" },
  { name: "SEO", icon: TrendingUp, color: "#22C55E" },
  { name: "E-commerce", icon: Code2, color: "#EC4899" },
  { name: "Sécurité", icon: ShieldCheck, color: "#06B6D4" },
  { name: "Maintenance", icon: Cpu, color: "#F97316" },
];

const stats = [
  { value: "150+", label: "Clients accompagnés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "24h", label: "Temps de réponse" },
  { value: "5 ans", label: "D'expérience" },
];

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      <GlowCard className="h-full">
        {children}
      </GlowCard>
    </motion.div>
  );
}

function SkillOrb({
  skill,
  index,
}: {
  skill: (typeof skills)[number];
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex flex-col items-center gap-2 p-3 rounded-[var(--radius-md)] bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-[var(--border-hover)] transition-all duration-300 cursor-default group"
    >
      <div
        className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center transition-shadow duration-300 group-hover:shadow-lg"
        style={{
          background: `${skill.color}15`,
          boxShadow: `0 0 0 0 ${skill.color}00`,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLDivElement).style.boxShadow = `0 0 20px ${skill.color}30`;
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLDivElement).style.boxShadow = `0 0 0 0 ${skill.color}00`;
        }}
      >
        <skill.icon size={18} style={{ color: skill.color }} strokeWidth={1.8} />
      </div>
      <span className="text-xs font-medium text-foreground-muted group-hover:text-foreground transition-colors">
        {skill.name}
      </span>
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
            Tout le numérique,
            <br />
            <span className="text-foreground-muted">un seul interlocuteur</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* Large card - Skills grid */}
          <BentoCard className="lg:col-span-2 lg:row-span-2" delay={0}>
            <div className="p-6 sm:p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-accent/10 flex items-center justify-center">
                  <Layers size={16} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Compétences</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                {skills.map((skill, i) => (
                  <SkillOrb key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Stats cards */}
          {stats.slice(0, 2).map((stat, i) => (
            <BentoCard key={stat.label} delay={0.1 + i * 0.08}>
              <div className="p-6 sm:p-8 flex flex-col justify-center h-full min-h-[140px]">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </div>
            </BentoCard>
          ))}

          {/* Wide card - Approach */}
          <BentoCard className="lg:col-span-2" delay={0.25}>
            <div className="p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-accent/10 flex items-center justify-center">
                  <Zap size={16} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Notre approche</h3>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                Un diagnostic gratuit, des solutions adaptées à votre budget, et un
                accompagnement humain de A à Z. Pas de jargon, pas de surprises.
              </p>
              <div className="flex gap-3 flex-wrap">
                {["Diagnostic gratuit", "Sans engagement", "Devis sous 24h"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-[var(--radius-full)] border border-accent/20 bg-accent/5 text-accent"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </BentoCard>

          {/* Remaining stats */}
          {stats.slice(2).map((stat, i) => (
            <BentoCard key={stat.label} delay={0.35 + i * 0.08}>
              <div className="p-6 sm:p-8 flex flex-col justify-center h-full min-h-[140px]">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted">{stat.label}</div>
              </div>
            </BentoCard>
          ))}

          {/* Wide card - Client focus */}
          <BentoCard className="md:col-span-2 lg:col-span-4" delay={0.45}>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center">
                    <Users size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Pour qui ?</h3>
                    <p className="text-sm text-foreground-muted">
                      Nos clients types
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    "Restaurants & bars",
                    "Boutiques",
                    "Artisans",
                    "Professions libérales",
                    "Auto-entrepreneurs",
                    "PME locales",
                  ].map((client) => (
                    <span
                      key={client}
                      className="text-sm px-4 py-2 rounded-[var(--radius-lg)] border border-border bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] hover:border-[var(--border-hover)] transition-all duration-200"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
