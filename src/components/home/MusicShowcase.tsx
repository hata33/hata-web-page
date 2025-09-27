"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MusicShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 音符动画
      const notes = sectionRef.current.querySelectorAll('.music-note');
      notes.forEach((note, index) => {
        gsap.to(note, {
          y: -30,
          opacity: 0,
          duration: 2,
          delay: index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });

      // 音频波形动画
      const waves = sectionRef.current.querySelectorAll('.wave-bar');
      waves.forEach((wave, index) => {
        gsap.to(wave, {
          scaleY: gsap.utils.random(0.5, 2),
          duration: gsap.utils.random(0.5, 1.5),
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.1
        });
      });

      // 卡片悬停效果
      const cards = cardsRef.current?.querySelectorAll('.music-card');
      if (cards) {
        cards.forEach((card, index) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          // 滚动触发动画
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 50,
              rotationX: 15
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

      // 标题动画
      gsap.fromTo('.music-title',
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: '.music-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 背景粒子效果
      const particles = sectionRef.current.querySelectorAll('.music-particle');
      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200)
        });

        gsap.to(particle, {
          x: `+=${gsap.utils.random(-100, 100)}`,
          y: `+=${gsap.utils.random(-100, 100)}`,
          opacity: gsap.utils.random(0.3, 0.8),
          scale: gsap.utils.random(0.5, 1.5),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.1
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* 背景粒子 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="music-particle absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-50"
          />
        ))}
      </div>

      {/* 音符装饰 */}
      <div className="absolute top-20 left-10 music-note text-4xl text-purple-300 opacity-30">♪</div>
      <div className="absolute top-40 right-20 music-note text-3xl text-blue-300 opacity-30">♫</div>
      <div className="absolute bottom-32 left-1/4 music-note text-5xl text-indigo-300 opacity-30">♪</div>
      <div className="absolute bottom-20 right-1/3 music-note text-4xl text-purple-300 opacity-30">♬</div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="music-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
            音乐作品
          </h2>

          {/* 音频波形可视化 */}
          <div className="flex justify-center items-end h-20 mb-8 space-x-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="wave-bar w-2 bg-gradient-to-t from-purple-400 to-blue-400 rounded-t"
                style={{ height: `${gsap.utils.random(20, 80)}px` }}
              />
            ))}
          </div>
        </div>

        {/* 音乐卡片展示 */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "热门单曲",
              subtitle: "最新发行作品",
              tracks: ["彩虹", "向阳之处", "季节的旋律"],
              color: "from-purple-500 to-pink-500"
            },
            {
              title: "精选专辑",
              subtitle: "经典作品合集",
              tracks: ["永远的歌", "青春记忆", "时光旅行"],
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "现场演出",
              subtitle: "演唱会录音",
              tracks: ["东京演唱会", "大阪之夜", "名古屋现场"],
              color: "from-indigo-500 to-purple-500"
            },
            {
              title: "合作曲目",
              subtitle: "艺术家合作",
              tracks: ["二重奏", "群星合唱", "跨界合作"],
              color: "from-pink-500 to-rose-500"
            },
            {
              title: "未公开作品",
              subtitle: "稀有录音",
              tracks: ["Demo集", "录音室版本", "特别版本"],
              color: "from-teal-500 to-blue-500"
            },
            {
              title: "经典回顾",
              subtitle: "历年精选",
              tracks: ["早期作品", "黄金时期", "最新创作"],
              color: "from-orange-500 to-red-500"
            }
          ].map((album, index) => (
            <div
              key={index}
              className="music-card bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 cursor-pointer transform-gpu"
            >
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${album.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold`}>
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{album.title}</h3>
                <p className="text-gray-300 text-sm">{album.subtitle}</p>
              </div>

              <div className="space-y-3">
                {album.tracks.map((track, trackIndex) => (
                  <div key={trackIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${album.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                        {trackIndex + 1}
                      </div>
                      <span className="text-white text-sm">{track}</span>
                    </div>
                    <div className="text-gray-400 text-xs">3:45</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}