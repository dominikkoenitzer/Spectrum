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

// Fallback copy function for environments where clipboard API is not available
const fallbackCopyTextToClipboard = (text: string): boolean => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    document.body.removeChild(textArea);
    return false;
  }
};

export function CopyButton({ text, className, label, showLabel = true }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Try modern clipboard API first
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } else {
        // Fallback for older browsers or insecure contexts
        const success = fallbackCopyTextToClipboard(text);
        if (success) {
          setCopied(true);
        }
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Final fallback attempt
      const success = fallbackCopyTextToClipboard(text);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium transition-all duration-200',
        'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-violet-500/50',
        copied && 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
        className
      )}
      title={`Copy ${label || text}`}
      aria-label={`Copy ${label || text} to clipboard`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {showLabel && <span>Copied!</span>}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {showLabel && label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
