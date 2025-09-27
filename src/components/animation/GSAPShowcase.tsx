"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPShowcaseProps {
  className?: string;
}

export default function GSAPShowcase({ className = "" }: GSAPShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 创建粒子背景动画
      const particles = particlesRef.current;
      if (particles) {
        // 生成多个粒子
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full";
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particles.appendChild(particle);

          // 粒子动画
          gsap.to(particle, {
            x: `+=${Math.random() * 200 - 100}`,
            y: `+=${Math.random() * 200 - 100}`,
            opacity: Math.random() * 0.8 + 0.2,
            scale: Math.random() * 2 + 0.5,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 2,
          });
        }
      }

      // 文字打字机效果
      const textElements = textRef.current?.querySelectorAll(".gsap-text");
      if (textElements) {
        gsap.fromTo(
          textElements,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 卡片3D翻转效果
      const cards = cardsRef.current?.querySelectorAll(".gsap-card");
      if (cards) {
        cards.forEach((card, index) => {
          gsap.set(card, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
          });

          // 鼠标悬停3D效果
          card.addEventListener("mouseenter", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
            const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;

            gsap.to(card, {
              rotateY: x * 0.1,
              rotateX: -y * 0.1,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          // 滚动触发动画
          gsap.fromTo(
            card,
            {
              opacity: 0,
              rotationY: 45,
              x: index % 2 === 0 ? -100 : 100,
              scale: 0.8,
            },
            {
              opacity: 1,
              rotationY: 0,
              x: 0,
              scale: 1,
              duration: 1,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // 创建时间轴动画
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // 背景颜色渐变
      if (containerRef.current) {
        timeline.to(containerRef.current, {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          duration: 2,
        });

        // 形状变形动画
        const shapes = containerRef.current.querySelectorAll(".shape");
        shapes.forEach((shape, index) => {
          timeline.to(
            shape,
            {
              rotation: 360,
              scale: index % 2 === 0 ? 1.5 : 0.5,
              borderRadius: "50%",
              duration: 3,
              ease: "none",
            },
            index * 0.5
          );
        });

        // 波浪动画
        const waveElements = containerRef.current.querySelectorAll(".wave");
        waveElements.forEach((wave, index) => {
          gsap.to(wave, {
            x: "100%",
            duration: 3,
            repeat: -1,
            ease: "none",
            delay: index * 0.5,
          });
        });

        // 脉冲光圈效果
        const pulseRings = containerRef.current.querySelectorAll(".pulse-ring");
        pulseRings.forEach((ring, index) => {
          gsap.to(ring, {
            scale: 3,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: "power2.out",
            delay: index * 0.3,
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100 ${className}`}
    >
      {/* 粒子背景 */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* 装饰性形状 */}
      <div className="shape absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 opacity-20" />
      <div className="shape absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20" />
      <div className="shape absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20" />

      {/* 波浪效果 */}
      <div className="wave absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30" />
      <div className="wave absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-purple-200/20 to-pink-200/20" />

      {/* 脉冲光圈 */}
      <div className="pulse-ring absolute top-1/2 left-1/2 w-4 h-4 border-2 border-blue-400 rounded-full" />
      <div className="pulse-ring absolute top-1/3 right-1/3 w-3 h-3 border-2 border-purple-400 rounded-full" />
      <div className="pulse-ring absolute bottom-1/3 left-1/4 w-2 h-2 border-2 border-pink-400 rounded-full" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* 标题区域 */}
        <div ref={textRef} className="text-center mb-20">
          <h1 className="gsap-text text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            GSAP 动画展示
          </h1>
          <p className="gsap-text text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            使用 GSAP 创建的复杂动画效果，包括时间轴、滚动触发、3D变换等高级功能
          </p>
        </div>

        {/* 卡片展示区域 */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "时间轴动画",
              description: "精确控制多个动画的时序和同步",
              color: "from-blue-500 to-cyan-500",
              icon: "⏱️",
            },
            {
              title: "滚动触发",
              description: "基于滚动位置触发复杂的动画序列",
              color: "from-purple-500 to-pink-500",
              icon: "📜",
            },
            {
              title: "3D变换",
              description: "创建令人印象深刻的3D视觉效果",
              color: "from-green-500 to-teal-500",
              icon: "🎭",
            },
            {
              title: "粒子系统",
              description: "动态生成的粒子背景和特效",
              color: "from-orange-500 to-red-500",
              icon: "✨",
            },
            {
              title: "物理引擎",
              description: "模拟真实世界的物理运动效果",
              color: "from-indigo-500 to-blue-500",
              icon: "🎯",
            },
            {
              title: "交互响应",
              description: "响应用户交互的实时动画反馈",
              color: "from-pink-500 to-rose-500",
              icon: "🎪",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="gsap-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50 cursor-pointer transform-gpu"
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 交互式演示区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/30">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            交互式动画演示
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">鼠标悬停效果</h3>
              <p className="text-gray-600">
                将鼠标悬停在卡片上体验3D变换效果，每个卡片都有独特的动画时序和缓动函数。
              </p>
              <div className="flex space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="gsap-card w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-xl cursor-pointer"
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">滚动触发动画</h3>
              <p className="text-gray-600">
                滚动页面查看动画的精确触发时机，所有动画都与滚动位置完美同步。
              </p>
              <div className="h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                <div className="text-gray-600">📱 滚动查看动画效果</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}