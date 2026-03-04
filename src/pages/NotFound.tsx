import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <section className="min-h-screen bg-bg text-ink pt-36 pb-24 px-6 md:px-12 flex items-center">
      <SEO
        title="Page Not Found | Symphosys"
        description="The page you requested does not exist."
        canonicalPath="/404"
        noindex
      />

      <div className="max-w-4xl mx-auto w-full text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-ink/50 font-bold mb-5">Error 404</p>
        <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mb-6">
          Page Not <span className="text-accent">Found</span>
        </h1>
        <p className="text-lg md:text-xl text-ink/70 font-medium max-w-2xl mx-auto mb-10">
          This URL does not match an active page. Use the quick links below to continue browsing Symphosys.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-accent text-white px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:bg-ink transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/work"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:border-accent/60 hover:text-accent transition-colors"
          >
            View Work
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-ink/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] hover:border-accent/60 hover:text-accent transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
