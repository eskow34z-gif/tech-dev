"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "#services" },
      { label: "Projets", href: "#projects" },
      { label: "Expertise", href: "#expertise" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Design UI/UX", href: "#services" },
      { label: "Développement Web", href: "#services" },
      { label: "Design System", href: "#services" },
      { label: "SEO Technique", href: "#services" },
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
              <a
                href="#"
                className="text-lg font-bold tracking-tight text-foreground"
              >
                TECH<span className="text-accent">&</span>DEV
              </a>
              <p className="text-sm text-foreground-muted mt-4 max-w-sm leading-relaxed">
                Agence web premium spécialisée dans la création
                d&apos;expériences digitales d&apos;exception. Paris, France.
              </p>
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
            <p className="text-xs text-foreground-subtle">
              &copy; {new Date().getFullYear()} TECH&DEV. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-xs text-foreground-subtle">
                Conçu et développé avec obsession.
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
