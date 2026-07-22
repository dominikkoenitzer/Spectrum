'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { loadImageToCanvas, getCanvasCoordinates, getPixelColor } from '@/lib/canvasUtils';
import { cn } from '@/lib/utils';

interface ImageCanvasProps {
  imageSource: string | File | null;
  onColorPick: (color: { r: number; g: number; b: number; a: number }) => void;
  onError?: (error: string) => void;
  className?: string;
}

export function ImageCanvas({ imageSource, onColorPick, onError, className }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<{ r: number; g: number; b: number } | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!imageSource || !canvasRef.current) return;

    setIsLoaded(false);
    
    loadImageToCanvas(imageSource, canvasRef.current)
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load image:', error);
        onError?.(error.message || 'Failed to load image');
        setIsLoaded(false);
      });
  }, [imageSource, onError]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !isLoaded) return;

      const coords = getCanvasCoordinates(canvasRef.current, e.clientX, e.clientY);
      const color = getPixelColor(canvasRef.current, coords.x, coords.y);

      if (color) {
        setHoveredColor({ r: color.r, g: color.g, b: color.b });
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    },
    [isLoaded]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current || !isLoaded) return;

      const coords = getCanvasCoordinates(canvasRef.current, e.clientX, e.clientY);
      const color = getPixelColor(canvasRef.current, coords.x, coords.y);

      if (color) {
        onColorPick(color);
      }
    },
    [isLoaded, onColorPick]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredColor(null);
    setCursorPos(null);
  }, []);

  // Keyboard sampling: arrows move a sampling point across the canvas
  // (Shift = 10px steps), Enter/Space picks the color under it.
  const [kbSample, setKbSample] = useState<{
    x: number;
    y: number;
    left: number;
    top: number;
    color: { r: number; g: number; b: number; a: number };
  } | null>(null);

  const moveKbSample = useCallback(
    (dx: number, dy: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !isLoaded) return;
      setKbSample((prev) => {
        const x = Math.min(canvas.width - 1, Math.max(0, (prev?.x ?? Math.floor(canvas.width / 2)) + dx));
        const y = Math.min(canvas.height - 1, Math.max(0, (prev?.y ?? Math.floor(canvas.height / 2)) + dy));
        const color = getPixelColor(canvas, x, y);
        if (!color) return prev;
        const rect = canvas.getBoundingClientRect();
        return {
          x,
          y,
          left: (x / canvas.width) * rect.width,
          top: (y / canvas.height) * rect.height,
          color,
        };
      });
    },
    [isLoaded]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLCanvasElement>) => {
      if (!isLoaded) return;
      const step = e.shiftKey ? 10 : 1;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveKbSample(-step, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveKbSample(step, 0);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveKbSample(0, -step);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveKbSample(0, step);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (kbSample) onColorPick(kbSample.color);
          else moveKbSample(0, 0);
          break;
      }
    },
    [isLoaded, kbSample, moveKbSample, onColorPick]
  );

  if (!imageSource) {
    return null;
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="application"
        aria-label="Image color sampler. Use the arrow keys to move the sampling point (hold Shift for bigger steps) and press Enter to pick the color."
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        onBlur={() => setKbSample(null)}
        className={cn(
          'max-h-[600px] max-w-full rounded-xl border border-line',
          isLoaded && 'canvas-crosshair'
        )}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />

      {kbSample && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper shadow-[0_0_0_1.5px_var(--ink)]"
          style={{
            left: kbSample.left,
            top: kbSample.top,
            backgroundColor: `rgb(${kbSample.color.r}, ${kbSample.color.g}, ${kbSample.color.b})`,
          }}
        />
      )}
      <span role="status" className="sr-only">
        {kbSample
          ? `Sampling point at ${kbSample.x}, ${kbSample.y}. Color RGB ${kbSample.color.r}, ${kbSample.color.g}, ${kbSample.color.b}. Press Enter to pick.`
          : ''}
      </span>

      {!isLoaded && imageSource && (
        <div className="flex h-64 items-center justify-center rounded-xl border border-line bg-surface">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-ink"></div>
            <p className="label-caps text-ink-3">Loading image…</p>
          </div>
        </div>
      )}

      {/* Color preview tooltip */}
      {hoveredColor && cursorPos && (
        <div
          className="pointer-events-none fixed z-50 flex items-center gap-2 rounded-lg border border-line bg-surface p-2 shadow-lg"
          style={{
            left: cursorPos.x + 20,
            top: cursorPos.y + 20,
          }}
        >
          <div
            className="h-8 w-8 rounded border border-line"
            style={{
              backgroundColor: `rgb(${hoveredColor.r}, ${hoveredColor.g}, ${hoveredColor.b})`,
            }}
          />
          <span className="font-mono text-xs text-ink-2">
            {hoveredColor.r}, {hoveredColor.g}, {hoveredColor.b}
          </span>
        </div>
      )}
    </div>
  );
}
