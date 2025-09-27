"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 时间线主轴动画
      gsap.fromTo('.timeline-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: '.timeline-line',
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );

      // 时间点动画
      const timelinePoints = sectionRef.current.querySelectorAll('.timeline-point');
      timelinePoints.forEach((point, index) => {
        gsap.fromTo(point,
          {
            opacity: 0,
            scale: 0,
            rotation: 180
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
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

        // 连接线动画
        gsap.fromTo(point.querySelector('.point-connector'),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            delay: index * 0.2 + 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: point,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 内容卡片动画
      const timelineCards = sectionRef.current.querySelectorAll('.timeline-card');
      timelineCards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            y: 30
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
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

        // 卡片悬停效果
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // 标题动画
      gsap.fromTo('.timeline-title',
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: '.timeline-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 背景装饰动画
      const decorations = sectionRef.current.querySelectorAll('.timeline-decoration');
      decorations.forEach((decoration, index) => {
        gsap.to(decoration, {
          rotation: 360,
          duration: 20 + index * 5,
          repeat: -1,
          ease: "none"
        });
      });

      // 视差滚动效果
      gsap.to('.timeline-background', {
        y: -100,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timelineEvents = [
    {
      year: "2006",
      title: "音乐生涯开始",
      description: "以独立音乐人身份开始音乐创作",
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2008",
      title: "主流出道",
      description: "发行首张主流专辑《Contrast》",
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2010",
      title: "突破性成功",
      description: "单曲《向日葵的约定》大热",
      color: "from-green-500 to-teal-500"
    },
    {
      year: "2014",
      title: "动漫主题曲",
      description: "为《四月是你的谎言》创作主题曲",
      color: "from-orange-500 to-red-500"
    },
    {
      year: "2018",
      title: "十周年纪念",
      description: "举办大型纪念演唱会",
      color: "from-indigo-500 to-blue-500"
    },
    {
      year: "2023",
      title: "新篇章",
      description: "发行最新专辑，开启音乐新篇章",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* 背景装饰 */}
      <div className="timeline-background absolute inset-0 pointer-events-none">
        <div className="timeline-decoration absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="timeline-decoration absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full blur-3xl opacity-30" />
        <div className="timeline-decoration absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-200 to-teal-200 rounded-full blur-2xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="timeline-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            音乐生涯时间线
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            从独立音乐人到主流艺术家，追溯秦基博音乐之路的重要里程碑
          </p>
        </div>

        {/* 时间线容器 */}
        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* 时间线主轴 */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full origin-top" />

          {/* 时间线事件 */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-center">
                {/* 时间点 */}
                <div className="timeline-point absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-gradient-to-r rounded-full z-10 flex items-center justify-center">
                  <div className={`w-4 h-4 bg-gradient-to-r ${event.color} rounded-full`} />
                </div>

                {/* 连接线 */}
                <div className="point-connector absolute left-1/2 w-20 h-0.5 bg-gradient-to-r from-gray-300 to-transparent origin-left"
                     style={{ transform: index % 2 === 0 ? 'translateX(-100%)' : 'translateX(0)' }} />

                {/* 内容卡片 */}
                <div className={`timeline-card w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8 text-right' : 'ml-auto pl-8 text-left'}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center mb-4 justify-end">
                      {index % 2 === 0 && (
                        <div className={`w-3 h-12 bg-gradient-to-b ${event.color} rounded-full mr-4`} />
                      )}
                      <div className={`text-sm font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${event.color}`}>
                        {event.year}
                      </div>
                      {index % 2 === 1 && (
                        <div className={`w-3 h-12 bg-gradient-to-b ${event.color} rounded-full ml-4`} />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}