"use client";

import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { BackButton } from "@/components/ui/BackButton";

export default function NewsPage() {
  const { t }: any = useLanguage();

  const news = t("news.items");

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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
            {t("news.title")}
          </h1>

          <div className="space-y-8">
            {news.map((item: any, index: number) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                      {item.date}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 line-clamp-2">{item.title}</h2>
                    <p className="text-gray-700 leading-relaxed line-clamp-4">
                      {item.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
