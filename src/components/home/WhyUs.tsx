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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rows = gsap.utils.toArray('.reason-row');
    rows.forEach((row: any, i) => {
      gsap.from(row, {
        scrollTrigger: { trigger: row, start: 'top 88%' },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power3.out'
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-28 px-6 md:px-12 bg-bg overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-7xl uppercase leading-[0.85]">
            Why <span className="text-accent">Us?</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl font-medium max-w-2xl text-ink/60 leading-relaxed">
            We're not here to just run campaigns — we're here to grow your business.
          </p>
        </div>

        {/* Editorial rows */}
        <div className="border-b border-ink/10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="reason-row group border-t border-ink/10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start cursor-default"
            >
              <div className="md:col-span-1">
                <span className="font-display text-4xl md:text-5xl text-accent/25 group-hover:text-accent transition-colors duration-500 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-2xl md:text-3xl uppercase group-hover:text-accent transition-colors duration-500">
                  {reason.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-base md:text-lg text-ink/60 font-medium leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
