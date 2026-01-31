'use client';

import { useRef, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageLoad: (source: File) => void;
  className?: string;
}

export function ImageUploader({ onImageLoad, className }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        onImageLoad(file);
      }
      // Reset input so same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onImageLoad]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageLoad(file);
      }
    },
    [onImageLoad]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 bg-gray-900/50 backdrop-blur p-8 sm:p-12 transition-all hover:border-violet-500/50 hover:bg-gray-900/70 active:scale-[0.99]',
        className
      )}
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
        <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-white">
        Drop image here or tap to browse
      </p>
      <p className="mt-1 text-center text-xs text-gray-500">
        PNG, JPG, GIF, WebP up to 10MB
      </p>
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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const url = inputRef.current?.value.trim();
      if (url) {
        onImageLoad(url);
      }
    },
    [onImageLoad]
  );

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <ImageIcon className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">From URL</h3>
          <p className="text-xs text-gray-500">Enter an image link</p>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="url"
          placeholder="https://example.com/image.jpg"
          className="flex-1 h-11 rounded-lg bg-black/30 border border-white/10 px-4 text-sm text-white placeholder:text-gray-500 focus:border-violet-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium hover:opacity-90 transition-opacity active:scale-95"
        >
          Load
        </button>
      </div>
    </form>
  );
}
