'use client';

import { useState, useMemo, useRef } from 'react';
import {
  namedColors,
  allPalettes,
  colorCategories,
  trendingColors,
  brandColors,
  type NamedColor,
  type ColorPalette
} from '@/lib/colorData';
import { CopyButton } from '@/components/ui/CopyButton';
import {
  Search,
  Grid3X3,
  List,
  Palette,
  Building2,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/* ── Color math (auto-contrast + format strings) ── */
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
function relLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const lin = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
const isLight = (hex: string) => relLuminance(hex) > 0.55;
const isVeryLight = (hex: string) => relLuminance(hex) > 0.82;
function rgbStr(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}
function hexToHsl(hex: string) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

type ViewMode = 'grid' | 'list';
type TabType = 'named' | 'palettes' | 'trending' | 'brands';

function ColorCard({ color, copied, onCopy }: { color: NamedColor; copied: boolean; onCopy: (hex: string) => void }) {
  const light = isLight(color.hex);
  const veryLight = isVeryLight(color.hex);
  const fg = light ? '#1c1c1e' : '#ffffff';
  // Both scrims below lift the label off the swatch; at these alphas the muted
  // line clears 4.5:1 on every colour in the set, which it did not at 0.62.
  const sub = light ? 'rgba(28,28,30,0.78)' : 'rgba(255,255,255,0.78)';

  return (
    <button
      onClick={() => onCopy(color.hex)}
      title={`Copy ${color.hex}`}
      aria-label={`Copy ${color.name} ${color.hex}`}
      style={{ backgroundColor: color.hex, color: fg }}
      className={cn(
        'group relative block aspect-[5/4] w-full overflow-hidden rounded-[14px] text-left',
        'shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-200',
        'hover:-translate-y-1 hover:z-[2] hover:shadow-[0_12px_28px_rgba(0,0,0,0.16)]',
        veryLight && 'ring-1 ring-inset ring-line-strong',
        light && !veryLight && 'ring-1 ring-inset ring-line',
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%]"
        style={{
          background: light
            ? 'linear-gradient(transparent, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.5))'
            : 'linear-gradient(transparent, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.5))',
        }}
      />

      <span
        className="absolute left-[15px] right-[15px] top-[13px] flex flex-col gap-0.5 font-mono text-[11px] font-medium opacity-0 -translate-y-1 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ color: sub }}
      >
        <span className="whitespace-nowrap">{rgbStr(color.hex)}</span>
        <span className="whitespace-nowrap">{hexToHsl(color.hex)}</span>
      </span>

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-[3px] px-[15px] py-[14px]">
        <span className="text-[15.5px] font-bold leading-[1.15] tracking-[-0.01em]">{color.name}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px] font-medium uppercase" style={{ color: sub }}>
          {copied ? (
            <span className="inline-flex items-center gap-1 font-sans text-[12.5px] font-bold" style={{ color: fg }}>
              <Check className="h-3 w-3" strokeWidth={2.5} /> Copied
            </span>
          ) : (
            <>
              {color.hex}
              <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-80" />
            </>
          )}
        </span>
      </span>
    </button>
  );
}

function ColorRow({ color, copied, onCopy }: { color: NamedColor; copied: boolean; onCopy: (hex: string) => void }) {
  return (
    <button
      onClick={() => onCopy(color.hex)}
      aria-label={`Copy ${color.name} ${color.hex}`}
      className="grid h-[60px] w-full items-center gap-4 border-b border-line px-[18px] text-left transition-colors last:border-b-0 hover:bg-surface-2 [grid-template-columns:44px_1.4fr_1fr_72px] md:[grid-template-columns:56px_1.6fr_1fr_1.3fr_1.3fr_80px]"
    >
      <span className="h-[38px] w-[38px] rounded-[9px] ring-1 ring-inset ring-line" style={{ background: color.hex }} />
      <span className="truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">{color.name}</span>
      <span className="font-mono text-[13px] uppercase text-ink-2">{color.hex}</span>
      <span className="hidden font-mono text-[13px] uppercase text-ink-2 md:block">{rgbStr(color.hex)}</span>
      <span className="hidden font-mono text-[13px] uppercase text-ink-2 md:block">{hexToHsl(color.hex)}</span>
      <span className={cn('justify-self-end text-[13px] font-semibold', copied ? 'text-positive' : 'text-ink-3')}>
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
}

function PaletteCard({ palette, expanded, onToggle }: { palette: ColorPalette; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-surface  border border-line rounded-xl overflow-hidden">
      <div 
        className="cursor-pointer hover:bg-surface-2 active:bg-surface-2 transition-colors p-3 sm:p-4"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-grow">
            <h2 className="text-base sm:text-lg font-semibold text-ink truncate">{palette.name}</h2>
            <p className="text-xs sm:text-sm text-ink-2 mt-0.5 sm:mt-1 line-clamp-1">
              {palette.description}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex -space-x-1">
              {palette.colors.slice(0, 5).map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-ink shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {palette.colors.length > 5 && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-ink bg-surface-2 flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs text-ink-2">+{palette.colors.length - 5}</span>
                </div>
              )}
            </div>
            {expanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-ink-3" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-ink-3" />}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="p-3 sm:p-4 pt-0 border-t border-line mt-0">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2 pt-3 sm:pt-4">
            {palette.colors.map((color, index) => {
              const isLight = isLightColor(color.hex);
              return (
                <div key={index} className="group relative">
                  <div 
                    className="h-12 sm:h-16 rounded-lg flex flex-col items-center justify-center p-0.5 sm:p-1 relative overflow-hidden ring-1 ring-line"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className={`text-[8px] sm:text-[10px] font-medium text-center leading-tight truncate w-full px-0.5 ${isLight ? 'text-black/80' : 'text-white'}`}>
                      {color.name}
                    </span>
                    {color.shade && (
                      <span className={`text-[8px] sm:text-[10px] ${isLight ? 'text-black/55' : 'text-white/75'}`}>
                        {color.shade}
                      </span>
                    )}
                    <div className="absolute top-0.5 right-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <CopyButton
                        text={color.hex}
                        label={`${color.name} ${color.hex.toUpperCase()}`}
                        showLabel={false}
                        className={`!p-0.5 sm:!p-1 ${isLight ? 'text-black/80 hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
                      />
                    </div>
                  </div>
                  <p className="text-[8px] sm:text-[10px] text-center mt-0.5 sm:mt-1 font-mono text-ink-3 truncate">
                    {color.hex.toUpperCase()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TrendingColorCard({ color }: { color: typeof trendingColors[0] }) {
  const isLight = isLightColor(color.hex);
  
  return (
    <div className="group relative rounded-xl overflow-hidden bg-surface  border border-line hover:border-line-strong active:scale-[0.98] sm:hover:scale-[1.02] transition-all">
      <div 
        className="h-24 sm:h-28 flex flex-col items-center justify-center p-3 sm:p-4 relative"
        style={{ backgroundColor: color.hex }}
      >
        <span className={`font-semibold text-sm sm:text-base text-center ${isLight ? 'text-black/80' : 'text-white'}`}>
          {color.name}
        </span>
        {color.year && (
          <span className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${isLight ? 'text-black/55' : 'text-white/80'}`}>
            {color.year}
          </span>
        )}
        <div className="absolute top-2 right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <CopyButton
            text={color.hex}
            label={`${color.name} ${color.hex.toUpperCase()}`}
            showLabel={false}
            className={`!p-1.5 ${isLight ? 'text-black/80 hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
          />
        </div>
      </div>
      <div className="bg-surface p-2.5 sm:p-3">
        <p className="text-[10px] sm:text-xs text-ink-2 mb-1.5 sm:mb-2 line-clamp-2">{color.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs sm:text-sm text-ink-2">
            {color.hex.toUpperCase()}
          </span>
          <Link 
            href={`/color-generator?color=${encodeURIComponent(color.hex.slice(1))}`}
            className="text-xs text-ink hover:text-ink flex items-center gap-1 p-1 -m-1"
          >
            <span className="hidden sm:inline">Explore</span> <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function BrandColorCard({ brand }: { brand: typeof brandColors[0] }) {
  return (
    <div className="bg-surface  border border-line rounded-xl overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-line">
        <h2 className="text-base sm:text-lg font-semibold text-ink flex items-center gap-2">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-ink-2" />
          {brand.brand}
        </h2>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {brand.colors.map((color, index) => {
            const isLight = isLightColor(color.hex);
            return (
              <div key={index} className="group relative">
                <div 
                  className="h-12 w-16 sm:h-14 sm:w-20 rounded-lg flex items-center justify-center relative overflow-hidden ring-1 ring-line"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`text-[10px] sm:text-xs font-medium truncate px-1 ${isLight ? 'text-black/80' : 'text-white'}`}>
                    {color.name}
                  </span>
                  <div className="absolute top-0.5 right-0.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <CopyButton
                      text={color.hex}
                      label={`${color.name} ${color.hex.toUpperCase()}`}
                      showLabel={false}
                      className={`!p-0.5 sm:!p-1 ${isLight ? 'text-black/80 hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
                    />
                  </div>
                </div>
                <p className="text-[8px] sm:text-xs text-center mt-0.5 sm:mt-1 font-mono text-ink-3">
                  {color.hex.toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export default function BrowseColorsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('named');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [expandedPalettes, setExpandedPalettes] = useState<Set<string>>(new Set(['Tailwind CSS']));
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopiedHex(null), 1500);
  };

  const filteredColors = useMemo(() => {
    let colors = namedColors;
    
    if (selectedCategory !== 'all') {
      colors = colors.filter(c => c.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      colors = colors.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.hex.toLowerCase().includes(query)
      );
    }
    
    return colors;
  }, [searchQuery, selectedCategory]);

  const togglePalette = (name: string) => {
    setExpandedPalettes(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const tabs = [
    { id: 'named' as const, label: 'Named Colors', icon: Palette, count: namedColors.length },
    { id: 'palettes' as const, label: 'Palettes', icon: Grid3X3, count: allPalettes.length },
    { id: 'trending' as const, label: 'Trending', icon: TrendingUp, count: trendingColors.length },
    { id: 'brands' as const, label: 'Brand Colors', icon: Building2, count: brandColors.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-24">
      {/* Page head */}
      <div className="mb-8">
        <p className="label-caps text-ink-3 mb-2.5">Color Library</p>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-[-0.035em] text-ink mb-3 leading-[0.98]">
          Browse Colors
        </h1>
        <p className="text-lg text-ink-2 max-w-xl leading-snug">
          Named colors, curated palettes, and brand libraries. Click any swatch to copy its hex.
        </p>
      </div>

      {/* Tabs — segmented control */}
      <div className="-mx-4 mb-7 overflow-x-auto px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <div className="inline-flex gap-[3px] rounded-[13px] border border-line bg-surface-2 p-1">
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 whitespace-nowrap rounded-[9px] px-3.5 sm:px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition',
                  active ? 'bg-ink text-paper shadow-sm' : 'text-ink-2 hover:bg-line hover:text-ink',
                )}
              >
                <span>{tab.label}</span>
                {tab.id !== 'named' && (
                  <span className={cn(
                    'rounded-full px-[7px] py-px font-mono text-[11.5px] font-medium',
                    active ? 'bg-paper/20 text-paper/90' : 'bg-surface-2 text-ink-2',
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Named Colors */}
      {activeTab === 'named' && (
        <>
          {/* Controls: search + view toggle on one row */}
          <div className="mb-4 flex items-center gap-3 sm:gap-[14px]">
            <div className="relative flex flex-1 items-center">
              <Search className="pointer-events-none absolute left-4 h-[18px] w-[18px] text-ink-3" />
              <input
                type="text"
                placeholder="Search colors or hex…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[11px] border border-line-strong bg-surface py-[13px] pl-11 pr-10 text-[15.5px] text-ink outline-none transition placeholder:text-ink-3 focus:border-ink focus:shadow-[0_0_0_3px_var(--line)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 grid h-[22px] w-[22px] place-items-center rounded-full bg-line text-base leading-none text-ink-2 transition-colors hover:bg-line-strong"
                >
                  ×
                </button>
              )}
            </div>
            <div className="inline-flex flex-shrink-0 gap-0.5 rounded-[11px] border border-line-strong bg-surface p-[3px]">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                className={cn('grid h-[38px] w-[38px] place-items-center rounded-lg transition', viewMode === 'grid' ? 'bg-ink text-paper' : 'text-ink-3 hover:text-ink-2')}
              >
                <Grid3X3 className="h-[17px] w-[17px]" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                className={cn('grid h-[38px] w-[38px] place-items-center rounded-lg transition', viewMode === 'list' ? 'bg-ink text-paper' : 'text-ink-3 hover:text-ink-2')}
              >
                <List className="h-[17px] w-[17px]" />
              </button>
            </div>
          </div>

          {/* Category chips — subordinate to controls */}
          <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 scrollbar-hide">
            {colorCategories.map(category => {
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'inline-flex flex-shrink-0 items-center gap-[7px] rounded-full border px-[14px] py-[7px] text-[13.5px] font-medium transition',
                    active ? 'border-ink bg-ink text-paper' : 'border-line-strong text-ink-2 hover:border-ink-2 hover:text-ink',
                  )}
                >
                  {category.id !== 'all' && (
                    <span className="h-2 w-2 rounded-full" style={{ background: category.color, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)' }} />
                  )}
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Results bar */}
          <div className="mb-[18px] flex items-baseline gap-2">
            <span className="text-sm font-semibold text-ink-2">
              {filteredColors.length} {filteredColors.length === 1 ? 'color' : 'colors'}
            </span>
            {selectedCategory !== 'all' && (
              <span className="text-sm text-ink-3">in {colorCategories.find(c => c.id === selectedCategory)?.name}</span>
            )}
          </div>

          {filteredColors.length === 0 ? (
            <div className="py-12">
              <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-[14px] border border-dashed border-line-strong bg-surface px-8 py-14 text-center">
                <span className="text-[19px] font-bold text-ink">No colors found</span>
                <span className="max-w-sm text-[15px] leading-relaxed text-ink-2">Try a different search term or category.</span>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {filteredColors.map((color) => (
                <ColorCard key={color.name} color={color} copied={copiedHex === color.hex} onCopy={copy} />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-[14px] border border-line bg-surface">
              <div className="grid h-[42px] items-center gap-4 border-b border-line px-[18px] text-[11.5px] font-semibold uppercase tracking-[0.08em] text-ink-3 [grid-template-columns:44px_1.4fr_1fr_72px] md:[grid-template-columns:56px_1.6fr_1fr_1.3fr_1.3fr_80px]">
                <span /><span>Name</span><span>Hex</span><span className="hidden md:block">RGB</span><span className="hidden md:block">HSL</span><span />
              </div>
              {filteredColors.map((color) => (
                <ColorRow key={color.name} color={color} copied={copiedHex === color.hex} onCopy={copy} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Palettes Tab */}
      {activeTab === 'palettes' && (
        <div className="space-y-4">
          {allPalettes.map((palette) => (
            <PaletteCard 
              key={palette.name} 
              palette={palette}
              expanded={expandedPalettes.has(palette.name)}
              onToggle={() => togglePalette(palette.name)}
            />
          ))}
        </div>
      )}

      {/* Trending Tab */}
      {activeTab === 'trending' && (
        <div className="space-y-4 sm:space-y-8">
          <div className="text-center">
            <p className="label-caps text-ink-3 mb-3 sm:mb-4">Pantone colors &amp; trends</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
            {trendingColors.map((color, index) => (
              <TrendingColorCard key={index} color={color} />
            ))}
          </div>
        </div>
      )}

      {/* Brands Tab */}
      {activeTab === 'brands' && (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {brandColors.map((brand, index) => (
            <BrandColorCard key={index} brand={brand} />
          ))}
        </div>
      )}

      {/* Quick Action */}
      <div className="mt-8 sm:mt-12 text-center">
        <div className="bg-surface  border border-line rounded-xl sm:rounded-2xl p-4 sm:p-6 sm:inline-block">
          <p className="text-sm sm:text-base text-ink-2 mb-3 sm:mb-4">
            Can&apos;t find the color you&apos;re looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl border border-line text-ink-2 hover:text-ink hover:border-line-strong active:scale-[0.98] transition-all">
              <Palette className="w-4 h-4" />
              Pick from Image
            </Link>
            <Link href="/color-generator" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl bg-ink text-paper hover:bg-ink/90 active:scale-[0.98] transition-all">
              <Palette className="w-4 h-4" />
              Generate Custom
            </Link>
          </div>
        </div>
      </div>

      {/* Copy toast */}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed bottom-[30px] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-xl bg-ink py-[11px] pl-[13px] pr-[18px] text-paper shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all duration-200',
          copiedHex ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0',
        )}
      >
        <span className="h-[22px] w-[22px] rounded-md ring-1 ring-inset ring-paper/25" style={{ background: copiedHex || 'transparent' }} />
        <span className="text-[14.5px] font-medium">
          Copied <strong className="font-mono font-semibold uppercase">{copiedHex}</strong> to clipboard
        </span>
      </div>
    </div>
  );
}
