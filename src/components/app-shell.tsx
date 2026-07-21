"use client";

import { useState, useCallback } from "react";
import { Preloader } from "./preloader";
import { Scene3D } from "./three/scene-3d";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={handleComplete} />}
      <Scene3D />
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
