'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Plus, Trash2, RotateCcw, Copy, Check, Download, Code, Sparkles, Shuffle, Zap, ArrowUp, ArrowUpRight, ArrowRight, ArrowDownRight, ArrowDown, ArrowDownLeft, ArrowLeft, ArrowUpLeft } from 'lucide-react';
import {
  GradientConfig,
  GradientType,
  GradientStop,
  generateGradientCSS,
  createDefaultGradient,
  addGradientStop,
  removeGradientStop,
  updateGradientStop,
  presetGradients,
  generateId,
} from '@/lib/gradientUtils';
import { cn } from '@/lib/utils';
import { EyeDropperButton } from '@/components/ui/EyeDropperButton';

// Preset categories
const presetCategories = [
  { name: 'Popular', filter: (i: number) => i < 8 },
  { name: 'Warm', filter: (i: number) => i >= 8 && i < 12 },
  { name: 'Cool', filter: (i: number) => i >= 12 && i < 16 },
  { name: 'Vibrant', filter: (i: number) => i >= 16 },
];

// Export formats
const exportFormats = [
  { name: 'CSS', format: 'css' },
  { name: 'Tailwind', format: 'tailwind' },
  { name: 'SCSS', format: 'scss' },
];

// Quick angle presets with icons
const anglePresets = [
  { angle: 0, Icon: ArrowUp },
  { angle: 45, Icon: ArrowUpRight },
  { angle: 90, Icon: ArrowRight },
  { angle: 135, Icon: ArrowDownRight },
  { angle: 180, Icon: ArrowDown },
  { angle: 225, Icon: ArrowDownLeft },
  { angle: 270, Icon: ArrowLeft },
  { angle: 315, Icon: ArrowUpLeft },
];

// URL state: ?type=linear&angle=90&stops=667eea.0,764ba2.100
const parseGradientFromSearch = (search: string): GradientConfig | null => {
  const params = new URLSearchParams(search);
  const type = params.get('type');
  const angleRaw = params.get('angle');
  const stopsRaw = params.get('stops');
  if (type === null && angleRaw === null && stopsRaw === null) return null;
  if (type !== 'linear' && type !== 'radial' && type !== 'conic') return null;
  if (angleRaw === null || stopsRaw === null) return null;
  const angle = Number(angleRaw);
  if (!Number.isInteger(angle) || angle < 0 || angle > 360) return null;
  const stops: GradientStop[] = [];
  for (const part of stopsRaw.split(',')) {
    const match = /^([0-9a-fA-F]{6})\.(\d{1,3})$/.exec(part);
    if (!match) return null;
    const position = Number(match[2]);
    if (position > 100) return null;
    stops.push({ id: generateId(), color: `#${match[1].toLowerCase()}`, position });
  }
  if (stops.length < 2) return null;
  return { type, angle, stops };
};

const serializeGradientParams = (config: GradientConfig): string => {
  const stops = [...config.stops]
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color.replace('#', '')}.${Math.round(s.position)}`)
    .join(',');
  return `type=${config.type}&angle=${Math.round(config.angle)}&stops=${stops}`;
};

export default function GradientMakerPage() {
  const [gradient, setGradient] = useState<GradientConfig>(createDefaultGradient());
  const [copied, setCopied] = useState(false);
  const [activePresetCategory, setActivePresetCategory] = useState('Popular');
  const [exportFormat, setExportFormat] = useState('css');

  const cssCode = generateGradientCSS(gradient);
  
  // Generate export code based on format
  const exportCode = useMemo(() => {
    switch (exportFormat) {
      case 'tailwind':
        return `// tailwind.config.js
backgroundImage: {
  'custom': '${cssCode}',
}

// Usage: className="bg-custom"`;
      case 'scss':
        return `$gradient: ${cssCode};

.element {
  background: $gradient;
}`;
      default:
        return `background: ${cssCode};`;
    }
  }, [cssCode, exportFormat]);

  const handleTypeChange = (type: GradientType) => {
    setGradient((prev) => ({ ...prev, type }));
  };

  const handleAngleChange = (angle: number) => {
    setGradient((prev) => ({ ...prev, angle }));
  };

  const handleAddStop = () => {
    const positions = gradient.stops.map(s => s.position).sort((a, b) => a - b);
    let newPosition = 50;
    for (let i = 0; i < positions.length - 1; i++) {
      const gap = positions[i + 1] - positions[i];
      if (gap > 20) {
        newPosition = positions[i] + gap / 2;
        break;
      }
    }
    setGradient((prev) => addGradientStop(prev, '#888888', Math.round(newPosition)));
  };

  const handleRemoveStop = (id: string) => {
    setGradient((prev) => removeGradientStop(prev, id));
  };

  const handleStopColorChange = (id: string, color: string) => {
    setGradient((prev) => updateGradientStop(prev, id, { color }));
  };

  const handleStopPositionChange = (id: string, position: number) => {
    setGradient((prev) => updateGradientStop(prev, id, { position }));
  };

  const handlePresetSelect = (preset: GradientConfig) => {
    setGradient({
      ...preset,
      stops: preset.stops.map((stop) => ({ ...stop, id: generateId() })),
    });
  };

  const handleReset = () => {
    setGradient(createDefaultGradient());
  };

  const handleRandomize = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const numStops = Math.floor(Math.random() * 3) + 2;
    const stops: GradientStop[] = [];
    
    for (let i = 0; i < numStops; i++) {
      stops.push({
        id: generateId(),
        color: randomColor(),
        position: Math.round((i / (numStops - 1)) * 100),
      });
    }
    
    setGradient({
      type: ['linear', 'radial', 'conic'][Math.floor(Math.random() * 3)] as GradientType,
      angle: Math.floor(Math.random() * 360),
      stops,
    });
  };

  const handleCopyCSS = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownloadCSS = () => {
    const blob = new Blob([exportCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gradient.${exportFormat === 'scss' ? 'scss' : 'css'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const applyGradient = useCallback((config: GradientConfig) => {
    setGradient(config);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const fromUrl = parseGradientFromSearch(window.location.search);
      if (fromUrl) applyGradient(fromUrl);
    }, 0);
    return () => window.clearTimeout(id);
  }, [applyGradient]);

  const urlTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    urlTimeoutRef.current = setTimeout(() => {
      window.history.replaceState(null, '', `${window.location.pathname}?${serializeGradientParams(gradient)}`);
    }, 300);
    return () => {
      if (urlTimeoutRef.current) clearTimeout(urlTimeoutRef.current);
    };
  }, [gradient]);

  const sortedStops = [...gradient.stops].sort((a, b) => a.position - b.position);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <p className="label-caps text-ink-3 mb-4">CSS Generator</p>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-[-0.035em] text-ink mb-3 leading-[0.98]">
          Gradient Maker
        </h1>
        <p className="text-base text-ink-2 max-w-md">
          Design CSS gradients with a live preview.
        </p>
      </div>

      {/* Live Preview - Full width */}
      <div className="mb-6">
        <div 
          className="w-full h-40 sm:h-56 rounded-2xl shadow-2xl ring-1 ring-line"
          style={{ background: cssCode }}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="flex items-center justify-between gap-2 mb-6 p-3 bg-surface  border border-line rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            aria-label="Randomize gradient"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-ink text-paper text-xs font-medium active:scale-95 transition-transform"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Random</span>
          </button>
          <button
            onClick={handleReset}
            aria-label="Reset gradient"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-2 border border-line text-ink-2 text-xs font-medium active:scale-95 transition-transform"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
        
        <button
          onClick={handleCopyCSS}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium active:scale-95 transition-all",
            copied
              ? "bg-positive/15 text-positive border border-positive/30"
              : "bg-surface-2 text-ink border border-line"
          )}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy CSS'}
        </button>
      </div>

      {/* Main Controls Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Type & Colors */}
        <div className="space-y-4">
          {/* Gradient Type */}
          <div className="bg-surface  border border-line rounded-xl p-4">
            <h2 className="text-sm font-medium text-ink mb-3">Type</h2>
            <div className="grid grid-cols-3 gap-2">
              {(['linear', 'radial', 'conic'] as GradientType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl text-xs font-medium capitalize transition-all active:scale-95",
                    gradient.type === type
                      ? "bg-surface-2 border-2 border-line text-ink"
                      : "bg-surface-2 border border-line text-ink-2"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg",
                    type === 'linear' && "bg-gradient-to-r from-ink to-line-strong",
                    type === 'radial' && "bg-[radial-gradient(circle,_#18181a,_#d4d4cd)]",
                    type === 'conic' && "bg-[conic-gradient(from_0deg,_#18181a,_#d4d4cd,_#18181a)]"
                  )} />
                  {type}
                </button>
              ))}
            </div>
            
            {/* Angle Control - Only for linear/conic */}
            {(gradient.type === 'linear' || gradient.type === 'conic') && (
              <div className="mt-4 pt-4 border-t border-line">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-ink-2">Direction</span>
                  <span className="text-xs font-mono text-ink bg-surface-2 px-2 py-0.5 rounded">
                    {gradient.angle}°
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {anglePresets.map((preset) => (
                    <button
                      key={preset.angle}
                      onClick={() => handleAngleChange(preset.angle)}
                      aria-label={`Set angle ${preset.angle}°`}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-lg transition-all active:scale-90",
                        gradient.angle === preset.angle
                          ? "bg-surface-2 text-ink border border-line"
                          : "bg-surface-2 text-ink-3 border border-line hover:text-ink"
                      )}
                    >
                      <preset.Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  value={gradient.angle}
                  onChange={(e) => handleAngleChange(Number(e.target.value))}
                  min={0}
                  max={360}
                  aria-label="Gradient angle"
                  className="w-full mt-3 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-ink"
                />
              </div>
            )}
          </div>

          {/* Color Stops */}
          <div className="bg-surface  border border-line rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-ink">Colors</h2>
              <button
                onClick={handleAddStop}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-2 border border-line text-ink text-xs font-medium active:scale-95 transition-transform"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            
            {/* Gradient Bar with Stops */}
            <div className="relative h-10 mb-4 rounded-xl overflow-hidden ring-1 ring-line">
              <div className="absolute inset-0" style={{ background: cssCode }} />
              {sortedStops.map((stop) => (
                <div
                  key={stop.id}
                  className="absolute top-0 bottom-0 w-0.5 bg-surface-2"
                  style={{ left: `${stop.position}%` }}
                >
                  <div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-2 ring-surface shadow-lg"
                    style={{ backgroundColor: stop.color }}
                  />
                </div>
              ))}
            </div>
            
            {/* Color Stop List */}
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {sortedStops.map((stop) => (
                <div 
                  key={stop.id} 
                  className="flex items-center gap-3 p-2 rounded-xl bg-surface border border-line"
                >
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => handleStopColorChange(stop.id, e.target.value)}
                    aria-label="Stop color"
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 bg-transparent flex-shrink-0"
                  />
                  <EyeDropperButton
                    size="sm"
                    onPick={(hex) => handleStopColorChange(stop.id, hex)}
                  />
                  <input
                    type="range"
                    value={stop.position}
                    onChange={(e) => handleStopPositionChange(stop.id, Number(e.target.value))}
                    min={0}
                    max={100}
                    aria-label="Stop position"
                    className="flex-1 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-ink"
                  />
                  <span className="text-xs font-mono text-ink-2 w-8 text-right">{stop.position}%</span>
                  <button
                    onClick={() => handleRemoveStop(stop.id)}
                    disabled={gradient.stops.length <= 2}
                    aria-label="Remove color stop"
                    className="p-2 rounded-lg text-ink-3 hover:bg-negative/10 hover:text-negative disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Presets & Export */}
        <div className="space-y-4">
          {/* Presets */}
          <div className="bg-surface  border border-line rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-ink" />
                <h2 className="text-sm font-medium text-ink">Presets</h2>
              </div>
              <div className="flex gap-1 p-0.5 bg-surface rounded-lg">
                {presetCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActivePresetCategory(cat.name)}
                    className={cn(
                      "px-2 py-1 text-[10px] font-medium rounded transition-all",
                      activePresetCategory === cat.name
                        ? "bg-surface-2 text-ink"
                        : "text-ink-3"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {presetGradients
                .filter((_, i) => presetCategories.find(c => c.name === activePresetCategory)?.filter(i))
                .map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetSelect(preset)}
                    aria-label={`Apply preset gradient ${index + 1}`}
                    className="aspect-square rounded-xl transition-transform hover:scale-105 active:scale-95 ring-1 ring-line hover:ring-2 hover:ring-ink"
                    style={{ background: generateGradientCSS(preset) }}
                  />
                ))}
            </div>
          </div>

          {/* Export */}
          <div className="bg-surface  border border-line rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-ink-3" />
                <h2 className="text-sm font-medium text-ink">Export</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 p-0.5 bg-surface rounded-lg">
                  {exportFormats.map((format) => (
                    <button
                      key={format.format}
                      onClick={() => setExportFormat(format.format)}
                      className={cn(
                        "px-2 py-1 text-[10px] font-medium rounded transition-all",
                        exportFormat === format.format
                          ? "bg-surface-2 text-ink"
                          : "text-ink-3"
                      )}
                    >
                      {format.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleDownloadCSS}
                  aria-label="Download code"
                  className="p-1.5 rounded-lg bg-surface-2 border border-line text-ink-2 hover:text-ink active:scale-95 transition-all"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="rounded-xl bg-surface border border-line p-3">
              <pre className="text-xs text-ink-2 font-mono whitespace-pre-wrap break-all">
                {exportCode}
              </pre>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-surface-2 border border-line rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0">
                <Zap className="h-4 w-4 text-ink" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-1">Quick Tips</h3>
                <ul className="text-xs text-ink-2 space-y-1">
                  <li>• Tap a preset to apply it</li>
                  <li>• Click a swatch to change its color</li>
                  <li>• Drag a position slider to move a stop</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
