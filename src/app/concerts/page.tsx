"use client";

import { BackButton } from "@/components/ui/BackButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/language-context";

export default function ConcertsPage() {
  const { t } = useLanguage();

  const concerts = t("concerts.items");

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return t("concerts.statusAvailable");
      case "comingsoon":
        return t("concerts.statusComingSoon");
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "comingsoon":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            {t("concerts.title")}
          </h1>

          <div className="space-y-6">
            {concerts.map((concert, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {concert.venue}
                    </h3>
                    <p className="text-gray-600 truncate">
                      {concert.date} • {concert.city}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(concert.status)}`}
                    >
                      {getStatusText(concert.status)}
                    </span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                      {t("concerts.tickets")}
                    </button>
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
