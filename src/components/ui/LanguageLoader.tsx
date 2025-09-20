'use client';

import { useLanguage } from '@/lib/language-context';

interface LanguageLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LanguageLoader({ children, fallback }: LanguageLoaderProps) {
  const { isReady } = useLanguage();

  if (!isReady) {
    return fallback || <div className="animate-pulse">加载中...</div>;
  }

  return <>{children}</>;
}