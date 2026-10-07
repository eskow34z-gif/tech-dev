"use client";

import { useRef, useEffect } from "react";
import { useInView, useSpring } from "framer-motion";
import {
  MapPin,
  Rocket,
  Handshake,
  Check,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlowCard,
  SectionDivider,
} from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Pack {
  id: string;
  icon: LucideIcon;
  badge?: string;
  name: string;
  subtitle: string;
  price: number;
  priceSuffix: string;
  priceRange?: string;
  salesArg: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const packs: Pack[] = [
  {
    id: "visibilite",
    icon: MapPin,
    name: "Cheval de Troie",
    subtitle: "Pack Visibilité Locale",
    price: 90,
    priceSuffix: "€",
    salesArg:
      "Aujourd’hui, 80% de vos clients regardent vos avis Google avant de venir. Je configure votre plaque pour que les clients satisfaits laissent un avis en posant juste leur téléphone dessus.",
    features: [
      "Audit complet de votre fiche Google My Business",
      "Optimisation pour apparaître dans les recherches locales",
      "2 plaques/cartes NFC pour récolter des avis Google",
      "Configuration et personnalisation des cartes NFC",
    ],
    cta: "Booster ma visibilité",
  },
  {
    id: "lancement",
    icon: Rocket,
    badge: "Populaire",
    name: "Fondation",
    subtitle: "Pack Lancement Digital",
    price: 450,
    priceSuffix: "€",
    salesArg:
      "Tout ce qu’il faut pour démarrer votre présence en ligne — idéal pour les nouveaux commerces.",
    features: [
      "Site vitrine One-Page professionnel",
      "Configuration Email Pro",
      "Lien WhatsApp / Réservation intégré",
      "Optimisé mobile et référencé sur Google",
    ],
    cta: "Lancer mon activité",
    featured: true,
  },
  {
    id: "partenaire",
    icon: Handshake,
    name: "Récurrente",
    subtitle: "Partenaire Digital",
    price: 90,
    priceSuffix: "€ / mois",
    priceRange: "à 120€",
    salesArg:
      "Vous ne vous occupez plus de rien en ligne, vous gérez votre commerce, je gère votre image.",
    features: [
      "Hébergement et maintenance du site",
      "4 visuels réseaux sociaux par mois",
      "Support IT de base (1h/mois)",
      "Mises à jour et sécurité incluses",
    ],
    cta: "Devenir partenaire",
  },
];

function AnimatedPrice({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const spring = useSpring(0, { stiffness: 40, damping: 20, mass: 1 });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      if (numRef.current) {
        numRef.current.textContent = Math.round(v).toString();
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
}

export function Pricing() {
  return (
    <section id="tarifs" className="py-14 sm:py-32 relative">
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-10 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Tarifs
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Des prix clairs,
            <br />
            <span className="text-foreground-muted">sans surprise</span>
          </h2>
        </FadeIn>

        <StaggerContainer
          stagger={0.1}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {packs.map((pack) => (
            <StaggerItem key={pack.id}>
              <GlowCard
                className={
                  pack.featured
                    ? "border-2 border-accent/30 lg:scale-[1.03] relative z-10"
                    : ""
                }
              >
                <div className="p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent">
                      <pack.icon size={20} strokeWidth={1.8} />
                    </div>
                    {pack.badge && (
                      <Badge variant="accent">{pack.badge}</Badge>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold">
                    {pack.name}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    {pack.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl sm:text-4xl font-bold text-accent">
                      <AnimatedPrice
                        value={pack.price}
                        suffix={pack.priceSuffix}
                      />
                    </span>
                  </div>
                  {pack.priceRange && (
                    <p className="text-sm text-foreground-subtle mb-4">
                      {pack.priceRange}
                    </p>
                  )}
                  {!pack.priceRange && <div className="mb-4" />}

                  <div className="border-t border-border/50 my-4" />

                  <ul className="space-y-3 flex-1">
                    {pack.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 text-accent mt-0.5 shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-foreground-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-foreground-subtle italic mt-4 leading-relaxed">
                    {pack.salesArg}
                  </p>

                  <div className="mt-6">
                    <Button
                      size="lg"
                      href="#contact"
                      variant={pack.featured ? "primary" : "secondary"}
                      className="w-full justify-center"
                    >
                      {pack.featured && <Sparkles size={16} />}
                      {pack.cta}
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="mt-6 sm:mt-10 text-center">
          <p className="text-sm text-foreground-muted">
            D&apos;autres prestations disponibles sur demande.{" "}
            <strong className="text-foreground">
              Devis gratuit sous 24h.
            </strong>{" "}
            Maquette offerte pour tout projet web.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
