"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "ja" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ja");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 客户端初始化时检测语言
    const savedLanguage = localStorage.getItem("language") as Language;

    if (savedLanguage && (savedLanguage === "ja" || savedLanguage === "zh")) {
      setLanguageState(savedLanguage);
    } else {
      // 根据浏览器语言自动检测
      const browserLang = navigator.language.toLowerCase();
      const detectedLanguage = browserLang.startsWith("zh") ? "zh" : "ja";
      setLanguageState(detectedLanguage);
      localStorage.setItem("language", detectedLanguage);
    }

    setIsReady(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    try {
      const keys = key.split(".");
      let value: any = messages[language];

      for (const k of keys) {
        value = value?.[k];
      }

      return value || key;
    } catch {
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// 导入翻译消息
const messages = {
  ja: {
    navigation: {
      home: "ホーム",
      about: "プロフィール",
      music: "音楽作品",
      videos: "MV",
      concerts: "ライブ",
      news: "ニュース",
      contact: "お問い合わせ",
    },
    home: {
      title: "秦基博",
      subtitle: "心に響く音楽の世界へ",
      listen: "音楽を聴く",
      introduction: {
        title: "アーティスト紹介",
        subtitle: "メロディと詩が紡ぐ物語",
        description: "シンガーソングライターとして、心に響くメロディと詩で多くの人々を魅了しています。代表曲「ひまわりの約束」は、映画『STAND BY ME ドラえもん』の主題歌として大ヒットし、世代を超えて愛される楽曲となりました。",
        achievements: [
          {
            title: "代表作品",
            items: ["ひまわりの約束", "Rain", "青い栞", "ダイアローグ"]
          },
          {
            title: "受賞歴",
            items: ["日本レコード大賞", "JASRAC賞", "Space Shower Music Video Awards"]
          }
        ]
      }
    },
    about: {
      title: "プロフィール",
      description: "シンガーソングライター秦基博のプロフィール",
      profile: {
        name: "秦基博",
        bio: "シンガーソングライターとして、心に響くメロディと詩で多くの人々を魅了しています。代表曲「ひまわりの約束」は、映画『STAND BY ME ドラえもん』の主題歌として大ヒットしました。",
      },
    },
    music: {
      title: "音楽作品",
      album: "アルバム",
      single: "シングル",
      year: "年",
      tracks: "トラック",
      duration: "時間",
    },
    videos: {
      title: "MV",
      latest: "最新MV",
      all: "すべてのMV",
    },
    concerts: {
      title: "ライブ",
      schedule: "スケジュール",
      tickets: "チケット",
      venue: "会場",
    },
    news: {
      title: "ニュース",
      latest: "最新ニュース",
      archive: "アーカイブ",
      items: [
        {
          date: "2024-01-15",
          title: "ニューアルバム「コペルニクス」発売決定！",
          content: "待望のニューアルバムが3月15日に発売決定。全12曲収録の充実の内容です。",
        },
        {
          date: "2024-01-10",
          title: "全国ツアー2024開催決定",
          content: "3月から全国6都市を回るツアーを開催。チケットは1月20日より発売開始。",
        },
        {
          date: "2023-12-25",
          title: "年末特別配信ライブ",
          content: "12月31日に特別配信ライブを開催。ファンへの感謝を込めたスペシャルなステージ。",
        },
      ],
    },
    contact: {
      title: "お問い合わせ",
      name: "お名前",
      email: "メールアドレス",
      message: "メッセージ",
      send: "送信",
      success: "メッセージが送信されました。",
    },
    common: {
      loading: "読み込み中...",
      error: "エラーが発生しました",
      back: "戻る",
      next: "次へ",
      previous: "前へ",
      close: "閉じる",
    },
  },
  zh: {
    navigation: {
      home: "首页",
      about: "简介",
      music: "音乐作品",
      videos: "MV",
      concerts: "演唱会",
      news: "新闻动态",
      contact: "联系我们",
    },
    home: {
      title: "秦基博",
      subtitle: "进入触动心灵的音乐世界",
      listen: "聆听音乐",
      introduction: {
        title: "艺术家介绍",
        subtitle: "旋律与诗篇编织的故事",
        description: "作为创作歌手，以触动心灵的旋律和诗篇吸引了众多粉丝。代表作《向日葵的约定》作为电影《STAND BY ME 哆啦A梦》的主题曲大受欢迎，成为跨越世代的经典歌曲。",
        achievements: [
          {
            title: "代表作品",
            items: ["向日葵的约定", "Rain", "蓝色书签", "对话"]
          },
          {
            title: "获奖经历",
            items: ["日本唱片大奖", "JASRAC奖", "Space Shower音乐录影带奖"]
          }
        ]
      }
    },
    about: {
      title: "简介",
      description: "歌手秦基博的个人简介",
      profile: {
        name: "秦基博",
        bio: "作为创作歌手，以触动心灵的旋律和诗篇吸引了众多粉丝。代表作《向日葵的约定》作为电影《STAND BY ME 哆啦A梦》的主题曲大受欢迎。",
      },
    },
    music: {
      title: "音乐作品",
      album: "专辑",
      single: "单曲",
      year: "年份",
      tracks: "曲目",
      duration: "时长",
    },
    videos: {
      title: "MV",
      latest: "最新MV",
      all: "所有MV",
    },
    concerts: {
      title: "演唱会",
      schedule: "日程",
      tickets: "门票",
      venue: "场地",
    },
    news: {
      title: "新闻动态",
      latest: "最新新闻",
      archive: "新闻档案",
      items: [
        {
          date: "2024-01-15",
          title: "新专辑《哥白尼》发售决定！",
          content: "备受期待的新专辑将于3月15日发售。全12首歌曲的充实内容。",
        },
        {
          date: "2024-01-10",
          title: "2024全国巡演决定",
          content: "将于3月开始在全国6个城市举办巡演。门票将于1月20日开始发售。",
        },
        {
          date: "2023-12-25",
          title: "年末特别直播演出",
          content: "将于12月31日举办特别直播演出。表达对粉丝感谢的特殊舞台。",
        },
      ],
    },
    contact: {
      title: "联系我们",
      name: "姓名",
      email: "邮箱",
      message: "留言",
      send: "发送",
      success: "消息已发送。",
    },
    common: {
      loading: "加载中...",
      error: "发生错误",
      back: "返回",
      next: "下一页",
      previous: "上一页",
      close: "关闭",
    },
  },
};
