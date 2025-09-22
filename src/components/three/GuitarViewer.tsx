// @ts-nocheck
"use client";

import {
  Environment,
  OrbitControls,
  Text,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Box3, Group, Material, Mesh, Points, Vector3 } from "three";
import { MTLLoader, OBJLoader } from "three-stdlib";

// 设备能力检测
function getDeviceQuality(): "high" | "medium" | "low" {
  if (typeof window === "undefined") return "medium";

  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) return "low";

  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    if (
      renderer.toLowerCase().includes("nvidia") ||
      renderer.toLowerCase().includes("amd")
    ) {
      return "high";
    }
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  if (maxTextureSize >= 4096) return "high";
  if (maxTextureSize >= 2048) return "medium";
  return "low";
}

// 吉他模型组件
function GuitarModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<Group>(null);
  const [model, setModel] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const deviceQuality = useMemo(() => getDeviceQuality(), []);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Starting to load guitar model...");

        // 直接加载OBJ文件，不使用MTL
        const objLoader = new OBJLoader();

        const obj = await new Promise<Group>((resolve, reject) => {
          objLoader.load(
            "/model/guitar/Guitar_01.obj",
            (loadedObj) => {
              console.log("OBJ model loaded successfully:", loadedObj);
              resolve(loadedObj);
            },
            (progress) => {
              console.log("Loading progress:", progress);
            },
            (error) => {
              console.error("Error loading OBJ:", error);
              reject(error);
            },
          );
        });

        // 创建逼真的吉他材质并替换现有材质
        obj.traverse((child: any) => {
          if (child instanceof Mesh) {
            // 为吉他创建高质量的木质材质
            const guitarMaterial = new THREE.MeshStandardMaterial({
              color: 0x8b4513, // 棕色
              metalness: 0.1,
              roughness: 0.8,
              envMapIntensity: 0.5,
            });

            // 为不同的部件创建不同的材质
            if (
              child.name.toLowerCase().includes("string") ||
              child.name.toLowerCase().includes("line")
            ) {
              // 弦的材质
              child.material = new THREE.MeshStandardMaterial({
                color: 0xc0c0c0, // 银色
                metalness: 0.9,
                roughness: 0.1,
                envMapIntensity: 1.0,
              });
            } else if (
              child.name.toLowerCase().includes("tun") ||
              child.name.toLowerCase().includes("head")
            ) {
              // 调音旋钮和头部的材质
              child.material = new THREE.MeshStandardMaterial({
                color: 0x654321, // 深棕色
                metalness: 0.3,
                roughness: 0.6,
                envMapIntensity: 0.6,
              });
            } else if (
              child.name.toLowerCase().includes("fret") ||
              child.name.toLowerCase().includes("neck")
            ) {
              // 指板和琴颈的材质
              child.material = new THREE.MeshStandardMaterial({
                color: 0x4a4a4a, // 深灰色
                metalness: 0.0,
                roughness: 0.9,
                envMapIntensity: 0.3,
              });
            } else {
              // 吉他主体的默认木质材质
              child.material = guitarMaterial;
            }

            // 为所有材质添加一些细节变化
            if (child.material) {
              // 添加细微的颜色变化来模拟真实木纹
              const hueVariation = (Math.random() - 0.5) * 0.02;
              const saturationVariation = (Math.random() - 0.5) * 0.1;

              if (child.material.color) {
                child.material.color.offsetHSL(
                  hueVariation,
                  saturationVariation,
                  0,
                );
              }
            }
          }
        });

        // 计算模型的包围盒来调整大小和位置
        const box = new Box3().setFromObject(obj);
        const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());

        console.log("Model size:", size);
        console.log("Model center:", center);

        // 调整模型大小
        const maxSize = Math.max(size.x, size.y, size.z);
        const scaleFactor = 3 / maxSize; // 调整为合适的大小

        console.log("Scale factor:", scaleFactor);

        obj.scale.set(scaleFactor, scaleFactor, scaleFactor);
        obj.position.sub(center.multiplyScalar(scaleFactor));

        setModel(obj);
        setLoading(false);
        console.log("Guitar model loaded and positioned successfully");
      } catch (err) {
        console.error("Error loading guitar model:", err);
        setError("Failed to load model");
        setLoading(false);
      }
    };

    loadModel();
  }, [deviceQuality]);

  // 清理资源
  useEffect(() => {
    return () => {
      if (model) {
        model.traverse((child: any) => {
          if (child instanceof Mesh) {
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material: Material) =>
                  material.dispose(),
                );
              } else {
                child.material.dispose();
              }
            }
            if (child.geometry) {
              child.geometry.dispose();
            }
          }
        });
      }
    };
  }, [model]);

  // 加载指示器组件
  function LoadingIndicator() {
    const { progress } = useProgress();
    return (
      <group position={position}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Loading Guitar... {Math.round(progress)}%
        </Text>
      </group>
    );
  }

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // 轻微的旋转动画
      groupRef.current.rotation.y = rotation[1] + Math.sin(time * 0.5) * 0.1;
      groupRef.current.rotation.x = rotation[0] + Math.cos(time * 0.3) * 0.05;

      // 轻微的上下浮动
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;
    }
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <group position={position}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.5}
          color="red"
          anchorX="center"
          anchorY="middle"
        >
          Failed to load model
        </Text>
      </group>
    );
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      {model && <primitive object={model.clone()} />}
    </group>
  );
}

// 粒子效果
function GuitarParticles() {
  const meshRef = useRef<Points>(null);

  const [positions] = useState(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      const angle = (i / 1000) * Math.PI * 6;
      const radius = 3 + Math.random() * 8;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  });

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
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
        size={0.03}
        color="#ffd700"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// 主场景组件
function GuitarScene() {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />

      {/* 主光源 */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, 5]} intensity={1.0} color="#ffd700" />
      <pointLight position={[0, 15, -5]} intensity={0.8} color="#ffb347" />

      {/* 聚光灯突出吉他 */}
      <spotLight
        position={[5, 15, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 吉他模型 */}
      <GuitarModel position={[0, 0, 0]} scale={1.2} />

      {/* 粒子效果 */}
      <GuitarParticles />

      {/* 环境反射 */}
      <Environment preset="studio" />

      {/* 相机控制 */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={1}
        minDistance={5}
        maxDistance={15}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function GuitarViewer() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{
          background:
            "radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1e 100%)",
        }}
      >
        <GuitarScene />
      </Canvas>
    </div>
  );
}
