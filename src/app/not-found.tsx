import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <div className="text-center">
        <a href="/" className="inline-flex items-center gap-3 mb-10">
          <Image
            src="/logo-icon-light.svg"
            alt="TECH&DEV"
            width={44}
            height={37}
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
        <p className="text-8xl font-bold text-accent mb-4">404</p>
        <h1 className="text-2xl font-semibold mb-3">Page introuvable</h1>
        <p className="text-foreground-muted mb-8 max-w-sm mx-auto">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Button variant="outline" href="/">
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}
