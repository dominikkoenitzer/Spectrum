'use client';

import { useState, useMemo } from 'react';
import { Plus, Trash2, RotateCcw, Copy, Check, Palette, Download, Code, Sparkles, Shuffle, Zap, ArrowUp, ArrowUpRight, ArrowRight, ArrowDownRight, ArrowDown, ArrowDownLeft, ArrowLeft, ArrowUpLeft } from 'lucide-react';
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

  const sortedStops = [...gradient.stops].sort((a, b) => a.position - b.position);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-3">
          <Palette className="h-3.5 w-3.5" />
          CSS Generator
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
          Gradient Maker
        </h1>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Create beautiful gradients with live preview
        </p>
      </div>

      {/* Live Preview - Full width */}
      <div className="mb-6">
        <div 
          className="w-full h-40 sm:h-56 rounded-2xl shadow-2xl ring-1 ring-white/10"
          style={{ background: cssCode }}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="flex items-center justify-between gap-2 mb-6 p-3 bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-medium active:scale-95 transition-transform"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Random</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium active:scale-95 transition-transform"
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
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-white/10 text-white border border-white/10"
          )}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy CSS'}
        </button>
      </div>

      {/* Main Controls Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Type & Colors */}
        <div className="space-y-4">
          {/* Gradient Type */}
          <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-medium text-white mb-3">Type</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['linear', 'radial', 'conic'] as GradientType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl text-xs font-medium capitalize transition-all active:scale-95",
                    gradient.type === type
                      ? "bg-violet-500/20 border-2 border-violet-500/50 text-white"
                      : "bg-white/5 border border-white/10 text-gray-400"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg",
                    type === 'linear' && "bg-gradient-to-r from-violet-400 to-fuchsia-400",
                    type === 'radial' && "bg-[radial-gradient(circle,_#a78bfa,_#e879f9)]",
                    type === 'conic' && "bg-[conic-gradient(from_0deg,_#a78bfa,_#e879f9,_#a78bfa)]"
                  )} />
                  {type}
                </button>
              ))}
            </div>
            
            {/* Angle Control - Only for linear/conic */}
            {(gradient.type === 'linear' || gradient.type === 'conic') && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">Direction</span>
                  <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">
                    {gradient.angle}°
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {anglePresets.map((preset) => (
                    <button
                      key={preset.angle}
                      onClick={() => handleAngleChange(preset.angle)}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-lg transition-all active:scale-90",
                        gradient.angle === preset.angle
                          ? "bg-violet-500/30 text-white border border-violet-500/50"
                          : "bg-white/5 text-gray-500 border border-white/5 hover:text-white"
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
                  className="w-full mt-3 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
              </div>
            )}
          </div>

          {/* Color Stops */}
          <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white">Colors</h3>
              <button
                onClick={handleAddStop}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-medium active:scale-95 transition-transform"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            
            {/* Gradient Bar with Stops */}
            <div className="relative h-10 mb-4 rounded-xl overflow-hidden ring-1 ring-white/10">
              <div className="absolute inset-0" style={{ background: cssCode }} />
              {sortedStops.map((stop) => (
                <div
                  key={stop.id}
                  className="absolute top-0 bottom-0 w-0.5 bg-white/60"
                  style={{ left: `${stop.position}%` }}
                >
                  <div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-2 ring-white shadow-lg"
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
                  className="flex items-center gap-3 p-2 rounded-xl bg-black/30 border border-white/5"
                >
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => handleStopColorChange(stop.id, e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0.5 bg-transparent flex-shrink-0"
                  />
                  <input
                    type="range"
                    value={stop.position}
                    onChange={(e) => handleStopPositionChange(stop.id, Number(e.target.value))}
                    min={0}
                    max={100}
                    className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                  <span className="text-xs font-mono text-gray-400 w-8 text-right">{stop.position}%</span>
                  <button
                    onClick={() => handleRemoveStop(stop.id)}
                    disabled={gradient.stops.length <= 2}
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-500/20 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
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
          <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-fuchsia-400" />
                <h3 className="text-sm font-medium text-white">Presets</h3>
              </div>
              <div className="flex gap-1 p-0.5 bg-black/30 rounded-lg">
                {presetCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActivePresetCategory(cat.name)}
                    className={cn(
                      "px-2 py-1 text-[10px] font-medium rounded transition-all",
                      activePresetCategory === cat.name
                        ? "bg-white/10 text-white"
                        : "text-gray-500"
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
                    className="aspect-square rounded-xl transition-transform hover:scale-105 active:scale-95 ring-1 ring-white/10 hover:ring-2 hover:ring-violet-500"
                    style={{ background: generateGradientCSS(preset) }}
                  />
                ))}
            </div>
          </div>

          {/* Export */}
          <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-medium text-white">Export</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 p-0.5 bg-black/30 rounded-lg">
                  {exportFormats.map((format) => (
                    <button
                      key={format.format}
                      onClick={() => setExportFormat(format.format)}
                      className={cn(
                        "px-2 py-1 text-[10px] font-medium rounded transition-all",
                        exportFormat === format.format
                          ? "bg-white/10 text-white"
                          : "text-gray-500"
                      )}
                    >
                      {format.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleDownloadCSS}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white active:scale-95 transition-all"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="rounded-xl bg-black/40 border border-white/5 p-3">
              <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap break-all">
                {exportCode}
              </pre>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-1">Quick Tips</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Tap presets to instantly apply</li>
                  <li>• Click color swatches to edit</li>
                  <li>• Use % inputs for precise positioning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
