"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useIsDesktop } from "@/hooks/use-is-desktop";

const Scene3D = dynamic(
  () => import("./three/scene-3d").then((m) => m.Scene3D),
  { ssr: false }
);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDesktop = useIsDesktop();

  return (
    <>
      {isHome && isDesktop && <Scene3D />}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
