"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GSAPScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  background?: string;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scale' | 'rotate' | 'parallax';
}

export default function GSAPScrollSection({
  children,
  className = "",
  index = 0,
  background = "",
  animationType = "fadeInUp"
}: GSAPScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 根据不同的动画类型设置不同的动画效果
      switch (animationType) {
        case 'fadeInUp':
          gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'fadeInLeft':
          gsap.fromTo(sectionRef.current,
            { opacity: 0, x: -100 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'fadeInRight':
          gsap.fromTo(sectionRef.current,
            { opacity: 0, x: 100 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'scale':
          gsap.fromTo(sectionRef.current,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'rotate':
          gsap.fromTo(sectionRef.current,
            { opacity: 0, rotation: 10, scale: 0.9 },
            {
              opacity: 1,
              rotation: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'parallax':
          // 视差滚动效果
          gsap.to(sectionRef.current, {
            y: -50,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });

          gsap.fromTo(sectionRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;
      }

      // 背景颜色变化
      if (background) {
        gsap.to(sectionRef.current, {
          background,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1
          }
        });
      }

      // 为子元素添加错开的动画
      const elements = sectionRef.current.querySelectorAll('.animate-stagger');
      elements.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [animationType, background, index]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}