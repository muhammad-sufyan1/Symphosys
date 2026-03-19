import React from 'react';
import { Button } from '../Button';
import { useBookingModal } from '../../contexts/BookingModalContext';

export function CTA() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-display text-4xl md:text-6xl mb-6">Ready to Scale?</h2>
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          Book a free 30-minute strategy call. We'll review your current setup and tell you exactly what we'd do to move the needle.
        </p>
        <Button
          variant="accent"
          size="lg"
          className="text-lg px-8"
          onClick={() => openBookingModal('home-bottom-cta')}
        >
          Book Your Free Call
        </Button>
      </div>
    </section>
  );
}
