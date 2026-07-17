"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, MagneticHover } from "@/components/ui/motion";

export function CtaBand() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg-base)]" />

      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"
      />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Prêt à passer au
            <br />
            <span className="bg-gradient-to-r from-accent to-[#3B82F6] bg-clip-text text-transparent">
              niveau supérieur
            </span>
            &nbsp;?
          </h2>
          <p className="text-lg text-foreground-muted max-w-xl mx-auto mb-10">
            Chaque jour qui passe sans un site d&apos;exception est un jour où votre
            concurrence prend de l&apos;avance.
          </p>
          <MagneticHover strength={0.12}>
            <Button size="lg">
              <a href="#contact" className="flex items-center gap-2">
                Commencer maintenant
                <ArrowRight size={18} />
              </a>
            </Button>
          </MagneticHover>
        </FadeIn>
      </div>
    </section>
  );
}
