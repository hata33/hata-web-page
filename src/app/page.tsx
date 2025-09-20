"use client";

import { Navigation } from "@/components/ui/Navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { LanguageLoader } from "@/components/ui/LanguageLoader";
import ThreeBackground from "@/components/three/ThreeBackground";
import { useLanguage } from "@/lib/language-context";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen">
      {/* Three.js 背景特效 */}
      <ThreeBackground />

      {/* 导航菜单 */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex flex-col">
                <a href="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
                  秦基博
                </a>
                <span className="text-sm text-gray-300 font-light">
                  Motohiro Hata
                </span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <LanguageLoader>
                  <a href="/about" className="text-gray-200 hover:text-white transition-colors">
                    {t("navigation.about")}
                  </a>
                  <a href="/music" className="text-gray-200 hover:text-white transition-colors">
                    {t("navigation.music")}
                  </a>
                  <a href="/videos" className="text-gray-200 hover:text-white transition-colors">
                    {t("navigation.videos")}
                  </a>
                  <a href="/concerts" className="text-gray-200 hover:text-white transition-colors">
                    {t("navigation.concerts")}
                  </a>
                  <a href="/news" className="text-gray-200 hover:text-white transition-colors">
                    {t("navigation.news")}
                  </a>
                  <a href="/contact" className="text-gray-200 hover:text-white transition-colors">
                    {t("navigation.contact")}
                  </a>
                </LanguageLoader>
              </nav>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4 pt-20">
          <LanguageLoader fallback={<div className="text-white">加载中...</div>}>
            <div className="flex flex-col items-center">
              <h1 className="text-6xl md:text-8xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                {t("home.title")}
              </h1>
              <span className="text-xl md:text-2xl text-gray-300 font-light tracking-wider">
                MOTOHIRO HATA
              </span>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {t("home.subtitle")}
            </p>
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors transform hover:scale-105 transition-transform border border-white/30">
              {t("home.listen")}
            </button>
          </LanguageLoader>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
