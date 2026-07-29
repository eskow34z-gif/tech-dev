"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CAMERA_PATH = [
  // Hero — face au CPU, regard frontal
  { pos: [0, 0, 8], target: [0, 0, 0], fov: 60 },
  // Services — plongée dans le vortex de données
  { pos: [0, -12, 6], target: [0, -14, 0], fov: 55 },
  // Pricing — survol des structures cristallines
  { pos: [4, -28, 5], target: [0, -30, 0], fov: 50 },
  // Projects — traversée du champ de particules
  { pos: [-3, -44, 7], target: [0, -46, 0], fov: 55 },
  // Testimonials — orbite autour du réseau neuronal
  { pos: [0, -58, 4], target: [0, -60, 0], fov: 50 },
  // Expertise — vue panoramique
  { pos: [5, -72, 8], target: [0, -74, 0], fov: 60 },
  // Process — tunnel de données
  { pos: [0, -88, 3], target: [0, -92, 0], fov: 45 },
  // CTA — approche de la sphère d'énergie
  { pos: [0, -104, 6], target: [0, -106, 0], fov: 55 },
  // Contact — zoom final
  { pos: [0, -118, 5], target: [0, -120, 0], fov: 50 },
] as const;

function lerpVec3(a: readonly number[], b: readonly number[], t: number): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function lerpScalar(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function SceneController({ scrollProgress }: { scrollProgress: { current: number } }) {
  const { camera } = useThree();
  const targetLook = useRef(new THREE.Vector3());

  useFrame(() => {
    const t = scrollProgress.current;
    const totalSegments = CAMERA_PATH.length - 1;
    const segFloat = t * totalSegments;
    const segIndex = Math.min(Math.floor(segFloat), totalSegments - 1);
    const segT = smoothstep(segFloat - segIndex);

    const from = CAMERA_PATH[segIndex];
    const to = CAMERA_PATH[segIndex + 1];

    const pos = lerpVec3(from.pos, to.pos, segT);
    const target = lerpVec3(from.target, to.target, segT);
    const fov = lerpScalar(from.fov, to.fov, segT);

    camera.position.set(pos[0], pos[1], pos[2]);
    targetLook.current.set(target[0], target[1], target[2]);
    camera.lookAt(targetLook.current);

    if ((camera as THREE.PerspectiveCamera).fov !== fov) {
      (camera as THREE.PerspectiveCamera).fov = fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}
