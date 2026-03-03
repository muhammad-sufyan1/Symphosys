import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('symphosys_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('symphosys_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] bg-ink text-bg p-6 rounded-2xl shadow-2xl z-50 border border-bg/10 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h3 className="font-display text-xl uppercase tracking-wide">Cookie Consent</h3>
      </div>
      <p className="text-sm text-bg/70 leading-relaxed">
        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our <Link to="/privacy" className="underline hover:text-accent transition-colors">Privacy Policy</Link> and <Link to="/terms" className="underline hover:text-accent transition-colors">Terms & Conditions</Link>.
      </p>
      <div className="flex justify-end gap-3 mt-2">
        <Button variant="accent" size="sm" onClick={handleAccept} className="w-full">
          Accept All
        </Button>
      </div>
    </div>
  );
}
