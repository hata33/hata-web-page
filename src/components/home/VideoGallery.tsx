"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo('.video-title',
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
            trigger: '.video-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 视频网格动画
      const videoItems = gridRef.current?.querySelectorAll('.video-item');
      if (videoItems) {
        videoItems.forEach((item, index) => {
          gsap.fromTo(item,
            {
              opacity: 0,
              scale: 0.8,
              rotation: gsap.utils.random(-10, 10),
              filter: "blur(5px)"
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              filter: "blur(0px)",
              duration: 1,
              delay: index * 0.1,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // 悬停效果
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.05,
              rotationY: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // 播放按钮动画
      const playButtons = sectionRef.current.querySelectorAll('.play-button');
      playButtons.forEach((button, index) => {
        gsap.to(button, {
          scale: 1.1,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2
        });
      });

      // 分类标签动画
      const categories = sectionRef.current.querySelectorAll('.category-tag');
      categories.forEach((tag, index) => {
        gsap.fromTo(tag,
          {
            opacity: 0,
            y: 20,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tag,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 背景粒子效果
      const particles = sectionRef.current.querySelectorAll('.video-particle');
      particles.forEach((particle, index) => {
        gsap.set(particle, {
          x: gsap.utils.random(-300, 300),
          y: gsap.utils.random(-300, 300)
        });

        gsap.to(particle, {
          x: `+=${gsap.utils.random(-150, 150)}`,
          y: `+=${gsap.utils.random(-150, 150)}`,
          opacity: gsap.utils.random(0.2, 0.6),
          scale: gsap.utils.random(0.5, 2),
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2
        });
      });

      // 视差滚动效果
      gsap.to('.video-background', {
        y: -80,
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

  const videoCategories = [
    { name: "音乐视频", count: 24, color: "from-purple-500 to-pink-500" },
    { name: "演唱会", count: 18, color: "from-blue-500 to-cyan-500" },
    { name: "采访", count: 12, color: "from-green-500 to-teal-500" },
    { name: "幕后花絮", count: 15, color: "from-orange-500 to-red-500" }
  ];

  const videoItems = [
    {
      title: "彩虹",
      category: "音乐视频",
      duration: "4:32",
      thumbnail: "🌈",
      views: "2.3M"
    },
    {
      title: "向日葵的约定",
      category: "音乐视频",
      duration: "5:18",
      thumbnail: "🌻",
      views: "1.8M"
    },
    {
      title: "东京演唱会",
      category: "演唱会",
      duration: "12:45",
      thumbnail: "🎸",
      views: "890K"
    },
    {
      title: "创作访谈",
      category: "采访",
      duration: "8:20",
      thumbnail: "🎙️",
      views: "456K"
    },
    {
      title: "录音室现场",
      category: "幕后花絮",
      duration: "3:15",
      thumbnail: "🎚️",
      views: "234K"
    },
    {
      title: "季节的旋律",
      category: "音乐视频",
      duration: "4:56",
      thumbnail: "🍃",
      views: "1.2M"
    },
    {
      title: "大阪之夜",
      category: "演唱会",
      duration: "15:30",
      thumbnail: "🎪",
      views: "756K"
    },
    {
      title: "专辑制作",
      category: "幕后花絮",
      duration: "6:42",
      thumbnail: "🎬",
      views: "189K"
    },
    {
      title: "特别合作",
      category: "音乐视频",
      duration: "4:18",
      thumbnail: "🤝",
      views: "945K"
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden">
      {/* 背景粒子 */}
      <div className="video-background absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="video-particle absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
          />
        ))}
      </div>

      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="video-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            MV 画廊
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            精选音乐视频、演唱会现场和独家幕后内容
          </p>

          {/* 分类标签 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {videoCategories.map((category, index) => (
              <div
                key={index}
                className="category-tag bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20"
              >
                <span className={`text-sm font-medium bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.name}
                </span>
                <span className="text-gray-400 text-sm ml-2">({category.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* 视频网格 */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoItems.map((video, index) => (
            <div
              key={index}
              className="video-item bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 cursor-pointer transform-gpu group"
            >
              {/* 缩略图区域 */}
              <div className="relative h-48 bg-gradient-to-br from-purple-800/30 to-pink-800/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* 播放按钮 */}
                <div className="play-button absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 group-hover:bg-white/30 transition-colors">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* 时长 */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-white text-xs font-medium">{video.duration}</span>
                </div>
              </div>

              {/* 视频信息 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{video.category}</span>
                  <span>{video.views} 播放</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多按钮 */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            加载更多视频
          </button>
        </div>
      </div>
    </section>
  );
}