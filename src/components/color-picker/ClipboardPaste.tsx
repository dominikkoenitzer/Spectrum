'use client';

import { useEffect, useCallback, useState } from 'react';
import { Clipboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClipboardPasteProps {
  onImagePaste: (file: File) => void;
  className?: string;
}

export function ClipboardPaste({ onImagePaste, className }: ClipboardPasteProps) {
  const [isPasting, setIsPasting] = useState(false);

  const handlePaste = useCallback(
    async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            setIsPasting(true);
            onImagePaste(file);
            setTimeout(() => setIsPasting(false), 1000);
            break;
          }
        }
      }
    },
    [onImagePaste]
  );

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  return (
    <div className={cn('rounded-2xl border border-line bg-surface p-4 sm:p-5', className)}>
      <div className="mb-3 flex items-center gap-3">
        <span className={cn(
          'grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border transition-colors',
          isPasting ? 'border-positive bg-positive/10' : 'border-line bg-paper',
        )}>
          <Clipboard className={cn('h-5 w-5 transition-colors', isPasting ? 'text-positive' : 'text-ink')} strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="text-sm font-medium text-ink">From the clipboard</h3>
          <p className="font-mono text-xs text-ink-2">
            {isPasting ? 'Image pasted' : 'Press Ctrl+V / Cmd+V to paste'}
          </p>
        </div>
      </div>
      <div className={cn(
        'flex h-24 items-center justify-center rounded-xl border border-dashed transition-colors',
        isPasting ? 'border-positive bg-positive/5 text-positive' : 'border-line-strong bg-paper text-ink-2',
      )}>
        <p className="label-caps">
          {isPasting ? 'Pasted' : 'Waiting for clipboard…'}
        </p>
      </div>
    </div>
  );
}
