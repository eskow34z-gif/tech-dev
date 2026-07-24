"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Preloader } from "./preloader";
import { Scene3D } from "./three/scene-3d";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [loaded, setLoaded] = useState(!isHome);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && isHome && <Preloader onComplete={handleComplete} />}
      {isHome && <Scene3D />}
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
