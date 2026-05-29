'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          {
            'bg-ink text-paper hover:bg-ink/90':
              variant === 'primary',
            'bg-surface-2 text-ink hover:bg-line':
              variant === 'secondary',
            'border border-line bg-surface text-ink hover:bg-surface-2 hover:border-line-strong':
              variant === 'outline',
            'bg-transparent text-ink-2 hover:bg-surface-2 hover:text-ink':
              variant === 'ghost',
            'bg-negative text-paper hover:bg-negative/90':
              variant === 'danger',
          },
          {
            'h-8 px-3 text-sm gap-1.5': size === 'sm',
            'h-10 px-4 text-sm gap-2': size === 'md',
            'h-12 px-6 text-base gap-2': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
