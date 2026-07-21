"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");

  useEffect(() => {
    let current = 0;
    let startTime = performance.now();
    const duration = 2800;
    let raf: number;

    function tick() {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out curve: fast start, slow finish
      current = t < 0.6
        ? t / 0.6 * 70
        : 70 + ((t - 0.6) / 0.4) * 30;
      current = Math.min(current, 100);
      setProgress(Math.floor(current));

      if (current >= 100) {
        setTimeout(() => setPhase("revealing"), 400);
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1800);
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#020203" }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(94,106,210,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(94,106,210,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

          {/* Animated glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(94,106,210,0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6"
              >
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <circle
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke="rgba(94,106,210,0.15)"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke="#5E6AD2"
                    strokeWidth="1"
                    strokeDasharray={`${progress * 3.52} ${352 - progress * 3.52}`}
                    strokeLinecap="round"
                    className="transition-all duration-100"
                    style={{ filter: "drop-shadow(0 0 6px rgba(94,106,210,0.5))" }}
                  />
                </svg>
              </motion.div>

              {/* Inner rotating ring (opposite direction) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10"
              >
                <svg viewBox="0 0 140 140" className="w-full h-full">
                  <circle
                    cx="70"
                    cy="70"
                    r="66"
                    fill="none"
                    stroke="rgba(59,130,246,0.1)"
                    strokeWidth="0.3"
                    strokeDasharray="4 8"
                  />
                </svg>
              </motion.div>

              {/* TD monogram */}
              <div className="w-16 h-16 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-2xl font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #5E6AD2, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  TD
                </motion.span>
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-xl font-semibold tracking-wider mb-1">
                TECH
                <span style={{ color: "#5E6AD2" }}>&</span>
                DEV
              </h1>
              <p className="text-[10px] tracking-[0.3em] text-[#5C5F66] uppercase">
                Solutions Numériques
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 flex flex-col items-center gap-3">
              <div className="w-full h-[1px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #5E6AD2, #3B82F6)",
                    boxShadow: "0 0 12px rgba(94,106,210,0.4)",
                  }}
                />
              </div>
              <motion.span
                className="text-xs font-mono text-[#5C5F66] tabular-nums"
                key={progress}
              >
                {progress}%
              </motion.span>
            </div>

            {/* Status text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={progress < 25 ? "init" : progress < 65 ? "load" : progress < 100 ? "render" : "ready"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] text-[#5C5F66] tracking-wider uppercase"
              >
                {progress < 25
                  ? "Initialisation de l'environnement 3D"
                  : progress < 65
                    ? "Chargement des textures et shaders"
                    : progress < 100
                      ? "Rendu de la scène"
                      : "Bienvenue"}
              </motion.p>
            </AnimatePresence>

            {/* Reveal animation — expanding circle wipe */}
            {phase === "revealing" && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 50, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
              >
                <div
                  className="w-16 h-16 rounded-full"
                  style={{ background: "#020203" }}
                />
              </motion.div>
            )}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[rgba(94,106,210,0.2)]" />
          <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[rgba(94,106,210,0.2)]" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[rgba(94,106,210,0.2)]" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[rgba(94,106,210,0.2)]" />

          {/* Scanning line */}
          <motion.div
            animate={{ y: ["-100vh", "100vh"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(94,106,210,0.15), transparent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
