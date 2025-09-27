"use client";

import GSAPShowcase from "@/components/animation/GSAPShowcase";
import ArtistIntroduction from "@/components/home/ArtistIntroduction";
import ConcertExperience from "@/components/home/ConcertExperience";
import GSAPScrollSection from "@/components/home/GSAPScrollSection";
import HeroSection from "@/components/home/HeroSection";
import InteractiveTimeline from "@/components/home/InteractiveTimeline";
import MusicShowcase from "@/components/home/MusicShowcase";
import NewsUpdates from "@/components/home/NewsUpdates";
import PoetrySection from "@/components/home/PoetrySection";
import VideoGallery from "@/components/home/VideoGallery";
import { Navigation } from "@/components/ui/Navigation";

export default function HomePage() {
  return (
    <div className="relative">
      {/* 导航菜单 */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation showLanguageSwitcher={true} transparent={true} />
      </div>

      {/* 第九屏：诗歌展示 */}
      <PoetrySection />
      {/* 第一屏：英雄区域 */}
      <HeroSection />

      {/* 第二屏：艺术家介绍 */}
      <ArtistIntroduction />

      {/* 第三屏：音乐展示 */}
      <MusicShowcase />

      {/* 第四屏：交互式时间线 */}
      <InteractiveTimeline />

      {/* 第五屏：视频画廊 */}
      <VideoGallery />

      {/* 第六屏：演唱会体验 */}
      <ConcertExperience />

      {/* 第七屏：最新动态 */}
      <NewsUpdates />

      {/* 第八屏：GSAP 动画展示 */}
      <GSAPShowcase />



      {/* 更多屏幕可以继续添加 */}
      {/* <GSAPScrollSection
        className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"
        animationType="scale"
        index={8}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6">创意无限</h2>
          <p className="text-xl max-w-2xl mx-auto">
            探索更多可能，体验前所未有的视觉盛宴
          </p>
        </div>
      </GSAPScrollSection>

      <GSAPScrollSection
        className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600"
        animationType="fadeInLeft"
        index={9}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6 animate-stagger">激情燃烧</h2>
          <p className="text-xl max-w-2xl mx-auto animate-stagger">
            用音乐点燃心灵，用创意改变世界
          </p>
        </div>
      </GSAPScrollSection>

      <GSAPScrollSection
        className="bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600"
        animationType="fadeInRight"
        index={10}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6 animate-stagger">梦想成真</h2>
          <p className="text-xl max-w-2xl mx-auto animate-stagger">
            每一个音符都承载着对未来的期许
          </p>
        </div>
      </GSAPScrollSection>

      <GSAPScrollSection
        className="bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600"
        animationType="parallax"
        index={11}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6 animate-stagger">无限可能</h2>
          <p className="text-xl max-w-2xl mx-auto animate-stagger">
            在音乐的世界里，一切皆有可能
          </p>
        </div>
      </GSAPScrollSection>

      <GSAPScrollSection
        className="bg-gradient-to-br from-pink-400 via-rose-500 to-red-600"
        animationType="rotate"
        index={12}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6 animate-stagger">温暖人心</h2>
          <p className="text-xl max-w-2xl mx-auto animate-stagger">
            用旋律传递爱与希望的力量
          </p>
        </div>
      </GSAPScrollSection>

      <GSAPScrollSection
        className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600"
        animationType="fadeInUp"
        index={13}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6 animate-stagger">阳光明媚</h2>
          <p className="text-xl max-w-2xl mx-auto animate-stagger">
            如同阳光般温暖的音乐作品
          </p>
        </div>
      </GSAPScrollSection>

      <GSAPScrollSection
        className="bg-gradient-to-br from-green-400 via-teal-500 to-blue-600"
        animationType="scale"
        index={14}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6 animate-stagger">生生不息</h2>
          <p className="text-xl max-w-2xl mx-auto animate-stagger">
            音乐的力量永不停止，创作的灵感源源不断
          </p>
        </div>
      </GSAPScrollSection>

      <GSAPScrollSection
        className="bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600"
        animationType="fadeInUp"
        index={15}
      >
        <div className="text-center text-white">
          <h2 className="text-6xl font-bold mb-6 animate-stagger">感谢聆听</h2>
          <p className="text-xl max-w-2xl mx-auto animate-stagger">
            期待与您在下一次音乐之旅中相遇
          </p>
        </div>
      </GSAPScrollSection> */}
    </div>
  );
}
