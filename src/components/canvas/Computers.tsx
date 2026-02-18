import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Preload, Text } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/Loader";

/* ═══ Giant floating "7" — CR7 tribute ═══ */
const CR7Number = ({ isLight }: { isLight: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.15;
      meshRef.current.position.y = 0.3 + Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={[2.2, 0.3, 0]} ref={meshRef as any}>
        <Text
          fontSize={3.2}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.06}
          outlineColor={gold}
        >
          7
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
            toneMapped={false}
          />
        </Text>
        {/* Glowing ring around the 7 */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]}>
          <torusGeometry args={[2.2, 0.03, 16, 64]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.4}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* ═══ Eagle silhouette — Wizkid/Starboy tribute ═══ */
const EagleShape = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";

  // Create eagle wing shape using custom geometry
  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Left wing
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(-1.8, 1.5, -3.2, 0.8);
    shape.quadraticCurveTo(-2.5, 0.3, -2, 0.5);
    shape.quadraticCurveTo(-1.5, -0.2, -1.2, 0.2);
    shape.quadraticCurveTo(-0.8, -0.3, -0.6, 0.1);
    shape.lineTo(0, -0.3);
    // Right wing (mirror)
    shape.lineTo(0.6, 0.1);
    shape.quadraticCurveTo(0.8, -0.3, 1.2, 0.2);
    shape.quadraticCurveTo(1.5, -0.2, 2, 0.5);
    shape.quadraticCurveTo(2.5, 0.3, 3.2, 0.8);
    shape.quadraticCurveTo(1.8, 1.5, 0, 0);
    return shape;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      groupRef.current.position.y =
        -1.5 + Math.sin(clock.getElapsedTime() * 0.6) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[-2.5, -1.5, 0.5]} scale={0.8}>
        <mesh rotation={[0, 0, 0]}>
          <shapeGeometry args={[wingShape]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>
        {/* Eagle body */}
        <mesh position={[0, -0.5, 0]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.25}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
        {/* Star on eagle — Starboy */}
        <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 10]}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* ═══ Crown — Real Madrid crown / Champions League ═══ */
const CrownShape = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={[0.5, 2.4, -0.5]}>
        {/* Crown base ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.06, 8, 32]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
        {/* Crown points */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.5,
                0.35,
                Math.sin(angle) * 0.5,
              ]}
            >
              <coneGeometry args={[0.08, 0.35, 4]} />
              <meshStandardMaterial
                color={gold}
                emissive={gold}
                emissiveIntensity={0.5}
                metalness={1}
                roughness={0}
              />
            </mesh>
          );
        })}
        {/* Central gem */}
        <mesh position={[0, 0.5, 0]}>
          <octahedronGeometry args={[0.12]} />
          <meshStandardMaterial
            color={isLight ? "#1a47b8" : "#3b82f6"}
            emissive={isLight ? "#1a47b8" : "#3b82f6"}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* ═══ Shield crest shape — Madrid shield in 3D ═══ */
const ShieldCrest = ({ isLight }: { isLight: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";

  const shieldShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.5);
    shape.lineTo(1.2, 0.9);
    shape.lineTo(1.2, -0.2);
    shape.quadraticCurveTo(1.2, -1.4, 0, -1.8);
    shape.quadraticCurveTo(-1.2, -1.4, -1.2, -0.2);
    shape.lineTo(-1.2, 0.9);
    shape.lineTo(0, 1.5);
    return shape;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.25) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={[-3, 1, -1]}>
        <mesh ref={meshRef}>
          <shapeGeometry args={[shieldShape]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>
        {/* Horizontal Madrid stripes on shield */}
        <mesh position={[0, 0.1, 0.01]}>
          <planeGeometry args={[1.8, 0.04]} />
          <meshBasicMaterial color={gold} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, -0.5, 0.01]}>
          <planeGeometry args={[1.6, 0.04]} />
          <meshBasicMaterial color={gold} transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

/* ═══ Orbiting shapes — championship stars ═══ */
const OrbitingShapes = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";
  const blue = isLight ? "#1a47b8" : "#3b82f6";

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Champions League star shapes */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[3.8, 1.8, -0.5]}>
          <octahedronGeometry args={[0.2]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>
      {/* Blue diamond */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.8}>
        <mesh position={[3.5, -1.5, 0.5]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color={blue}
            emissive={blue}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      </Float>
      {/* Trophy ring */}
      <Float speed={1.2} rotationIntensity={3} floatIntensity={0.6}>
        <mesh position={[-3.5, -1.8, 0]} rotation={[0.5, 0.3, 0]}>
          <torusGeometry args={[0.4, 0.025, 8, 48]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>
      {/* Small floating stars */}
      {[
        [2, 2.5, 0.5],
        [-1.5, 2.8, -0.3],
        [4, 0.5, -1],
        [-4, 0, -0.5],
        [1, -2, 1],
      ].map((pos, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={2} floatIntensity={0.8}>
          <mesh position={pos as [number, number, number]}>
            <octahedronGeometry args={[0.1 + i * 0.02]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? gold : blue}
              emissive={i % 2 === 0 ? gold : blue}
              emissiveIntensity={0.4}
              metalness={1}
              roughness={0}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

/* ═══ Gold + Blue particle dust ═══ */
const SceneParticles = ({ isLight }: { isLight: boolean }) => {
  const goldRef = useRef<THREE.Points>(null);
  const blueRef = useRef<THREE.Points>(null);

  const goldPositions = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const bluePositions = useMemo(() => {
    const arr = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (goldRef.current) {
      goldRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      goldRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.02) * 0.05;
    }
    if (blueRef.current) {
      blueRef.current.rotation.y = -clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      <points ref={goldRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={goldPositions.length / 3}
            array={goldPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color={isLight ? "#b8941f" : "#d4af37"}
          transparent
          opacity={isLight ? 0.35 : 0.5}
          sizeAttenuation
        />
      </points>
      <points ref={blueRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={bluePositions.length / 3}
            array={bluePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={isLight ? "#1a47b8" : "#3b82f6"}
          transparent
          opacity={isLight ? 0.2 : 0.35}
          sizeAttenuation
        />
      </points>
    </>
  );
};

/* ═══ Main Canvas ═══ */
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 500px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const check = () =>
      setIsLight(document.documentElement.classList.contains("light"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-[2]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={isLight ? 0.5 : 0.2} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={isLight ? 1.2 : 0.7}
            color={isLight ? "#ffffff" : "#ffeedd"}
          />
          <pointLight
            position={[-3, 2, 4]}
            intensity={isLight ? 0.6 : 0.4}
            color="#d4af37"
          />
          <pointLight
            position={[3, -2, 2]}
            intensity={0.3}
            color={isLight ? "#1a47b8" : "#3b82f6"}
          />

          {/* CR7 floating number 7 */}
          <CR7Number isLight={isLight} />
          {/* Wizkid eagle silhouette */}
          {!isMobile && <EagleShape isLight={isLight} />}
          {/* Madrid crown */}
          <CrownShape isLight={isLight} />
          {/* Madrid shield crest */}
          {!isMobile && <ShieldCrest isLight={isLight} />}
          {/* Orbiting championship stars */}
          <OrbitingShapes isLight={isLight} />
          {/* Gold & blue particles */}
          <SceneParticles isLight={isLight} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
