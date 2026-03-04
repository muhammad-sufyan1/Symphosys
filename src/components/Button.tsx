import React, { useRef } from 'react';
import { cn } from '../utils/cn';
import { ArrowRight } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', withArrow = true, magnetic = true, children, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || internalRef;
    
    // Only apply magnetic effect if enabled
    if (magnetic) {
      useMagnetic(buttonRef, 0.2);
    }

    return (
      <button
        ref={buttonRef}
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold tracking-tight transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer disabled:cursor-not-allowed',
          {
            'bg-accent text-white hover:bg-ink': variant === 'primary',
            'bg-ink text-bg hover:bg-accent hover:text-white': variant === 'secondary',
            'border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-bg': variant === 'outline',
            'h-12 px-6 text-sm': size === 'sm',
            'h-14 px-8 text-base': size === 'md',
            'h-16 px-10 text-lg md:text-xl': size === 'lg',
          },
          className
        )}
        {...props}
      >
        <div className="relative flex items-center gap-2 overflow-hidden pointer-events-none">
          <span className="relative inline-grid overflow-hidden">
            <span className="transition-transform duration-500 group-hover:-translate-y-[150%]">{children}</span>
            <span className="absolute inset-0 translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0">{children}</span>
          </span>
          {withArrow && (
            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45" />
          )}
        </div>
      </button>
    );
  }
);
