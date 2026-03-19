import React, { useEffect } from 'react';
import gsap from 'gsap';

export function useMagnetic(ref: React.RefObject<HTMLElement>, strength: number = 0.3) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      if (window.matchMedia('(pointer: coarse)').matches) {
        return;
      }
      const hardwareConcurrency = navigator.hardwareConcurrency || 0;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0;
      if (hardwareConcurrency && hardwareConcurrency <= 4) {
        return;
      }
      if (deviceMemory && deviceMemory <= 4) {
        return;
      }
    }

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    let cachedRect: DOMRect | null = null;

    const handleMouseEnter = () => {
      cachedRect = element.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) cachedRect = element.getBoundingClientRect();
      const x = e.clientX - (cachedRect.left + cachedRect.width / 2);
      const y = e.clientY - (cachedRect.top + cachedRect.height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      cachedRect = null;
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}
