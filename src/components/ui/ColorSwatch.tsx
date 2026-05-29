'use client';

import { cn } from '@/lib/utils';
import { CopyButton } from './CopyButton';

interface ColorSwatchProps {
  color: string;
  size?: 'sm' | 'md' | 'lg';
  showCopy?: boolean;
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function ColorSwatch({
  color,
  size = 'md',
  showCopy = false,
  label,
  className,
  onClick,
}: ColorSwatchProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'rounded-lg border border-line',
          {
            'h-6 w-6': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-16 w-16': size === 'lg',
          },
          onClick && 'cursor-pointer hover:ring-2 hover:ring-ink hover:ring-offset-1 hover:ring-offset-paper'
        )}
        style={{ backgroundColor: color }}
        onClick={onClick}
        title={label || color}
      />
      {showCopy && (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-ink-2">{color}</span>
          <CopyButton text={color} />
        </div>
      )}
    </div>
  );
}
