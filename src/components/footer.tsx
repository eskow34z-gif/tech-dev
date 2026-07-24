"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { FadeIn } from "@/components/ui/motion";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "#services" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Projets", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Informatique", href: "#services" },
      { label: "Création Web", href: "#services" },
      { label: "Design Graphique", href: "#services" },
    ],
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-16 sm:py-20 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-3">
                <Image
                  src="/logo-icon-light.svg"
                  alt="TECH&DEV"
                  width={40}
                  height={34}
                />
                <div className="flex flex-col leading-none">
                  <span className="text-base font-bold tracking-tight text-foreground">
                    TECH<span className="text-accent">&</span>DEV
                  </span>
                  <span className="text-[10px] tracking-[0.15em] text-foreground-subtle uppercase">
                    Solutions Numériques
                  </span>
                </div>
              </a>
              <p className="text-sm text-foreground-muted mt-5 max-w-sm leading-relaxed">
                Informatique, création web et design graphique
                pour les commerces, artisans et indépendants. Île-de-France.
              </p>
              <a
                href="https://instagram.com/techanddev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-foreground-muted hover:text-accent transition-colors duration-200"
              >
                <InstagramIcon size={16} />
                @techanddev
              </a>
            </div>

            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-medium mb-4">{group.title}</p>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <a
                        href={link.href}
                        className="group/link inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 -translate-y-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all duration-200"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs text-foreground-subtle">
                &copy; {new Date().getFullYear()} TECH&DEV Solutions Numériques.
                Tous droits réservés.
              </p>
              <a
                href="/mentions-legales"
                className="text-xs text-foreground-subtle hover:text-accent transition-colors duration-200"
              >
                Mentions légales
              </a>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-xs text-foreground-subtle">
                Innover. Développer. Réussir.
              </p>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -2 }}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground-subtle hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
                aria-label="Retour en haut"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
