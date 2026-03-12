import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { caseStudies } from '../data/caseStudies';
import { NotFound } from './NotFound';
import { Button } from '../components/Button';
import { useBookingModal } from '../contexts/BookingModalContext';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((item) => item.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useGSAP(
    () => {
      if (!study || !containerRef.current) return;
      gsap.from('.case-hero-item', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef, dependencies: [study] },
  );

  if (!study) {
    return <NotFound />;
  }

  const relatedStudies = useMemo(
    () => caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3),
    [study.slug],
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-bg text-ink pt-32 pb-24">
      <SEO
        title={`${study.client} Case Study | Symphosys`}
        description={study.summary}
        canonicalPath={`/case-studies/${study.slug}`}
        image={study.heroImage}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CaseStudy',
          name: `${study.client} Case Study`,
          headline: study.subtitle,
          description: study.summary,
          image: `https://symphosys.com${study.heroImage}`,
          author: {
            '@type': 'Organization',
            name: 'Symphosys',
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="case-hero-item text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/50 mb-4">
              {study.serviceName} Case Study
            </p>
            <h1 className="case-hero-item font-display text-5xl md:text-7xl uppercase leading-[0.9] mb-6">
              {study.title}
            </h1>
            <p className="case-hero-item text-lg md:text-xl text-ink/70 font-medium mb-8">
              {study.subtitle}
            </p>

            <div className="case-hero-item flex flex-wrap gap-6 text-sm md:text-base font-medium text-ink/70">
              <span>{study.industry}</span>
              <span>{study.location}</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="case-hero-item rounded-3xl overflow-hidden border border-ink/10 bg-surface">
              <img
                src={study.heroImage}
                alt={`${study.client} case study`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {study.impact.map((metric) => (
            <div
              key={metric.label}
              className="case-hero-item rounded-3xl border border-ink/10 bg-surface p-6"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-3">
                {metric.label}
              </p>
              <p className="font-display text-3xl md:text-4xl uppercase">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-ink/10 bg-white p-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-4">The Problem</p>
            <p className="text-lg text-ink/75 font-medium leading-relaxed">{study.problem}</p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-surface p-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-4">Our Approach</p>
            <ul className="space-y-3 text-lg text-ink/75 font-medium">
              {study.approach.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-ink text-bg p-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-bg/60 font-bold mb-4">The Fix</p>
            <p className="text-lg text-bg/80 font-medium leading-relaxed">{study.fix}</p>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-4">Proof of Work</p>
            <div className="rounded-3xl border border-ink/10 bg-surface p-8">
              <ul className="space-y-4 text-base md:text-lg text-ink/75 font-medium">
                {study.proofOfWork.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-4">Project Timeline</p>
            <div className="rounded-3xl border border-ink/10 bg-white p-8 space-y-5">
              {study.timeline.map((step) => (
                <div key={step.phase} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold">
                    {step.phase.replace('Week ', '').replace('Month ', '')}
                  </div>
                  <div>
                    <p className="font-display text-lg uppercase">{step.phase}</p>
                    <p className="text-ink/70 font-medium">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[40px] bg-ink text-bg p-10 md:p-14">
          <p className="text-[10px] uppercase tracking-[0.2em] text-bg/60 font-bold mb-4">Client Perspective</p>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">"{study.testimonial.quote}"</p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-display text-2xl uppercase">{study.testimonial.name}</p>
              <p className="text-bg/70 font-medium">
                {study.testimonial.role} · {study.testimonial.company}
              </p>
            </div>
            <Button onClick={() => openBookingModal(`case-study-${study.slug}`)} size="lg">
              Book a Strategy Call
            </Button>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-4">
                Related Case Studies
              </p>
              <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.9]">
                Proof Across Services
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-bold text-accent"
            >
              View All Case Studies <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStudies.map((item) => (
              <Link
                key={item.slug}
                to={`/case-studies/${item.slug}`}
                className="rounded-3xl border border-ink/10 bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-ink/5">
                  <img
                    src={item.heroImage}
                    alt={`${item.client} case study`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-3">
                    {item.serviceName}
                  </p>
                  <p className="font-display text-xl uppercase mb-2">{item.title}</p>
                  <p className="text-ink/70 font-medium">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-ink/10 pt-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-3">
              Ready for the same outcome?
            </p>
            <p className="text-lg text-ink/70 font-medium">
              See how we deliver {study.serviceName.toLowerCase()} services or talk with our team.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/services/${study.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:border-accent/60 hover:text-accent transition-colors"
            >
              View Service Page <ArrowRight size={16} />
            </Link>
            <Button onClick={() => openBookingModal(`case-study-footer-${study.slug}`)} size="lg">
              Book Free Call
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
