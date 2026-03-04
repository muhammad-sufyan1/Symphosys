import React from 'react';
import { SEO } from '../components/SEO';
import { Work } from '../components/home/Work';

export function WorkPage() {
  return (
    <>
      <SEO
        title="Our Work | Symphosys"
        description="Explore Symphosys case work, campaign creative, and production examples across industries."
        canonicalPath="/work"
        image="/logo.png"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Symphosys Work Portfolio',
          url: 'https://symphosys.com/work',
          description: 'Explore Symphosys case work, campaign creative, and production examples across industries.',
        }}
      />
      <Work />
    </>
  );
}
