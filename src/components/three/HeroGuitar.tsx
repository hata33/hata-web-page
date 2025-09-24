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
  onInteractionChange,
}: {
  position?: [number, number, number];
  scale?: number;
  onInteractionChange?: (isInteracting: boolean) => void;
}) {
  const groupRef = useRef<Group>(null);
  const [model, setModel] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [enterAnimation, setEnterAnimation] = useState({
    active: true,
    progress: 0,
  });
  const restoreTimeout = useRef<NodeJS.Timeout | null>(null);

  // 初始状态（固定值）- 调整为时钟方向的初始角度
  const initialState = {
    rotation: { x: 90, y: 0, z: 0 }, // 重置为标准角度
    position: [0, 0, 0] as [number, number, number],
    scale: 1,
  };

  // 弹簧动画状态
  const springAnimation = useRef({
    active: false,
    rotation: { x: 0, y: 0, z: 0 }, // 重置为标准角度
    velocity: { x: 0, y: 0, z: 0 },
  });

  // 开始弹簧复原动画
  const startRestoreAnimation = () => {
    if (groupRef.current) {
      springAnimation.current.active = true;
      springAnimation.current.rotation = {
        x: groupRef.current.rotation.x,
        y: groupRef.current.rotation.y,
        z: groupRef.current.rotation.z,
      };
      springAnimation.current.velocity = { x: 0, y: 0, z: 0 };
    }
  };

  // 处理用户交互
  const handleInteraction = (isDragging: boolean) => {
    setIsInteracting(isDragging);
    onInteractionChange?.(isDragging);

    if (!isDragging) {
      // 停止交互后3秒开始复原
      if (restoreTimeout.current) {
        clearTimeout(restoreTimeout.current);
      }
      restoreTimeout.current = setTimeout(() => {
        startRestoreAnimation();
      }, 3000);
    } else {
      // 用户开始交互时取消复原
      if (restoreTimeout.current) {
        clearTimeout(restoreTimeout.current);
      }
      springAnimation.current.active = false;
    }
  };

  // 监听鼠标事件
  useEffect(() => {
    const handleMouseDown = () => handleInteraction(true);
    const handleMouseUp = () => handleInteraction(false);

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      if (restoreTimeout.current) {
        clearTimeout(restoreTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading hero guitar model...");

        // 使用GLTFLoader加载GLB文件
        const gltfLoader = new GLTFLoader();

        const gltf = await new Promise<any>((resolve, reject) => {
          gltfLoader.load(
            "/model/guitar/guitar.glb",
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

        // 创建一个包装组来处理旋转中心
        const wrapperGroup = new Group();

        // 将模型添加到包装组中
        wrapperGroup.add(modelScene);

        // 缩放模型
        modelScene.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // 将模型的几何中心移动到原点
        modelScene.position.sub(center.multiplyScalar(scaleFactor));

        // 设置初始旋转角度为纵向排列（应用于包装组）
        wrapperGroup.rotation.x = Math.PI / 2;
        wrapperGroup.rotation.y = 0; // 确保正面朝前
        wrapperGroup.rotation.z = 0; // 保持垂直，不倾斜

        setModel(wrapperGroup);
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

  // 优化的动画循环
  useFrame((state, delta) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // 处理入场动画
      if (enterAnimation.active) {
        setEnterAnimation((prev) => {
          const newProgress = Math.min(prev.progress + delta * 0.8, 1); // 1.25秒完成
          if (newProgress >= 1) {
            return { active: false, progress: 1 };
          }
          return { active: true, progress: newProgress };
        });

        // 入场动画
        const easeProgress = 1 - Math.pow(1 - enterAnimation.progress, 4);
        const enterScale = 0.1 + (1 - 0.1) * easeProgress;
        groupRef.current.scale.set(
          enterScale * scale,
          enterScale * scale,
          enterScale * scale,
        );

        const enterYOffset = -2 * (1 - easeProgress);
        groupRef.current.position.y = position[1] + enterYOffset;

        // 入场时设置为时钟方向的展示角度
        groupRef.current.rotation.x = 0; // 水平放置
        groupRef.current.rotation.y = 0; // 初始角度
        groupRef.current.rotation.z = 0; // 平放
      } else {
        // 正常状态
        groupRef.current.scale.set(scale, scale, scale);

        // 处理弹簧复原动画
        if (springAnimation.current.active && !isInteracting) {
          const spring = springAnimation.current;
          const target = initialState.rotation;
          const stiffness = 5; // 弹簧刚度（更轻柔）
          const damping = 0.75; // 阻尼系数（更稳定）

          // 只复原Y轴旋转，完全保持X轴和Z轴的用户调整
          const forceY = (target.y - spring.rotation.y) * stiffness;
          spring.velocity.y += forceY * delta;
          spring.velocity.y *= damping;
          spring.rotation.y += spring.velocity.y * delta;

          // 只应用Y轴旋转复原，完全不影响X轴和Z轴
          groupRef.current.rotation.y = spring.rotation.y;

          // 检查Y轴是否接近目标位置
          const threshold = 0.01;
          const velThreshold = 0.01;
          if (
            Math.abs(spring.rotation.y - target.y) < threshold &&
            Math.abs(spring.velocity.y) < velThreshold
          ) {
            // 复原完成，只设置Y轴到目标位置，完全保持X轴和Z轴的用户调整
            groupRef.current.rotation.y = target.y;
            springAnimation.current.active = false;
          }
        }

        // 轻微的浮动效果（非交互状态）
        if (!isInteracting && !springAnimation.current.active) {
          groupRef.current.position.y =
            position[1] + Math.sin(time * 0.5) * 0.02;
        }
      }
    }
  });

  // 优化的加载指示器组件
  function LoadingIndicator() {
    const { progress } = useProgress();
    const groupRef = useRef<Group>(null);

    useFrame((state) => {
      if (groupRef.current) {
        const time = state.clock.getElapsedTime();

        // 旋转动画
        groupRef.current.rotation.y = time * 2;

        // 进度点围绕圆环移动
        const progressAngle = (progress / 100) * Math.PI * 2;
        const progressX = Math.cos(progressAngle) * 0.8;
        const progressZ = Math.sin(progressAngle) * 0.8;

        if (groupRef.current.children[1]) {
          groupRef.current.children[1].position.x = progressX;
          groupRef.current.children[1].position.z = progressZ;
        }

        // 入场动画
        if (progress < 5) {
          const scale = progress / 5;
          groupRef.current.scale.set(scale, scale, scale);
        }
      }
    });

    return (
      <group ref={groupRef} position={position}>
        {/* 旋转的加载圆环 */}
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.8, 0.05, 16, 32]} />
          <meshBasicMaterial color="rgba(255, 255, 255, 0.3)" />
        </mesh>

        {/* 进度点 */}
        <mesh rotation-x={Math.PI / 2}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="rgba(255, 255, 255, 0.8)" />
        </mesh>

        {/* 加载文字 */}
        <Text
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          position-y={1.2}
        >
          {Math.round(progress)}%
        </Text>
      </group>
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
  const [isInteracting, setIsInteracting] = useState(false);

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
      <HeroGuitarModel
        position={[0, 0, 0]}
        scale={1.0}
        onInteractionChange={setIsInteracting}
      />

      {/* 环境反射 */}
      <Environment preset="studio" />

      {/* 专业的相机控制 */}
      <OrbitControls
        ref={(controls) => {
          if (controls && typeof window !== "undefined") {
            (window as any).__heroGuitarControls = controls;
          }
        }}
        enableZoom={true}
        enablePan={false} // 禁用平移，保持面向用户
        enableRotate={true}
        autoRotate={!isInteracting}
        autoRotateSpeed={0.5} // 调整自动旋转速度
        minDistance={0.7}
        maxDistance={10}
        enableDamping={true}
        dampingFactor={0.1} // 适中的阻尼
        rotateSpeed={1.0} // 旋转速度
        zoomSpeed={0.6}
        // 时钟效果的旋转约束 - 限制在水平面上旋转
        minPolarAngle={Math.PI / 2} // 固定在水平面
        maxPolarAngle={Math.PI / 2} // 固定在水平面
        // 启用360度水平旋转
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        // 交互事件处理
        onStart={() => setIsInteracting(true)}
        onEnd={() => setIsInteracting(false)}
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
