import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TECH&DEV — Agence Web Premium",
    short_name: "TECH&DEV",
    description:
      "Expériences digitales d'exception. Design UI/UX premium et développement sur-mesure.",
    start_url: "/",
    display: "standalone",
    background_color: "#020203",
    theme_color: "#020203",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
