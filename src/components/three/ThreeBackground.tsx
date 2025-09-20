"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

// 创建完整音符组件
function MusicalNote({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  color = "#ffffff",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string | THREE.Color;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = rotation[1] + Math.sin(time * 2) * 0.1;
      meshRef.current.rotation.z = rotation[2] + Math.cos(time * 1.5) * 0.05;
    }
  });

  // 创建音符头的2D形状
  const createNoteHeadShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.2, 0.05, 0.15, 0.15);
    shape.quadraticCurveTo(0.1, 0.25, -0.05, 0.25);
    shape.quadraticCurveTo(-0.2, 0.25, -0.15, 0.15);
    shape.quadraticCurveTo(-0.1, 0.05, 0, 0);
    return shape;
  };

  // 创建音符头的几何体
  const noteHeadGeometry = new THREE.ExtrudeGeometry(createNoteHeadShape(), {
    depth: 0.02,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.01,
    bevelThickness: 0.005,
  });

  // 创建音符杆的几何体
  const stemGeometry = new THREE.BoxGeometry(0.03, 0.8, 0.02);

  // 创建音符旗的形状
  const createFlagShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0.015, 0.6);
    shape.quadraticCurveTo(0.08, 0.65, 0.1, 0.7);
    shape.quadraticCurveTo(0.09, 0.72, 0.06, 0.75);
    shape.quadraticCurveTo(0.03, 0.73, 0.015, 0.7);
    shape.quadraticCurveTo(0.02, 0.65, 0.015, 0.6);
    return shape;
  };

  const flagGeometry = new THREE.ExtrudeGeometry(createFlagShape(), {
    depth: 0.01,
    bevelEnabled: false,
    steps: 1,
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      {/* 音符头 */}
      <mesh position={[0, 0, 0]}>
        <primitive object={noteHeadGeometry} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* 音符杆 */}
      <mesh position={[0.015, 0.4, 0]}>
        <primitive object={stemGeometry} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* 音符旗 */}
      <mesh position={[0.015, 0.7, 0]}>
        <primitive object={flagGeometry} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.9}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

// 大型音符背景效果
function MusicalNoteBackground() {
  const groupRef = useRef<THREE.Group>(null);

  // 生成随机音符位置
  const [notes] = useState(() => {
    const noteConfigs = [];
    for (let i = 0; i < 150; i++) {
      noteConfigs.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20 - 10,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 2.5,
        speed: 0.1 + Math.random() * 0.3,
        floatSpeed: 0.5 + Math.random() * 1.5,
        color: new THREE.Color().setHSL(
          Math.random(),
          0.6 + Math.random() * 0.4,
          0.6 + Math.random() * 0.3,
        ),
      });
    }
    return noteConfigs;
  });

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y += 0.001;

      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group && notes[index]) {
          const config = notes[index];
          child.position.y += config.floatSpeed * 0.01;

          // 重置位置当音符飘出视野
          if (child.position.y > 20) {
            child.position.y = -20;
            child.position.x = (Math.random() - 0.5) * 40;
            child.position.z = (Math.random() - 0.5) * 20 - 10;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {notes.map((note, index) => (
        <MusicalNote
          key={index}
          position={note.position}
          rotation={note.rotation}
          scale={note.scale}
          color={note.color}
        />
      ))}
    </group>
  );
}

// 中型音符层
function MediumNoteLayer() {
  const groupRef = useRef<THREE.Group>(null);

  const [notes] = useState(() => {
    const noteConfigs = [];
    for (let i = 0; i < 80; i++) {
      noteConfigs.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15 - 5,
        ] as [number, number, number],
        rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
        scale: 0.3 + Math.random() * 0.8,
        speed: 0.2 + Math.random() * 0.4,
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.7, 0.8),
      });
    }
    return noteConfigs;
  });

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group && notes[index]) {
          const config = notes[index];
          child.position.y += config.speed * 0.015;
          child.rotation.z = Math.sin(time * 2 + index) * 0.2;

          if (child.position.y > 15) {
            child.position.y = -15;
            child.position.x = (Math.random() - 0.5) * 25;
            child.position.z = (Math.random() - 0.5) * 15 - 5;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {notes.map((note, index) => (
        <MusicalNote
          key={index}
          position={note.position}
          rotation={note.rotation}
          scale={note.scale}
          color={note.color}
        />
      ))}
    </group>
  );
}

// 前景音符层
function ForegroundNotes() {
  const groupRef = useRef<THREE.Group>(null);

  const [notes] = useState(() => {
    const noteConfigs = [];
    for (let i = 0; i < 40; i++) {
      noteConfigs.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
        ] as [number, number, number],
        rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
        scale: 0.8 + Math.random() * 1.2,
        speed: 0.3 + Math.random() * 0.5,
        color: new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.9),
      });
    }
    return noteConfigs;
  });

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y += 0.003;

      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group && notes[index]) {
          const config = notes[index];
          child.position.y += config.speed * 0.02;
          child.rotation.x = Math.sin(time + index) * 0.3;
          child.rotation.y += 0.01;

          if (child.position.y > 10) {
            child.position.y = -10;
            child.position.x = (Math.random() - 0.5) * 15;
            child.position.z = (Math.random() - 0.5) * 8;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {notes.map((note, index) => (
        <MusicalNote
          key={index}
          position={note.position}
          rotation={note.rotation}
          scale={note.scale}
          color={note.color}
        />
      ))}
    </group>
  );
}

// 音符粒子效果
function NoteParticles() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3;
      const angle = (i / 2000) * Math.PI * 4;
      const radius = 5 + Math.random() * 15;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  });

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      meshRef.current.position.y = Math.sin(time * 0.3) * 2;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#e0e7ff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// 主要场景组件
function Scene() {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />

      {/* 多彩点光源营造音乐氛围 */}
      <pointLight position={[10, 15, 10]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-15, -10, 8]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[0, 20, -5]} intensity={1.0} color="#06b6d4" />
      <pointLight position={[-8, 15, -8]} intensity={0.8} color="#10b981" />

      {/* 背景星星 */}
      <Stars
        radius={120}
        depth={50}
        count={2000}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* 音符粒子背景 */}
      <NoteParticles />

      {/* 大型音符背景层 */}
      <MusicalNoteBackground />

      {/* 中型音符层 */}
      <MediumNoteLayer />

      {/* 前景音符层 */}
      <ForegroundNotes />

      {/* 相机控制 */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 5, 25], fov: 60 }}
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
