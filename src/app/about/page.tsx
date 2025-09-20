"use client";

import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* 语言切换器 */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher />
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
            {t("about.title")}
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            {t("about.description")}
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{t("about.profile.name")}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t("about.profile.bio")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
