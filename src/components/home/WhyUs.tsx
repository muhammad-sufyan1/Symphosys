import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  { title: 'Everything under one roof', desc: 'No more managing multiple agencies, freelancers, and tools that don\'t talk to each other. We handle the full picture and keep it all aligned.' },
  { title: 'Strategy before execution', desc: 'We never start working until we understand your business, your audience, and your goals. Every deliverable is connected to a clear objective.' },
  { title: 'Transparent communication', desc: 'You always know what we\'re working on, where it stands, and what\'s coming next. No vague updates, no silence, no surprises.' },
  { title: 'Results, not reports', desc: 'We track the metrics that matter to your bottom line — leads, conversions, revenue — not vanity numbers that look good on paper but don\'t grow your business.' },
  { title: 'A team, not a freelancer', desc: 'You get strategists, designers, developers, copywriters, and marketers working together on your account — not one person wearing every hat.' }
];

export function WhyUs() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.reason-card');
    cards.forEach((card: any, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.9,
        duration: 1.2,
        ease: 'expo.out'
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-28 px-6 md:px-12 bg-bg overflow-visible">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div className="lg:w-1/2 relative lg:sticky lg:top-32 z-10 h-fit">
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-none mb-4 md:mb-6 break-words">Why <br/> <span className="text-accent">Us?</span></h2>
          <p className="text-base md:text-lg font-medium max-w-md text-ink/80">We're not here to just run campaigns — we're here to grow your business.</p>
        </div>
        <div className="lg:w-1/2 space-y-6 md:space-y-8">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card bg-surface p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent text-white flex items-center justify-center font-display text-2xl md:text-3xl mb-6">
                {index + 1}
              </div>
              <h3 className="font-display text-2xl md:text-3xl uppercase mb-3 md:mb-4">{reason.title}</h3>
              <p className="text-sm md:text-lg font-medium leading-relaxed text-ink/80">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
