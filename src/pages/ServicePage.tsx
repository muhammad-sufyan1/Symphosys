import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { servicesData } from '../data/services';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { useBookingModal } from '../contexts/BookingModalContext';
import { ConsultationCtaBox } from '../components/ConsultationCtaBox';
import { NotFound } from './NotFound';
import { caseStudies } from '../data/caseStudies';
import { serviceEnhancements } from '../data/serviceEnhancements';

gsap.registerPlugin(ScrollTrigger);

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find(s => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useGSAP(() => {
    if (!service || !containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hero Animations
    const tl = gsap.timeline();
    tl.from('.hero-word', {
      y: 150,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: 'power4.out',
      rotation: 8,
      transformOrigin: 'left bottom'
    })
    .from('.hero-sub', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-btn', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.5)'
    }, '-=0.6');

    gsap.to('.marquee-track-1', {
      xPercent: -50,
      ease: 'none',
      duration: 30,
      repeat: -1
    });
    
    gsap.fromTo('.marquee-track-2',
      { xPercent: -50 },
      { xPercent: 0, ease: 'none', duration: 30, repeat: -1 }
    );

    gsap.to('.hero-marquees', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 80,
      ease: 'none'
    });

    gsap.to('.service-orb', {
      xPercent: 6,
      yPercent: -5,
      duration: 13,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.service-orb-alt', {
      xPercent: -5,
      yPercent: 7,
      duration: 16,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Process Steps Parallax/Reveal
    const processSteps = gsap.utils.toArray('.process-step');
    processSteps.forEach((step: any) => {
      gsap.fromTo(step,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
          }
        }
      );
    });

    // Included Items Stagger
    gsap.fromTo('.included-item',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.included-grid',
          start: 'top 80%',
        }
      }
    );

    // FAQ Items Stagger
    const faqItems = gsap.utils.toArray('.faq-item');
    faqItems.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'back.out(1.2)'
      });
    });

  }, { scope: containerRef, dependencies: [service] });

  if (!service) {
    return <NotFound />;
  }

  const serviceName = service.slug.replace(/-/g, ' ');
  const formattedServiceName = serviceName.replace(/\b\w/g, (char) => char.toUpperCase());
  const normalizedMetaDescription = service.metaDescription.replace(/\s+/g, ' ').trim();
  const seoTitle =
    service.metaTitle.length > 60 ? `${formattedServiceName} Services | Symphosys` : service.metaTitle;
  const seoDescription =
    normalizedMetaDescription.length > 157
      ? `${normalizedMetaDescription.slice(0, 157).trimEnd()}...`
      : normalizedMetaDescription;
  const enhancement = serviceEnhancements.find((item) => item.slug === service.slug);
  const study = caseStudies.find((item) => item.slug === service.slug);
  const relatedStudies = caseStudies.filter((item) => item.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${formattedServiceName} Services`,
    description: seoDescription,
    serviceType: serviceName,
    areaServed: 'United States',
    url: `https://symphosys.com/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Symphosys',
      url: 'https://symphosys.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://symphosys.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${formattedServiceName} Services`,
        item: `https://symphosys.com/services/${service.slug}`,
      },
    ],
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-bg text-ink selection:bg-ink selection:text-bg">
      <SEO
        title={seoTitle || service.metaTitle}
        description={seoDescription}
        keywords={service.focusKeywords}
        canonicalPath={`/services/${service.slug}`}
        image="/logo.png"
        type="article"
        structuredData={[serviceSchema, faqSchema, breadcrumbSchema]}
      />

      {/* 1. CREATIVE HERO - HOME PAGE STYLE */}
      <section className="hero-section relative min-h-[100svh] pt-24 md:pt-28 pb-20 flex flex-col justify-center overflow-hidden px-6 md:px-12 bg-bg">
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          {/* Vertical Structural Lines */}
          <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-gradient-to-b from-transparent via-ink/10 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gradient-to-b from-transparent via-ink/5 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-gradient-to-b from-transparent via-ink/10 to-transparent"></div>
          
          {/* Soft Glows */}
          <div className="service-orb absolute top-[-10%] right-[-5%] w-[48vw] h-[48vw] rounded-full bg-accent/10 blur-[110px]" />
          <div className="service-orb-alt absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-ink/10 blur-[90px]" />
          <div className="absolute top-[18%] left-[45%] w-32 h-32 rounded-full bg-accent/15 blur-[60px]" />
        </div>

        <div className="hero-content-wrapper max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8 fade-in-up">
            <div className="w-12 h-[1px] bg-accent"></div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">Premium Service</span>
          </div>

          <h1 className="font-display text-5xl md:text-[10vw] leading-[0.85] uppercase tracking-tight text-ink flex flex-wrap gap-x-3 md:gap-x-6 gap-y-1 md:gap-y-2 break-words">
            {service.hero.title.split(' ').map((word, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <span key={i} className="overflow-hidden inline-block">
                  <span className={cn(
                    "hero-word inline-block",
                    isLast && "text-accent"
                  )}>
                    {word}
                  </span>
                </span>
              );
            })}
          </h1>
          
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between">
            <p className="hero-sub text-base md:text-xl font-medium max-w-lg leading-relaxed text-ink/80">
              {service.hero.description}
            </p>
            <div className="hero-btn w-full md:w-auto shrink-0">
              <Button
                size="lg"
                className="w-full md:w-auto"
                onClick={() => openBookingModal(`service-hero-${service.slug}`)}
              >
                {service.hero.ctaText || 'Get a Free Strategy Call'}
              </Button>
            </div>
          </div>
        </div>

        {/* Marquees */}
        <div className="hero-marquees relative mt-12 md:mt-16 -left-[5%] w-[110%] z-0 shrink-0 hidden md:flex flex-col gap-2">
          {/* Bar 1: Accent (Right to Left) */}
          <div className="overflow-hidden py-3 bg-accent text-white rotate-[-2deg] shadow-lg">
            <div className="marquee-track-1 flex gap-6 items-center w-max">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="flex gap-6 items-center whitespace-nowrap">
                  <span className="font-display text-2xl md:text-3xl uppercase text-white">{service.slug.replace('-', ' ')}</span>
                  <span className="w-2 h-2 rounded-full bg-white/50"></span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar 2: Black (Left to Right) */}
          <div className="overflow-hidden py-3 bg-ink text-white rotate-[1deg] shadow-lg">
            <div className="marquee-track-2 flex gap-6 items-center w-max">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex gap-6 items-center whitespace-nowrap">
                  <span className="font-display text-2xl md:text-3xl uppercase text-white">Data-Driven Results</span>
                  <span className="w-2 h-2 rounded-full bg-white/50"></span>
                  <span className="font-display text-2xl md:text-3xl uppercase text-white">Award-Winning Team</span>
                  <span className="w-2 h-2 rounded-full bg-white/50"></span>
                  <span className="font-display text-2xl md:text-3xl uppercase text-white">Custom Solutions</span>
                  <span className="w-2 h-2 rounded-full bg-white/50"></span>
                  <span className="font-display text-2xl md:text-3xl uppercase text-white">ROI Focused</span>
                  <span className="w-2 h-2 rounded-full bg-white/50"></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {enhancement?.whyChooseSymphosys && (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-surface relative overflow-hidden">
          <div className="absolute -top-20 right-0 w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[120px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/50 mb-4">
                Why Symphosys
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] mb-6">
                {enhancement.whyChooseSymphosys.headline}
              </h2>
              <p className="text-lg text-ink/70 font-medium leading-relaxed">
                {enhancement.whyChooseSymphosys.intro}
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {enhancement.whyChooseSymphosys.points.map((point, index) => (
                <div key={point.title} className="rounded-3xl border border-ink/10 bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/40 font-bold mb-3">
                    0{index + 1}
                  </p>
                  <h3 className="font-display text-2xl uppercase mb-3">{point.title}</h3>
                  <p className="text-ink/70 font-medium">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. MINIMALIST INCLUDED GRID */}
      <section className="py-32 px-6 md:px-12 bg-ink text-bg">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-bg/50 shrink-0">
              01 // What's Included
            </h2>
            <h3 className="font-display text-4xl md:text-6xl uppercase max-w-3xl leading-[0.9]">
              {service.included.subtitle}
            </h3>
          </div>

          <div className="included-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 border-t border-bg/20 pt-20">
            {service.included.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="included-item group cursor-default">
                  <div className="flex items-center justify-between mb-8 border-b border-bg/20 pb-6">
                    <span className="font-display text-5xl text-bg/30 group-hover:text-accent transition-colors duration-500">
                      0{idx + 1}
                    </span>
                    <Icon size={32} className="text-bg/30 group-hover:text-accent transition-colors duration-500" strokeWidth={1} />
                  </div>
                  <h4 className="font-display text-3xl uppercase mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {item.title}
                  </h4>
                  <p className="text-bg/70 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {study && (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-bg">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/50 mb-4">
                Case Study Spotlight
              </p>
              <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.9] mb-6">
                {study.client}
              </h2>
              <p className="text-lg text-ink/70 font-medium mb-6">{study.summary}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {study.impact.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-ink/10 bg-surface p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 font-bold mb-2">
                      {metric.label}
                    </p>
                    <p className="font-display text-2xl uppercase">{metric.value}</p>
                  </div>
                ))}
              </div>
              <Link
                to={`/case-studies/${study.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-colors hover:bg-ink"
              >
                Read the Case Study
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-ink/10 bg-surface">
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
        </section>
      )}

      <ConsultationCtaBox />

      {enhancement?.whyChooseService && (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-ink text-bg">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-bg/60 mb-4">
                Why Choose Us
              </p>
              <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] mb-6">
                {enhancement.whyChooseService.headline}
              </h2>
              <p className="text-lg text-bg/80 font-medium leading-relaxed">
                {enhancement.whyChooseService.intro}
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {enhancement.whyChooseService.points.map((point, index) => (
                <div key={point.title} className="rounded-3xl border border-bg/20 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-bg/50 font-bold mb-3">
                    0{index + 1}
                  </p>
                  <h3 className="font-display text-2xl uppercase mb-3">{point.title}</h3>
                  <p className="text-bg/70 font-medium">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {study && (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-bg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/50 mb-4">
                  Proof of Work
                </p>
                <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.9]">
                  What We Delivered
                </h2>
              </div>
              <Button onClick={() => openBookingModal(`service-proof-${service.slug}`)} size="lg">
                Book a Free Call
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {study.proofOfWork.map((item) => (
                <div key={item} className="rounded-3xl border border-ink/10 bg-surface p-6">
                  <p className="text-lg text-ink/75 font-medium">• {item}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/50 mb-4">
                    Proof Across Services
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl uppercase leading-[0.9]">
                    More Results From Symphosys
                  </h3>
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
            </div>
          </div>
        </section>
      )}

      {/* 3. STICKY PROCESS TIMELINE */}
      <section className="py-32 px-6 md:px-12 relative bg-bg text-ink">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/50 mb-8">
                02 // The Process
              </h2>
              <h3 className="font-display text-[12vw] lg:text-[7vw] leading-[0.8] uppercase tracking-tighter mb-8">
                How We<br/>Work
              </h3>
              <p className="text-xl font-medium text-ink/70 max-w-md">
                {service.process.subtitle}
              </p>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:col-span-7 mt-16 lg:mt-0 space-y-32">
            {service.process.items.map((item, idx) => (
              <div key={idx} className="process-step relative">
                {/* Massive Background Number */}
                <div className="absolute -left-8 -top-16 text-[150px] md:text-[200px] font-display text-ink/[0.03] pointer-events-none leading-none select-none">
                  0{idx + 1}
                </div>
                
                <div className="relative z-10 border-l-2 border-ink/10 pl-8 md:pl-12 py-4 hover:border-accent transition-colors duration-500">
                  <h4 className="font-display text-4xl md:text-5xl uppercase mb-6">
                    {item.title}
                  </h4>
                  <p className="text-xl text-ink/70 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FAQ SECTION (Home Page Style) */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-bg">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-4xl md:text-6xl uppercase mb-12 md:mb-20 text-center break-words">FAQs</h2>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={cn(
                  "faq-item overflow-hidden rounded-3xl transition-colors duration-300",
                  isOpen ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-surface/80"
                )}>
                  <button
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span className="font-display text-xl md:text-3xl uppercase pr-4 md:pr-8">
                      {faq.question}
                    </span>
                    <div className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                      isOpen ? "bg-accent text-white" : "bg-bg text-ink"
                    )}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  
                  <div className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}>
                    <div className="overflow-hidden">
                      <p className={cn(
                        "p-6 md:p-8 pt-0 md:pt-0 text-base md:text-lg font-medium leading-relaxed max-w-3xl",
                        isOpen ? "text-bg/80" : "text-ink/80"
                      )}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BRUTALIST CTA */}
      <section className="h-screen bg-ink text-bg flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-bg/50 mb-12 relative z-10">
          Ready to start?
        </h2>
        
        <h3 className="font-display text-[12vw] md:text-[8vw] leading-[0.8] uppercase tracking-tighter mb-16 relative z-10 hover:italic transition-all duration-500 cursor-default">
          {service.finalCta.title}
        </h3>
        
        <button
          className="relative z-10 group flex items-center gap-4 border border-bg/30 rounded-full px-8 py-4 md:px-12 md:py-6 hover:bg-bg hover:text-ink transition-all duration-500 overflow-hidden cursor-pointer"
          onClick={() => openBookingModal(`service-final-${service.slug}`)}
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold relative z-10">
            {service.finalCta.buttonText}
          </span>
          <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </section>
    </div>
  );
}
