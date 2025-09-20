"use client";

import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export default function ConcertsPage() {
  const { t } = useLanguage();

  const concerts = [
    {
      date: "2024-03-15",
      venue: "東京国際フォーラム",
      city: "東京",
      status: "チケット発売中",
    },
    {
      date: "2024-03-20",
      venue: "大阪国際会議場",
      city: "大阪",
      status: "チケット発売中",
    },
    {
      date: "2024-04-10",
      venue: "名古屋国際会議場",
      city: "名古屋",
      status: "まもなく発売",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* 语言切换器 */}
        <div className="absolute top-4 right-4 z-20">
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
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">{concert.venue}</h3>
                    <p className="text-gray-600">
                      {concert.date} • {concert.city}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        concert.status === "チケット発売中"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {concert.status}
                    </span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
