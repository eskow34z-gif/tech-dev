import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AppShell } from "@/components/app-shell";
import { CookieBanner } from "@/components/cookie-banner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#020203",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "TECH&DEV | Agence Web Premium — Paris",
    template: "%s | TECH&DEV",
  },
  description:
    "TECH&DEV Solutions Numériques — Informatique, création web et design graphique pour les commerces, artisans et indépendants en Île-de-France.",
  keywords: [
    "informatique",
    "création web",
    "design graphique",
    "site vitrine",
    "dépannage PC",
    "réseau",
    "Île-de-France",
    "Paris",
    "freelance",
  ],
  authors: [{ name: "TECH&DEV" }],
  creator: "TECH&DEV",
  publisher: "TECH&DEV",
  metadataBase: new URL("https://techanddev.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TECH&DEV | Agence Web Premium — Paris",
    description:
      "Informatique, création web et design graphique pour les commerces, artisans et indépendants en Île-de-France.",
    type: "website",
    locale: "fr_FR",
    siteName: "TECH&DEV",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TECH&DEV | Agence Web Premium",
    description:
      "Informatique, création web et design graphique en Île-de-France.",
    creator: "@techanddev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TECH&DEV",
  description:
    "Informatique, création web et design graphique pour les commerces, artisans et indépendants en Île-de-France.",
  url: "https://techanddev.fr",
  logo: "https://techanddev.fr/logo-full.svg",
  image: "https://techanddev.fr/logo-icon.svg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  priceRange: "€-€€",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 48.8566, longitude: 2.3522 },
  },
  knowsAbout: [
    "Web Development",
    "UI/UX Design",
    "React",
    "Next.js",
    "TypeScript",
    "Design System",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <SmoothScroll />
        <AppShell>
          {children}
        </AppShell>
        <CookieBanner />
      </body>
    </html>
  );
}
