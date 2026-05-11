'use client';

import { useState, useEffect } from 'react';
import { X, Trash2, History, Download, Palette } from 'lucide-react';
import { ColorFormats } from '@/lib/colorUtils';
import { CopyButton } from '@/components/ui/CopyButton';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'spectrum-color-history';
const MAX_HISTORY = 24;

interface ColorHistoryProps {
  currentColor: ColorFormats | null;
  onColorSelect: (color: ColorFormats) => void;
  className?: string;
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export function ColorHistory({ currentColor, onColorSelect, className }: ColorHistoryProps) {
  const [history, setHistory] = useState<ColorFormats[]>([]);
  const [showPaletteExport, setShowPaletteExport] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!currentColor) return;
    setHistory((prev) => {
      const exists = prev.some((c) => c.hex === currentColor.hex);
      if (exists) return prev;
      const newHistory = [currentColor, ...prev].slice(0, MAX_HISTORY);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory)); } catch { /* ignore */ }
      return newHistory;
    });
  }, [currentColor]);

  const removeColor = (hex: string) => {
    setHistory((prev) => {
      const next = prev.filter((c) => c.hex !== hex);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const exportAsCSS = () => {
    const cssVars = history.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n');
    return `:root {\n${cssVars}\n}`;
  };

  const exportAsJSON = () => {
    const palette = history.map((c) => ({ hex: c.hex, rgb: c.rgbString, hsl: c.hslString, name: c.name || null }));
    return JSON.stringify(palette, null, 2);
  };

  if (history.length === 0) {
    return (
      <div className={cn('rounded-2xl border border-white/[0.08] bg-black/20 backdrop-blur p-6', className)}>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-3">
            <History className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-sm text-gray-400">No colors picked yet</p>
          <p className="text-xs text-gray-600 mt-1">Colors you pick will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl border border-white/[0.08] bg-black/20 backdrop-blur overflow-hidden', className)}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-100">Color History</h3>
          <span className="text-xs text-gray-600">({history.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowPaletteExport(!showPaletteExport)}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 hover:bg-white/[0.06] hover:text-gray-200 transition-colors"
            title="Export palette"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={clearHistory}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            title="Clear history"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Export panel */}
      {showPaletteExport && (
        <div className="px-5 py-4 bg-white/[0.02] border-b border-white/[0.06]">
          <p className="text-xs font-medium text-gray-500 mb-3">Export as:</p>
          <div className="flex gap-2">
            <CopyButton text={exportAsCSS()} label="CSS Variables" className="flex-1 justify-center" />
            <CopyButton text={exportAsJSON()} label="JSON" className="flex-1 justify-center" />
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="p-4">
        <div className="grid grid-cols-6 gap-2">
          {history.map((color) => {
            const isLight = isLightColor(color.hex);
            return (
              <div key={color.hex} className="group relative">
                <button
                  onClick={() => onColorSelect(color)}
                  className="h-10 w-full rounded-lg transition-all duration-200 hover:scale-110 hover:z-10 relative ring-1 ring-white/10"
                  style={{ backgroundColor: color.hex }}
                  title={color.name || color.hex}
                >
                  <span className={cn(
                    'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono font-bold',
                    isLight ? 'text-gray-800' : 'text-white'
                  )}>
                    {color.hex.slice(1).toUpperCase()}
                  </span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeColor(color.hex); }}
                  className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-gray-800 border border-white/10 text-gray-300 group-hover:flex shadow-sm"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 py-3 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            <Palette className="h-3 w-3 inline mr-1" />
            {history.length} color{history.length !== 1 ? 's' : ''} saved
          </span>
          <span className="text-gray-600">Max {MAX_HISTORY}</span>
        </div>
      </div>
    </div>
  );
}
