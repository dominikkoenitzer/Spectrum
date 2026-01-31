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
        'inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800',
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
          ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
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
