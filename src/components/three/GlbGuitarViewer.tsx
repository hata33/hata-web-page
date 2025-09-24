"use client";

import {
  Environment,
  OrbitControls,
  Text,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Box3, Group, Material, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three-stdlib";

// GLB吉他模型组件
function GlbGuitarModel({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<Group>(null);
  const [model, setModel] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading GLB guitar model...");

        // 使用GLTFLoader加载GLB文件
        const gltfLoader = new GLTFLoader();

        const gltf = await new Promise<any>((resolve, reject) => {
          gltfLoader.load(
            "/model/guitar/guitar.glb",
            (loadedGltf) => {
              console.log("GLB guitar model loaded successfully:", loadedGltf);
              resolve(loadedGltf);
            },
            (progress) => {
              console.log("Loading progress:", progress);
            },
            (error) => {
              console.error("Error loading GLB model:", error);
              reject(error);
            },
          );
        });

        // 获取模型的场景
        const modelScene = gltf.scene;

        // 优化材质
        modelScene.traverse((child: any) => {
          if (child instanceof Mesh) {
            // 确保材质正确加载
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material: Material) => {
                  if (material instanceof THREE.MeshStandardMaterial) {
                    // 优化材质设置
                    material.envMapIntensity = 0.8;
                    material.needsUpdate = true;
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                // 优化材质设置
                child.material.envMapIntensity = 0.8;
                child.material.needsUpdate = true;
              }
            }

            // 启用阴影
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // 计算模型的包围盒来调整大小和位置
        const box = new Box3().setFromObject(modelScene);
        const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());

        console.log("GLB model size:", size);
        console.log("GLB model center:", center);

        // 调整模型大小
        const maxSize = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2.5 / maxSize;

        console.log("Scale factor:", scaleFactor);

        modelScene.scale.set(scaleFactor, scaleFactor, scaleFactor);
        modelScene.position.sub(center.multiplyScalar(scaleFactor));

        setModel(modelScene);
        setLoading(false);
        console.log("GLB guitar model loaded and positioned successfully");
      } catch (err) {
        console.error("Error loading GLB guitar model:", err);
        setError("Failed to load GLB model");
        setLoading(false);
      }
    };

    loadModel();
  }, []);

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

  // 添加动态旋转和浮动效果
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.cos(time * 0.2) * 0.08;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.08;
    }
  });

  // 加载指示器组件
  function LoadingIndicator() {
    const { progress } = useProgress();
    return (
      <Text
        position={position}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Loading GLB Guitar... {Math.round(progress)}%
      </Text>
    );
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <Text
        position={position}
        fontSize={0.5}
        color="red"
        anchorX="center"
        anchorY="middle"
      >
        Failed to load GLB model
      </Text>
    );
  }

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {model && <primitive object={model.clone()} />}
    </group>
  );
}

// 主场景组件
function GlbGuitarScene({ isBackground = false }: { isBackground?: boolean }) {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />

      {/* 主光源 */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, 5]} intensity={1.0} color="#ffd700" />
      <pointLight position={[0, 15, -5]} intensity={0.8} color="#ffb347" />

      {/* 聚光灯 */}
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

      {/* GLB吉他模型 */}
      <GlbGuitarModel position={[0, 0, 0]} scale={isBackground ? 1.5 : 1.2} />

      {/* 环境反射 */}
      <Environment preset="studio" />

      {/* 相机控制 - 在背景模式下禁用用户交互 */}
      <OrbitControls
        enableZoom={!isBackground}
        enablePan={!isBackground}
        enableRotate={!isBackground}
        autoRotate
        autoRotateSpeed={isBackground ? 0.5 : 1}
        minDistance={5}
        maxDistance={15}
        enableDamping={!isBackground}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function GlbGuitarViewer({
  isBackground = false,
}: {
  isBackground?: boolean;
}) {
  return (
    <div
      className={`relative w-full h-full ${isBackground ? "" : "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"}`}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{
          background: isBackground
            ? "transparent"
            : "radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1e 100%)",
        }}
      >
        <GlbGuitarScene isBackground={isBackground} />
      </Canvas>
    </div>
  );
}
