import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: 'Aura Skincare', 
    category: 'E-commerce & Branding', 
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2374&auto=format&fit=crop' 
  },
  { 
    title: 'Fintech Flow', 
    category: 'Web App Design', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop' 
  },
  { 
    title: 'Lumina', 
    category: '3D Motion & Web', 
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2370&auto=format&fit=crop' 
  }
];

export function Work() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.work-item');
    
    items.forEach((item: any, i) => {
      // Image Parallax
      const img = item.querySelector('.work-img');
      gsap.to(img, {
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        yPercent: 20,
        ease: 'none'
      });

      // Text Reveal
      gsap.from(item.querySelectorAll('.work-text'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 md:py-32 px-6 md:px-12 bg-surface">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <h2 className="font-display text-4xl md:text-7xl uppercase leading-none break-words">
            Selected <br/> <span className="text-accent">Work</span>
          </h2>
          <button className="flex items-center gap-2 text-ink font-bold uppercase tracking-widest text-sm hover:text-accent transition-colors group">
            View All Projects <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => (
            <div key={index} className="work-item group cursor-pointer">
              <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-[32px] mb-8">
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="work-img absolute top-[-10%] left-0 w-full h-[120%] object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
                <h3 className="work-text font-display text-3xl md:text-5xl uppercase group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="work-text text-lg md:text-xl font-medium text-ink/60 uppercase tracking-wider">
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
