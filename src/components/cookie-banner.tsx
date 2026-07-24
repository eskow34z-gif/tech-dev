"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50"
        >
          <div className="bg-[var(--bg-surface)] border border-border rounded-[var(--radius-lg)] p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm text-foreground mb-1 font-medium">
                  Cookies
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Ce site utilise uniquement des cookies techniques. Aucun tracking, aucune pub.{" "}
                  <a
                    href="/mentions-legales"
                    className="text-accent hover:underline"
                  >
                    En savoir plus
                  </a>
                </p>
              </div>
              <button
                onClick={accept}
                className="p-1 text-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </div>
            <button
              onClick={accept}
              className="mt-3 w-full text-xs font-medium py-2 px-4 rounded-[var(--radius-md)] bg-accent text-white hover:bg-accent/90 transition-colors cursor-pointer"
            >
              Compris
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
