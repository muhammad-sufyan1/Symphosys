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
    <article className="w-full rounded-3xl border border-bg/20 bg-white/5 p-6">
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

      gsap.from('[data-review-headline]', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('[data-review-card]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef },
  );

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

      <div className="px-6 md:px-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={index} data-review-card>
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Symphosys',
            url: 'https://symphosys.com',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              bestRating: '5',
              ratingCount: String(reviews.length),
              reviewCount: String(reviews.length),
            },
            review: reviews.map((r) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: r.name },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
              },
              reviewBody: r.quote,
            })),
          }),
        }}
      />
    </section>
  );
}
