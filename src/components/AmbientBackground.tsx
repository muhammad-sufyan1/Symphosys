import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) {
        return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return;
      }

      const blobOne = containerRef.current.querySelector('[data-ambient="blob-1"]');
      const blobTwo = containerRef.current.querySelector('[data-ambient="blob-2"]');
      const blobThree = containerRef.current.querySelector('[data-ambient="blob-3"]');
      const beam = containerRef.current.querySelector('[data-ambient="beam"]');
      const grid = containerRef.current.querySelector('[data-ambient="grid"]');
      const aura = containerRef.current.querySelector('[data-ambient="aura"]');
      const rings = containerRef.current.querySelectorAll('[data-ambient="ring"]');

      const timeline = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
      timeline
        .to(blobOne, { xPercent: 10, yPercent: 8, scale: 1.08, duration: 18 }, 0)
        .to(blobTwo, { xPercent: -8, yPercent: -10, scale: 1.12, duration: 22 }, 0)
        .to(blobThree, { xPercent: -6, yPercent: 9, scale: 1.07, duration: 20 }, 0)
        .to(beam, { xPercent: 4, yPercent: -6, rotate: 2.5, duration: 24 }, 0);

      gsap.to(grid, {
        backgroundPosition: '220px 160px',
        duration: 38,
        repeat: -1,
        ease: 'none',
      });

      rings.forEach((ring, index) => {
        gsap.to(ring, {
          scale: 1.1 + index * 0.05,
          opacity: 0.18 - index * 0.03,
          duration: 7 + index * 1.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50% 50%',
        });
      });

      if (aura && !window.matchMedia('(pointer: coarse)').matches) {
        const xTo = gsap.quickTo(aura, 'x', { duration: 1.2, ease: 'power3.out' });
        const yTo = gsap.quickTo(aura, 'y', { duration: 1.2, ease: 'power3.out' });

        const handleMove = (event: MouseEvent) => {
          const moveX = (event.clientX - window.innerWidth / 2) * 0.07;
          const moveY = (event.clientY - window.innerHeight / 2) * 0.07;
          xTo(moveX);
          yTo(moveY);
        };

        window.addEventListener('mousemove', handleMove);
        return () => {
          window.removeEventListener('mousemove', handleMove);
          timeline.kill();
          gsap.killTweensOf(grid);
          gsap.killTweensOf(rings);
        };
      }

      return () => {
        timeline.kill();
        gsap.killTweensOf(grid);
        gsap.killTweensOf(rings);
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        data-ambient="grid"
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(28,27,23,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,27,23,0.07) 1px, transparent 1px)',
          backgroundSize: '62px 62px',
        }}
      />

      <div
        data-ambient="blob-1"
        className="absolute -top-[22vh] -left-[14vw] w-[58vw] h-[58vw] max-w-[760px] max-h-[760px] rounded-full blur-[120px] opacity-70"
        style={{
          background:
            'radial-gradient(circle at 34% 28%, rgba(255,87,34,0.34) 0%, rgba(255,87,34,0.11) 46%, rgba(255,87,34,0.02) 70%, transparent 82%)',
        }}
      />
      <div
        data-ambient="blob-2"
        className="absolute -bottom-[26vh] -right-[18vw] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[130px] opacity-60"
        style={{
          background:
            'radial-gradient(circle at 70% 32%, rgba(28,27,23,0.22) 0%, rgba(28,27,23,0.08) 50%, rgba(28,27,23,0.02) 72%, transparent 82%)',
        }}
      />
      <div
        data-ambient="blob-3"
        className="absolute top-[38vh] left-[28vw] w-[34vw] h-[34vw] max-w-[430px] max-h-[430px] rounded-full blur-[95px] opacity-60"
        style={{
          background:
            'radial-gradient(circle at 42% 54%, rgba(255,153,102,0.26) 0%, rgba(255,153,102,0.08) 58%, rgba(255,153,102,0.02) 76%, transparent 84%)',
        }}
      />

      <div
        data-ambient="beam"
        className="absolute -top-[18vh] left-[42vw] w-[12vw] min-w-[110px] max-w-[190px] h-[140vh] rotate-[10deg] blur-[38px] opacity-35"
        style={{
          background: 'linear-gradient(180deg, rgba(255,87,34,0.42) 0%, rgba(255,87,34,0.06) 58%, transparent 100%)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div data-ambient="ring" className="w-[60vw] h-[60vw] max-w-[860px] max-h-[860px] rounded-full border border-ink/[0.06]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div data-ambient="ring" className="w-[52vw] h-[52vw] max-w-[720px] max-h-[720px] rounded-full border border-accent/[0.09]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div data-ambient="ring" className="w-[43vw] h-[43vw] max-w-[560px] max-h-[560px] rounded-full border border-ink/[0.08]" />
      </div>

      <div
        data-ambient="aura"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36vw] h-[36vw] max-w-[440px] max-h-[440px] rounded-full blur-[95px] opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(255,87,34,0.38) 0%, rgba(255,87,34,0.08) 52%, transparent 80%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(28,27,23,0.32) 0.65px, transparent 0.65px)',
          backgroundSize: '3px 3px',
          maskImage: 'radial-gradient(circle at 50% 45%, black 0%, black 52%, transparent 100%)',
        }}
      />
    </div>
  );
}
