"use client";

import { useState, useEffect } from "react";

interface UseScrollDirectionReturn {
  scrollDirection: "up" | "down";
  scrollY: number;
}

export function useScrollDirection(): UseScrollDirectionReturn {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
      setScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { scrollDirection, scrollY };
}
