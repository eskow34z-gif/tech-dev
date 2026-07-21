"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const liquidVertexShader = `
  uniform float uTime;
  uniform float uDistortion;
  varying vec2 vUv;
  varying float vDisplacement;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float displacement = snoise(pos * 1.5 + uTime * 0.5) * uDistortion;
    pos += normal * displacement;
    vDisplacement = displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const liquidFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uColor2;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    float mix_factor = (vDisplacement + 0.5) * 0.5 + sin(vUv.x * 6.28 + uTime) * 0.15;
    vec3 color = mix(uColor, uColor2, clamp(mix_factor, 0.0, 1.0));
    float fresnel = pow(1.0 - abs(dot(vec3(0.0, 0.0, 1.0), normalize(vec3(vUv - 0.5, 1.0)))), 2.0);
    color += fresnel * 0.3;
    float alpha = 0.6 + fresnel * 0.3;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function LiquidSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: 0.3 },
      uColor: { value: new THREE.Color("#5E6AD2") },
      uColor2: { value: new THREE.Color("#3B82F6") },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1.2, 64]} />
      <shaderMaterial
        vertexShader={liquidVertexShader}
        fragmentShader={liquidFragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

// ─── Holographic Glitch Plane (for floating screens) ─────

const glitchVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glitchFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // Scanlines
    float scanline = sin(uv.y * 300.0 + uTime * 5.0) * 0.04;

    // Glitch offset
    float glitchStrength = step(0.98, random(vec2(floor(uTime * 10.0), 0.0)));
    float glitchOffset = (random(vec2(floor(uv.y * 20.0), floor(uTime * 10.0))) - 0.5) * 0.08 * glitchStrength;
    uv.x += glitchOffset;

    // Grid pattern (simulating data/code)
    float gridX = step(0.95, fract(uv.x * 20.0));
    float gridY = step(0.95, fract(uv.y * 15.0));
    float grid = max(gridX, gridY) * 0.15;

    // Data flow lines
    float flow = step(0.7, random(vec2(floor(uv.x * 30.0), floor(uv.y * 30.0 - uTime * 3.0)))) * 0.3;

    // Edge glow
    float edgeX = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
    float edgeY = smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);
    float edge = 1.0 - edgeX * edgeY;

    vec3 color = uColor * (0.15 + grid + flow + scanline);
    color += uColor * edge * 0.5;

    float alpha = 0.3 + grid * 0.3 + flow * 0.2 + edge * 0.4;
    alpha *= edgeX * edgeY + edge * 0.3;

    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

export function HolographicScreen({ position, rotation, scale }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#5E6AD2") },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation || [0, 0, 0]}
      scale={scale || [3, 2, 1]}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={glitchVertexShader}
        fragmentShader={glitchFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
