import React, { useRef } from 'react';
import { Star } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const reviews = [
  {
    name: 'Alyssa Morgan',
    company: 'Northline Interiors',
    quote:
      'Symphosys rebuilt our website and funnel. Our inbound lead quality improved in the first 30 days.',
    service: 'Web Development + Lead Generation',
  },
  {
    name: 'Daniel Reed',
    company: 'Motive Labs',
    quote:
      'Their team connected paid ads, landing pages, and creative in one clear system. Conversion rate kept climbing.',
    service: 'Digital Marketing + Creative Ads',
  },
  {
    name: 'Priya Shah',
    company: 'Verde Commerce',
    quote:
      'The Shopify redesign was clean, fast, and conversion-focused. Mobile checkout drop-off went down immediately.',
    service: 'Shopify Store Design',
  },
  {
    name: 'Marcus Lee',
    company: 'Bluepeak Logistics',
    quote:
      'The brand messaging and ad creative finally matched our market. Sales conversations became easier and faster.',
    service: 'Brand Building + Video Editing',
  },
  {
    name: 'Elena Cruz',
    company: 'Nexa Wellness',
    quote:
      'Professional execution with transparent communication. They gave us strategy and implementation, not just ideas.',
    service: 'Growth Marketing',
  },
];

interface ReviewCardProps {
  name: string;
  company: string;
  quote: string;
  service: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  company,
  quote,
  service,
}) => {
  return (
    <article className="w-[320px] md:w-[360px] shrink-0 rounded-3xl border border-bg/20 bg-white/5 backdrop-blur-sm p-6">
      <div className="flex items-center gap-1 text-accent mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={14} fill="currentColor" />
        ))}
      </div>
      <p className="text-sm md:text-base text-bg/85 leading-relaxed font-medium">"{quote}"</p>
      <p className="mt-5 text-[10px] md:text-xs uppercase tracking-[0.2em] text-bg/50 font-bold">{service}</p>
      <p className="mt-2 font-display text-xl uppercase text-white">{name}</p>
      <p className="text-bg/70 font-medium">{company}</p>
    </article>
  );
};

export function ClientReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const trackOne = sectionRef.current.querySelector('[data-review-track="one"]');
      const trackTwo = sectionRef.current.querySelector('[data-review-track="two"]');
      const orbOne = sectionRef.current.querySelector('[data-review-orb="one"]');
      const orbTwo = sectionRef.current.querySelector('[data-review-orb="two"]');

      gsap.from('[data-review-headline]', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.to(trackOne, { xPercent: -50, duration: 36, repeat: -1, ease: 'none' });
      gsap.fromTo(trackTwo, { xPercent: -50 }, { xPercent: 0, duration: 40, repeat: -1, ease: 'none' });
      gsap.to(orbOne, { xPercent: 8, yPercent: -8, scale: 1.08, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(orbTwo, { xPercent: -7, yPercent: 9, scale: 1.1, duration: 13, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    },
    { scope: sectionRef },
  );

  const rowOne = [...reviews, ...reviews];
  const rowTwo = [...reviews.slice(2), ...reviews.slice(0, 2), ...reviews.slice(2), ...reviews.slice(0, 2)];

  return (
    <section ref={sectionRef} className="relative bg-ink text-bg py-20 md:py-24 overflow-hidden border-t border-bg/10">
      <div className="absolute inset-0 pointer-events-none">
        <div data-review-orb="one" className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
        <div data-review-orb="two" className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-bg/50 font-bold mb-5">Client Reviews</p>
        <h2 data-review-headline className="font-display text-4xl md:text-6xl uppercase leading-[0.9] max-w-5xl">
          Brands Trust Symphosys to Build Real Growth
        </h2>
      </div>

      <div className="space-y-5">
        <div className="overflow-hidden">
          <div data-review-track="one" className="flex gap-5 w-max px-6 md:px-12">
            {rowOne.map((review, index) => (
              <ReviewCard key={`one-${index}`} {...review} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div data-review-track="two" className="flex gap-5 w-max px-6 md:px-12">
            {rowTwo.map((review, index) => (
              <ReviewCard key={`two-${index}`} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
