'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Pipette, Copy, Check, RefreshCw, ChevronDown, ChevronUp,
  Palette, Sun, Moon, Droplets, Eye, Lightbulb, Thermometer,
  Sparkles, Heart, Leaf, Zap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { CopyButton } from '@/components/ui/CopyButton';
import { isValidColor } from '@/lib/colorUtils';
import { checkContrast } from '@/lib/contrastUtils';
import { colorBlindnessTypes, simulateColorBlindnessHex, ColorBlindnessType } from '@/lib/colorBlindness';
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

type Section = 'conversion' | 'variations' | 'harmonies' | 'contrast' | 'technical' | 'analysis' | 'blindness' | 'creative';

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
    new Set(['conversion', 'variations', 'harmonies', 'contrast'])
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

  useEffect(() => {
    updateColor(initialColor);
  }, [initialColor]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (isValidColor(value)) {
      updateColor(value);
    }
  };

  const handleColorPickerChange = (value: string) => {
    setInputValue(value);
    updateColor(value);
  };

  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setInputValue(randomHex);
    updateColor(randomHex);
  };

  const toggleSection = (section: Section) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const contrastResult = formats ? checkContrast('#000000', color) : null;
  const whiteContrast = formats ? checkContrast('#ffffff', color) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      {/* Hero section - Compact on mobile */}
      <div className="mb-6 sm:mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs sm:text-sm font-medium mb-3 sm:mb-6">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Color Analysis
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 sm:mb-4">
          Color Generator
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-xl mx-auto">
          Explore palettes, harmonies, and detailed color analysis
        </p>
      </div>

      {/* Color Input Section */}
      <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-2xl mb-6 sm:mb-8 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center">
            {/* Color preview - Smaller on mobile */}
            <div
              className="h-24 sm:h-32 w-full rounded-xl shadow-lg lg:h-40 lg:w-48 ring-1 ring-white/10 flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            
            {/* Color inputs */}
            <div className="flex-1 space-y-3 sm:space-y-4">
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorPickerChange(e.target.value)}
                  className="h-10 sm:h-12 w-12 sm:w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                />
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="#2596be"
                    className="h-10 sm:h-12 w-full rounded-lg border border-white/10 bg-black/20 px-3 sm:px-4 font-mono text-sm sm:text-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
                  />
                  {formats?.name && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hidden sm:block">
                      {formats.name}
                    </span>
                  )}
                </div>
                <button
                  onClick={generateRandomColor}
                  className="flex h-10 sm:h-12 items-center gap-1.5 sm:gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 sm:px-4 text-white hover:opacity-90 transition-opacity"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Random</span>
                </button>
              </div>
              
              {/* Quick copy buttons - Scrollable on mobile */}
              {formats && (
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
                  {[
                    { label: 'HEX', value: formats.hex },
                    { label: 'RGB', value: formats.rgbString },
                    { label: 'HSL', value: formats.hslString },
                    { label: 'CMYK', value: formats.cmykString },
                  ].map((item) => (
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

      {/* Sections */}
      <div className="space-y-3 sm:space-y-4">
        
        {/* Color Conversion Section */}
        <CollapsibleSection
          title="Color Conversion"
          icon={<Palette className="h-5 w-5" />}
          description="All color format representations"
          expanded={expandedSections.has('conversion')}
          onToggle={() => toggleSection('conversion')}
        >
          {formats && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'HEX', value: formats.hex },
                { label: 'RGB', value: formats.rgbString },
                { label: 'HSL', value: formats.hslString },
                { label: 'HSV', value: formats.hsvString },
                { label: 'HWB', value: formats.hwbString },
                { label: 'CMYK', value: formats.cmykString },
                { label: 'LAB', value: formats.labString },
                { label: 'LCH', value: formats.lchString },
                { label: 'XYZ', value: formats.xyzString },
              ].map((format) => (
                <div
                  key={format.label}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div>
                    <span className="text-xs font-medium uppercase text-gray-500">{format.label}</span>
                    <p className="font-mono text-sm text-gray-900 dark:text-gray-100">{format.value}</p>
                  </div>
                  <CopyButton text={format.value} />
                </div>
              ))}
            </div>
          )}
        </CollapsibleSection>

        {/* Variations Section */}
        <CollapsibleSection
          title="Variations"
          icon={<Sun className="h-5 w-5" />}
          description="Shades and tints in 10% increments"
          expanded={expandedSections.has('variations')}
          onToggle={() => toggleSection('variations')}
        >
          <div className="space-y-6">
            {/* Shades */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                <Moon className="h-4 w-4" /> Shades
                <span className="text-sm font-normal text-gray-500">— Darker variations (adding black)</span>
              </h4>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {shades.map((shade) => (
                  <ColorVariationSwatch key={shade.percentage} variation={shade} />
                ))}
              </div>
            </div>
            
            {/* Tints */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                <Sun className="h-4 w-4" /> Tints
                <span className="text-sm font-normal text-gray-500">— Lighter variations (adding white)</span>
              </h4>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {tints.map((tint) => (
                  <ColorVariationSwatch key={tint.percentage} variation={tint} />
                ))}
              </div>
            </div>
            
            <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-950/30">
              <p className="text-sm text-violet-800 dark:text-violet-200">
                <strong>Pro Tip:</strong> Use shades for hover states and shadows, tints for highlights and backgrounds.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* Color Harmonies Section */}
        <CollapsibleSection
          title="Color Combinations"
          icon={<Droplets className="h-5 w-5" />}
          description="Mathematically proven color harmonies"
          expanded={expandedSections.has('harmonies')}
          onToggle={() => toggleSection('harmonies')}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {harmonies.map((harmony) => (
              <div
                key={harmony.name}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">{harmony.name}</h4>
                <p className="mt-1 text-xs text-gray-500">{harmony.description}</p>
                <div className="mt-3 flex gap-2">
                  {harmony.colors.map((c, i) => (
                    <HarmonyColorSwatch key={i} color={c} />
                  ))}
                </div>
                <p className="mt-2 text-xs text-violet-600 dark:text-violet-400">
                  Best for: {harmony.bestFor}
                </p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Contrast Checker Section */}
        <CollapsibleSection
          title="Contrast Checker"
          icon={<Eye className="h-5 w-5" />}
          description="WCAG accessibility compliance"
          expanded={expandedSections.has('contrast')}
          onToggle={() => toggleSection('contrast')}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={contrastBg}
                    onChange={(e) => setContrastBg(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded border border-gray-300 dark:border-gray-700"
                  />
                  <input
                    type="text"
                    value={contrastBg}
                    onChange={(e) => isValidColor(e.target.value) && setContrastBg(e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-gray-300 bg-white px-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              
              {/* Preview */}
              <div
                className="rounded-lg p-6"
                style={{ backgroundColor: contrastBg }}
              >
                <p className="text-2xl font-bold" style={{ color }}>
                  Sample Text
                </p>
                <p className="mt-2 text-sm" style={{ color }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {(() => {
                const result = checkContrast(color, contrastBg);
                return (
                  <>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white">
                        {result.ratioString}
                      </div>
                      <div
                        className={cn(
                          'mt-2 inline-block rounded-full px-4 py-1 text-sm font-medium',
                          result.score === 'AAA' || result.score === 'AA'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                            : result.score === 'AA Large'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                        )}
                      >
                        {result.score}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'AA Small', pass: result.aa.normalText },
                        { label: 'AA Large', pass: result.aa.largeText },
                        { label: 'AAA Small', pass: result.aaa.normalText },
                        { label: 'AAA Large', pass: result.aaa.largeText },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={cn(
                            'flex items-center justify-between rounded-lg px-3 py-2',
                            item.pass
                              ? 'bg-green-50 dark:bg-green-900/30'
                              : 'bg-red-50 dark:bg-red-900/30'
                          )}
                        >
                          <span className="text-sm">{item.label}</span>
                          <span className={item.pass ? 'text-green-600' : 'text-red-600'}>
                            {item.pass ? '✓' : '✗'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </CollapsibleSection>

        {/* Technical Formats Section */}
        <CollapsibleSection
          title="Technical Formats"
          icon={<Zap className="h-5 w-5" />}
          description="Advanced color space representations"
          expanded={expandedSections.has('technical')}
          onToggle={() => toggleSection('technical')}
        >
          {technicalFormats && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'HSI', value: technicalFormats.hsiString, desc: 'Hue, Saturation, Intensity' },
                { label: 'YUV', value: technicalFormats.yuvString, desc: 'Video/Broadcast PAL' },
                { label: 'YCbCr', value: technicalFormats.ycbcrString, desc: 'Digital Video' },
                { label: 'Integer', value: technicalFormats.integerString, desc: 'Numeric representation' },
                { label: 'RGB Bytes', value: technicalFormats.rgbBytes, desc: 'Hex byte order' },
                { label: 'BGR Bytes', value: technicalFormats.bgrBytes, desc: 'Reversed byte order' },
                { label: 'ARGB', value: technicalFormats.argbBytes, desc: 'With alpha channel' },
                { label: 'Binary', value: technicalFormats.binary, desc: '24-bit binary' },
                { label: 'Base64', value: technicalFormats.base64, desc: 'Encoded color' },
              ].map((format) => (
                <div
                  key={format.label}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium uppercase text-violet-600 dark:text-violet-400">
                        {format.label}
                      </span>
                      <p className="font-mono text-sm text-gray-900 dark:text-gray-100">{format.value}</p>
                      <p className="text-xs text-gray-500">{format.desc}</p>
                    </div>
                    <CopyButton text={format.value} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CollapsibleSection>

        {/* Color Analysis Section */}
        <CollapsibleSection
          title="Color Analysis"
          icon={<Lightbulb className="h-5 w-5" />}
          description="Spectral and perceptual properties"
          expanded={expandedSections.has('analysis')}
          onToggle={() => toggleSection('analysis')}
        >
          {analysis && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AnalysisCard
                title="Luminance"
                value={`${analysis.relativeLuminance}%`}
                subtitle={`Perceived: ${analysis.perceivedBrightness}%`}
              />
              <AnalysisCard
                title="Temperature"
                value={analysis.temperature.charAt(0).toUpperCase() + analysis.temperature.slice(1)}
                subtitle={analysis.isWarm ? '🔥 Warm tones' : analysis.isCool ? '❄️ Cool tones' : '⚖️ Neutral'}
              />
              <AnalysisCard
                title="Dominant Wavelength"
                value={`${analysis.dominantWavelength}nm`}
                subtitle={analysis.wavelengthName}
              />
              <AnalysisCard
                title="Purity/Chroma"
                value={`${analysis.purity}%`}
                subtitle={analysis.isSaturated ? 'High saturation' : analysis.isNeutral ? 'Neutral/Gray' : 'Medium saturation'}
              />
              
              <div className="col-span-full flex flex-wrap gap-2">
                {[
                  { label: 'Dark', active: analysis.isDark },
                  { label: 'Light', active: analysis.isLight },
                  { label: 'Warm', active: analysis.isWarm },
                  { label: 'Cool', active: analysis.isCool },
                  { label: 'Saturated', active: analysis.isSaturated },
                  { label: 'Neutral', active: analysis.isNeutral },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className={cn(
                      'rounded-full px-3 py-1 text-sm',
                      tag.active
                        ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                    )}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CollapsibleSection>

        {/* Blindness Simulator Section */}
        <CollapsibleSection
          title="Blindness Simulator"
          icon={<Eye className="h-5 w-5" />}
          description="Color perception for different vision types"
          expanded={expandedSections.has('blindness')}
          onToggle={() => toggleSection('blindness')}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <p className="text-xs font-medium uppercase text-gray-500">Original</p>
              <div
                className="mt-2 h-16 rounded-lg"
                style={{ backgroundColor: color }}
              />
              <p className="mt-2 font-mono text-sm">{formats?.hex}</p>
            </div>
            
            {colorBlindnessTypes.slice(0, 7).map((type) => {
              const simulated = simulateColorBlindnessHex(color, type.type);
              return (
                <div
                  key={type.type}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <p className="text-xs font-medium uppercase text-gray-500">{type.name}</p>
                  <div
                    className="mt-2 h-16 rounded-lg"
                    style={{ backgroundColor: simulated }}
                  />
                  <p className="mt-2 font-mono text-sm">{simulated.toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{type.prevalence}</p>
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* Creative Aspects Section */}
        <CollapsibleSection
          title="Creative Aspects"
          icon={<Sparkles className="h-5 w-5" />}
          description="Psychology, culture, and natural associations"
          expanded={expandedSections.has('creative')}
          onToggle={() => toggleSection('creative')}
        >
          {creative && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Emotions */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  <Heart className="h-4 w-4 text-pink-500" /> Emotional Impact
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{creative.mood}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {creative.emotions.map((emotion) => (
                    <span key={emotion} className="rounded-full bg-pink-100 px-2 py-0.5 text-xs text-pink-700 dark:bg-pink-900/50 dark:text-pink-300">
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Season */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  <Leaf className="h-4 w-4 text-green-500" /> Season Association
                </h4>
                <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{creative.season}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{creative.seasonDescription}</p>
              </div>
              
              {/* Natural */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  <Leaf className="h-4 w-4 text-emerald-500" /> Natural Occurrence
                </h4>
                <div className="mt-2 flex flex-wrap gap-1">
                  {creative.naturalExamples.map((example) => (
                    <span key={example} className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Psychology */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 md:col-span-2 lg:col-span-1">
                <h4 className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  <Lightbulb className="h-4 w-4 text-yellow-500" /> Psychology
                </h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{creative.psychology}</p>
              </div>
              
              {/* Use Cases */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white">Common Use Cases</h4>
                <ul className="mt-2 space-y-1">
                  {creative.useCases.map((useCase) => (
                    <li key={useCase} className="text-sm text-gray-600 dark:text-gray-400">• {useCase}</li>
                  ))}
                </ul>
              </div>
              
              {/* Cultural */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white">Cultural Meanings</h4>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Western:</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{creative.westernMeaning}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">Eastern:</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{creative.easternMeaning}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
}

// ============ Helper Components ============

function CollapsibleSection({
  title,
  icon,
  description,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 sm:p-6 text-left active:bg-white/5"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm sm:text-base">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{description}</p>
          </div>
        </div>
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 flex-shrink-0 ml-3 transition-transform",
          expanded && "rotate-180"
        )}>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </button>
      {expanded && (
        <div className="border-t border-white/5 px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

function ColorVariationSwatch({ variation }: { variation: ColorVariation }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(variation.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col items-center flex-shrink-0 active:scale-95 transition-transform"
      title={`${variation.percentage}% - ${variation.hex}`}
    >
      <div
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg ring-1 ring-white/10 transition-transform group-hover:scale-110"
        style={{ backgroundColor: variation.hex }}
      />
      <span className="mt-1 text-[10px] sm:text-xs text-gray-500">{variation.percentage}%</span>
      <span className="font-mono text-[10px] sm:text-xs text-gray-400">{copied ? '✓' : variation.hex}</span>
    </button>
  );
}

function HarmonyColorSwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col items-center active:scale-95 transition-transform"
      title={`Click to copy ${color}`}
    >
      <div
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg ring-1 ring-white/10 transition-transform group-hover:scale-110"
        style={{ backgroundColor: color }}
      />
      <span className="mt-1 font-mono text-[10px] sm:text-xs text-gray-500">
        {copied ? '✓' : color}
      </span>
    </button>
  );
}

function AnalysisCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="rounded-xl bg-black/20 border border-white/5 p-3 sm:p-4">
      <p className="text-[10px] sm:text-xs font-medium uppercase text-gray-500">{title}</p>
      <p className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-bold text-white">{value}</p>
      <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
