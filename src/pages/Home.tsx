import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/home/Hero';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { WhyUs } from '../components/home/WhyUs';
import { Process } from '../components/home/Process';
import { Industries } from '../components/home/Industries';
import { Results } from '../components/home/Results';
import { FAQ, faqs } from '../components/home/FAQ';
import { CTA } from '../components/home/CTA';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Symphosys | Full-Service Digital Agency</title>
        <meta name="description" content="We help businesses grow online through custom web design, digital marketing, graphic design, video production, and lead generation." />
        <meta name="keywords" content="full-service digital agency, digital marketing agency, online marketing services" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Symphosys",
              "url": "https://symphosys.com",
              "logo": "https://symphosys.com/logo.png",
              "description": "Full-service digital agency helping businesses grow online."
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                ${faqs.map(faq => `
                  {
                    "@type": "Question",
                    "name": "${faq.question}",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "${faq.answer}"
                    }
                  }
                `).join(',')}
              ]
            }
          `}
        </script>
      </Helmet>
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
