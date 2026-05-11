'use client';

import React, { CSSProperties } from 'react';
import { useInView } from '@/lib/hooks';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  as?: string;
  threshold?: number;
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 600,
  direction = 'up',
  as: Tag = 'div',
  threshold = 0.1,
}: AnimateInProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold);

  const baseStyle: CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: inView ? `${delay}ms` : '0ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
  };

  const hiddenClass = {
    up: 'opacity-0 translate-y-6',
    down: 'opacity-0 -translate-y-6',
    left: 'opacity-0 translate-x-6',
    right: 'opacity-0 -translate-x-6',
    scale: 'opacity-0 scale-95',
    none: 'opacity-0',
  }[direction];

  const El = Tag as React.ElementType;
  return (
    <El
      ref={ref}
      style={baseStyle}
      className={cn(
        !inView && hiddenClass,
        inView && 'opacity-100 translate-y-0 translate-x-0 scale-100',
        className,
      )}
    >
      {children}
    </El>
  );
}

export function StaggerChildren({
  children,
  className,
  stagger = 80,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
  direction?: Direction;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimateIn key={i} delay={delay + i * stagger} direction={direction}>
          {child}
        </AnimateIn>
      ))}
    </div>
  );
}
