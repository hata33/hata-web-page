"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlenderGuitarViewer from "@/components/three/BlenderGuitarViewer";
import GuitarViewer from "@/components/three/GuitarViewer";
import ThreeBackground from "@/components/three/ThreeBackground";
import { LanguageLoader } from "@/components/ui/LanguageLoader";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Navigation } from "@/components/ui/Navigation";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useLanguage } from "@/lib/language-context";

export default function HomePage() {
  const { t } = useLanguage();
  const { scrollDirection, scrollY } = useScrollDirection();
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [showThirdSection, setShowThirdSection] = useState(false);
  const [showFourthSection, setShowFourthSection] = useState(false);

  useEffect(() => {
    // Show sections when user scrolls down past the previous section
    const threshold = window.innerHeight * 0.3; // 30% of viewport height
    const thirdSectionThreshold = window.innerHeight * 1.3; // 130% of viewport height
    const fourthSectionThreshold = window.innerHeight * 2.3; // 230% of viewport height

    if (scrollDirection === "down" && scrollY > threshold) {
      setShowSecondSection(true);
    } else if (scrollDirection === "up" && scrollY < threshold) {
      setShowSecondSection(false);
    }

    if (scrollDirection === "down" && scrollY > thirdSectionThreshold) {
      setShowThirdSection(true);
    } else if (scrollDirection === "up" && scrollY < thirdSectionThreshold) {
      setShowThirdSection(false);
    }

    if (scrollDirection === "down" && scrollY > fourthSectionThreshold) {
      setShowFourthSection(true);
    } else if (scrollDirection === "up" && scrollY < fourthSectionThreshold) {
      setShowFourthSection(false);
    }
  }, [scrollDirection, scrollY]);

  return (
    <div className="relative">
      {/* Three.js 背景特效 - 仅在首页显示 */}
      <ThreeBackground />

      {/* 导航菜单 */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <Navigation showLanguageSwitcher={true} transparent={true} />
      </div>

      {/* 首屏内容 */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-4 pt-20">
          <LanguageLoader
            fallback={<div className="text-white">加载中...</div>}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                {t("home.title")}
              </h1>
              <span className="text-xl md:text-2xl text-gray-300 font-light tracking-wider">
                MOTOHIRO HATA
              </span>
            </motion.div>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("home.subtitle")}
            </motion.p>
            <motion.button
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors transform hover:scale-105 transition-transform border border-white/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("home.listen")}
            </motion.button>
          </LanguageLoader>
        </div>

        {/* 滚动提示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* 艺术家介绍部分 */}
      <motion.section
        className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: showSecondSection ? 1 : 0,
          y: showSecondSection ? 0 : 100,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* 装饰性背景元素 */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-200 to-blue-200 rounded-full blur-3xl opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <LanguageLoader
              fallback={<div className="text-center">加载中...</div>}
            >
              {/* 标题区域 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-20"
              >
                <motion.h2
                  className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {t("home.introduction.title")}
                </motion.h2>
                <motion.p
                  className="text-xl md:text-2xl text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t("home.introduction.subtitle")}
                </motion.p>
              </motion.div>

              {/* 主要内容区域 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* 左侧：艺术家介绍 */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-8"
                >
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="flex items-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
                      <h3 className="text-3xl font-bold text-gray-800">
                        {t("home.introduction.title")}
                      </h3>
                    </motion.div>
                    <motion.p
                      className="text-lg text-gray-700 leading-relaxed text-justify"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      {t("home.introduction.description")}
                    </motion.p>

                    {/* 装饰性音符图标 */}
                    <motion.div
                      className="flex justify-center mt-8 space-x-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      {["♪", "♫", "♪"].map((note, index) => (
                        <motion.span
                          key={index}
                          className="text-2xl text-purple-400"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: index * 0.3,
                            repeat: Infinity,
                          }}
                        >
                          {note}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* 右侧：成就展示 */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="space-y-8"
                >
                  {t("home.introduction.achievements").map(
                    (achievement: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 + index * 0.3 }}
                        className="group"
                      >
                        <motion.div
                          className="bg-gradient-to-r from-white/90 to-blue-50/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30"
                          whileHover={{
                            scale: 1.03,
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.9) 100%)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center mb-4">
                            <motion.div
                              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                duration: 0.4,
                                delay: 1.2 + index * 0.3,
                              }}
                            >
                              <span className="text-white font-bold text-sm">
                                {index + 1}
                              </span>
                            </motion.div>
                            <h4 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {achievement.title}
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {achievement.items.map(
                              (item: any, itemIndex: number) => (
                                <motion.span
                                  key={itemIndex}
                                  className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-white/50"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: 1.4 + index * 0.3 + itemIndex * 0.1,
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                    background:
                                      "linear-gradient(135deg, rgb(219,234,254) 0%, rgb(233,213,255) 50%, rgb(252,231,243) 100%)",
                                  }}
                                >
                                  {item}
                                </motion.span>
                              ),
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </div>

              {/* 底部装饰元素 */}
              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </LanguageLoader>
          </div>
        </div>
      </motion.section>

      {/* 吉他展示部分 - 第三屏 */}
      <motion.section
        className="relative h-screen overflow-hidden p-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: showThirdSection ? 1 : 0,
          y: showThirdSection ? 0 : 100,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <GuitarViewer />
      </motion.section>

      {/* Blender吉他展示部分 - 第四屏 */}
      <motion.section
        className="relative h-screen overflow-hidden p-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: showFourthSection ? 1 : 0,
          y: showFourthSection ? 0 : 100,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <BlenderGuitarViewer />
      </motion.section>
    </div>
  );
}
