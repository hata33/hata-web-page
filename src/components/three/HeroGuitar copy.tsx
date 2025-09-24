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

// 首屏吉他模型组件
function HeroGuitarModel({
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
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading hero guitar model...");

        // 使用GLTFLoader加载GLB文件
        const gltfLoader = new GLTFLoader();

        const gltf = await new Promise<any>((resolve, reject) => {
          gltfLoader.load(
            "/model/guitar/guitar2.glb",
            (loadedGltf) => {
              console.log("Hero guitar model loaded successfully:", loadedGltf);
              resolve(loadedGltf);
            },
            (progress) => {
              console.log("Loading progress:", progress);
            },
            (error) => {
              console.error("Error loading hero guitar model:", error);
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

        console.log("Hero model size:", size);
        console.log("Hero model center:", center);

        // 调整模型大小 - 首屏使用较小的尺寸
        const maxSize = Math.max(size.x, size.y, size.z);
        const scaleFactor = 3.0 / maxSize; // 首屏使用较小的尺寸

        console.log("Hero scale factor:", scaleFactor);

        modelScene.scale.set(scaleFactor, scaleFactor, scaleFactor);
        modelScene.position.sub(center.multiplyScalar(scaleFactor));

        // 设置初始旋转角度为纵向排列
        modelScene.rotation.x = 90; // 90度旋转，使吉他纵向排列
        modelScene.rotation.y = Math.PI; // 180度旋转，确保正面朝前
        modelScene.rotation.z = 0; // 保持垂直，不倾斜

        setModel(modelScene);
        setLoading(false);
        console.log("Hero guitar model loaded and positioned successfully");
      } catch (err) {
        console.error("Error loading hero guitar model:", err);
        setError("Failed to load hero model");
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

  // 首屏使用更优雅的动画效果
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // 保持纵向排列，但调整Y轴旋转以确保正面朝向用户
      groupRef.current.rotation.x = Math.PI / 2;
      groupRef.current.rotation.y = Math.PI; // 180度旋转，确保正面朝前

      // 移除Z轴旋转，确保模型始终保持垂直
      groupRef.current.rotation.z = 0;

      // 浮动效果
      groupRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.05;
    }
  });

  // 加载指示器组件
  function LoadingIndicator() {
    const { progress } = useProgress();
    return (
      <Text
        position={position}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Loading... {Math.round(progress)}%
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
        fontSize={0.3}
        color="red"
        anchorX="center"
        anchorY="middle"
      >
        Failed to load
      </Text>
    );
  }

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {model && <primitive object={model.clone()} />}
    </group>
  );
}

// 首屏吉他场景组件
function HeroGuitarScene() {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.4} />

      {/* 主光源 */}
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#ffd700" />
      <pointLight position={[0, 10, -3]} intensity={0.6} color="#ffb347" />

      {/* 聚光灯 */}
      <spotLight
        position={[3, 10, 3]}
        angle={0.4}
        penumbra={0.6}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 首屏吉他模型 */}
      <HeroGuitarModel position={[0, 0, 0]} scale={1.0} />

      {/* 环境反射 */}
      <Environment preset="studio" />

      {/* 速度参数范围：
       - zoomSpeed={0.8} - 缩放速度（通常范围：0.1-2.0）
         - 0.1 = 很慢的缩放
         - 0.5 = 慢速缩放
         - 0.8 = 中速缩放（当前值）
         - 1.0 = 正常缩放
         - 1.5+ = 快速缩放
         - 2.0 = 很快的缩放
     
       其他相关参数：
       - rotateSpeed={0.8} - 旋转速度（范围：0.1-2.0）
       - dampingFactor={0.05} - 阻尼系数，影响惯性效果（范围：0.01-0.2）
       - autoRotateSpeed={0.3} - 自动旋转速度（范围：0.1-2.0） */}
      {/* 相机控制 - 启用左右拖拽旋转和滚轮缩放 */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.3}
        minDistance={0.7} // 最小距离，避免太近
        maxDistance={95} // 最大距离，允许更大的缩放
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={1.5}
        zoomSpeed={0.8} // 缩放速度
        // 严格限制垂直旋转，确保吉他的纵向排列
        minPolarAngle={Math.PI / 2} // 90度，正好垂直
        maxPolarAngle={Math.PI / 2} // 90度，正好垂直
        // 启用水平旋转
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
      />
    </>
  );
}

export default function HeroGuitar() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{
          background: "transparent",
        }}
      >
        <HeroGuitarScene />
      </Canvas>
    </div>
  );
}
