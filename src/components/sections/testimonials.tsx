"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, GlowCard, SectionDivider } from "@/components/ui/motion";

const testimonials = [
  {
    quote:
      "TECH&DEV a transformé notre vision en une expérience digitale qui dépasse largement nos attentes. Le niveau de finition est exceptionnel.",
    author: "Marie Laurent",
    role: "CEO, Finova",
    accent: "#5E6AD2",
  },
  {
    quote:
      "Leur approche obsessionnelle de la performance et du détail a fait toute la différence. Notre taux de conversion a augmenté de 340%.",
    author: "Thomas Mercier",
    role: "CTO, NeuraScan",
    accent: "#22C55E",
  },
  {
    quote:
      "Un travail d'orfèvre. Chaque interaction, chaque animation, chaque transition respire le premium. C'est exactement ce dont notre marque avait besoin.",
    author: "Sophie Durand",
    role: "Directrice Artistique, Maison Elara",
    accent: "#A16207",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 relative">
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Témoignages
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Ce qu&apos;ils en disent
          </h2>
        </FadeIn>

        <StaggerContainer
          stagger={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <GlowCard className="h-full">
                <div className="p-6 sm:p-8 flex flex-col h-full">
                  <Quote
                    size={20}
                    className="mb-4 shrink-0"
                    style={{ color: t.accent }}
                  />
                  <blockquote className="text-sm text-foreground-muted leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: `${t.accent}20`,
                        color: t.accent,
                      }}
                    >
                      {t.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium">{t.author}</p>
                      <p className="text-xs text-foreground-subtle">{t.role}</p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
