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
        'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors active:scale-95',
        copied
          ? 'border-ink bg-ink text-paper'
          : 'border-line bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink',
        className,
      )}
    >
      {copied
        ? <Check className="h-3.5 w-3.5" />
        : <Copy className="h-3.5 w-3.5" />
      }
      {showLabel && label && (
        <span className="truncate max-w-40">{copied ? 'Copied' : label}</span>
      )}
    </button>
  );
}
