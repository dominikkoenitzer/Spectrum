'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  RefreshCw, ChevronDown, ChevronRight, Eye, Lightbulb, Thermometer, Sparkles,
  Heart, Palette, Sun, Moon, Zap, Copy, Check,
} from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { isValidColor } from '@/lib/colorUtils';
import { checkContrast } from '@/lib/contrastUtils';
import { colorBlindnessTypes, simulateColorBlindnessHex } from '@/lib/colorBlindness';
import {
  getExtendedFormats,
  generateShades,
  generateTints,
  getAllHarmonies,
  getTechnicalFormats,
  analyzeColor,
  getCreativeAspects,
  ExtendedColorFormats,
  ColorVariation,
  ColorHarmony,
  TechnicalFormats,
  ColorAnalysis,
  CreativeAspects,
} from '@/lib/advancedColorUtils';
import { cn } from '@/lib/utils';

function getHueLabel(h: number): string {
  if (h < 15 || h >= 345) return 'Red';
  if (h < 45) return 'Orange';
  if (h < 75) return 'Yellow';
  if (h < 150) return 'Green';
  if (h < 195) return 'Cyan';
  if (h < 255) return 'Blue';
  if (h < 285) return 'Indigo';
  if (h < 315) return 'Violet';
  return 'Pink';
}

function getTemperatureLabel(h: number): { label: string; detail: string } {
  if (h >= 0 && h <= 60) return { label: 'Warm', detail: 'Advances visually — energetic, inviting, urgent' };
  if (h > 60 && h <= 90) return { label: 'Neutral-Warm', detail: 'Sits between warmth and neutrality' };
  if (h > 90 && h <= 150) return { label: 'Neutral-Cool', detail: 'Calm with a hint of organic warmth' };
  if (h > 150 && h <= 270) return { label: 'Cool', detail: 'Recedes visually — calm, trustworthy, distant' };
  if (h > 270 && h <= 330) return { label: 'Cool-Warm', detail: 'The bridge between cool and warm — creative tension' };
  return { label: 'Warm', detail: 'Advances visually — energetic, inviting, urgent' };
}

function getHarmonyExplanation(name: string): string {
  const map: Record<string, string> = {
    'Complement': 'Opposite hues cancel each other out in mixing but amplify each other visually. Maximum contrast, maximum vibrancy — each colour makes the other look more intense.',
    'Split-complementary': 'Takes the tension of a complement and softens it. Instead of one stark opposite, you get two neighbours of that opposite — same contrast range, far easier to balance.',
    'Triadic': 'Three equidistant hues at 120° each. All three pull equal visual weight, so they need careful managing — pick a dominant, a secondary, and an accent or everything fights.',
    'Analogous': 'Adjacent hues share similar wavelengths, so they feel naturally unified. Sunsets work this way. Great for backgrounds and gradients; lacks inherent contrast without a focal accent.',
    'Monochromatic': 'One hue across its full tonal range. The safest palette — always cohesive, never clashing. The risk is monotony; solve it with dramatic value steps.',
    'Tetradic': 'Two complementary pairs at 90°. Rich and complex — the most colours to work with, the hardest to keep from feeling chaotic. One dominant, others supporting.',
  };
  return map[name] ?? '';
}

type Section = 'theory' | 'conversion' | 'variations' | 'harmonies' | 'contrast' | 'technical' | 'analysis' | 'blindness' | 'creative';

export default function ColorGeneratorPage() {
  const searchParams = useSearchParams();
  const urlColor = searchParams.get('color');
  const initialColor = urlColor && isValidColor(`#${urlColor}`) ? `#${urlColor}` : '#2596be';

  const [color, setColor] = useState(initialColor);
  const [inputValue, setInputValue] = useState(initialColor);
  const [formats, setFormats] = useState<ExtendedColorFormats | null>(null);
  const [shades, setShades] = useState<ColorVariation[]>([]);
  const [tints, setTints] = useState<ColorVariation[]>([]);
  const [harmonies, setHarmonies] = useState<ColorHarmony[]>([]);
  const [technicalFormats, setTechnicalFormats] = useState<TechnicalFormats | null>(null);
  const [analysis, setAnalysis] = useState<ColorAnalysis | null>(null);
  const [creative, setCreative] = useState<CreativeAspects | null>(null);
  const [contrastBg, setContrastBg] = useState('#ffffff');
  const [expandedSections, setExpandedSections] = useState<Set<Section>>(
    new Set(['theory', 'harmonies', 'variations', 'creative'])
  );

  const updateColor = useCallback((newColor: string) => {
    if (!isValidColor(newColor)) return;
    setColor(newColor);
    setFormats(getExtendedFormats(newColor));
    setShades(generateShades(newColor));
    setTints(generateTints(newColor));
    setHarmonies(getAllHarmonies(newColor));
    setTechnicalFormats(getTechnicalFormats(newColor));
    setAnalysis(analyzeColor(newColor));
    setCreative(getCreativeAspects(newColor));
  }, []);

  useEffect(() => { updateColor(initialColor); }, [initialColor]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (isValidColor(value)) updateColor(value);
  };

  const toggleSection = (section: Section) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  };

  const hueAngle = formats?.hsl.h ?? 0;
  const hueLabel = getHueLabel(hueAngle);
  const tempInfo = getTemperatureLabel(hueAngle);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">

      {/* Header */}
      <AnimateIn direction="up" delay={0}>
        <div className="mb-8 sm:mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Color Analysis
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">
            Color Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
            Palettes, harmonies, formats, and colour theory — all from a single hue.
          </p>
        </div>
      </AnimateIn>

      {/* Color Input */}
      <AnimateIn direction="up" delay={80}>
      <div className="bg-white/[0.03] backdrop-blur border border-white/[0.07] rounded-2xl mb-5 overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center">
            {/* Swatch */}
            <div
              className="h-24 sm:h-28 w-full rounded-xl shadow-2xl lg:h-36 lg:w-44 flex-shrink-0 ring-1 ring-white/10 transition-colors duration-300"
              style={{ backgroundColor: color }}
            />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={e => { setInputValue(e.target.value); updateColor(e.target.value); }}
                  className="h-11 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent flex-shrink-0"
                />
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => handleInputChange(e.target.value)}
                    placeholder="#2596be"
                    className="h-11 w-full rounded-lg border border-white/10 bg-black/20 px-4 font-mono text-sm text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all outline-none"
                  />
                  {formats?.name && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hidden sm:block truncate max-w-24">
                      {formats.name}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    const r = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                    setInputValue(r);
                    updateColor(r);
                  }}
                  className="h-11 flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 text-sm font-medium text-white hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Random</span>
                </button>
              </div>

              {/* Quick copy row */}
              {formats && (
                <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
                  {[
                    { label: 'HEX', value: formats.hex },
                    { label: 'RGB', value: formats.rgbString },
                    { label: 'HSL', value: formats.hslString },
                    { label: 'CMYK', value: formats.cmykString },
                  ].map(item => (
                    <div key={item.label} className="flex-shrink-0">
                      <CopyButton text={item.value} label={`${item.label}: ${item.value}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </AnimateIn>

      {/* Sections */}
      <div className="space-y-3">

        {/* ── Color Theory Panel ── */}
        <AnimateIn direction="up" delay={0}>
        <Section
          id="theory"
          title="Color Theory"
          description="Where this colour sits in the theory of colour"
          icon={<Lightbulb className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('theory')}
          onToggle={() => toggleSection('theory')}
        >
          {formats && analysis && (
            <div className="space-y-4">
              {/* Top stat row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  label="Hue Family"
                  value={hueLabel}
                  sub={`${hueAngle}° on the wheel`}
                />
                <StatCard
                  label="Temperature"
                  value={tempInfo.label}
                  sub={tempInfo.detail}
                />
                <StatCard
                  label="Brightness"
                  value={`${analysis.perceivedBrightness}%`}
                  sub={analysis.isDark ? 'Perceived dark' : 'Perceived light'}
                />
                <StatCard
                  label="Chroma"
                  value={`${analysis.purity}%`}
                  sub={analysis.isSaturated ? 'Highly saturated' : analysis.isNeutral ? 'Near-neutral' : 'Mid saturation'}
                />
              </div>

              {/* Hue angle visualiser */}
              <div className="rounded-xl bg-black/20 border border-white/[0.06] p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Hue angle</span>
                  <span className="text-xs font-mono text-gray-500">{hueAngle}° / 360°</span>
                </div>
                <div className="relative h-3 rounded-full overflow-hidden"
                  style={{ background: 'linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444)' }}
                >
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-2 ring-white shadow-lg"
                    style={{ left: `calc(${(hueAngle / 360) * 100}% - 8px)`, backgroundColor: color }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-[10px] text-gray-600">
                  <span>Red 0°</span>
                  <span>Yellow 60°</span>
                  <span>Green 120°</span>
                  <span>Blue 240°</span>
                  <span>Red 360°</span>
                </div>
              </div>

              {/* Theory context paragraphs */}
              {creative && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-black/20 border border-white/[0.06] p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-3.5 w-3.5 text-pink-400" />
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Psychological profile</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">{creative.psychology}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {creative.emotions.map(e => (
                        <span key={e} className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">{e}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-black/20 border border-white/[0.06] p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-3.5 w-3.5 text-orange-400" />
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Visual weight &amp; depth</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      At {hueAngle}° and {analysis.perceivedBrightness}% perceived brightness, this colour{' '}
                      {analysis.isLight ? 'appears lighter than it may measure — our eyes weight brightness non-linearly' : 'reads as heavy and grounded'}.{' '}
                      {analysis.isWarm
                        ? 'Warm hues advance — they appear closer to the viewer and attract the eye first.'
                        : analysis.isCool
                        ? 'Cool hues recede — they push back spatially, making them ideal for backgrounds and supporting roles.'
                        : 'This neutral hue neither advances nor recedes — it balances without dominating.'}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      Dominant wavelength: <span className="text-gray-300 font-mono">{analysis.dominantWavelength}nm</span> — {analysis.wavelengthName}
                    </div>
                  </div>
                </div>
              )}

              {/* Design guidance */}
              {creative && (
                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Design guidance</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
                    {creative.useCases.map(u => (
                      <p key={u} className="text-sm text-gray-300 flex items-start gap-2">
                        <ChevronRight className="h-3.5 w-3.5 text-violet-400 flex-shrink-0 mt-0.5" />{u}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Section>
        </AnimateIn>

        {/* ── Harmonies ── */}
        <AnimateIn direction="up" delay={60}>
        <Section
          id="harmonies"
          title="Color Harmonies"
          description="Mathematically derived palette relationships"
          icon={<Palette className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('harmonies')}
          onToggle={() => toggleSection('harmonies')}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {harmonies.map(harmony => (
              <div key={harmony.name} className="rounded-xl bg-black/20 border border-white/[0.06] overflow-hidden group shimmer-hover card-lift">
                {/* Swatch strip */}
                <div className="flex h-14">
                  {harmony.colors.map((c, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-semibold text-white">{harmony.name}</h4>
                    <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded font-mono flex-shrink-0">{harmony.colors.length} colours</span>
                  </div>
                  {/* Theory explanation */}
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{getHarmonyExplanation(harmony.name)}</p>
                  <p className="text-[10px] text-violet-400 font-medium mb-3">Best for: {harmony.bestFor}</p>
                  {/* Swatches with hex */}
                  <div className="flex gap-2 flex-wrap">
                    {harmony.colors.map((c, i) => (
                      <HarmonyChip key={i} color={c} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
        </AnimateIn>

        {/* ── Shades & Tints ── */}
        <AnimateIn direction="up" delay={80}>
        <Section
          id="variations"
          title="Shades & Tints"
          description="The full tonal range from black to white"
          icon={<Sun className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('variations')}
          onToggle={() => toggleSection('variations')}
        >
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Moon className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Shades</span>
                <span className="text-xs text-gray-600">— black added in 10% steps</span>
              </div>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {shades.map(s => <VariationSwatch key={s.percentage} variation={s} />)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Tints</span>
                <span className="text-xs text-gray-600">— white added in 10% steps</span>
              </div>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {tints.map(t => <VariationSwatch key={t.percentage} variation={t} />)}
              </div>
            </div>
            <div className="rounded-xl bg-black/20 border border-white/[0.06] p-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-white font-medium">Shades</span> work for hover states, shadows, and depth. <span className="text-white font-medium">Tints</span> work for highlights, backgrounds, and disabled states. Keeping text on a tint of its background colour maintains harmony without sacrificing contrast.
              </p>
            </div>
          </div>
        </Section>
        </AnimateIn>

        {/* ── Creative & Psychology ── */}
        <AnimateIn direction="up" delay={100}>
        <Section
          id="creative"
          title="Psychology & Culture"
          description="Emotional impact, seasonal associations, and cultural meanings"
          icon={<Heart className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('creative')}
          onToggle={() => toggleSection('creative')}
        >
          {creative && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Mood */}
              <div className="rounded-xl bg-black/20 border border-white/[0.06] p-4 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-3.5 w-3.5 text-pink-400" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Mood</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{creative.mood}</p>
              </div>

              {/* Season */}
              <div className="rounded-xl bg-black/20 border border-white/[0.06] p-4">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Season</span>
                <p className="text-base font-semibold text-white mb-1">{creative.season}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{creative.seasonDescription}</p>
              </div>

              {/* Nature */}
              <div className="rounded-xl bg-black/20 border border-white/[0.06] p-4">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Found in nature</span>
                <div className="flex flex-wrap gap-1.5">
                  {creative.naturalExamples.map(e => (
                    <span key={e} className="px-2.5 py-1 rounded-lg text-xs text-gray-300 bg-white/5 border border-white/8">{e}</span>
                  ))}
                </div>
              </div>

              {/* Cultural meanings */}
              <div className="rounded-xl bg-black/20 border border-white/[0.06] p-4 sm:col-span-2 lg:col-span-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-3">Cultural meanings</span>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase font-semibold tracking-wider">Western</span>
                    <p className="text-sm text-gray-300 mt-0.5">{creative.westernMeaning}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 uppercase font-semibold tracking-wider">Eastern</span>
                    <p className="text-sm text-gray-300 mt-0.5">{creative.easternMeaning}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Section>
        </AnimateIn>

        {/* ── Contrast ── */}
        <AnimateIn direction="up" delay={120}>
        <Section
          id="contrast"
          title="Contrast & Accessibility"
          description="WCAG 2.1 compliance testing"
          icon={<Eye className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('contrast')}
          onToggle={() => toggleSection('contrast')}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                  Background colour
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={contrastBg}
                    onChange={e => setContrastBg(e.target.value)}
                    className="h-11 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={contrastBg}
                    onChange={e => isValidColor(e.target.value) && setContrastBg(e.target.value)}
                    className="h-11 flex-1 rounded-lg border border-white/10 bg-black/20 px-3 font-mono text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-white/10" style={{ backgroundColor: contrastBg }}>
                <p className="text-2xl font-bold mb-2" style={{ color }}>Sample Heading</p>
                <p className="text-sm" style={{ color }}>The quick brown fox jumps over the lazy dog.</p>
                <p className="text-xs mt-2" style={{ color }}>Small body text at 12px — the hardest to make accessible.</p>
              </div>
            </div>

            <div>
              {(() => {
                const result = checkContrast(color, contrastBg);
                const isGood = result.aa.normalText;
                return (
                  <div className="space-y-3">
                    <div className={cn(
                      'rounded-xl p-5 text-center border',
                      isGood ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
                    )}>
                      <div className={cn('text-5xl font-bold mb-1', isGood ? 'text-white' : 'text-gray-300')}>
                        {result.ratioString}
                      </div>
                      <div className={cn('text-xs font-semibold uppercase tracking-widest', isGood ? 'text-green-400' : 'text-red-400')}>
                        contrast ratio
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'AA — Normal text', sub: 'Requires 4.5:1', pass: result.aa.normalText },
                        { label: 'AA — Large text', sub: 'Requires 3:1', pass: result.aa.largeText },
                        { label: 'AAA — Normal text', sub: 'Requires 7:1', pass: result.aaa.normalText },
                        { label: 'AAA — Large text', sub: 'Requires 4.5:1', pass: result.aaa.largeText },
                      ].map(item => (
                        <div key={item.label} className={cn(
                          'rounded-lg p-3 border',
                          item.pass
                            ? 'bg-green-500/5 border-green-500/15'
                            : 'bg-red-500/5 border-red-500/15'
                        )}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-medium text-gray-300">{item.label}</span>
                            <span className={cn('text-sm font-bold', item.pass ? 'text-green-400' : 'text-red-400')}>
                              {item.pass ? '✓' : '✗'}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-600">{item.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </Section>
        </AnimateIn>

        {/* ── Color Formats ── */}
        <AnimateIn direction="up" delay={140}>
        <Section
          id="conversion"
          title="Color Formats"
          description="Every format for every workflow"
          icon={<Zap className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('conversion')}
          onToggle={() => toggleSection('conversion')}
        >
          {formats && (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'HEX', value: formats.hex, desc: 'Web standard' },
                { label: 'RGB', value: formats.rgbString, desc: 'Screen colour model' },
                { label: 'HSL', value: formats.hslString, desc: 'Hue / Saturation / Lightness' },
                { label: 'HSV', value: formats.hsvString, desc: 'Hue / Saturation / Value' },
                { label: 'HWB', value: formats.hwbString, desc: 'Hue / Whiteness / Blackness' },
                { label: 'CMYK', value: formats.cmykString, desc: 'Print colour model' },
                { label: 'LAB', value: formats.labString, desc: 'Perceptual colour space' },
                { label: 'LCH', value: formats.lchString, desc: 'Lightness / Chroma / Hue' },
                { label: 'XYZ', value: formats.xyzString, desc: 'CIE reference space' },
              ].map(format => (
                <div key={format.label} className="flex items-center justify-between rounded-xl bg-black/20 border border-white/[0.06] px-4 py-3 group shimmer-hover">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">{format.label}</span>
                    <p className="font-mono text-sm text-gray-100 truncate">{format.value}</p>
                    <p className="text-[10px] text-gray-600">{format.desc}</p>
                  </div>
                  <CopyButton text={format.value} />
                </div>
              ))}
            </div>
          )}
        </Section>
        </AnimateIn>

        {/* ── Vision Simulation ── */}
        <AnimateIn direction="up" delay={160}>
        <Section
          id="blindness"
          title="Vision Simulation"
          description="How this colour looks across 7 vision types"
          icon={<Eye className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('blindness')}
          onToggle={() => toggleSection('blindness')}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl overflow-hidden bg-black/20 border border-white/[0.06]">
              <div className="h-14" style={{ backgroundColor: color }} />
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-300">Original</p>
                <p className="font-mono text-[11px] text-gray-500 mt-0.5">{formats?.hex}</p>
              </div>
            </div>
            {colorBlindnessTypes.slice(0, 7).map(type => {
              const sim = simulateColorBlindnessHex(color, type.type);
              return (
                <div key={type.type} className="rounded-xl overflow-hidden bg-black/20 border border-white/[0.06]">
                  <div className="h-14" style={{ backgroundColor: sim }} />
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-300 truncate">{type.name}</p>
                    <p className="font-mono text-[11px] text-gray-500 mt-0.5">{sim.toUpperCase()}</p>
                    <p className="text-[10px] text-gray-600 truncate">{type.prevalence}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
        </AnimateIn>

        {/* ── Technical Formats ── */}
        <AnimateIn direction="up" delay={180}>
        <Section
          id="technical"
          title="Technical Formats"
          description="Low-level representations for dev & engineering"
          icon={<Zap className="h-4.5 w-4.5" />}
          expanded={expandedSections.has('technical')}
          onToggle={() => toggleSection('technical')}
        >
          {technicalFormats && (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'HSI', value: technicalFormats.hsiString, desc: 'Hue, Saturation, Intensity' },
                { label: 'YUV', value: technicalFormats.yuvString, desc: 'Video/Broadcast PAL' },
                { label: 'YCbCr', value: technicalFormats.ycbcrString, desc: 'Digital Video' },
                { label: 'Integer', value: technicalFormats.integerString, desc: 'Numeric representation' },
                { label: 'RGB Bytes', value: technicalFormats.rgbBytes, desc: 'Hex byte order' },
                { label: 'BGR Bytes', value: technicalFormats.bgrBytes, desc: 'Reversed byte order (OpenCV)' },
                { label: 'ARGB', value: technicalFormats.argbBytes, desc: 'With alpha channel' },
                { label: 'Binary', value: technicalFormats.binary, desc: '24-bit binary' },
                { label: 'Base64', value: technicalFormats.base64, desc: 'Encoded representation' },
              ].map(format => (
                <div key={format.label} className="flex items-center justify-between rounded-xl bg-black/20 border border-white/[0.06] px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">{format.label}</span>
                    <p className="font-mono text-sm text-gray-100 truncate">{format.value}</p>
                    <p className="text-[10px] text-gray-600">{format.desc}</p>
                  </div>
                  <CopyButton text={format.value} />
                </div>
              ))}
            </div>
          )}
        </Section>
        </AnimateIn>

      </div>
    </div>
  );
}

// ── Sub-components ──

function Section({
  id, title, description, icon, expanded, onToggle, children,
}: {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.025] backdrop-blur border border-white/[0.07] rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/15 text-violet-400 flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm sm:text-base">{title}</h3>
            <p className="text-xs text-gray-500 truncate">{description}</p>
          </div>
        </div>
        <div className={cn(
          'flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 flex-shrink-0 ml-3 transition-transform duration-200',
          expanded && 'rotate-180'
        )}>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </div>
      </button>
      {expanded && (
        <div className="border-t border-white/[0.05] px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-black/20 border border-white/[0.06] p-4 shimmer-hover card-lift">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-white leading-none mb-1">{value}</p>
      <p className="text-[11px] text-gray-500 leading-snug">{sub}</p>
    </div>
  );
}

function VariationSwatch({ variation }: { variation: ColorVariation }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(variation.hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
      className="group flex flex-col items-center flex-shrink-0 active:scale-95 transition-transform"
      title={variation.hex}
    >
      <div
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg ring-1 ring-white/10 transition-transform group-hover:scale-110"
        style={{ backgroundColor: variation.hex }}
      />
      <span className="mt-1 text-[10px] text-gray-600">{variation.percentage}%</span>
      <span className="font-mono text-[10px] text-gray-500 flex items-center justify-center">{copied ? <Check className="h-3 w-3 text-green-400" /> : variation.hex.slice(0, 7)}</span>
    </button>
  );
}

function HarmonyChip({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors active:scale-95 group"
      title={`Copy ${color}`}
    >
      <div className="w-4 h-4 rounded flex-shrink-0 ring-1 ring-white/10" style={{ backgroundColor: color }} />
      <span className="font-mono text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors flex items-center">
        {copied ? <Check className="h-3 w-3 text-green-400" /> : color}
      </span>
    </button>
  );
}
