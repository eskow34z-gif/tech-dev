"use client";

import { lazy, Suspense } from "react";

const GlobalCanvas = lazy(() =>
  import("./global-canvas").then((m) => ({ default: m.GlobalCanvas }))
);

export function Scene3D() {
  return (
    <Suspense fallback={null}>
      <GlobalCanvas />
    </Suspense>
  );
}
