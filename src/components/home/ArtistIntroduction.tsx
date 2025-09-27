"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { LanguageLoader } from "@/components/ui/LanguageLoader";
import { useLanguage } from "@/lib/language-context";

export default function ArtistIntroduction() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onViewportEnter={() => setIsVisible(true)}
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
          <LanguageLoader fallback={<div className="text-center">加载中...</div>}>
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
  );
}