import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../utils/cn';
import { servicesData } from '../data/services';
import { useBookingModal } from '../contexts/BookingModalContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Format slug to title
  const formatTitle = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const navTextColor = 'text-ink';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4 md:px-8',
        isScrolled ? 'py-4' : 'py-6'
      )}
    >
      <div className={cn(
        "w-full flex items-center justify-between transition-all duration-300 relative z-50",
        isScrolled ? "bg-surface/95 backdrop-blur-md rounded-full py-3 px-6 md:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-ink/10 max-w-6xl mx-auto" : "max-w-7xl mx-auto px-2"
      )}>
        <Link to="/" className="flex items-center gap-2 relative z-50">
          <img 
            src="/logo.svg" 
            alt="Symphosys Logo" 
            className={cn("h-8 md:h-10 w-auto object-contain transition-all duration-300")}
          />
          <span className={cn("hidden font-display text-2xl md:text-3xl uppercase tracking-wider font-bold transition-colors duration-300", navTextColor)}>
            SYMPHOSYS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div 
            className="relative group"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button className={cn("flex items-center gap-1 text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors py-2", navTextColor)}>
              Services <ChevronDown size={16} className={cn("transition-transform duration-300", isMegaMenuOpen && "rotate-180")} />
            </button>
            
            {/* Mega Menu Dropdown */}
            <div className={cn(
              "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300",
              isMegaMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
            )}>
              <div className="w-[850px] bg-white rounded-3xl shadow-2xl border border-ink/5 p-8 grid grid-cols-2 gap-x-8 gap-y-6 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-ink/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                
                {servicesData.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <Link 
                      key={idx} 
                      to={`/services/${service.slug}`}
                      className="group/item flex items-start gap-4 relative z-10 p-4 rounded-2xl hover:bg-bg/50 transition-colors duration-300"
                      onClick={() => setIsMegaMenuOpen(false)}
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover/item:scale-110 group-hover/item:bg-accent group-hover/item:text-white transition-all duration-300">
                        {Icon && <Icon size={24} strokeWidth={1.5} />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-lg font-bold uppercase text-ink group-hover/item:text-accent transition-colors">
                            {formatTitle(service.slug)}
                          </span>
                          <ArrowRight size={14} className="text-accent opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                        </div>
                        <span className="text-sm font-medium text-ink/60 line-clamp-1">
                          {service.shortDescription}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          
          <Link to="/work" className={cn("text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors", navTextColor)}>Work</Link>
          <Link to="/about" className={cn("text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors", navTextColor)}>About</Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => openBookingModal('navbar-desktop')}
          >
            Get a Strategy Call
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn("md:hidden relative z-50 p-2 -mr-2 transition-colors duration-300", navTextColor)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={32} className="text-ink" /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          'fixed inset-0 bg-surface z-40 flex flex-col pt-24 pb-8 px-6 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden overflow-y-auto',
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
          <div className="flex flex-col">
            <button 
              className="flex items-center justify-between text-3xl md:text-5xl font-display uppercase text-ink font-bold py-2"
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
            >
              Services
              <ChevronDown size={28} className={cn("transition-transform duration-300", isMobileServicesOpen && "rotate-180")} />
            </button>
            
            <div className={cn(
              "flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out",
              isMobileServicesOpen ? "max-h-[1000px] opacity-100 mt-4 mb-4" : "max-h-0 opacity-0"
            )}>
              {servicesData.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Link 
                    key={idx} 
                    to={`/services/${service.slug}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-bg/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      {Icon && <Icon size={20} strokeWidth={1.5} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display text-lg font-bold uppercase text-ink">
                        {formatTitle(service.slug)}
                      </span>
                      <span className="text-xs font-medium text-ink/60 line-clamp-1">
                        {service.shortDescription}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link to="/work" className="text-3xl md:text-5xl font-display uppercase text-ink hover:text-accent font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>Work</Link>
          <Link to="/about" className="text-3xl md:text-5xl font-display uppercase text-ink hover:text-accent font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 w-full"
            onClick={() => {
              setIsMobileMenuOpen(false);
              openBookingModal('navbar-mobile');
            }}
          >
            Get a Strategy Call
          </Button>
        </div>
      </div>
    </header>
  );
}
