'use client';

import { useState, useCallback } from 'react';
import { Search, Lightbulb, Sparkles, Palette, ArrowRight, Info, Eye } from 'lucide-react';
import Link from 'next/link';
import { CopyButton } from '@/components/ui/CopyButton';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { rgbToFormats, isValidColor, parseColor, getComplementary, getTriadic, getAnalogous, getSplitComplementary, getTetradic, ColorFormats } from '@/lib/colorUtils';
import { cn } from '@/lib/utils';

// Color psychology and usage suggestions
function getColorMeaning(hsl: { h: number; s: number; l: number }): { mood: string; usage: string[]; industries: string[] } {
  const h = hsl.h;
  
  if (h >= 0 && h < 30) {
    return {
      mood: 'Energetic, Passionate, Urgent',
      usage: ['Call-to-action buttons', 'Sale announcements', 'Warning messages'],
      industries: ['Food & Beverage', 'Entertainment', 'Sports']
    };
  } else if (h >= 30 && h < 60) {
    return {
      mood: 'Warm, Friendly, Optimistic',
      usage: ['Accents', 'Highlights', 'Autumn themes'],
      industries: ['Construction', 'Food', 'Children\'s products']
    };
  } else if (h >= 60 && h < 90) {
    return {
      mood: 'Happy, Cheerful, Attention-grabbing',
      usage: ['Highlights', 'Warning signs', 'Promotional content'],
      industries: ['Retail', 'Entertainment', 'Transportation']
    };
  } else if (h >= 90 && h < 150) {
    return {
      mood: 'Natural, Growth, Balanced',
      usage: ['Environmental themes', 'Success messages', 'Health content'],
      industries: ['Health & Wellness', 'Finance', 'Environment']
    };
  } else if (h >= 150 && h < 210) {
    return {
      mood: 'Calm, Refreshing, Clean',
      usage: ['Backgrounds', 'Tech interfaces', 'Medical applications'],
      industries: ['Technology', 'Healthcare', 'Travel']
    };
  } else if (h >= 210 && h < 270) {
    return {
      mood: 'Professional, Trustworthy, Stable',
      usage: ['Corporate branding', 'Links', 'Information sections'],
      industries: ['Finance', 'Technology', 'Healthcare']
    };
  } else if (h >= 270 && h < 330) {
    return {
      mood: 'Creative, Luxurious, Mysterious',
      usage: ['Premium products', 'Creative industries', 'Beauty brands'],
      industries: ['Beauty', 'Luxury', 'Arts & Entertainment']
    };
  } else {
    return {
      mood: 'Romantic, Playful, Feminine',
      usage: ['Beauty products', 'Romance', 'Children\'s content'],
      industries: ['Beauty', 'Fashion', 'Weddings']
    };
  }
}

// Accessibility analysis
function getAccessibilityInfo(hex: string): { 
  contrastWhite: number; 
  contrastBlack: number; 
  textRecommendation: string;
  wcagWhite: string;
  wcagBlack: string;
} {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  
  const contrastWhite = (1.05) / (L + 0.05);
  const contrastBlack = (L + 0.05) / 0.05;
  
  const getWcag = (ratio: number) => {
    if (ratio >= 7) return 'AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA Large';
    return 'Fail';
  };
  
  return {
    contrastWhite: Math.round(contrastWhite * 100) / 100,
    contrastBlack: Math.round(contrastBlack * 100) / 100,
    textRecommendation: contrastWhite > contrastBlack ? 'Use white text' : 'Use black text',
    wcagWhite: getWcag(contrastWhite),
    wcagBlack: getWcag(contrastBlack)
  };
}

// Common color names suggestions
const popularColors = [
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Teal', value: '#008080' },
  { name: 'Indigo', value: '#4B0082' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'Slate', value: '#708090' },
  { name: 'Crimson', value: '#DC143C' },
];

export default function ColorLookupPage() {
  const [inputValue, setInputValue] = useState('');
  const [colorData, setColorData] = useState<ColorFormats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError('Please enter a color value');
      setColorData(null);
      return;
    }

    if (!isValidColor(trimmed)) {
      setError('Invalid color format. Try HEX (#FF5733), RGB (rgb(255, 87, 51)), or color names (red)');
      setColorData(null);
      return;
    }

    const parsed = parseColor(trimmed);
    if (parsed) {
      const rgb = parsed.toRgb();
      const formats = rgbToFormats(rgb.r, rgb.g, rgb.b, rgb.a);
      setColorData(formats);
      setError(null);
    }
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLookup();
    }
  };

  const handleQuickColor = (value: string) => {
    setInputValue(value);
    const parsed = parseColor(value);
    if (parsed) {
      const rgb = parsed.toRgb();
      const formats = rgbToFormats(rgb.r, rgb.g, rgb.b, rgb.a);
      setColorData(formats);
      setError(null);
    }
  };

  const complementary = colorData ? getComplementary(colorData.hex) : null;
  const triadic = colorData ? getTriadic(colorData.hex) : null;
  const analogous = colorData ? getAnalogous(colorData.hex) : null;
  const splitComp = colorData ? getSplitComplementary(colorData.hex) : null;
  const tetradic = colorData ? getTetradic(colorData.hex) : null;
  
  const colorMeaning = colorData ? getColorMeaning(colorData.hsl) : null;
  const accessibility = colorData ? getAccessibilityInfo(colorData.hex) : null;

  const isLightColor = colorData ? colorData.hsl.l > 50 : false;

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:py-8 sm:px-6 lg:px-8">
      {/* Hero section - Compact on mobile */}
      <div className="mb-8 sm:mb-12">
        <p className="label-caps text-ink-3 mb-4">Format Converter</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 leading-[0.98]">
          Color Lookup
        </h1>
        <p className="text-base text-ink-2 max-w-xl leading-relaxed">
          Enter any color code to instantly convert between formats.
        </p>
      </div>

      {/* Search input */}
      <div className="mx-auto mb-4 sm:mb-8 max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 sm:left-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-ink-3" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter color (e.g., #FF5733, coral)"
              className="h-12 sm:h-14 w-full rounded-xl border border-line bg-surface  pl-10 sm:pl-12 pr-4 text-sm sm:text-base text-ink placeholder:text-ink-3 focus:border-line-strong focus:outline-none focus:ring-1 focus:ring-ink"
            />
          </div>
          <button
            onClick={handleLookup}
            className="w-full sm:w-auto rounded-xl bg-ink px-6 sm:px-8 py-3 font-semibold text-sm sm:text-base text-paper transition-all hover:bg-ink/90 active:scale-[0.98] shadow-lg "
          >
            Lookup
          </button>
        </div>
        {error && (
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-red-400 flex items-center gap-1.5 sm:gap-2">
            <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
            {error}
          </p>
        )}
        
        {/* Quick color suggestions */}
        {!colorData && (
          <div className="mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-ink-3 mb-2 sm:mb-3">Try these popular colors:</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {popularColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleQuickColor(color.value)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-line hover:border-line active:scale-[0.98] transition-all bg-surface"
                >
                  <span 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ring-1 ring-line"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs sm:text-sm text-ink-2">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {colorData && (
        <div className="space-y-4 sm:space-y-6">
          {/* Main color display */}
          <div className="bg-surface  border border-line rounded-xl sm:rounded-2xl overflow-hidden">
            <div
              className="h-28 sm:h-40 w-full relative overflow-hidden"
              style={{ backgroundColor: colorData.hex }}
            >
              <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center",
                isLightColor ? "text-gray-900" : "text-white"
              )}>
                {colorData.name && (
                  <h2 className="text-lg sm:text-2xl font-bold capitalize mb-0.5 sm:mb-1">
                    {colorData.name}
                  </h2>
                )}
                <p className={cn(
                  "font-mono text-sm sm:text-lg",
                  isLightColor ? "text-black/55" : "text-white/80"
                )}>
                  {colorData.hex.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              {/* Color formats grid */}
              <div className="grid gap-1.5 sm:gap-2 grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'HEX', value: colorData.hex },
                  { label: 'RGB', value: colorData.rgbString },
                  { label: 'HSL', value: colorData.hslString },
                  { label: 'HSV', value: colorData.hsvString },
                ].map((format) => (
                  <div
                    key={format.label}
                    className="flex items-center justify-between rounded-lg bg-surface border border-line px-2.5 sm:px-3 py-1.5 sm:py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[8px] sm:text-[10px] font-semibold uppercase text-ink-3">
                        {format.label}
                      </span>
                      <p className="font-mono text-[10px] sm:text-xs text-ink truncate">
                        {format.value}
                      </p>
                    </div>
                    <CopyButton text={format.value} showLabel={false} className="!p-1.5 sm:!p-2" />
                  </div>
                ))}
              </div>

              {/* Link to generator */}
              <Link 
                href={`/color-generator?color=${encodeURIComponent(colorData.hex.slice(1))}`}
                className="flex items-center justify-between w-full p-2.5 sm:p-3 mt-2 sm:mt-3 rounded-xl bg-surface-2 border border-line hover:bg-surface-2 active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-2 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ink" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-ink">Explore in Generator</p>
                    <p className="text-[10px] sm:text-xs text-ink">Shades, tints, harmonies</p>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ink group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Color Psychology & Accessibility */}
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
            {/* Color Psychology */}
            {colorMeaning && (
              <div className="bg-surface  border border-line rounded-xl sm:rounded-2xl p-3 sm:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-paper">Color Psychology</h3>
                    <p className="text-[10px] sm:text-xs text-ink-3">How this color is perceived</p>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-semibold uppercase text-ink-3 mb-0.5 sm:mb-1">Mood & Feel</p>
                    <p className="text-xs sm:text-sm text-ink">{colorMeaning.mood}</p>
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-semibold uppercase text-ink-3 mb-1 sm:mb-2">Best Used For</p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {colorMeaning.usage.map((use, i) => (
                        <span key={i} className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-surface-2 border border-line text-ink-2">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] font-semibold uppercase text-ink-3 mb-1 sm:mb-2">Popular Industries</p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {colorMeaning.industries.map((ind, i) => (
                        <span key={i} className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-surface-2 border border-line text-ink">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accessibility */}
            {accessibility && (
              <div className="bg-surface  border border-line rounded-xl sm:rounded-2xl p-3 sm:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-paper">Accessibility</h3>
                    <p className="text-[10px] sm:text-xs text-ink-3">WCAG contrast check</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 rounded-lg bg-surface border border-line">
                    <p className="text-xs sm:text-sm text-ink">
                      {accessibility.textRecommendation}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="p-2 sm:p-3 rounded-lg bg-surface border border-line">
                      <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                        <span className="text-[8px] sm:text-[10px] font-medium text-ink-3">White Text</span>
                        <span className={cn(
                          "text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded",
                          accessibility.wcagWhite === 'AAA' && 'bg-green-500/20 text-green-400',
                          accessibility.wcagWhite === 'AA' && 'bg-green-500/20 text-green-400',
                          accessibility.wcagWhite === 'AA Large' && 'bg-yellow-500/20 text-yellow-400',
                          accessibility.wcagWhite === 'Fail' && 'bg-red-500/20 text-red-400'
                        )}>
                          {accessibility.wcagWhite}
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-ink">
                        {accessibility.contrastWhite}:1
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-lg bg-surface border border-line">
                      <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                        <span className="text-[8px] sm:text-[10px] font-medium text-ink-3">Black Text</span>
                        <span className={cn(
                          "text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded",
                          accessibility.wcagBlack === 'AAA' && 'bg-green-500/20 text-green-400',
                          accessibility.wcagBlack === 'AA' && 'bg-green-500/20 text-green-400',
                          accessibility.wcagBlack === 'AA Large' && 'bg-yellow-500/20 text-yellow-400',
                          accessibility.wcagBlack === 'Fail' && 'bg-red-500/20 text-red-400'
                        )}>
                          {accessibility.wcagBlack}
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-ink">
                        {accessibility.contrastBlack}:1
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Color harmonies */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-ink mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
              <Palette className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-ink" />
              Color Harmonies
            </h3>
            <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-3">
              {/* Complementary */}
              <div className="bg-surface  border border-line rounded-lg sm:rounded-xl p-2.5 sm:p-4 hover:border-line-strong transition-colors">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-xs sm:text-sm font-medium text-ink">Complementary</h4>
                  <p className="text-[10px] sm:text-xs text-ink-3">Opposite on wheel</p>
                </div>
                <ColorSwatch color={complementary!} size="lg" showCopy />
              </div>

              {/* Triadic */}
              <div className="bg-surface  border border-line rounded-lg sm:rounded-xl p-2.5 sm:p-4 hover:border-line-strong transition-colors">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-xs sm:text-sm font-medium text-ink">Triadic</h4>
                  <p className="text-[10px] sm:text-xs text-ink-3">Three evenly spaced</p>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  {triadic?.map((color, i) => (
                    <ColorSwatch key={i} color={color} size="md" showCopy />
                  ))}
                </div>
              </div>

              {/* Analogous */}
              <div className="bg-surface  border border-line rounded-lg sm:rounded-xl p-2.5 sm:p-4 hover:border-line-strong transition-colors">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-xs sm:text-sm font-medium text-ink">Analogous</h4>
                  <p className="text-[10px] sm:text-xs text-ink-3">Adjacent colors</p>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  {analogous?.map((color, i) => (
                    <ColorSwatch key={i} color={color} size="md" showCopy />
                  ))}
                </div>
              </div>

              {/* Split Complementary */}
              <div className="bg-surface  border border-line rounded-lg sm:rounded-xl p-2.5 sm:p-4 hover:border-line-strong transition-colors">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-xs sm:text-sm font-medium text-ink">Split Comp.</h4>
                  <p className="text-[10px] sm:text-xs text-ink-3">Adjacent to complement</p>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  {splitComp?.map((color, i) => (
                    <ColorSwatch key={i} color={color} size="md" showCopy />
                  ))}
                </div>
              </div>

              {/* Tetradic */}
              <div className="bg-surface  border border-line rounded-lg sm:rounded-xl p-2.5 sm:p-4 hover:border-line-strong transition-colors col-span-2 lg:col-span-1">
                <div className="mb-2 sm:mb-3">
                  <h4 className="text-xs sm:text-sm font-medium text-ink">Tetradic</h4>
                  <p className="text-[10px] sm:text-xs text-ink-3">Four in rectangle</p>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  {tetradic?.map((color, i) => (
                    <ColorSwatch key={i} color={color} size="sm" showCopy />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
