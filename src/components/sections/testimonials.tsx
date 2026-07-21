"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlowCard,
  SectionDivider,
} from "@/components/ui/motion";

const testimonials = [
  {
    quote:
      "Grâce à TECH&DEV, ma boulangerie est enfin visible sur Google Maps. Les clients me trouvent facilement et le site est superbe sur mobile. Je recommande à 100% !",
    author: "Sophie M.",
    role: "Boulangère, Paris 11e",
    accent: "#F59E0B",
    stars: 5,
  },
  {
    quote:
      "J'avais besoin d'un logo, de cartes de visite et d'un habillage Instagram. Tout a été livré en une semaine, avec un résultat très pro. Rapport qualité-prix imbattable.",
    author: "Karim B.",
    role: "Gérant, Studio K Barbershop",
    accent: "#3B82F6",
    stars: 5,
  },
  {
    quote:
      "Notre réseau plantait tout le temps. Intervention rapide, diagnostic clair, et maintenant tout tourne nickel. En plus, on a pris le forfait maintenance — la tranquillité !",
    author: "Catherine D.",
    role: "Cabinet comptable, Montreuil",
    accent: "#22C55E",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-14 sm:py-32 relative">
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-10 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Témoignages
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Ils nous font confiance
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
                  <div className="flex items-center justify-between mb-4">
                    <Quote
                      size={20}
                      className="shrink-0"
                      style={{ color: t.accent }}
                    />
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-current"
                          style={{ color: t.accent }}
                        />
                      ))}
                    </div>
                  </div>
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
