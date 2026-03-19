import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, ShoppingBag, PenTool, TrendingUp, Video, Users, Palette, Sparkles, Megaphone, Film } from 'lucide-react';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Web Development', desc: 'Custom, high-performance websites built for scale and speed.', slug: 'web-development', tag: 'Core', icon: Code2, accent: '#FF5722', glow: 'rgba(255, 87, 34, 0.35)' },
  { title: 'Shopify Store Design', desc: 'E-commerce experiences that convert visitors into loyal buyers.', slug: 'shopify-store-design', tag: 'Commerce', icon: ShoppingBag, accent: '#FF9966', glow: 'rgba(255, 153, 102, 0.35)' },
  { title: 'Brand Building', desc: 'Memorable branding that stands out in crowded markets.', slug: 'brand-building', tag: 'Strategy', icon: PenTool, accent: '#1C1B17', glow: 'rgba(28, 27, 23, 0.35)' },
  { title: 'Growth Marketing', desc: 'Data-driven campaigns that drive real revenue and ROI.', slug: 'growth-marketing', tag: 'Scale', icon: TrendingUp, accent: '#FF6B3D', glow: 'rgba(255, 107, 61, 0.28)' },
  { title: 'Video Editing', desc: 'Scroll-stopping video content for ads and social media.', slug: 'video-editing', tag: 'Production', icon: Video, accent: '#F2795C', glow: 'rgba(242, 121, 92, 0.3)' },
  { title: 'Lead Generation', desc: 'Automated systems to keep your sales pipeline full.', slug: 'lead-generation', tag: 'Pipeline', icon: Users, accent: '#242424', glow: 'rgba(28, 27, 23, 0.25)' },
  { title: 'Graphic Design', desc: 'Visual assets that build brands and drive results.', slug: 'graphic-design', tag: 'Creative', icon: Palette, accent: '#FF5722', glow: 'rgba(255, 87, 34, 0.3)' },
  { title: 'Video Animations', desc: 'Explainer videos and motion graphics that simplify complex ideas.', slug: 'video-animations', tag: 'Motion', icon: Film, accent: '#FFA37A', glow: 'rgba(255, 163, 122, 0.28)' },
  { title: 'Digital Marketing', desc: 'Full-stack online marketing that drives real revenue.', slug: 'digital-marketing', tag: 'Performance', icon: Sparkles, accent: '#1C1B17', glow: 'rgba(28, 27, 23, 0.3)' },
  { title: 'Creative Ads', desc: 'Scroll-stopping ad creative for Meta, TikTok, YouTube & Google.', slug: 'creative-ads', tag: 'Ads', icon: Megaphone, accent: '#FF6A3D', glow: 'rgba(255, 106, 61, 0.28)' }
];

export function WhatWeDo() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = gsap.utils.toArray('.service-card');
    items.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        },
        y: 40,
        opacity: 0,
        scale: 0.96,
        transformOrigin: "center center",
      });
    });
  }, { scope: container });

  return (
    <section id="services" ref={container} className="py-24 md:py-32 bg-ink text-bg overflow-hidden relative">
      <div className="px-6 md:px-12 mb-16 md:mb-24 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl uppercase leading-none mb-6 text-bg break-words">What <br/> <span className="text-accent">We Do</span></h2>
        <p className="text-lg md:text-xl max-w-2xl font-medium text-bg/80">One Agency. Every Service Your Business Needs. We handle everything so you don't have to juggle five different vendors.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <Link
                to={`/services/${service.slug}`}
                key={service.slug}
                className={cn(
                  "service-card group relative overflow-hidden rounded-[32px] border border-ink/10 bg-surface text-ink p-6 md:p-8 cursor-pointer",
                  "transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_80px_-55px_rgba(28,27,23,0.55)]"
                )}
                style={{ '--card-accent': service.glow, '--card-solid': service.accent } as React.CSSProperties}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -top-24 right-0 h-56 w-56 bg-[radial-gradient(circle_at_top,var(--card-accent)_0%,transparent_60%)]" />
                  <div className="absolute bottom-0 left-0 h-40 w-40 bg-[radial-gradient(circle_at_bottom_left,var(--card-accent)_0%,transparent_65%)]" />
                </div>

                <div className="absolute bottom-6 right-6 text-ink/10 font-display text-5xl md:text-6xl leading-none pointer-events-none z-0">
                  {formattedIndex}
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-6 top-6 h-px w-16 bg-gradient-to-r from-[color:var(--card-solid)] to-transparent opacity-60" />
                  <div className="absolute right-6 top-6 h-16 w-px bg-gradient-to-b from-[color:var(--card-solid)] to-transparent opacity-60" />
                </div>

                <div className="relative z-10 flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.28em] font-bold text-ink/60">
                      {service.tag}
                    </span>
                    <span className="relative h-12 w-12" style={{ '--card-solid': service.accent } as React.CSSProperties}>
                      <span className="service-icon-ring absolute inset-0 rounded-2xl" />
                      <span className="service-icon-float relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg">
                        <Icon size={20} />
                      </span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight break-words">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base md:text-lg font-medium text-ink/70">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-bold text-ink/70 group-hover:text-ink transition-colors">
                    Explore Service <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute inset-x-6 bottom-6 h-[1px] bg-gradient-to-r from-transparent via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
