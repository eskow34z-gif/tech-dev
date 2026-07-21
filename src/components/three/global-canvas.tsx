"use client";

import { useRef, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
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

export function GlobalCanvas() {
  const scrollProgress = useRef(0);
  const scrollHeight = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.current = Math.max(0, Math.min(1, scrollTop / docHeight));
  }, []);

  useEffect(() => {
    scrollHeight.current = document.documentElement.scrollHeight - window.innerHeight;
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
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        eventSource={typeof document !== "undefined" ? document.documentElement : undefined}
        eventPrefix="client"
      >
        <SceneController scrollProgress={scrollProgress} />
        <SceneLighting />

        {/* Hero zone — CPU */}
        <CpuCore />

        {/* Services zone — Data Vortex */}
        <DataVortex />

        {/* Pricing zone — Crystal formations */}
        <CrystalGrid />

        {/* Projects zone — Particle field */}
        <ParticleField />

        {/* Testimonials — Neural Network */}
        <NeuralNetwork />

        {/* Process — Data Tunnel */}
        <DataTunnel />

        {/* CTA — Energy Sphere */}
        <EnergySphere />

        {/* Contact — Floating Grid floor */}
        <FloatingGrid />

        {/* Post-Processing */}
        <EffectComposer>
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
            opacity={0.15}
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
