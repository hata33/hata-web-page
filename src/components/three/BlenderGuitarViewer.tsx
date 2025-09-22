import {
  Environment,
  OrbitControls,
  Text,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Box3, Group, Material, Mesh, Vector3 } from "three";
import { MTLLoader, OBJLoader } from "three-stdlib";

// 真实的吉他模型组件
function BlenderGuitarModel({
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
        console.log("Loading Blender guitar model from .blend export...");

        // 加载MTL材质文件
        const mtlLoader = new MTLLoader();
        const materials = await new Promise<any>((resolve, reject) => {
          mtlLoader.load(
            "/model/guitar/Guitar_01.mtl",
            resolve,
            undefined,
            reject,
          );
        });

        materials.preload();

        // 加载OBJ模型文件
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);

        const obj = await new Promise<Group>((resolve, reject) => {
          objLoader.load(
            "/model/guitar/Guitar_01.obj",
            (loadedObj) => {
              console.log(
                "Blender guitar model loaded successfully:",
                loadedObj,
              );
              resolve(loadedObj);
            },
            (progress) => {
              console.log("Loading progress:", progress);
            },
            (error) => {
              console.error("Error loading Blender model:", error);
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

        console.log("Blender model size:", size);
        console.log("Blender model center:", center);

        // 调整模型大小
        const maxSize = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2.5 / maxSize;

        console.log("Scale factor:", scaleFactor);

        obj.scale.set(scaleFactor, scaleFactor, scaleFactor);
        obj.position.sub(center.multiplyScalar(scaleFactor));

        setModel(obj);
        setLoading(false);
        console.log("Blender guitar model loaded and positioned successfully");
      } catch (err) {
        console.error("Error loading Blender guitar model:", err);
        setError("Failed to load Blender model");
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
        Loading Blender Guitar... {Math.round(progress)}%
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
        Failed to load Blender model
      </Text>
    );
  }

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {model && <primitive object={model.clone()} />}
    </group>
  );
}

// 场景组件
function BlenderGuitarScene() {
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

      {/* 吉他模型 */}
      <BlenderGuitarModel position={[0, 0, 0]} scale={1.2} />

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

export default function BlenderGuitarViewer() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{
          background:
            "radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1e 100%)",
        }}
      >
        <BlenderGuitarScene />
      </Canvas>
    </div>
  );
}
