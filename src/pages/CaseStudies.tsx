import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SEO } from '../components/SEO';
import { caseStudies } from '../data/caseStudies';

export function CaseStudiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    gsap.from('.case-studies-hero', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-bg text-ink pt-24 md:pt-28 pb-20 relative overflow-hidden">
      <SEO
        title="Case Studies | Symphosys"
        description="Explore Symphosys case studies across web development, growth marketing, branding, and creative."
        canonicalPath="/case-studies"
        image="/logo.png"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Symphosys Case Studies',
          url: 'https://symphosys.com/case-studies',
          description:
            'Explore Symphosys case studies across web development, growth marketing, branding, and creative.',
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="case-studies-orb absolute -top-24 right-0 w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[110px]" />
        <div className="case-studies-orb-alt absolute -bottom-24 left-0 w-[35vw] h-[35vw] rounded-full bg-ink/10 blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl case-studies-hero">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/50 mb-5">
            Case Studies
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mb-6">
            Proof of Work, <span className="text-accent">Not Promises</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/70 font-medium">
            Real client problems, real execution, and measurable business impact. Browse by service and see how we work.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              to={`/case-studies/${study.slug}`}
              className="group rounded-3xl border border-ink/10 bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-ink/5">
                <img
                  src={study.heroImage}
                  alt={`${study.client} case study`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-3">
                  {study.serviceName}
                </p>
                <h2 className="font-display text-2xl uppercase mb-2">{study.title}</h2>
                <p className="text-ink/70 font-medium mb-4">{study.subtitle}</p>
                <p className="text-sm text-ink/60">{study.summary}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-accent font-bold">
                  View Case Study
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
