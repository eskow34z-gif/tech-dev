"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticHover, TextReveal } from "@/components/ui/motion";
import { TextScramble } from "@/components/ui/text-scramble";

export function Hero() {
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {isDesktop && (
          <>
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -20, 30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[120px]"
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
              className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[100px]"
            />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-deep)_70%)]" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_65%)] pointer-events-none" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center"
      >
        <TextReveal delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
            Votre partenaire
          </h1>
        </TextReveal>
        <TextReveal delay={0.2} onAnimationComplete={() => setScrambleTrigger(true)}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
            <TextScramble
              as="span"
              className={`bg-gradient-to-r from-accent via-[#3B82F6] to-accent bg-clip-text text-transparent ${isDesktop ? "bg-[length:200%_auto] animate-[gradient-shift_4s_ease-in-out_infinite]" : ""}`}
              trigger={scrambleTrigger}
              duration={1.2}
              speed={0.03}
              characterSet="TECHDEV&01"
            >
              tech de confiance
            </TextScramble>
          </h1>
        </TextReveal>
        <TextReveal delay={0.3}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-6 sm:mb-8">
            en Île-de-France
          </h1>
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          Informatique, création web et design graphique pour les commerces,
          artisans et indépendants qui veulent se démarquer.
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
                Demander un devis gratuit
                <ArrowRight size={18} />
              </a>
            </Button>
          </MagneticHover>
          <MagneticHover strength={0.15}>
            <Button variant="outline" size="lg">
              <a href="#services">Découvrir nos services</a>
            </Button>
          </MagneticHover>
        </motion.div>

      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
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
