import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CalendarClock,
  ChartNoAxesCombined,
  Globe,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from './Button';
import { useBookingModal } from '../contexts/BookingModalContext';

gsap.registerPlugin(ScrollTrigger);

export function ConsultationCtaBox() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBookingModal();

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '.consultation-cta-shell',
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
          rotateX: -7,
          transformOrigin: '50% 100%',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        },
      );

      gsap.fromTo(
        '.consultation-stagger',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.52,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      );

    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative px-6 md:px-12 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="consultation-cta-shell relative w-full max-w-5xl">
          <div className="rounded-[36px] bg-[linear-gradient(140deg,rgba(255,106,61,0.7),rgba(28,27,23,0.72),rgba(255,106,61,0.45))] p-[1px] shadow-[0_30px_80px_rgba(0,0,0,0.23)]">
            <div className="relative rounded-[35px] bg-ink text-bg overflow-hidden">
              <div className="consultation-beam absolute -top-[38%] left-[36%] h-[180%] w-[30%] rotate-[18deg] bg-gradient-to-b from-accent/45 via-accent/10 to-transparent blur-[34px] opacity-25" />

              <div className="absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(circle_at_50%_42%,black,transparent_80%)]">
                <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.11)_1px,transparent_1px)] bg-[size:36px_36px]" />
              </div>

              <div className="consultation-ring-1 pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bg/10" />
              <div className="consultation-ring-2 pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20" />

              <div className="absolute -left-4 md:left-6 top-12 consultation-orbit bg-bg/10 border border-bg/15 backdrop-blur-md rounded-2xl p-3">
                <Rocket className="w-5 h-5 text-accent" />
              </div>
              <div className="absolute right-5 md:right-10 top-9 consultation-orbit bg-bg/10 border border-bg/15 backdrop-blur-md rounded-2xl p-3">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div className="absolute left-8 md:left-16 bottom-16 consultation-orbit bg-bg/10 border border-bg/15 backdrop-blur-md rounded-2xl p-3">
                <ChartNoAxesCombined className="w-5 h-5 text-accent" />
              </div>
              <div className="absolute right-8 md:right-16 bottom-14 consultation-orbit bg-bg/10 border border-bg/15 backdrop-blur-md rounded-2xl p-3">
                <Globe className="w-5 h-5 text-accent" />
              </div>

              <div className="relative z-10 px-7 py-14 md:px-14 md:py-16 text-center">
                <div className="consultation-stagger inline-flex items-center gap-2 border border-bg/25 bg-bg/10 rounded-full px-4 py-2 mb-7">
                  <CalendarClock className="w-4 h-4 text-accent" />
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.16em] text-bg/90">
                    Free 30-Minute Consultation
                  </span>
                </div>

                <h2 className="consultation-stagger font-display text-4xl md:text-6xl leading-[0.88] uppercase max-w-4xl mx-auto">
                  Get A <span className="text-accent">Growth Blueprint</span> In One Strategic Call
                </h2>

                <p className="consultation-stagger mt-6 text-base md:text-xl text-bg/80 max-w-3xl mx-auto font-medium leading-relaxed">
                  We audit your current funnel, identify the highest-ROI opportunities, and map an action plan you can execute immediately.
                </p>

                <div className="consultation-stagger mt-9 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-bg/20 bg-bg/10 px-4 py-2 text-xs md:text-sm font-semibold text-bg/90">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    No Obligation
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-bg/20 bg-bg/10 px-4 py-2 text-xs md:text-sm font-semibold text-bg/90">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Actionable Plan
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-bg/20 bg-bg/10 px-4 py-2 text-xs md:text-sm font-semibold text-bg/90">
                    <ChartNoAxesCombined className="w-4 h-4 text-accent" />
                    ROI Focused
                  </div>
                </div>

                <div className="consultation-stagger mt-10 flex justify-center">
                  <Button
                    size="lg"
                    className="text-lg px-10 md:px-12"
                    onClick={() => openBookingModal('global-consultation-box')}
                  >
                    Book A Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
