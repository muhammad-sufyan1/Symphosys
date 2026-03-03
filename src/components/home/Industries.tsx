import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  'E-commerce & Retail',
  'SaaS & Tech',
  'Professional Services',
  'Health & Wellness',
  'Real Estate',
  'Hospitality & Food',
  'Education & Coaching',
  'Local Services'
];

export function Industries() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.industry-pill');
    gsap.from(items, {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.5)'
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-28 px-6 md:px-12 bg-bg overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 leading-none break-words">Industries <br/> We Serve</h2>
            <p className="text-base md:text-lg font-medium text-ink/80">We've worked with businesses across a wide range of industries and have a strong track record.</p>
          </div>
          <div className="lg:w-2/3 flex flex-wrap gap-3 justify-center lg:justify-start">
            {industries.map((industry, index) => (
              <div key={index} className="industry-pill px-5 md:px-6 py-2 md:py-3 rounded-full bg-surface text-ink text-sm md:text-lg font-display uppercase hover:bg-accent hover:text-white transition-colors duration-300 cursor-default shadow-sm hover:shadow-md hover:-translate-y-1">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
