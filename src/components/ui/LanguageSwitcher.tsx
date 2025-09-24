"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

const languages = [
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

interface LanguageSwitcherProps {
  transparent?: boolean;
}

export function LanguageSwitcher({
  transparent = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: "ja" | "zh") => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors shadow-sm border backdrop-blur-sm ${
          transparent
            ? "bg-black/40 hover:bg-black/60 text-white hover:text-gray-200 border-white/20"
            : "bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 border-white/30"
        }`}
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span
          className={`text-sm font-medium ${transparent ? "text-white" : "text-gray-800"}`}
        >
          {currentLanguage?.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""} ${transparent ? "text-white" : "text-gray-600"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code as "ja" | "zh")}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                language.code === currentLanguage?.code
                  ? "bg-blue-100 text-blue-700 border-r-4 border-blue-500"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {language.code === currentLanguage?.code && (
                <svg
                  className="w-4 h-4 ml-auto text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
