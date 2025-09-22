"use client";

import { BackButton } from "@/components/ui/BackButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/language-context";

export default function MusicPage() {
  const { t } = useLanguage();

  const albums = [
    {
      title: "コペルニクス",
      year: "2023",
      tracks: 12,
      duration: "48:32",
    },
    {
      title: "青の光景",
      year: "2021",
      tracks: 10,
      duration: "42:15",
    },
    {
      title: "ひまわりの約束",
      year: "2014",
      tracks: 8,
      duration: "35:20",
    },
  ];

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
            {t("music.title")}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{album.title}</h3>
                  <p className="text-gray-600 mb-4">{album.year}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      {t("music.tracks")}: {album.tracks}
                    </span>
                    <span>
                      {t("music.duration")}: {album.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
