import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Discovery', desc: 'We start by understanding your business deeply: your goals, your customers, your competitors, and what\'s working or not working right now. No assumptions.' },
  { num: '02', title: 'Strategy', desc: 'Based on discovery, we build a clear roadmap — what we\'re doing, why we\'re doing it, in what order, and how we\'ll measure success. You approve before anything is built.' },
  { num: '03', title: 'Execution', desc: 'Our team gets to work. Every deliverable goes through internal quality review before it reaches you. We meet deadlines and communicate proactively throughout.' },
  { num: '04', title: 'Review & Optimize', desc: 'After launch or delivery, we analyze performance data, identify what\'s working, and continuously optimize to improve results over time.' }
];

export function Process() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = gsap.utils.toArray('.process-node');
    items.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out'
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-28 px-6 md:px-12 bg-ink text-bg overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-6xl uppercase">
            Our <span className="text-accent">Process</span>
          </h2>
        </div>

        {/* Desktop: Horizontal connected timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Horizontal connecting line */}
            <div className="absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-gradient-to-r from-accent/30 via-white/[0.08] to-accent/30" />

            <div className="grid grid-cols-4 gap-6 lg:gap-10">
              {steps.map((step, index) => (
                <div key={index} className="process-node group relative text-center">
                  {/* Node circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full border-2 border-accent/30 bg-ink flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_0_24px_rgba(255,106,61,0.15)]">
                    <span className="font-display text-lg text-accent/60 group-hover:text-accent transition-colors duration-500">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl uppercase mb-4 group-hover:text-accent transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-bg/45 font-medium leading-relaxed text-sm lg:text-base">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical connected timeline */}
        <div className="md:hidden relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-white/[0.08] to-transparent" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="process-node group flex gap-8 items-start">
                {/* Node circle */}
                <div className="relative z-10 shrink-0 w-12 h-12 rounded-full border-2 border-accent/30 bg-ink flex items-center justify-center transition-all duration-500 group-hover:border-accent">
                  <span className="font-display text-base text-accent/60 group-hover:text-accent transition-colors duration-500">
                    {step.num}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl uppercase mb-3 group-hover:text-accent transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-bg/45 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
