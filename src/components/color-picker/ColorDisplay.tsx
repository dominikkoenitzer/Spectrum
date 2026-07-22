'use client';

import { ColorFormats } from '@/lib/colorUtils';
import { CopyButton } from '@/components/ui/CopyButton';
import { cn } from '@/lib/utils';
import { Palette, Droplets, Sun, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ColorDisplayProps {
  color: ColorFormats | null;
  className?: string;
}

function getLuminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0];
  const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isLightColor(hex: string): boolean {
  return getLuminance(hex) > 0.5;
}

function getTemperature(hsl: { h: number }): string {
  const h = hsl.h;
  if (h >= 0 && h < 60) return 'Warm';
  if (h >= 60 && h < 150) return 'Neutral-Warm';
  if (h >= 150 && h < 210) return 'Cool';
  if (h >= 210 && h < 270) return 'Cool';
  if (h >= 270 && h < 330) return 'Neutral-Cool';
  return 'Warm';
}

function getSaturationLevel(s: number): string {
  if (s < 15) return 'Muted';
  if (s < 40) return 'Subtle';
  if (s < 70) return 'Vibrant';
  return 'Saturated';
}

function getBrightnessLevel(l: number): string {
  if (l < 20) return 'Dark';
  if (l < 40) return 'Deep';
  if (l < 60) return 'Medium';
  if (l < 80) return 'Light';
  return 'Pale';
}

export function ColorDisplay({ color, className }: ColorDisplayProps) {
  if (!color) {
    return (
      <div className={cn('rounded-2xl border border-line bg-surface p-8', className)}>
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl border border-line bg-paper">
            <Droplets className="h-6 w-6 text-ink-3" strokeWidth={1.75} />
          </div>
          <p className="font-medium text-ink">No color sampled yet</p>
          <p className="mt-1 text-sm text-ink-2">Click anywhere on the image</p>
        </div>
      </div>
    );
  }

  const isLight = isLightColor(color.hex);
  const temperature = getTemperature(color.hsl);
  const saturation = getSaturationLevel(color.hsl.s);
  const brightness = getBrightnessLevel(color.hsl.l);

  const formats = [
    { label: 'HEX', value: color.hex },
    { label: 'RGB', value: color.rgbString },
    { label: 'HSL', value: color.hslString },
    { label: 'HSV', value: color.hsvString },
  ];

  const colorProperties = [
    { label: 'Temperature', value: temperature, icon: Sun },
    { label: 'Saturation', value: saturation, icon: Droplets },
    { label: 'Brightness', value: brightness, icon: Sparkles },
  ];

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line bg-surface', className)}>
      {/* Color preview — the one saturated thing */}
      <div
        className="relative h-40 w-full group"
        style={{ backgroundColor: color.hex }}
      >
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          isLight ? 'text-black/90' : 'text-white'
        )}>
          <div className="text-center">
            {color.name && (
              <p className="text-xl font-bold capitalize mb-1">{color.name}</p>
            )}
            <p className={cn('text-sm font-mono', isLight ? 'text-black/70' : 'text-white/80')}>
              {color.hex.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton
            text={color.hex}
            showLabel={false}
            className={cn(
              'rounded-lg',
              isLight ? 'bg-black/10 text-black/90 hover:bg-black/20' : 'bg-white/10 text-white hover:bg-white/20'
            )}
          />
        </div>
      </div>

      {/* Properties */}
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-center justify-between">
          {colorProperties.map((prop) => (
            <div key={prop.label} className="flex-1 text-center">
              <prop.icon className="mx-auto mb-1.5 h-4 w-4 text-ink-3" strokeWidth={1.75} />
              <p className="label-caps text-ink-3">{prop.label}</p>
              <p className="mt-1 text-sm font-medium text-ink">{prop.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formats */}
      <div className="divide-y divide-line">
        {formats.map((format) => (
          <div
            key={format.label}
            className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface-2"
          >
            <div className="flex items-center gap-3">
              <span className="label-caps w-10 text-ink-3">{format.label}</span>
              <span className="font-mono text-sm text-ink">{format.value}</span>
            </div>
            <CopyButton text={format.value} showLabel={false} />
          </div>
        ))}
      </div>

      {/* Explore CTA */}
      <div className="border-t border-line p-4">
        <Link
          href={`/color-generator?color=${encodeURIComponent(color.hex.slice(1))}`}
          className="group flex w-full items-center justify-between rounded-xl border border-line bg-paper p-3 transition-colors hover:bg-surface-2"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface">
              <Palette className="h-4 w-4 text-ink" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-medium text-ink">Explore this color</p>
              <p className="text-xs text-ink-2">Harmonies, shades &amp; more</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
