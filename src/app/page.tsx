'use client';

import { useState, useCallback } from 'react';
import {
  AlertCircle,
  Upload,
  Image,
  Sparkles,
  Pipette,
  Grid3X3,
  Palette,
  Link as LinkIcon,
  Clipboard,
  ArrowRight,
  BookOpen,
  Contrast,
  Eye,
  Search,
  ShieldCheck,
  BadgeCheck,
  Lock,
} from 'lucide-react';
import Link from 'next/link';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ImageUploader, ImageUrlInput } from '@/components/color-picker/ImageUploader';
import { ImageCanvas } from '@/components/color-picker/ImageCanvas';
import { ColorDisplay } from '@/components/color-picker/ColorDisplay';
import { ColorHistory } from '@/components/color-picker/ColorHistory';
import { ClipboardPaste } from '@/components/color-picker/ClipboardPaste';
import { rgbToFormats, ColorFormats } from '@/lib/colorUtils';

const tools = [
  {
    name: 'Browse Colors',
    description: '16,700+ named colors to explore',
    href: '/browse',
    icon: Grid3X3,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Color Palette',
    description: 'Build palettes from any color',
    href: '/color-generator',
    icon: Sparkles,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Gradients',
    description: 'Design CSS gradients visually',
    href: '/gradient-maker',
    icon: Palette,
    gradient: 'from-fuchsia-500 to-pink-600',
  },
  {
    name: 'Contrast',
    description: 'Check if text is readable',
    href: '/contrast-checker',
    icon: Contrast,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Color Vision',
    description: 'See colors as others do',
    href: '/color-blindness',
    icon: Eye,
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    name: 'Color Lookup',
    description: 'Convert HEX, RGB, HSL, and more',
    href: '/color-lookup',
    icon: Search,
    gradient: 'from-rose-500 to-red-600',
  },
];

const colorTheoryColors = [
  { name: 'Red', hex: '#EF4444', note: 'Energy & passion' },
  { name: 'Orange', hex: '#F97316', note: 'Warmth & enthusiasm' },
  { name: 'Yellow', hex: '#EAB308', note: 'Optimism & clarity' },
  { name: 'Green', hex: '#22C55E', note: 'Growth & harmony' },
  { name: 'Blue', hex: '#3B82F6', note: 'Trust & calm' },
  { name: 'Violet', hex: '#8B5CF6', note: 'Creativity & depth' },
  { name: 'Pink', hex: '#EC4899', note: 'Romance & play' },
  { name: 'Gray', hex: '#6B7280', note: 'Balance & precision' },
];

const trustItems = [
  { icon: ShieldCheck, label: 'Images never leave your device' },
  { icon: BadgeCheck, label: 'Always free' },
  { icon: Lock, label: 'No account needed' },
];

export default function ColorPickerPage() {
  const [imageSource, setImageSource] = useState<string | File | null>(null);
  const [pickedColor, setPickedColor] = useState<ColorFormats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url' | 'paste'>('upload');

  const handleImageLoad = useCallback((source: string | File) => {
    setImageSource(source);
    setError(null);
    setPickedColor(null);
  }, []);

  const handleColorPick = useCallback((color: { r: number; g: number; b: number; a: number }) => {
    setPickedColor(rgbToFormats(color.r, color.g, color.b, color.a));
  }, []);

  const handleError = useCallback((msg: string) => setError(msg), []);

  const handleHistoryColorSelect = useCallback((color: ColorFormats) => {
    setPickedColor(color);
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:py-10">

        {/* Hero */}
        {!imageSource && (
          <div className="mb-10 text-center">
            <AnimateIn direction="down" delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-5">
                <Pipette className="h-3.5 w-3.5" />
                Free color tools
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={80}>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
                Extract colors from
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  any image.
                </span>
              </h1>
            </AnimateIn>

            <AnimateIn direction="up" delay={160}>
              <p className="text-sm sm:text-base text-gray-400 max-w-sm mx-auto leading-relaxed">
                Drop a photo, click any spot, get the exact color — in HEX, RGB, HSL, and more.
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={240}>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5">
                {trustItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Icon className="h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                    {label}
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        )}

        {/* Compact header when image loaded */}
        {imageSource && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Image className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Color Picker</h2>
                <p className="text-xs text-gray-500">Click the image to pick a color</p>
              </div>
            </div>
            <button
              onClick={() => { setImageSource(null); setPickedColor(null); setError(null); }}
              className="px-4 py-2 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 rounded-lg transition-colors active:scale-95"
            >
              New image
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2">
            {!imageSource ? (
              <div className="space-y-5">
                {/* Tabs */}
                <div className="flex gap-1.5 p-1 bg-gray-900/50 backdrop-blur border border-white/8 rounded-xl">
                  {[
                    { id: 'upload' as const, icon: Upload, label: 'Upload' },
                    { id: 'url' as const, icon: LinkIcon, label: 'From URL' },
                    { id: 'paste' as const, icon: Clipboard, label: 'Paste' },
                  ].map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setUploadMethod(id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                        uploadMethod === id
                          ? 'bg-white/10 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {uploadMethod === 'upload' && <ImageUploader onImageLoad={handleImageLoad} />}
                {uploadMethod === 'url' && (
                  <div className="bg-gray-900/50 backdrop-blur border border-white/8 rounded-xl p-6">
                    <ImageUrlInput onImageLoad={handleImageLoad} />
                  </div>
                )}
                {uploadMethod === 'paste' && (
                  <div className="bg-gray-900/50 backdrop-blur border border-white/8 rounded-xl p-6">
                    <ClipboardPaste onImagePaste={handleImageLoad} />
                  </div>
                )}

                {/* More tools */}
                <AnimateIn direction="up" delay={200}>
                  <div className="pt-2 border-t border-white/8">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">More tools</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {tools.map((tool) => (
                        <Link
                          key={tool.name}
                          href={tool.href}
                          className="group flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/8 hover:bg-white/[0.07] hover:border-white/15 transition-all active:scale-95 shimmer-hover"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-200`}>
                            <tool.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">{tool.name}</p>
                            <p className="text-xs text-gray-500 truncate leading-tight mt-0.5">{tool.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                <ImageCanvas
                  imageSource={imageSource}
                  onColorPick={handleColorPick}
                  onError={handleError}
                />
              </>
            )}
          </div>

          {/* Right: color display + history */}
          <div className="space-y-4">
            <ColorDisplay color={pickedColor} />
            <ColorHistory currentColor={pickedColor} onColorSelect={handleHistoryColorSelect} />
          </div>
        </div>

        {/* Colour Theory teaser */}
        {!imageSource && (
          <div className="mt-16 sm:mt-24">
            <AnimateIn direction="up" delay={0}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-3">
                    <BookOpen className="h-3.5 w-3.5" />
                    Colour Theory
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    What does each color mean?
                    <span className="block text-gray-400 font-normal text-lg sm:text-xl mt-1">
                      The psychology and meaning behind red, blue, green, and every hue.
                    </span>
                  </h2>
                </div>
                <Link
                  href="/color-theory"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium hover:bg-violet-500/20 transition-all flex-shrink-0 self-start sm:self-auto"
                >
                  Read the guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={100}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {colorTheoryColors.map((color) => (
                  <Link
                    key={color.name}
                    href={`/color-theory#${color.name.toLowerCase()}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300 active:scale-95"
                  >
                    <div
                      className="h-20 w-full transition-all duration-300 group-hover:h-24"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="p-3.5 bg-gray-950/80 backdrop-blur">
                      <p className="text-sm font-semibold text-white">{color.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{color.note}</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <code className="text-[10px] font-mono text-white bg-black/50 backdrop-blur px-1.5 py-0.5 rounded">
                        {color.hex}
                      </code>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={160}>
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 border border-violet-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Want to understand colour better?</p>
                  <p className="text-xs text-gray-400 mt-0.5">Psychology, culture, harmonies, and what every colour really says.</p>
                </div>
                <Link
                  href="/color-theory"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all active:scale-95 flex-shrink-0 whitespace-nowrap"
                >
                  <BookOpen className="h-4 w-4" />
                  Read the guide
                </Link>
              </div>
            </AnimateIn>
          </div>
        )}
      </div>
    </div>
  );
}
