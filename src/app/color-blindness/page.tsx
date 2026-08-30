'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Info, Eye, Users, Lightbulb, Check, Palette, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { colorBlindnessTypes, ColorBlindnessType, applyColorBlindnessToCanvas, simulateColorBlindnessHex } from '@/lib/colorBlindness';
import { loadImageToCanvas } from '@/lib/canvasUtils';
import { cn } from '@/lib/utils';

// Design tips for color blindness accessibility
const designTips = [
  {
    title: 'Don\'t rely on color alone',
    description: 'Use patterns, icons, or text labels alongside color to convey information.',
    icon: Palette,
  },
  {
    title: 'Ensure sufficient contrast',
    description: 'Maintain high contrast ratios (4.5:1 minimum) between text and backgrounds.',
    icon: Eye,
  },
  {
    title: 'Use colorblind-safe palettes',
    description: 'Choose colors that remain distinguishable across all vision types.',
    icon: Check,
  },
  {
    title: 'Test your designs',
    description: 'Regularly check how your work appears to users with color vision deficiency.',
    icon: Users,
  },
];

// Statistics about color blindness
const statistics = [
  { label: 'Men affected', value: '8%', description: 'of males worldwide' },
  { label: 'Women affected', value: '0.5%', description: 'of females worldwide' },
  { label: 'People globally', value: '300M+', description: 'with some form of CVD' },
  { label: 'Most common', value: 'Red-Green', description: 'deuteranopia/protanopia' },
];

// Safe color combinations that work for most color blind users
const safeColorPairs = [
  { name: 'Blue & Orange', colors: ['#0077BB', '#EE7733'] },
  { name: 'Blue & Yellow', colors: ['#0077BB', '#CCBB44'] },
  { name: 'Blue & Red', colors: ['#004488', '#BB5566'] },
  { name: 'Teal & Magenta', colors: ['#009988', '#EE3377'] },
  { name: 'Black & White', colors: ['#000000', '#FFFFFF'] },
  { name: 'Blue & Light Gray', colors: ['#332288', '#DDDDDD'] },
];

export default function ColorBlindnessPage() {
  const [imageSource, setImageSource] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<ColorBlindnessType>('deuteranopia');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState('#7c3aed');

  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const simulatedCanvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const applySimulation = useCallback(() => {
    if (!originalCanvasRef.current || !simulatedCanvasRef.current) return;
    applyColorBlindnessToCanvas(originalCanvasRef.current, simulatedCanvasRef.current, selectedType);
  }, [selectedType]);

  // Load image and apply simulation
  useEffect(() => {
    if (!imageSource || !originalCanvasRef.current) return;

    loadImageToCanvas(imageSource, originalCanvasRef.current)
      .then(() => {
        setIsLoaded(true);
        applySimulation();
      })
      .catch(() => {
        setImageSource(null);
        setLoadError('Couldn\'t load that image. Try a different file.');
      });
  }, [imageSource, applySimulation]);

  // Apply simulation when type changes
  useEffect(() => {
    if (isLoaded) {
      applySimulation();
    }
  }, [isLoaded, applySimulation]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLoadError(null);
      setIsLoaded(false);
      setImageSource(file);
    } else if (file) {
      setLoadError('That file isn\'t an image. Try a PNG, JPG, or GIF.');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setLoadError(null);
      setIsLoaded(false);
      setImageSource(file);
    } else if (file) {
      setLoadError('That file isn\'t an image. Try a PNG, JPG, or GIF.');
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Sample colors for demonstration
  const sampleColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'];

  const selectedTypeInfo = colorBlindnessTypes.find(t => t.type === selectedType);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      {/* Hero section - Compact on mobile */}
      <div className="mb-8 sm:mb-12">
        <p className="label-caps text-ink-3 mb-4">Vision Simulator</p>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-[-0.035em] text-ink mb-3 leading-[0.98]">
          Color Blindness Simulator
        </h1>
        <p className="text-base text-ink-2 max-w-xl leading-relaxed">
          Visualize how your designs appear to people with different types of color vision deficiency.
        </p>
      </div>

      {/* Image upload and comparison */}
      <div className="grid gap-4 sm:gap-8 lg:grid-cols-2 mb-4 sm:mb-8">
        {/* Upload area */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle as="h2" className="text-base sm:text-xl">Original Image</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Upload an image to see the simulation</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
            {loadError && (
              <div className="mb-3 sm:mb-4 rounded-lg border border-negative/25 bg-negative/10 px-3 py-2.5 text-negative text-sm">
                {loadError}
              </div>
            )}
            {!imageSource ? (
              <div
                role="button"
                tabIndex={0}
                aria-label="Upload an image to simulate color vision deficiency"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-line-strong bg-surface p-4 sm:p-8 transition-all hover:border-line-strong hover:bg-surface-2 active:scale-[0.99]"
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface-2 flex items-center justify-center mb-2 sm:mb-4">
                  <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-ink-2" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-ink-2 text-center">
                  Drop an image or tap to upload
                </p>
                <p className="text-[10px] sm:text-xs text-ink-3 mt-1">PNG, JPG, GIF up to 10MB</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <canvas
                  ref={originalCanvasRef}
                  className="max-h-[250px] sm:max-h-[400px] max-w-full rounded-lg border border-line"
                  style={{ display: isLoaded ? 'block' : 'none' }}
                />
                {!isLoaded && (
                  <div className="flex h-32 sm:h-40 items-center justify-center">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-line-strong border-t-ink"></div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setImageSource(null);
                    setIsLoaded(false);
                    setLoadError(null);
                  }}
                  className="text-xs sm:text-sm font-medium text-ink hover:text-ink flex items-center gap-1"
                >
                  <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Upload different image
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Simulated view */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle as="h2" className="text-base sm:text-xl">Simulated View</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              How the image appears with {selectedTypeInfo?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
            {!imageSource ? (
              <div className="flex h-32 sm:h-40 items-center justify-center rounded-xl border-2 border-dashed border-line">
                <p className="text-xs sm:text-sm text-ink-3 text-center px-4">Upload an image to see simulation</p>
              </div>
            ) : (
              <canvas
                ref={simulatedCanvasRef}
                className="max-h-[250px] sm:max-h-[400px] max-w-full rounded-lg border border-line"
                style={{ display: isLoaded ? 'block' : 'none' }}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Type selector */}
      <Card className="mb-4 sm:mb-8">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle as="h2" className="text-base sm:text-xl">Select Vision Type</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Choose a type of color vision deficiency to simulate</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4">
            {colorBlindnessTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setSelectedType(type.type)}
                className={cn(
                  'rounded-xl border p-2.5 sm:p-4 text-left transition-all active:scale-[0.98]',
                  selectedType === type.type
                    ? 'border-ink bg-surface-2 shadow-sm '
                    : 'border-line hover:border-line-strong'
                )}
              >
                <div className="flex items-start justify-between mb-1 sm:mb-2">
                  <h3 className="font-semibold text-xs sm:text-base text-ink">{type.name}</h3>
                  {selectedType === type.type && (
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-ink" />
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-ink-3 mb-1 sm:mb-2 line-clamp-2">{type.description}</p>
                <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium text-ink bg-surface-2 px-1.5 sm:px-2 py-0.5 rounded-full">
                  <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {type.prevalence}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color palette preview */}
      <Card className="mb-4 sm:mb-8">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle as="h2" className="text-base sm:text-xl">Color Palette Preview</CardTitle>
          <CardDescription className="text-xs sm:text-sm">See how common colors appear with {selectedTypeInfo?.name}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0 space-y-4 sm:space-y-6">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-ink-2">Original Colors</p>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
                {sampleColors.map((color) => (
                  <div
                    key={color}
                    className="flex flex-col items-center gap-0.5 sm:gap-1"
                  >
                    <div
                      className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl shadow-sm ring-1 ring-black/5"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[8px] sm:text-xs font-mono text-ink-3">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-ink-2">Simulated ({selectedTypeInfo?.name})</p>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
                {sampleColors.map((color) => (
                  <div
                    key={color}
                    className="flex flex-col items-center gap-0.5 sm:gap-1"
                  >
                    <div
                      className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl shadow-sm ring-1 ring-black/5"
                      style={{ backgroundColor: simulateColorBlindnessHex(color, selectedType) }}
                    />
                    <span className="text-[8px] sm:text-xs font-mono text-ink-3">
                      {simulateColorBlindnessHex(color, selectedType).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Custom color tester */}
          <div className="pt-4 sm:pt-6 border-t border-line">
            <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-ink-2">Test Your Own Color</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  aria-label="Custom color"
                  className="h-10 w-10 sm:h-12 sm:w-12 cursor-pointer rounded-lg border border-line-strong p-1"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  aria-label="Custom color hex value"
                  className="h-8 sm:h-10 w-24 sm:w-28 rounded-lg border border-line-strong bg-surface px-2 sm:px-3 font-mono text-xs sm:text-sm text-ink"
                />
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-ink-2" />
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg ring-1 ring-black/10"
                  style={{ backgroundColor: simulateColorBlindnessHex(customColor, selectedType) }}
                />
                <div>
                  <p className="font-mono text-xs sm:text-sm text-ink">
                    {simulateColorBlindnessHex(customColor, selectedType).toUpperCase()}
                  </p>
                  <p className="text-[10px] sm:text-xs text-ink-3">As seen with {selectedTypeInfo?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safe Color Palettes */}
      <Card className="mb-4 sm:mb-8">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-ink-3" />
            <CardTitle as="h2" className="text-base sm:text-xl">Colorblind-Safe Palettes</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm">These color combinations work well for most types of color vision</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {safeColorPairs.map((pair) => (
              <div key={pair.name} className="p-2.5 sm:p-4 rounded-xl border border-line hover:border-line-strong transition-colors">
                <p className="text-xs sm:text-sm font-medium text-ink mb-2 sm:mb-3">{pair.name}</p>
                <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  {pair.colors.map((color, i) => (
                    <div key={i} className="flex-1">
                      <div
                        className="h-8 sm:h-10 rounded-lg ring-1 ring-black/10"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-[8px] sm:text-xs font-mono text-ink-3 mt-0.5 sm:mt-1 text-center truncate">{color}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-ink-3">
                  <span className="truncate">Simulated:</span>
                  <div className="flex gap-0.5 sm:gap-1">
                    {pair.colors.map((color, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded ring-1 ring-black/10"
                        style={{ backgroundColor: simulateColorBlindnessHex(color, selectedType) }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Design Tips */}
      <Card className="mb-4 sm:mb-8">
        <CardHeader className="p-3 sm:p-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-ink-3" />
            <CardTitle as="h2" className="text-base sm:text-xl">Design Tips for Accessibility</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm">Best practices for creating colorblind-friendly designs</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {designTips.map((tip, i) => (
              <div key={i} className="flex gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-xl bg-surface">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-surface-2 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <tip.icon className="h-4 w-4 sm:h-5 sm:w-5 text-ink" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-xs sm:text-base text-ink">{tip.title}</h3>
                  <p className="text-[10px] sm:text-sm text-ink-3 mt-0.5 sm:mt-1">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info section */}
      <Card>
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-start gap-2.5 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-surface-2 flex items-center justify-center flex-shrink-0">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-ink-2" />
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-sm sm:text-base text-ink mb-1 sm:mb-2">About Color Vision Deficiency</h2>
              <p className="text-xs sm:text-sm text-ink-3 mb-3 sm:mb-4">
                Color vision deficiency affects approximately 8% of men and 0.5% of women worldwide, which is over 300 million people.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="p-2 sm:p-3 rounded-lg bg-surface">
                  <h5 className="font-medium text-ink mb-0.5 sm:mb-1">Red-Green (Most Common)</h5>
                  <p className="text-ink-3 text-[10px] sm:text-sm">Protanopia, Deuteranopia affect red and green perception.</p>
                </div>
                <div className="p-2 sm:p-3 rounded-lg bg-surface">
                  <h5 className="font-medium text-ink mb-0.5 sm:mb-1">Blue-Yellow (Rare)</h5>
                  <p className="text-ink-3 text-[10px] sm:text-sm">Tritanopia affects blue and yellow perception.</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-line">
                <Link
                  href="/contrast-checker"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-ink active:scale-[0.98] transition-all"
                >
                  Check contrast ratios for accessibility
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics - Horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mt-6 sm:mt-10">
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 min-w-max sm:min-w-0">
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center p-3 sm:p-4 rounded-xl bg-surface border border-line shadow-sm min-w-[120px] sm:min-w-0">
              <p className="text-xl sm:text-3xl font-bold text-ink">{stat.value}</p>
              <p className="text-xs sm:text-sm font-medium text-ink">{stat.label}</p>
              <p className="text-[10px] sm:text-xs text-ink-3">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
