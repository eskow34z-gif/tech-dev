"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Clock, Check, Loader2 } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
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
    <section id="contact" className="py-14 sm:py-32 relative">
      <div className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-sm" />
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8 z-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-10 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Demandez votre devis gratuit
          </h2>
          <p className="text-foreground-muted mt-4 max-w-xl mx-auto">
            Décrivez votre besoin en quelques mots. Réponse rapide sous 24h,
            maquette gratuite offerte pour tout projet web ou design.
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
                    placeholder="jean@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-foreground-muted mb-2"
                >
                  Type de prestation
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full h-11 px-4 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238A8F98%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
                >
                  <option value="">Choisir une prestation</option>
                  <option value="informatique">Informatique / Dépannage</option>
                  <option value="site-vitrine">Site vitrine</option>
                  <option value="identite">Identité visuelle / Flyers</option>
                  <option value="design">Design graphique / Logo</option>
                  <option value="pack">Pack Lancement Commerce</option>
                  <option value="maintenance">Maintenance / Forfait</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground-muted mb-2"
                >
                  Votre besoin
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-200 resize-none"
                  placeholder="Décrivez votre besoin en quelques mots..."
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
                      Envoyer ma demande
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
                      Demande envoyée !
                      <Check size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Mail size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-sm text-foreground-muted">
                    Adresse e-mail bientôt disponible
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <InstagramIcon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Instagram</p>
                  <a
                    href="https://instagram.com/techanddev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    @techanddev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <MapPin size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Zone d&apos;intervention</p>
                  <p className="text-sm text-foreground-muted whitespace-pre-line">
                    {"Île-de-France\nDéplacement ou à distance"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Clock size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Disponibilité</p>
                  <p className="text-sm text-foreground-muted whitespace-pre-line">
                    {"24h/7j\nRéponse rapide sous 24h"}
                  </p>
                </div>
              </div>

              <GlowCard className="mt-8">
                <div className="p-6">
                  <p className="text-sm font-medium mb-4">Ce qui est inclus</p>
                  <ul className="space-y-3 text-sm text-foreground-muted">
                    {[
                      "Diagnostic gratuit par e-mail",
                      "Devis détaillé sous 24h",
                      "Maquette offerte (projets web & design)",
                      "Paiement en plusieurs fois possible",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check size={14} className="text-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
