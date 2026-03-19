import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setTimeout(() => {
          setIsSubscribed(false);
          setEmail('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <footer className="bg-accent text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div data-footer-ambient="shape-1" className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white blur-3xl"></div>
        <div data-footer-ambient="shape-2" className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-ink blur-3xl"></div>
      </div>

      {/* Large Background Logo */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none flex justify-center items-end opacity-20">
        <img 
          data-footer-ambient="logo"
          src="/logo.svg" 
          alt="Symphosys Logo Background" 
          className="w-full h-full object-cover object-bottom brightness-0 invert translate-y-[25%]" 
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="col-span-1 md:col-span-5 lg:col-span-5">
            <h3 className="font-display text-3xl md:text-6xl uppercase leading-none mb-6 break-words">
              The Time Is Now.<br/>The Path Is Forward.
            </h3>
            <p className="text-white/80 max-w-md text-lg font-medium mb-10">
              We help businesses grow online through custom web design, digital marketing, graphic design, video production, and lead generation.
            </p>

            {/* Subscribe Form */}
            <form onSubmit={handleSubscribe} className="max-w-md relative" aria-label="Newsletter subscription">
              <h4 className="text-sm font-bold uppercase tracking-widest text-ink mb-4">Subscribe to our newsletter</h4>
              <div className="flex items-center border-b-2 border-white/20 pb-2 focus-within:border-ink transition-colors">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                  className="w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none text-lg"
                />
                <button
                  type="submit"
                  className="shrink-0 text-white hover:text-ink transition-colors p-2"
                  aria-label="Subscribe"
                >
                  {isSubscribed ? <span role="status" aria-live="polite" className="text-sm font-bold uppercase tracking-wider text-ink">Done!</span> : <ArrowRight size={24} />}
                </button>
              </div>
            </form>
          </div>
          
          <div className="col-span-1 md:col-span-3 lg:col-span-3 lg:col-start-7">
            <h4 className="font-display text-2xl uppercase mb-6 text-ink">Services</h4>
            <ul className="space-y-4 font-medium text-white/90">
              <li><Link to="/services/web-development" className="hover:text-ink transition-colors">Web Development</Link></li>
              <li><Link to="/services/shopify-store-design" className="hover:text-ink transition-colors">Shopify Store Design</Link></li>
              <li><Link to="/services/graphic-design" className="hover:text-ink transition-colors">Graphic Design</Link></li>
              <li><Link to="/services/growth-marketing" className="hover:text-ink transition-colors">Growth Marketing</Link></li>
              <li><Link to="/services/video-editing" className="hover:text-ink transition-colors">Video Editing</Link></li>
              <li><Link to="/services/lead-generation" className="hover:text-ink transition-colors">Lead Generation</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="font-display text-2xl uppercase mb-6 text-ink">Company</h4>
            <ul className="space-y-4 font-medium text-white/90 mb-10">
              <li><Link to="/about" className="hover:text-ink transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-ink transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-ink transition-colors">Terms & Conditions</Link></li>
            </ul>

            <h4 className="font-display text-2xl uppercase mb-6 text-ink">Contact</h4>
            <address className="not-italic space-y-2 font-medium text-white/90">
              <p>1443 SW 1200th Rd</p>
              <p>Holden, Missouri, USA</p>
              <p className="pt-2"><a href="tel:+17789006780" className="hover:text-ink transition-colors">+1 778-900-6780</a></p>
              <p><a href="mailto:contact@symphosys.com" className="hover:text-ink transition-colors">contact@symphosys.com</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t-2 border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between font-medium text-white/80">
          <p>&copy; {new Date().getFullYear()} Symphosys Digital Agency. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <Link to="/work" className="hover:text-ink transition-colors">Work Portfolio</Link>
            <Link to="/case-studies" className="hover:text-ink transition-colors">Case Studies</Link>
            <Link to="/contact" className="hover:text-ink transition-colors">Book Strategy Call</Link>
            <Link to="/about" className="hover:text-ink transition-colors">Our Process</Link>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Symphosys',
            url: 'https://symphosys.com',
            logo: 'https://symphosys.com/logo.png',
            description:
              'Full-service digital agency specializing in web development, digital marketing, branding, video, and lead generation.',
            telephone: '+17789006780',
            email: 'contact@symphosys.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1443 SW 1200th Rd',
              addressLocality: 'Holden',
              addressRegion: 'MO',
              addressCountry: 'US',
            },
            priceRange: '$$',
          }),
        }}
      />
    </footer>
  );
}
