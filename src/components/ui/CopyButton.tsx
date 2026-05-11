'use client';

import { useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  showLabel?: boolean;
}

function fallbackCopy(text: string): boolean {
  const el = document.createElement('textarea');
  el.value = text;
  Object.assign(el.style, { top: '0', left: '0', position: 'fixed', opacity: '0' });
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    document.body.removeChild(el);
    return false;
  }
}

export function CopyButton({ text, className, label, showLabel = true }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
    } catch {
      fallbackCopy(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      type="button"
      title={`Copy ${label || text}`}
      aria-label={`Copy ${label || text} to clipboard`}
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium',
        'transition-all duration-200 active:scale-95 overflow-hidden',
        copied
          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
          : 'bg-white/5 text-gray-400 border border-white/8 hover:bg-white/10 hover:text-gray-200 hover:border-white/15',
        className,
      )}
    >
      {/* Shimmer on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
      />

      <span
        className={cn(
          'flex items-center gap-1.5 transition-all duration-200',
          copied ? 'scale-100 opacity-100' : 'scale-100 opacity-100',
        )}
      >
        <span className={cn(
          'transition-all duration-200',
          copied ? 'rotate-0 scale-100' : '',
        )}>
          {copied
            ? <Check className="h-3.5 w-3.5 text-green-400" />
            : <Copy className="h-3.5 w-3.5" />
          }
        </span>
        {showLabel && label && (
          <span className="truncate max-w-40">{copied ? 'Copied' : label}</span>
        )}
      </span>
    </button>
  );
}
