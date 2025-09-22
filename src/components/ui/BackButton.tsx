"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

interface BackButtonProps {
  className?: string;
  variant?: "default" | "minimal";
}

export function BackButton({ className = "", variant = "default" }: BackButtonProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleBack = () => {
    router.back();
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={handleBack}
        className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t("common.back") || "返回"}</span>
      </button>
    );
  }

  return (
    <motion.button
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ArrowLeft className="w-4 h-4 text-gray-600" />
      <span className="text-gray-700">{t("common.back") || "返回"}</span>
    </motion.button>
  );
}