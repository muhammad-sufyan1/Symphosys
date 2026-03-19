import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../Button';
import { useBookingModal } from '../../contexts/BookingModalContext';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBookingModal();

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tl = gsap.timeline();
    tl.from('.hero-word', {
      y: 150,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power4.out',
      rotation: 8,
      transformOrigin: 'left bottom'
    })
    .from('.hero-sub', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-btn', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.5)'
    }, '-=0.6');

    gsap.to('.hero-marquees', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        toggleActions: 'play none none none',
      },
      y: 80,
      duration: 1.5,
      ease: 'power2.out'
    });

    gsap.to('.hero-orb', {
      xPercent: 8,
      yPercent: -6,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.hero-orb-alt', {
      xPercent: -6,
      yPercent: 8,
      duration: 16,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[100svh] pt-24 md:pt-28 pb-20 flex flex-col justify-center overflow-hidden px-6 md:px-12 bg-bg">
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Vertical Structural Lines */}
        <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-gradient-to-b from-transparent via-ink/10 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gradient-to-b from-transparent via-ink/5 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-gradient-to-b from-transparent via-ink/10 to-transparent"></div>
        
        {/* Soft Glows */}
        <div className="hero-orb absolute top-[-10%] right-[-5%] w-[48vw] h-[48vw] rounded-full bg-accent/10 blur-[70px] will-change-transform" />
        <div className="hero-orb-alt absolute bottom-[-12%] left-[-6%] w-[40vw] h-[40vw] rounded-full bg-ink/10 blur-[60px] will-change-transform" />
        <div className="absolute top-[20%] left-[45%] w-32 h-32 rounded-full bg-accent/15 blur-[40px]" />
      </div>

      <div className="hero-content-wrapper max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        <h1 className="font-display text-5xl md:text-[10vw] leading-[0.85] uppercase tracking-tight text-ink flex flex-wrap gap-x-3 md:gap-x-6 gap-y-1 md:gap-y-2 break-words">
          <span className="overflow-hidden inline-block"><span className="hero-word inline-block">We</span></span>
          <span className="overflow-hidden inline-block"><span className="hero-word inline-block">Build</span></span>
          <span className="overflow-hidden inline-block"><span className="hero-word inline-block text-accent">Brands</span></span>
          <span className="overflow-hidden inline-block"><span className="hero-word inline-block">That</span></span>
          <span className="overflow-hidden inline-block"><span className="hero-word inline-block">Actually</span></span>
          <span className="flex gap-x-3 md:gap-x-6 whitespace-nowrap">
            <span className="overflow-hidden inline-block"><span className="hero-word inline-block text-outline">Grow</span></span>
            <span className="overflow-hidden inline-block"><span className="hero-word inline-block">Online</span></span>
          </span>
        </h1>
        
        <div className="mt-10 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between">
          <p className="hero-sub text-base md:text-xl font-medium max-w-lg leading-relaxed text-ink/80">
            Running a business is hard enough without worrying about your website, your marketing, your branding, and your content all at once. That's exactly why we exist.
          </p>
          <div className="hero-btn w-full md:w-auto shrink-0">
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={() => openBookingModal('home-hero')}
            >
              Get a Free Strategy Call
            </Button>
          </div>
        </div>
      </div>

      {/* Marquees */}
      <div className="hero-marquees relative mt-10 md:mt-14 -left-[5%] w-[110%] z-0 shrink-0 hidden md:flex flex-col gap-2">
        {/* Bar 1: Accent (Right to Left) */}
        <div className="overflow-hidden py-3 bg-accent text-white rotate-[-2deg] shadow-lg">
          <div className="marquee-track-1 flex gap-6 items-center w-max">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-6 items-center whitespace-nowrap">
                <span className="font-display text-2xl md:text-3xl uppercase text-white">Web Design</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                <span className="font-display text-2xl md:text-3xl uppercase text-white">Digital Marketing</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                <span className="font-display text-2xl md:text-3xl uppercase text-white">Video Production</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                <span className="font-display text-2xl md:text-3xl uppercase text-white">Brand Strategy</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar 2: Black (Left to Right) */}
        <div className="overflow-hidden py-3 bg-ink text-white rotate-[1deg] shadow-lg">
          <div className="marquee-track-2 flex gap-6 items-center w-max">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-6 items-center whitespace-nowrap">
                <span className="font-display text-2xl md:text-3xl uppercase text-white">Data-Driven Results</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                <span className="font-display text-2xl md:text-3xl uppercase text-white">Award-Winning Team</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                <span className="font-display text-2xl md:text-3xl uppercase text-white">Custom Solutions</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                <span className="font-display text-2xl md:text-3xl uppercase text-white">ROI Focused</span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
