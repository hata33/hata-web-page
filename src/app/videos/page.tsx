"use client";

import { BackButton } from "@/components/ui/BackButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/language-context";

export default function VideosPage() {
  const { t } = useLanguage();

  const videos = t("videos.items");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* 顶部栏 */}
        <div className="flex justify-between items-center mb-8">
          {/* 返回按钮 */}
          <BackButton />

          {/* 语言切换器 */}
          <LanguageSwitcher />
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
            {t("videos.title")}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-700 text-center">
                      <div className="text-4xl mb-2">🎬</div>
                      <p className="font-medium truncate">{video.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="bg-blue-600 rounded-full p-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm truncate">
                    {video.year} • {video.views} {t("videos.views")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
