"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import HeroGuitar from "@/components/three/HeroGuitar";
import ThreeBackground from "@/components/three/ThreeBackground";
import { LanguageLoader } from "@/components/ui/LanguageLoader";
import { Navigation } from "@/components/ui/Navigation";
import { useLanguage } from "@/lib/language-context";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center z-20 overflow-x-hidden">
      {/* Three.js 背景特效 - 仅限于第一屏 */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* 导航菜单 */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <Navigation showLanguageSwitcher={true} transparent={true} />
      </div>

      {/* 桌面端左侧吉他组件 */}
      <div className="hidden w-[60vw] h-screen lg:block absolute left-0 top-0 z-10">
        <motion.div
          className="top-0 w-[60vw] h-screen"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroGuitar />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:pr-[10%] relative z-40">
        {/* 桌面端文字内容 */}
        <motion.div
          className="hidden lg:block text-left ml-[50vw]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LanguageLoader fallback={<div className="text-white">加载中...</div>}>
            <div className=" flex flex-col items-start">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent whitespace-nowrap drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("home.title")}
              </motion.h1>
              <motion.span
                className="text-xl md:text-2xl text-gray-300 font-light tracking-wider whitespace-nowrap drop-shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                MOTOHIRO HATA
              </motion.span>
              <motion.p
                className="text-xl md:text-2xl mt-6 text-gray-200 whitespace-nowrap drop-shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t("home.subtitle")}
              </motion.p>
              <motion.button
                className="mt-8 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors transform hover:scale-105 transition-transform border border-white/30 drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("home.listen")}
              </motion.button>
            </div>
          </LanguageLoader>
        </motion.div>

        {/* 移动端上下布局 */}
        <div className="lg:hidden flex flex-col items-center relative z-40">
          {/* 移动端：吉他模型 */}
          <motion.div
            className="h-[50vh] w-full max-w-sm mb-8 relative z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroGuitar />
          </motion.div>

          {/* 移动端：标题和文字 */}
          <motion.div
            className="text-center w-full relative z-30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LanguageLoader fallback={<div className="text-white">加载中...</div>}>
              <div className="flex flex-col items-center">
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent whitespace-nowrap drop-shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {t("home.title")}
                </motion.h1>
                <motion.span
                  className="text-lg md:text-xl text-gray-300 font-light tracking-wider whitespace-nowrap drop-shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  MOTOHIRO HATA
                </motion.span>
                <motion.p
                  className="text-lg md:text-xl mt-4 text-gray-200 whitespace-nowrap drop-shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t("home.subtitle")}
                </motion.p>
                <motion.button
                  className="mt-6 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold hover:bg-white/30 transition-colors transform hover:scale-105 transition-transform border border-white/30 drop-shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t("home.listen")}
                </motion.button>
              </div>
            </LanguageLoader>
          </motion.div>
        </div>
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
  );
}