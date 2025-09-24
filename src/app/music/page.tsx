"use client";

import { AlbumTimeline } from "@/components/music/AlbumTimeline";
import { BackButton } from "@/components/ui/BackButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/language-context";

interface Track {
  id: number;
  title: string;
  duration: string;
}

interface Album {
  id: number;
  title: string;
  year: string;
  coverImage?: string;
  tracks: Track[];
  description?: string;
  label?: string;
}

export default function MusicPage() {
  const { t } = useLanguage();

  const albums: Album[] = [
    {
      id: 1,
      title: "コペルニクス",
      year: "2023",
      label: "AUGUSTA RECORDS",
      description:
        "2023年リリースの最新アルバム。コペルニクスの地動説のように、音楽の新しい視点を提供する作品集。",
      tracks: [
        { id: 1, title: "螺旋", duration: "4:23" },
        { id: 2, title: "惑星タウン", duration: "3:45" },
        { id: 3, title: "太陽が見えたら", duration: "4:12" },
        { id: 4, title: "夕凪フィルム", duration: "3:58" },
        { id: 5, title: "コペルニクス", duration: "5:01" },
        { id: 6, title: "水彩画", duration: "3:32" },
        { id: 7, title: "青い蝶", duration: "4:15" },
        { id: 8, title: "君の声", duration: "4:28" },
        { id: 9, title: "街灯り", duration: "3:54" },
        { id: 10, title: "春風", duration: "4:07" },
        { id: 11, title: "星が落ちる夜", duration: "4:41" },
        { id: 12, title: "明日へ", duration: "5:16" },
      ],
    },
    {
      id: 2,
      title: "青の光景",
      year: "2021",
      label: "AUGUSTA RECORDS",
      description:
        "2021年リリース。青い光をテーマに、心の風景を描いたアルバム。",
      tracks: [
        { id: 1, title: "青の光景", duration: "4:33" },
        { id: 2, title: "スパークル", duration: "3:47" },
        { id: 3, title: "透明な翼", duration: "4:05" },
        { id: 4, title: "水面に映る月", duration: "3:52" },
        { id: 5, title: "風の詩", duration: "4:18" },
        { id: 6, title: "君と見た空", duration: "4:01" },
        { id: 7, title: "光の軌跡", duration: "3:39" },
        { id: 8, title: "夕凪の街", duration: "4:24" },
        { id: 9, title: "青い鳥", duration: "3:56" },
        { id: 10, title: "明日の君へ", duration: "4:30" },
      ],
    },
    {
      id: 3,
      title: "ひまわりの約束",
      year: "2014",
      label: "AUGUSTA RECORDS",
      description:
        "映画『STAND BY ME ドラえもん』主題歌。大ヒットした代表曲を含むアルバム。",
      tracks: [
        { id: 1, title: "ひまわりの約束", duration: "4:51" },
        { id: 2, title: "Rain", duration: "4:32" },
        { id: 3, title: "青い栞", duration: "4:08" },
        { id: 4, title: "ダイアローグ", duration: "3:45" },
        { id: 5, title: "きみのとなわたる", duration: "4:12" },
        { id: 6, title: "Honey Drop", duration: "3:38" },
        { id: 7, title: "メロディ", duration: "4:05" },
        { id: 8, title: "ありがとう", duration: "4:28" },
      ],
    },
    {
      id: 4,
      title: "Documentary",
      year: "2010",
      label: "AUGUSTA RECORDS",
      description:
        "2010年リリース。ドキュメンタリーな視点で人生を描いたアルバム。",
      tracks: [
        { id: 1, title: " Documentary", duration: "4:15" },
        { id: 2, title: "アイ", duration: "3:52" },
        { id: 3, title: "パレード", duration: "4:08" },
        { id: 4, title: "赤スイートピ", duration: "3:45" },
        { id: 5, title: "ミッドナイトスクープ", duration: "4:21" },
        { id: 6, title: "バタフライ", duration: "3:38" },
        { id: 7, title: "君のとなりで", duration: "4:12" },
        { id: 8, title: "歩く", duration: "4:55" },
      ],
    },
    {
      id: 5,
      title: "ALRIGHT",
      year: "2008",
      label: "AUGUSTA RECORDS",
      description: "メジャーデビューアルバム。若々しいエネルギーに満ちた作品。",
      tracks: [
        { id: 1, title: "ALRIGHT", duration: "3:48" },
        { id: 2, title: "シンクロ", duration: "4:02" },
        { id: 3, title: " trick", duration: "3:35" },
        { id: 4, title: "君という花", duration: "4:15" },
        { id: 5, title: "僕らの物語", duration: "4:28" },
        { id: 6, title: "サヨナラ", duration: "3:52" },
        { id: 7, title: "世界が終るまでは…", duration: "4:08" },
        { id: 8, title: "歩いて帰ろう", duration: "4:33" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* 顶部栏 */}
        <div className="flex justify-between items-center mb-8">
          {/* 返回按钮 */}
          <BackButton />

          {/* 语言切换器 */}
          <LanguageSwitcher />
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("music.title")}
          </h1>

          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            秦基博の音楽作品の時間線。デビューから最新作までのアルバムリリース歴をご紹介します。
          </p>

          {/* 专辑时间线 */}
          <div className="py-8">
            <AlbumTimeline albums={albums} />
          </div>
        </div>
      </div>
    </div>
  );
}
