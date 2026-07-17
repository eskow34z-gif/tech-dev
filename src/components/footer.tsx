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
  return (
    <footer className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="sm:col-span-2 lg:col-span-2">
              <a
                href="#"
                className="text-lg font-bold tracking-tight text-foreground"
              >
                TECH<span className="text-accent">&</span>DEV
              </a>
              <p className="text-sm text-foreground-muted mt-4 max-w-sm leading-relaxed">
                Agence web premium spécialisée dans la création d&apos;expériences
                digitales d&apos;exception. Paris, France.
              </p>
            </div>

            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="text-sm font-medium mb-4">{group.title}</p>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-foreground-subtle">
              &copy; {new Date().getFullYear()} TECH&DEV. Tous droits
              réservés.
            </p>
            <p className="text-xs text-foreground-subtle">
              Conçu et développé avec obsession.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
