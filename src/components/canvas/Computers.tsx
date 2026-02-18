import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Preload, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../layout/Loader";

/* ═══ Floating Code Terminal — techy centerpiece ═══ */
const CodeTerminal = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";
  const blue = isLight ? "#1a47b8" : "#3b82f6";

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.3) * 0.06 - 0.2;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.4) * 0.03 + 0.05;
      groupRef.current.position.y =
        -0.1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.12;
    }
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity =
        0.2 + Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
    }
  });

  // Code line widths and colors for the fake code on screen
  const codeLines = useMemo(
    () =>
      [
        { w: 0.6, x: -0.55, color: gold, opacity: 0.7 },     // const
        { w: 0.9, x: -0.4, color: blue, opacity: 0.5 },       // import
        { w: 0.4, x: -0.55, color: "#9ca3b8", opacity: 0.35 },// comment
        { w: 1.1, x: -0.3, color: gold, opacity: 0.6 },       // function
        { w: 0.7, x: -0.2, color: blue, opacity: 0.45 },      // return
        { w: 0.5, x: -0.55, color: "#9ca3b8", opacity: 0.3 }, // bracket
        { w: 0.85, x: -0.35, color: gold, opacity: 0.55 },    // export
        { w: 0.3, x: -0.55, color: blue, opacity: 0.4 },      // }
      ] as const,
    [gold, blue]
  );

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[2.2, -0.1, 0.5]}>
        {/* Terminal body — dark rounded rectangle */}
        <RoundedBox args={[3.2, 2.2, 0.12]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={isLight ? "#2d3142" : "#111827"}
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>

        {/* Screen area */}
        <mesh ref={screenRef} position={[0, -0.05, 0.065]}>
          <planeGeometry args={[2.9, 1.85]} />
          <meshStandardMaterial
            color={isLight ? "#1a1f2e" : "#0d1117"}
            emissive={isLight ? "#1a1f2e" : "#0d1117"}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Terminal title bar */}
        <mesh position={[0, 0.92, 0.07]}>
          <planeGeometry args={[2.9, 0.2]} />
          <meshBasicMaterial
            color={isLight ? "#252b3b" : "#161b22"}
          />
        </mesh>

        {/* Traffic light dots */}
        {[
          { x: -1.2, color: "#ff5f57" },
          { x: -1.05, color: "#febc2e" },
          { x: -0.9, color: "#28c840" },
        ].map((dot, i) => (
          <mesh key={i} position={[dot.x, 0.92, 0.075]}>
            <circleGeometry args={[0.035, 16]} />
            <meshBasicMaterial color={dot.color} />
          </mesh>
        ))}

        {/* Fake code lines */}
        {codeLines.map((line, i) => (
          <mesh
            key={i}
            position={[line.x, 0.62 - i * 0.2, 0.072]}
          >
            <planeGeometry args={[line.w, 0.06]} />
            <meshBasicMaterial
              color={line.color}
              transparent
              opacity={line.opacity}
            />
          </mesh>
        ))}

        {/* Blinking cursor */}
        <mesh position={[-0.25, 0.62 - 8 * 0.2, 0.072]}>
          <planeGeometry args={[0.025, 0.1]} />
          <meshBasicMaterial color={gold} transparent opacity={0.8} />
        </mesh>

        {/* Gold accent line at top edge */}
        <mesh position={[0, 1.1, 0.065]}>
          <planeGeometry args={[3.2, 0.012]} />
          <meshBasicMaterial color={gold} />
        </mesh>
      </group>
    </Float>
  );
};

/* ═══ Orbiting tech shapes — React atom, code brackets, nodes ═══ */
const TechOrbitals = ({ isLight }: { isLight: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gold = isLight ? "#b8941f" : "#d4af37";
  const blue = isLight ? "#1a47b8" : "#3b82f6";

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* React-like atom rings */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={0.6}>
        <group position={[4.2, 0.8, -0.5]}>
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[0.35, 0.015, 8, 48]} />
            <meshStandardMaterial
              color={blue}
              emissive={blue}
              emissiveIntensity={0.4}
              metalness={1}
              roughness={0}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.35, 0.015, 8, 48]} />
            <meshStandardMaterial
              color={blue}
              emissive={blue}
              emissiveIntensity={0.4}
              metalness={1}
              roughness={0}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.35, 0.015, 8, 48]} />
            <meshStandardMaterial
              color={blue}
              emissive={blue}
              emissiveIntensity={0.4}
              metalness={1}
              roughness={0}
            />
          </mesh>
          {/* Nucleus */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={blue}
              emissive={blue}
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      </Float>

      {/* Wireframe cube — code block */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[4, -1.5, 0.5]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating diamond — git node */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={0.8}>
        <mesh position={[1.2, 2.3, -0.3]}>
          <octahedronGeometry args={[0.18]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* Small sphere nodes — connected network feel */}
      {[
        [3.8, 0, -0.8],
        [1.5, -1.8, 0.5],
        [4.5, 0.5, 0.2],
        [2, 2.5, 0],
      ].map((pos, i) => (
        <Float key={i} speed={1.8 + i * 0.3} rotationIntensity={0.5} floatIntensity={0.4}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? gold : blue}
              emissive={i % 2 === 0 ? gold : blue}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}

      {/* Thin gold ring — like a loading spinner */}
      <Float speed={1.2} rotationIntensity={3} floatIntensity={0.4}>
        <mesh position={[0.8, -2, 0.5]} rotation={[0.8, 0.5, 0]}>
          <torusGeometry args={[0.3, 0.015, 8, 48]} />
          <meshStandardMaterial
            color={gold}
            emissive={gold}
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>
    </group>
  );
};

/* ═══ Gold + Blue particle dust ═══ */
const SceneParticles = ({ isLight }: { isLight: boolean }) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      arr[i * 3] = (Math.random() - 0.15) * 14;
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
        size={0.018}
        color={isLight ? "#b8941f" : "#d4af37"}
        transparent
        opacity={isLight ? 0.2 : 0.35}
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
          <pointLight
            position={[2, -1, 2]}
            intensity={0.2}
            color={isLight ? "#1a47b8" : "#3b82f6"}
          />

          {/* Floating code terminal — main techy element */}
          {!isMobile && <CodeTerminal isLight={isLight} />}
          {/* Orbiting tech shapes (React atom, cubes, nodes) */}
          <TechOrbitals isLight={isLight} />
          {/* Subtle particles */}
          <SceneParticles isLight={isLight} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
