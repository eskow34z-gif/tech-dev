export const SITE = {
  name: "TECH&DEV",
  tagline: "Solutions Numériques",
  url: "https://techanddev.fr",
  email: "contact-td.agence@proton.me",
  locale: "fr_FR",
} as const;

export const SOCIAL = {
  instagram: {
    url: "https://instagram.com/td.agence",
    handle: "@td.agence",
  },
  tiktok: {
    url: "https://tiktok.com/@techdev.agence",
    handle: "@techdev.agence",
  },
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
