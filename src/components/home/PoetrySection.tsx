"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function PoetrySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 整个section的滚动触发动画
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 逐行文字从下往上渐变出现
      const lines = textRef.current?.querySelectorAll(".poetry-line");
      if (lines) {
        lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            {
              opacity: 0,
              y: 50,
              rotationX: 15,
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              delay: index * 0.3 + 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: line,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }

      // 第三行的前4个字颜色变化和词切换动画
      const colorChange = textRef.current?.querySelector(".color-change");
      const wordSwitch = textRef.current?.querySelector(".word-switch");

      if (colorChange && wordSwitch) {
        // 先等待第三行出现
        gsap.to(
          {},
          {
            duration: 1.4, // 等待第三行动画完成 (0.5 + 2*0.3 + 0.3)
            onComplete: () => {
              // 开始词切换动画序列
              const words = ["温暖诗篇", "唤醒共鸣", "连接你我", "连接你我"];
              let currentIndex = 0;

              const switchWord = () => {
                if (currentIndex < words.length) {
                  // 淡出当前词
                  gsap.to(wordSwitch, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                      // 更换文字
                      if (wordSwitch) {
                        wordSwitch.textContent = words[currentIndex];
                      }
                      // 淡入新词
                      gsap.to(wordSwitch, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    },
                  });

                  currentIndex++;

                  if (currentIndex < words.length) {
                    setTimeout(switchWord, 1000); // 每个词显示1秒
                  } else {
                    // 最后停在"打动人心"
                    setTimeout(() => {
                      if (wordSwitch) {
                        gsap.to(wordSwitch, {
                          opacity: 0,
                          scale: 0.8,
                          duration: 0.3,
                          ease: "power2.in",
                          onComplete: () => {
                            if (wordSwitch) {
                              wordSwitch.textContent = "打动人心";
                            }
                            gsap.to(wordSwitch, {
                              opacity: 1,
                              scale: 1,
                              duration: 0.3,
                              ease: "power2.out",
                            });
                          },
                        });
                      }
                    }, 2000); // 在"连接你我"显示2秒后切换
                  }
                }
              };

              // 开始切换序列
              setTimeout(switchWord, 500);
            },
          },
        );

        // 前四个字的颜色动画
        gsap.to(colorChange, {
          color: "#ff6b6b",
          duration: 0.8,
          delay: 1.4,
          ease: "power2.out",
        });
      }

      // 背景渐变动画
      gsap.to(".poetry-background", {
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
        duration: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      // 向上滚动时文字缩小动画
      if (textContainerRef.current) {
        gsap.to(textContainerRef.current, {
          scale: 0.8,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            ease: "power2.inOut",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景图片/色块 */}
      {/* 暂时使用黑色背景，之后可以替换为图片 */}
      <div className="poetry-background absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90" />
      </div>

      {/* 诗歌文字内容 */}
      <div className="relative z-10 px-8 py-12">
        {/* 浅灰色背景色块 */}
        <div className="absolute left-8 top-12 w-[600px] h-[80vh] bg-gray-200/10 rounded-lg -z-10" />
        <div ref={textContainerRef} className="max-w-4xl mx-auto">

          <div ref={textRef} className="relative z-10 text-left">
            {/* 第一行 */}
            <div className="poetry-line text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200  leading-tight">
              将日常的杂音
            </div>

            {/* 第二行 */}
            <div className="poetry-line text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200  leading-tight">
              譜写成
            </div>

            {/* 第三行 - 包含前4个字颜色变化和词切换 */}
            <div className="poetry-line text-4xl md:text-6xl lg:text-7xl font-bold  leading-tight">
              <span className="color-change inline-block transition-colors duration-500">
                让每个
              </span>
              <span className="word-switch inline-block ml-4">平凡时刻</span>
            </div>

            {/* 第四行 */}
            <div className="poetry-line text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200  leading-tight">
              都充满诗意
            </div>

            {/* 第五行 */}
            <div className="poetry-line text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200  leading-tight">
              用音乐编织
            </div>

            {/* 第六行 */}
            <div className="poetry-line text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200  leading-tight">
              时光的记忆
            </div>

            {/* 第七行 - 音符 */}
            <div className="poetry-line text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200  leading-tight">
              ♪ ♫ ♪ ♫
            </div>

            {/* 装饰性元素 */}
            <div className="mt-16 opacity-0">
              <div className="w-32 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 ml-0 " />
              <div className="text-sm text-gray-400 tracking-widest text-left">
                POETRY IN MOTION
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
