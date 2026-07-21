"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current || !wireRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15 + pointer.y * 0.3;
    meshRef.current.rotation.y = t * 0.2 + pointer.x * 0.3;
    wireRef.current.rotation.x = t * 0.15 + pointer.y * 0.3;
    wireRef.current.rotation.y = t * 0.2 + pointer.x * 0.3;
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.2, 0.35, 200, 32]} />
          <MeshDistortMaterial
            color="#5E6AD2"
            emissive="#5E6AD2"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.8}
            distort={0.2}
            speed={2}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh ref={wireRef}>
          <torusKnotGeometry args={[1.22, 0.36, 200, 32]} />
          <meshBasicMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 300 }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.02;
    points.current.rotation.x = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#5E6AD2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalRings() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={group}>
      {[1.8, 2.3, 2.8].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[radius, 0.005, 16, 100]} />
          <meshBasicMaterial
            color="#5E6AD2"
            transparent
            opacity={0.12 - i * 0.03}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} color="#3B82F6" intensity={0.5} />
        <pointLight position={[3, -3, 2]} color="#5E6AD2" intensity={0.4} />

        <FloatingCore />
        <Particles />
        <OrbitalRings />
      </Canvas>
    </div>
  );
}
