import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cursor.style.display = 'none';
      return;
    }

    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      return;
    }

    const xTo = gsap.quickTo(cursor, "x", {duration: 0.4, ease: "power3"});
    const yTo = gsap.quickTo(cursor, "y", {duration: 0.4, ease: "power3"});

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effects for links/buttons
    const handleHover = () => {
      gsap.to(cursor, { 
        scale: 3, 
        backgroundColor: 'transparent', 
        border: '1px solid #FF5722', 
        duration: 0.3 
      });
    };
    
    const handleLeave = () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: '#FF5722', 
        border: 'none', 
        duration: 0.3 
      });
    };

    const handlePointerOver = (event: Event) => {
      const target = event.target as Element | null;
      if (!target) return;
      if (target.closest('a, button')) {
        handleHover();
      }
    };

    const handlePointerOut = (event: Event) => {
      const target = event.target as Element | null;
      if (!target) return;
      if (target.closest('a, button')) {
        handleLeave();
      }
    };

    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block will-change-transform"
    />
  );
}
