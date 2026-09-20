"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Interactive Central Core Geometry
function TechCoreMesh({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Subtle mouse tracking tilt
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isMobile ? 1.1 : 1.6}
      >
        <torusKnotGeometry args={[1, 0.35, isMobile ? 64 : 128, isMobile ? 16 : 32]} />
        <MeshDistortMaterial
          color={hovered ? "#34d399" : "#059669"}
          roughness={0.25}
          metalness={0.7}
          distort={hovered ? 0.4 : 0.25}
          speed={2.5}
          wireframe={hovered}
        />
      </mesh>
    </Float>
  );
}

// Particle Constellation Network
function ParticleNetwork({ particleCount }: { particleCount: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#10b981"
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

export function HeroScene() {
  const [deviceQuality, setDeviceQuality] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    // Detect device screen size for responsive 3D quality optimization
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setDeviceQuality("mobile");
      else if (w < 1024) setDeviceQuality("tablet");
      else setDeviceQuality("desktop");
    };

    // Test WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Graceful fallback for low performance, reduced motion, or WebGL absence
  if (!hasWebGL || reducedMotion) {
    return (
      <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-tr from-emerald-950/10 via-transparent to-teal-950/10 opacity-70 pointer-events-none" />
    );
  }

  const particleCounts = {
    mobile: 30,
    tablet: 70,
    desktop: 140,
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-90 pointer-events-auto">
      <Canvas gl={{ antialias: deviceQuality !== "mobile" }} dpr={[1, deviceQuality === "mobile" ? 1.5 : 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.3} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.9} color="#047857" />
        <pointLight position={[5, 5, 5]} intensity={1.1} color="#10b981" />

        <TechCoreMesh isMobile={deviceQuality === "mobile"} />
        <ParticleNetwork particleCount={particleCounts[deviceQuality]} />
      </Canvas>
    </div>
  );
}

export default HeroScene;
