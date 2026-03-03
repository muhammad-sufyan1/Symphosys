import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from '../components/Button';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAP(() => {
    gsap.from('.contact-header', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from('.contact-info-item', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.3
    });

    gsap.from('.contact-form', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  }, { scope: container });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', budget: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
        console.error('Failed to send message:', data.error);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={container} className="min-h-screen bg-bg text-ink pt-32 pb-24 selection:bg-accent selection:text-white">
      <Helmet>
        <title>Contact Us | Symphosys</title>
        <meta name="description" content="Get in touch with Symphosys to discuss your next digital project." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-5">
            <div className="contact-header mb-16">
              <h1 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
                Let's <br/><span className="text-accent">Talk</span>
              </h1>
              <p className="text-xl text-ink/70 font-medium max-w-md leading-relaxed">
                Whether you have a specific project in mind or just want to explore what's possible, we're ready to listen.
              </p>
            </div>

            <div className="space-y-10">
              <div className="contact-info-item flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-ink text-bg flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/50 mb-2">Email Us</h4>
                  <a href="mailto:contact@symphosys.com" className="text-xl font-medium hover:text-accent transition-colors">
                    contact@symphosys.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-ink text-bg flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/50 mb-2">Call Us</h4>
                  <a href="tel:+17789006780" className="text-xl font-medium hover:text-accent transition-colors">
                    +1 778-900-6780
                  </a>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full bg-ink text-bg flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/50 mb-2">Visit Us</h4>
                  <address className="text-xl font-medium not-italic leading-relaxed">
                    1443 SW 1200th Rd<br/>
                    Holden, Missouri<br/>
                    USA
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="contact-form bg-surface rounded-[40px] p-8 md:p-12 border border-ink/5">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest font-bold text-ink/50">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-ink/20 py-3 text-lg font-medium focus:outline-none focus:border-accent transition-colors rounded-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-ink/50">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-ink/20 py-3 text-lg font-medium focus:outline-none focus:border-accent transition-colors rounded-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-xs uppercase tracking-widest font-bold text-ink/50">Company</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-ink/20 py-3 text-lg font-medium focus:outline-none focus:border-accent transition-colors rounded-none"
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-xs uppercase tracking-widest font-bold text-ink/50">Project Budget</label>
                    <select 
                      id="budget" 
                      name="budget" 
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-ink/20 py-3 text-lg font-medium focus:outline-none focus:border-accent transition-colors rounded-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a range</option>
                      <option value="< $5k">Less than $5,000</option>
                      <option value="$5k - $10k">$5,000 - $10,000</option>
                      <option value="$10k - $25k">$10,000 - $25,000</option>
                      <option value="$25k+">$25,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest font-bold text-ink/50">Project Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-ink/20 py-3 text-lg font-medium focus:outline-none focus:border-accent transition-colors rounded-none resize-none"
                    placeholder="Tell us about your goals, timeline, and what you're looking to achieve..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto text-lg px-12 py-5 flex items-center justify-center gap-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
                  </Button>
                  {isSuccess && (
                    <p className="mt-4 text-sm text-accent font-medium">
                      Thank you! We've sent a confirmation email to your address.
                    </p>
                  )}
                  {errorMessage && (
                    <p className="mt-4 text-sm text-red-500 font-medium p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
