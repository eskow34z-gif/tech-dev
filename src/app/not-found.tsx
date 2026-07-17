import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-bold text-accent mb-4">404</p>
        <h1 className="text-2xl font-semibold mb-3">Page introuvable</h1>
        <p className="text-foreground-muted mb-8 max-w-sm mx-auto">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Button variant="outline">
          <a href="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Retour à l&apos;accueil
          </a>
        </Button>
      </div>
    </div>
  );
}
