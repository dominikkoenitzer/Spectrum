'use client';

import { useRef, useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageLoad: (source: File) => void;
  className?: string;
}

export function ImageUploader({ onImageLoad, className }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError("That file isn't an image — try a PNG, JPG, GIF, or WEBP.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('That image is over 10MB — try a smaller file.');
        return;
      }
      setError(null);
      onImageLoad(file);
    },
    [onImageLoad]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) acceptFile(file);
      // Reset input so same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [acceptFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      if (file) acceptFile(file);
    },
    [acceptFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const open = () => inputRef.current?.click();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload an image"
      className={cn(
        'group flex cursor-pointer items-center gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5 transition-colors hover:border-line-strong active:scale-[0.997]',
        className
      )}
      onClick={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <span className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-xl border border-line bg-paper transition-transform group-hover:-translate-y-0.5">
        <Upload className="h-6 w-6 text-ink" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-medium text-ink">Drop an image, or browse</p>
        <p className="mt-1 font-mono text-xs text-ink-2">PNG · JPG · GIF · WEBP — up to 10MB</p>
        {error && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-negative">
            {error}
          </p>
        )}
      </div>
      <span className="hidden flex-shrink-0 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors group-hover:bg-ink/90 sm:inline-block">
        Choose file
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

interface ImageUrlInputProps {
  onImageLoad: (url: string) => void;
  className?: string;
}

export function ImageUrlInput({ onImageLoad, className }: ImageUrlInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const url = inputRef.current?.value.trim();
      if (url) {
        // Basic URL validation
        try {
          const urlObj = new URL(url);
          if (!['http:', 'https:'].includes(urlObj.protocol)) {
            setError('Only http(s) image links are supported.');
            return;
          }
          setError(null);
          onImageLoad(url);
        } catch {
          setError("That doesn't look like a valid URL.");
        }
      }
    },
    [onImageLoad]
  );

  return (
    <form onSubmit={handleSubmit} className={cn('rounded-2xl border border-line bg-surface p-4 sm:p-5', className)}>
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-line bg-paper">
          <ImageIcon className="h-5 w-5 text-ink" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="text-sm font-medium text-ink">From a URL</h3>
          <p className="font-mono text-xs text-ink-2">Paste a direct image link</p>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="url"
          placeholder="https://example.com/image.jpg"
          aria-label="Image URL"
          onChange={() => setError(null)}
          className="h-11 flex-1 rounded-lg border border-line bg-paper px-3.5 text-sm text-ink placeholder:text-ink-3 focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-ink/90 active:scale-95"
        >
          Load
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-negative">
          {error}
        </p>
      )}
    </form>
  );
}
