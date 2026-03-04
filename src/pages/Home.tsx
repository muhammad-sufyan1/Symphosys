import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { WhyUs } from '../components/home/WhyUs';
import { Process } from '../components/home/Process';
import { Industries } from '../components/home/Industries';
import { Results } from '../components/home/Results';
import { FAQ, faqs } from '../components/home/FAQ';
import { CTA } from '../components/home/CTA';
import { SEO } from '../components/SEO';

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash.toLowerCase() === '#work') {
      navigate('/work', { replace: true });
    }
  }, [navigate]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Symphosys | Full-Service Digital Agency"
        description="We help businesses grow online through custom web design, digital marketing, graphic design, video production, and lead generation."
        keywords="full-service digital agency, digital marketing agency, online marketing services"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Symphosys',
            url: 'https://symphosys.com',
            logo: 'https://symphosys.com/logo.png',
            description: 'Full-service digital agency helping businesses grow online.',
          },
          faqSchema,
        ]}
      />
      <Hero />
      <WhatWeDo />
      <WhyUs />
      <Process />
      <Industries />
      <Results />
      <FAQ />
      <CTA />
    </>
  );
}
