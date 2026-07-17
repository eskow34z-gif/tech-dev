"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagneticHover, TextReveal } from "@/components/ui/motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#3B82F6]/6 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-deep)_70%)]" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="accent" className="mb-8">
            <Sparkles size={12} className="mr-1.5" />
            Agence Web Premium
          </Badge>
        </motion.div>

        <TextReveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
            On construit des
          </h1>
        </TextReveal>
        <TextReveal delay={0.2}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-accent via-[#3B82F6] to-accent bg-[length:200%_auto] animate-[gradient-shift_4s_ease-in-out_infinite] bg-clip-text text-transparent">
              expériences digitales
            </span>
          </h1>
        </TextReveal>
        <TextReveal delay={0.3}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
            d&apos;exception
          </h1>
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Design UI/UX premium, développement sur-mesure et performance
          obsessionnelle. Votre produit mérite le meilleur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticHover strength={0.15}>
            <Button size="lg">
              <a href="#contact" className="flex items-center gap-2">
                Démarrer un projet
                <ArrowRight size={18} />
              </a>
            </Button>
          </MagneticHover>
          <MagneticHover strength={0.15}>
            <Button variant="outline" size="lg">
              <a href="#projects">Voir nos réalisations</a>
            </Button>
          </MagneticHover>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex items-center justify-center gap-8 sm:gap-12 text-foreground-subtle"
        >
          {["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"].map(
            (tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.4 }}
                className="text-xs sm:text-sm font-medium tracking-wider uppercase hover:text-foreground-muted transition-colors duration-300"
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-foreground-subtle/50 flex items-start justify-center pt-1.5"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 rounded-full bg-foreground-subtle"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
