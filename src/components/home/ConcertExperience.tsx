"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConcertExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 地图视差滚动效果
      gsap.to('.concert-map', {
        y: -100,
        scale: 1.1,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // 地图标记点动画
      const mapPoints = sectionRef.current.querySelectorAll('.map-point');
      mapPoints.forEach((point, index) => {
        gsap.fromTo(point,
          {
            opacity: 0,
            scale: 0,
            y: 20
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: point,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // 脉冲效果
        gsap.to(point.querySelector('.pulse-ring'), {
          scale: 3,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power2.out"
        });
      });

      // 演唱会卡片动画
      const concertCards = sectionRef.current.querySelectorAll('.concert-card');
      concertCards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotationY: 15
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            delay: index * 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // 3D悬停效果
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e as MouseEvent).clientX - rect.left - rect.width / 2;
          const y = (e as MouseEvent).clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            rotationY: x * 0.1,
            rotationX: -y * 0.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // 标题动画
      gsap.fromTo('.concert-title',
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
            trigger: '.concert-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 音符装饰动画
      const musicNotes = sectionRef.current.querySelectorAll('.music-note');
      musicNotes.forEach((note, index) => {
        gsap.to(note, {
          y: -30,
          opacity: 0,
          duration: 3,
          delay: index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });

      // 背景粒子效果
      const particles = sectionRef.current.querySelectorAll('.concert-particle');
      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200)
        });

        gsap.to(particle, {
          x: `+=${gsap.utils.random(-100, 100)}`,
          y: `+=${gsap.utils.random(-100, 100)}`,
          opacity: gsap.utils.random(0.2, 0.6),
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

  const concertLocations = [
    { name: "东京", x: 25, y: 35, date: "2024.03.15", venue: "日本武道馆" },
    { name: "大阪", x: 20, y: 45, date: "2024.03.22", venue: "大阪城音乐厅" },
    { name: "名古屋", x: 22, y: 40, date: "2024.03.29", venue: "名古屋国际会议场" },
    { name: "福冈", x: 18, y: 55, date: "2024.04.05", venue: "福冈太阳宫" },
    { name: "札幌", x: 28, y: 20, date: "2024.04.12", venue: "札幌文化中心" }
  ];

  const concertInfo = [
    {
      title: "2024 巡回演唱会",
      subtitle: "「季节的旋律」",
      description: "全国5大城市巡演，呈现最精彩的音乐现场",
      highlights: ["全新编曲", "特别嘉宾", "独家 merchandise"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "特别专场",
      subtitle: "「 acoustic night 」",
      description: "不插电演唱会，感受最纯粹的音乐魅力",
      highlights: ["不插电版本", "粉丝互动", "现场即兴"],
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* 背景粒子 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="concert-particle absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
          />
        ))}
      </div>

      {/* 音符装饰 */}
      <div className="absolute top-20 left-10 music-note text-3xl text-purple-300 opacity-30">♪</div>
      <div className="absolute top-40 right-20 music-note text-4xl text-blue-300 opacity-30">♫</div>
      <div className="absolute bottom-32 left-1/4 music-note text-5xl text-indigo-300 opacity-30">♪</div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="concert-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300 bg-clip-text text-transparent">
            演唱会体验
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            超越时空的音乐之旅，感受现场演出的震撼魅力
          </p>
        </div>

        {/* 演唱会地图 */}
        <div className="relative h-96 mb-16 rounded-3xl overflow-hidden">
          <div className="concert-map absolute inset-0 bg-gradient-to-br from-indigo-800/30 to-purple-800/30 rounded-3xl border border-white/10">
            {/* 简化的日本地图轮廓 */}
            <div className="absolute inset-4 border-2 border-white/20 rounded-2xl" />

            {/* 地图标记点 */}
            {concertLocations.map((location, index) => (
              <div
                key={index}
                className="map-point absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white shadow-lg" />
                  <div className="pulse-ring absolute inset-0 w-4 h-4 border-2 border-purple-400 rounded-full" />

                  {/* 信息提示框 */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-800">{location.name}</div>
                    <div className="text-xs text-gray-600">{location.date}</div>
                    <div className="text-xs text-gray-500">{location.venue}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 演唱会信息卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {concertInfo.map((info, index) => (
            <div
              key={index}
              className="concert-card bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 transform-gpu"
            >
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold`}>
                  {index + 1}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-xl text-gray-300">{info.subtitle}</p>
              </div>

              <p className="text-gray-300 text-center mb-6 leading-relaxed">
                {info.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white mb-3">演出亮点</h4>
                {info.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 bg-gradient-to-r ${info.color} rounded-full`} />
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className={`bg-gradient-to-r ${info.color} text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                  了解详情
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}