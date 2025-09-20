'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ja' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ja');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 客户端初始化时检测语言
    const savedLanguage = localStorage.getItem('language') as Language;

    if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'zh')) {
      setLanguageState(savedLanguage);
    } else {
      // 根据浏览器语言自动检测
      const browserLang = navigator.language.toLowerCase();
      const detectedLanguage = browserLang.startsWith('zh') ? 'zh' : 'ja';
      setLanguageState(detectedLanguage);
      localStorage.setItem('language', detectedLanguage);
    }

    setIsReady(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
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
    throw new Error('useLanguage must be used within a LanguageProvider');
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
      contact: "お問い合わせ"
    },
    home: {
      title: "秦基博",
      subtitle: "心に響く音楽の世界へ",
      listen: "音楽を聴く"
    },
    about: {
      title: "プロフィール",
      description: "シンガーソングライター秦基博のプロフィール"
    },
    music: {
      title: "音楽作品",
      album: "アルバム",
      single: "シングル",
      year: "年",
      tracks: "トラック",
      duration: "時間"
    },
    videos: {
      title: "MV",
      latest: "最新MV",
      all: "すべてのMV"
    },
    concerts: {
      title: "ライブ",
      schedule: "スケジュール",
      tickets: "チケット",
      venue: "会場"
    },
    news: {
      title: "ニュース",
      latest: "最新ニュース",
      archive: "アーカイブ"
    },
    contact: {
      title: "お問い合わせ",
      name: "お名前",
      email: "メールアドレス",
      message: "メッセージ",
      send: "送信"
    },
    common: {
      loading: "読み込み中...",
      error: "エラーが発生しました",
      back: "戻る",
      next: "次へ",
      previous: "前へ",
      close: "閉じる"
    }
  },
  zh: {
    navigation: {
      home: "首页",
      about: "简介",
      music: "音乐作品",
      videos: "MV",
      concerts: "演唱会",
      news: "新闻动态",
      contact: "联系我们"
    },
    home: {
      title: "秦基博",
      subtitle: "进入触动心灵的音乐世界",
      listen: "聆听音乐"
    },
    about: {
      title: "简介",
      description: "歌手秦基博的个人简介"
    },
    music: {
      title: "音乐作品",
      album: "专辑",
      single: "单曲",
      year: "年份",
      tracks: "曲目",
      duration: "时长"
    },
    videos: {
      title: "MV",
      latest: "最新MV",
      all: "所有MV"
    },
    concerts: {
      title: "演唱会",
      schedule: "日程",
      tickets: "门票",
      venue: "场地"
    },
    news: {
      title: "新闻动态",
      latest: "最新新闻",
      archive: "新闻档案"
    },
    contact: {
      title: "联系我们",
      name: "姓名",
      email: "邮箱",
      message: "留言",
      send: "发送"
    },
    common: {
      loading: "加载中...",
      error: "发生错误",
      back: "返回",
      next: "下一页",
      previous: "上一页",
      close: "关闭"
    }
  }
};