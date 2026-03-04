import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';

const coreContentLinks = [
  {
    label: 'About Symphosys',
    to: '/about',
    description: 'Learn about our process, standards, and delivery model.',
  },
  {
    label: 'Work Portfolio',
    to: '/work',
    description: 'See real campaign and creative execution in our video work library.',
  },
  {
    label: 'Contact Us',
    to: '/contact',
    description: 'Talk with our team about growth goals, scope, and timelines.',
  },
];

export function SeoInternalLinks() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-24 bg-bg text-ink border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/50 mb-5">
            Explore More
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] mb-8">
            Strategy, Creative, and Delivery in One System
          </h2>
          <p className="text-lg md:text-xl text-ink/75 leading-relaxed font-medium">
            If you are evaluating{' '}
            <Link to="/services/web-development" className="text-accent underline underline-offset-4">
              web development services
            </Link>
            ,{' '}
            <Link to="/services/digital-marketing" className="text-accent underline underline-offset-4">
              digital marketing strategy
            </Link>
            , or{' '}
            <Link to="/services/lead-generation" className="text-accent underline underline-offset-4">
              lead generation systems
            </Link>
            , this section helps you jump directly to the most relevant pages.
          </p>
          <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed">
            Many clients pair{' '}
            <Link to="/services/brand-building" className="text-accent underline underline-offset-4">
              brand building
            </Link>{' '}
            with{' '}
            <Link to="/services/creative-ads" className="text-accent underline underline-offset-4">
              creative ads
            </Link>{' '}
            and{' '}
            <Link to="/services/video-editing" className="text-accent underline underline-offset-4">
              video editing
            </Link>{' '}
            to improve conversion performance across paid and organic channels.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {coreContentLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-3xl border border-ink/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
            >
              <h3 className="font-display text-2xl uppercase leading-none mb-3">{item.label}</h3>
              <p className="text-ink/70 font-medium leading-relaxed">{item.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="rounded-full border border-ink/15 bg-white/80 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-ink/80 hover:border-accent/50 hover:text-accent transition-colors"
            >
              {service.slug.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
