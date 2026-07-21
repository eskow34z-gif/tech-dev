"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, AnimatePresence } from "framer-motion";
import {
  Palette,
  Monitor,
  Globe,
  Rocket,
  Check,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlowCard,
  SectionDivider,
} from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PriceItem {
  label: string;
  price: string;
  value?: number;
  prefix?: string;
  suffix?: string;
}

const pricingCards = [
  {
    icon: Palette,
    title: "Design Graphique",
    items: [
      { label: "Flyer / Affiche", price: "40€", value: 40, suffix: "€" },
      {
        label: "Visuel réseaux sociaux",
        price: "25€ / unité (pack 5 : 100€)",
        value: 25,
        suffix: "€",
      },
      { label: "Carte de visite", price: "50€", value: 50, suffix: "€" },
      { label: "Création de logo", price: "150€", value: 150, suffix: "€" },
      {
        label: "Menu / Carte restaurant",
        price: "70€",
        value: 70,
        suffix: "€",
      },
      {
        label: "Habillage réseaux sociaux",
        price: "80€",
        value: 80,
        suffix: "€",
      },
      {
        label: "Forfait mensuel (8 visuels/mois)",
        price: "150€/mois",
        value: 150,
        suffix: "€/mois",
      },
    ] as PriceItem[],
  },
  {
    icon: Monitor,
    title: "Informatique",
    items: [
      {
        label: "Installation & config PC",
        price: "À partir de 45€",
        value: 45,
        prefix: "À partir de ",
        suffix: "€",
      },
      {
        label: "E-mail professionnel",
        price: "60€/an",
        value: 60,
        suffix: "€/an",
      },
      {
        label: "Dépannage & réparation",
        price: "À partir de 45€",
        value: 45,
        prefix: "À partir de ",
        suffix: "€",
      },
      {
        label: "Sauvegarde données",
        price: "50€",
        value: 50,
        suffix: "€",
      },
      {
        label: "Installation réseau",
        price: "À partir de 80€",
        value: 80,
        prefix: "À partir de ",
        suffix: "€",
      },
      {
        label: "Mise en place caisse / TPE",
        price: "Sur devis",
      },
      {
        label: "Maintenance & assistance",
        price: "À partir de 35€/mois",
        value: 35,
        prefix: "À partir de ",
        suffix: "€/mois",
      },
    ] as PriceItem[],
  },
  {
    icon: Globe,
    title: "Création Web",
    items: [
      {
        label: "Site vitrine (1 page)",
        price: "À partir de 350€",
        value: 350,
        prefix: "À partir de ",
        suffix: "€",
      },
      {
        label: "Site vitrine (3-5 pages)",
        price: "À partir de 500€",
        value: 500,
        prefix: "À partir de ",
        suffix: "€",
      },
      {
        label: "Boutique en ligne",
        price: "À partir de 800€",
        value: 800,
        prefix: "À partir de ",
        suffix: "€",
      },
      {
        label: "Refonte de site",
        price: "À partir de 250€",
        value: 250,
        prefix: "À partir de ",
        suffix: "€",
      },
      {
        label: "Fiche Google My Business",
        price: "60€",
        value: 60,
        suffix: "€",
      },
    ] as PriceItem[],
  },
];

const packFeatures = [
  "Logo professionnel",
  "Carte de visite",
  "Fiche Google My Business",
  "5 visuels réseaux sociaux",
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

function PriceDisplay({ item }: { item: PriceItem }) {
  if (item.value !== undefined) {
    return (
      <AnimatedPrice
        value={item.value}
        prefix={item.prefix}
        suffix={item.suffix}
      />
    );
  }
  return <span>{item.price}</span>;
}

export function Pricing() {
  const [showDetails, setShowDetails] = useState(false);

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

        <FadeIn delay={0.1} className="mb-8 sm:mb-12">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-[var(--bg-surface)] to-[#3B82F6]/5 p-6 sm:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3B82F6]/6 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-accent/15 text-accent">
                    <Rocket size={20} />
                  </div>
                  <Badge variant="accent">Populaire</Badge>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  Pack Lancement Commerce
                </h3>
                <div className="flex items-baseline gap-2 justify-center lg:justify-start mb-3">
                  <span className="text-4xl sm:text-5xl font-bold text-accent tabular-nums">
                    350€
                  </span>
                  <span className="text-foreground-subtle line-through text-lg">
                    650€
                  </span>
                </div>
                <p className="text-foreground-muted max-w-md text-sm sm:text-base">
                  Tout ce qu&apos;il faut pour démarrer votre présence en ligne
                  — idéal pour les nouveaux commerces.
                </p>
              </div>

              <div className="flex-shrink-0">
                <ul className="space-y-2 sm:space-y-3">
                  {packFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/15 text-accent">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 sm:mt-6">
                  <Button size="lg">
                    <a href="#contact" className="flex items-center gap-2">
                      <Sparkles size={16} />
                      Profiter du pack
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Mobile: collapsible details */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-accent border border-accent/20 rounded-[var(--radius-lg)] bg-accent/5 hover:bg-accent/10 transition-colors"
          >
            {showDetails ? "Masquer les tarifs détaillés" : "Voir tous les tarifs détaillés"}
            <motion.div animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </div>

        {/* Desktop: always visible */}
        <div className="hidden lg:block">
          <StaggerContainer
            stagger={0.1}
            className="grid grid-cols-3 gap-6"
          >
            {pricingCards.map((card) => (
              <StaggerItem key={card.title}>
                <GlowCard className="h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent">
                        <card.icon size={20} strokeWidth={1.8} />
                      </div>
                      <h3 className="text-xl font-semibold">{card.title}</h3>
                    </div>
                    <div className="space-y-0">
                      {card.items.map((item, i) => (
                        <div
                          key={item.label}
                          className={`flex items-center justify-between gap-4 py-3.5 ${
                            i < card.items.length - 1
                              ? "border-b border-border/50"
                              : ""
                          }`}
                        >
                          <span className="text-sm text-foreground-muted">
                            {item.label}
                          </span>
                          <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                            <PriceDisplay item={item} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Mobile: collapsible pricing cards */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="space-y-4 pb-4">
                {pricingCards.map((card) => (
                  <GlowCard key={card.title}>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-accent/10 text-accent">
                          <card.icon size={16} strokeWidth={1.8} />
                        </div>
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                      </div>
                      <div className="space-y-0">
                        {card.items.map((item, i) => (
                          <div
                            key={item.label}
                            className={`flex items-center justify-between gap-3 py-2.5 ${
                              i < card.items.length - 1
                                ? "border-b border-border/50"
                                : ""
                            }`}
                          >
                            <span className="text-xs text-foreground-muted">
                              {item.label}
                            </span>
                            <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                              <PriceDisplay item={item} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
