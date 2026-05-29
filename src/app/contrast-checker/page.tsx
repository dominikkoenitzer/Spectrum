'use client';

import { useState, useMemo } from 'react';
import { Check, X, AlertTriangle, RefreshCw, Lightbulb, Type, Eye, ArrowRight, Info } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { checkContrast, ContrastResult, suggestAccessibleColors } from '@/lib/contrastUtils';
import { isValidColor } from '@/lib/colorUtils';
import { cn } from '@/lib/utils';

// Common color presets for quick testing
const colorPresets = [
  { name: 'Default', fg: '#000000', bg: '#ffffff' },
  { name: 'Dark Mode', fg: '#e5e5e5', bg: '#171717' },
  { name: 'Primary Button', fg: '#ffffff', bg: '#7c3aed' },
  { name: 'Warning', fg: '#92400e', bg: '#fef3c7' },
  { name: 'Error', fg: '#991b1b', bg: '#fee2e2' },
  { name: 'Success', fg: '#166534', bg: '#dcfce7' },
];

// Font size previews
const fontSizes = [
  { name: '12px (Small)', size: 12, weight: 'normal' },
  { name: '14px (Body)', size: 14, weight: 'normal' },
  { name: '16px (Body)', size: 16, weight: 'normal' },
  { name: '18px (Large)', size: 18, weight: 'normal' },
  { name: '14px Bold', size: 14, weight: 'bold' },
  { name: '24px (Heading)', size: 24, weight: 'bold' },
];

export default function ContrastCheckerPage() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [result, setResult] = useState<ContrastResult | null>(() => checkContrast('#000000', '#ffffff'));
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleForegroundChange = (value: string) => {
    setForeground(value);
    if (isValidColor(value) && isValidColor(background)) {
      setResult(checkContrast(value, background));
    }
  };

  const handleBackgroundChange = (value: string) => {
    setBackground(value);
    if (isValidColor(foreground) && isValidColor(value)) {
      setResult(checkContrast(foreground, value));
    }
  };

  const swapColors = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
    if (isValidColor(foreground) && isValidColor(background)) {
      setResult(checkContrast(background, foreground));
    }
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setForeground(preset.fg);
    setBackground(preset.bg);
    setResult(checkContrast(preset.fg, preset.bg));
  };

  // Generate color suggestions
  const suggestions = useMemo(() => {
    if (!isValidColor(foreground) || !isValidColor(background)) return null;
    return suggestAccessibleColors(foreground, background);
  }, [foreground, background]);

  // Generate CSS snippet
  const cssSnippet = useMemo(() => {
    return `.element {
  color: ${foreground};
  background-color: ${background};
}`;
  }, [foreground, background]);

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'AAA':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50';
      case 'AA':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50';
      case 'AA Large':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/50';
      default:
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50';
    }
  };

  const getScoreEmoji = (score: string) => {
    switch (score) {
      case 'AAA':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'AA':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'AA Large':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <X className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      {/* Hero section - Compact on mobile */}
      <div className="mb-8 sm:mb-12">
        <p className="label-caps text-ink-3 mb-4">Accessibility Tool</p>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-[-0.035em] text-ink mb-3 leading-[0.98]">
          Contrast Checker
        </h1>
        <p className="text-base text-ink-2 max-w-xl">
          Verify WCAG 2.1 accessibility compliance for any color pair.
        </p>
      </div>

      {/* Quick Presets - Scrollable on mobile */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs font-medium text-ink-3 mb-2 sm:mb-3">Quick Presets:</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-2 border border-line hover:border-line transition-all active:scale-[0.98]"
            >
              <div className="flex -space-x-1">
                <span 
                  className="w-4 h-4 rounded-full ring-2 ring-gray-950"
                  style={{ backgroundColor: preset.fg }}
                />
                <span 
                  className="w-4 h-4 rounded-full ring-2 ring-gray-950"
                  style={{ backgroundColor: preset.bg }}
                />
              </div>
              <span className="text-xs sm:text-sm text-ink-2">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
        {/* Color inputs */}
        <div className="bg-surface  border border-line rounded-2xl p-4 sm:p-5 lg:col-span-1">
          <h3 className="text-sm font-semibold text-ink mb-1">Colors</h3>
          <p className="text-xs text-ink-3 mb-4">Enter foreground and background</p>
          
          <div className="space-y-3 sm:space-y-4">
            {/* Foreground */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-2">
                Foreground (Text)
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => handleForegroundChange(e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-line bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={foreground}
                  onChange={(e) => handleForegroundChange(e.target.value)}
                  className="h-10 flex-1 rounded-lg border border-line bg-surface px-3 font-mono text-sm text-ink focus:border-line-strong focus:outline-none"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center">
              <button
                onClick={swapColors}
                className="rounded-lg bg-surface-2 border border-line px-4 py-2 text-xs font-medium text-ink-2 hover:bg-surface-2 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Swap
              </button>
            </div>

            {/* Background */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-2">
                Background
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={background}
                  onChange={(e) => handleBackgroundChange(e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-line bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={background}
                  onChange={(e) => handleBackgroundChange(e.target.value)}
                  className="h-10 flex-1 rounded-lg border border-line bg-surface px-3 font-mono text-sm text-ink focus:border-line-strong focus:outline-none"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            {/* CSS Snippet */}
            <div className="mt-4 pt-4 border-t border-line">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-ink-3">CSS Code</span>
                <CopyButton text={cssSnippet} showLabel={false} />
              </div>
              <pre className="text-[10px] sm:text-xs bg-surface border border-line rounded-lg p-2.5 overflow-x-auto font-mono text-ink-2">
                {cssSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-surface  border border-line rounded-2xl p-4 sm:p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-ink mb-1">Contrast Analysis</h3>
          <p className="text-xs text-ink-3 mb-4">WCAG 2.1 compliance</p>
          
          {result && (
            <div className="space-y-4 sm:space-y-6">
              {/* Main score - Stack on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 rounded-xl bg-surface border border-line">
                <div>
                  <p className="text-xs text-ink-3 mb-1">Contrast Ratio</p>
                  <div className="text-4xl sm:text-5xl font-bold text-ink">
                    {result.ratioString}
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="flex items-center gap-2 sm:justify-end mb-2">
                    {getScoreEmoji(result.score)}
                    <span
                      className={cn(
                        'inline-block rounded-full px-4 py-1 text-sm font-bold',
                        getScoreColor(result.score)
                      )}
                    >
                      {result.score}
                    </span>
                  </div>
                  <p className="text-sm text-ink-3 dark:text-ink-2">
                    {result.score === 'AAA' && 'Excellent contrast'}
                    {result.score === 'AA' && 'Good contrast'}
                    {result.score === 'AA Large' && 'OK for large text only'}
                    {result.score === 'Fail' && 'Insufficient contrast'}
                  </p>
                </div>
              </div>

              {/* Live preview */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-4 w-4 text-ink-2" />
                  <span className="text-sm font-medium text-ink-2 dark:text-ink-2">Live Preview</span>
                </div>
                <div
                  className="rounded-xl p-6 border border-line dark:border-line"
                  style={{ backgroundColor: background }}
                >
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: foreground }}
                  >
                    Heading Text
                  </h3>
                  <p
                    className="text-base mb-4"
                    style={{ color: foreground }}
                  >
                    The quick brown fox jumps over the lazy dog. This sample text helps you visualize how your color combination will appear in real content.
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
                      style={{ backgroundColor: foreground, color: background }}
                    >
                      Button
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-opacity hover:opacity-80"
                      style={{ borderColor: foreground, color: foreground }}
                    >
                      Outlined
                    </button>
                  </div>
                </div>
              </div>

              {/* Font size previews */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Type className="h-4 w-4 text-ink-2" />
                  <span className="text-sm font-medium text-ink-2 dark:text-ink-2">Size Comparison</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {fontSizes.map((font) => {
                    const isLarge = font.size >= 18 || (font.size >= 14 && font.weight === 'bold');
                    const passes = isLarge ? result.aa.largeText : result.aa.normalText;
                    
                    return (
                      <div
                        key={font.name}
                        className="p-3 rounded-lg border border-line dark:border-line"
                        style={{ backgroundColor: background }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-ink-3">{font.name}</span>
                          {passes ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                        <p
                          style={{ 
                            color: foreground, 
                            fontSize: font.size,
                            fontWeight: font.weight as 'normal' | 'bold'
                          }}
                        >
                          Sample
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* WCAG Levels */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-4 w-4 text-ink-2" />
                  <span className="text-sm font-medium text-ink-2 dark:text-ink-2">WCAG Compliance</span>
                </div>
                
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { label: 'AA Normal Text', pass: result.aa.normalText, requirement: '≥ 4.5:1', desc: 'Standard body text' },
                    { label: 'AA Large Text', pass: result.aa.largeText, requirement: '≥ 3:1', desc: '18pt+ or 14pt bold' },
                    { label: 'AA UI Components', pass: result.aa.uiComponents, requirement: '≥ 3:1', desc: 'Buttons, inputs, icons' },
                    { label: 'AAA Normal Text', pass: result.aaa.normalText, requirement: '≥ 7:1', desc: 'Enhanced accessibility' },
                    { label: 'AAA Large Text', pass: result.aaa.largeText, requirement: '≥ 4.5:1', desc: 'Enhanced large text' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-4 py-3 transition-colors",
                        item.pass 
                          ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20" 
                          : "border-line dark:border-line"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.pass ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </div>
                        )}
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-ink">
                            {item.label}
                          </span>
                          <p className="text-xs text-ink-3">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-ink-3">{item.requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions Section */}
      {result && result.score !== 'AAA' && suggestions && (
        <div className="mt-6 sm:mt-8 bg-surface  border border-line rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
            <h3 className="text-sm sm:text-base font-semibold text-ink">Suggested Improvements</h3>
          </div>
          <p className="text-xs text-ink-3 mb-4">Alternative colors that meet AA or AAA standards</p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.foreground.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-medium text-ink-2">Adjust Text Color</p>
                <div className="space-y-2">
                  {suggestions.foreground.slice(0, 3).map((color, i) => {
                    const newResult = checkContrast(color, background);
                    return (
                      <button
                        key={i}
                        onClick={() => handleForegroundChange(color)}
                        className="flex items-center gap-3 w-full p-3 rounded-lg bg-surface border border-line hover:border-line transition-all active:scale-[0.98] group"
                      >
                        <span 
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg ring-1 ring-line"
                          style={{ backgroundColor: color }}
                        />
                        <div className="text-left flex-1">
                          <p className="font-mono text-xs sm:text-sm text-ink">{color}</p>
                          <p className="text-xs text-ink-3">{newResult.ratioString} - {newResult.score}</p>
                          </div>
                        <ArrowRight className="h-4 w-4 text-ink-2 group-hover:text-ink transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {suggestions.background.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-medium text-ink-2">Adjust Background</p>
                <div className="space-y-2">
                  {suggestions.background.slice(0, 3).map((color, i) => {
                    const newResult = checkContrast(foreground, color);
                    return (
                      <button
                        key={i}
                        onClick={() => handleBackgroundChange(color)}
                        className="flex items-center gap-3 w-full p-3 rounded-lg bg-surface border border-line hover:border-line transition-all active:scale-[0.98] group"
                      >
                        <span 
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg ring-1 ring-line"
                          style={{ backgroundColor: color }}
                        />
                        <div className="text-left flex-1">
                          <p className="font-mono text-xs sm:text-sm text-ink">{color}</p>
                          <p className="text-xs text-ink-3">{newResult.ratioString} - {newResult.score}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-ink-2 group-hover:text-ink transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="mt-6 sm:mt-8 bg-surface  border border-line rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-ink text-sm sm:text-base mb-2">Understanding WCAG Contrast</h4>
            <p className="text-xs sm:text-sm text-ink-2 mb-4">
              The Web Content Accessibility Guidelines (WCAG) define minimum contrast ratios to ensure text is readable by people with moderately low vision.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-lg bg-surface border border-line">
                <h5 className="font-medium text-ink text-xs sm:text-sm mb-2">Text Sizes</h5>
                <ul className="space-y-1 text-xs text-ink-2">
                  <li><strong className="text-ink-2">Normal text:</strong> Under 18pt or under 14pt bold</li>
                  <li><strong className="text-ink-2">Large text:</strong> 18pt+ or 14pt+ bold</li>
                </ul>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-surface border border-line">
                <h5 className="font-medium text-ink text-xs sm:text-sm mb-2">WCAG Levels</h5>
                <ul className="space-y-1 text-xs text-ink-2">
                  <li><strong className="text-ink-2">Level AA:</strong> Minimum acceptable contrast</li>
                  <li><strong className="text-ink-2">Level AAA:</strong> Enhanced, recommended</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
