"use client";

import { Send, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, SectionDivider } from "@/components/ui/motion";

export function Contact() {
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
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
                    className="w-full h-11 px-4 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
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
                    className="w-full h-11 px-4 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
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
                  className="w-full h-11 px-4 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="">Sélectionnez un budget</option>
                  <option value="5k-10k">5 000 € - 10 000 €</option>
                  <option value="10k-25k">10 000 € - 25 000 €</option>
                  <option value="25k-50k">25 000 € - 50 000 €</option>
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
                  className="w-full px-4 py-3 text-sm bg-[var(--bg-surface)] border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                  placeholder="Décrivez votre projet, vos objectifs et votre timeline..."
                />
              </div>

              <Button size="lg" className="w-full sm:w-auto">
                Envoyer le message
                <Send size={16} />
              </Button>
            </form>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="lg:col-span-2">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-sm text-foreground-muted">
                    contact@techanddev.fr
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Localisation</p>
                  <p className="text-sm text-foreground-muted">
                    Paris, France
                    <br />
                    Remote worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Réponse</p>
                  <p className="text-sm text-foreground-muted">
                    Sous 24h ouvrées
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-[var(--radius-lg)] border border-border bg-[var(--bg-surface)]">
                <p className="text-sm font-medium mb-2">Processus</p>
                <ol className="space-y-3 text-sm text-foreground-muted">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5">01</span>
                    Appel découverte (30 min)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5">02</span>
                    Proposition & design system
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5">03</span>
                    Développement itératif
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-mono text-xs mt-0.5">04</span>
                    Livraison & optimisation
                  </li>
                </ol>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
