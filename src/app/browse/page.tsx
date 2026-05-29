'use client';

import { useState, useMemo } from 'react';
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
  Sparkles, 
  Building2,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

type ViewMode = 'grid' | 'list';
type TabType = 'named' | 'palettes' | 'trending' | 'brands';

function ColorCard({ color }: { color: NamedColor }) {
  const isLight = isLightColor(color.hex);
  
  return (
    <div className="group relative rounded-xl overflow-hidden bg-surface  border border-line hover:border-line-strong active:scale-[0.98] sm:hover:scale-[1.02] transition-all duration-200">
      <div 
        className="h-16 sm:h-20 flex items-end justify-between p-2"
        style={{ backgroundColor: color.hex }}
      >
        <span 
          className={`text-[10px] sm:text-xs font-medium truncate max-w-[70%] ${isLight ? 'text-black/80' : 'text-white'}`}
        >
          {color.name}
        </span>
        <CopyButton 
          text={color.hex} 
          className={`sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ${isLight ? 'text-black/80 hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
        />
      </div>
      <div className="bg-surface p-1.5 sm:p-2 flex justify-between items-center">
        <span className="text-[10px] sm:text-xs font-mono text-ink-2">
          {color.hex.toUpperCase()}
        </span>
        <Link 
          href={`/color-generator?color=${encodeURIComponent(color.hex.slice(1))}`}
          className="text-ink hover:text-ink p-1 -m-1"
        >
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

function ColorListItem({ color }: { color: NamedColor }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 bg-surface  border border-line rounded-xl hover:border-line-strong active:scale-[0.99] transition-all">
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-inner flex-shrink-0 ring-1 ring-line"
        style={{ backgroundColor: color.hex }}
      />
      <div className="flex-grow min-w-0">
        <p className="font-medium text-sm sm:text-base text-ink truncate">{color.name}</p>
        <p className="text-xs sm:text-sm text-ink-3 capitalize">{color.category}</p>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <span className="font-mono text-xs sm:text-sm text-ink-2 hidden xs:block">
          {color.hex.toUpperCase()}
        </span>
        <CopyButton text={color.hex} className="!p-1.5 sm:!p-2" />
        <Link 
          href={`/color-generator?color=${encodeURIComponent(color.hex.slice(1))}`}
          className="p-1.5 sm:p-2 text-ink hover:text-ink hover:bg-surface-2 rounded-lg"
        >
          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>
    </div>
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
            <h3 className="text-base sm:text-lg font-semibold text-ink truncate">{palette.name}</h3>
            <p className="text-xs sm:text-sm text-ink-2 mt-0.5 sm:mt-1 line-clamp-1">
              {palette.description}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex -space-x-1">
              {palette.colors.slice(0, 5).map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-900 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
              {palette.colors.length > 5 && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-900 bg-surface-2 flex items-center justify-center">
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
        <h3 className="text-base sm:text-lg font-semibold text-ink flex items-center gap-2">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-ink-2" />
          {brand.brand}
        </h3>
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
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header - Compact on mobile */}
      <div className="mb-8 sm:mb-12">
        <p className="label-caps text-ink-3 mb-4">Color Library</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-3 leading-[0.98]">
          Browse Colors
        </h1>
        <p className="text-base text-ink-2 max-w-xl">
          Explore a curated collection of named colors and palettes.
        </p>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
              activeTab === tab.id
                ? 'bg-ink text-paper shadow-lg '
                : 'bg-surface text-ink-2 hover:text-ink border border-line'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.id === 'named' ? 'Named' : tab.id === 'palettes' ? 'Palettes' : tab.id === 'trending' ? 'Trending' : 'Brands'}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
              activeTab === tab.id
                ? 'bg-surface-2'
                : 'bg-surface-2 text-ink-3'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Named Colors Tab */}
      {activeTab === 'named' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Filters - Stack on mobile */}
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3" />
              <input
                type="text"
                placeholder="Search colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 h-10 pl-9 pr-4 rounded-xl bg-surface border border-line text-sm text-ink placeholder:text-ink-3 focus:border-line-strong focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2 self-end">
              <div className="flex bg-surface border border-line rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-ink text-paper' : 'text-ink-2 hover:text-ink'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-ink text-paper' : 'text-ink-2 hover:text-ink'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Pills - Scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            {colorCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-[0.98] ${
                  selectedCategory === category.id
                    ? 'bg-ink text-paper'
                    : 'bg-surface border border-line text-ink-2 hover:text-ink'
                }`}
              >
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs sm:text-sm text-ink-3">
            {filteredColors.length} color{filteredColors.length !== 1 ? 's' : ''}
          </p>

          {/* Colors Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredColors.map((color, index) => (
                <ColorCard key={index} color={color} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredColors.map((color, index) => (
                <ColorListItem key={index} color={color} />
              ))}
            </div>
          )}

          {filteredColors.length === 0 && (
            <div className="text-center py-12">
              <Palette className="w-16 h-16 mx-auto text-ink-2 mb-4" />
              <p className="text-ink-3">No colors found matching your search.</p>
            </div>
          )}
        </div>
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
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-surface-2 border border-line rounded-full mb-3 sm:mb-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
              <span className="text-xs sm:text-sm font-medium text-ink">
                Pantone Colors & Trends
              </span>
            </div>
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
              <Sparkles className="w-4 h-4" />
              Generate Custom
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
