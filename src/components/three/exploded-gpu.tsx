"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const gpuParts = [
  // PCB Board (main body)
  { geo: "box", args: [3, 0.08, 1.8], color: "#1a472a", emissive: "#0a2615", offset: [0, 0, 0] },
  // GPU Die (center chip)
  { geo: "box", args: [0.8, 0.15, 0.8], color: "#5E6AD2", emissive: "#5E6AD2", offset: [0, 0.12, 0] },
  // Heat spreader
  { geo: "box", args: [1, 0.06, 1], color: "#888888", emissive: "#444444", offset: [0, 0.22, 0] },
  // Heatsink fins (top)
  { geo: "box", args: [2.8, 0.8, 1.6], color: "#333333", emissive: "#1a1a1a", offset: [0, 0.7, 0] },
  // Fan 1
  { geo: "cylinder", args: [0.5, 0.5, 0.1, 32], color: "#222222", emissive: "#111111", offset: [-0.8, 1.2, 0] },
  // Fan 2
  { geo: "cylinder", args: [0.5, 0.5, 0.1, 32], color: "#222222", emissive: "#111111", offset: [0.8, 1.2, 0] },
  // VRAM chips (left row)
  { geo: "box", args: [0.2, 0.08, 0.2], color: "#1a1a2e", emissive: "#3B82F6", offset: [-0.8, 0.08, -0.5] },
  { geo: "box", args: [0.2, 0.08, 0.2], color: "#1a1a2e", emissive: "#3B82F6", offset: [-0.8, 0.08, 0] },
  { geo: "box", args: [0.2, 0.08, 0.2], color: "#1a1a2e", emissive: "#3B82F6", offset: [-0.8, 0.08, 0.5] },
  // VRAM chips (right row)
  { geo: "box", args: [0.2, 0.08, 0.2], color: "#1a1a2e", emissive: "#3B82F6", offset: [0.8, 0.08, -0.5] },
  { geo: "box", args: [0.2, 0.08, 0.2], color: "#1a1a2e", emissive: "#3B82F6", offset: [0.8, 0.08, 0] },
  { geo: "box", args: [0.2, 0.08, 0.2], color: "#1a1a2e", emissive: "#3B82F6", offset: [0.8, 0.08, 0.5] },
  // VRM (power delivery)
  { geo: "box", args: [0.15, 0.12, 0.15], color: "#2a2a2a", emissive: "#F59E0B", offset: [-1.2, 0.1, -0.6] },
  { geo: "box", args: [0.15, 0.12, 0.15], color: "#2a2a2a", emissive: "#F59E0B", offset: [-1.2, 0.1, -0.3] },
  { geo: "box", args: [0.15, 0.12, 0.15], color: "#2a2a2a", emissive: "#F59E0B", offset: [-1.2, 0.1, 0] },
  // PCI-E connector
  { geo: "box", args: [2.5, 0.15, 0.12], color: "#F59E0B", emissive: "#F59E0B", offset: [0, -0.1, -0.9] },
  // Power connector
  { geo: "box", args: [0.4, 0.15, 0.2], color: "#222222", emissive: "#111111", offset: [1.3, 0.15, 0.8] },
] as const;

export function ExplodedGpu({ scrollProgress }: { scrollProgress: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const partsRef = useRef<THREE.Mesh[]>([]);

  const explodeDirections = useMemo(() => {
    return gpuParts.map((_, i) => {
      const angle = (i / gpuParts.length) * Math.PI * 2;
      const ySpread = i < 4 ? (i - 1.5) * 1.5 : (Math.random() - 0.5) * 3;
      return new THREE.Vector3(
        Math.cos(angle) * (1 + Math.random()),
        ySpread,
        Math.sin(angle) * (1 + Math.random())
      );
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;

    // Map scroll to explosion progress (0 = assembled, 1 = exploded)
    // Explode between scroll 55-70%
    const scrollT = scrollProgress.current;
    const explodeT = Math.max(0, Math.min(1, (scrollT - 0.58) / 0.1));
    const eased = explodeT * explodeT * (3 - 2 * explodeT);

    partsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const part = gpuParts[i];
      const dir = explodeDirections[i];
      mesh.position.set(
        part.offset[0] + dir.x * eased * 2,
        part.offset[1] + dir.y * eased * 2,
        part.offset[2] + dir.z * eased * 2
      );
      mesh.rotation.x = eased * dir.x * 0.5;
      mesh.rotation.z = eased * dir.z * 0.5;
    });
  });

  return (
    <group ref={groupRef} position={[0, -74, 0]} scale={1.2}>
      {gpuParts.map((part, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) partsRef.current[i] = el; }}
          position={part.offset as unknown as [number, number, number]}
        >
          {part.geo === "box" && (
            <boxGeometry args={part.args as [number, number, number]} />
          )}
          {part.geo === "cylinder" && (
            <cylinderGeometry args={part.args as [number, number, number, number]} />
          )}
          <meshStandardMaterial
            color={part.color}
            emissive={part.emissive}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
      {/* Circuit traces glow */}
      <CircuitTraces />
    </group>
  );
}

function CircuitTraces() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#22C55E" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}
