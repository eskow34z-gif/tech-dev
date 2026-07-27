"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Globe,
  Palette,
  Wrench,
  Mail,
  HardDrive,
  Wifi,
  CreditCard,
  Headphones,
  ShoppingCart,
  Nfc,
  RefreshCw,
  MapPin,
  FileImage,
  Contact,
  Share2,
  UtensilsCrossed,
  Image,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FadeIn,
  GlowCard,
  SectionDivider,
} from "@/components/ui/motion";

const tabs = [
  {
    id: "informatique",
    label: "Informatique",
    icon: Monitor,
    subtitle: "Pour les pros et les particuliers.",
    services: [
      {
        icon: Monitor,
        title: "Installation & configuration PC",
        description:
          "Vous recevez un PC neuf ou d'occasion ? Je le configure, installe vos logiciels et le sécurise — prêt à l'emploi.",
      },
      {
        icon: Mail,
        title: "E-mail professionnel",
        description:
          "Fini les @gmail.com — passez à contact@votreboutique.fr pour une image sérieuse auprès de vos clients.",
      },
      {
        icon: Wrench,
        title: "Dépannage & réparation",
        description:
          "PC lent, écran bleu, virus ? Diagnostic gratuit par e-mail, intervention rapide sur place ou à distance.",
      },
      {
        icon: HardDrive,
        title: "Sauvegarde de données",
        description:
          "Vos photos, factures, fichiers clients en sécurité — sauvegarde locale ou cloud, avec restauration en cas de problème.",
      },
      {
        icon: Wifi,
        title: "Installation réseau",
        description:
          "Wi-Fi fiable dans tout votre local, câblage, imprimante partagée — tout branché, tout sécurisé.",
      },
      {
        icon: CreditCard,
        title: "Mise en place caisse / TPE",
        description:
          "Installation et configuration de votre système de caisse et terminal de paiement.",
      },
      {
        icon: Headphones,
        title: "Maintenance & assistance",
        description:
          "Un forfait mensuel pour être votre interlocuteur informatique au quotidien — interventions illimitées, tranquillité assurée.",
      },
      {
        icon: Nfc,
        title: "Carte NFC avis Google",
        description:
          "Une carte NFC que vos clients tapotent avec leur téléphone pour laisser un avis Google instantanément. Bientôt disponible.",
        badge: "Bientôt",
      },
    ],
  },
  {
    id: "web",
    label: "Création Web",
    icon: Globe,
    subtitle: "Des sites qui vous ressemblent.",
    services: [
      {
        icon: Globe,
        title: "Site vitrine",
        description:
          "Un site moderne qui montre qui vous êtes, vos services, vos horaires, et comment vous contacter — visible sur Google.",
      },
      {
        icon: ShoppingCart,
        title: "Boutique en ligne",
        description:
          "Vendez vos produits 24h/24 avec un site e-commerce simple à gérer, paiement sécurisé inclus.",
      },
      {
        icon: RefreshCw,
        title: "Refonte de site",
        description:
          "Votre site a vieilli ? Je le modernise avec un design actuel, rapide sur mobile, et optimisé pour Google.",
      },
      {
        icon: MapPin,
        title: "Fiche Google My Business",
        description:
          "Apparaissez sur Google Maps quand vos clients cherchent un commerce près de chez eux. Création, optimisation et photos.",
      },
    ],
    note: "Maquette offerte avant tout engagement — visualisez votre futur site avant de vous décider.",
  },
  {
    id: "design",
    label: "Design Graphique",
    icon: Palette,
    subtitle: "Une image qui marque.",
    note: "Maquette offerte — visualisez vos visuels avant de vous engager.",
    services: [
      {
        icon: Palette,
        title: "Création de logo",
        description:
          "Un logo professionnel qui représente votre activité — livré en HD + formats pour impression et web. 2 propositions, 3 révisions incluses.",
      },
      {
        icon: FileImage,
        title: "Flyers & affiches",
        description:
          "Des visuels impactants pour annoncer vos promos, ouvertures, événements — prêts à imprimer.",
      },
      {
        icon: Contact,
        title: "Cartes de visite",
        description:
          "Un design professionnel recto-verso, prêt à envoyer à l'imprimeur.",
      },
      {
        icon: Share2,
        title: "Visuels réseaux sociaux",
        description:
          "Des publications Instagram, Facebook et TikTok qui attirent l'œil et donnent envie de venir chez vous.",
      },
      {
        icon: UtensilsCrossed,
        title: "Menu / Carte restaurant",
        description:
          "Mise en page professionnelle de votre carte ou menu, prête à imprimer ou afficher en ligne.",
      },
      {
        icon: Image,
        title: "Habillage réseaux sociaux",
        description:
          "Bannière Facebook + photo de profil + highlights Instagram — votre présence en ligne cohérente et pro.",
      },
    ],
  },
];

type Service = (typeof tabs)[number]["services"][number];

function ServiceCard({ service, compact }: { service: Service; compact?: boolean }) {
  return (
    <GlowCard className="h-full !bg-[var(--bg-deep)]/90 !border-border/60">
      <div className="group p-5 sm:p-8 h-full">
        <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 text-accent mb-4 sm:mb-5 group-hover:shadow-[var(--shadow-glow)] transition-all duration-300 group-hover:scale-110">
          <service.icon size={20} strokeWidth={1.8} />
        </div>
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <h3 className={`${compact ? "text-base" : "text-base sm:text-lg"} font-semibold group-hover:text-accent transition-colors duration-300`}>
            {service.title}
          </h3>
          {"badge" in service && service.badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[var(--radius-full)] bg-accent/15 text-accent border border-accent/25">
              {service.badge}
            </span>
          )}
        </div>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {service.description}
        </p>
      </div>
    </GlowCard>
  );
}

function DesktopCarousel3D({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = services.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % count) + count) % count);
  }, [count]);

  const handleCardClick = useCallback((index: number) => {
    if (index === activeIndex) return;
    setIsAutoRotating(false);
    goTo(index);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsAutoRotating(true), 6000);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (!isAutoRotating || isHovered) return;
    const speed = 3500;
    const interval = setInterval(() => goTo(activeIndex + 1), speed);
    return () => clearInterval(interval);
  }, [activeIndex, isAutoRotating, isHovered, goTo]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setIsAutoRotating(true);
  }, [services]);

  const getCardStyle = (index: number) => {
    let diff = index - activeIndex;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return {
        transform: `translateX(${diff > 0 ? 160 : -160}%) scale(0.5) rotateY(${diff > 0 ? -50 : 50}deg)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
        filter: "blur(6px)",
      };
    }

    const translateX = diff * 105;
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.85 : 0.7;
    const rotateY = diff * -8;
    const opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.6 : 0.3;
    const z = 10 - absDiff;

    return {
      transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex: z,
      pointerEvents: (absDiff <= 1 ? "auto" : "none") as "auto" | "none",
      filter: absDiff > 1 ? "blur(3px)" : "none",
    };
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative mx-auto overflow-hidden"
        style={{ perspective: "1200px", height: "340px", maxWidth: "900px" }}
      >
        {services.map((service, i) => {
          const style = getCardStyle(i);
          return (
            <div
              key={service.title}
              onClick={() => handleCardClick(i)}
              className="absolute top-0 left-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: "380px",
                marginLeft: "-190px",
                transformStyle: "preserve-3d",
                cursor: i === activeIndex ? "default" : "pointer",
                ...style,
              }}
            >
              <ServiceCard service={service} compact />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => { handleCardClick(activeIndex - 1); }}
          className="w-10 h-10 rounded-full border border-border bg-[var(--bg-surface)] flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
          aria-label="Précédent"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-6 h-2 bg-accent"
                  : "w-2 h-2 bg-border hover:bg-foreground-subtle"
              }`}
              aria-label={`Service ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => { handleCardClick(activeIndex + 1); }}
          className="w-10 h-10 rounded-full border border-border bg-[var(--bg-surface)] flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
          aria-label="Suivant"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function MobileCarousel({ services }: { services: Service[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const cardWidth = el.clientWidth * 0.78 + 12;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.78;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.78 + 12;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="flex-shrink-0 w-[78%] snap-start"
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-3">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="w-8 h-8 rounded-full border border-border bg-[var(--bg-surface)] flex items-center justify-center disabled:opacity-30 transition-opacity"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1.5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 h-1.5 bg-accent"
                  : "w-1.5 h-1.5 bg-border"
              }`}
              aria-label={`Service ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="w-8 h-8 rounded-full border border-border bg-[var(--bg-surface)] flex items-center justify-center disabled:opacity-30 transition-opacity"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const [activeTab, setActiveTab] = useState("informatique");
  const activeData = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="services" className="py-14 sm:py-32 relative bg-[var(--bg-base)]/95 backdrop-blur-lg">
      <SectionDivider className="absolute top-0 left-6 right-6 lg:left-8 lg:right-8" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-10 sm:mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Tout ce qu&apos;il faut pour
            <br />
            <span className="text-foreground-muted">
              développer votre activité
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-8 sm:mb-12">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 rounded-[var(--radius-lg)] border border-border bg-[var(--bg-surface)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-label={tab.label}
                  className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 text-sm font-medium rounded-[var(--radius-md)] transition-colors duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-[var(--radius-md)]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <tab.icon size={16} className="relative z-10" />
                  <span className="relative z-10 hidden sm:inline">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-center text-foreground-muted mb-6 sm:mb-10 text-base sm:text-lg">
              {activeData.subtitle}
            </p>

            <div className="md:hidden">
              <MobileCarousel services={activeData.services} />
            </div>

            <div className="hidden md:block">
              <DesktopCarousel3D services={activeData.services} />
            </div>

            {activeData.note && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 sm:mt-8 text-center"
              >
                <p className="inline-flex items-center gap-2 text-sm text-accent bg-accent/5 border border-accent/15 rounded-[var(--radius-lg)] px-5 py-3">
                  <Sparkles size={14} />
                  {activeData.note}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
