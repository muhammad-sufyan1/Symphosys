import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Web Development', desc: 'Custom, high-performance websites built for scale and speed.', slug: 'web-development' },
  { title: 'Shopify Store Design', desc: 'E-commerce experiences that convert visitors into loyal buyers.', slug: 'shopify-store-design' },
  { title: 'Brand Building', desc: 'Memorable branding that stands out in crowded markets.', slug: 'brand-building' },
  { title: 'Growth Marketing', desc: 'Data-driven campaigns that drive real revenue and ROI.', slug: 'growth-marketing' },
  { title: 'Video Editing', desc: 'Scroll-stopping video content for ads and social media.', slug: 'video-editing' },
  { title: 'Lead Generation', desc: 'Automated systems to keep your sales pipeline full.', slug: 'lead-generation' },
  { title: 'Graphic Design', desc: 'Visual assets that build brands and drive results.', slug: 'graphic-design' },
  { title: 'Video Animations', desc: 'Explainer videos and motion graphics that simplify complex ideas.', slug: 'video-animations' },
  { title: 'Digital Marketing', desc: 'Full-stack online marketing that drives real revenue.', slug: 'digital-marketing' },
  { title: 'Creative Ads', desc: 'Scroll-stopping ad creative for Meta, TikTok, YouTube & Google.', slug: 'creative-ads' }
];

export function WhatWeDo() {
  const container = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.service-list-item');
    items.forEach((item: any, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        rotationY: 15,
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
        <div className="border-t border-bg/20">
          {services.map((service, index) => (
            <Link 
              to={`/services/${service.slug}`} 
              key={index}
              className="service-list-item group block border-b border-bg/20 py-8 md:py-12 transition-colors duration-500 hover:bg-bg/5 relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 px-4 md:px-8">
                <div className="flex items-center gap-6 md:gap-12 mb-4 md:mb-0">
                  <span className="font-display text-xl md:text-3xl text-accent opacity-50 w-12 md:w-16">(0{index + 1})</span>
                  <h3 className="font-display text-2xl md:text-4xl uppercase group-hover:text-accent transition-colors duration-500 break-words">{service.title}</h3>
                </div>
                
                <div className={cn(
                  "md:w-1/3 transition-all duration-500 transform",
                  hoveredIndex === index ? "md:opacity-100 md:translate-x-0" : "md:opacity-0 md:-translate-x-8"
                )}>
                  <p className="text-base md:text-lg font-medium text-bg/80 mb-4">{service.desc}</p>
                  <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
              
              {/* Background hover effect */}
              <div className={cn(
                "absolute inset-0 bg-accent/5 transform origin-left transition-transform duration-500 ease-out",
                hoveredIndex === index ? "scale-x-100" : "scale-x-0"
              )} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
