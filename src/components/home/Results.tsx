import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const results = [
  { metric: '340%', label: 'Revenue Increase', desc: 'A Shopify store owner who saw a 340% increase in monthly revenue within 90 days of a store redesign.' },
  { metric: '80+', label: 'Qualified Leads/Mo', desc: 'A B2B consulting firm that went from 0 to 80+ qualified leads per month through our lead generation system.' },
  { metric: '8x', label: 'ROAS Growth', desc: 'An e-commerce brand that scaled from $15K to $120K in monthly ad revenue after we rebuilt their creative strategy.' },
  { metric: '#1', label: 'Google Ranking', desc: 'A local service business that went from page 5 to position 1 on Google for their primary keyword in 6 months.' }
];

export function Results() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.result-box');
    items.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 20,
        transformOrigin: "bottom center",
        duration: 1.2,
        delay: i * 0.1,
        ease: 'elastic.out(1, 0.7)'
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-28 px-6 md:px-12 bg-bg overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-display text-4xl md:text-6xl uppercase mb-12 md:mb-20 text-center break-words">Real <span className="text-accent">Results</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {results.map((result, index) => (
            <div key={index} className="result-box bg-accent text-white p-6 md:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-display text-4xl md:text-6xl leading-none mb-4 md:mb-6">{result.metric}</h3>
              <div>
                <h4 className="font-display text-xl md:text-3xl uppercase mb-2">{result.label}</h4>
                <p className="text-sm md:text-lg font-medium text-white/90 leading-relaxed">{result.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
