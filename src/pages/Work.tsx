import React from 'react';
import { SEO } from '../components/SEO';
import { Work } from '../components/home/Work';

export function WorkPage() {
  return (
    <>
      <SEO
        title="Our Work | Symphosys"
        description="Explore our full video portfolio by category and watch project work directly on-site."
      />
      <Work />
    </>
  );
}
