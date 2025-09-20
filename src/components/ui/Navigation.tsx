'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LanguageLoader } from './LanguageLoader';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  className?: string;
  showLanguageSwitcher?: boolean;
}

export function Navigation({ className = "", showLanguageSwitcher = true }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isReady } = useLanguage();
  const pathname = usePathname();

  const navItems = isReady ? [
    { href: '/', label: t('navigation.home') },
    { href: '/about', label: t('navigation.about') },
    { href: '/music', label: t('navigation.music') },
    { href: '/videos', label: t('navigation.videos') },
    { href: '/concerts', label: t('navigation.concerts') },
    { href: '/news', label: t('navigation.news') },
    { href: '/contact', label: t('navigation.contact') },
  ] : [];

  const isActive = (href: string) => {
    return pathname === href || (href === '/' && pathname === '/');
  };

  return (
    <nav className={`bg-white/90 backdrop-blur-sm border-b border-gray-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            秦基博
          </Link>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-1 py-2 transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    layoutId="activeNav"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            {showLanguageSwitcher && <LanguageSwitcher />}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:flex items-center gap-2">
            {showLanguageSwitcher && <LanguageSwitcher />}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
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