"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, FileSearch, Wrench, Handshake } from "lucide-react";
import { FadeIn, SectionDivider } from "@/components/ui/motion";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Appel gratuit",
    description:
      "On discute de votre besoin par téléphone ou en visio. Pas de jargon, pas d'engagement — juste un échange pour comprendre votre situation.",
    duration: "15-30 min",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Diagnostic & devis",
    description:
      "Je vous envoie un devis clair et détaillé sous 24h. Pour les projets web, vous recevez une maquette gratuite avant de vous engager.",
    duration: "24h",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Réalisation",
    description:
      "Je travaille sur votre projet avec des points réguliers. Vous validez chaque étape avant de passer à la suivante. Zéro surprise.",
    duration: "1-3 semaines",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Livraison & suivi",
    description:
      "Livraison soignée, formation rapide à vos outils, et je reste disponible après. La relation ne s'arrête pas à la livraison.",
    duration: "Continu",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-sm" />
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8 z-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Processus
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Simple, rapide, efficace
          </h2>
        </FadeIn>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          <div className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-accent to-accent/30"
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex gap-6 sm:gap-8"
              >
                <div className="relative z-10 shrink-0">
                  <motion.div
                    whileInView={{ scale: [0.5, 1] }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1 + 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-border flex items-center justify-center text-accent"
                  >
                    <step.icon size={20} strokeWidth={1.8} />
                  </motion.div>
                </div>

                <div className="pt-1 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-accent">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <span className="inline-block text-xs px-2.5 py-1 rounded-[var(--radius-full)] bg-[var(--bg-surface)] text-foreground-subtle border border-border">
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
