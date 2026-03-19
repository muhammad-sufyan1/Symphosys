import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import { useBookingModal } from '../contexts/BookingModalContext';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const container = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBookingModal();

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tl = gsap.timeline();
    tl.from('.about-hero-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1
    })
    .from('.about-hero-sub', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    gsap.utils.toArray('.fade-up').forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-bg text-ink selection:bg-ink selection:text-bg pt-24 md:pt-28">
      <SEO
        title="About Us | Symphosys"
        description="Learn how Symphosys builds integrated growth systems through strategy, creative execution, and performance marketing."
        canonicalPath="/about"
        image="/logo.png"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Symphosys',
          url: 'https://symphosys.com/about',
          description:
            'Learn how Symphosys builds integrated growth systems through strategy, creative execution, and performance marketing.',
        }}
      />

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pb-20 md:pb-24 min-h-[70svh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="about-orb absolute -top-20 right-0 w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[100px]" />
          <div className="about-orb-alt absolute -bottom-20 left-0 w-[35vw] h-[35vw] rounded-full bg-ink/10 blur-[90px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-display text-5xl md:text-[8vw] leading-[0.85] uppercase tracking-tight mb-8">
            <span className="block about-hero-title">We Build</span>
            <span className="block about-hero-title text-accent">Digital Systems</span>
            <span className="block about-hero-title">That Scale</span>
          </h1>
          <p className="about-hero-sub text-xl md:text-2xl font-medium text-ink/70 max-w-3xl leading-relaxed">
            Symphosys was founded on a simple premise: marketing shouldn't be a collection of disconnected tactics. It should be a unified system where every piece works together to drive measurable growth.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="fade-up">
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-ink/50 mb-6">
              Our Story
            </h2>
            <h3 className="font-display text-4xl md:text-6xl uppercase leading-none mb-8">
              From Silos to <br/>Symphony
            </h3>
            <div className="space-y-6 text-lg text-ink/80 leading-relaxed font-medium">
              <p>
                We noticed a recurring problem in the industry: businesses were hiring one agency for SEO, another for ads, and a freelancer for design. The result was always the same—fragmented messaging, wasted budget, and plateaued growth.
              </p>
              <p>
                We built Symphosys to be the antidote. A full-stack digital agency that brings strategy, creative, and distribution under one roof. We don't just run campaigns; we build growth engines.
              </p>
            </div>
          </div>
          <div className="fade-up relative h-[600px] rounded-[40px] overflow-hidden bg-ink">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Our Team"
              width={1200}
              height={800}
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-ink text-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-bg/50 mb-16 text-center">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              {
                title: 'Radical Transparency',
                desc: 'No black-box strategies. We show you exactly what we are doing, why we are doing it, and the results it is generating.'
              },
              {
                title: 'Systems Over Tactics',
                desc: 'Tactics stop working. Systems compound. We focus on building sustainable, scalable marketing infrastructure.'
              },
              {
                title: 'Creative Excellence',
                desc: 'Data tells us where to go, but creative is what gets us there. We never compromise on the quality of our output.'
              }
            ].map((value, idx) => (
              <div key={idx} className="fade-up border-t border-bg/20 pt-8">
                <span className="font-display text-4xl text-accent mb-6 block">0{idx + 1}</span>
                <h4 className="font-display text-3xl uppercase mb-4">{value.title}</h4>
                <p className="text-bg/70 text-lg leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 bg-bg text-center">
        <div className="max-w-4xl mx-auto fade-up">
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-8">
            Ready to Build <br/>Something Great?
          </h2>
          <p className="text-xl text-ink/70 mb-12 max-w-2xl mx-auto">
            Let's talk about your goals and how we can help you reach them faster.
          </p>
          <Button
            size="lg"
            className="text-lg px-10"
            onClick={() => openBookingModal('about-cta')}
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
