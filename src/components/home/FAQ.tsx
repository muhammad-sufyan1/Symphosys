import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

export const faqs = [
  { question: 'What kinds of businesses do you work with?', answer: 'We work with businesses of all sizes across many industries. Whether you\'re a startup with a great idea or an established company ready to scale, we adapt our approach to fit your stage and your goals.' },
  { question: 'Do you offer one-off projects or ongoing engagements?', answer: 'Both. We take on project-based work like website builds, brand identities, and video productions. We also offer monthly retainers for ongoing marketing, lead generation, and creative services. Many clients start with a project and continue as a retainer client after seeing results.' },
  { question: 'How do we get started?', answer: 'Everything starts with a free 30-minute discovery call. We learn about your business, your goals, and your current challenges. From there, we send a tailored proposal with clear deliverables and pricing within 48 hours.' },
  { question: 'What does it cost?', answer: 'Every project is scoped individually based on your needs. After a discovery call, we provide a detailed proposal with transparent pricing. There are no hidden fees and no surprise invoices.' },
  { question: 'Do you work with businesses outside of our region?', answer: 'Yes. We work with clients globally. Our entire process is built for remote collaboration — video calls, shared project management tools, and clear documentation ensure every project runs smoothly regardless of location.' }
];

export function FAQ() {
  const container = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(() => {
    const items = gsap.utils.toArray('.faq-item');
    items.forEach((item: any, i) => {
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
  }, { scope: container });

  return (
    <section ref={container} className="py-20 md:py-28 px-6 md:px-12 bg-bg">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-display text-4xl md:text-6xl uppercase mb-12 md:mb-20 text-center break-words">FAQs</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={cn(
                "faq-item overflow-hidden rounded-3xl transition-colors duration-300",
                isOpen ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-surface/80"
              )}>
                <button
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
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
  );
}
