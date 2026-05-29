'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={cn('', className)} data-value={value} data-onchange={onValueChange}>
      {children}
    </div>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-line bg-surface-2 p-1',
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export function TabsTrigger({ value, children, className, active, onClick }: TabsTriggerProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'bg-surface text-ink shadow-sm'
          : 'text-ink-2 hover:text-ink',
        className
      )}
      onClick={onClick}
      data-value={value}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export function TabsContent({ children, className, active }: TabsContentProps) {
  if (!active) return null;
  return <div className={cn('mt-4', className)}>{children}</div>;
}
