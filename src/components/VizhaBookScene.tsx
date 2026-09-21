import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Line, Lightformer, PerspectiveCamera, Sparkles, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type ProgressRef = React.MutableRefObject<number>;
type MotionRef = React.MutableRefObject<boolean>;

function LedgerObject({ progressRef, reducedMotion }: { progressRef: ProgressRef; reducedMotion: MotionRef }) {
  const group = useRef<THREE.Group>(null);
  const dashboard = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(({ clock }, rawDelta) => {
    if (!group.current || !dashboard.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const progress = progressRef.current;
    const motion = reducedMotion.current ? 0 : 1;
    const idle = motion ? Math.sin(clock.elapsedTime * 0.42) * 0.012 : 0;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, progress * 0.58 + pointer.x * 0.08, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.12 + pointer.y * 0.035, 4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, idle + progress * 0.04, 3, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, progress * 0.2, 4, delta);
    dashboard.current.position.z = THREE.MathUtils.damp(dashboard.current.position.z, -0.1 + progress * 1.35, 4, delta);
    dashboard.current.position.y = THREE.MathUtils.damp(dashboard.current.position.y, 0.28 + progress * 0.1, 4, delta);
    const dashboardScale = THREE.MathUtils.damp(dashboard.current.scale.x, 0.5 + progress * 0.5, 4, delta);
    dashboard.current.scale.setScalar(dashboardScale);
  });

  const pageCount = 7;
  return (
    <group ref={group} position={[0.9, 0, 0]} rotation={[0, -0.25, -0.04]}>
      <mesh castShadow>
        <boxGeometry args={[3.4, 0.16, 4.5]} />
        <meshStandardMaterial color="#4b101b" roughness={0.35} metalness={0.28} />
      </mesh>
      <mesh position={[0, -0.13, 0]} castShadow>
        <boxGeometry args={[3.18, 0.08, 4.28]} />
        <meshStandardMaterial color="#d4b979" roughness={0.7} metalness={0.05} />
      </mesh>
      {Array.from({ length: pageCount }).map((_, index) => (
        <mesh key={index} position={[(index - 3) * 0.05, 0.04 + index * 0.015, 0]} rotation-y={0} castShadow>
          <boxGeometry args={[3.08, 0.025, 4.12]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#e6d4ad" : "#bda67c"} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0.12, 2.08]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2.5, 0.025]} />
        <meshBasicMaterial color="#7a1525" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.1, -2.08]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[2.5, 0.025]} />
        <meshBasicMaterial color="#c9a85d" transparent opacity={0.45} />
      </mesh>
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.14}>
        <group ref={dashboard} position={[0, 0.28, -0.15]} rotation={[-0.08, 0, 0]}>
          <mesh>
            <boxGeometry args={[3, 0.05, 2.15]} />
            <meshStandardMaterial color="#111113" roughness={0.45} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <planeGeometry args={[2.72, 1.87]} />
            <meshStandardMaterial color="#0b0b0c" emissive="#0b0b0c" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[-0.88, 0.065, 0.55]}>
            <boxGeometry args={[0.52, 0.018, 0.25]} />
            <meshBasicMaterial color="#c9a85d" />
          </mesh>
          <mesh position={[-0.52, 0.065, 0.55]}>
            <boxGeometry args={[0.48, 0.018, 0.25]} />
            <meshBasicMaterial color="#7a1525" />
          </mesh>
          <mesh position={[-0.18, 0.065, 0.55]}>
            <boxGeometry args={[0.42, 0.018, 0.25]} />
            <meshBasicMaterial color="#3d8e77" />
          </mesh>
          <Line points={[[-1.05, 0.08, 0.05], [-0.65, 0.08, 0.22], [-0.26, 0.08, 0.1], [0.18, 0.08, 0.42], [0.6, 0.08, 0.3], [1.05, 0.08, 0.62]]} color="#c9a85d" lineWidth={1.5} />
          <Text position={[-1.03, 0.08, -0.53]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.12} color="#aaa8a3" anchorX="left">VIZHABOOK / LIVE</Text>
        </group>
      </Float>
    </group>
  );
}

function ParticleField({ progressRef, reducedMotion }: { progressRef: ProgressRef; reducedMotion: MotionRef }) {
  const packets = useMemo(() => Array.from({ length: 42 }, (_, index) => ({
    position: [Math.sin(index * 1.7) * 4.2, Math.cos(index * 2.3) * 2.6, (index % 9) * 0.4 - 1.5] as [number, number, number],
    scale: 0.025 + (index % 4) * 0.012,
    phase: index * 0.73,
  })), []);
  const packetRefs = useRef<Array<THREE.Mesh | null>>([]);

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const progress = progressRef.current;
    const spread = 0.35 + progress * 0.65;
    packets.forEach((packet, index) => {
      const mesh = packetRefs.current[index];
      if (!mesh) return;
      const drift = reducedMotion.current ? 0 : Math.sin(clock.elapsedTime * 0.7 + packet.phase) * 0.08;
      const targetX = packet.position[0] * spread + drift;
      const targetY = packet.position[1] * spread + (reducedMotion.current ? 0 : Math.cos(clock.elapsedTime * 0.55 + packet.phase) * 0.05);
      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, 5, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, 5, delta);
      const targetScale = packet.scale * (0.5 + progress);
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, targetScale, 5, delta));
    });
  });

  return <>{packets.map((packet, index) => <mesh key={index} ref={(mesh) => { packetRefs.current[index] = mesh; }} position={[packet.position[0] * 0.35, packet.position[1] * 0.35, packet.position[2]]} scale={packet.scale * 0.5}>
    <sphereGeometry args={[1, 8, 8]} />
    <meshBasicMaterial color={index % 3 === 0 ? "#c9a85d" : "#7a1525"} transparent opacity={0.7} />
  </mesh>)}</>;
}

function Scene({ progressRef, reducedMotion }: { progressRef: ProgressRef; reducedMotion: MotionRef }) {

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.15, 9]} fov={40} />
      <ambientLight intensity={1.45} color="#fff5df" />
      <directionalLight position={[4, 6, 5]} intensity={3.4} color="#f2d493" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-4, 1, 2]} intensity={8} distance={12} color="#7a1525" />
      <Environment>
        <Lightformer intensity={2.2} color="#f2d493" position={[0, 5, 2]} scale={[8, 5, 1]} />
        <Lightformer intensity={1.3} color="#7a1525" position={[-5, 1, -2]} rotation-y={Math.PI / 2} scale={[7, 2, 1]} />
      </Environment>
      <Sparkles count={reducedMotion.current ? 10 : 28} scale={[8, 5, 4]} size={1.8} speed={0.12} color="#c9a85d" opacity={0.45} />
      <ParticleField progressRef={progressRef} reducedMotion={reducedMotion} />
      <LedgerObject progressRef={progressRef} reducedMotion={reducedMotion} />
    </>
  );
}

export function VizhaBookScene() {
  const progressRef = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion.current = media.matches; };
    update();
    media.addEventListener("change", update);
    const onScroll = () => {
      const hero = document.getElementById("overview");
      if (!hero) return;
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      progressRef.current = Math.min(Math.max(window.scrollY / distance, 0), 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 hidden min-[900px]:block">
      <Canvas shadows dpr={[1, 1.5]} performance={{ min: 0.55 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Scene progressRef={progressRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}