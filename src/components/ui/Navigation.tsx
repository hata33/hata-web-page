"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageLoader } from "./LanguageLoader";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavigationProps {
  className?: string;
  showLanguageSwitcher?: boolean;
  transparent?: boolean;
}

export function Navigation({
  className = "",
  showLanguageSwitcher = true,
  transparent = false,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isReady } = useLanguage();
  const pathname = usePathname();

  const navItems = isReady
    ? [
      { href: "/", label: t("navigation.home") },
      { href: "/about", label: t("navigation.about") },
      { href: "/music", label: t("navigation.music") },
      { href: "/videos", label: t("navigation.videos") },
      { href: "/concerts", label: t("navigation.concerts") },
      { href: "/news", label: t("navigation.news") },
      { href: "/contact", label: t("navigation.contact") },
    ]
    : [];

  const isActive = (href: string) => {
    return pathname === href || (href === "/" && pathname === "/");
  };

  return (
    <nav
      className={`${transparent ? "bg-transparent" : "bg-white/90 backdrop-blur-sm border-b border-gray-200"} ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors ${transparent ? "text-white hover:text-blue-200" : "text-gray-900 hover:text-blue-600"}`}
          >
            秦基博
          </Link>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-1 py-2 transition-colors ${isActive(item.href)
                    ? transparent
                      ? "text-blue-300 font-medium"
                      : "text-blue-600 font-medium"
                    : transparent
                      ? "text-gray-200 hover:text-white"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${transparent ? "bg-blue-300" : "bg-blue-600"}`}
                    layoutId="activeNav"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            {showLanguageSwitcher && (
              <LanguageSwitcher transparent={transparent} />
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="flex md:flex items-center gap-2">
            {showLanguageSwitcher && (
              <LanguageSwitcher transparent={transparent} />
            )}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${transparent ? "hover:bg-white/20" : "hover:bg-gray-100"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X
                  className={`w-6 h-6 ${transparent ? "text-white" : "text-gray-600"}`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${transparent ? "text-white" : "text-gray-600"}`}
                />
              )}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden py-4 border-t ${transparent ? "border-white/20 bg-black/80 backdrop-blur-sm" : "border-gray-200 bg-white"}`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-2 rounded-lg transition-colors ${isActive(item.href)
                    ? transparent
                      ? "bg-blue-600 text-white font-medium"
                      : "bg-blue-50 text-blue-600 font-medium"
                    : transparent
                      ? "text-gray-200 hover:bg-white/10"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
