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

  if (!imageSource) {
    return null;
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'max-h-[600px] max-w-full rounded-lg border border-gray-200 shadow-sm dark:border-gray-700',
          isLoaded && 'canvas-crosshair'
        )}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
      
      {!isLoaded && imageSource && (
        <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
            <p className="text-sm text-gray-500">Loading image...</p>
          </div>
        </div>
      )}

      {/* Color preview tooltip */}
      {hoveredColor && cursorPos && (
        <div
          className="pointer-events-none fixed z-50 flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          style={{
            left: cursorPos.x + 20,
            top: cursorPos.y + 20,
          }}
        >
          <div
            className="h-8 w-8 rounded border border-gray-300 dark:border-gray-600"
            style={{
              backgroundColor: `rgb(${hoveredColor.r}, ${hoveredColor.g}, ${hoveredColor.b})`,
            }}
          />
          <span className="font-mono text-xs text-gray-600 dark:text-gray-300">
            {hoveredColor.r}, {hoveredColor.g}, {hoveredColor.b}
          </span>
        </div>
      )}
    </div>
  );
}
