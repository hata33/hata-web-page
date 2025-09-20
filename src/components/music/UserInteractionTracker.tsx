"use client";

import { useEffect } from "react";
import { useMusic } from "@/lib/music-context";

export function UserInteractionTracker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setHasUserInteracted } = useMusic();

  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      // 移除事件监听器，只需要一次交互
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    // 添加事件监听器
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [setHasUserInteracted]);

  return <>{children}</>;
}
