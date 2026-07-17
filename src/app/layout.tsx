import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "TECH&DEV | Agence Web Premium",
  description:
    "TECH&DEV conçoit des expériences digitales d'exception. Développement web sur-mesure, design UI/UX premium, performance et innovation.",
  keywords: [
    "agence web",
    "développement web",
    "UI/UX design",
    "Next.js",
    "React",
    "France",
  ],
  openGraph: {
    title: "TECH&DEV | Agence Web Premium",
    description:
      "Expériences digitales d'exception. Design premium et développement sur-mesure.",
    type: "website",
    locale: "fr_FR",
    siteName: "TECH&DEV",
  },
  twitter: {
    card: "summary_large_image",
    title: "TECH&DEV | Agence Web Premium",
    description:
      "Expériences digitales d'exception. Design premium et développement sur-mesure.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="min-h-dvh flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
