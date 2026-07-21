"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Hero CPU Core ─────────────────────────────────────────
export function CpuCore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!coreRef.current || !wireRef.current) return;
    const t = clock.getElapsedTime();
    coreRef.current.rotation.x = t * 0.12 + pointer.y * 0.2;
    coreRef.current.rotation.y = t * 0.18 + pointer.x * 0.2;
    wireRef.current.rotation.copy(coreRef.current.rotation);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Main CPU body */}
        <mesh ref={coreRef}>
          <boxGeometry args={[2.2, 0.4, 2.2, 8, 2, 8]} />
          <MeshDistortMaterial
            color="#5E6AD2"
            emissive="#5E6AD2"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
            distort={0.08}
            speed={1.5}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={wireRef}>
          <boxGeometry args={[2.25, 0.45, 2.25, 8, 2, 8]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.2} />
        </mesh>
        {/* Circuit traces — pins emanating from CPU */}
        <CpuPins />
      </Float>
      {/* Floating particles around CPU */}
      <HeroParticles />
      {/* Orbital rings */}
      <OrbitalRings />
    </group>
  );
}

function CpuPins() {
  const pins = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: [number, number, number] }[] = [];
    const sides = [
      { axis: "x", sign: 1 },
      { axis: "x", sign: -1 },
      { axis: "z", sign: 1 },
      { axis: "z", sign: -1 },
    ];
    sides.forEach((side) => {
      for (let i = 0; i < 6; i++) {
        const offset = -1 + i * 0.4;
        const pos: [number, number, number] = [0, 0, 0];
        const scale: [number, number, number] = [0.02, 0.02, 0.5];
        if (side.axis === "x") {
          pos[0] = side.sign * (1.1 + 0.25);
          pos[2] = offset;
          scale[0] = 0.5;
          scale[2] = 0.02;
        } else {
          pos[2] = side.sign * (1.1 + 0.25);
          pos[0] = offset;
        }
        arr.push({ pos, scale });
      }
    });
    return arr;
  }, []);

  return (
    <group>
      {pins.map((pin, i) => (
        <mesh key={i} position={pin.pos} scale={pin.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#3B82F6"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function HeroParticles({ count = 500 }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    ref.current.rotation.x = clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#5E6AD2" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function OrbitalRings() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.04;
  });

  return (
    <group ref={ref}>
      {[2.2, 2.8, 3.4].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.25, i * 0.4, 0]}>
          <torusGeometry args={[radius, 0.006, 16, 120]} />
          <meshBasicMaterial color="#5E6AD2" transparent opacity={0.1 - i * 0.025} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Data Vortex (Services section) ───────────────────────
export function DataVortex() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#5E6AD2"),
      new THREE.Color("#3B82F6"),
      new THREE.Color("#22C55E"),
      new THREE.Color("#F59E0B"),
    ];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 8;
      const radius = 1 + (i / count) * 4;
      const height = (i / count) * 6 - 3;
      pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = height + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.5;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group position={[0, -14, 0]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

// ─── Crystal Grid (Pricing section) ──────────────────────
export function CrystalGrid() {
  const ref = useRef<THREE.Group>(null);

  const crystals = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; color: string }[] = [];
    for (let i = 0; i < 25; i++) {
      arr.push({
        pos: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 10 - 3,
        ],
        scale: 0.08 + Math.random() * 0.15,
        color: ["#5E6AD2", "#3B82F6", "#8B5CF6"][i % 3],
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      child.rotation.y = clock.getElapsedTime() * 0.3 + i;
      child.rotation.x = clock.getElapsedTime() * 0.2 + i * 0.5;
      child.position.y += Math.sin(clock.getElapsedTime() + i) * 0.002;
    });
  });

  return (
    <group ref={ref} position={[0, -30, 0]}>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Particle Field (Projects section) ───────────────────
export function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <group position={[0, -46, 0]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#EC4899" transparent opacity={0.4} sizeAttenuation />
      </points>
    </group>
  );
}

// ─── Neural Network (Testimonials / MCP section) ─────────
export function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 40;

  const { nodes, edges } = useMemo(() => {
    const n: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      n.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8,
      ]);
    }

    const e: { from: number; to: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const connections = 1 + Math.floor(Math.random() * 2);
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * nodeCount);
        if (target !== i) e.push({ from: i, to: target });
      }
    }
    return { nodes: n, edges: e };
  }, []);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach((edge, i) => {
      const f = nodes[edge.from];
      const t = nodes[edge.to];
      arr[i * 6] = f[0];
      arr[i * 6 + 1] = f[1];
      arr[i * 6 + 2] = f[2];
      arr[i * 6 + 3] = t[0];
      arr[i * 6 + 4] = t[1];
      arr[i * 6 + 5] = t[2];
    });
    return arr;
  }, [edges, nodes]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -60, 0]}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#5E6AD2"
            emissive="#5E6AD2"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5E6AD2" transparent opacity={0.15} />
      </lineSegments>
      {/* Central sphere — "MCP Brain" */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.6}
          distort={0.3}
          speed={3}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// ─── Data Tunnel (Process section) ───────────────────────
export function DataTunnel() {
  const ref = useRef<THREE.Group>(null);
  const ringCount = 16;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const t = clock.getElapsedTime();
      mesh.rotation.z = t * 0.5 + i * 0.2;
      const scale = 1 + Math.sin(t * 2 + i * 0.5) * 0.1;
      mesh.scale.set(scale, scale, 1);
    });
  });

  return (
    <group ref={ref} position={[0, -90, 0]}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh key={i} position={[0, 0, i * 0.8 - (ringCount * 0.4)]}>
          <torusGeometry args={[2 + i * 0.15, 0.015, 16, 64]} />
          <meshBasicMaterial
            color="#5E6AD2"
            transparent
            opacity={0.15 - i * 0.008}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Energy Sphere (CTA section) ─────────────────────────
export function EnergySphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || !outerRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = t * 0.15;
    outerRef.current.rotation.y = -t * 0.2;
    outerRef.current.rotation.z = t * 0.1;
    const pulse = 1 + Math.sin(t * 2) * 0.05;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={[0, -106, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#5E6AD2"
          emissive="#3B82F6"
          emissiveIntensity={0.8}
          distort={0.25}
          speed={4}
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial color="#5E6AD2" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

// ─── Ambient floating grid ───────────────────────────────
export function FloatingGrid() {
  const ref = useRef<THREE.Group>(null);

  const gridLines = useMemo(() => {
    const positions: number[] = [];
    const size = 30;
    const divisions = 30;
    const step = size / divisions;
    for (let i = 0; i <= divisions; i++) {
      const offset = -size / 2 + i * step;
      positions.push(-size / 2, 0, offset, size / 2, 0, offset);
      positions.push(offset, 0, -size / 2, offset, 0, size / 2);
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = -130;
  });

  return (
    <group ref={ref} position={[0, -130, 0]} rotation={[0, 0, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[gridLines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5E6AD2" transparent opacity={0.04} />
      </lineSegments>
    </group>
  );
}

// ─── Global ambient lighting ─────────────────────────────
export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-8, -20, 5]} color="#3B82F6" intensity={0.6} distance={30} />
      <pointLight position={[6, -50, 3]} color="#5E6AD2" intensity={0.5} distance={30} />
      <pointLight position={[0, -80, 8]} color="#8B5CF6" intensity={0.4} distance={30} />
      <pointLight position={[-4, -110, 4]} color="#3B82F6" intensity={0.6} distance={30} />
      <fog attach="fog" args={["#020203", 8, 40]} />
    </>
  );
}
