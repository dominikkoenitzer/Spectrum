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
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
          isPasting ? "bg-green-500/20" : "bg-purple-500/20"
        )}>
          <Clipboard className={cn(
            "h-5 w-5 transition-colors",
            isPasting ? "text-green-400" : "text-purple-400"
          )} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">From Clipboard</h3>
          <p className="text-xs text-gray-500">
            {isPasting ? 'Image pasted!' : 'Press Ctrl+V to paste'}
          </p>
        </div>
      </div>
      <div className={cn(
        "flex items-center justify-center h-24 rounded-xl border-2 border-dashed transition-colors",
        isPasting 
          ? "border-green-500/50 bg-green-500/10" 
          : "border-white/20 bg-black/30"
      )}>
        <p className="text-sm text-gray-400">
          {isPasting ? '✓ Pasted' : 'Waiting for clipboard...'}
        </p>
      </div>
    </div>
  );
}
