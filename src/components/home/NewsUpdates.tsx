"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsUpdates() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo('.news-title',
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
            trigger: '.news-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 新闻卡片动画
      const newsCards = sectionRef.current.querySelectorAll('.news-card');
      newsCards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
            rotationX: 10
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // 悬停效果
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // 标签动画
      const tags = sectionRef.current.querySelectorAll('.news-tag');
      tags.forEach((tag, index) => {
        gsap.fromTo(tag,
          {
            opacity: 0,
            x: -20,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
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

      // 时间动画
      const dates = sectionRef.current.querySelectorAll('.news-date');
      dates.forEach((date, index) => {
        gsap.fromTo(date,
          {
            opacity: 0,
            x: 20
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: date,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const newsItems = [
    {
      title: "新专辑「季节的旋律」即将发行",
      date: "2024.03.01",
      category: "专辑发布",
      excerpt: "时隔两年的全新专辑，收录了12首原创歌曲，展现音乐创作的全新境界...",
      image: "🎵",
      tags: ["新专辑", "原创", "春季发行"]
    },
    {
      title: "2024全国巡回演唱会正式启动",
      date: "2024.02.28",
      category: "演唱会",
      excerpt: "包含东京、大阪、名古屋等5个城市的巡演计划，门票即将开始预售...",
      image: "🎪",
      tags: ["巡演", "门票", "全国"]
    },
    {
      title: "最新单曲「向阳之处」MV发布",
      date: "2024.02.25",
      category: "音乐视频",
      excerpt: "由知名导演执导的MV作品，在 YouTube 上突破了百万播放量...",
      image: "🎬",
      tags: ["MV", "百万播放", "新单曲"]
    },
    {
      title: "接受音乐杂志专访",
      date: "2024.02.20",
      category: "采访",
      excerpt: "分享了创作灵感和音乐理念，以及对未来音乐发展的看法...",
      image: "🎙️",
      tags: ["专访", "创作", "音乐理念"]
    },
    {
      title: "与知名制作人合作新曲",
      date: "2024.02.15",
      category: "合作",
      excerpt: "与国际知名制作人合作，融合不同音乐风格的全新作品...",
      image: "🤝",
      tags: ["合作", "国际", "新曲"]
    },
    {
      title: "粉丝见面会圆满结束",
      date: "2024.02.10",
      category: "活动",
      excerpt: "在东京举办的粉丝见面会，与粉丝们度过了难忘的时光...",
      image: "💝",
      tags: ["粉丝活动", "见面会", "东京"]
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="news-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            最新动态
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            第一时间了解秦基博的最新消息和活动资讯
          </p>
        </div>

        {/* 新闻网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <div
              key={index}
              className="news-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/30 transform-gpu"
            >
              {/* 图片区域 */}
              <div className="h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {news.image}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="news-tag bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="news-date text-sm text-gray-500">{news.date}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="news-tag bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group">
                    阅读更多
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多按钮 */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            查看更多动态
          </button>
        </div>
      </div>
    </section>
  );
}