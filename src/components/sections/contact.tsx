"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Clock, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionDivider, GlowCard } from "@/components/ui/motion";

type FormState = "idle" | "submitting" | "success";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1500);
    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-[var(--bg-base)]" />
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8 z-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Parlons de votre projet
          </h2>
          <p className="text-foreground-muted mt-4 max-w-xl mx-auto">
            Un projet ambitieux ? On adore ça. Décrivez votre vision, on
            s&apos;occupe du reste.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <FadeIn direction="left" className="lg:col-span-3">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground-muted mb-2"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full h-11 px-4 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground-muted mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full h-11 px-4 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200"
                    placeholder="jean@entreprise.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-foreground-muted mb-2"
                >
                  Budget estimé
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full h-11 px-4 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238A8F98%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
                >
                  <option value="">Sélectionnez un budget</option>
                  <option value="5k-10k">5 000 € — 10 000 €</option>
                  <option value="10k-25k">10 000 € — 25 000 €</option>
                  <option value="25k-50k">25 000 € — 50 000 €</option>
                  <option value="50k+">50 000 € +</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground-muted mb-2"
                >
                  Votre projet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 resize-none"
                  placeholder="Décrivez votre projet, vos objectifs et votre timeline..."
                />
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto"
                disabled={formState !== "idle"}
              >
                <AnimatePresence mode="wait">
                  {formState === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Envoyer le message
                      <Send size={16} />
                    </motion.span>
                  )}
                  {formState === "submitting" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Envoi en cours
                      <Loader2 size={16} className="animate-spin" />
                    </motion.span>
                  )}
                  {formState === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-[var(--success)]"
                    >
                      Message envoyé
                      <Check size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="lg:col-span-2">
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "contact@techanddev.fr",
                },
                {
                  icon: MapPin,
                  label: "Localisation",
                  value: "Paris, France\nRemote worldwide",
                },
                {
                  icon: Clock,
                  label: "Réponse",
                  value: "Sous 24h ouvrées",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <item.icon size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">{item.label}</p>
                    <p className="text-sm text-foreground-muted whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}

              <GlowCard className="mt-8">
                <div className="p-6">
                  <p className="text-sm font-medium mb-4">Notre processus</p>
                  <ol className="space-y-3 text-sm text-foreground-muted">
                    {[
                      "Appel découverte (30 min)",
                      "Proposition & design system",
                      "Développement itératif",
                      "Livraison & optimisation",
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="text-accent font-mono text-xs mt-0.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </GlowCard>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
