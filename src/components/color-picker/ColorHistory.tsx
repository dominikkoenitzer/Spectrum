'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { X, Trash2, History, Download, Palette } from 'lucide-react';
import { ColorFormats } from '@/lib/colorUtils';
import { colorHistoryStore, MAX_COLOR_HISTORY } from '@/lib/colorHistory';
import { CopyButton } from '@/components/ui/CopyButton';
import { cn } from '@/lib/utils';

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
  const history = useSyncExternalStore(
    colorHistoryStore.subscribe,
    colorHistoryStore.getSnapshot,
    colorHistoryStore.getServerSnapshot,
  );
  const [showPaletteExport, setShowPaletteExport] = useState(false);

  useEffect(() => {
    if (currentColor) colorHistoryStore.add(currentColor);
  }, [currentColor]);

  const removeColor = (hex: string) => colorHistoryStore.remove(hex);
  const clearHistory = () => colorHistoryStore.clear();

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
      <div className={cn('rounded-2xl border border-line bg-surface p-6', className)}>
        <div className="text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl border border-line bg-paper">
            <History className="h-5 w-5 text-ink-3" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-ink">No colors saved yet</p>
          <p className="mt-1 text-xs text-ink-2">Colors you sample will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line bg-surface', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-ink-3" strokeWidth={1.75} />
          <h3 className="label-caps text-ink-2">History</h3>
          <span className="font-mono text-xs text-ink-3">({history.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowPaletteExport(!showPaletteExport)}
            className="rounded-lg p-1.5 text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
            title="Export palette"
            aria-label="Export palette"
            aria-expanded={showPaletteExport}
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={clearHistory}
            className="rounded-lg p-1.5 text-ink-3 transition-colors hover:bg-surface-2 hover:text-negative"
            title="Clear history"
            aria-label="Clear history"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Export panel */}
      {showPaletteExport && (
        <div className="border-b border-line bg-paper px-5 py-4">
          <p className="label-caps mb-3 text-ink-3">Export as</p>
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
                  className="relative h-10 w-full rounded-lg ring-1 ring-inset ring-black/10 transition-transform duration-200 hover:z-10 hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  title={color.name || color.hex}
                  aria-label={`Select ${color.name || color.hex}`}
                >
                  <span className={cn(
                    'absolute inset-0 flex items-center justify-center font-mono text-[8px] font-bold opacity-0 transition-opacity group-hover:opacity-100',
                    isLight ? 'text-black/70' : 'text-white'
                  )}>
                    {color.hex.slice(1).toUpperCase()}
                  </span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeColor(color.hex); }}
                  className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm group-hover:flex"
                  aria-label={`Remove ${color.name || color.hex} from history`}
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="border-t border-line px-5 py-3">
        <div className="flex items-center justify-between">
          <span className="label-caps flex items-center gap-1.5 text-ink-3">
            <Palette className="h-3 w-3" />
            {history.length} saved
          </span>
          <span className="label-caps text-ink-3">Max {MAX_COLOR_HISTORY}</span>
        </div>
      </div>
    </div>
  );
}
