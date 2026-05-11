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
      <div className={cn('rounded-2xl border border-white/[0.08] bg-black/20 backdrop-blur p-8', className)}>
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-4">
            <Droplets className="h-8 w-8 text-gray-500" />
          </div>
          <p className="text-gray-300 font-medium">No color selected</p>
          <p className="text-sm text-gray-500 mt-1">Click anywhere on the image</p>
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
    <div className={cn('rounded-2xl border border-white/[0.08] bg-black/20 backdrop-blur overflow-hidden', className)}>
      {/* Color preview */}
      <div
        className="h-36 w-full relative group"
        style={{ backgroundColor: color.hex }}
      >
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          isLight ? 'text-gray-900' : 'text-white'
        )}>
          <div className="text-center">
            {color.name && (
              <p className="text-xl font-bold capitalize mb-1">{color.name}</p>
            )}
            <p className={cn('text-sm font-mono', isLight ? 'text-gray-700' : 'text-white/80')}>
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
              isLight ? 'bg-black/10 text-gray-900 hover:bg-black/20' : 'bg-white/10 text-white hover:bg-white/20'
            )}
          />
        </div>
      </div>

      {/* Properties */}
      <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center justify-between">
          {colorProperties.map((prop) => (
            <div key={prop.label} className="text-center flex-1">
              <prop.icon className="h-4 w-4 mx-auto text-gray-500 mb-1" />
              <p className="text-xs text-gray-500">{prop.label}</p>
              <p className="text-sm font-medium text-gray-100">{prop.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formats */}
      <div className="divide-y divide-white/[0.06]">
        {formats.map((format) => (
          <div
            key={format.label}
            className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 text-xs font-semibold uppercase text-gray-500">{format.label}</span>
              <span className="font-mono text-sm text-gray-100">{format.value}</span>
            </div>
            <CopyButton text={format.value} showLabel={false} />
          </div>
        ))}
      </div>

      {/* Explore CTA */}
      <div className="px-5 py-4 bg-white/[0.02]">
        <Link
          href={`/color-generator?color=${encodeURIComponent(color.hex.slice(1))}`}
          className="flex items-center justify-between w-full p-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/15 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Palette className="h-4 w-4 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-violet-300">Explore this color</p>
              <p className="text-xs text-violet-400/60">Harmonies, shades &amp; more</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
