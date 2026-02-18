import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/Loader";

/* ═══ Floating Number 7 — CR7 tribute (3D geometry, no text) ═══ */
const Number7 = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";

  const sevenShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Draw a "7" as a 2D shape, then extrude
    shape.moveTo(-0.8, 1.5);
    shape.lineTo(0.8, 1.5);
    shape.lineTo(0.8, 1.2);
    shape.lineTo(0.1, -1.5);
    shape.lineTo(-0.25, -1.5);
    shape.lineTo(0.4, 1.2);
    shape.lineTo(-0.8, 1.2);
    shape.lineTo(-0.8, 1.5);
    return shape;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.35) * 0.25;
      groupRef.current.position.y =
        0.2 + Math.sin(clock.getElapsedTime() * 0.6) * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[3, 0.2, 0]} scale={1.1}>
        <mesh>
          <extrudeGeometry
            args={[
              sevenShape,
              { depth: 0.35, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 3 },
            ]}
          />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
        {/* Subtle glow ring behind */}
        <mesh rotation={[0, 0, 0]} position={[0, 0, -0.2]}>
          <torusGeometry args={[1.8, 0.02, 12, 64]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* ═══ Eagle wings — Wizkid/Starboy (clean, right side) ═══ */
const EagleWings = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";

  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(-1.5, 1.2, -2.8, 0.6);
    shape.quadraticCurveTo(-2.2, 0.2, -1.6, 0.4);
    shape.quadraticCurveTo(-1.2, -0.1, -0.8, 0.15);
    shape.quadraticCurveTo(-0.5, -0.2, 0, -0.25);
    shape.quadraticCurveTo(0.5, -0.2, 0.8, 0.15);
    shape.quadraticCurveTo(1.2, -0.1, 1.6, 0.4);
    shape.quadraticCurveTo(2.2, 0.2, 2.8, 0.6);
    shape.quadraticCurveTo(1.5, 1.2, 0, 0);
    return shape;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.25) * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.25}>
      <group ref={groupRef} position={[2.8, -1.8, 0.3]} scale={0.7}>
        <mesh>
          <shapeGeometry args={[wingShape]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
            side={THREE.DoubleSide}
            wireframe
          />
        </mesh>
        {/* Star — Starboy */}
        <mesh position={[0, -0.1, 0.05]}>
          <octahedronGeometry args={[0.15]} />
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

/* ═══ Crown — floats top-right ═══ */
const Crown = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={[3.5, 2, -0.5]} scale={0.8}>
        {/* Crown base */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.05, 8, 32]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.4}
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
                Math.cos(angle) * 0.4,
                0.3,
                Math.sin(angle) * 0.4,
              ]}
            >
              <coneGeometry args={[0.06, 0.3, 4]} />
              <meshStandardMaterial
                color={gold}
                emissive={gold}
                emissiveIntensity={0.4}
                metalness={1}
                roughness={0}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

/* ═══ Subtle particle dust — gold only, fewer particles ═══ */
const SceneParticles = ({ isLight }: { isLight: boolean }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      // Bias particles toward right side (positive x)
      arr[i * 3] = (Math.random() - 0.2) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={isLight ? "#b8941f" : "#d4af37"}
        transparent
        opacity={isLight ? 0.25 : 0.4}
        sizeAttenuation
      />
    </points>
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
          <ambientLight intensity={isLight ? 0.4 : 0.15} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={isLight ? 1 : 0.6}
            color={isLight ? "#ffffff" : "#ffeedd"}
          />
          <pointLight
            position={[4, 1, 3]}
            intensity={isLight ? 0.5 : 0.35}
            color="#d4af37"
          />

          {/* All 3D pushed to right half so text is readable */}
          <Number7 isLight={isLight} />
          <Crown isLight={isLight} />
          {!isMobile && <EagleWings isLight={isLight} />}
          <SceneParticles isLight={isLight} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
