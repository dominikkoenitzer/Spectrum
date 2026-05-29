'use client';

import { useState, useCallback } from 'react';
import {
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Clipboard,
  Check,
  Copy,
  ArrowRight,
  Grid3X3,
  Sparkles,
  Palette,
  Contrast,
  Eye,
  BookOpen,
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
  { name: 'Browse Colors', description: '16,700+ named colors to explore', href: '/browse', icon: Grid3X3 },
  { name: 'Color Palette', description: 'Build palettes from any single color', href: '/color-generator', icon: Sparkles },
  { name: 'Gradients', description: 'Design CSS gradients visually', href: '/gradient-maker', icon: Palette },
  { name: 'Contrast', description: 'Check if text is readable (WCAG)', href: '/contrast-checker', icon: Contrast },
  { name: 'Color Vision', description: 'See colors as others do', href: '/color-blindness', icon: Eye },
  { name: 'Color Theory', description: 'The meaning behind every color', href: '/color-theory', icon: BookOpen },
];

// Static sample used to illustrate the picker on the landing screen,
// so the result panel shows what you get instead of empty air.
const sample = {
  file: 'sunset-market.jpg',
  gradient: 'linear-gradient(115deg, #2D6E7E 0%, #4CA85E 32%, #E8C84B 56%, #E08A3C 78%, #C24B4B 100%)',
  points: [
    { x: '22%', y: '38%', hex: '#2D6E7E' },
    { x: '40%', y: '64%', hex: '#4CA85E' },
    { x: '62%', y: '40%', hex: '#E8C84B' },
    { x: '79%', y: '66%', hex: '#E08A3C' },
    { x: '89%', y: '34%', hex: '#C24B4B' },
  ],
  colors: [
    { hex: '#2D6E7E', name: 'Deep Teal' },
    { hex: '#4CA85E', name: 'Fern' },
    { hex: '#E8C84B', name: 'Ochre' },
    { hex: '#E08A3C', name: 'Amber' },
    { hex: '#C24B4B', name: 'Clay' },
  ],
};

const theoryColors = [
  { name: 'Red', hex: '#E5484D', note: 'Energy & passion' },
  { name: 'Yellow', hex: '#E8C84B', note: 'Optimism & clarity' },
  { name: 'Green', hex: '#4CA85E', note: 'Growth & harmony' },
  { name: 'Blue', hex: '#3B82C4', note: 'Trust & calm' },
];

function CopyChip({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className="label-caps inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function ExtractedSample() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="label-caps text-ink-3">Extracted</span>
        <span className="font-mono text-xs text-ink-3">{sample.file}</span>
      </div>

      <div className="p-5">
        {/* Sample image */}
        <div className="relative h-44 overflow-hidden rounded-xl" style={{ background: sample.gradient }}>
          <div className="grid-texture absolute inset-0 opacity-20" />
          {sample.points.map((p) => (
            <span
              key={p.hex}
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
              style={{ left: p.x, top: p.y, backgroundColor: p.hex }}
            />
          ))}
          <span className="label-caps absolute bottom-3 left-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-paper backdrop-blur-sm">
            5 colors · click to sample
          </span>
        </div>

        {/* Color list */}
        <div className="mt-4 divide-y divide-line">
          {sample.colors.map((c) => (
            <div key={c.hex} className="flex items-center gap-4 py-3">
              <span
                className="h-11 w-11 flex-shrink-0 rounded-lg border border-line"
                style={{ backgroundColor: c.hex }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-semibold text-ink">{c.hex}</p>
                <p className="text-sm text-ink-2">{c.name}</p>
              </div>
              <CopyChip text={c.hex} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: 'upload' as const, icon: Upload, label: 'Upload' },
  { id: 'url' as const, icon: LinkIcon, label: 'From URL' },
  { id: 'paste' as const, icon: Clipboard, label: 'Paste' },
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
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {!imageSource ? (
        <>
          {/* Landing — hero + live result preview */}
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Hero */}
            <div>
              <AnimateIn direction="up" delay={60}>
                <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                  Pull every<br />color out of<br />any image.
                </h1>
              </AnimateIn>

              <AnimateIn direction="up" delay={120}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">
                  Drop a photo, click any pixel, and read the exact value in HEX, RGB, HSL and more. Nothing is uploaded — it all runs on your device.
                </p>
              </AnimateIn>

              <AnimateIn direction="up" delay={180}>
                <p className="label-caps mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-3">
                  <span>· Private by default</span>
                  <span>· No sign-up</span>
                  <span>· Free forever</span>
                </p>
              </AnimateIn>

              <AnimateIn direction="up" delay={240}>
                <div className="mt-8">
                  {/* Tabs */}
                  <div className="flex items-center gap-6 border-b border-line">
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setUploadMethod(t.id)}
                        className={cnTab(uploadMethod === t.id)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5">
                    {uploadMethod === 'upload' && <ImageUploader onImageLoad={handleImageLoad} />}
                    {uploadMethod === 'url' && <ImageUrlInput onImageLoad={handleImageLoad} />}
                    {uploadMethod === 'paste' && <ClipboardPaste onImagePaste={handleImageLoad} />}
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Result preview */}
            <AnimateIn direction="up" delay={140} className="lg:pt-1">
              <ExtractedSample />
            </AnimateIn>
          </div>

          {/* More tools */}
          <div className="mt-24 sm:mt-32">
            <AnimateIn direction="up" delay={0}>
              <p className="label-caps text-ink-3">More tools</p>
              <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight text-ink">
                Everything you need to work with color.
              </h2>
            </AnimateIn>

            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group flex items-start gap-4 bg-surface p-5 transition-colors hover:bg-surface-2"
                >
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-line bg-paper">
                    <tool.icon className="h-5 w-5 text-ink" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 font-medium text-ink">
                      {tool.name}
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-ink-3 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </p>
                    <p className="mt-1 text-sm leading-snug text-ink-2">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Theory teaser */}
          <div className="mt-16">
            <AnimateIn direction="up" delay={0}>
              <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="label-caps text-ink-3">Color theory</p>
                  <h2 className="mt-3 max-w-md font-display text-2xl font-semibold tracking-tight text-ink">
                    What does each color actually mean?
                  </h2>
                  <p className="mt-2 max-w-md text-sm text-ink-2">
                    The psychology, culture, and harmonies behind every major hue.
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    {theoryColors.map((c) => (
                      <Link
                        key={c.name}
                        href={`/color-theory#${c.name.toLowerCase()}`}
                        title={`${c.name} — ${c.note}`}
                        className="h-8 w-8 rounded-md border border-line transition-transform hover:-translate-y-0.5"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
                <Link
                  href="/color-theory"
                  className="inline-flex flex-shrink-0 items-center gap-2 self-start rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/90 sm:self-auto"
                >
                  <BookOpen className="h-4 w-4" />
                  Read the guide
                </Link>
              </div>
            </AnimateIn>
          </div>
        </>
      ) : (
        <>
          {/* Picker — image loaded */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface">
                <ImageIcon className="h-5 w-5 text-ink" strokeWidth={1.75} />
              </span>
              <div>
                <h1 className="font-display text-base font-semibold text-ink">Color Picker</h1>
                <p className="font-mono text-xs text-ink-2">Click the image to sample a color</p>
              </div>
            </div>
            <button
              onClick={() => { setImageSource(null); setPickedColor(null); setError(null); }}
              className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2 active:scale-95"
            >
              New image
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {error && (
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-negative/30 bg-negative/5 px-4 py-3 text-negative">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <ImageCanvas imageSource={imageSource} onColorPick={handleColorPick} onError={handleError} />
            </div>

            <div className="space-y-4">
              <ColorDisplay color={pickedColor} />
              <ColorHistory currentColor={pickedColor} onColorSelect={handleHistoryColorSelect} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function cnTab(active: boolean): string {
  return [
    'label-caps relative -mb-px border-b-2 pb-3 pt-1 transition-colors',
    active ? 'border-ink text-ink' : 'border-transparent text-ink-3 hover:text-ink',
  ].join(' ');
}
