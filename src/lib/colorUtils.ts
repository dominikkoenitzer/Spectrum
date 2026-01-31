import { colord, extend, Colord } from 'colord';
import namesPlugin from 'colord/plugins/names';
import hwbPlugin from 'colord/plugins/hwb';
import a11yPlugin from 'colord/plugins/a11y';

extend([namesPlugin, hwbPlugin, a11yPlugin]);

export interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
  a?: number;
}

export interface ColorFormats {
  hex: string;
  rgb: RGB;
  rgbString: string;
  hsl: HSL;
  hslString: string;
  hsv: HSV;
  hsvString: string;
  name: string | null;
}

export function rgbToFormats(r: number, g: number, b: number, a: number = 1): ColorFormats {
  const color = colord({ r, g, b, a });
  const rgb = color.toRgb();
  const hsl = color.toHsl();
  const hsv = color.toHsv();

  return {
    hex: color.toHex().toUpperCase(),
    rgb: { r: rgb.r, g: rgb.g, b: rgb.b, a: rgb.a },
    rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: { h: Math.round(hsl.h), s: Math.round(hsl.s), l: Math.round(hsl.l), a: hsl.a },
    hslString: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
    hsv: { h: Math.round(hsv.h), s: Math.round(hsv.s), v: Math.round(hsv.v), a: hsv.a },
    hsvString: `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`,
    name: color.toName({ closest: true }) || null,
  };
}

export function parseColor(input: string): Colord | null {
  const color = colord(input);
  return color.isValid() ? color : null;
}

export function isValidColor(input: string): boolean {
  return colord(input).isValid();
}

export function getContrastRatio(color1: string, color2: string): number {
  return colord(color1).contrast(color2);
}

export function getLuminance(color: string): number {
  return colord(color).luminance();
}

export function isDark(color: string): boolean {
  return colord(color).isDark();
}

export function isLight(color: string): boolean {
  return colord(color).isLight();
}

export function invertColor(color: string): string {
  return colord(color).invert().toHex();
}

export function lighten(color: string, amount: number): string {
  return colord(color).lighten(amount).toHex();
}

export function darken(color: string, amount: number): string {
  return colord(color).darken(amount).toHex();
}

export function saturate(color: string, amount: number): string {
  return colord(color).saturate(amount).toHex();
}

export function desaturate(color: string, amount: number): string {
  return colord(color).desaturate(amount).toHex();
}

export function getComplementary(color: string): string {
  return colord(color).rotate(180).toHex();
}

export function getTriadic(color: string): [string, string, string] {
  const c = colord(color);
  return [c.toHex(), c.rotate(120).toHex(), c.rotate(240).toHex()];
}

export function getAnalogous(color: string): [string, string, string] {
  const c = colord(color);
  return [c.rotate(-30).toHex(), c.toHex(), c.rotate(30).toHex()];
}

export function getSplitComplementary(color: string): [string, string, string] {
  const c = colord(color);
  return [c.toHex(), c.rotate(150).toHex(), c.rotate(210).toHex()];
}

export function getTetradic(color: string): [string, string, string, string] {
  const c = colord(color);
  return [c.toHex(), c.rotate(90).toHex(), c.rotate(180).toHex(), c.rotate(270).toHex()];
}

export { colord };
