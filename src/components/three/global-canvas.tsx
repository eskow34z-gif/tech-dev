"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { Canvas, invalidate } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { SceneController } from "./scene-controller";
import {
  CpuCore,
  DataVortex,
  CrystalGrid,
  ParticleField,
  NeuralNetwork,
  DataTunnel,
  EnergySphere,
  FloatingGrid,
  SceneLighting,
} from "./environment-objects";
import { LiquidSphere, HolographicScreen } from "./shaders";
import { ExplodedGpu } from "./exploded-gpu";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export function GlobalCanvas() {
  const scrollProgress = useRef(0);
  const isMobile = useIsMobile();

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.current = Math.max(0, Math.min(1, scrollTop / docHeight));
    if (isMobile) invalidate();
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 200 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        frameloop={isMobile ? "demand" : "always"}
        style={{ background: "transparent" }}
        eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
        eventPrefix="client"
      >
        <SceneController scrollProgress={scrollProgress} />
        <SceneLighting />

        {/* Hero zone — CPU */}
        <CpuCore />

        {/* Mobile: only essential objects */}
        {!isMobile && (
          <>
            {/* Services zone — Data Vortex */}
            <DataVortex />

            {/* Pricing zone — Crystal formations */}
            <CrystalGrid />

            {/* Testimonials — Liquid Sphere */}
            <LiquidSphere position={[4, -58, -2]} />

            {/* Expertise — Exploded GPU */}
            <ExplodedGpu scrollProgress={scrollProgress} />

            {/* Holographic floating screens */}
            <HolographicScreen position={[-6, -42, -4]} rotation={[0, 0.4, 0]} scale={[4, 2.5, 1]} />
            <HolographicScreen position={[6, -56, -3]} rotation={[0, -0.3, 0.05]} scale={[3, 2, 1]} />
            <HolographicScreen position={[-5, -90, -2]} rotation={[0.1, 0.5, 0]} scale={[3.5, 2, 1]} />

            {/* Process — Data Tunnel */}
            <DataTunnel />

            {/* CTA — Energy Sphere */}
            <EnergySphere />
          </>
        )}

        {/* Projects zone — Particle field (lighter, OK on mobile) */}
        <ParticleField />

        {/* Testimonials — Neural Network */}
        <NeuralNetwork />

        {/* Contact — Floating Grid floor */}
        <FloatingGrid />

        {/* Post-Processing */}
        <EffectComposer enabled={!isMobile}>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0006, 0.0006]}
            radialModulation={true}
            modulationOffset={0.4}
          />
          <Noise
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={0.12}
          />
          <Vignette
            darkness={0.5}
            offset={0.3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
