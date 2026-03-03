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
    const items = gsap.utils.toArray('.process-item');
    items.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        scale: 0.9,
        rotation: i % 2 === 0 ? -5 : 5,
        duration: 1.2,
        ease: 'elastic.out(1, 0.7)'
      });
    });

    gsap.to('.process-num', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -80,
      scale: 1.2,
      opacity: 0.4,
      ease: 'none'
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-28 px-6 md:px-12 bg-ink text-bg overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-display text-4xl md:text-6xl uppercase text-center mb-16 md:mb-24 break-words">Our <span className="text-accent">Process</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
          {steps.map((step, index) => (
            <div key={index} className="process-item relative bg-surface text-ink p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-10">
              <div className="relative z-10">
                <div className="relative inline-block mb-3 md:mb-5">
                  <div className="process-num absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 md:-translate-x-4 font-display text-6xl md:text-[90px] text-accent opacity-20 leading-none z-0 select-none">
                    {step.num}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl uppercase relative z-10 pl-2 md:pl-4">{step.title}</h3>
                </div>
                <p className="text-sm md:text-lg font-medium leading-relaxed text-ink/80">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
