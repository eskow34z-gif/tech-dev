"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Preloader } from "./preloader";
import { Scene3D } from "./three/scene-3d";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [loaded, setLoaded] = useState(!isHome);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      {!loaded && isHome && <Preloader onComplete={handleComplete} />}
      {isHome && isDesktop && <Scene3D />}
      <div
        className="relative z-10"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
